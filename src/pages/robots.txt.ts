import { absoluteUrl, site } from "../data/site";

export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
      `LLMs: ${absoluteUrl(site.llmsPath)}`,
      `Citations: ${absoluteUrl(site.citationsPath)}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
