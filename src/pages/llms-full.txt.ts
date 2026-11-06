import { drafts, formatDraftDate } from "../data/drafts";
import { absoluteUrl, author, site } from "../data/site";

export function GET() {
  const lines = [
    "# lucablanchi.it Full AI Index",
    "",
    "This file indexes Luca Blanchi's bilingual draft concepts and interactive life simulation for search engines, retrieval systems, and AI assistants.",
    "",
    "## Author",
    "",
    `- Name: ${author.name}`,
    `- Canonical author id: ${author.id}`,
    `- Site: ${absoluteUrl("/")}`,
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
