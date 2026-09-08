#!/usr/bin/env python3
"""Write each exhibit's dominant colour into its meta.json as "accent".

The landing page tints its background with the era's own colour, so the value
has to come from the screenshot rather than being picked by hand. Greys and
near-whites are skipped: most of these pages are mostly white chrome, and the
colour that identifies an era is the saturated one (a teal hero, a purple
brand block), not the page background.
"""
import argparse
import colorsys
import json
from pathlib import Path

from PIL import Image

SAMPLE_WIDTH = 160

# Two shots are dominated by warm photography -- a wooden desk, a portrait --
# so sampling returns skin and timber rather than the brand colour. These are
# the pages' own computed accents, read off the rendered exhibits.
OVERRIDES = {
    "2021-03-craft-cms": "#5d63c7",
    "2026-live": "#9301e6",
}
MIN_SATURATION = 0.18
MIN_VALUE = 0.15


def dominant(path: Path) -> str:
    with Image.open(path) as im:
        im = im.convert("RGB")
        im = im.resize((SAMPLE_WIDTH, max(1, round(im.height * SAMPLE_WIDTH / im.width))))
        quantized = im.quantize(colors=32, method=Image.MEDIANCUT)
        palette = quantized.getpalette()
        counts = sorted(quantized.getcolors(), reverse=True)

    best, best_weight = None, -1.0
    for count, index in counts:
        r, g, b = palette[index * 3:index * 3 + 3]
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if s < MIN_SATURATION or v < MIN_VALUE:
            continue
        # Frequency alone picks washed-out backgrounds; saturation alone picks
        # a stray accent pixel. Weight by both.
        weight = count * (s ** 1.5)
        if weight > best_weight:
            best, best_weight = (h, s, v), weight

    if best is None:
        return "#4a5060"
    h, s, v = best
    r, g, b = colorsys.hsv_to_rgb(h, min(1.0, s * 1.15), max(0.55, min(0.85, v)))
    return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    root = Path(__file__).resolve().parent.parent
    parser.add_argument("--root", type=Path, default=root)
    args = parser.parse_args()

    for meta_path in sorted((args.root / "sites").glob("*/meta.json")):
        preview = meta_path.parent / "preview.png"
        if not preview.exists():
            continue
        meta = json.loads(meta_path.read_text())
        meta["accent"] = OVERRIDES.get(meta_path.parent.name) or dominant(preview)
        meta_path.write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n",
                             encoding="utf-8")
        print(f"  {meta_path.parent.name:36} {meta['accent']}")


if __name__ == "__main__":
    main()
