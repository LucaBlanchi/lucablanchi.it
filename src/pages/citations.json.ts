import { presentationTheoryArticleGroups, presentationTheoryArticles } from "../data/presentationTheoryArticles";
import { drafts, formatDraftDate } from "../data/drafts";
import { absoluteUrl, author, site } from "../data/site";
import { citationText, monthToDate } from "../lib/seo";

export function GET() {
  const payload = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "lucablanchi.it citation index",
    description:
      "Machine-readable citation and source metadata for Luca Blanchi's draft concepts and preliminary AI-assisted mathematical research notes.",
    url: absoluteUrl(site.citationsPath),
    creator: {
      "@type": "Person",
      "@id": author.id,
      name: author.name,
      url: author.url,
      sameAs: author.sameAs,
    },
    dateModified: site.updatedDate,
    hasPart: [
      {
        "@type": "Collection",
        name: "Presentation theory",
        url: absoluteUrl("/presentation-theory.html"),
        hasPart: presentationTheoryArticles.map((article) => ({
          "@type": "ScholarlyArticle",
          "@id": `${absoluteUrl(article.href)}#article`,
          headline: article.title,
          name: article.title,
          description: article.description,
          abstract: article.description,
          url: absoluteUrl(article.href),
          author: {
            "@id": author.id,
            name: author.name,
          },
          datePublished: monthToDate(article.datetime),
          dateModified: site.updatedDate,
          inLanguage: "en-US",
          creativeWorkStatus: "Preliminary",
          isAccessibleForFree: true,
          section: article.section,
          citation: citationText(article.title, absoluteUrl(article.href), article.date),
          assets: article.assets.map((asset) => ({
            label: asset.label,
            type: asset.type,
            url: absoluteUrl(asset.href),
          })),
        })),
      },
      {
        "@type": "Collection",
        name: "Draft concepts",
        url: absoluteUrl("/drafts.html"),
        hasPart: drafts.map((draft) => ({
          "@type": "Article",
          "@id": `${absoluteUrl(draft.href)}#article`,
          headline: draft.title.en,
          alternateName: draft.title.it,
          description: draft.description.en,
          url: absoluteUrl(draft.href),
          author: {
            "@id": author.id,
            name: author.name,
          },
          datePublished: draft.dateTime,
          dateModified: site.updatedDate,
          inLanguage: ["en-US", "it-IT"],
          isAccessibleForFree: true,
          citation: citationText(draft.title.en, absoluteUrl(draft.href), formatDraftDate(draft.dateTime, "en")),
        })),
      },
    ],
    articleGroups: presentationTheoryArticleGroups,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
