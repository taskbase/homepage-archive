#!/usr/bin/env bash
# Build one of the @angular/cli 1.x sites in docker and drop the result into
# sites/<slug>/. Works for 2017-12-angular-prototype, 2018-04-angular-relaunch
# and 2018-09-angular-examples. 2023-angular-monorepo is different, see BUILDS.md.
#
#   tools/build-site.sh 2018-04-angular-relaunch
#
# Nothing node runs on the host. node_modules stays in the scratch dir.
set -euo pipefail
cd "$(dirname "$0")/.."
REPO="$PWD"
SLUG="${1:?usage: build-site.sh <slug>}"
SCRATCH="${SCRATCH:-/tmp/homepage-builds}/$SLUG"

case "$SLUG" in
  2017-12-angular-prototype)
    # cli 1.5.4 ships without @angular-devkit/core, and --prod trips over a typo
    # in the original app.component.html, so this one gets a JIT build.
    EXTRA_INSTALL="--no-save @angular-devkit/core@0.0.29"
    BUILD_FLAGS=""
    ROUTES="impressum blog team"
    ;;
  2018-04-angular-relaunch|2018-09-angular-examples)
    EXTRA_INSTALL=""
    BUILD_FLAGS="--prod --extract-css=false"
    ROUTES="team impressum technology/0 technology/1 technology/2 technology/3 technology/4 technology/5"
    [ "$SLUG" = 2018-09-angular-examples ] && ROUTES="$ROUTES examples examples/grammar examples/matching"
    ;;
  *) echo "no recipe for $SLUG" >&2; exit 1 ;;
esac

rm -rf "$SCRATCH"
mkdir -p "$SCRATCH"
cp -a "$REPO/sites/$SLUG/src/." "$SCRATCH/"

# as the host user, so node_modules and dist do not come back root-owned
docker run --rm -v "$SCRATCH:/app" -w /app -u "$(id -u):$(id -g)" -e HOME=/app node:8 sh -c "
  npm install --no-audit --no-optional &&
  { [ -z '$EXTRA_INSTALL' ] || npm install --no-audit $EXTRA_INSTALL; } &&
  ./node_modules/.bin/ng build $BUILD_FLAGS --base-href ./ --progress=false"

rm -f "$SCRATCH"/dist/*.map
python3 tools/dist_fixup.py "$SCRATCH/dist"

cd "$REPO/sites/$SLUG"
[ -f specimen.html ] || mv index.html specimen.html
cp -a "$SCRATCH/dist/." .
python3 "$REPO/tools/route_stubs.py" "$REPO/sites/$SLUG" $ROUTES

echo "built $SLUG -> sites/$SLUG/ (serve, then: shot http://localhost:4780/s/$SLUG/ --full)"
