import {
  aiArticleGroups,
  aiArticles,
  getAiArticleByHref,
  getAiArticlePdfAssets,
  getAiArticleSourceAssets,
  type AiArticle,
  type AiArticleAsset,
} from "../data/aiArticles";
import { absoluteUrl, author, site } from "../data/site";
import { drafts, formatDraftDate, type Draft } from "../data/drafts";

export interface SeoInput {
  title: string;
  description: string;
  currentPath: string;
  lang: "it" | "en";
}

export interface SeoMeta {
  name?: string;
  property?: string;
  content: string;
}

export interface SeoLink {
  rel: string;
  href: string;
  type?: string;
  title?: string;
  hreflang?: string;
}

export interface CitationLink {
  label: string;
  href: string;
}

export interface CitationInfo {
  title: string;
  text: string;
  links: CitationLink[];
}

export interface SeoData {
  htmlTitle: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  keywords: string;
  metas: SeoMeta[];
  links: SeoLink[];
  schemaJson: string;
  citation?: CitationInfo;
}

const robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

export function getSeoData(input: SeoInput): SeoData {
  const currentPath = normalizePath(input.currentPath);
  const canonicalUrl = absoluteUrl(currentPath);
  const aiArticle = getAiArticleByHref(currentPath);
  const draft = drafts.find((item) => item.href === currentPath);
  const htmlTitle = getHtmlTitle(input.title, currentPath);
  const pageKeywords = keywordsForPage(currentPath, input.title, aiArticle, draft);
  const links = buildLinks(canonicalUrl, aiArticle, draft);
  const metas = buildMetas(input, canonicalUrl, htmlTitle, aiArticle, draft);
  const schema = buildSchema(input, canonicalUrl, currentPath, aiArticle, draft);
  const citation = buildCitation(canonicalUrl, aiArticle, draft);

  return {
    htmlTitle,
    description: input.description,
    canonicalUrl,
    robots,
    keywords: pageKeywords.join(", "),
    metas,
    links,
    schemaJson: JSON.stringify(schema).replace(/</g, "\\u003c"),
    citation,
  };
}

export function monthToDate(value: string) {
  return /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
}

export function citationText(title: string, url: string, dateLabel: string) {
  return `${author.name}. "${title}." ${site.name}, ${dateLabel}, ${url}.`;
}

function normalizePath(path: string) {
  if (!path || path === "/index.html") return "/";
  return path;
}

function getHtmlTitle(title: string, currentPath: string) {
  if (currentPath === "/") return site.title;
  if (title.includes("Luca Blanchi")) return title;
  return `${title} | Luca Blanchi`;
}

function keywordsForPage(currentPath: string, title: string, aiArticle?: AiArticle, draft?: Draft) {
  const base = ["Luca Blanchi", "lucablanchi.it"];

  if (aiArticle) {
    return uniqueValues([
      ...base,
      "presentation theory",
      "AI-assisted mathematics",
      "preliminary mathematical research note",
      aiArticle.section,
      aiArticle.title,
    ]);
  }

  if (draft) {
    return uniqueValues([
      ...base,
      "draft concept",
      draft.title.en,
      draft.title.it,
      draft.description.en,
    ]);
  }

  if (currentPath === "/ai-assisted-math.html") {
    return [
      ...base,
      "presentation theory",
      "AI-assisted mathematics",
      "preliminary research notes",
      "mathematical articles",
    ];
  }

  if (currentPath === "/drafts.html") {
    return [...base, "draft concepts", "working notes", "mathematical drafts"];
  }

  return uniqueValues([...base, title, site.description]);
}

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.map((item) => item.trim()).filter(Boolean))).slice(0, 24);
}

function buildLinks(canonicalUrl: string, aiArticle?: AiArticle, draft?: Draft): SeoLink[] {
  const links: SeoLink[] = [
    { rel: "canonical", href: canonicalUrl },
    { rel: "author", href: author.professionalProfile },
    { rel: "alternate", type: "text/plain", href: absoluteUrl(site.llmsPath), title: "AI-readable site index" },
    {
      rel: "alternate",
      type: "application/json",
      href: absoluteUrl(site.citationsPath),
      title: "Machine-readable citation data",
    },
  ];

  if (draft) {
    links.push(
      { rel: "alternate", hreflang: "en", href: canonicalUrl },
      { rel: "alternate", hreflang: "it", href: `${canonicalUrl}?lang=it` }
    );
  }

  if (aiArticle) {
    for (const asset of aiArticle.assets) {
      links.push({
        rel: "alternate",
        type: mimeForAsset(asset),
        href: absoluteUrl(asset.href),
        title: asset.label,
      });
    }
  }

  return links;
}

function buildMetas(
  input: SeoInput,
  canonicalUrl: string,
  htmlTitle: string,
  aiArticle?: AiArticle,
  draft?: Draft
): SeoMeta[] {
  const ogType = aiArticle || draft ? "article" : "website";
  const image = author.image;
  const metas: SeoMeta[] = [
    { name: "robots", content: robots },
    { name: "author", content: author.name },
    { name: "creator", content: author.name },
    { name: "publisher", content: author.name },
    { name: "keywords", content: keywordsForPage(input.currentPath, input.title, aiArticle, draft).join(", ") },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: htmlTitle },
    { property: "og:description", content: input.description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: image },
    { property: "og:locale", content: input.lang === "it" ? "it_IT" : "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: htmlTitle },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
    { name: "DC.creator", content: author.name },
    { name: "DC.title", content: input.title },
    { name: "DC.description", content: input.description },
  ];

  if (aiArticle) {
    const publicationDate = monthToDate(aiArticle.datetime);
    metas.push(
      { property: "article:published_time", content: publicationDate },
      { property: "article:modified_time", content: site.updatedDate },
      { property: "article:author", content: author.name },
      { property: "article:section", content: aiArticle.section },
      { name: "citation_title", content: aiArticle.title },
      { name: "citation_author", content: author.name },
      { name: "citation_publication_date", content: publicationDate },
      { name: "citation_online_date", content: publicationDate },
      { name: "citation_language", content: "en" },
      { name: "citation_keywords", content: keywordsForPage(input.currentPath, input.title, aiArticle).join("; ") },
      { name: "citation_fulltext_html_url", content: canonicalUrl },
      { name: "DC.date", content: publicationDate },
      { name: "DC.type", content: "Text" }
    );

    for (const asset of getAiArticlePdfAssets(aiArticle)) {
      metas.push({ name: "citation_pdf_url", content: absoluteUrl(asset.href) });
    }
  }

  if (draft) {
    metas.push(
      { property: "article:published_time", content: draft.dateTime },
      { property: "article:modified_time", content: site.updatedDate },
      { property: "article:author", content: author.name },
      { name: "DC.date", content: draft.dateTime },
      { name: "DC.type", content: "Text" }
    );
  }

  return metas;
}

function buildSchema(
  input: SeoInput,
  canonicalUrl: string,
  currentPath: string,
  aiArticle?: AiArticle,
  draft?: Draft
) {
  const pageId = `${canonicalUrl}#webpage`;
  const websiteId = `${site.origin}/#website`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": author.id,
      name: author.name,
      givenName: author.givenName,
      familyName: author.familyName,
      jobTitle: author.jobTitle,
      url: author.url,
      image: author.image,
      sameAs: author.sameAs,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: author.alumniOf.name,
        url: author.alumniOf.url,
      },
      knowsAbout: author.knowsAbout,
      knowsLanguage: ["en", "it"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${site.origin}/`,
      name: site.name,
      description: site.description,
      publisher: { "@id": author.id },
      inLanguage: ["en-US", "it-IT"],
    },
    breadcrumbSchema(currentPath, canonicalUrl),
  ];

  if (aiArticle) {
    const articleId = `${canonicalUrl}#article`;
    graph.push({
      "@type": "ScholarlyArticle",
      "@id": articleId,
      headline: aiArticle.title,
      name: aiArticle.title,
      description: aiArticle.description,
      abstract: aiArticle.description,
      url: canonicalUrl,
      mainEntityOfPage: { "@id": pageId },
      author: { "@id": author.id },
      publisher: { "@id": author.id },
      datePublished: monthToDate(aiArticle.datetime),
      dateModified: site.updatedDate,
      inLanguage: "en-US",
      isAccessibleForFree: true,
      creativeWorkStatus: "Preliminary",
      genre: ["AI-assisted mathematical research note", aiArticle.section],
      keywords: keywordsForPage(currentPath, input.title, aiArticle).join(", "),
      about: ["Presentation theory", aiArticle.section],
      encoding: aiArticle.assets.map((asset) => ({
        "@type": "MediaObject",
        name: asset.label,
        contentUrl: absoluteUrl(asset.href),
        encodingFormat: mimeForAsset(asset),
      })),
    });
    graph.push(webPageSchema(pageId, canonicalUrl, input, "WebPage", articleId));
    return { "@context": "https://schema.org", "@graph": graph };
  }

  if (draft) {
    const articleId = `${canonicalUrl}#article`;
    graph.push({
      "@type": "Article",
      "@id": articleId,
      headline: draft.title.en,
      alternateName: draft.title.it,
      description: draft.description.en,
      url: canonicalUrl,
      mainEntityOfPage: { "@id": pageId },
      author: { "@id": author.id },
      publisher: { "@id": author.id },
      datePublished: draft.dateTime,
      dateModified: site.updatedDate,
      inLanguage: ["en-US", "it-IT"],
      isAccessibleForFree: true,
      keywords: keywordsForPage(currentPath, input.title, undefined, draft).join(", "),
    });
    graph.push(webPageSchema(pageId, canonicalUrl, input, "WebPage", articleId));
    return { "@context": "https://schema.org", "@graph": graph };
  }

  if (currentPath === "/ai-assisted-math.html") {
    graph.push(collectionPageSchema(pageId, canonicalUrl, input, aiArticles));
  } else if (currentPath === "/drafts.html") {
    graph.push(draftCollectionPageSchema(pageId, canonicalUrl, input));
  } else {
    graph.push(webPageSchema(pageId, canonicalUrl, input, "WebPage"));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function webPageSchema(
  pageId: string,
  canonicalUrl: string,
  input: SeoInput,
  type = "WebPage",
  mainEntityId?: string
) {
  return {
    "@type": type,
    "@id": pageId,
    url: canonicalUrl,
    name: input.title,
    description: input.description,
    isPartOf: { "@id": `${site.origin}/#website` },
    author: { "@id": author.id },
    publisher: { "@id": author.id },
    inLanguage: input.lang === "it" ? "it-IT" : "en-US",
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

function collectionPageSchema(pageId: string, canonicalUrl: string, input: SeoInput, articles: readonly AiArticle[]) {
  return {
    ...webPageSchema(pageId, canonicalUrl, input, "CollectionPage"),
    mainEntity: {
      "@type": "ItemList",
      name: "Presentation theory articles",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(article.href),
        name: article.title,
        description: article.description,
      })),
    },
    hasPart: aiArticleGroups.map((group) => ({
      "@type": "Collection",
      name: group.title,
      hasPart: group.hrefs.map((href) => ({ "@id": `${absoluteUrl(href)}#article` })),
    })),
  };
}

function draftCollectionPageSchema(pageId: string, canonicalUrl: string, input: SeoInput) {
  return {
    ...webPageSchema(pageId, canonicalUrl, input, "CollectionPage"),
    mainEntity: {
      "@type": "ItemList",
      name: "Draft concepts",
      itemListElement: drafts.map((draft, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(draft.href),
        name: draft.title.en,
        description: draft.description.en,
      })),
    },
  };
}

function breadcrumbSchema(currentPath: string, canonicalUrl: string) {
  const items = [{ name: "Home", url: `${site.origin}/` }];

  if (currentPath.startsWith("/ai-assisted-math/")) {
    items.push({ name: "Presentation theory", url: absoluteUrl("/ai-assisted-math.html") });
  } else if (currentPath.startsWith("/drafts/")) {
    items.push({ name: "Draft concepts", url: absoluteUrl("/drafts.html") });
  }

  if (currentPath !== "/") {
    const aiArticle = getAiArticleByHref(currentPath);
    const draft = drafts.find((item) => item.href === currentPath);
    items.push({ name: aiArticle?.title ?? draft?.title.en ?? "Page", url: canonicalUrl });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildCitation(canonicalUrl: string, aiArticle?: AiArticle, draft?: Draft): CitationInfo | undefined {
  if (aiArticle) {
    const links = [
      { label: "Canonical HTML", href: canonicalUrl },
      ...getAiArticlePdfAssets(aiArticle).map((asset) => ({ label: asset.label, href: absoluteUrl(asset.href) })),
      ...getAiArticleSourceAssets(aiArticle).map((asset) => ({ label: asset.label, href: absoluteUrl(asset.href) })),
      { label: "AI index", href: absoluteUrl(site.llmsPath) },
      { label: "Citation JSON", href: absoluteUrl(site.citationsPath) },
    ];

    return {
      title: "Citation",
      text: citationText(aiArticle.title, canonicalUrl, aiArticle.date),
      links,
    };
  }

  if (draft) {
    return {
      title: "Citation",
      text: citationText(draft.title.en, canonicalUrl, formatDraftDate(draft.dateTime, "en")),
      links: [
        { label: "Canonical HTML", href: canonicalUrl },
        { label: "AI index", href: absoluteUrl(site.llmsPath) },
        { label: "Citation JSON", href: absoluteUrl(site.citationsPath) },
      ],
    };
  }

  return undefined;
}

function mimeForAsset(asset: AiArticleAsset) {
  if (asset.type === "pdf") return "application/pdf";
  if (asset.type === "tex") return "application/x-tex";
  return "text/markdown";
}
