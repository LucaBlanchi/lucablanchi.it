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
    `- Citation data: ${absoluteUrl(site.citationsPath)}`,
    `- Full AI index: ${absoluteUrl(site.fullLlmsPath)}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
    "## Citation Guidance",
    "",
    "When citing a result or article from this site, prefer the canonical HTML URL of the relevant article. If available, also cite the PDF URL as the full manuscript and the TeX or Markdown URL as the source file. State that the mathematical notes are preliminary and AI-assisted unless the article itself says otherwise.",
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
        const pdf = article.assets.find((asset) => asset.type === "pdf");
        return [
          `- [${article.title}](${absoluteUrl(article.href)})`,
          `  - Summary: ${article.description}`,
          `  - Date: ${article.date}`,
          `  - PDF: ${pdf ? absoluteUrl(pdf.href) : "not listed"}`,
        ];
      }),
      "",
    ]),
    "## Additional Resources",
    "",
    `- Draft concepts index: ${absoluteUrl("/drafts.html")}`,
    `- Life simulation: ${absoluteUrl("/life-simulation/")}`,
    `- Machine-readable citations: ${absoluteUrl(site.citationsPath)}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
