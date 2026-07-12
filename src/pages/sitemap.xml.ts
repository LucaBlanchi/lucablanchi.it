import { presentationTheoryArticles } from "../data/presentationTheoryArticles";
import { drafts } from "../data/drafts";
import { absoluteUrl, site } from "../data/site";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "monthly" | "weekly" | "yearly";
  priority: string;
}

const staticEntries: SitemapEntry[] = [
  {
    loc: absoluteUrl("/"),
    lastmod: site.updatedDate,
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    loc: absoluteUrl("/drafts.html"),
    lastmod: site.updatedDate,
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: absoluteUrl("/presentation-theory.html"),
    lastmod: site.updatedDate,
    changefreq: "weekly",
    priority: "0.95",
  },
  {
    loc: absoluteUrl("/life-simulation.html"),
    lastmod: site.updatedDate,
    changefreq: "monthly",
    priority: "0.7",
  },
];

const articleEntries: SitemapEntry[] = presentationTheoryArticles.map((article) => ({
  loc: absoluteUrl(article.href),
  lastmod: site.updatedDate,
  changefreq: "monthly",
  priority: "0.9",
}));

const draftEntries: SitemapEntry[] = drafts.map((draft) => ({
  loc: absoluteUrl(draft.href),
  lastmod: site.updatedDate,
  changefreq: "monthly",
  priority: "0.75",
}));

const assetEntries: SitemapEntry[] = presentationTheoryArticles.flatMap((article) =>
  article.assets.map((asset) => ({
    loc: absoluteUrl(asset.href),
    lastmod: site.updatedDate,
    changefreq: "yearly" as const,
    priority: asset.type === "pdf" ? "0.8" : "0.55",
  }))
);

export function GET() {
  const entries = [...staticEntries, ...articleEntries, ...draftEntries, ...assetEntries];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
