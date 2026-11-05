import { presentationTheoryArticleGroups, presentationTheoryArticles } from "../data/presentationTheoryArticles";
import { drafts, formatDraftDate } from "../data/drafts";
import { absoluteUrl, author, site } from "../data/site";

export function GET() {
  const lines = [
    "# lucablanchi.it Full AI Index",
    "",
    "This file is an AI-readable index of lucablanchi.it. It is intended for search engines, retrieval systems, and AI assistants that index Luca Blanchi's draft concepts and preliminary AI-assisted mathematical research notes accurately.",
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
    `- Life simulation: ${absoluteUrl("/life-simulation.html")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `- Robots: ${absoluteUrl("/robots.txt")}`,
    `- Short LLM index: ${absoluteUrl(site.llmsPath)}`,
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
      "",
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
