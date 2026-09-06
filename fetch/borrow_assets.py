#!/usr/bin/env python3
"""Fill a mirror's gaps from the other mirrors of the same site.

Wayback's coverage of one snapshot is not the coverage of the next, so a file the
2023 crawl missed is often sitting in the 2022 mirror already. `wayback_mirror`
leaves anything it could not fetch as its original absolute URL, and names what it
did fetch `<sha1(url)[:8]>-<basename>`. That digest is an exact key for the
original URL, so a lost reference can be matched against every other mirror
without guessing from file names — same URL, same bytes, just crawled on a
different day.

Only exact URL matches are copied. Nothing is renamed, invented or resized.
"""

import argparse
import re
import shutil
import sys
from pathlib import Path

import wayback_mirror

ASSET_URL_RE = re.compile(
    r'https?://[^\s"\'<>()]+\.(?:css|js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|mp4|webm)'
    r'(?:\?[^\s"\'<>()]*)?',
    re.I,
)


def lost_urls(page_text):
    """Absolute asset URLs still in the page — whatever the mirror could not fetch."""
    return sorted({match.group(0) for match in ASSET_URL_RE.finditer(page_text)})


def find_donor(url, donor_dirs, loose=False):
    """The copy of `url` in another mirror, matched on the digest of the URL itself.

    `loose` falls back to the file name, which is how a library survives a version
    bump in its cache-buster (`jquery.min.js?ver=3.6.0` vs `?ver=3.6.1`): a
    different URL, the same file in the same place on the same site. It is a
    substitution rather than a recovery, so callers must opt in and say so.
    """
    for prefix in (wayback_mirror._digest(url), wayback_mirror._digest(url.split("?", 1)[0])):
        for donor in donor_dirs:
            match = next(donor.glob(f"{prefix}-*"), None)
            if match is not None:
                return match, False
    if loose:
        name = url.split("?", 1)[0].rsplit("/", 1)[-1]
        if name:
            for donor in donor_dirs:
                match = next((p for p in sorted(donor.glob(f"*-{name}")) if p.is_file()), None)
                if match is not None:
                    return match, True
    return None, False


def borrow(site_dir, donor_dirs, loose=False, dry_run=False):
    page = site_dir / "index.html"
    text = page.read_text(encoding="utf-8", errors="replace")
    assets_dir = site_dir / "assets"

    borrowed, missing = [], []
    for url in lost_urls(text):
        donor, substituted = find_donor(url, donor_dirs, loose=loose)
        if donor is None:
            missing.append(url)
            continue
        if not dry_run:
            assets_dir.mkdir(parents=True, exist_ok=True)
            target = assets_dir / donor.name
            if not target.exists():
                shutil.copy2(donor, target)
            text = text.replace(url, f"assets/{donor.name}")
        borrowed.append((url, donor, substituted))

    if not dry_run and borrowed:
        page.write_text(text, encoding="utf-8")

    for url, donor, substituted in borrowed:
        kind = "substituted" if substituted else "borrowed"
        print(f"  {kind} {url.rsplit('/', 1)[-1][:60]}  <- {donor.parent.parent.name}")
    for url in missing:
        print(f"  still lost {url.rsplit('/', 1)[-1][:60]}")
    print(f"{site_dir.name}: borrowed {len(borrowed)}, still lost {len(missing)}"
          f"{' (dry run)' if dry_run else ''}")
    return borrowed, missing


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", required=True, help="mirror to fill in")
    parser.add_argument("--donors", nargs="*", help="site dirs to borrow from (default: siblings)")
    parser.add_argument("--loose", action="store_true",
                        help="also match on file name, for cache-buster version drift")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args(argv)

    site_dir = Path(args.site).resolve()
    if not (site_dir / "index.html").is_file():
        print(f"no index.html in {site_dir}", file=sys.stderr)
        return 1

    if args.donors:
        donors = [Path(d).resolve() / "assets" for d in args.donors]
    else:
        donors = sorted(p / "assets" for p in site_dir.parent.iterdir()
                        if p.is_dir() and (p / "assets").is_dir())
    # The mirror's own assets count as a donor: an earlier run may have stored the
    # file under a slightly different URL (a bumped ?ver=), which a digest lookup
    # cannot see but a name lookup can.
    donors.append(site_dir / "assets")
    borrow(site_dir, [d for d in donors if d.is_dir()], args.loose, args.dry_run)
    return 0


if __name__ == "__main__":
    sys.exit(main())
