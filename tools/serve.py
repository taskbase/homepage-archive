#!/usr/bin/env python3
"""Static server for the homepage collection.

Sites live in sites/<slug>/ and are served under /s/<slug>/. Mirrored old sites
sometimes keep root-relative refs ("/css/x.css"); those 404 under a sub-path, so
a miss is retried inside the referring site's directory before giving up.
"""
import argparse
import os
import posixpath
import re
import urllib.parse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

SITE_PREFIX = "/s/"
SITE_RE = re.compile(r"/s/([^/]+)/")


class CollectionHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".webp": "image/webp",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "font/otf",
        ".svg": "image/svg+xml",
        ".mjs": "text/javascript",
        ".webm": "video/webm",
    }

    def translate_path(self, path):
        mapped = urllib.parse.urlparse(path).path
        if mapped.startswith(SITE_PREFIX):
            mapped = "/sites/" + mapped[len(SITE_PREFIX):]
        local = super().translate_path(mapped)
        if os.path.exists(local):
            return local
        return self._rescue(path) or local

    def _rescue(self, path):
        """Reattach a root-relative asset request to its referring site."""
        match = SITE_RE.match(urllib.parse.urlparse(self.headers.get("Referer", "")).path)
        if not match:
            return None
        clean = posixpath.normpath(urllib.parse.urlparse(path).path).lstrip("/")
        candidate = os.path.join(self.directory, "sites", match.group(1), clean)
        return candidate if os.path.exists(candidate) else None

    def send_response(self, code, message=None):
        super().send_response(code, message)
        self.send_header("Cache-Control", "no-store")

    def log_message(self, fmt, *args):
        if not self.server.quiet:
            super().log_message(fmt, *args)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4780)
    parser.add_argument("--bind", default="0.0.0.0")
    parser.add_argument("--root", default=os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    handler = partial(CollectionHandler, directory=args.root)
    server = ThreadingHTTPServer((args.bind, args.port), handler)
    server.quiet = args.quiet
    print(f"homepage collection on http://{args.bind}:{args.port}/  (root: {args.root})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()


if __name__ == "__main__":
    main()
