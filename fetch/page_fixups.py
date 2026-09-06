#!/usr/bin/env python3
"""Post-mirror fixups for a mirrored page, re-runnable after a re-mirror.

`wayback_mirror` rewrites index.html from scratch every run, so anything hand-done
to a page has to be reapplied afterwards. These are the three things worth keeping:

  link-css     attach a local museum stylesheet. It goes at the end of <body>, not in
               <head>: WordPress prints stylesheets in the body too, and those would
               otherwise win. Used to undo layout damage from scripts the archive lost
               (an uninitialised carousel spilling past the page, say).
  badge        a muted, collapsed bottom-right note. Only for pages that would mislead
               on their own — the pre-Taskbase captures of the domain. Never a banner:
               caveats belong in meta.json, which the gallery renders.
  drop-scripts delete <script> tags whose markup matches a substring. `wayback_mirror`
               keeps the absolute URL of anything the archive lost, so a script the
               mirror could not store still loads — live, off the open internet — and
               the exhibit stops being a mirror. Use it for those and for the widgets
               that ruin a thumbnail: consent banners, chat bubbles, popups.

All three are idempotent.
"""

import argparse
import html
import re
import sys
from pathlib import Path

BADGE_MARKER = "museum-badge"
SCRIPT_TAG_RE = re.compile(r"<script\b[^>]*>.*?</script>|<script\b[^>]*/>", re.I | re.S)

BADGE_TEMPLATE = """
<div id="{marker}" style="position:fixed;right:10px;bottom:10px;z-index:2147483647;
  font:12px/1.45 system-ui,sans-serif;max-width:min(360px,calc(100vw - 24px));text-align:left">
  <div id="{marker}-body" hidden style="background:#1b1b1bee;color:#e8e8e8;padding:10px 12px;
    border-radius:8px;margin-bottom:6px;box-shadow:0 2px 10px #0006">{body}</div>
  <button type="button" onclick="var b=document.getElementById('{marker}-body');b.hidden=!b.hidden"
    style="all:unset;cursor:pointer;background:#1b1b1b99;color:#cfcfcf;padding:4px 9px;
    border-radius:999px;float:right">{label}</button>
</div>
"""


def _insert_at_body_end(text, addition):
    cut = text.lower().rfind("</body>")
    return text + addition if cut < 0 else text[:cut] + addition + text[cut:]


def link_css(page, stylesheet):
    tag = f'<link rel="stylesheet" href="{stylesheet}">'
    text = page.read_text(encoding="utf-8", errors="replace")
    if tag in text:
        return False
    page.write_text(_insert_at_body_end(text, tag + "\n"), encoding="utf-8")
    return True


def drop_scripts(page, matches):
    text = page.read_text(encoding="utf-8", errors="replace")
    dropped = 0

    def drop_if_matched(match):
        nonlocal dropped
        if not any(needle in match.group(0) for needle in matches):
            return match.group(0)
        dropped += 1
        return ""

    stripped = SCRIPT_TAG_RE.sub(drop_if_matched, text)
    if dropped:
        page.write_text(stripped, encoding="utf-8")
    return dropped


def badge(page, label, body):
    text = page.read_text(encoding="utf-8", errors="replace")
    if BADGE_MARKER in text:
        return False
    markup = BADGE_TEMPLATE.format(
        marker=BADGE_MARKER, label=html.escape(label), body=html.escape(body)
    )
    page.write_text(_insert_at_body_end(text, markup), encoding="utf-8")
    return True


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", required=True, help="site directory holding index.html")
    subparsers = parser.add_subparsers(dest="fixup", required=True)

    css = subparsers.add_parser("link-css", help="link a local stylesheet at the end of <body>")
    css.add_argument("--stylesheet", default="museum.css")

    note = subparsers.add_parser("badge", help="add the collapsed bottom-right note")
    note.add_argument("--label", default="not Taskbase")
    note.add_argument("--body", required=True)

    scripts = subparsers.add_parser("drop-scripts", help="delete matching <script> tags")
    scripts.add_argument("--match", required=True, action="append",
                         help="substring a script tag must contain to be dropped (repeatable)")

    args = parser.parse_args(argv)
    page = Path(args.site) / "index.html"
    if not page.is_file():
        print(f"no index.html in {args.site}", file=sys.stderr)
        return 1

    if args.fixup == "link-css":
        changed = link_css(page, args.stylesheet)
    elif args.fixup == "drop-scripts":
        changed = drop_scripts(page, args.match)
        print(f"{page}: dropped {changed} script tag(s)")
        return 0
    else:
        changed = badge(page, args.label, args.body)
    print(f"{page}: {args.fixup} {'applied' if changed else 'already present'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
