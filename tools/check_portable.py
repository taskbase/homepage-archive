#!/usr/bin/env python3
"""Check that every exhibit in sites/ survives a dumb static host.

Exhibits are served from an arbitrary sub-path (GitLab Pages, S3, nginx), with no
server-side rescue of root-relative asset requests. This fails on any reference
that would not resolve there: root-relative URLs, live external hosts, files
missing on disk, and anything inside a directory the Pages job strips
(sites/*/src, fetch, tools).

    python3 homepages/tools/check_portable.py --root homepages
"""
import argparse
import json
import os
import posixpath
import re
import sys
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path

DEPLOY_EXCLUDED_ROOT = ("fetch", "tools")
DEPLOY_EXCLUDED_SITE = ("src",)

# Mirrored pages deliberately point dead hosts at this path so they never reach the network.
DEAD_END = "not-archived"

# Reported but not fatal: a dead-end 404 is intentional, and a URL-shaped string in
# JavaScript is a guess -- it may be a cache key, dead code or an unreachable branch.
ADVISORY_CODES = {"dead-end", "script-root-relative", "script-external", "embed-external"}

# An embedded document (a dead YouTube clip, a booking widget) has no local copy to
# point at; the contract only forbids external refs that duplicate a mirrored file.
EMBED_TAGS = {"iframe", "embed", "object", "frame"}

SCANNED_SUFFIXES = {".html", ".htm", ".css", ".js", ".mjs", ".json", ".webmanifest", ".svg", ".xml"}

ASSET_SUFFIXES = {
    ".css", ".js", ".mjs", ".json", ".webmanifest", ".map",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico", ".bmp", ".cur",
    ".woff", ".woff2", ".ttf", ".otf", ".eot",
    ".mp4", ".webm", ".ogg", ".ogv", ".mp3", ".wav", ".m4v",
    ".pdf", ".xml", ".html", ".htm", ".txt",
}

# Navigation may leave the collection; a fetched asset may not.
NAV_ATTRS = {"a": {"href"}, "area": {"href"}, "form": {"action"}, "base": {"href"}}
NAV_LINK_RELS = {
    "canonical", "alternate", "shortlink", "pingback", "edituri", "wlwmanifest", "profile",
    "author", "me", "next", "prev", "dns-prefetch", "preconnect", "https://api.w.org/",
    "search", "license", "help", "index", "bookmark", "tag",
}

URL_ATTRS = {
    "src", "href", "poster", "action", "formaction", "data", "manifest", "background",
    "xlink:href", "cite", "longdesc", "usemap", "profile",
    "data-src", "data-href", "data-poster", "data-bg", "data-background",
    "data-background-image", "data-image", "data-thumb", "data-large", "data-lazy",
    "data-lazy-src", "data-original", "data-url", "data-video-url", "data-icon",
}
SRCSET_ATTRS = {"srcset", "imagesrcset", "data-srcset", "data-lazy-srcset"}

META_URL_NAMES = {"msapplication-tileimage", "msapplication-config", "twitter:image"}
META_URL_PROPS = {"og:image", "og:image:url", "og:image:secure_url", "og:video", "og:audio"}

BLOCK_COMMENT_RE = re.compile(r"/\*.*?\*/", re.S)
# gulp/SCSS leaks "//" line comments into compiled CSS; browsers drop them as invalid
# declarations, so the URLs in them are never fetched.
CSS_LINE_COMMENT_RE = re.compile(r"(?m)(?<=[{;\n])(\s*)//[^\n]*")
FONT_FACE_RE = re.compile(r"@font-face\s*\{(?P<body>[^}]*)\}", re.I | re.S)
CSS_URL_RE = re.compile(r"""url\(\s*(?P<q>['"]?)(?P<url>.*?)(?P=q)\s*\)""", re.S)
CSS_IMPORT_RE = re.compile(r"""@import\s+(?:url\(\s*)?(?P<q>['"])(?P<url>.*?)(?P=q)""")
STRING_RE = re.compile(r"""(?P<q>['"])(?P<val>(?:\\.|(?!(?P=q))[^\\\r\n])*)(?P=q)""")
ABSOLUTE_RE = re.compile(r"^(?:https?:)?//", re.I)
SCHEME_RE = re.compile(r"^[a-z][a-z0-9+.\-]*:", re.I)
ROOT_TAG_RE = re.compile(r"<\s*(?:!doctype|html|head|body)\b", re.I)
# Angular/Vue/Handlebars interpolation in an attribute, not a URL.
TEMPLATE_EXPR_RE = re.compile(r"""^\s*(?:['"]|\{)""")

SKIP_SCHEMES = ("data:", "blob:", "javascript:", "mailto:", "tel:", "about:", "#")


class Ref:
    __slots__ = ("source", "line", "raw", "nav", "where", "base", "alternatives")

    def __init__(self, source, line, raw, nav, where, base=None, alternatives=()):
        self.source = source
        self.line = line
        self.raw = raw
        self.nav = nav
        self.where = where
        self.base = base
        self.alternatives = alternatives  # sibling formats in one @font-face src list


class Problem:
    __slots__ = ("ref", "code", "detail")

    def __init__(self, ref, code, detail=""):
        self.ref = ref
        self.code = code
        self.detail = detail

    @property
    def fatal(self):
        return self.code not in ADVISORY_CODES


class Page:
    def __init__(self, path, refs, base_href, is_fragment):
        self.path = path
        self.refs = refs
        self.base_href = base_href
        self.is_fragment = is_fragment


def line_of(text, index):
    return text.count("\n", 0, index) + 1


def strip_block_comments(text):
    return BLOCK_COMMENT_RE.sub(lambda m: "\n" * m.group().count("\n"), text)


def split_srcset(value):
    """Split a srcset the way the HTML spec does: a URL may contain commas, a descriptor may not."""
    out, index, length = [], 0, len(value)
    while index < length:
        while index < length and (value[index].isspace() or value[index] == ","):
            index += 1
        start = index
        while index < length and not value[index].isspace():
            index += 1
        url = value[start:index].rstrip(",")
        if url:
            out.append(url)
        while index < length and value[index] != ",":
            index += 1
    return out


def looks_like_asset(value):
    return posixpath.splitext(urllib.parse.urlparse(value).path)[1].lower() in ASSET_SUFFIXES


def font_face_groups(text):
    """Map each url() offset inside an @font-face to the other URLs in the same block.

    The src descriptors are a fallback chain -- a later one overrides an earlier one and
    the browser loads the first format it supports -- so the face is broken only when
    none of its files exist.
    """
    groups = {}
    for block in FONT_FACE_RE.finditer(text):
        start = block.start("body")
        urls = [(start + m.start(), m.group("url")) for m in CSS_URL_RE.finditer(block.group("body"))]
        for offset, _ in urls:
            groups[offset] = tuple(url for other, url in urls if other != offset)
    return groups


def css_refs(source, text, line_offset=0):
    text = CSS_LINE_COMMENT_RE.sub(r"\1", strip_block_comments(text))
    groups = font_face_groups(text)
    refs = []
    for pattern, where in ((CSS_URL_RE, "css url()"), (CSS_IMPORT_RE, "css @import")):
        for match in pattern.finditer(text):
            refs.append(Ref(source, line_offset + line_of(text, match.start()),
                            match.group("url"), False, where,
                            alternatives=groups.get(match.start(), ())))
    return refs


def script_refs(source, text, line_offset=0):
    """URL-shaped literals in JavaScript: string values (including JSON's escaped-slash
    form) and url() inside CSS that a bundler inlined into a JS string."""
    text = strip_block_comments(text)
    refs = []
    for pattern, group, where in ((STRING_RE, "val", "script string"),
                                  (CSS_URL_RE, "url", "script url()")):
        for match in pattern.finditer(text):
            value = match.group(group).replace("\\/", "/")
            if looks_like_asset(value) and (value.startswith("/") or ABSOLUTE_RE.match(value)):
                refs.append(Ref(source, line_offset + line_of(text, match.start()),
                                value, False, where))
    return refs


class HtmlRefParser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.refs = []
        self.base_href = None
        self._script_start = None
        self._style_start = None

    def _add(self, raw, nav, where):
        self.refs.append(Ref(self.source, self.getpos()[0], raw, nav, where, self.base_href))

    def handle_starttag(self, tag, attrs):
        attrs = {key.lower(): (value or "") for key, value in attrs}
        nav_attrs = set(NAV_ATTRS.get(tag, ()))
        if tag == "link" and {r.lower() for r in attrs.get("rel", "").split()} & NAV_LINK_RELS:
            nav_attrs.add("href")
        if tag == "base" and attrs.get("href"):
            self.base_href = attrs["href"]
        if tag == "meta":
            self._meta(attrs)
        if tag == "script" and "src" not in attrs:
            self._script_start = self.rawdata.find(">", self.offset) + 1
        if tag == "style":
            self._style_start = self.rawdata.find(">", self.offset) + 1

        for name, value in attrs.items():
            if not value or TEMPLATE_EXPR_RE.match(value):
                continue
            if name in URL_ATTRS:
                nav = name in nav_attrs or (tag in EMBED_TAGS and name in ("src", "data"))
                self._add(value, nav, f"<{tag} {name}>")
            elif name in SRCSET_ATTRS:
                for candidate in split_srcset(value):
                    self._add(candidate, False, f"<{tag} {name}>")
            elif name == "style":
                for match in CSS_URL_RE.finditer(value):
                    self._add(match.group("url"), False, f"<{tag} style url()>")

    handle_startendtag = handle_starttag

    def _meta(self, attrs):
        name = attrs.get("name", "").lower()
        prop = attrs.get("property", "").lower()
        content = attrs.get("content", "")
        if not content:
            return
        if attrs.get("http-equiv", "").lower() == "refresh":
            match = re.search(r"url\s*=\s*(.+)$", content, re.I)
            if match:
                self._add(match.group(1).strip().strip("'\""), True, "<meta refresh>")
        elif name in META_URL_NAMES or prop in META_URL_PROPS:
            self._add(content, False, f"<meta {name or prop}>")

    def handle_endtag(self, tag):
        if tag == "script" and self._script_start is not None:
            self._inline(script_refs, self._script_start)
            self._script_start = None
        elif tag == "style" and self._style_start is not None:
            self._inline(css_refs, self._style_start)
            self._style_start = None

    def _inline(self, extract, start):
        for ref in extract(self.source, self.rawdata[start:self.offset],
                           line_of(self.rawdata, start) - 1):
            ref.base = self.base_href
            self.refs.append(ref)


def read_page(path):
    text = path.read_text(encoding="utf-8", errors="replace")
    suffix = path.suffix.lower()
    if suffix in (".html", ".htm", ".svg", ".xml"):
        parser = HtmlRefParser(path)
        parser.feed(text)
        parser.close()
        refs = parser.refs + (css_refs(path, text) if suffix in (".svg", ".xml") else [])
        return Page(path, refs, parser.base_href, not ROOT_TAG_RE.search(text))
    if suffix == ".css":
        return Page(path, css_refs(path, text), None, False)
    return Page(path, script_refs(path, text), None, False)


def dropped_by_deploy(relative: Path):
    parts = relative.parts
    if parts and parts[0] in DEPLOY_EXCLUDED_ROOT:
        return True
    return len(parts) > 2 and parts[0] == "sites" and parts[2] in DEPLOY_EXCLUDED_SITE


def relative_to(path, root):
    try:
        return path.relative_to(root)
    except ValueError:
        return None


def candidate_dirs(page, ref, site_dir):
    """Directories a relative URL in this file may legitimately resolve against.

    A <base href> overrides the file's own directory. A fragment (a template with no
    <html> root) is injected into the page at the site root, so its URLs resolve there.
    """
    if ref.base and not ref.base.startswith("/") and not ABSOLUTE_RE.match(ref.base):
        return [Path(posixpath.normpath(str(page.path.parent / ref.base)))]
    dirs = [page.path.parent]
    if page.is_fragment and site_dir != page.path.parent:
        dirs.append(site_dir)
    return dirs


def resolve(directory, target, nav):
    resolved = Path(posixpath.normpath(str(directory / target)))
    if resolved.is_dir():
        return resolved, (resolved / "index.html").exists() or nav
    return resolved, resolved.exists()


def classify(page, ref, site_dir, root):
    raw = ref.raw.strip()
    in_script = ref.where.startswith("script ")

    if not raw or raw.lower().startswith(SKIP_SCHEMES):
        return None
    if SCHEME_RE.match(raw) and not raw.lower().startswith(("http://", "https://")):
        return None
    if ABSOLUTE_RE.match(raw):
        host = urllib.parse.urlparse(raw).netloc or raw
        if ref.where.split()[0].lstrip("<") in EMBED_TAGS:
            return Problem(ref, "embed-external", host)
        if ref.nav:
            return None
        return Problem(ref, "script-external" if in_script else "external", host)
    if raw.startswith("/"):
        # In JavaScript a root-relative literal may be a cache key or dead code; it is only
        # provably a live reference when the site actually holds that file.
        inside = site_dir / posixpath.normpath(raw).lstrip("/")
        if in_script and not inside.exists():
            return Problem(ref, "script-root-relative", str(relative_to(inside, root) or inside))
        return Problem(ref, "root-relative")
    if ref.base and ref.base.startswith("/"):
        return None  # the <base href> itself is already reported

    target = urllib.parse.unquote(urllib.parse.urlparse(raw).path)
    if not target:
        return None

    resolved = None
    targets = [target] + [urllib.parse.unquote(urllib.parse.urlparse(a).path)
                          for a in ref.alternatives if not ABSOLUTE_RE.match(a.strip())]
    for directory, target in ((d, t) for d in candidate_dirs(page, ref, site_dir) for t in targets):
        resolved, found = resolve(directory, target, ref.nav)
        if found:
            relative = relative_to(resolved, root)
            if relative and dropped_by_deploy(relative):
                return Problem(ref, "excluded-from-deploy", str(relative))
            return None

    relative = relative_to(resolved, root)
    if relative is None:
        return Problem(ref, "escapes-root", str(resolved))
    if dropped_by_deploy(relative):
        return Problem(ref, "excluded-from-deploy", str(relative))
    if DEAD_END in relative.parts:
        return Problem(ref, "dead-end", str(relative))
    if in_script or (ref.nav and not looks_like_asset(target)):
        return None
    return Problem(ref, "missing", str(relative))


def check_site(site_dir, root):
    problems, bases = [], []
    for path in sorted(site_dir.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in SCANNED_SUFFIXES:
            continue
        if dropped_by_deploy(path.relative_to(root)):
            continue
        try:
            page = read_page(path)
        except OSError as exc:
            problems.append(Problem(Ref(path, 0, "", False, "read"), "unreadable", str(exc)))
            continue
        problems.extend(p for p in (classify(page, r, site_dir, root) for r in page.refs) if p)
        if page.base_href:
            bases.append((path.relative_to(root), page.base_href))
    return problems, bases


def report(site_dir, root, problems, bases, verbose):
    fatal = [p for p in problems if p.fatal]
    counts = {}
    for problem in problems:
        counts[problem.code] = counts.get(problem.code, 0) + 1
    summary = ", ".join(f"{code}={n}" for code, n in sorted(counts.items())) or "clean"
    suffix = f"  [<base href> in {len(bases)} file(s)]" if bases else ""
    print(f"{'FAIL' if fatal else 'ok  '}  {site_dir.name}  {summary}{suffix}")

    listed = problems if verbose else fatal
    shown = listed if verbose else listed[:20]
    for problem in shown:
        ref = problem.ref
        detail = f" -> {problem.detail}" if problem.detail else ""
        print(f"        {problem.code:<22} {ref.source.relative_to(root)}:{ref.line}  "
              f"{ref.where}  {ref.raw[:110]}{detail}")
    if len(listed) > len(shown):
        print(f"        ... {len(listed) - len(shown)} more (use --verbose)")


def main():
    default_root = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--root", type=Path, default=default_root,
                        help="collection directory containing sites/ (default: %(default)s)")
    parser.add_argument("--site", action="append", help="only check this slug (repeatable)")
    parser.add_argument("--verbose", action="store_true",
                        help="list every finding, including advisory ones")
    parser.add_argument("--json", action="store_true", help="emit machine-readable findings")
    args = parser.parse_args()

    root = args.root.resolve()
    if not (root / "sites").is_dir():
        parser.error(f"no sites/ under {root}")

    slugs = set(args.site or ())
    site_dirs = [d for d in sorted((root / "sites").iterdir())
                 if d.is_dir() and (not slugs or d.name in slugs)]

    findings, fatal_total, advisory_total = [], 0, 0
    for site_dir in site_dirs:
        problems, bases = check_site(site_dir, root)
        fatal_total += sum(1 for p in problems if p.fatal)
        advisory_total += sum(1 for p in problems if not p.fatal)
        if args.json:
            findings.append({
                "slug": site_dir.name,
                "base_href": [{"file": str(f), "href": h} for f, h in bases],
                "problems": [{
                    "code": p.code, "fatal": p.fatal,
                    "file": str(p.ref.source.relative_to(root)), "line": p.ref.line,
                    "where": p.ref.where, "ref": p.ref.raw, "detail": p.detail,
                } for p in problems],
            })
        else:
            report(site_dir, root, problems, bases, args.verbose)

    if args.json:
        json.dump({"root": str(root), "sites": findings,
                   "fatal": fatal_total, "advisory": advisory_total}, sys.stdout, indent=2)
        print()
    else:
        print(f"\n{len(site_dirs)} site(s), {fatal_total} blocking, {advisory_total} advisory")
    return 1 if fatal_total else 0


if __name__ == "__main__":
    sys.exit(main())
