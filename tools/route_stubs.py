#!/usr/bin/env python3
"""Make an Angular app's deep links work on the plain static server.

    python3 tools/route_stubs.py sites/<slug> team impressum examples/grammar ...

Drops a copy of index.html at <route>/index.html with an absolute <base href>
pointing at the app root. The root index.html keeps its relative "./" base; only
these stubs spell the mount path out, because Angular resolves a relative base
href against the document's already-rebased URL and a relative one would land a
level too high. The mount path is fixed by CONTRACT.md (/s/<slug>/).
"""
import pathlib
import re
import sys

BASE_TAG = re.compile(r'<base href="[^"]*"\s*/?>')


def main(site: pathlib.Path, routes):
    base = '/s/%s/' % site.name
    html = (site / 'index.html').read_text(encoding='utf-8')
    for route in routes:
        out = site / route
        out.mkdir(parents=True, exist_ok=True)
        (out / 'index.html').write_text(
            BASE_TAG.sub('<base href="%s">' % base, html), encoding='utf-8')
        print('stub', route)


if __name__ == '__main__':
    main(pathlib.Path(sys.argv[1]), sys.argv[2:])
