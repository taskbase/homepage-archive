#!/usr/bin/env python3
"""Generate index.html: a timeline carousel of the sites in sites/*/meta.json."""
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
  --bg:#0b0c10; --surface:#14161d; --line:#232734;
  --fg:#eceef4; --fg-dim:#9096a6; --fg-faint:#5f6575;
  --ok:#4ade80; --partial:#fbbf24; --broken:#f87171; --accent:#8ab4f8;
  --r:14px; --era:#559ea0;
}
*{box-sizing:border-box}

/* Smoke: four blurred blobs of the current era's colour, drifting over black.
   Only --era changes as you scroll; the blobs themselves never restart, so the
   colour cross-fades instead of jumping. */
.smoke{position:fixed;inset:0;z-index:-1;background:var(--bg);overflow:hidden;
  transition:background .8s ease}
.smoke i{position:absolute;display:block;border-radius:50%;
  background:radial-gradient(circle at 50% 50%,var(--era) 0%,transparent 68%);
  opacity:.34;filter:blur(70px);transition:background 1.1s ease;
  will-change:transform}
.smoke i:nth-child(1){width:70vw;height:70vw;left:-14vw;top:-22vw;
  animation:drift1 44s ease-in-out infinite alternate}
.smoke i:nth-child(2){width:56vw;height:56vw;right:-12vw;top:6vh;opacity:.26;
  animation:drift2 57s ease-in-out infinite alternate}
.smoke i:nth-child(3){width:64vw;height:64vw;left:24vw;bottom:-26vw;opacity:.22;
  animation:drift3 63s ease-in-out infinite alternate}
.smoke i:nth-child(4){width:38vw;height:38vw;right:16vw;bottom:-8vw;opacity:.18;
  animation:drift2 51s ease-in-out infinite alternate-reverse}
@keyframes drift1{to{transform:translate3d(9vw,7vh,0) scale(1.14)}}
@keyframes drift2{to{transform:translate3d(-11vw,5vh,0) scale(1.09)}}
@keyframes drift3{to{transform:translate3d(7vw,-9vh,0) scale(1.18)}}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:transparent;color:var(--fg);
  font:16px/1.5 ui-sans-serif,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1360px;margin:0 auto;padding:0 24px}

header{padding:64px 0 0}
h1{margin:0;font-size:clamp(30px,5vw,44px);line-height:1.1;letter-spacing:-.025em;font-weight:650}

/* Timeline axis: the year ticks double as the carousel's navigation. */
.axis{margin:36px 0 0;padding:0;list-style:none;position:relative;
  display:flex;justify-content:space-between;gap:4px}
.axis::before{content:"";position:absolute;left:0;right:0;top:7px;height:1px;background:var(--line)}
.axis li{position:relative;flex:1}
.axis button{all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;
  gap:8px;width:100%;padding-top:0;color:var(--fg-faint);font-size:12px;
  font-variant-numeric:tabular-nums;letter-spacing:.02em}
.axis .tick{width:9px;height:9px;border-radius:50%;background:var(--line);
  outline:4px solid var(--bg);transition:background .15s ease,transform .15s ease}
.axis button:hover{color:var(--fg-dim)}
.axis button:hover .tick{background:var(--fg-faint)}
.axis button:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:6px}
.axis button[aria-current="true"]{color:var(--fg);font-weight:600}
.axis button[aria-current="true"] .tick{background:var(--accent);transform:scale(1.35)}

/* Rail: one exhibit per slide, scroll-snapped. */
.rail{display:flex;gap:24px;margin:28px 0 0;padding:4px 0 20px;
  overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;
  scrollbar-width:none}
.rail::-webkit-scrollbar{display:none}
.slide{scroll-snap-align:center;flex:0 0 min(880px,86%)}
.slide a{display:block;position:relative;border:1px solid var(--line);border-radius:var(--r);
  overflow:hidden;background:rgba(20,22,29,.72);backdrop-filter:blur(2px);
  text-decoration:none;color:inherit;
  transition:border-color .15s ease}
.slide a:hover,.slide a:focus-visible{border-color:var(--accent)}
.slide a:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.slide img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top center;
  background:#07080b}
.slide .empty{display:grid;place-items:center;aspect-ratio:16/10;color:var(--fg-faint);font-size:13px}

/* Caption sits over the shot, so nothing competes below it. */
.cap{position:absolute;left:0;right:0;bottom:0;padding:44px 24px 18px;
  display:flex;align-items:flex-end;justify-content:space-between;gap:20px;
  background:linear-gradient(to top,rgba(7,8,11,.94) 25%,rgba(7,8,11,.6) 62%,transparent)}
.cap .era{color:#fff;font-size:clamp(15px,1.6vw,18px);font-weight:600;letter-spacing:-.01em;
  font-variant-numeric:tabular-nums}
.cap .state{display:flex;align-items:center;gap:7px;flex:none;color:#c9cdd8;font-size:12px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--fg-faint)}
.dot.ok{background:var(--ok)} .dot.partial{background:var(--partial)}
.dot.broken{background:var(--broken)}
.year{position:absolute;left:20px;top:18px;padding:5px 11px;border-radius:999px;
  background:rgba(7,8,11,.72);backdrop-filter:blur(6px);color:#fff;font-size:12px;
  font-weight:600;letter-spacing:.04em;font-variant-numeric:tabular-nums}

.controls{display:flex;align-items:center;gap:12px;padding:0 0 8px}
.controls button{all:unset;cursor:pointer;width:38px;height:38px;border-radius:50%;
  border:1px solid var(--line);display:grid;place-items:center;color:var(--fg-dim);
  transition:border-color .15s ease,color .15s ease}
.controls button:hover{border-color:var(--accent);color:var(--fg)}
.controls button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.controls .count{color:var(--fg-faint);font-size:13px;font-variant-numeric:tabular-nums}


@media (max-width:700px){
  /* Four 70vw layers at blur(70px) is too much fill rate for a phone. */
  .smoke i{filter:blur(44px)}
  .smoke i:nth-child(3),.smoke i:nth-child(4){display:none}
  .slide{flex:0 0 92%}
  .axis button span.label{display:none}
  /* A 16/10 crop leaves too little room beside the caption at phone widths. */
  .slide img,.slide .empty{aspect-ratio:4/5}
  .cap{padding:32px 16px 14px;flex-direction:column;align-items:flex-start;gap:4px}
  .cap .state{display:none}
}
@media (prefers-reduced-motion:reduce){
  .rail{scroll-behavior:auto}
  .smoke i{animation:none}
  .slide a,.axis .tick{transition:none}
}
"""

JS = """
const rail = document.querySelector('.rail');
const slides = [...rail.children];
const ticks = [...document.querySelectorAll('.axis button')];
const counter = document.querySelector('.count');

function setActive(i){
  ticks.forEach((t, n) => t.setAttribute('aria-current', String(n === i)));
  counter.textContent = `${i + 1} / ${slides.length}`;
  const era = slides[i].dataset.era;
  if (era) document.documentElement.style.setProperty('--era', era);
}

// Which slide is nearest the rail's centre wins, so a half-scroll still resolves.
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(slides.indexOf(visible.target));
}, {root: rail, threshold: [0.5, 0.75, 1]});
slides.forEach(s => observer.observe(s));

const go = i => slides[Math.max(0, Math.min(slides.length - 1, i))]
  .scrollIntoView({block: 'nearest', inline: 'center'});
const current = () => ticks.findIndex(t => t.getAttribute('aria-current') === 'true');

ticks.forEach((t, i) => t.addEventListener('click', () => go(i)));
document.querySelector('.prev').addEventListener('click', () => go(current() - 1));
document.querySelector('.next').addEventListener('click', () => go(current() + 1));
addEventListener('keydown', e => {
  if (e.target.closest('a, input, textarea')) return;
  if (e.key === 'ArrowLeft') go(current() - 1);
  if (e.key === 'ArrowRight') go(current() + 1);
});
setActive(0);
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


def slide(site):
    slug = html.escape(site["slug"])
    accent = html.escape(site.get("accent", "#559ea0"))
    status = site.get("status", "unknown")
    shot = (f'<img loading="lazy" decoding="async" alt="" src="sites/{slug}/preview.png">'
            if site["has_preview"] else '<div class="empty">no preview</div>')
    return f"""<div class="slide" data-era="{accent}"><a href="sites/{slug}/" target="_blank" rel="noopener">
{shot}<span class="year">{year_of(site)}</span>
<div class="cap">
  <div class="era">{html.escape(site.get("era", ""))}</div>
  <span class="state"><span class="dot {html.escape(status)}"></span>{
      html.escape(STATUS_LABEL.get(status, status))}</span>
</div></a></div>"""


def tick(site):
    year = year_of(site)
    return (f'<li><button type="button" aria-label="{html.escape(site.get("title", year))}">'
            f'<span class="tick"></span><span class="label">{year}</span></button></li>')


def render(sites):
    years = [year_of(s) for s in sites if year_of(s)]
    span = f"{years[0]}&ndash;{years[-1]}" if years else "&mdash;"
    return f"""<meta charset="utf-8">
<title>Taskbase Homepage Museum</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Every taskbase.com homepage, {span}, restored and rendered.">
<style>{CSS}</style>
<div class="smoke"><i></i><i></i><i></i><i></i></div>
<div class="wrap">
<header>
<h1>Taskbase Homepage Museum</h1>
<ul class="axis">{"".join(tick(s) for s in sites)}</ul>
</header>
<div class="rail">{"".join(slide(s) for s in sites)}</div>
<div class="controls">
  <button type="button" class="prev" aria-label="Previous homepage">&larr;</button>
  <button type="button" class="next" aria-label="Next homepage">&rarr;</button>
  <span class="count">1 / {len(sites)}</span>
</div>
</div>
<script>{JS}</script>
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
