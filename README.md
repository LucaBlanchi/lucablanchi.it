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

Presentation theory pages read their article directly from the `.tex`
file in `public/assets/presentation-theory/`. Every page uses
`PresentationTheoryArticle.astro` and `TexPaperDocument.astro`; the download link
points to that same file. Keep one canonical source per document; a separate
supplement can have its own source. List these sources in `src/data/presentationTheoryArticles.ts`
so metadata, the sitemap, and the text indexes agree with the page.

Draft AI notices are opt-in: set `aiAssisted: true` on the individual entry in
`src/data/drafts.ts`. Omitting this field leaves the notice off for future drafts.

The brief for the later mathematical review is in
`docs/presentation-theory-review-objective.txt`. It is a task specification, not
a record of a completed review.
