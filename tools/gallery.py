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
STATUS_LABEL = {"ok": "restored", "partial": "partly restored", "broken": "not recoverable"}

CSS = """
:root{
  --bg:#0b0c10; --surface:#14161d; --surface-hi:#191c24; --line:#232734;
  --fg:#eceef4; --fg-dim:#9096a6; --fg-faint:#5f6575;
  --ok:#4ade80; --partial:#fbbf24; --broken:#f87171; --accent:#8ab4f8;
  --r:14px; --pad:24px;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);
  font:16px/1.5 ui-sans-serif,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1360px;margin:0 auto;padding:0 24px}

header{padding:72px 0 8px}
h1{margin:0;font-size:clamp(32px,5vw,44px);line-height:1.1;letter-spacing:-.025em;font-weight:650}
.lede{margin:16px 0 0;max-width:62ch;color:var(--fg-dim);font-size:17px}
.stats{margin:28px 0 0;padding:0 0 32px;list-style:none;display:flex;flex-wrap:wrap;gap:32px;
  border-bottom:1px solid var(--line)}
.stats div{display:flex;flex-direction:column;gap:2px}
.stats b{font-size:24px;font-weight:600;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.stats span{font-size:13px;color:var(--fg-faint)}

main{padding:40px 0 96px;display:grid;gap:28px;
  grid-template-columns:repeat(auto-fill,minmax(340px,1fr))}

a.card{display:flex;flex-direction:column;background:var(--surface);color:inherit;
  text-decoration:none;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;
  transition:border-color .15s ease,transform .15s ease,background .15s ease}
a.card:hover,a.card:focus-visible{border-color:var(--accent);background:var(--surface-hi);
  transform:translateY(-3px)}
a.card:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
a.card:active{transform:translateY(-1px)}

.shot{position:relative;aspect-ratio:16/10;background:#07080b;overflow:hidden}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.shot.empty{display:grid;place-items:center;color:var(--fg-faint);font-size:13px}
.year{position:absolute;left:12px;top:12px;padding:4px 10px;border-radius:999px;
  background:rgba(7,8,11,.72);backdrop-filter:blur(6px);color:#fff;
  font-size:12px;font-weight:600;letter-spacing:.04em;font-variant-numeric:tabular-nums}

.body{padding:var(--pad);display:flex;flex-direction:column;gap:10px;flex:1}
h2{margin:0;font-size:20px;line-height:1.25;letter-spacing:-.015em;font-weight:600}
.era{color:var(--fg-dim);font-size:13px;font-variant-numeric:tabular-nums}
.meta{margin-top:2px;display:flex;align-items:center;gap:8px;
  color:var(--fg-faint);font-size:13px}
.dot{width:7px;height:7px;border-radius:50%;flex:none;background:var(--fg-faint)}
.dot.ok{background:var(--ok)} .dot.partial{background:var(--partial)}
.dot.broken{background:var(--broken)}
.stack{color:var(--fg-dim);font-size:13px;line-height:1.45;
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden}
.notes{margin:0;color:var(--fg-faint);font-size:13px;line-height:1.5;
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden}
a.card:hover .notes,a.card:focus-visible .notes{-webkit-line-clamp:12;line-clamp:12}

footer{padding:0 0 72px;color:var(--fg-faint);font-size:13px;
  border-top:1px solid var(--line);margin-top:8px;padding-top:24px}
footer a{color:var(--fg-dim)}

@media (prefers-reduced-motion:reduce){
  a.card{transition:none}
  a.card:hover,a.card:focus-visible{transform:none}
}
"""


def sort_key(site):
    match = SLUG_DATE.match(site["slug"])
    year, month = (match.group(1), match.group(2) or "00") if match else ("9999", "99")
    return (year, month, STATUS_ORDER.get(site.get("status"), 9), site["slug"])


def year_of(site):
    match = SLUG_DATE.match(site["slug"])
    return match.group(1) if match else ""


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
    status = site.get("status", "unknown")
    shot = (f'<img loading="lazy" decoding="async" alt="" src="sites/{slug}/preview.png">'
            if site["has_preview"] else '<span>no preview</span>')
    empty = "" if site["has_preview"] else " empty"
    source = site.get("source", "")
    label = STATUS_LABEL.get(status, status)
    meta_line = f"{html.escape(label)} &middot; {html.escape(source)}" if source else html.escape(label)
    stack = f'<div class="stack">{html.escape(site["stack"])}</div>' if site.get("stack") else ""
    notes = f'<p class="notes">{html.escape(site["notes"])}</p>' if site.get("notes") else ""
    return f"""<a class="card" href="sites/{slug}/" target="_blank" rel="noopener">
<div class="shot{empty}">{shot}<span class="year">{year_of(site)}</span></div>
<div class="body">
  <h2>{html.escape(site.get("title", site["slug"]))}</h2>
  <div class="era">{html.escape(site.get("era", ""))}</div>
  <div class="meta"><span class="dot {html.escape(status)}"></span>{meta_line}</div>
  {stack}{notes}
</div></a>"""


def render(sites):
    years = [year_of(s) for s in sites if year_of(s)]
    span = f"{years[0]}&ndash;{years[-1]}" if years else "&mdash;"
    restored = sum(1 for s in sites if s.get("status") == "ok")
    stats = [
        (len(sites), "homepages"),
        (span, "years covered"),
        (f"{restored}/{len(sites)}", "fully restored"),
    ]
    tiles = "".join(f"<div><b>{value}</b><span>{label}</span></div>" for value, label in stats)
    return f"""<meta charset="utf-8">
<title>Taskbase Homepage Museum</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Every taskbase.com homepage, {span}, restored and rendered.">
<style>{CSS}</style>
<div class="wrap">
<header>
<h1>Taskbase Homepage Museum</h1>
<p class="lede">Every homepage taskbase.com ever had, dug out of the Internet Archive
and of git history, then rebuilt until it renders again. Visuals only &mdash; the forms,
analytics and backends are long dead. Pick one and it opens.</p>
<ul class="stats">{tiles}</ul>
</header>
<main>{"".join(card(s) for s in sites)}</main>
<footer>Built for TIRA-1478. Each exhibit says how it was recovered and what is
missing &mdash; hover a card to read the detail.</footer>
</div>
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    root = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser.add_argument("--root", type=Path, default=root)
    args = parser.parse_args()

    sites = load_sites(args.root / "sites")
    (args.root / "index.html").write_text(render(sites), encoding="utf-8")
    print(f"index.html: {len(sites)} sites")


if __name__ == "__main__":
    main()
