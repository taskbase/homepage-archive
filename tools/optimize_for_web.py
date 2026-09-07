#!/usr/bin/env python3
"""Shrink oversized images in a built site directory.

Runs on the Pages artifact, never on sites/ itself: the repo keeps each era's
assets exactly as they were served, while the published copy stays under
GitLab's max_pages_size (100 MB). Some originals are absurd for the web -
one 2015 hero is a 4500px-wide PNG photograph rendered at 1440.
"""
import argparse
from pathlib import Path

from PIL import Image

SUFFIXES = {".png", ".jpg", ".jpeg"}


def shrink(path: Path, max_side: int) -> int:
    """Downscale in place, keeping format. Returns bytes saved."""
    before = path.stat().st_size
    with Image.open(path) as im:
        if max(im.size) <= max_side:
            im.load()
            resized = im
        else:
            scale = max_side / max(im.size)
            resized = im.resize(
                (round(im.width * scale), round(im.height * scale)), Image.LANCZOS
            )
        resized.save(path, optimize=True)
    return before - path.stat().st_size


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path, help="built site directory")
    parser.add_argument("--min-bytes", type=int, default=300_000)
    parser.add_argument("--max-side", type=int, default=1800)
    args = parser.parse_args()

    saved = files = 0
    for path in sorted(args.root.rglob("*")):
        if path.suffix.lower() not in SUFFIXES or path.stat().st_size < args.min_bytes:
            continue
        try:
            delta = shrink(path, args.max_side)
        except OSError as exc:
            print(f"  skip {path}: {exc}")
            continue
        if delta > 0:
            saved += delta
            files += 1
    print(f"optimized {files} image(s), saved {saved // 1048576} MB")


if __name__ == "__main__":
    main()
