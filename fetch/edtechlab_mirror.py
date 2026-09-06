#!/usr/bin/env python3
"""Build the edtechlab.ch exhibit on top of fetch/wayback_mirror.py.

edtechlab.ch was the corporate site of edTechLab AG, the name Taskbase carried
until spring 2016. All three of its captures are the bare shell of a Meteor
1.1.0.2 client-rendered app: `<body>` is empty and every word of content sat in
a JS bundle that was never crawled. So the generic mirror is correct but leaves
two dangling references this script has to settle:

* the Meteor JS bundle URL. Wayback has no capture of it at this timestamp and
  falls back to a much later one, which returns the HostGator 404 page the
  domain served in 2018 -- an artefact of a different era, saved under a `.js`
  name. Dropped, and the `<script>` tag defused rather than deleted so the page
  still shows what it asked for.
* the Meteor CSS bundle URL, which nothing archived at all. The mirror leaves it
  as an absolute `http://edtechlab.ch/...` ref; defused the same way so the page
  makes no live request.

What does survive is genuine: the archived favicon (the red flask bubbles from
the edTechLab logo) and the Open Sans 300 webfont.

The hunt for the bundle is over and it came up empty -- Common Crawl, arquivo.pt,
archive.today, four dead or walled aggregators, 132 GitLab namespace probes, the
2015 committers' GitHub accounts and every blob in the monorepo's object
database. `sites/2015-11-edtechlab-ch/RECOVERY.md` records each query and its
result; don't repeat it without reading that first.

Re-running is idempotent.
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import page_fixups
import wayback_mirror

TIMESTAMP = "20151114141508"
URL = "http://edtechlab.ch/"
SLUG = "2015-11-edtechlab-ch"

# Bundle URLs whose only archived responses belong to a later owner/era or are
# Meteor's own not-found stub. Neither is content, so neither is shipped.
DEAD_BUNDLE_RE = re.compile(
    r"""(<(?:script|link)\b[^>]*?)\b(src|href)(\s*=\s*["'])([^"']*?"""
    r"""(?:[0-9a-f]{40}\.js|[0-9a-f]{40}\.css\?meteor_css_resource=true))(["'])""",
    re.I,
)

BADGE_LABEL = "never rendered"
BADGE_BODY = (
    "edtechlab.ch, the corporate site of edTechLab AG - the name Taskbase used "
    "until spring 2016. It was a Meteor 1.1 app that drew its whole page in the "
    "browser, and the Internet Archive never crawled the JS bundle, so this "
    "blank page is the entire capture. Only the favicon and the webfont "
    "survived. Nothing has been reconstructed."
)

META = {
    "slug": SLUG,
    "title": "edTechLab AG 2015 — edtechlab.ch, never rendered",
    "era": "2015-11 – 2016-03 (corporate site, pre-rename)",
    "source": "wayback",
    "origin": wayback_mirror.WAYBACK_TEMPLATE.format(timestamp=TIMESTAMP, url=URL),
    "stack": "Meteor 1.1.0.2 client-rendered app (xolvio md-blog package), Open Sans 300",
    "captured": "2026-09-03",
    "status": "broken",
    "notes": (
        "Taskbase's own prior corporate identity, not another party: edTechLab AG, registered 201"
        "5-08-07 in Zürich. The monorepo's first commit (2015-05-29) already footers \"Copyright ©"
        " 2015 edTechLab AG (info@edtechlab.ch)\", and from 2015-09-10 that footer carried the edT"
        "ech Laboratory flask logo linking to www.edtechlab.ch — the red bubbles of the favicon r"
        "ecovered here. The three captures (2015-11-14, 2016-01-11, 2016-03-08) are three separat"
        "e deploys rather than one page: each carries its own Meteor bundle hash and autoupdateVe"
        "rsion, and the two later ones also pull Font Awesome 4.5.0. All three have an empty <bod"
        "y> — every word of content sat in a JS bundle no archive ever fetched, so both bundle re"
        "fs are defused here rather than shipped: the JS URL's nearest capture is a 2018 HostGato"
        "r 404, and the CSS URL that does return 200 is Meteor's own .meteor-css-not-found-error "
        "stub. The runtime config does survive: xolvio md-blog at its demo defaults, Pure CSS, bl"
        "og at /blog. The source was never in the monorepo — a 2016-01 script deploys it with mup"
        " from a laptop to a DigitalOcean box. Pages that existed but went uncrawled: /taskbase, "
        "/bashclient/doc/, /twiml1.xml. The domain 301s to taskbase.org from 2016-03-29, but the "
        "legal rename to Taskbase AG only followed on 2017-02-08, which is why the Java packages "
        "left com.edtechlab in 2017-01. RECOVERY.md logs every archive, index, namespace and quer"
        "y tried. The blank page is the exhibit; a muted bottom-right badge says so on click."
    ),
}


def defuse(site_dir):
    """Point dangling bundle refs at nothing and delete the junk asset."""
    page = site_dir / "index.html"
    text = page.read_text(encoding="utf-8")

    dropped = []
    for match in DEAD_BUNDLE_RE.finditer(text):
        target = match.group(4)
        if not target.lower().startswith(("http://", "https://", "//")):
            asset = site_dir / target
            if asset.is_file():
                asset.unlink()
                dropped.append(target)

    text, count = DEAD_BUNDLE_RE.subn(r"\1data-museum-not-archived\3\4\5", text)
    page.write_text(text, encoding="utf-8")
    return count, dropped


def main():
    site_dir = Path(__file__).resolve().parent.parent / "sites" / SLUG

    class Args:
        timestamp, url, out = TIMESTAMP, URL, str(site_dir)
        title = META["title"]
        era, stack, notes, status = META["era"], META["stack"], META["notes"], META["status"]
        delay, workers, retries, timeout = 0.6, 4, 4, 25

    if wayback_mirror.mirror_snapshot(Args()) != 0:
        return 1

    count, dropped = defuse(site_dir)
    print(f"defused {count} un-archived bundle ref(s); dropped {dropped or 'nothing'}")

    import json

    (site_dir / "meta.json").write_text(json.dumps(META, indent=2, ensure_ascii=False) + "\n")
    page_fixups.main(["--site", str(site_dir), "badge", "--label", BADGE_LABEL,
                      "--body", BADGE_BODY])
    return 0


if __name__ == "__main__":
    sys.exit(main())
