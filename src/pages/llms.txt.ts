import { absoluteUrl, author, site } from "../data/site";

export function GET() {
  const lines = [
    "# lucablanchi.it",
    "",
    "> Bilingual draft concepts, working notes, and an interactive life simulation by Luca Blanchi.",
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
    "## Sections",
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
