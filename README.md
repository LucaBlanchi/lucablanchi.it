# lucablanchi.it

Static personal draft site built with Astro.

## Requirements

- Node.js 22.12.0 or newer
- npm

If you use `nvm`, run:

```sh
nvm use
```

## Scripts

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
```

The build outputs static files to `dist/`, preserving the existing `.html`
draft URLs.

## Article sources

The exploratory presentation note reads its text directly from the `.tex`
file in `public/assets/presentation-theory/`. Every page uses
`PresentationTheoryArticle.astro` and `TexPaperDocument.astro`; the download link
points to that same file. Keep one canonical source per document; a separate
supplement can have its own source. List these sources in `src/data/presentationTheoryArticles.ts`
so metadata, the sitemap, and the text indexes agree with the page.

Draft AI notices are opt-in: set `aiAssisted: true` on the individual entry in
`src/data/drafts.ts`. Omitting this field leaves the notice off for future drafts.

The mathematical review brief is in `docs/presentation-theory-review-objective.txt`.
The completed review and its limits are documented in Italian in
`docs/presentation-theory-review-report.txt`. The original 52 documents remain
recoverable from Git commit `60bcdcc`; they are no longer public site assets.
The local review ledger and provisional independent notes are in `.review/`,
which is ignored by Git and excluded from the site build.
