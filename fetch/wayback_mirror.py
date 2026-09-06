#!/usr/bin/env python3
"""Mirror a single Wayback Machine snapshot into a self-contained local site.

Fetches the unrewritten original page via the `id_` modifier, follows every asset
reference (recursively through CSS), stores the assets flat under `assets/` and
rewrites all references to relative paths.
"""

import argparse
import gzip
import hashlib
import http.client
import json
import re
import sys
import threading
import time
import urllib.parse
import zlib
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from html import unescape
from pathlib import Path

WAYBACK_TEMPLATE = "https://web.archive.org/web/{timestamp}id_/{url}"
CDX_TEMPLATE = ("https://web.archive.org/cdx/search/cdx?url={url}&matchType=prefix"
                "&output=json&fl=timestamp,original&filter=statuscode:200"
                "&collapse=digest&limit=60")
USER_AGENT = "Mozilla/5.0 (compatible; taskbase-homepage-archive/1.0)"
RETRY_STATUS = {429, 500, 502, 503, 504, 520, 523}
ASSETS_PREFIX = "assets/"

TRACKER_PATTERNS = (
    "google-analytics", "googletagmanager", "gtag/js", "googleadservices",
    "doubleclick", "google_conversion", "analytics.js", "ga.js",
    "connect.facebook", "fbevents", "fbq(", "facebook.net",
    "hotjar", "intercom", "olark", "inspectlet", "drift.com",
    "hs-scripts", "hs-analytics", "hsforms", "hubspot", "js.hs-banner",
    "snap.licdn", "linkedin.com/px", "static.ads-twitter", "twq(",
    "segment.com", "segment.io", "mixpanel", "clarity.ms", "matomo",
    "piwik", "plausible.io", "cdn.amplitude", "borlabs-cookie",
    "cookiebot", "usercentrics", "crisp.chat", "tawk.to", "zdassets",
)

LINK_ASSET_RELS = (
    "stylesheet", "icon", "shortcut icon", "apple-touch-icon",
    "apple-touch-icon-precomposed", "mask-icon", "preload",
)

EXTENSION_BY_CONTENT_TYPE = {
    "text/css": ".css",
    "text/javascript": ".js",
    "application/javascript": ".js",
    "application/x-javascript": ".js",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/x-icon": ".ico",
    "image/vnd.microsoft.icon": ".ico",
    "font/woff": ".woff",
    "font/woff2": ".woff2",
    "application/font-woff": ".woff",
    "application/font-woff2": ".woff2",
    "font/ttf": ".ttf",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
}

SKIPPED_SCHEMES = ("data:", "mailto:", "tel:", "javascript:", "blob:", "about:")
CHARSET_RE = re.compile(rb"""charset=["']?([\w-]+)""", re.I)
CSS_URL_RE = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""", re.I)
CSS_IMPORT_RE = re.compile(r"""@import\s+(?!url\()(['"])([^'"]+)\1""", re.I)
STYLE_BLOCK_RE = re.compile(r"(<style\b[^>]*>)(.*?)(</style>)", re.I | re.S)
STYLE_ATTR_RE = re.compile(r"""(\sstyle\s*=\s*)(["'])(.*?)\2""", re.I | re.S)
BASE_TAG_RE = re.compile(r"""<base\b[^>]*\bhref\s*=\s*["']([^"']*)["'][^>]*>""", re.I)
SCRIPT_BLOCK_RE = re.compile(r"<script\b[^>]*>.*?</script>|<script\b[^>]*/>", re.I | re.S)
NOSCRIPT_BLOCK_RE = re.compile(r"<noscript\b[^>]*>.*?</noscript>", re.I | re.S)
IFRAME_RE = re.compile(r"<iframe\b[^>]*>(?:.*?</iframe>)?", re.I | re.S)
WAYBACK_INSERT_RE = re.compile(
    r"<!--\s*BEGIN WAYBACK TOOLBAR INSERT\s*-->.*?<!--\s*END WAYBACK TOOLBAR INSERT\s*-->",
    re.I | re.S,
)
WAYBACK_SCRIPT_RE = re.compile(
    r"<script\b[^>]*(?:archive\.org|wombat\.js|wbhack|_wb_wombat)[^>]*>.*?</script>", re.I | re.S
)

TAG_ASSET_ATTRS = {
    "link": ("href",),
    "script": ("src",),
    "img": ("src", "data-src", "data-lazy-src", "data-original"),
    "source": ("src", "data-src"),
    "video": ("poster", "src"),
    "audio": ("src",),
    "embed": ("src",),
    "object": ("data",),
    "image": ("href", "xlink:href"),
}
TAG_SRCSET_ATTRS = {
    "img": ("srcset", "data-srcset", "data-lazy-srcset"),
    "source": ("srcset", "data-srcset"),
}
ASSET_TAG_RE = re.compile(
    r"<(?P<name>%s)\b(?P<attrs>[^>]*)>" % "|".join(list(TAG_ASSET_ATTRS) + ["meta"]), re.I
)
SOCIAL_IMAGE_META_RE = re.compile(
    r"""(?:property|name)\s*=\s*["'](?:og:image(?::secure_url)?|twitter:image(?::src)?)["']""", re.I
)


class Fetcher:
    """Fetches archived resources for one snapshot timestamp.

    Connections are pooled per thread and kept alive. That is not a micro
    optimisation: the archive throttles TLS handshakes, and a fresh handshake per
    asset is what turns a few hundred small files into a run that dies half way.
    """

    def __init__(self, timestamp, delay=0.5, retries=4, timeout=25, backoff=4.0):
        self.timestamp = timestamp
        self.delay = delay
        self.retries = retries
        self.timeout = timeout
        self.backoff = backoff
        self._lock = threading.Lock()
        self._cdx_cache = {}
        self._resume_at = 0.0
        self._local = threading.local()

    def get(self, url):
        """Return (body, content_type), or None when the archive has no usable copy.

        The alternate URL shapes are tried once each, without a retry budget: a
        wrong guess answers 404 straight away, and paying backoff on every shape
        would multiply the cost of a genuine miss. Only the URL as written gets
        the full retry treatment, once the cheap shapes are exhausted.
        """
        for candidate in _url_variants(url):
            result = self._replay(candidate, retries=0)
            if result is not None:
                return result
        result = self._replay(url, retries=self.retries) if self.retries else None
        return result if result is not None else self._replay_neighbour(url)

    def _replay_neighbour(self, url):
        """Try the nearest capture of the same path, whatever its timestamp or query.

        A 14-digit `id_` replay is exact: the archive answers 404 when this snapshot
        never crawled the asset, even when a capture weeks away holds it. WordPress
        makes that routine — a plugin bump rewrites the `?ver=` of every icon font
        and stylesheet, so the file the page asks for sits in the archive under a
        query string nobody will guess. The CDX index knows what is actually there.
        """
        for timestamp, original in self._neighbour_captures(url):
            result = self._replay(original, retries=0, timestamp=timestamp)
            if result is not None:
                return result
        return None

    def _neighbour_captures(self, url, limit=3):
        parts = urllib.parse.urlsplit(url)
        key = (parts.netloc.lower().removeprefix("www."), parts.path)
        with self._lock:
            captures = self._cdx_cache.get(key)
        if captures is None:
            captures = self._query_cdx(*key)
            with self._lock:
                self._cdx_cache[key] = captures
        return captures[:limit]

    def _query_cdx(self, host, path):
        """Captures of exactly `path` on `host`, nearest to this snapshot first."""
        query = urllib.parse.quote(host + path, safe="/")
        try:
            response = self._request(CDX_TEMPLATE.format(url=query))
        except OSError:
            return []
        status, _, encoding, retry_after, body = response
        if status != 200:
            if status in RETRY_STATUS:
                self._throttle(0, retry_after)
            return []
        time.sleep(self.delay)
        try:
            rows = json.loads(_decompress(body, encoding).decode("utf-8", "replace"))
        except ValueError:
            return []
        # matchType=prefix also answers with longer paths (eicons.woff2 for
        # eicons.woff), so the path has to be checked rather than trusted.
        captures = [
            (timestamp, original) for timestamp, original in rows[1:]
            if urllib.parse.urlsplit(original).path == path
        ]
        return sorted(captures, key=lambda row: abs(int(row[0]) - int(self.timestamp)))

    def _replay(self, url, retries, timestamp=None):
        archived = WAYBACK_TEMPLATE.format(timestamp=timestamp or self.timestamp, url=url)
        for attempt in range(retries + 1):
            self._wait_out_throttle()
            try:
                response = self._request(archived)
            except OSError:
                self._throttle(attempt, None)
                continue
            status, content_type, encoding, retry_after, body = response
            if status == 200:
                time.sleep(self.delay)
                return _decompress(body, encoding), content_type.split(";")[0].strip()
            if status not in RETRY_STATUS:
                return None
            self._throttle(attempt, retry_after)
        return None

    def _request(self, url, redirects=3):
        """One GET over a pooled connection, following the archive's own redirects."""
        parts = urllib.parse.urlsplit(url)
        target = parts.path + (f"?{parts.query}" if parts.query else "")
        headers = {"User-Agent": USER_AGENT, "Accept-Encoding": "gzip", "Connection": "keep-alive"}

        last_error = None
        for _ in range(2):  # a pooled socket the server already closed costs one retry
            connection = self._connection(parts.netloc)
            try:
                connection.request("GET", target, headers=headers)
                response = connection.getresponse()
                body = response.read()
            except (http.client.HTTPException, OSError) as error:
                last_error, _ = error, self._drop_connection()
                continue
            location = response.getheader("Location")
            if response.status in (301, 302, 303, 307, 308) and location and redirects:
                return self._request(urllib.parse.urljoin(url, location), redirects - 1)
            return (response.status, response.getheader("Content-Type", ""),
                    response.getheader("Content-Encoding", ""),
                    response.getheader("Retry-After"), body)
        raise OSError(f"cannot reach {parts.netloc}: {last_error}")

    def _connection(self, host):
        connection = getattr(self._local, "connection", None)
        if connection is not None and getattr(self._local, "host", None) == host:
            return connection
        self._drop_connection()
        connection = http.client.HTTPSConnection(host, timeout=self.timeout)
        self._local.connection, self._local.host = connection, host
        return connection

    def _drop_connection(self):
        connection = getattr(self._local, "connection", None)
        if connection is not None:
            try:
                connection.close()
            except OSError:
                pass
        self._local.connection = self._local.host = None

    def _throttle(self, attempt, retry_after):
        """Hold every worker back, not just this one.

        Wayback rate-limits the client, so a 429 on one asset means the next asset
        would be refused too. Parking a shared deadline costs one backoff for the
        whole pool instead of one per URL, which is the difference between a run
        that finishes and a run that spends its life sleeping.
        """
        wait = self.backoff * (2 ** attempt)
        if retry_after and retry_after.strip().isdigit():
            wait = max(wait, min(float(retry_after), 120.0))
        with self._lock:
            self._resume_at = max(self._resume_at, time.monotonic() + wait)

    def _wait_out_throttle(self):
        with self._lock:
            wait = self._resume_at - time.monotonic()
        if wait > 0:
            time.sleep(wait)


class AssetMirror:
    """Downloads every asset a page needs and maps each URL to a local file name."""

    def __init__(self, fetcher, assets_dir, workers=6):
        self.fetcher = fetcher
        self.assets_dir = assets_dir
        self.workers = workers
        self.bodies = {}
        self.names = {}
        self.failures = set()
        self.reused = 0
        self.stored = 0

    @property
    def ok_count(self):
        return self.stored + len(self.bodies) + self.reused

    def collect(self, seeds):
        """Download the seed URLs, then whatever their stylesheets pull in.

        Everything but CSS lands on disk the moment it arrives, so a run that dies
        on a rate limit keeps what it already paid for and the next one resumes.
        Stylesheets stay in memory until `write`, which needs the full name map to
        rewrite their `url()` references.
        """
        self.assets_dir.mkdir(parents=True, exist_ok=True)
        pending = self._enqueue(seeds)
        while pending:
            ordered = sorted(pending)
            with ThreadPoolExecutor(self.workers) as pool:
                results = list(pool.map(self.fetcher.get, ordered))
            discovered = set()
            for url, result in zip(ordered, results):
                if result is None:
                    self.failures.add(url)
                    continue
                body, content_type = result
                name = self.names[url] = self._local_name(url, content_type)
                if name.endswith(".css"):
                    self.bodies[url] = body
                    walk_css(body.decode("utf-8", "replace"), url, collector(discovered))
                else:
                    (self.assets_dir / name).write_bytes(body)
                    self.stored += 1
            pending = self._enqueue(discovered)

    def write(self):
        """Flush the stylesheets, now that every local name is known."""
        resolve = localizer(self.names, prefix="")
        for url, body in self.bodies.items():
            rewritten = walk_css(body.decode("utf-8", "replace"), url, resolve)
            (self.assets_dir / self.names[url]).write_bytes(rewritten.encode("utf-8"))

    def _enqueue(self, urls):
        """Keep whatever an earlier run already stored, so a re-run resumes it."""
        pending = set()
        for url in urls:
            if url in self.names or url in self.failures:
                continue
            stored = next(self.assets_dir.glob(f"{_digest(url)}-*"), None) if self.assets_dir.is_dir() else None
            if stored is None:
                pending.add(url)
            else:
                self.names[url] = stored.name
                self.reused += 1
        return pending

    def _local_name(self, url, content_type):
        path = urllib.parse.urlsplit(url).path
        stem = re.sub(r"[^A-Za-z0-9._-]+", "-", path.rsplit("/", 1)[-1]).strip("-.") or "asset"
        if "." not in stem:
            stem += EXTENSION_BY_CONTENT_TYPE.get(content_type.lower(), "")
        return f"{_digest(url)}-{stem[:60]}"


def _url_variants(url):
    """The URL plus the shapes a crawler is likely to have stored it under.

    Cache-buster queries (?ver=, ?v=) are usually absent from the stored copy, and
    a site reachable on both the apex and the www host gets crawled under whichever
    one the linking page used, which is not always the one the markup asks for.
    """
    variants = [url]
    if "?" in url:
        variants.append(url.split("?", 1)[0])
    for variant in list(variants):
        parts = urllib.parse.urlsplit(variant)
        host = parts.netloc[4:] if parts.netloc.startswith("www.") else "www." + parts.netloc
        variants.append(urllib.parse.urlunsplit(parts._replace(netloc=host)))
    return variants


def collector(found):
    """Resolver that records every reference and leaves the document untouched."""

    def resolve(absolute_url):
        if absolute_url:
            found.add(absolute_url)
        return None

    return resolve


def localizer(names, prefix=ASSETS_PREFIX):
    """Resolver that swaps a reference for its local copy, else for the absolute original.

    Anything the archive lost keeps its absolute URL, so the mirror never asks the
    gallery host for a root-relative path that only ever existed on taskbase.com.
    """

    def resolve(absolute_url):
        if not absolute_url:
            return None
        name = names.get(absolute_url)
        return prefix + name if name else absolute_url

    return resolve


def walk_css(text, base_url, resolve):
    def replace_url(match):
        quote, local = match.group(1), resolve(absolutize(match.group(2), base_url))
        return match.group(0) if local is None else f"url({quote}{local}{quote})"

    def replace_import(match):
        quote, local = match.group(1), resolve(absolutize(match.group(2), base_url))
        return match.group(0) if local is None else f"@import {quote}{local}{quote}"

    return CSS_URL_RE.sub(replace_url, CSS_IMPORT_RE.sub(replace_import, text))


def walk_html(html, base_url, resolve):
    def localize(raw):
        return resolve(absolutize(unescape(raw), base_url))

    def localize_srcset(raw):
        rewritten, changed = [], False
        for candidate in unescape(raw).split(","):
            parts = candidate.split()
            if not parts:
                continue
            local = localize(parts[0])
            if local:
                changed, parts[0] = True, local
            rewritten.append(" ".join(parts))
        return ", ".join(rewritten) if changed else None

    def rewrite_tag(match):
        tag, attrs = match.group("name").lower(), match.group("attrs")
        if tag == "link" and not _is_asset_link(attrs):
            return match.group(0)
        if tag == "meta":
            if not SOCIAL_IMAGE_META_RE.search(attrs):
                return match.group(0)
            attrs = rewrite_attrs(attrs, ("content",), localize)
        else:
            attrs = rewrite_attrs(attrs, TAG_ASSET_ATTRS.get(tag, ()), localize)
            attrs = rewrite_attrs(attrs, TAG_SRCSET_ATTRS.get(tag, ()), localize_srcset)
        return f"<{match.group('name')}{attrs}>"

    html = ASSET_TAG_RE.sub(rewrite_tag, html)
    html = STYLE_BLOCK_RE.sub(
        lambda m: m.group(1) + walk_css(m.group(2), base_url, resolve) + m.group(3), html
    )
    return STYLE_ATTR_RE.sub(
        lambda m: m.group(1) + m.group(2) + walk_css(m.group(3), base_url, resolve) + m.group(2),
        html,
    )


def rewrite_attrs(attrs, names, convert):
    if not names:
        return attrs
    pattern = re.compile(
        r"""(\s(?:%s)\s*=\s*)(["'])(.*?)\2""" % "|".join(re.escape(n) for n in names), re.I | re.S
    )

    def replace(match):
        converted = convert(match.group(3))
        if converted is None:
            return match.group(0)
        return f"{match.group(1)}{match.group(2)}{converted}{match.group(2)}"

    return pattern.sub(replace, attrs)


def _is_asset_link(attrs):
    rel = re.search(r"""\brel\s*=\s*["']([^"']*)["']""", attrs, re.I)
    return bool(rel) and rel.group(1).strip().lower() in LINK_ASSET_RELS


def _digest(url):
    return hashlib.sha1(url.encode()).hexdigest()[:8]


def _decompress(body, encoding):
    if body[:2] == b"\x1f\x8b":
        return gzip.decompress(body)
    if "deflate" in encoding.lower():
        return zlib.decompress(body, -zlib.MAX_WBITS)
    return body


def absolutize(raw, base_url):
    """Resolve a reference against its base, or None if it is not fetchable."""
    raw = raw.strip().replace("\n", "").replace("\t", "")
    if not raw or raw.startswith("#") or raw.lower().startswith(SKIPPED_SCHEMES):
        return None
    absolute = urllib.parse.urljoin(base_url, raw)
    if not absolute.lower().startswith(("http://", "https://")):
        return None
    return urllib.parse.urldefrag(absolute).url


def decode_html(raw, content_type):
    for candidate in (content_type.encode(), raw[:4096]):
        match = CHARSET_RE.search(candidate)
        if not match:
            continue
        try:
            return raw.decode(match.group(1).decode("ascii"), "replace")
        except LookupError:
            continue
    return raw.decode("utf-8", "replace")


def strip_injected(html):
    return WAYBACK_SCRIPT_RE.sub("", WAYBACK_INSERT_RE.sub("", html))


def strip_trackers(html):
    def drop_if_tracker(match):
        block = match.group(0).lower()
        return "" if any(pattern in block for pattern in TRACKER_PATTERNS) else match.group(0)

    html = SCRIPT_BLOCK_RE.sub(drop_if_tracker, html)
    return IFRAME_RE.sub(drop_if_tracker, NOSCRIPT_BLOCK_RE.sub(drop_if_tracker, html))


def rebase(html, page_url):
    """Point any <base> tag at the mirror dir, but resolve refs against the original."""
    match = BASE_TAG_RE.search(html)
    if not match:
        return html, page_url
    return BASE_TAG_RE.sub('<base href="./">', html), urllib.parse.urljoin(page_url, match.group(1))


def write_meta(site_dir, args):
    meta = {
        "slug": site_dir.name,
        "title": args.title or site_dir.name,
        "era": args.era,
        "source": "wayback",
        "origin": WAYBACK_TEMPLATE.format(timestamp=args.timestamp, url=args.url),
        "stack": args.stack,
        "notes": args.notes,
        "captured": date.today().isoformat(),
        "status": args.status,
    }
    (site_dir / "meta.json").write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n")


def mirror_snapshot(args):
    site_dir = Path(args.out)
    fetcher = Fetcher(args.timestamp, delay=args.delay, retries=args.retries,
                      timeout=args.timeout)
    page = fetcher.get(args.url)
    if page is None:
        print(f"FATAL: snapshot {args.timestamp} of {args.url} is not retrievable", file=sys.stderr)
        return 1

    html = strip_trackers(strip_injected(decode_html(*page)))
    html, base_url = rebase(html, args.url)

    mirror = AssetMirror(fetcher, site_dir / "assets", workers=args.workers)
    seeds = set()
    walk_html(html, base_url, collector(seeds))
    mirror.collect(seeds)
    site_dir.mkdir(parents=True, exist_ok=True)
    mirror.write()

    (site_dir / "index.html").write_text(walk_html(html, base_url, localizer(mirror.names)), "utf-8")
    write_meta(site_dir, args)

    print(f"{site_dir.name}: assets ok={mirror.ok_count} "
          f"(reused {mirror.reused}) failed={len(mirror.failures)}")
    for url in sorted(mirror.failures):
        print(f"  missing: {url}")
    return 0


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("timestamp", help="Wayback timestamp, e.g. 20160312123456")
    parser.add_argument("url", help="original URL as archived, e.g. http://taskbase.com/")
    parser.add_argument("--out", required=True, help="output site directory")
    parser.add_argument("--title", default="")
    parser.add_argument("--era", default="")
    parser.add_argument("--stack", default="")
    parser.add_argument("--notes", default="")
    parser.add_argument("--status", default="partial", choices=["ok", "partial", "broken"])
    parser.add_argument("--delay", type=float, default=0.5, help="seconds a worker waits between requests")
    parser.add_argument("--workers", type=int, default=6, help="parallel asset downloads")
    parser.add_argument("--retries", type=int, default=4, help="retries per resource on 429/5xx")
    parser.add_argument("--timeout", type=int, default=25,
                        help="seconds before a request is abandoned; the archive lets a "
                             "request for something it does not have hang, so keep it short")
    return mirror_snapshot(parser.parse_args(argv))


if __name__ == "__main__":
    sys.exit(main())
