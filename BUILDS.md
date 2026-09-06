# Builds

How the four Angular sites got built. No node on this box, so everything runs
in docker. Build in a scratch dir, copy only `dist/` back. `node_modules` never
touches the repo.

Three of the four share one recipe:

```bash
tools/build-site.sh 2018-04-angular-relaunch
```

The 2023 one is different and has no script. Recipe below.

## Rules that apply to all of them

- `--base-href ./` always. Sites are served under `/s/<slug>/`, so `/main.js`
  would 404.
- `tools/dist_fixup.py <dist>` after the build. Angular leaves a few
  `/assets/...` refs in the bundle and in `index.html`; this makes them
  relative and strips Google Tag Manager, Inspectlet and the
  `www.taskbase.com` redirect.
- `tools/route_stubs.py sites/<slug> team impressum ...` for deep links. The
  static server has no SPA fallback, so each route gets a copy of `index.html`
  with an absolute `<base href="/s/<slug>/">`. A relative base does not work
  here: Angular resolves the base href against the document URL, which is
  already rebased, so `../` lands a level too high.
- Source maps get deleted. They are 5-30 MB and nothing reads them.
- The old specimen card is kept as `specimen.html`, unlinked.

## 2018-04-angular-relaunch

Image: `node:8`. Angular 5.2.6, @angular/cli 1.7.1.

```
npm install --no-audit --no-optional
./node_modules/.bin/ng build --prod --extract-css=false --base-href ./
```

Worked first try. No workarounds. `node-sass` 4.x has a prebuilt binary for
node 8, so the SCSS built fine and `tools/scss_flatten.py` was not needed.
`--extract-css=false` is the repo's own `build:prod` flag.

Outcome: **ok**. AOT production build. Cross-checked against the Internet
Archive snapshot of 2018-06-12 — same sections, same order, and this build
still has the images the archive lost. The team page pulls Google Maps live.

## 2018-09-angular-examples

Same recipe, same image, same result: **ok**.

Two things worth knowing. The landing page is byte-for-byte the same design as
the April relaunch — the grammar and content-matching demos were at unlinked
`/examples` routes, not on the homepage yet. Both demos render. The Express
backend under `src/backend` is not run, so pressing "Antworten" does nothing.

## 2017-12-angular-prototype

Image: `node:8`. Angular 5.x, @angular/cli 1.5.4.

Two snags:

1. `ng` died with `Cannot find module '@angular-devkit/core'`. The 1.5.4
   dependency tree is missing it. Fixed by installing
   `@angular-devkit/core@0.0.29` (the version its own peer warning asks for)
   after the normal install.
2. `--prod` fails: `Property 'sidenaveState' does not exist on type
   'AppComponent'`. That is a typo in the original `app.component.html` that
   JIT never noticed. So this one gets a plain dev build, which is fine for a
   museum.

Outcome: **ok**. The placeholder copy in the d3 module tree ("Bla", "Blab",
"Blub", "Barf") is genuine — this prototype never went public.

## 2023-angular-monorepo

Image: `node:14`. Angular 14.2.12, @angular/cli 14.2.10. This one builds from
the monorepo root, not from a standalone package.

Get the source out of git at the snapshot commit:

```bash
cd /home/cat/workspaces/1478/homepages-wt
git archive f66d393bea \
  package.json package-lock.json angular.json tsconfig.json \
  .browserslistrc polyfills.ts karma.conf.js \
  building common homepage aila-sdk aila-common .eslintrc \
  | tar -x -C <scratch>
```

Then:

```
npm ci --no-audit --ignore-scripts               # root
cd homepage/client && npm install --ignore-scripts
node_modules/.bin/ng build homepage --configuration production \
  --base-href ./ --output-path homepage/client/dist/prodmuseum
```

Run the container as your own uid (`-u "$(id -u):$(id -g)" -e HOME=/app`).
Angular 14 writes a `.angular/cache` dir; if an earlier run made it root-owned
the next build dies with EACCES on every module.

`--ignore-scripts` because the `postinstall` hooks call gradle.

Three generate steps the `npm run generate` script would have done:

- `environments/environment{,.dev,.staging,.prod}.ts` — normally
  `building/set-env.ts` via ts-node + dotenv. Written by hand instead, same
  values, empty sandbox password.
- `src/app/scss-variables.generated.ts` — run
  `building/scss-to-typescript/scss-to-typescript.js`. Needs
  `npm install scss-to-json@2.0.0` in that folder first. Works fine, node-sass
  4.14.1 has a linux-x64-83 binary.
- the API DTO typings. **This is the one that does not work.** Both
  `common/client/ai/ai-dto.generated.ts` and
  `common/client/lap-sdk-types/internal/lap-sdk-types.generated.ts` come from
  `./gradlew generateTypeScript`, which `dependsOn run` on a Kotlin main class
  in `lap/server` and `ai`. That means compiling the whole backend — stanford
  corenlp, dropwizard, local jars in `ai/lib`, plus an openapi-generator step
  (`scripts/build-api-server.sh`) that writes `lap/server/lib`. Not a thing
  worth doing for a screenshot.

So the typings are stubbed. `tools/dto_stubs.py <build.log> <scratch>` reads
the build log, picks up every "has no exported member" name and appends a type
alias to `any` plus a Proxy value (so `Correctness.WRONG` still resolves to
something). 242 names in total. Run it, build, run it again until the log is
clean. Three more nudges were needed:

- `noImplicitAny` and `strictNullChecks` off, in root `tsconfig.json` and
  `homepage/client/tsconfig.json`. Otherwise ~60 callbacks in
  `common/client` error out because the stub types erased their inference.
- nine stub names that are used as generic constraints (`StudentInput`,
  `GradingFeedback`, `Task`, `GraphShape`, the Dnd inputs and feedbacks) need
  `{ [key: string]: any }` instead of `any`, or property access on the type
  parameter fails.
- one lodash callback in
  `common/client/task/tbtask/internal/types/drag-and-drop/dnd-group/dnd-group.component.ts`
  needed an explicit `(dndGroup: any)`.

Then it builds clean in about 7 seconds.

Outcome: **partial**. Everything visual is the real thing — the landing page,
the technology section, the team page with the new portraits and the
Dreikönigstrasse address, and all the demos (spellcheck, postcard, summary,
matching, german, grammar). What is not real: the DTO enum values, so demo
grading logic runs on placeholders. The backend is gone anyway.

The page pops its own "Your web browser version is no longer supported"
snackbar. That is a real bug in `browser-warning/browser-support.ts`: it
compares version numbers as strings, so Chrome "141" sorts below its 2016
floor of "48". Nobody in 2023 saw it. The preview shot was taken with that
overlay removed; the live page still shows it.

One 404 is genuine, not a packaging slip: the postcard demo's SCSS asks for
`assets/img/postcard.svg`, and that file does not exist at `f66d393bea` — the
repo has `postcart.png` and `showcases/postcard.svg`. It was broken live.

The default (non-production) configuration also builds — 7.7 MB instead of
1 MB — but it throws a `BrowserAnimationsModule` console error, because the
original `app.module.ts` never imported one and the snackbar wants it. The
production config swallows that.

If someone wants to finish this properly, the next step is a docker image with
JDK 17 + gradle 7.4.2, then `./gradlew --project-dir lap/server
generateTypeScript` and `./gradlew --project-dir ai generateTypeScript`, and
dealing with whatever `ai/lib/*.jar` and `build-api-server.sh` need.

## 2021-03-craft-cms

Not a build — a mirror. But the real Craft stack was run, to find out how far
it gets without the database. Answer: all the way to the first template line,
then it dies.

Recipe, if someone wants to repeat it:

```bash
# code
git clone https://code.taskbase.com/taskbase/craft-homepage.git <scratch>

# deps: vendor/ was gitignored, so composer has to run
docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp -e COMPOSER_HOME=/tmp/composer \
  -v <scratch>:/app -w /app composer:2.2 install --ignore-platform-reqs

# php 7.4 + the extensions craft 3 wants
# php:7.4-apache + docker-php-ext-install pdo_mysql intl zip gd bcmath exif
#   (needs libicu-dev libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev)
#   plus a2enmod rewrite and DocumentRoot -> /var/www/html/web

docker run -d --name craftdb --network craftnet \
  -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=craft mysql:5.7

# .env from .env.example, own SECURITY_KEY, DB_SERVER=craftdb, DB_PORT=3306
php craft install --interactive=0 --username=admin --email=... --password=... \
  --site-name=Taskbase --site-url=http://localhost:4798/ --language=en
```

`composer install` works, exit 0, with `--ignore-platform-reqs` (the image is
PHP 8.1, `composer.json` pins the platform to 7.2.5). One deprecation notice:
`aelvan/imager` is abandoned. `php craft install` runs the whole migration set
in 17 seconds and — the useful part — ends with **"applying existing project
config"**. `config/project/*.yaml` is committed, so the content *model* comes
back in full: 4 sections (home, contactPage, contentPage, testimonials), 4
entry types, 76 fields, 1 global set, and all six plugins install. Craft's own
control panel serves a 200 at `/admin/login`.

The content does not come back. 0 assets, and the two singles Craft
auto-creates (Home, Contact Page) are empty. So `/` throws:

```
Twig\Error\RuntimeError: Impossible to access an attribute ("extension") on a
null variable.   templates/includes/_header.html line 3
```

which is `{% if globalContent.logo.one.extension == 'svg' %}` — the site's
logo, an asset in a servd volume that no longer exists. That is line 3 of the
first include of the first template. Every field below it is null the same way.

Getting a real render means seeding 76 fields plus an asset volume by hand,
and the images would still have to come from the archive. At that point the
archived HTML is the same picture with less invention, which is what
`sites/2021-03-craft-cms/` ships.

Two gotchas if you do repeat it:

- `php craft install` in a root container leaves `storage/` owned by root, and
  apache then 503s with "storage isn't writable by PHP". `chown -R www-data`
  it, or run both as the same uid.
- `web/cpresources` is gitignored, so create it before starting apache.

## 2023-angular-monorepo — second pass, on the stubbed DTOs

Question that was open: do the 242 stubbed DTO names cause a *visible* defect?

Answer: no. Only four files in `homepage/client/src` use a name from
`@taskbase/ai` or `@taskbase/lap-sdk-types` in value position, not just as a
type:

- `examples/ai.service.ts` — `Language.EN`, goes into a request body.
- `examples/highlight-question/…` — `Correctness.WRONG/CORRECT`,
  `InPlaceSolutionType.HIGHLIGHT`, but `initializeTokens()` fills `tokens`
  from `partOfSpeechEnglishTokenizer`, so nothing renders without the backend.
- `examples/task-by-title/…` — `Correctness`, `TaskType`, `StudentInputType`,
  `StepFeatureType`, reached only after `authService.login()` against LAP.
- everything else imports them as types only.

So every path that reads a stubbed value first needs a response from a backend
that is gone. And the stub is a Proxy with `get: (_t, k) => k`, so a comparison
between two stubbed values is self-consistent. The only way it could bite is a
literal from outside the bundle compared against a stub enum, which needs the
backend too. Nothing on screen depends on a real enum literal. Running gradle
would not change a single pixel — status moved to **ok** on that basis, with
the stub still written down in `meta.json`.

Three things did need fixing, all found by watching the network:

- `"https://gateway.taskbase.com"` and `"https://lap.taskbase.com/api"` were
  live in `main.*.js`. Pressing "Antworten" on a demo POSTed to production and
  got a real 400 back. Both repointed at `not-archived/…`, as was the contact
  form's `…cloudfunctions.net/sendMail`.
- `styles.*.css` opened with a live
  `@import "https://fonts.googleapis.com/css?family=Roboto|Source+Sans+Pro"`,
  and Angular 14's font inlining had baked 14 `fonts.gstatic.com` faces into
  `index.html` (Cormorant Garamond, Lato, Source Sans Pro). All vendored into
  `assets/fonts/`; the two families behind the `@import` are the Internet
  Archive's own copies of that query, borrowed from
  `sites/2019-01-angular-spa/assets`.
- `examples/grammar/end` had no route stub. Added.

The browser-support snackbar cannot be dismissed, and that is not the museum's
fault: `MatSnackBar` removes its container when the exit animation reports
done, and the original `app.module.ts` never imported `BrowserAnimationsModule`.
Clicking "Dismiss" therefore does nothing. It is a floating toast, not a wall —
the whole page stays visible and interactive behind it — so the preview keeps
it rather than being doctored.

## 2019-01-angular-spa — assets came from git, not the crawl

Worth recording because the exhibit's `source` says `wayback`. The archive
stored the built bundle and both Google Fonts stylesheets with their gstatic
TTFs, but none of `assets/`. The 84 images and the three bundled TTFs
(`ariblk`, `bahnschrift`, `thaisan`) are the monorepo's own files at
`e314d3cee7`, dated 2019-01-15 — the same day as the snapshot, and the last
commit to touch `homepage/client/src/assets` before it. Verified byte-for-byte
against the files an earlier pass had already borrowed.

The three that mattered were `blackboard.jpg`, `electrobg.svg` and
`customers/left.svg`: without them the "Unser Angebot" section is white chalk
text on nothing, which reads as a broken fade-in rather than a blackboard.

The deployed bundle routes `technology/:id` and reads `+params.id`, while the
same-day source already had `technology/:link` matched against a slug — so
route stubs are `technology/0` … `technology/5`. Anyone stubbing from the
source files instead of the bundle gets a page that throws on
`undefined.pic`.

`@agm/core` builds its loader URL as `protocol + "//" + hostAndPath`, so
replacing the host alone yields `https://not-archived/…` and a DNS hang.
The whole expression has to go.
