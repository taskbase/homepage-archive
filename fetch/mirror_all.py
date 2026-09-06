#!/usr/bin/env python3
"""Re-mirror every era listed in eras.json into sites/<slug>/."""

import argparse
import json
import sys
from pathlib import Path

import wayback_mirror

ERAS_FILE = Path(__file__).with_name("eras.json")
SITES_DIR = Path(__file__).resolve().parent.parent / "sites"


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("slugs", nargs="*", help="only mirror these slugs (default: all)")
    parser.add_argument("--sites-dir", default=str(SITES_DIR))
    parser.add_argument("--delay", default="1.0", help="seconds a worker waits between requests")
    parser.add_argument("--workers", default="4", help="parallel asset downloads")
    parser.add_argument("--retries", default="5", help="retries per resource on 429/5xx")
    parser.add_argument("--timeout", default="25", help="seconds before a request is abandoned")
    args = parser.parse_args(argv)

    eras = json.loads(ERAS_FILE.read_text())
    if args.slugs:
        # Honour the order the slugs were asked for, so a run can be prioritised.
        by_slug = {era["slug"]: era for era in eras}
        selected = [by_slug[slug] for slug in args.slugs if slug in by_slug]
    else:
        selected = eras
    if not selected:
        print("no matching slugs", file=sys.stderr)
        return 1

    failed = 0
    for era in selected:
        failed |= wayback_mirror.main([
            era["timestamp"], era["url"],
            "--out", str(Path(args.sites_dir) / era["slug"]),
            "--title", era["title"],
            "--era", era["era"],
            "--stack", era["stack"],
            "--notes", era["notes"],
            "--status", era.get("status", "partial"),
            "--delay", args.delay, "--workers", args.workers, "--retries", args.retries,
            "--timeout", args.timeout,
        ])
    return failed


if __name__ == "__main__":
    sys.exit(main())
