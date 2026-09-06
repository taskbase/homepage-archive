#!/usr/bin/env python3
"""Build the git-sourced homepage specimens under sites/.

Source snapshots come straight out of git (`git archive <commit> <path>`), see
ERAS below. Nothing here can be `npm run build`-ed: there is no node on this
box on purpose, and the Angular versions involved span 5..14 anyway. So each
site gets an honest specimen page instead of a faked build:

  * AngularJS eras  -> a reconstructed static render. The templates are plain
    Bootstrap HTML, so with vendored Bootstrap 3 / Font Awesome and the SCSS
    put through tools/scss_flatten.py they come out close to the original.
    No AngularJS runtime, so `ng-repeat` lists collapse to one item and
    interpolations fall back to their literal defaults.
  * Angular 2+ eras -> a specimen card: the facts, plus the assets that do
    render (logos, illustrations, team portraits) and the template sources.

Run from the repo root:  python3 fetch/git_snapshot.py
"""
import html
import json
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITES = ROOT / "sites"
MONOREPO = ROOT.parent
STANDALONE_REMOTE = "https://code.taskbase.com/taskbase/homepage.git"
CAPTURED = "2026-09-03"

RENDER_EXT = {".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp"}
DROP_NAMES = {"package-lock.json"}

ERAS = [
    {
        "slug": "2015-08-webapp-landing",
        "title": "Taskbase 2015 — first landing page",
        "era": "2015-08 – 2016-01",
        "repo": "monorepo",
        "commit": "9dcdc79ecc",
        "paths": [
            "taskbase/WebContent/components/landing",
            "taskbase/WebContent/assets/img/landing",
            "taskbase/WebContent/assets/img/logos",
            "taskbase/WebContent/assets/img/eth-logo.png",
            "taskbase/WebContent/assets/img/hsg-logo.png",
        ],
        "stack": "AngularJS 1.x template inside the Java/Tomcat webapp, Bootstrap 3, SCSS",
        "kind": "angularjs",
        "vars_commit": "9dcdc79ecc",
        "global_scss": ["taskbase/WebContent/components/app/general.scss"],
        "template": "taskbase/WebContent/components/landing/landing-content.html",
        "scss": ["taskbase/WebContent/components/landing/landing.scss"],
        "asset_prefix": "/assets/img/",
        "asset_root": "taskbase/WebContent/assets/img/",
        "notes": (
            "Reconstructed render, close to the real thing. No AngularJS runtime, so "
            "the task-search widget is missing and the whitelabel branches for "
            "e-maths.ch / mintbase were pruned to leave the taskbase.com variant. "
            "German copy: 'Die Plattform für passende Übungsaufgaben'. Lived at "
            "components/landing/ until the 2016-01 'MOVE AROUND A LOT OF STUFF' "
            "reshuffle moved it to components/views/landing/."
        ),
    },
    {
        "slug": "2016-04-webapp-redesign",
        "title": "Taskbase 2016 — webapp marketing site",
        "era": "2016-04 – 2018-03",
        "repo": "monorepo",
        "commit": "feedfcf6e5",
        "paths": [
            "taskbase/WebContent/components/views/landing",
            "taskbase/WebContent/components/views/about",
            "taskbase/WebContent/components/views/pricing",
            "taskbase/WebContent/components/views/impressum",
            "taskbase/WebContent/components/views/investor",
            "taskbase/WebContent/components/views/join",
            "taskbase/WebContent/components/views/details",
            "taskbase/WebContent/components/directives/tb-landing",
            "taskbase/WebContent/assets/img/landing",
            "taskbase/WebContent/assets/img/logos",
        ],
        "stack": "AngularJS 1.x + Angular Material inside the Java/Tomcat webapp, Bootstrap 3, SCSS",
        "kind": "angularjs",
        "vars_commit": "feedfcf6e5",
        "global_scss": ["taskbase/WebContent/components/app/general.scss"],
        "template": "taskbase/WebContent/components/directives/tb-landing/tb-landing-component.html",
        "extra_templates": [
            "taskbase/WebContent/components/views/landing/landing.html",
            "taskbase/WebContent/components/views/about/about.html",
            "taskbase/WebContent/components/views/pricing/pricing-view.html",
            "taskbase/WebContent/components/views/investor/investor-view.html",
            "taskbase/WebContent/components/views/join/join-view.html",
            "taskbase/WebContent/components/views/impressum/impressum-view.html",
        ],
        "scss": [
            "taskbase/WebContent/components/directives/tb-landing/tb-landing-component.scss",
            "taskbase/WebContent/components/views/about/about.scss",
        ],
        "asset_prefix": "/assets/img/",
        "asset_root": "taskbase/WebContent/assets/img/",
        "notes": (
            "Reconstructed render of the tb-landing hero ('Your cloud for teaching "
            "material', teal gradient, teacher on a cloud). 2016-04-01 'start with "
            "the new design' brought parallax, a typed.js headline and a marketing "
            "video; about / pricing / investor / join / impressum pages shipped "
            "alongside and are in src/, listed below but not rendered — they leaned "
            "on Angular Material directives that cannot be faked. The ng-repeat "
            "value-proposition strip collapses to nothing without a runtime."
        ),
    },
    {
        "slug": "2017-12-angular-prototype",
        "title": "Taskbase 2017 — Angular homepage prototype",
        "era": "2017-12 – 2018-02",
        "repo": "standalone",
        "commit": "c642c73",
        "paths": [],
        "stack": "Angular 5 + Angular Material + d3, @angular/cli 1.x, deployed to Heroku",
        "kind": "angular",
        "asset_dirs": ["src/assets/img"],
        "template_globs": ["src/app/landing/**/*.html", "src/app/*.html", "src/app/navbar/*.html"],
        "notes": (
            "First attempt at a standalone marketing site, in its own GitLab repo. "
            "Space/planets theme, hand-rolled d3 module selector, testimonials, team "
            "page. Never the public taskbase.com — superseded by the Feb/Apr 2018 "
            "redesign before launch."
        ),
    },
    {
        "slug": "2018-04-angular-relaunch",
        "title": "Taskbase 2018 — taskbase.com relaunch",
        "era": "2018-04 – 2018-09",
        "repo": "standalone",
        "commit": "7fed0a6",
        "paths": [],
        "stack": "Angular 5.2.6 + Bootstrap 4.1, @angular/cli 1.7.1, Firebase hosting",
        "kind": "angular",
        "asset_dirs": ["src/assets/img"],
        "template_globs": ["src/app/landing/**/*.html", "src/app/*.html", "src/app/navbar/*.html", "src/app/team/**/*.html"],
        "notes": (
            "The redesign that actually became taskbase.com, shipped around "
            "2018-04-20 (Bootstrap replaced Material, new jumbo, tech modules, "
            "customers, testimonials, offer, project, team, blog, contact form). "
            "Angular means no build here, so this page shows the asset set and the "
            "templates instead."
        ),
    },
    {
        "slug": "2018-04-app-landing",
        "title": "Taskbase 2018 — app landing / Acadilly handover",
        "era": "2018-04 – 2018-08",
        "repo": "monorepo",
        "commit": "6afc676a32",
        "paths": [
            "acadilly/server/src/main/webapp/components/directives/tb-landing",
            "acadilly/server/src/main/webapp/components/views/landing",
            "acadilly/server/src/main/webapp/assets/img/landing",
            "acadilly/server/src/main/webapp/assets/img/logos",
            "acadilly/server/src/main/webapp/assets/img/teachercloud.svg",
        ],
        "stack": "AngularJS 1.x + Angular Material inside the acadilly webapp, Bootstrap 3, SCSS",
        "kind": "angularjs",
        "vars_commit": "6afc676a32",
        "vars_path": "acadilly/server/src/main/webapp/components/styles/variables.scss",
        "global_scss": ["acadilly/server/src/main/webapp/components/styles/general.scss"],
        "template": "acadilly/server/src/main/webapp/components/directives/tb-landing/tb-temp-landing.component.html",
        "extra_templates": [
            "acadilly/server/src/main/webapp/components/directives/tb-landing/deprecated/tb-landing-component.html",
            "acadilly/server/src/main/webapp/components/views/landing/landing.html",
        ],
        "scss": ["acadilly/server/src/main/webapp/components/directives/tb-landing/tb-temp-landing.component.scss"],
        "asset_prefix": "/assets/img/",
        "asset_root": "acadilly/server/src/main/webapp/assets/img/",
        "notes": (
            "Not the marketing site — the landing page the old Taskbase app served "
            "while it was being renamed to Acadilly, telling teachers to move to "
            "acadilly.com. Kept because it is the last thing taskbase-the-app showed "
            "visitors. The earlier 'Your cloud for teaching material' hero survives "
            "under src/.../deprecated/ but is not the one rendered here."
        ),
    },
    {
        "slug": "2018-09-angular-examples",
        "title": "Taskbase 2018 — homepage with live NLP demos",
        "era": "2018-09",
        "repo": "standalone",
        "commit": "e226e1b",
        "paths": [],
        "stack": "Angular 5.2.6 + Bootstrap 4.1, @angular/cli 1.7.1, Express backend for the demos",
        "kind": "angular",
        "asset_dirs": ["src/assets/img"],
        "template_globs": ["src/app/examples/**/*.html", "src/app/landing/**/*.html", "src/app/*.html"],
        "notes": (
            "Final state of the standalone repo ('final version', 2018-09-16) before "
            "it was imported into the monorepo four days later as commit 282c2e081d "
            "'Homepage/init'. Same visual design as the April relaunch plus the "
            "interactive grammar / content-matching demos that became the homepage's "
            "signature. Ships a small Express backend for the NLP calls."
        ),
    },
    {
        "slug": "2023-angular-monorepo",
        "title": "Taskbase 2019–2023 — monorepo homepage",
        "era": "2018-09 – 2023-04",
        "repo": "monorepo",
        "commit": "f66d393bea",
        "paths": ["homepage/client"],
        "stack": "Angular 14.2.12 (started at 5, via 6/9/12/13), Bootstrap 4.5, node 14, SCSS",
        "kind": "angular",
        "asset_dirs": ["homepage/client/src/assets/img"],
        "template_globs": [
            "homepage/client/src/app/landing/**/*.html",
            "homepage/client/src/app/examples/**/*.html",
            "homepage/client/src/app/technology/**/*.html",
            "homepage/client/src/app/*.html",
        ],
        "notes": (
            "The long-lived homepage. Imported 2018-09-20, deleted 2023-04-03 by "
            "9912947e2b 'Resolve \"Get rid of old homepage and nlp-models\"'. "
            "176 commits, none of them a wholesale redesign — it kept the April 2018 "
            "look and grew: techmodul became a technology section, Google Maps went, "
            "more NLP demos (spellcheck, postcard, summary, matching), new team "
            "portraits, Angular 5 -> 14. Snapshot is the last content commit, "
            "'Switch address in impressum'."
        ),
    },
]

BAR_CSS = """
.mu-bar{position:sticky;top:0;z-index:99999;background:#0d0e12;color:#e8e9ee;
font:13px/1.45 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;
padding:10px 18px;border-bottom:1px solid #252833;display:flex;flex-wrap:wrap;
gap:6px 18px;align-items:baseline}
.mu-bar b{font-size:14px;font-weight:600}
.mu-bar span{color:#8b8f9e}
.mu-bar code{color:#7dd3fc;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.mu-bar .mu-warn{color:#fbbf24}
.mu-note{background:#16181f;color:#8b8f9e;font:13px/1.6 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;
padding:12px 18px;border-bottom:1px solid #252833;max-width:none}
"""

CARD_CSS = """
:root{--bg:#0d0e12;--card:#16181f;--line:#252833;--fg:#e8e9ee;--dim:#8b8f9e;--accent:#7dd3fc}
body{margin:0;background:var(--bg);color:var(--fg);
font:15px/1.6 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:1200px;margin:0 auto;padding:28px 24px 72px}
h1{font-size:26px;letter-spacing:-.02em;margin:0 0 6px}
h2{font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:var(--dim);
margin:40px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--line)}
dl{display:grid;grid-template-columns:max-content 1fr;gap:6px 18px;margin:18px 0 0}
dt{color:var(--dim);font-size:13px}
dd{margin:0;font-size:14px}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--accent)}
.why{background:var(--card);border:1px solid var(--line);border-left:3px solid #fbbf24;
border-radius:8px;padding:14px 18px;margin:24px 0 0;color:#cfd2dc;font-size:14px}
.assets{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.asset{background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden}
.asset .box{height:120px;display:grid;place-items:center;background:#fbfbfd;padding:10px}
.asset img{width:100%;height:100%;object-fit:contain;display:block}
.asset .cap{padding:7px 9px;font-size:11px;color:var(--dim);
font-family:ui-monospace,SFMono-Regular,Menlo,monospace;word-break:break-all}
details{background:var(--card);border:1px solid var(--line);border-radius:8px;
margin:0 0 8px;padding:0 14px}
summary{cursor:pointer;padding:11px 0;font-size:13px;
font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--accent)}
pre{overflow-x:auto;background:#0a0b0e;border:1px solid var(--line);border-radius:6px;
padding:12px;font-size:12px;line-height:1.5;color:#cfd2dc;margin:0 0 14px}
.files{columns:2;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;
color:var(--dim);list-style:none;padding:0;margin:0}
"""


def run(*args, cwd=None):
    return subprocess.run(args, cwd=cwd, check=True, capture_output=True).stdout


def git_show(commit, path, repo_dir=None, git_dir=None):
    args = ["git"]
    if git_dir:
        args += ["--git-dir", str(git_dir)]
    args += ["show", f"{commit}:{path}"]
    done = subprocess.run(args, cwd=repo_dir, capture_output=True)
    return done.stdout.decode("utf-8", "replace") if done.returncode == 0 else ""


def standalone_gitdir(cache: Path):
    if not (cache / "HEAD").exists():
        cache.parent.mkdir(parents=True, exist_ok=True)
        run("git", "clone", "--bare", STANDALONE_REMOTE, str(cache))
    return cache


def extract(era, cache: Path):
    dest = SITES / era["slug"] / "src"
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    if era["repo"] == "monorepo":
        base = ["git", "-C", str(MONOREPO), "archive", era["commit"]]
        for path in era["paths"]:
            probe = subprocess.run(
                ["git", "-C", str(MONOREPO), "cat-file", "-e", f"{era['commit']}:{path}"],
                capture_output=True)
            if probe.returncode != 0:
                print(f"  skip missing path {path}")
                continue
            tar = subprocess.run(base + [path], check=True, capture_output=True).stdout
            subprocess.run(["tar", "-x", "-C", str(dest)], input=tar, check=True)
    else:
        git_dir = standalone_gitdir(cache)
        tar = run("git", "--git-dir", str(git_dir), "archive", era["commit"])
        subprocess.run(["tar", "-x", "-C", str(dest)], input=tar, check=True)
    for path in dest.rglob("*"):
        if path.is_file() and path.name in DROP_NAMES:
            path.unlink()
    return dest


NG_ATTR = re.compile(r"\s(?:ng|md|ui|data-ng)-[\w-]+\s*=\s*(\"[^\"]*\"|'[^']*')", re.I)
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
             "meta", "param", "source", "track", "wbr"}


class BranchPruner(HTMLParser):
    """Drop subtrees whose ng-if selects a whitelabel other than taskbase.

    These templates served taskbase.com, e-maths.ch and mintbase from one file
    and switched on the hostname. Without an AngularJS runtime every branch
    would render at once, which is not what any visitor ever saw, so the
    non-taskbase branches are pruned to leave the taskbase variant.
    """

    def __init__(self, drop_when):
        super().__init__(convert_charrefs=False)
        self.drop_when = drop_when
        self.out = []
        self.skip_depth = 0
        self.skip_tag = None

    def handle_starttag(self, tag, attrs):
        self._start(tag, attrs, self.get_starttag_text())

    def handle_startendtag(self, tag, attrs):
        if not self.skip_depth and self._matches(attrs):
            return
        self._emit(self.get_starttag_text())

    def _start(self, tag, attrs, text):
        if self.skip_depth:
            if tag == self.skip_tag and tag not in VOID_TAGS:
                self.skip_depth += 1
            return
        if self._matches(attrs):
            if tag in VOID_TAGS:
                return
            self.skip_depth, self.skip_tag = 1, tag
            return
        self._emit(text)

    def handle_endtag(self, tag):
        if self.skip_depth:
            if tag == self.skip_tag:
                self.skip_depth -= 1
                if not self.skip_depth:
                    self.skip_tag = None
            return
        if tag not in VOID_TAGS:
            self._emit(f"</{tag}>")

    def _matches(self, attrs):
        return any(key.lower() in ("ng-if", "ng-show", "data-ng-if")
                   and value and self.drop_when(value) for key, value in attrs)

    def _emit(self, text):
        if text:
            self.out.append(text)

    def handle_data(self, data):
        self._emit(data)

    def handle_comment(self, data):
        pass

    def handle_entityref(self, name):
        self._emit(f"&{name};")

    def handle_charref(self, name):
        self._emit(f"&#{name};")


OTHER_BRANDS = ("e-maths", "mintbase", "e-lectures", "lernnavi")


def drops_non_taskbase(expression):
    text = expression.replace(" ", "")
    return any(f"urlContains('{brand}')" in text and f"!urlContains('{brand}')" not in text
               for brand in OTHER_BRANDS)


def prune(markup):
    pruner = BranchPruner(drops_non_taskbase)
    pruner.feed(markup)
    pruner.close()
    return "".join(pruner.out)
INTERP_DEFAULT = re.compile(r"\{\{[^{}]*?\|\|\s*'([^']*)'\s*\}\}")
INTERP = re.compile(r"\{\{[^{}]*?\}\}")


def neutralize(markup, asset_prefix, asset_rel):
    markup = prune(markup)
    markup = re.sub(r"\sng-src\s*=", " src=", markup, flags=re.I)
    markup = re.sub(r"\sng-href\s*=", " href=", markup, flags=re.I)
    markup = INTERP_DEFAULT.sub(r"\1", markup)
    markup = INTERP.sub("", markup)
    markup = NG_ATTR.sub("", markup)
    # <md-button> etc. have no runtime; degrade them to spans so text survives.
    markup = re.sub(r"<(/?)md-([\w-]+)", r"<\1span data-md=\"\2\"", markup)
    if asset_prefix:
        markup = markup.replace(f'"{asset_prefix}', f'"{asset_rel}')
        markup = markup.replace(f"'{asset_prefix}", f"'{asset_rel}")
    return markup


def build_scss(era, src: Path, repo_dir, git_dir):
    var_path = era.get("vars_path", "taskbase/WebContent/components/app/variables.scss")
    variables = git_show(era["vars_commit"], var_path, repo_dir=repo_dir, git_dir=git_dir)
    if not variables:
        variables = git_show(era["vars_commit"],
                             "taskbase/WebContent/components/app/variables.scss",
                             repo_dir=repo_dir)
    var_file = src.parent / ".variables.scss"
    var_file.write_text(variables)
    sources = []
    for index, repo_path in enumerate(era.get("global_scss", [])):
        text = git_show(era["vars_commit"], repo_path, repo_dir=repo_dir, git_dir=git_dir)
        if text:
            staged = src.parent / f".global{index}.scss"
            staged.write_text(text)
            sources.append(str(staged))
    sources += [str(src / p) for p in era["scss"] if (src / p).exists()]
    out = ""
    if sources:
        out = run(sys.executable, str(ROOT / "tools" / "scss_flatten.py"),
                  f"--vars={var_file}", *sources).decode("utf-8", "replace")
    var_file.unlink()
    for staged in src.parent.glob(".global*.scss"):
        staged.unlink()
    return out


def bar(era, extra_warn):
    return (
        '<div class="mu-bar">'
        f'<b>{html.escape(era["title"])}</b>'
        f'<span>{html.escape(era["era"])}</span>'
        f'<span>{html.escape(era["stack"])}</span>'
        f'<span>{"monorepo" if era["repo"] == "monorepo" else "homepage.git"} '
        f'<code>{era["commit"]}</code></span>'
        f'<span class="mu-warn">{html.escape(extra_warn)}</span>'
        "</div>"
    )


REMOTE_IMG = re.compile(r'src="(https?://[^"]+)"')


def localize_remote_images(markup, site: Path):
    """Pull remote <img> sources into the site so it renders offline.

    A few of these templates hot-linked images (Cloudinary, mostly) that were
    never committed. They are period assets, so fetch them while the URLs still
    resolve; a dead URL is left alone rather than failing the build.
    """
    store = site / "remote"
    for url in sorted(set(REMOTE_IMG.findall(markup))):
        name = re.sub(r"[^\w.-]", "_", url.rsplit("/", 1)[-1]) or "asset"
        target = store / name
        if not target.exists():
            store.mkdir(parents=True, exist_ok=True)
            fetched = subprocess.run(
                ["curl", "-sSfL", "--max-time", "20", "-o", str(target), url],
                capture_output=True)
            if fetched.returncode != 0:
                target.unlink(missing_ok=True)
                print(f"  remote image unreachable, left as-is: {url}")
                continue
        markup = markup.replace(f'src="{url}"', f'src="remote/{name}"')
    return markup


def render_angularjs(era, src: Path):
    vendor = SITES / era["slug"] / "vendor"
    if vendor.exists():
        shutil.rmtree(vendor)
    shutil.copytree(ROOT / "tools" / "vendor", vendor)

    template_path = src / era["template"]
    depth_rel = "src/" + era.get("asset_root", "")
    markup = neutralize(template_path.read_text(errors="replace"),
                        era.get("asset_prefix"), depth_rel)
    markup = localize_remote_images(markup, SITES / era["slug"])
    css = build_scss(era, src, MONOREPO, None)

    extras = ""
    listed = era.get("extra_templates", [])
    if listed:
        rows = "".join(
            f"<details><summary>{html.escape(p)}</summary>"
            f"<pre>{html.escape((src / p).read_text(errors='replace'))}</pre></details>"
            for p in listed if (src / p).exists())
        extras = f'<div class="wrap"><h2>Other templates of this era</h2>{rows}</div>'

    return f"""<meta charset="utf-8">
<title>{html.escape(era["title"])}</title>
<link rel="stylesheet" href="vendor/css/bootstrap.min.css">
<link rel="stylesheet" href="vendor/css/font-awesome.min.css">
<style>{BAR_CSS}{CARD_CSS}
body{{background:#fff;color:#333;font-family:'Lato',Helvetica,Arial,sans-serif}}
.specimen{{max-width:1170px;margin:0 auto;padding:0 15px 48px}}
.specimen .center,.specimen .text-center{{text-align:center}}
.specimen img{{max-width:100%;height:auto}}
.specimen .row>div>img,.specimen .basic-block img{{display:block;margin:0 auto}}
.specimen .vertical-center{{display:flex;align-items:center}}
.specimen [data-md="button"]{{display:inline-block;background:#fff;border-radius:3px;
padding:6px 16px;box-shadow:0 1px 3px rgba(0,0,0,.24);color:#333;font-weight:600}}
{css}
</style>
{bar(era, "reconstructed render — not a real build")}
<div class="mu-note">{html.escape(era["notes"])}</div>
<div class="specimen landing-wrapper tb-landing-wrapper tb-temp-landing-wrapper">
{markup}
</div>
{extras}
"""


def collect_assets(era, src: Path):
    found = []
    for rel_dir in era.get("asset_dirs", []):
        base = src / rel_dir
        if not base.exists():
            continue
        for path in sorted(base.rglob("*")):
            if path.is_file() and path.suffix.lower() in RENDER_EXT:
                found.append(path)
    return found


def collect_templates(era, src: Path):
    found = []
    for pattern in era.get("template_globs", []):
        found.extend(sorted(src.glob(pattern)))
    seen, unique = set(), []
    for path in found:
        if path not in seen:
            seen.add(path)
            unique.append(path)
    return unique


def render_angular(era, src: Path):
    site = SITES / era["slug"]
    assets = collect_assets(era, src)
    tiles = "".join(
        f'<div class="asset"><div class="box">'
        f'<img src="{html.escape(str(path.relative_to(site)))}" loading="lazy" alt=""></div>'
        f'<div class="cap">{html.escape(path.name)}</div></div>'
        for path in assets)

    templates = collect_templates(era, src)
    blocks = "".join(
        f"<details><summary>{html.escape(str(path.relative_to(src)))}</summary>"
        f"<pre>{html.escape(path.read_text(errors='replace'))}</pre></details>"
        for path in templates)

    pkg = src / "package.json"
    if not pkg.exists():
        candidates = sorted(src.rglob("package.json"))
        pkg = candidates[0] if candidates else None
    pkg_block = ""
    if pkg:
        pkg_block = (f"<details open><summary>{html.escape(str(pkg.relative_to(src)))}</summary>"
                     f"<pre>{html.escape(pkg.read_text(errors='replace'))}</pre></details>")

    return f"""<meta charset="utf-8">
<title>{html.escape(era["title"])}</title>
<style>{CARD_CSS}{BAR_CSS}</style>
{bar(era, "specimen card — source kept, not built")}
<div class="wrap">
<h1>{html.escape(era["title"])}</h1>
<dl>
<dt>Era</dt><dd>{html.escape(era["era"])}</dd>
<dt>Stack</dt><dd>{html.escape(era["stack"])}</dd>
<dt>Source</dt><dd>{"taskbase monorepo" if era["repo"] == "monorepo" else "code.taskbase.com/taskbase/homepage.git"}
 at <code>{era["commit"]}</code></dd>
<dt>Snapshot</dt><dd><code>sites/{era["slug"]}/src/</code> — {len(list(src.rglob("*")))} entries,
 {len(assets)} renderable images, {len(templates)} templates listed below</dd>
</dl>
<p class="why"><b>Why there is no live render.</b> This is an Angular application:
the HTML you would see is produced by the Angular compiler out of component
templates, SCSS and TypeScript. Building it needs node and the exact toolchain of
its era, and this box deliberately has no node, npm or npx. Rather than fake a
screenshot, the page below shows what genuinely survives without a build: every
image asset the site shipped, and the component templates as source. The full
tree is in <code>src/</code>, ready for whoever builds it in a container.</p>
<p class="why" style="border-left-color:#7dd3fc">{html.escape(era["notes"])}</p>
<h2>Assets that shipped with this homepage ({len(assets)})</h2>
<div class="assets">{tiles}</div>
<h2>Build manifest</h2>
{pkg_block}
<h2>Component templates ({len(templates)})</h2>
{blocks}
</div>
"""


def write_meta(era, status):
    origin = (f"git:{'tb.git' if era['repo'] == 'monorepo' else 'homepage.git'}"
              f"@{era['commit']}")
    meta = {
        "slug": era["slug"],
        "title": era["title"],
        "era": era["era"],
        "source": "git",
        "origin": origin,
        "stack": era["stack"],
        "notes": era["notes"],
        "captured": CAPTURED,
        "status": status,
    }
    (SITES / era["slug"] / "meta.json").write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n")


def main():
    cache = ROOT / ".cache" / "homepage.git"
    only = set(sys.argv[1:])
    for era in ERAS:
        if only and era["slug"] not in only:
            continue
        print(f"== {era['slug']}")
        src = extract(era, cache)
        page = (render_angularjs if era["kind"] == "angularjs" else render_angular)(era, src)
        (SITES / era["slug"] / "index.html").write_text(page)
        write_meta(era, "partial")
        print(f"   ok ({sum(f.stat().st_size for f in src.rglob('*') if f.is_file()) // 1024} KiB src)")


if __name__ == "__main__":
    main()
