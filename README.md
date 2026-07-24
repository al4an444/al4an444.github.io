# al4an444.github.io

Personal portfolio of **Alan Ortega Álamo** — security researcher.

Live at **https://al4an444.github.io**

## Stack

- [Astro 5](https://astro.build) — static site, zero unnecessary JavaScript
- [Tailwind CSS 4](https://tailwindcss.com) — styling
- [MDX](https://mdxjs.com) — technical writeups
- CSS scroll-driven animations (+ IntersectionObserver fallback) — Apple-style scrollytelling
- PWA — installable, offline-capable (`manifest.webmanifest` + `sw.js`; icons regenerate with `node scripts/generate-icons.mjs`; bump `VERSION` in `sw.js` when changing cached content)
- GitHub Pages + GitHub Actions — automatic deploy on every push to `main`

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Adding a writeup

Create a new `.mdx` (or `.md`) file in `src/content/research/`, e.g.
`src/content/research/grpc-go-xds-rbac.mdx`:

```mdx
---
title: 'grpc-go: Authentication bypass in xDS RBAC'
project: grpc-go
date: 2026-06-10
severity: 'CVSS 7.5 (High)'
status: 'Fixed by Google'
summary: 'One-line summary shown in listings and meta description.'
---

Full technical writeup in Markdown here...
```

It automatically appears at `/research/<filename>/` and in the list at `/research/`.
Set `draft: true` in the frontmatter to keep it unpublished.

> **Responsible disclosure rule:** publish detailed writeups only for findings that
> are already public. Everything else stays high-level (project + class + status).

## Updating findings

Edit `src/data/findings.ts` — the finding cards on `/research/` are generated
from there (`findings[]`, plus `projects` and `certifications` for the landing
page). Only three findings are surfaced: the public grpc-go writeup carries full
detail; the NVIDIA and Microsoft reports are non-public and are kept high-level
(vendor · severity · status · payout), with no exploitable details. The landing
page's featured grpc-go section is hand-written in `src/pages/index.astro`.

> **Responsible disclosure rule:** publish detailed writeups only for findings
> that are already public. Active/confidential reports stay high-level.
