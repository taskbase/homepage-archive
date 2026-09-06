#!/usr/bin/env bash
# Regenerate the gallery and serve the collection.
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-4780}"
python3 tools/gallery.py
exec python3 tools/serve.py --port "$PORT" --quiet
