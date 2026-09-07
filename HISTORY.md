# Timeline

What the source history says about taskbase homepages. Dug out of git, not
memory. Slugs point at `sites/<slug>/`.

Short version: the homepage lived inside the product for three years, moved out
into its own Angular repo, came back into the monorepo, then left engineering
altogether — first to a CMS, then to WordPress, now to Framer.

## Before Taskbase — the domain had other owners

`sites/2002-prehistory-not-taskbase/`

Taskbase the company was founded in 2015. taskbase.com already existed. In
2001–2004 someone ran an unrelated staff task tracker on it, a ColdFusion login
page. Later, up to early 2016, the domain served a free horserace calculator.
Kept here only so nobody mistakes those captures for Taskbase.

## 2015-08 — first landing page

`sites/2015-08-webapp-landing/`

Not a separate site. A page inside the Java/Tomcat webapp. AngularJS 1.x
template, Bootstrap 3, SCSS. German copy: "Die Plattform für passende
Übungsaufgaben". Stock photos of students, teal circle icons, ETH / HSG / DMK
logos at the bottom.

One template served three brands (taskbase.org, e-maths.ch, mintbase) and
switched on the hostname. In this era the product was on **taskbase.org**, not
taskbase.com — the GA snippets in `components/app/app.html` gate on
`www.taskbase.org` and `test.taskbase.org`, and the archive's taskbase.com
captures from 2016-01-09 and 2016-03-05 are that horserace calculator.
taskbase.com only starts serving `ng-app="taskbaseApp"` between 2016-03-05 and
2016-10-03, after this era, and even those captures hold nothing but the SPA
shell — the gulp bundles were never crawled. taskbase.org itself is first
captured in 2018, empty. So no archive evidence exists for any webapp-era
homepage. Everything here, and in `sites/2016-04-webapp-redesign/`, comes from
source.

`7739ba389a` (2015-12-17) is what gets rendered, not the later
`9dcdc79ecc` (2015-12-19, "bring back landing page content"). From that commit
on, the marketing copy sits behind `ng-if="!frontEndSettings.landingPageSearch"`,
which `MainController` sets false only for e-maths / e-lectures — and the copy
inside is itself gated on `!e-maths && !e-lectures`. So on a taskbase host that
content is unreachable and the page is logo + two buttons + search bar.
`7739ba389a` is the last commit showing both the task-search widget and the
marketing copy.

- Added `98a060f38d` (2015-08-24, "prettify new landing page")
- Snapshot `7739ba389a` (2015-12-17, "modularize tasksearch (directive)")
- Search-first pivot `9dcdc79ecc` (2015-12-19)
- Lived at `taskbase/WebContent/components/landing/`

## 2016-04 — webapp marketing site

`sites/2016-04-webapp-redesign/`

Same webapp, new design. Teal gradient hero, teacher standing on a cloud,
"Your cloud for teaching material". Parallax, a typed.js headline, a marketing
video. Grew real marketing pages: about, pricing, investor, join, impressum,
details.

- Redesign starts `d39dc7c4e7` (2016-04-01, "start with the new design")
- Snapshot `feedfcf6e5` (2017-01-27)
- Lived at `taskbase/WebContent/components/views/landing/` plus
  `components/directives/tb-landing/`

## 2017-12 — Angular prototype

`sites/2017-12-angular-prototype/`

First try at a homepage outside the product, in its own repo
(`code.taskbase.com/taskbase/homepage.git`, first commit 2017-12-04 from
`@angular/cli`). Angular 5 + Angular Material + d3. Teal hero with a photo of
a laptop and the headline "Wir entwickeln Ihr Lernsytem" — the typo is in the
original. A hand-rolled d3 module selector, testimonials, a team page. Deployed
to Heroku.

No rockets and no planets here; that artwork belongs to the April 2018
relaunch. This one never went public — the February 2018 redesign replaced it
before launch, and the module tree still carries placeholder copy ("Bla",
"Blab", "Blub", "Barf").

- Snapshot `c642c73` (2018-01-12)

## 2018-04 — taskbase.com relaunch

`sites/2018-04-angular-relaunch/`

The one that actually became taskbase.com. Same repo, wholesale redesign
starting `a1f36ec` (2018-02-08, "new jumbo desing implemented"). Bootstrap 4
replaced Material. Rocket and planets in the jumbo, tech modules, customers,
testimonials, offer, project, team, blog, contact form. Shipped around
2018-04-20. Firebase hosting.

- Snapshot `7fed0a6` (2018-05-04)

## 2018-03 — app landing / Acadilly handover

`sites/2018-04-app-landing/`

Side branch, kept for completeness. The old Taskbase *app* was renamed
Acadilly. Its landing page became a notice telling teachers to move to
acadilly.com. "Interaktive Lernlösungen, die mitdenken". Last thing
taskbase-the-app showed visitors.

- Snapshot `6afc676a32` (2018-04-17)
- Lived at `acadilly/server/src/main/webapp/components/directives/tb-landing/`

## 2018-09 — last state of the standalone repo

`sites/2018-09-angular-examples/`

Final commit of `homepage.git` before it moved into the monorepo. The landing
page is the April relaunch, unchanged — the NLP demos were **not** on it. The
grammar and content-matching demos sat at unlinked `/examples` routes with a
small Express backend. They only became the homepage's signature later, inside
the monorepo.

- Snapshot `e226e1b` (2018-09-16, "final version")

## 2018-09 → 2023-04 — monorepo homepage

`sites/2023-angular-monorepo/`

The standalone repo got imported into the monorepo four days after its last
commit and stayed for four and a half years. 176 commits, no wholesale
redesign — it kept the April 2018 look and grew: `techmodul` became a
`technology` section, Google Maps went away, more NLP demos (spellcheck,
postcard, summary, matching) moved onto the homepage, new team portraits.
Angular 5 → 6 → 9 → 12 → 13 → 14.

Two bugs shipped and stayed live:

- The browser check compares version numbers as strings, so Chrome "141" sorts
  below its 2016 floor of "48" and every modern browser gets told it is
  unsupported. Nobody in 2023 hit it.
- The postcard demo's SCSS asks for `assets/img/postcard.svg`, which never
  existed in the repo. That background was broken on the real site.

- Imported `282c2e081d` (2018-09-20, "Homepage/init")
- Snapshot `f66d393bea` (2023-02-28, "Switch address in impressum")
- Deleted `9912947e2b` (2023-04-03, "Resolve \"Get rid of old homepage and
  nlp-models\"")

## What the archive actually saw, 2016–2021

`sites/2016-10-angular1-app/`, `sites/2018-06-angular-spa/`,
`sites/2019-01-angular-spa/`

Three captures of taskbase.com itself, kept because they are the only
independent evidence of what was live when. They are thin: the archive got the
SPA shell and almost none of the bundles.

- 2016-10 — taskbase.com serving the AngularJS app. Shell only.
- 2018-06 — the April relaunch, mid-life. Renders the logo splash.
- 2019-01 — the monorepo homepage as it looked from late 2018 until Craft
  replaced it in early 2021. Client-rendered marketing page, fonts missing.

## 2021-02 — Craft CMS homepage

`sites/2021-03-craft-cms/`

The homepage left the product and moved into a CMS. Own GitLab repo,
`code.taskbase.com/taskbase/craft-homepage`, now archived. Craft CMS 3 — PHP,
Twig templates, MySQL — hosted on servd.host, the managed Craft host, under
the company's own servd project. Text and images lived in the database, not in
git, and that database is gone.

Built in four weeks by one dev, Johannes Gruber. 68 of the 71 commits are
February 2021; the other three are one in March, one in June, one in September.
Craft went `^3.5.10` → 3.6.3 → 3.6.4.1 → 3.6.5.1 → 3.6.6 → 3.6.7 → 3.7.11, all
on PHP 7.2.5. Plugins: contact form plus honeypot, Redactor, SendGrid, Imager
(switched off again on 2021-02-10 in favour of servd's own image service), servd
asset storage. `gsap.min.js` is in the repo but no template ever loads it.

Look: white, Inter, a hero photo with hover hotspots, a demo video, a Swiper
testimonial slider, customer logos, a process section, a team grid.
smooth-scrollbar moves the page. Four pages: home, contact, media, privacy
policy. One design for the whole era — the copy is identical in every snapshot
from March 2021 to March 2022.

- First commit 2021-02-01, last `f7b5172` 2021-09-01 ("Fix video issue", which
  swapped the CDN video for `web/videos/TB_Demo.mp4` in the repo)
- Tags `v1.0.0` (2021-02-25) and `v1.0.1` (2021-02-26)
- Live on taskbase.com from around February 2021 to early April 2022. The
  archive's last Angular capture is 2020-11-23, its first Craft one 2021-03-20,
  its last Craft one 2022-03-17, and WordPress arrives 2022-04-08. Response
  headers said `X-Powered-By: Craft CMS`.
- No CI. Deploys were manual: build a bundle on servd.host from a commit, hit
  Sync.

## 2022-04 → 2025 — WordPress

`sites/2022-04-wordpress-feedback-engine/`,
`sites/2023-06-wordpress-elementor/`, `sites/2025-05-wordpress-lms/`

Craft was dropped after about a year. From April 2022 the homepage is
WordPress on shared Apache at SiteGround, built in Elementor, and it gets
redesigned repeatedly instead of rebuilt: "The world's #1 Feedback engine"
in 2022, a HubSpot-wired Elementor site through 2023 and 2024, an LMS-flavoured
one in 2025. No repo for any of it — WordPress sites live in a database and a
`wp-content` folder, and we have neither, so these come from the archive only.

## 2026 — current site

`sites/2026-live/`

Framer, not code we own. Mirrored from the live site; no repo on
code.taskbase.com builds it. The title is "AI Sales Coach" — the company
repositioned from grading school exercises to coaching sales calls, and the
homepage is now a sales-tool landing page.

## Where it was hosted

- 2018 — Firebase, for the Angular relaunch.
- 2021–2022 — servd.host, for Craft. Assets went to
  `optimise2.assets-servd.host` / `cdn2.assets-servd.host`. Both are 404 now.
- 2022 onwards — SiteGround, shared Apache with WordPress. DNS still shows it:
  `prod-homepage.taskbase.com` and `siteground.taskbase.com` were NS-delegated
  to SiteGround. Both delegations are dead.
- `staging-homepage.taskbase.com` points at an AWS eu-central-1 staging host,
  probably Lightsail. No credentials here, not touched, and the archive never
  crawled it either.
- 2026 — Framer's own hosting, assets on `framerusercontent.com`.

## What is not here

- **No renders of the wayback-only eras.** The 2016/2018/2019 SPA captures hold
  the shell and nothing else; the archive never crawled the bundles. Those dirs
  render what survives and say so in their `status`.
- **No pre-2015 homepage of Taskbase's own.** The monorepo starts 2015-05-29.
- **No Craft render from the CMS.** The stack was actually run — Craft 3.7.11
  on php 7.4 + mysql 5.7 — and it installs, applies the committed project
  config and serves its own control panel. It just has no content: the
  database and the servd asset volume are both gone, so the homepage template
  throws on its own line 3, looking for the logo asset. `BUILDS.md` has the
  recipe. What is in `sites/2021-03-craft-cms/` is the archived HTML with the
  repo's own CSS, JS, fonts, favicons and video put back in. Full source is
  under `src/`.
- **No WordPress source.** No repo, no database, no `wp-content`.
- **Two homepage repos on code.taskbase.com**, and that is it: `homepage`
  (2017–2018 standalone) and `craft-homepage` (2021). A third repo,
  `sales-coach`, does exist and is new since the last sweep, but it carries a
  `monorepo-base` tag and looks like the current product monorepo, not a
  homepage. `acadilly` is the renamed app,
  `public-developer-portal` is API docs, `showroom` is a customer-facing demo
  player. Around a hundred other plausible names — website, wordpress, wp,
  elementor, framer, craft, servd, siteground, marketing-site, ai-sales-coach,
  taskbase-website, … — do not exist.
- **No taskbase.ch site.** The archive only ever saw redirects on that domain,
  never a page. There is reportedly a static copy on S3; no AWS access here.
