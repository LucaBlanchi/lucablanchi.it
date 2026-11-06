# lucablanchi.it

Static personal site built with Astro, with two sections: Draft concepts and
Life simulation.

## Requirements

- Node.js 22.12.0 or newer
- npm

If you use `nvm`, run `nvm use`.

## Scripts

```sh
npm install
npm run dev
npm run build
npm run preview
```

The build outputs static files to `dist/`, preserving the existing `.html` URLs.

## Content

Draft metadata lives in `src/data/drafts.ts`; bilingual content lives in
`src/pages/drafts/` and uses `ArticleLayout.astro`. Draft AI notices are opt-in:
set `aiAssisted: true` on an entry. Omitting the field leaves the notice off for
future drafts.

Life simulation uses `src/pages/life-simulation/index.astro` and the browser
modules in `public/life-simulation/`. The files in its `dist/` subdirectory are
required runtime assets, not disposable output from the Astro build.

Navigation, site metadata, the sitemap, and text indexes describe the two active
sections. Retired content remains recoverable from Git history. Local research
and review notes in `.review/` are ignored by Git and excluded from the site.
