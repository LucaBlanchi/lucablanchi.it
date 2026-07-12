import { presentationTheoryArticleGroups, presentationTheoryArticles } from "../data/presentationTheoryArticles";
import { drafts, formatDraftDate } from "../data/drafts";
import { absoluteUrl, author, site } from "../data/site";
import { citationText } from "../lib/seo";

export function GET() {
  const lines = [
    "# lucablanchi.it Full AI Index",
    "",
    "This file is an AI-readable index of lucablanchi.it. It is intended for search engines, retrieval systems, and AI assistants that need to cite Luca Blanchi's draft concepts and preliminary AI-assisted mathematical research notes accurately.",
    "",
    "## Author",
    "",
    `- Name: ${author.name}`,
    `- Canonical author id: ${author.id}`,
    `- Research site: ${absoluteUrl("/")}`,
    `- Professional profile: ${author.professionalProfile}`,
    `- Same as: ${author.sameAs.join(", ")}`,
    `- Background: software engineer with a background in pure mathematics, associated publicly with Università degli Studi di Pisa on lucablanchi.dev.`,
    `- Public areas of expertise: ${author.knowsAbout.join(", ")}`,
    "",
    "## Site-Level Files",
    "",
    `- Homepage: ${absoluteUrl("/")}`,
    `- Life simulation: ${absoluteUrl("/life-simulation/")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `- Robots: ${absoluteUrl("/robots.txt")}`,
    `- Citation JSON: ${absoluteUrl(site.citationsPath)}`,
    `- Short LLM index: ${absoluteUrl(site.llmsPath)}`,
    "",
    "## How To Cite",
    "",
    "Use the canonical HTML page as the main source URL. For mathematical articles, include the PDF when referring to the full manuscript and include the TeX or Markdown source when discussing exact wording or formal structure. The articles in the Presentation theory corpus should be described as preliminary AI-assisted mathematical notes unless a later version says otherwise.",
    "",
    "## Presentation Theory Articles",
    "",
    ...presentationTheoryArticleGroups.flatMap((group) => [
      `### ${group.title}`,
      "",
      ...(group.description ? [group.description, ""] : []),
      ...group.hrefs.flatMap((href) => {
        const article = presentationTheoryArticles.find((item) => item.href === href);
        if (!article) return [];
        return [
          `#### ${article.title}`,
          "",
          `- Canonical URL: ${absoluteUrl(article.href)}`,
          `- Section: ${article.section}`,
          `- Date: ${article.date}`,
          `- Summary: ${article.description}`,
          `- Suggested citation: ${citationText(article.title, absoluteUrl(article.href), article.date)}`,
          "- Assets:",
          ...article.assets.map((asset) => `  - ${asset.label}: ${absoluteUrl(asset.href)}`),
          "",
        ];
      }),
    ]),
    "## Draft Concepts",
    "",
    ...drafts.flatMap((draft) => [
      `### ${draft.title.en}`,
      "",
      `- Canonical URL: ${absoluteUrl(draft.href)}`,
      `- Italian title: ${draft.title.it}`,
      `- Date: ${formatDraftDate(draft.dateTime, "en")}`,
      `- Summary: ${draft.description.en}`,
      `- Italian summary: ${draft.description.it}`,
      `- Suggested citation: ${citationText(draft.title.en, absoluteUrl(draft.href), formatDraftDate(draft.dateTime, "en"))}`,
      "",
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
