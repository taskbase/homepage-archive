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
  --r:14px; --p:0;
}
*{box-sizing:border-box}

/* One continuous gradient across the whole timeline, not a colour per slide.
   Every era is a stop in the same scheme; scrolling pans the viewport along
   it, so there is nothing to switch and nothing to cross-fade. */
.smoke{position:fixed;inset:0;z-index:-1;background:var(--bg)}
.smoke::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(120% 90% at 50% 30%,transparent 30%,rgba(6,7,10,.62) 100%)}
.smoke .ramp{position:absolute;inset:-20% -10%;
  background-image:var(--scheme);
  background-size:340% 100%;
  background-position:calc(var(--p) * 100%) 50%;
  filter:blur(52px) saturate(1.2);opacity:.66}

/* Neutral smoke on top: it adds motion without adding another colour, so the
   scheme stays the only source of hue. */
.smoke i{position:absolute;display:block;mix-blend-mode:screen;
  will-change:transform;contain:strict;border-radius:50%;
  background:conic-gradient(from 0deg,
    transparent 0deg, rgba(255,255,255,.5) 30deg, transparent 88deg,
    rgba(255,255,255,.38) 132deg, transparent 176deg,
    rgba(255,255,255,.45) 232deg, transparent 300deg,
    rgba(255,255,255,.3) 334deg, transparent 360deg);
  -webkit-mask:radial-gradient(circle,#000 6%,rgba(0,0,0,.4) 38%,transparent 68%);
  mask:radial-gradient(circle,#000 6%,rgba(0,0,0,.4) 38%,transparent 68%);
  filter:blur(30px)}
.smoke i:nth-child(2){width:130vw;height:130vw;left:-32vw;top:-50vw;opacity:.3;
  animation:swirl 46s linear infinite}
.smoke i:nth-child(3){width:84vw;height:84vw;right:-24vw;bottom:-30vw;opacity:.24;
  animation:swirl 31s linear infinite reverse}
@keyframes swirl{to{transform:rotate(360deg)}}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:transparent;color:var(--fg);
  font:16px/1.5 ui-sans-serif,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1360px;margin:0 auto;padding:0 24px}

header{padding:64px 0 0}
h1{margin:0;font-size:clamp(30px,5vw,44px);line-height:1.1;letter-spacing:-.025em;
  font-weight:650;text-shadow:0 2px 24px rgba(11,12,16,.6)}

/* Timeline axis: the year ticks double as the carousel's navigation. */
.axis{margin:36px 0 0;padding:0;list-style:none;position:relative;
  display:flex;justify-content:space-between;gap:4px}
.axis::before{content:"";position:absolute;left:0;right:0;top:7px;height:1px;
  background:rgba(255,255,255,.22)}
.axis li{position:relative;flex:1}
.axis button{all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;
  gap:8px;width:100%;padding-top:0;color:rgba(255,255,255,.82);font-size:12px;
  font-variant-numeric:tabular-nums;letter-spacing:.02em}
.axis .tick{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.35);
  box-shadow:0 0 0 4px rgba(11,12,16,.55);transition:background .15s ease,transform .15s ease}
.axis button:hover{color:#fff}
.axis button:hover .tick{background:rgba(255,255,255,.8)}
.axis button:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:6px}
.axis button[aria-current="true"]{color:#fff;font-weight:600}
.axis button[aria-current="true"] .tick{background:#fff;transform:scale(1.4)}

/* Rail: one exhibit per slide, scroll-snapped. */
.rail{display:flex;gap:24px;margin:28px 0 0;padding:4px 0 20px;
  overflow-x:auto;scroll-snap-type:x proximity;
  overscroll-behavior-x:contain;
  scrollbar-width:none}
.rail::-webkit-scrollbar{display:none}
.slide{scroll-snap-align:center;flex:0 0 min(880px,86%)}
.slide a{display:block;position:relative;border:1px solid var(--line);border-radius:var(--r);
  overflow:hidden;background:rgba(13,15,20,.92);
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
  background:rgba(7,8,11,.82);color:#fff;font-size:12px;
  font-weight:600;letter-spacing:.04em;font-variant-numeric:tabular-nums}

.controls{display:flex;align-items:center;gap:12px;padding:0 0 8px}
.controls button{all:unset;cursor:pointer;width:38px;height:38px;border-radius:50%;
  border:1px solid rgba(255,255,255,.3);display:grid;place-items:center;
  color:rgba(255,255,255,.8);background:rgba(11,12,16,.4);
  transition:border-color .15s ease,color .15s ease}
.controls button:hover{border-color:#fff;color:#fff}
.controls button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.controls .count{color:rgba(255,255,255,.7);font-size:13px;font-variant-numeric:tabular-nums}


@media (max-width:700px){
  .smoke .ramp{filter:blur(34px) saturate(1.2)}
  .smoke i{filter:blur(20px)}
  .smoke i:nth-child(3){display:none}
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

// Scroll progress across the whole rail, 0 to 1. The background is one
// gradient; this is just where along it we are.
function paint(){
  const span = rail.scrollWidth - rail.clientWidth;
  const p = span > 0 ? rail.scrollLeft / span : 0;
  document.documentElement.style.setProperty('--p', p.toFixed(4));
}

function setActive(i){
  ticks.forEach((t, n) => t.setAttribute('aria-current', String(n === i)));
  counter.textContent = `${i + 1} / ${slides.length}`;
}

let queued = false;
rail.addEventListener('scroll', () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { paint(); queued = false; });
}, {passive: true});
addEventListener('resize', paint);

// Which slide is nearest the rail's centre wins, so a half-scroll still resolves.
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(slides.indexOf(visible.target));
}, {root: rail, threshold: [0.5, 0.75, 1]});
slides.forEach(s => observer.observe(s));

const easeInOutCubic = t => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

let tween = null;
function go(i){
  const slide = slides[Math.max(0, Math.min(slides.length - 1, i))];
  const target = slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2;
  const from = rail.scrollLeft;
  const distance = target - from;
  if (!distance) return;
  // Longer for a bigger jump, so crossing the whole timeline still glides.
  const ms = Math.min(1500, 420 + Math.abs(distance) * 0.22);
  const started = performance.now();
  if (tween) cancelAnimationFrame(tween);
  const step = now => {
    const t = Math.min(1, (now - started) / ms);
    rail.scrollLeft = from + distance * easeInOutCubic(t);
    tween = t < 1 ? requestAnimationFrame(step) : null;
  };
  tween = requestAnimationFrame(step);
}
const current = () => ticks.findIndex(t => t.getAttribute('aria-current') === 'true');

// A horizontal rail ignores a vertical wheel, which makes the timeline feel
// unresponsive until you find the arrows. Route the wheel into it.
rail.addEventListener('wheel', e => {
  const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  if (!delta) return;
  e.preventDefault();
  if (tween) { cancelAnimationFrame(tween); tween = null; }
  rail.scrollLeft += delta;
}, {passive: false});

ticks.forEach((t, i) => t.addEventListener('click', () => go(i)));
document.querySelector('.prev').addEventListener('click', () => go(current() - 1));
document.querySelector('.next').addEventListener('click', () => go(current() + 1));
addEventListener('keydown', e => {
  if (e.target.closest('a, input, textarea')) return;
  if (e.key === 'ArrowLeft') go(current() - 1);
  if (e.key === 'ArrowRight') go(current() + 1);
});
setActive(0);
paint();
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
    status = site.get("status", "unknown")
    shot = (f'<img loading="lazy" decoding="async" alt="" src="sites/{slug}/preview.png">'
            if site["has_preview"] else '<div class="empty">no preview</div>')
    return f"""<div class="slide"><a href="sites/{slug}/" target="_blank" rel="noopener">
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


def scheme(sites):
    """One gradient with every era as a stop, in timeline order."""
    stops = [s["accent"] for s in sites if s.get("accent")]
    if len(stops) < 2:
        return "linear-gradient(100deg,#49afb2,#9301e6)"
    spread = ", ".join(f"{c} {round(i / (len(stops) - 1) * 100)}%"
                       for i, c in enumerate(stops))
    return f"linear-gradient(100deg, {spread})"


def render(sites):
    years = [year_of(s) for s in sites if year_of(s)]
    span = f"{years[0]}&ndash;{years[-1]}" if years else "&mdash;"
    return f"""<meta charset="utf-8">
<title>Taskbase Homepage Museum</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Every taskbase.com homepage, {span}, restored and rendered.">
<style>{CSS}</style>
<style>:root{{--scheme:{scheme(sites)}}}</style>
<div class="smoke"><div class="ramp"></div><i></i><i></i></div>
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
