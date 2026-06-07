import { getCmsSnapshot } from "./store";
import type { CmsSeo } from "./types";

export const cmsPageHead = (
  pageId: string,
  fallback: {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    keywords?: string;
    schemaJson?: string;
  },
) => {
  const seo: Partial<CmsSeo> = getCmsSnapshot().pages[pageId]?.seo ?? {};
  const title = seo.metaTitle || fallback.title;
  const description = seo.metaDescription || fallback.description;
  const canonical = seo.canonicalUrl || fallback.canonical;
  const ogImage = seo.ogImage || fallback.ogImage;
  const schemaJson = seo.schemaJson || fallback.schemaJson;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(seo.keywords || fallback.keywords
        ? [{ name: "keywords", content: seo.keywords || fallback.keywords }]
        : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
      ...(seo.robots ? [{ name: "robots", content: seo.robots }] : []),
    ],
    links: canonical ? [{ rel: "canonical", href: canonical }] : [],
    scripts: schemaJson
      ? [
          {
            type: "application/ld+json",
            children: schemaJson,
          },
        ]
      : [],
  };
};

export const cmsLocationHead = (slug: string, fallback: ReturnType<typeof cmsPageHead>) => {
  const seo: Partial<CmsSeo> = getCmsSnapshot().locationPages[slug]?.seo ?? {};
  if (!seo.metaTitle && !seo.metaDescription) return fallback;
  const fallbackTitle = fallback.meta.find((item) => "title" in item)?.title ?? "";
  const fallbackDescription =
    fallback.meta.find((item) => "name" in item && item.name === "description")?.content ?? "";
  const title = seo.metaTitle || fallbackTitle;
  const description = seo.metaDescription || fallbackDescription;

  return {
    ...fallback,
    meta: [
      { title },
      { name: "description", content: description },
      ...(seo.keywords ? [{ name: "keywords", content: seo.keywords }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(seo.ogImage ? [{ property: "og:image", content: seo.ogImage }] : []),
      ...(seo.robots ? [{ name: "robots", content: seo.robots }] : []),
    ],
    links: seo.canonicalUrl ? [{ rel: "canonical", href: seo.canonicalUrl }] : fallback.links,
    scripts: fallback.scripts,
  };
};
