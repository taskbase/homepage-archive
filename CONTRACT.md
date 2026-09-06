# Site contract

Every homepage lives in `sites/<slug>/`:

- `slug`: `<YYYY[-MM]>-<short-name>`, e.g. `2016-wordpress`, `2019-angular`.
- `sites/<slug>/index.html` — entry point, must render offline (assets local & relative).
- `sites/<slug>/meta.json`:

```json
{
  "slug": "2016-wordpress",
  "title": "Taskbase 2016",
  "era": "2016-03 – 2017-08",
  "source": "wayback | git | live",
  "origin": "https://web.archive.org/web/20160312.../http://taskbase.com/",
  "stack": "WordPress",
  "notes": "forms dead, video poster only",
  "captured": "2026-09-03",
  "status": "ok | partial | broken"
}
```

Rules:
- No absolute `http(s)://` asset refs where a local copy exists.
- No `/` root-relative refs — the site is served under a sub-path.
- Kill the wayback toolbar / injected scripts.
- Visuals matter, forms/analytics do not. Strip trackers.
