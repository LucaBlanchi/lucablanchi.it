export type PresentationTheoryArticleAssetType = "tex";

export interface PresentationTheoryArticleAsset {
  href: string;
  label: string;
  type: PresentationTheoryArticleAssetType;
}

export interface PresentationTheoryArticle {
  slug: string;
  href: string;
  title: string;
  description: string;
  date: string;
  datetime: string;
  section: string;
  assets: readonly PresentationTheoryArticleAsset[];
}

export interface PresentationTheoryArticleGroup {
  title: string;
  description?: string;
  hrefs: readonly string[];
}

export const presentationTheoryArticles = [
  {
    slug: "presentations-and-restricted-descriptions",
    href: "/presentation-theory/presentations-and-restricted-descriptions.html",
    title: "Presentations and Restricted Descriptions: An Exploratory Note",
    description: "Two elementary examples of how inference rules and copying instructions affect description cost, with explicit limits and no claim of novelty.",
    date: "November 6, 2026",
    datetime: "2026-11-06",
    section: "Exploratory note",
    assets: [
      {
        href: "/assets/presentation-theory/presentations-and-restricted-descriptions.tex",
        label: "TeX source: Presentations and Restricted Descriptions",
        type: "tex",
      },
    ],
  },
] as const satisfies readonly PresentationTheoryArticle[];

export const presentationTheoryArticleGroups = [
  {
    title: "Exploratory note",
    description: "A small worked comparison of description models; no new general theory is claimed.",
    hrefs: ["/presentation-theory/presentations-and-restricted-descriptions.html"],
  },
] as const satisfies readonly PresentationTheoryArticleGroup[];

export const presentationTheoryArticlesByHref = new Map<string, PresentationTheoryArticle>(
  presentationTheoryArticles.map((article) => [article.href, article]),
);

export function getPresentationTheoryArticleByHref(href: string): PresentationTheoryArticle | undefined {
  return presentationTheoryArticlesByHref.get(href);
}

export function getPresentationTheoryArticleSourceAssets(article: PresentationTheoryArticle): PresentationTheoryArticleAsset[] {
  return [...article.assets];
}
