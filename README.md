# Taskbase Homepage Museum

Every homepage taskbase.com ever had, in one place. Visuals only. Forms,
analytics and backends are dead or stripped out.

TIRA-1478.

## Run it

```bash
./serve.sh          # port 4780
./serve.sh 4999     # or pick one
```

Then open the gallery. It lists every homepage with a preview.

## Layout

```
sites/<slug>/       one homepage, static, index.html at the root
sites/<slug>/meta.json    era, stack, source, status  (see CONTRACT.md)
sites/<slug>/preview.png  gallery thumbnail
fetch/              scripts that pulled the sites in
tools/gallery.py    builds index.html from the meta.json files
tools/serve.py      static server, sites live under /s/<slug>/
HISTORY.md          the timeline
```

`serve.sh` regenerates the gallery every time, so adding a site is just:
drop it in `sites/`, write `meta.json`, restart.

## Where the sites come from

- **wayback** — mirrored from the Internet Archive with `fetch/wayback_mirror.py`.
- **git** — extracted from history with `fetch/git_snapshot.py`. Three places:
  the old Java/AngularJS webapp (2015–2018), the standalone
  `code.taskbase.com/taskbase/homepage.git` repo (2017–2018), and the
  `homepage/` folder in this monorepo (2018–2023). See `HISTORY.md`.
- **live** — the current site, mirrored with `fetch/live_mirror.py`.

## Known limits

Old snapshots lose things the archive never crawled: some fonts, some images,
video. JS-heavy sites lose animations and anything lazy-loaded. Anything that
needed a node build is kept as source plus a specimen page, not a live render —
`status` in `meta.json` says which is which.
