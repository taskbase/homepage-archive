# edtechlab.ch — recovery log

The homepage content of edtechlab.ch is **not recoverable**. This file lists
everything that was tried so nobody repeats it.

The site was a Meteor 1.1.0.2 app. `<body>` was empty in every capture; the
whole page was painted by a JS bundle. No archive anywhere fetched that bundle,
and the source was never committed to the monorepo. Without the bundle there is
nothing to render.

## What the archives hold

Wayback CDX (`matchType=domain`) returns **48 rows, and that is the complete
set** of everything ever captured on the domain. Only six rows are content:

| capture | URL | result |
|---|---|---|
| 2015-11-14 14:15:08 | `/` | 200, Meteor shell, empty body |
| 2016-01-11 10:54:46 | `/` | 200, Meteor shell, empty body, different deploy |
| 2016-03-08 16:40:22 | `/` | 200, Meteor shell, empty body, different deploy |
| 2016-02-20 20:20:53 | `/3b08afc2….js` | 200 — **not the bundle**, the SPA catch-all serving the shell again |
| 2016-02-20 16:56:29 | `/a8917951….css` | 200 — Meteor's `.meteor-css-not-found-error` stub, 42 bytes |
| 2016-02-20 16:23:44 | `/icons/favicon.ico` | 200, 2375 B — recovered, shipped in `assets/` |

Everything else is `robots.txt` (404 then 301), `/favicon.ico` (404 then 301),
and post-rename 301s to `https://taskbase.org`.

Three deploys, three bundle hashes, never captured:

- `8b8d46b00abfabff9f578ae83f3f9635782b1ef9.js` + `f258fa366fe0c41b569fb6cbca34111aa1c77dba.css` (2015-11)
- `3b08afc29b2871f65a5168f75caddfa1aa583bfe.js` + `a89179513ff2b14e3f2ed5513074f0ea66c987ae.css` (2016-01)
- `7f1998f00aa928684424b77e8ebaa0bd16b7231f.js` + `aafb53256564e2de85b5c5536b2335735bc7c79f.css` (2016-03)

The 2016 shells additionally pull Font Awesome 4.5.0 from maxcdn, so the design
had grown icons by then. `__meteor_runtime_config__` survives in all three and
shows `xolvio:md-blog` left at the package's demo defaults — blog name "The
Xolv.io md-blog", Pure CSS element classes, blog at `/blog`, archive at
`/blog/archive`, `ROOT_URL` `http://localhost` (so: behind a reverse proxy on
its own box, never `*.meteor.com`).

## Archives tried

| archive | query | result |
|---|---|---|
| Wayback CDX | `edtechlab.ch` `matchType=domain` | 48 rows, table above. Complete. |
| Wayback CDX | prefix on `/taskbase*`, `/bashclient*`, `/twiml1.xml`, `/blog*` | **empty** — pages that provably existed were never crawled |
| Wayback | `id_` raw fetch of all six 200-status captures | done, see table |
| Wayback availability API | both bundle URLs | `archived_snapshots: {}` |
| Common Crawl | all 51 indexes 2013–2018, `matchType=domain` | 44 empty. 7 hits (2016-36, 2017-09/22/26/47, …) are **only 301s** |
| Common Crawl | both bundle URLs + `edtechlab.ch/*` prefix, in 2015-48 / 2016-07 / 2016-18 / 2016-22 / 2016-36 | **empty** |
| Common Crawl WARC | range-fetched the 301 records | confirms redirect targets, no content |
| arquivo.pt | CDX `matchType=domain`; full-text `edtechlab` | 200 **empty**; text hits are Aarhus University's unrelated "EdTech Lab" |
| Memento TimeTravel | `timetravel.mementoweb.org` | **DNS does not resolve** — aggregator is gone |
| Bibliotheca Alexandrina | `web.archive.org.bibalex.org` | **DNS does not resolve** |
| Icelandic (vefsafn.is) | timemap + CDX | connection timeouts, unreachable |
| UK Web Archive | CDX | endpoint returns `400 Redirect` |
| Library of Congress | timemap | Cloudflare interstitial |
| Stanford SWAP | timemap | human-verification wall |
| Conifer / Rhizome | search API | `not_found` |
| **archive.today** (`.ph`/`.today`/`.is`/`.li`/`.md`) | url, timemap, `newest`, wildcard | **HTTP 429 + CAPTCHA on every mirror.** Blocked from this IP — *inconclusive, not a confirmed negative.* The one avenue still worth a retry from a residential IP or a browser. |

## Repositories tried

- **GitLab `code.taskbase.com`** — `git ls-remote` across 12 namespaces
  (`bersling`, `jjoller`, `jost`, `corentinp`, `corentinpi`, `ruiixu23`,
  `wmtraub`, `yow`, `nicolamr`, `daniel`, `dniederberger`, `taskbase`) ×
  11 repo names (`edtechlab`, `edTechLab`, `edtechlab-ch`, `edtechlab.ch`,
  `website`, `meteor`, `blog`, `md-blog`, `homepage`, `mintbase`,
  `bashclient`) = 132 probes. Only `taskbase/homepage` exists.
  The REST API returns `[]` anonymously for every query, so there is no public
  project listing to enumerate.
- **GitHub** — the monorepo started life at `github.com/jjoller/tb`, so the
  2015 committers' accounts were listed in full: `bersling` (77 repos),
  `jjoller` (13), `corentinp` (1), `ruiixu23` (6), `nicolamr` (0), plus both
  users' gists. **No edtechlab repo.** Nearest misses, both ruled out:
  `bersling/mintbase` (2015-10) is a static Bootstrap template, not Meteor;
  `bersling/putzfrau-suche` (2015-11) *is* a Meteor app — 1.2.1, Angular, no
  `xolvio:md-blog` — confirming the developer's Meteor+`mup` workflow but
  sharing no code with edtechlab.ch.
- GitHub repo search `edtechlab` — 6 repos, all unrelated third parties.
  `xolvio/md-blog` itself no longer resolves on GitHub.

## Monorepo history

Every blob in the object database was stream-grepped (221,919 objects, 5.11 GB
— stronger than pickaxe, it reaches unreachable objects), plus all 95,372 paths
ever present in history.

**Zero hits** for `md-blog`, `xolvio`, `autoupdateVersion`, `meteorRelease`,
`mup.json`, `mup.js`, `smart.json`, `Blaze.`, any `Meteor.*` API call, either
bundle hash, or any path containing `meteor`/`.meteor`.

**One** Meteor artefact exists, and it explains the absence —
`scripts/bc/host.sh`, added `73aed2002b` (2016-01-28), deleted `645fc2300d`:

```bash
edtechlab="~/Desktop/meteor-projects/edTechLab"
cp -rf ../../bashclient ~/Desktop/meteor-projects/edTechLab/public/
...
mup deploy settings --settings.json
```

The app lived in an uncommitted folder on one developer's laptop and was pushed
straight out with `mup`. It was never in version control, so there is no
history to recover it from.

Two related finds: `scripts/uptime/install.sh` (`71943424ab`, 2016-01-25)
labels `root@188.166.84.120` — DigitalOcean AMS3 — as the `#edtechlab server`;
and `scripts/uptime/make_call.py` fetches `http://edtechlab.ch/twiml1.xml`,
a static file out of Meteor's `public/`. Attested URL paths on the domain are
therefore `/`, `/taskbase`, `/twiml1.xml`, `/bashclient/doc/` and
`/bashclient.zip` — none of them captured anywhere.

No nginx conf, vhost, CI file, Dockerfile, terraform, ansible, `.env` or doc in
the entire history ever mentions `edtechlab`.

## Local disk

Swept all of `/home/cat` read-only: filenames (`*edtech*`, `*meteor*`,
`*md-blog*`, `*xolvio*`, `.meteor/`), archive files, content greps, both bundle
hashes, screenshots, all 20 git repos on the box, the Chromium profile's
history/favicons/cache, and `.bash_history`. **Nothing.** Every hit resolves to
this project or this session's own logs.

## Excluded

`edtechlab.com` is **not** ours. Its 200-status captures carry one identical
digest (`BJ2EZ3OP3USJBEJT3DRHEQCGIS4OI62L`) from 2009 straight through 2017,
spanning the whole edTechLab AG period, and the site is an accreditation and
testing lab (`accreditation.html`, `images/cert.jpg`, `EDTAlogo.bmp`). The
`info@edtechlab.com` address hard-coded in the Java mailer from 2015-06-05 was
simply the wrong domain.
