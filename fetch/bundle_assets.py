#!/usr/bin/env python3
"""Backfill assets that only a JS/CSS bundle references, into their real paths.

`wayback_mirror` follows HTML and CSS references, but a compiled SPA bundle builds
its image URLs at runtime by concatenating a prefix with a bare file name, so those
never get crawled. This walks the bundles a mirror already stored, works out the
candidate URLs, fetches whatever the archive actually has and writes it under the
original path (`assets/img/...`) so the concatenation still resolves. Finally the
root-relative `/assets/` prefix is rewritten relative, since the mirror is served
from a sub-path.

Already-present files are left alone, so a re-run resumes instead of re-fetching.
"""

import argparse
import json
import re
import sys
import urllib.parse
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import wayback_mirror

BUNDLE_SUFFIXES = (".js", ".css")
ASSET_EXTENSIONS = "png|jpg|jpeg|svg|gif|webp|woff2|woff|ttf|eot|mp4|webm"
ABSOLUTE_REF_RE = re.compile(r'"(/assets/[A-Za-z0-9_/.\-]+\.(?:%s))"' % ASSET_EXTENSIONS)
PREFIX_RE = re.compile(r'"(/assets/[A-Za-z0-9_/\-]*/)"')
BARE_NAME_RE = re.compile(r'"([A-Za-z0-9_\-]+(?:/[A-Za-z0-9_\-]+)*\.(?:%s))"' % ASSET_EXTENSIONS)


def bundles(site_dir):
    return sorted(p for p in site_dir.rglob("*") if p.suffix in BUNDLE_SUFFIXES and p.is_file())


def candidates(site_dir):
    """Return the archive paths worth trying, most likely first."""
    absolute, prefixes, bare = set(), set(), set()
    for path in bundles(site_dir):
        text = path.read_text(encoding="utf-8", errors="replace")
        absolute.update(ABSOLUTE_REF_RE.findall(text))
        prefixes.update(PREFIX_RE.findall(text))
        bare.update(BARE_NAME_RE.findall(text))
    combined = {prefix + name for prefix in prefixes for name in bare}
    return sorted(absolute), sorted(combined - absolute)


def backfill(site_dir, timestamp, base_url, delay, workers, retries):
    direct, guesses = candidates(site_dir)
    wanted = [p for p in direct + guesses if not (site_dir / p.lstrip("/")).exists()]
    kept = sum(1 for p in direct + guesses if (site_dir / p.lstrip("/")).exists())
    if not wanted:
        print(f"{site_dir.name}: nothing to backfill (already have {kept})")
        return 0

    fetcher = wayback_mirror.Fetcher(timestamp, delay=delay, retries=retries)
    with ThreadPoolExecutor(workers) as pool:
        results = list(pool.map(lambda p: fetcher.get(urllib.parse.urljoin(base_url, p)), wanted))

    added = 0
    for path, result in zip(wanted, results):
        if result is None or not result[0]:
            continue
        target = site_dir / path.lstrip("/")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(result[0])
        added += 1
    print(f"{site_dir.name}: backfilled {added}/{len(wanted)} (kept {kept}), "
          f"{len(direct)} direct refs, {len(guesses)} prefix guesses")
    return added


def relativize(site_dir):
    """Point the bundles' root-relative asset refs at the mirror's own tree."""
    for path in bundles(site_dir):
        text = path.read_text(encoding="utf-8", errors="replace")
        rewritten = text.replace('"/assets/', '"assets/').replace("'/assets/", "'assets/")
        if rewritten != text:
            path.write_text(rewritten, encoding="utf-8")
            print(f"  relativized {path.relative_to(site_dir)}")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", required=True, help="mirrored site directory")
    parser.add_argument("--timestamp", help="Wayback timestamp (default: read from meta.json)")
    parser.add_argument("--base", help="original site root (default: read from meta.json)")
    parser.add_argument("--delay", type=float, default=1.0)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--retries", type=int, default=5)
    args = parser.parse_args(argv)

    site_dir = Path(args.site)
    timestamp, base_url = args.timestamp, args.base
    if not (timestamp and base_url):
        origin = json.loads((site_dir / "meta.json").read_text())["origin"]
        match = re.match(r"https://web\.archive\.org/web/(\d+)id_/(.+)", origin)
        if not match:
            print(f"cannot read snapshot from {site_dir}/meta.json", file=sys.stderr)
            return 1
        timestamp = timestamp or match.group(1)
        base_url = base_url or match.group(2)

    backfill(site_dir, timestamp, base_url, args.delay, args.workers, args.retries)
    relativize(site_dir)
    return 0


if __name__ == "__main__":
    sys.exit(main())
