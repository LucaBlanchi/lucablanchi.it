import { absoluteUrl, author, site } from "../data/site";
import { drafts, type Draft } from "../data/drafts";

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

export interface SeoData {
  htmlTitle: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  keywords: string;
  metas: SeoMeta[];
  links: SeoLink[];
  schemaJson: string;
}

const robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

export function getSeoData(input: SeoInput): SeoData {
  const currentPath = normalizePath(input.currentPath);
  const canonicalUrl = absoluteUrl(currentPath);
  const draft = drafts.find((item) => item.href === currentPath);
  const htmlTitle = getHtmlTitle(input.title, currentPath);
  const pageKeywords = keywordsForPage(currentPath, input.title, draft);
  const links = buildLinks(canonicalUrl, draft);
  const metas = buildMetas(input, canonicalUrl, htmlTitle, draft);
  const schema = buildSchema(input, canonicalUrl, currentPath, draft);

  return {
    htmlTitle,
    description: input.description,
    canonicalUrl,
    robots,
    keywords: pageKeywords.join(", "),
    metas,
    links,
    schemaJson: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
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

function keywordsForPage(currentPath: string, title: string, draft?: Draft) {
  const base = ["Luca Blanchi", "lucablanchi.it"];

  if (draft) {
    return uniqueValues([
      ...base,
      "draft concept",
      draft.title.en,
      draft.title.it,
      draft.description.en,
    ]);
  }

  if (currentPath === "/drafts.html") {
    return [...base, "draft concepts", "working notes", "mathematical drafts"];
  }

  return uniqueValues([...base, title, site.description]);
}

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.map((item) => item.trim()).filter(Boolean))).slice(0, 24);
}

function buildLinks(canonicalUrl: string, draft?: Draft): SeoLink[] {
  const links: SeoLink[] = [
    { rel: "canonical", href: canonicalUrl },
    { rel: "author", href: author.professionalProfile },
    { rel: "alternate", type: "text/plain", href: absoluteUrl(site.llmsPath), title: "AI-readable site index" },
  ];

  if (draft) {
    links.push(
      { rel: "alternate", hreflang: "en", href: canonicalUrl },
      { rel: "alternate", hreflang: "it", href: `${canonicalUrl}?lang=it` }
    );
  }

  return links;
}

function buildMetas(
  input: SeoInput,
  canonicalUrl: string,
  htmlTitle: string,
  draft?: Draft
): SeoMeta[] {
  const ogType = draft ? "article" : "website";
  const metas: SeoMeta[] = [
    { name: "robots", content: robots },
    { name: "author", content: author.name },
    { name: "creator", content: author.name },
    { name: "publisher", content: author.name },
    { name: "keywords", content: keywordsForPage(input.currentPath, input.title, draft).join(", ") },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: htmlTitle },
    { property: "og:description", content: input.description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:locale", content: input.lang === "it" ? "it_IT" : "en_US" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: htmlTitle },
    { name: "twitter:description", content: input.description },
    { name: "DC.creator", content: author.name },
    { name: "DC.title", content: input.title },
    { name: "DC.description", content: input.description },
  ];

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
      keywords: keywordsForPage(currentPath, input.title, draft).join(", "),
    });
    graph.push(webPageSchema(pageId, canonicalUrl, input, "WebPage", articleId));
    return { "@context": "https://schema.org", "@graph": graph };
  }

  if (currentPath === "/drafts.html") {
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

  if (currentPath.startsWith("/drafts/")) {
    items.push({ name: "Draft concepts", url: absoluteUrl("/drafts.html") });
  }

  if (currentPath !== "/") {
    const draft = drafts.find((item) => item.href === currentPath);
    items.push({ name: draft?.title.en ?? "Page", url: canonicalUrl });
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
