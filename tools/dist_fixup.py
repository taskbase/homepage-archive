#!/usr/bin/env python3
"""Make an Angular dist/ servable under /s/<slug>/ and strip its trackers.

Rewrites root-relative asset refs ("/assets/x.png") to relative ones and drops
the Google Tag Manager, Inspectlet and www-redirect blocks from index.html.

    python3 tools/dist_fixup.py <dist-dir>
"""
import pathlib
import re
import sys

ROOT_RELATIVE = re.compile(r'(["\'\(])/(assets/|favicon|ie\.html)')

TRACKERS = [
    re.compile(r'<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->', re.S),
    re.compile(r'<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->', re.S),
    re.compile(r'<script[^>]*>[^<]*googletagmanager[^<]*</script>', re.S),
    re.compile(r'<script[^>]*src="https://www\.google[^"]*"[^>]*></script>'),
    re.compile(r'<script>\s*// Inspectlet.*?</script>', re.S),
    re.compile(r"<script>\s*if \(location\.hostname === [\"']taskbase\.com[\"']\).*?</script>", re.S),
]


def main(dist: pathlib.Path):
    for path in dist.rglob('*'):
        if path.suffix not in ('.js', '.css', '.html') or not path.is_file():
            continue
        text = path.read_text(encoding='utf-8', errors='surrogateescape')
        fixed = ROOT_RELATIVE.sub(r'\1\2', text)
        if fixed != text:
            path.write_text(fixed, encoding='utf-8', errors='surrogateescape')
            print('fixed refs:', path.name)

    index = dist / 'index.html'
    html = index.read_text(encoding='utf-8')
    before = len(html)
    for tracker in TRACKERS:
        html = tracker.sub('', html)
    index.write_text(html, encoding='utf-8')
    print('index.html: %d -> %d bytes' % (before, len(html)))


if __name__ == '__main__':
    main(pathlib.Path(sys.argv[1]))
