import { presentationTheoryArticleGroups, presentationTheoryArticles } from "../data/presentationTheoryArticles";
import { absoluteUrl, author, site } from "../data/site";

export function GET() {
  const lines = [
    "# lucablanchi.it",
    "",
    "> Draft concepts and preliminary AI-assisted mathematical research notes by Luca Blanchi. The Presentation theory section is the main research corpus.",
    "",
    "## Canonical Site Information",
    "",
    `- Site: ${absoluteUrl("/")}`,
    `- Author: ${author.name}`,
    `- Author profile: ${author.professionalProfile}`,
    `- GitHub: ${author.sameAs.find((url) => url.includes("github.com"))}`,
    `- LinkedIn: ${author.sameAs.find((url) => url.includes("linkedin.com"))}`,
    `- Full AI index: ${absoluteUrl(site.fullLlmsPath)}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
    "## Presentation Theory Corpus",
    "",
    ...presentationTheoryArticleGroups.flatMap((group) => [
      `### ${group.title}`,
      "",
      ...(group.description ? [group.description, ""] : []),
      ...group.hrefs.flatMap((href) => {
        const article = presentationTheoryArticles.find((item) => item.href === href);
        if (!article) return [];
        return [
          `- [${article.title}](${absoluteUrl(article.href)})`,
          `  - Summary: ${article.description}`,
          `  - Date: ${article.date}`,
          ...article.assets.map((asset) => `  - ${asset.label}: ${absoluteUrl(asset.href)}`),
        ];
      }),
      "",
    ]),
    "## Additional Resources",
    "",
    `- Draft concepts index: ${absoluteUrl("/drafts.html")}`,
    `- Life simulation: ${absoluteUrl("/life-simulation.html")}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
