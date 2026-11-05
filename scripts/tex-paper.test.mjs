import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderTexPaper, extractTexMacros } from '../src/lib/texPaper.ts';
import { presentationTheoryArticles } from '../src/data/presentationTheoryArticles.ts';

const document = (body, preamble = '') => String.raw`\title{Test}\author{A}\date{June 2026}
${preamble}
\begin{document}
\begin{abstract}Abstract text.\end{abstract}
${body}
\end{document}`;

test('papers without bibliographies retain their body and starred section links', () => {
  const paper = renderTexPaper(document(String.raw`\section*{A note}
All of this text must remain visible.`));
  assert.match(paper.bodyHtml, /All of this text must remain visible/);
  assert.match(paper.bodyHtml, new RegExp(`id="${paper.tocEntries[0].id}"`));
});

test('math survives nested formatting, dollar replacement syntax, and angle brackets', () => {
  const paper = renderTexPaper(document(String.raw`\section{Math}
\textbf{A & B and \emph{$x<y$}}; $k<2m$; $z>0$; \(\textbf{x}\).`));
  assert.match(paper.bodyHtml, /A &amp; B/);
  for (const formula of ['$x&lt;y$', '$k&lt;2m$', '$z&gt;0$', String.raw`\(\textbf{x}\)`]) {
    assert.ok(paper.bodyHtml.includes(formula), formula);
  }
  assert.doesNotMatch(paper.bodyHtml, /@@INLINE/);
});

test('tables nested in statements and multiline statement names are preserved', () => {
  const paper = renderTexPaper(document(String.raw`\section{Tables}
\begin{proposition}[A name spanning
multiple lines]
\begin{center}
\begin{tabular}{ll}
Name & Value \\
A & \(x\) \\
\end{tabular}
\end{center}
\end{proposition}`));
  assert.match(paper.bodyHtml, /Proposition 1.1 \(A name spanning multiple lines\)/);
  assert.match(paper.bodyHtml, /<th>Name<\/th>/);
  assert.match(paper.bodyHtml, /<td>\\\(x\\\)<\/td>/);
});

test('macro definitions and formatted heading links come from the source', () => {
  const tex = document(String.raw`\section{\texorpdfstring{\(x_0\)}{x0}-Torsion}
Text.`, String.raw`\newcommand{\norm}[1]{\left|#1\right|}
\DeclareMathOperator{\rank}{rank}`);
  assert.deepEqual(extractTexMacros(tex), {norm: [String.raw`\left|#1\right|`, 1], rank: String.raw`\operatorname{rank}`});
  const paper = renderTexPaper(tex);
  assert.equal(paper.tocEntries[0].titleHtml, String.raw`\(x_0\)-Torsion`);
  assert.ok(paper.bodyHtml.includes(`id="${paper.tocEntries[0].id}"`));
});

test('all registered sources retain their statements, tables, and section links', () => {
  const hrefs = new Set();
  for (const article of presentationTheoryArticles) {
    for (const asset of article.assets) {
      assert.equal(asset.type, 'tex');
      assert.ok(!hrefs.has(asset.href), `Duplicate source: ${asset.href}`);
      hrefs.add(asset.href);
      const source = readFileSync(new URL(`../public${asset.href}`, import.meta.url), 'utf8');
      const paper = renderTexPaper(source, {idPrefix: article.slug});
      assert.ok(paper.bodyHtml.length > 100, asset.href);
      assert.doesNotMatch(paper.abstractHtml + paper.bodyHtml + paper.bibliographyHtml, /@@INLINE/, asset.href);
      const statements = source.match(/\\begin\{(?:theorem|proposition|lemma|corollary|definition|problem|conjecture|remark|example|assumption|principle)\}/g) ?? [];
      assert.equal((paper.bodyHtml.match(/class="paper-statement"/g) ?? []).length, statements.length, asset.href);
      assert.equal((paper.bodyHtml.match(/<table /g) ?? []).length, (source.match(/\\begin\{tabular\}/g) ?? []).length, asset.href);
      for (const entry of paper.tocEntries) assert.ok(paper.bodyHtml.includes(`id="${entry.id}"`), `${asset.href}: ${entry.id}`);
    }
  }
});
