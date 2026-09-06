#!/usr/bin/env python3
"""Mirror a live site into a self-contained static copy that renders offline."""

import argparse
import hashlib
import html as html_lib
import mimetypes
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)

TRACKER_PATTERNS = re.compile(
    r"googletagmanager|google-analytics|gtag\(|dataLayer|hotjar|"
    r"connect\.facebook|fbevents|fbq\(|intercom|segment\.(com|io)/analytics|"
    r"hs-scripts|hs-analytics|hs-banner|hsforms|hubspot|lemlist|"
    r"events\.framer\.com|framer\.com/edit|clarity\.ms|mixpanel|amplitude|"
    r"snap\.licdn|plausible|matomo|posthog|cookiebot|onetrust|cookieconsent|"
    r"klaro|osano|termly|usercentrics|_linkedin_partner",
    re.I,
)

INLINE_TRACKER_PATTERNS = re.compile(
    r"gtm\.start|dataLayer|gtag\(|fbq\(|hj\(|_hsq|Intercom\(|analytics\.load|"
    r"googletagmanager|framer\.com/edit|clarity\(|mixpanel\.|amplitude\.init|"
    r"cookieconsent|OneTrust|Cookiebot|_linkedin_partner",
    re.I,
)

# Framework bundles re-render the page client side and cannot resolve their
# dynamic imports offline; the SSR markup alone renders better without them.
BUNDLE_PATTERNS = re.compile(r"framerusercontent\.com/sites/|/_next/static/|\.mjs(\?|$)", re.I)

DROP_LINK_RELS = {"modulepreload", "preconnect", "dns-prefetch", "prefetch"}
ASSET_LINK_RELS = {"icon", "shortcut icon", "apple-touch-icon", "stylesheet", "preload", "manifest"}
ASSET_META_KEYS = {"og:image", "og:image:secure_url", "twitter:image", "twitter:image:src"}

TAG_RE = re.compile(r"<([a-zA-Z][\w:-]*)((?:\"[^\"]*\"|'[^']*'|[^>\"'])*?)(/?)>")
STYLE_BLOCK_RE = re.compile(r"(<style\b[^>]*>)(.*?)(</style>)", re.S | re.I)
SCRIPT_BLOCK_RE = re.compile(r"<script\b[^>]*>.*?</script>", re.S | re.I)
NOSCRIPT_BLOCK_RE = re.compile(r"<noscript\b[^>]*>.*?</noscript>", re.S | re.I)
CSS_URL_RE = re.compile(r"url\(\s*(?:&quot;|&#34;|\"|')?([^)\"'\s]+?)(?:&quot;|&#34;|\"|')?\s*\)", re.I)
CSS_IMPORT_RE = re.compile(r"@import\s+(?:url\(\s*)?(?:\"|')([^\"')]+)(?:\"|')", re.I)
SRCSET_ITEM_RE = re.compile(r"([^\s,]+)(\s+[0-9.]+[wx])?")


def attr(attrs, name):
    m = re.search(rf"(?<![\w-]){name}\s*=\s*(\"([^\"]*)\"|'([^']*)'|([^\s>]+))", attrs, re.I)
    if not m:
        return None
    return m.group(2) or m.group(3) or m.group(4) or ""


def set_attr(attrs, name, value):
    def repl(m):
        return f'{m.group(1)}="{value}"'

    return re.sub(
        rf"((?<![\w-]){name})\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)",
        repl, attrs, count=1, flags=re.I,
    )


def url_attr(attrs, name):
    """Attribute value with HTML entities resolved, ready to be used as a URL."""
    raw = attr(attrs, name)
    return html_lib.unescape(raw) if raw else raw


def set_url_attr(attrs, name, url):
    return set_attr(attrs, name, url.replace("&", "&amp;"))


class Mirror:
    def __init__(
        self,
        base_url,
        out_dir,
        delay=0.15,
        user_agent=DEFAULT_UA,
        timeout=20,
        verbose=False,
        max_width=2048,
    ):
        self.base_url = base_url if base_url.endswith("/") else base_url + "/"
        self.out_dir = out_dir
        self.assets_dir = os.path.join(out_dir, "assets")
        self.delay = delay
        self.user_agent = user_agent
        self.timeout = timeout
        self.verbose = verbose
        self.max_width = max_width
        self.assets = {}
        self.last_content_type = ""
        self.failed = []
        self.pages = {}
        host = urllib.parse.urlsplit(self.base_url).netloc
        self.hosts = {host, host.removeprefix("www."), "www." + host.removeprefix("www.")}

    def run(self, page_paths):
        os.makedirs(self.assets_dir, exist_ok=True)
        self.pages = {"": "index.html"}
        for path in page_paths:
            slug = path.strip("/")
            if slug:
                self.pages[slug] = os.path.join(slug, "index.html")
        for slug, rel in self.pages.items():
            url = urllib.parse.urljoin(self.base_url, slug)
            html = self.fetch(url)
            if html is None:
                log(f"page failed: {url}")
                continue
            depth = rel.count(os.sep)
            rewritten = self.rewrite_html(html.decode("utf-8", "replace"), url, depth)
            out_path = os.path.join(self.out_dir, rel)
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(rewritten)
            log(f"page ok: {url} -> {rel}")

    def fetch(self, url):
        if self.verbose:
            log(f"GET {url}")
        req = urllib.request.Request(url, headers={"User-Agent": self.user_agent})
        for attempt in range(2):
            try:
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    data = resp.read()
                    self.last_content_type = resp.headers.get("Content-Type", "")
                    time.sleep(self.delay)
                    return data
            except (urllib.error.URLError, urllib.error.HTTPError, OSError) as exc:
                if attempt == 1:
                    self.failed.append((url, str(exc)))
                    return None
                time.sleep(0.5 * (attempt + 1))
        return None

    def asset_name(self, url):
        path = urllib.parse.urlsplit(url).path
        stem = os.path.basename(path) or "asset"
        ext = os.path.splitext(stem)[1]
        if not ext:
            ext = mimetypes.guess_extension((self.last_content_type or "").split(";")[0].strip()) or ""
            stem += ext
        digest = hashlib.sha1(url.encode()).hexdigest()[:8]
        return f"{digest}-{re.sub(r'[^A-Za-z0-9._-]', '_', stem)[-60:]}"

    def local_asset(self, raw, page_url):
        """Download an asset and return its filename inside the assets dir."""
        if not raw or raw.startswith(("data:", "#", "mailto:", "tel:", "javascript:", "blob:")):
            return None
        url = urllib.parse.urljoin(page_url, html_lib.unescape(raw)).split("#")[0]
        if not url.startswith(("http://", "https://")):
            return None
        if url in self.assets:
            return self.assets[url]
        data = self.fetch(url)
        if data is None:
            log(f"asset missing: {url}")
            return None
        content_type = self.last_content_type
        name = self.asset_name(url)
        self.assets[url] = name
        path = os.path.join(self.assets_dir, name)
        if name.endswith(".css") or "text/css" in content_type:
            with open(path, "w", encoding="utf-8") as f:
                f.write(self.rewrite_css(data.decode("utf-8", "replace"), url))
        else:
            with open(path, "wb") as f:
                f.write(data)
        return name

    def rewrite_css(self, css, css_url, ref_prefix=""):
        """ref_prefix is empty for stylesheets (flat assets dir), set for inline CSS."""

        def sub_url(m):
            name = self.local_asset(m.group(1), css_url)
            return f"url({ref_prefix}{name})" if name else m.group(0)

        def sub_import(m):
            name = self.local_asset(m.group(1), css_url)
            return f'@import "{ref_prefix}{name}"' if name else m.group(0)

        return CSS_URL_RE.sub(sub_url, CSS_IMPORT_RE.sub(sub_import, css))

    def page_ref(self, raw, page_url, depth):
        """Rewrite a link to a captured page; leave anything else absolute."""
        if not raw or raw.startswith(("#", "mailto:", "tel:", "javascript:")):
            return raw
        absolute = urllib.parse.urljoin(page_url, html_lib.unescape(raw))
        parts = urllib.parse.urlsplit(absolute)
        if parts.netloc not in self.hosts:
            return absolute
        slug = parts.path.strip("/")
        if slug not in self.pages:
            return absolute
        prefix = "../" * depth or "./"
        target = prefix if not slug else prefix + slug + "/"
        return target + (f"#{parts.fragment}" if parts.fragment else "")

    def rewrite_html(self, html, page_url, depth):
        html = SCRIPT_BLOCK_RE.sub(lambda m: "" if self.is_unwanted_script(m.group(0)) else m.group(0), html)
        html = NOSCRIPT_BLOCK_RE.sub(lambda m: "" if TRACKER_PATTERNS.search(m.group(0)) else m.group(0), html)
        prefix = "../" * depth
        css_prefix = f"{prefix}assets/"
        html = STYLE_BLOCK_RE.sub(
            lambda m: m.group(1) + self.rewrite_css(m.group(2), page_url, css_prefix) + m.group(3),
            html,
        )
        return TAG_RE.sub(lambda m: self.rewrite_tag(m, page_url, depth, prefix), html)

    def is_unwanted_script(self, block):
        open_tag = block[: block.index(">") + 1]
        src = attr(open_tag, "src") or ""
        if src:
            return bool(TRACKER_PATTERNS.search(src) or BUNDLE_PATTERNS.search(src))
        return bool(INLINE_TRACKER_PATTERNS.search(block))

    def rewrite_tag(self, match, page_url, depth, prefix):
        tag = match.group(1).lower()
        attrs, closing = match.group(2), match.group(3)

        if tag == "link":
            rel = (attr(attrs, "rel") or "").lower().strip()
            if rel in DROP_LINK_RELS:
                return ""
            if rel in ASSET_LINK_RELS:
                attrs = self.rewrite_asset_attrs(attrs, page_url, prefix, ("href",))
        elif tag == "a":
            href = attr(attrs, "href")
            if href is not None:
                attrs = set_url_attr(attrs, "href", self.page_ref(href, page_url, depth))
        elif tag in ("img", "source", "video", "audio", "embed", "iframe", "object", "track"):
            attrs = self.rewrite_asset_attrs(
                attrs, page_url, prefix, ("src", "poster", "data-src", "data")
            )
        elif tag == "meta":
            key = (attr(attrs, "property") or attr(attrs, "name") or "").lower()
            if key in ASSET_META_KEYS:
                attrs = self.rewrite_asset_attrs(attrs, page_url, prefix, ("content",))

        style = attr(attrs, "style")
        if style and "url(" in style:
            attrs = set_attr(attrs, "style", self.rewrite_css(style, page_url, f"{prefix}assets/"))
        return f"<{match.group(1)}{attrs}{closing}>"

    def rewrite_asset_attrs(self, attrs, page_url, prefix, names):
        widest = None
        for name in ("srcset", "imagesrcset", "data-srcset"):
            raw = url_attr(attrs, name)
            if raw:
                rewritten, widest = self.rewrite_srcset(raw, page_url, prefix)
                attrs = set_attr(attrs, name, rewritten)
        for name in names:
            raw = attr(attrs, name)
            if not raw:
                continue
            # src is only the no-srcset fallback, so reuse a variant already on disk
            # instead of pulling the uncapped original as well.
            if widest and name == "src":
                attrs = set_attr(attrs, name, widest)
                continue
            local = self.local_asset(raw, page_url)
            if local:
                attrs = set_attr(attrs, name, f"{prefix}assets/{local}")
        return attrs

    def rewrite_srcset(self, srcset, page_url, prefix):
        out, widest = [], None
        for item in srcset.split(","):
            m = SRCSET_ITEM_RE.match(item.strip())
            if not m or not m.group(1):
                continue
            descriptor = (m.group(2) or "").strip()
            if descriptor.endswith("w") and int(float(descriptor[:-1])) > self.max_width:
                continue
            local = self.local_asset(m.group(1), page_url)
            url = f"{prefix}assets/{local}" if local else m.group(1)
            out.append(url + (m.group(2) or ""))
            if local:
                widest = url
        return ", ".join(out).replace("&", "&amp;"), widest


def log(msg):
    print(msg, file=sys.stderr, flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="homepage URL, e.g. https://taskbase.com/")
    parser.add_argument("-o", "--out", required=True, help="output directory")
    parser.add_argument(
        "-p", "--page", action="append", default=[], help="extra top-level page path (repeatable)"
    )
    parser.add_argument("--delay", type=float, default=0.15, help="delay between requests in seconds")
    parser.add_argument("--user-agent", default=DEFAULT_UA)
    parser.add_argument("--timeout", type=float, default=20, help="per-request timeout in seconds")
    parser.add_argument("-v", "--verbose", action="store_true", help="log every request")
    parser.add_argument(
        "--max-width", type=int, default=2048, help="skip responsive image variants wider than this"
    )
    args = parser.parse_args()

    mirror = Mirror(
        args.url,
        args.out,
        delay=args.delay,
        user_agent=args.user_agent,
        timeout=args.timeout,
        verbose=args.verbose,
        max_width=args.max_width,
    )
    mirror.run(args.page)
    log(f"assets: {len(mirror.assets)} ok, {len(mirror.failed)} failed")
    for url, err in mirror.failed:
        log(f"  failed {url}: {err}")


if __name__ == "__main__":
    main()
