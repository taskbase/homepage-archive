#!/usr/bin/env python3
"""Mirror the 2021 Craft CMS homepage.

The archive crawled the Craft pages but none of their assets: the CSS, JS, fonts
and favicons lived under taskbase.com/ (never fetched) and the content images sat
on the servd.host CDN (fetched, but at other timestamps than the page).

So this builds on `wayback_mirror` with two extra sources:

  * files taken straight from the craft-homepage git checkout's `web/` folder,
  * per-asset nearest-snapshot lookup through the CDX API.

Everything else — tracker stripping, CSS walking, reference rewriting — is
wayback_mirror's.
"""

import argparse
import json
import mimetypes
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import wayback_mirror as wm

CDX_URL = "https://web.archive.org/cdx/search/cdx"
SITE_HOSTS = ("taskbase.com", "www.taskbase.com")


# Assets the archive lost that survive elsewhere on disk, keyed by the URL Craft
# served them from.
#
#   * The hero photo above 500px exists only as the Imager plugin's cached
#     transforms, committed to the repo before Imager was switched off again on
#     2021-02-10. Same bytes the servd image service would have returned, at the
#     1000w and 2000w the srcset asks for.
#   * The ETH Zurich logo's single capture is a 404 and the servd volume is gone, so
#     the same wordmark is taken from this site's own 2022 WordPress mirror. It is a
#     different derivative of one piece of brand artwork, not the file Craft served
#     — meta.json says so.
RESTORED_FROM_DISK = {
    "Content-Images/TB_Header.jpg?w=1000": "repo:imager/assets/9/"
        "brooke-cagle-uWVWQ8gF8PE-unsplash-3_d3867277feb154defec9b24a5714fadb.jpg",
    "Content-Images/TB_Header.jpg?w=2000": "repo:imager/assets/9/"
        "brooke-cagle-uWVWQ8gF8PE-unsplash-3_bc9e4c42e52fd22ff41eda620350ec20.jpg",
    "Logos/01_Logo_ETH.png?w=340": "site:2022-04-wordpress-feedback-engine/assets/"
        "02802c56-logo-eth-zuerich.jpg",
}


def restored_path(url, repo_web, sites_dir):
    """The on-disk stand-in for `url`, or None when the archive is the only source."""
    for marker, source in RESTORED_FROM_DISK.items():
        if marker not in url:
            continue
        kind, _, rest = source.partition(":")
        root = repo_web if kind == "repo" else sites_dir
        return (Path(root) / rest) if root else None
    return None


class EraFetcher(wm.Fetcher):
    """Fetcher that prefers the git checkout, then any snapshot of the asset."""

    def __init__(self, timestamp, repo_web=None, delay=0.3, cdx_map=None, sites_dir=None):
        super().__init__(timestamp, delay=delay, retries=1, timeout=180)
        self.repo_web = Path(repo_web) if repo_web else None
        self.sites_dir = Path(sites_dir) if sites_dir else None
        self.cdx_map = cdx_map or {}
        self.from_repo = set()
        self.from_other_snapshot = {}

    def get(self, url):
        hit = self._from_repo(url)
        if hit is not None:
            self._log("repo", url)
            return hit
        # Only the site's own host was crawled at the page timestamp; CDN assets
        # were captured at other times, so go looking for those straight away.
        if urllib.parse.urlsplit(url).hostname in SITE_HOSTS:
            hit = super().get(url)
        if hit is not None:
            self._log("snapshot", url)
            return hit
        hit = self._from_nearest(url)
        self._log("nearest" if hit else "MISSING", url)
        return hit

    @staticmethod
    def _log(source, url):
        print(f"  {source:9} {url[:110]}", file=sys.stderr, flush=True)

    def _from_repo(self, url):
        restored = restored_path(url, self.repo_web, self.sites_dir)
        if restored is not None and restored.is_file():
            self.from_repo.add(url)
            kind = mimetypes.guess_type(restored.name)[0] or "application/octet-stream"
            return restored.read_bytes(), kind
        if not self.repo_web:
            return None
        split = urllib.parse.urlsplit(url)
        if split.hostname not in SITE_HOSTS:
            return None
        candidate = self.repo_web / split.path.lstrip("/")
        if not candidate.is_file() or self.repo_web not in candidate.resolve().parents:
            return None
        self.from_repo.add(url)
        kind = mimetypes.guess_type(candidate.name)[0] or "application/octet-stream"
        return candidate.read_bytes(), kind

    def _from_nearest(self, url):
        timestamp = self._nearest_timestamp(url)
        if timestamp is None:
            return None
        borrowed = wm.Fetcher(timestamp, delay=self.delay, retries=self.retries)
        result = borrowed.get(url)
        if result is not None:
            self.from_other_snapshot[url] = timestamp
        return result

    def _nearest_timestamp(self, url):
        if url in self.cdx_map:
            return self.cdx_map[url]
        query = urllib.parse.urlencode({
            "url": url, "output": "text", "fl": "timestamp",
            "filter": "statuscode:200", "limit": "3", "collapse": "digest",
        })
        request = urllib.request.Request(f"{CDX_URL}?{query}", headers={"User-Agent": wm.USER_AGENT})
        for attempt in range(3):
            try:
                with urllib.request.urlopen(request, timeout=120) as response:
                    rows = response.read().decode().split()
                time.sleep(self.delay)
                return rows[0] if rows else None
            except (urllib.error.URLError, TimeoutError, OSError):
                if attempt == 2:
                    return None
                time.sleep(12)
        return None


def load_cdx_map(path):
    """Read a CDX text dump (timestamp, original, ...) into {url: timestamp}.

    Saves one CDX round trip per asset, which matters because the archive never
    captured these images at the page's own timestamp.
    """
    if not path:
        return {}
    mapping = {}
    for line in Path(path).read_text().splitlines():
        fields = line.split()
        if len(fields) >= 2:
            mapping.setdefault(fields[1], fields[0])
    return mapping


def relink_pages(html, pages):
    """Point the site's own links at the local copies, drop the rest of the nav."""
    for path, local in pages.items():
        for host in SITE_HOSTS:
            for scheme in ("https", "http"):
                html = html.replace(f'"{scheme}://{host}{path}"', f'"{local}"')
        html = html.replace(f'"{path}"', f'"{local}"')
    return html


# Sizes the archive never captured, and one asset it only has as a 302.
#
# Craft asked servd's image service for each picture at 10/500/1000/2000px and
# the crawler kept whichever the page it was fetching happened to request. So a
# `srcset` usually survives at one width only, and a browser given a viewport
# wider than that width picks a dead URL. These rules point every reference at
# the width that does exist. The image-service URLs also reach the HTML through
# `style="background-image: url(...)"` with `&amp;` entities, which the CDX API
# does not match, so those never resolve on their own either.
#
# The ETH Zurich logo, whose one capture is a 404, comes off disk instead.
SERVD = r"https://optimise2\.assets-servd\.host/[a-z0-9-]+/production"
ERA_FIXUPS = [
    # hero photo: 1000w and 2000w come off disk (see RESTORED_FROM_DISK), the 10px
    # placeholder only reaches the page through an escaped background-image url()
    (rf"{SERVD}/Content-Images/TB_Header\.jpg\?w=10&amp;[^)]*", "TB_Header.jpg?w=10"),
    # process image: nothing above the 10px placeholder was ever crawled
    (rf'data-srcset="{SERVD}/Content-Images/TB_Content_2\.png[^"]*"', ""),
    (rf"{SERVD}/Content-Images/TB_Content_2\.png\?w=(?:500|1000|2000)[^\"]*", "TB_Content_2.png?w=10"),
    (rf"{SERVD}/Content-Images/TB_Content_2\.png\?w=10&amp;[^)]*", "TB_Content_2.png?w=10"),
    # the CDN video is a 302 in the archive; the repo's final commit serves its own
    (r'src="[^"]*TB_Demo_4\.mp4"', 'src="/videos/TB_Demo.mp4"'),
]

# Dead XHR to Craft's CSRF endpoint, injected by the servd asset-storage plugin.
CSRF_SCRIPT = re.compile(r"<script>window\.SERVD_CSRF_TOKEN_NAME.*?</script>", re.S)


def apply_fixups(html):
    for pattern, replacement in ERA_FIXUPS:
        html = re.sub(pattern, replacement, html)
    return CSRF_SCRIPT.sub("", html)


def mirror(args):
    site_dir = Path(args.out)
    pages = json.loads(Path(args.pages).read_text()) if args.pages else {"/": "index.html"}
    fetcher = EraFetcher(args.timestamp, repo_web=args.repo_web, delay=args.delay,
                         cdx_map=load_cdx_map(args.cdx_map), sites_dir=args.sites_dir)
    assets = wm.AssetMirror(fetcher, site_dir / "assets", workers=args.workers)

    documents, seeds = {}, set()
    for path, local in pages.items():
        page_url = urllib.parse.urljoin(args.url, path)
        fetched = fetcher.get(page_url)
        if fetched is None:
            print(f"  skip {path}: no snapshot", file=sys.stderr)
            continue
        html = wm.strip_trackers(wm.strip_injected(wm.decode_html(*fetched)))
        rebase = getattr(wm, "rebase", None) or wm.take_base_url
        html, base_url = rebase(html, page_url)
        documents[local] = (html, base_url)
        html = apply_fixups(html)
        wm.walk_html(html, base_url, wm.collector(seeds))

    assets.collect(seeds)
    site_dir.mkdir(parents=True, exist_ok=True)
    assets.write()

    resolve = wm.localizer(assets.names)
    for local, (html, base_url) in documents.items():
        (site_dir / local).write_text(relink_pages(wm.walk_html(html, base_url, resolve), pages), "utf-8")

    report = {
        "pages": sorted(documents),
        "assets_ok": len(assets.bodies),
        "assets_from_repo": len(fetcher.from_repo),
        "assets_from_other_snapshot": fetcher.from_other_snapshot,
        "assets_missing": sorted(assets.failures),
    }
    print(json.dumps(report, indent=2))
    if args.report:
        Path(args.report).write_text(json.dumps(report, indent=2) + "\n")
    return 0


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("timestamp")
    parser.add_argument("url", help="page URL of the snapshot, e.g. https://www.taskbase.com/")
    parser.add_argument("--out", required=True)
    parser.add_argument("--pages", help="JSON file mapping site paths to local file names")
    parser.add_argument("--repo-web", help="path to the craft-homepage web/ folder")
    parser.add_argument("--cdx-map", help="CDX text dump giving each asset's own snapshot")
    parser.add_argument("--sites-dir", help="collection sites/ folder, for RESTORED_FROM_DISK")
    parser.add_argument("--report", help="write the asset report here")
    parser.add_argument("--delay", type=float, default=0.4)
    parser.add_argument("--workers", type=int, default=4)
    return mirror(parser.parse_args(argv))


if __name__ == "__main__":
    sys.exit(main())
