#!/usr/bin/env python3
"""Generate index.html: one card per site in sites/*/meta.json."""
import argparse
import html
import json
import os
import re
from pathlib import Path

STATUS_ORDER = {"ok": 0, "partial": 1, "broken": 2}
SLUG_DATE = re.compile(r"^(\d{4})(?:-(\d{2}))?")

CSS = """
:root{--bg:#0d0e12;--card:#16181f;--line:#252833;--fg:#e8e9ee;--dim:#8b8f9e;
--ok:#4ade80;--partial:#fbbf24;--broken:#f87171;--accent:#7dd3fc}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
font:15px/1.5 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif}
header{padding:56px 32px 28px;max-width:1400px;margin:0 auto}
h1{margin:0 0 8px;font-size:30px;letter-spacing:-.02em}
header p{margin:0;color:var(--dim);max-width:62ch}
main{max-width:1400px;margin:0 auto;padding:8px 32px 72px;
display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))}
a.card{display:flex;flex-direction:column;background:var(--card);color:inherit;
text-decoration:none;border:1px solid var(--line);border-radius:12px;overflow:hidden;
transition:border-color .15s,transform .15s}
a.card:hover{border-color:var(--accent);transform:translateY(-2px)}
.shot{aspect-ratio:16/11;background:#0a0b0e;overflow:hidden;border-bottom:1px solid var(--line)}
.shot img{width:100%;display:block}
.shot.empty{display:grid;place-items:center;color:var(--dim);font-size:13px}
.body{padding:14px 16px 16px}
.top{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
h2{margin:0;font-size:16px;font-weight:600}
.era{color:var(--dim);font-size:13px;white-space:nowrap}
.meta{margin-top:10px;display:flex;flex-wrap:wrap;gap:6px}
.chip{font-size:11px;padding:2px 8px;border-radius:99px;border:1px solid var(--line);color:var(--dim)}
.chip.st{border-color:transparent}
.st-ok{background:rgba(74,222,128,.12);color:var(--ok)}
.st-partial{background:rgba(251,191,36,.12);color:var(--partial)}
.st-broken{background:rgba(248,113,113,.12);color:var(--broken)}
.notes{margin:10px 0 0;color:var(--dim);font-size:13px;overflow:hidden;
display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:6;line-clamp:6}
a.card:hover .notes{-webkit-line-clamp:none;line-clamp:none}
footer{max-width:1400px;margin:0 auto;padding:0 32px 48px;color:var(--dim);font-size:13px}
"""


def sort_key(site):
    match = SLUG_DATE.match(site["slug"])
    year, month = (match.group(1), match.group(2) or "00") if match else ("9999", "99")
    return (year, month, STATUS_ORDER.get(site.get("status"), 9), site["slug"])


def load_sites(sites_dir: Path):
    sites = []
    for meta_path in sorted(sites_dir.glob("*/meta.json")):
        try:
            meta = json.loads(meta_path.read_text())
        except json.JSONDecodeError as exc:
            print(f"skip {meta_path}: {exc}")
            continue
        meta.setdefault("slug", meta_path.parent.name)
        meta["has_preview"] = (meta_path.parent / "preview.png").exists()
        sites.append(meta)
    return sorted(sites, key=sort_key)


def card(site):
    slug = html.escape(site["slug"])
    shot = (f'<div class="shot"><img loading="lazy" alt="" src="sites/{slug}/preview.png"></div>'
            if site["has_preview"] else '<div class="shot empty">no preview</div>')
    status = site.get("status", "unknown")
    chips = [f'<span class="chip st st-{html.escape(status)}">{html.escape(status)}</span>']
    for key in ("stack", "source"):
        if site.get(key):
            chips.append(f'<span class="chip">{html.escape(str(site[key]))}</span>')
    notes = f'<p class="notes">{html.escape(site["notes"])}</p>' if site.get("notes") else ""
    return f"""<a class="card" href="sites/{slug}/" target="_blank" rel="noopener">
{shot}
<div class="body">
  <div class="top"><h2>{html.escape(site.get("title", site["slug"]))}</h2>
  <span class="era">{html.escape(site.get("era", ""))}</span></div>
  <div class="meta">{"".join(chips)}</div>
  {notes}
</div></a>"""


def render(sites):
    counts = {}
    for site in sites:
        status = site.get("status", "unknown")
        counts[status] = counts.get(status, 0) + 1
    tally = ", ".join(f"{n} {s}" for s, n in sorted(counts.items()))
    return f"""<meta charset="utf-8">
<title>Taskbase Homepage Museum</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>{CSS}</style>
<header>
<h1>Taskbase Homepage Museum</h1>
<p>Every taskbase.com homepage we could dig up, from the Internet Archive and from
git history. Visuals only &mdash; forms, analytics and backends are stripped or dead.
Click a card to open that homepage.</p>
</header>
<main>{"".join(card(s) for s in sites)}</main>
<footer>{len(sites)} homepages &middot; {tally} &middot; TIRA-1478</footer>
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    root = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser.add_argument("--root", type=Path, default=root)
    args = parser.parse_args()

    sites = load_sites(args.root / "sites")
    (args.root / "index.html").write_text(render(sites))
    print(f"index.html: {len(sites)} sites")


if __name__ == "__main__":
    main()
