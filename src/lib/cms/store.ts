import { useSyncExternalStore } from "react";
import { createDefaultCmsSnapshot, CMS_VERSION } from "./defaults";
import { findTwinMicro, mergeDigitalTwin, twinHref, twinValue } from "./digital-twin";
import type { CmsLocationPage, CmsPage, CmsProperty, CmsSection, CmsSnapshot } from "./types";

export const CMS_STORAGE_KEY = "myroomiee.enterpriseCms.snapshot.v1";

const listeners = new Set<() => void>();
let memorySnapshot: CmsSnapshot | null = null;
const serverSnapshot = createDefaultCmsSnapshot();

const isBrowser = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const emit = () => listeners.forEach((listener) => listener());

const retiredAreaName = ["Kan", "divali"].join("");
const retiredAreaSlug = ["kan", "divali"].join("");
const retiredAreaReplacements: [string, string][] = [
  [`${retiredAreaName} East`, "Jogeshwari East"],
  [`${retiredAreaName} West`, "Jogeshwari West"],
  [`${retiredAreaSlug}-east`, "jogeshwari-east"],
  [`${retiredAreaSlug}-west`, "jogeshwari-west"],
  [retiredAreaName, "Jogeshwari"],
  [retiredAreaSlug, "jogeshwari"],
];

const replaceRetiredAreas = (value: string) =>
  retiredAreaReplacements.reduce((current, [from, to]) => current.replaceAll(from, to), value);

const normalizeRetiredAreas = <T>(value: T): T => {
  if (!value) return value;
  return JSON.parse(replaceRetiredAreas(JSON.stringify(value))) as T;
};

const mergeSections = (fallback: CmsSection[] = [], saved: CmsSection[] = []) => {
  const savedById = new Map(saved.map((section) => [section.id, section]));
  const merged = fallback.map((section) => ({ ...section, ...savedById.get(section.id) }));
  const custom = saved.filter(
    (section) => section.custom && !fallback.some((item) => item.id === section.id),
  );
  return [...merged, ...custom];
};

const mergePages = (
  fallbackPages: Record<string, CmsPage>,
  savedPages?: Record<string, CmsPage>,
): Record<string, CmsPage> => {
  const merged = { ...fallbackPages };
  Object.entries(savedPages ?? {}).forEach(([id, saved]) => {
    const fallback = fallbackPages[id];
    merged[id] = fallback
      ? {
          ...fallback,
          ...saved,
          seo: { ...fallback.seo, ...saved.seo },
          sections: mergeSections(fallback.sections, saved.sections),
        }
      : saved;
  });
  return merged;
};

const mergeLocationPages = (
  fallbackLocations: Record<string, CmsLocationPage>,
  savedLocations?: Record<string, CmsLocationPage>,
): Record<string, CmsLocationPage> => {
  const merged = { ...fallbackLocations };
  Object.entries(savedLocations ?? {}).forEach(([slug, saved]) => {
    const fallback = fallbackLocations[slug];
    merged[slug] = fallback
      ? {
          ...fallback,
          ...saved,
          data: { ...fallback.data, ...saved.data },
          seo: { ...fallback.seo, ...saved.seo },
          sections: mergeSections(fallback.sections, saved.sections),
          pageType: saved.pageType ?? fallback.pageType,
          mainArea: saved.mainArea ?? fallback.mainArea,
          mainAreaSlug: saved.mainAreaSlug ?? fallback.mainAreaSlug,
          parentSlug: saved.parentSlug ?? fallback.parentSlug,
          parentArea: saved.parentArea ?? fallback.parentArea,
          childSlugs: saved.childSlugs?.length ? saved.childSlugs : fallback.childSlugs,
          inheritance: { ...fallback.inheritance, ...saved.inheritance },
          applyToAll: { ...fallback.applyToAll, ...saved.applyToAll },
        }
      : saved;
  });
  return merged;
};

const mergeProperties = (fallbackProperties: CmsProperty[], savedProperties?: CmsProperty[]) => {
  const savedBySlug = new Map((savedProperties ?? []).map((property) => [property.slug, property]));
  const merged = fallbackProperties.map((property) => {
    const saved = savedBySlug.get(property.slug);
    if (!saved) return property;
    return {
      ...property,
      ...saved,
      seo: { ...property.seo, ...saved.seo },
      sections: mergeSections(property.sections, saved.sections),
    };
  });
  const custom = (savedProperties ?? []).filter(
    (property) => !fallbackProperties.some((item) => item.slug === property.slug),
  );
  return [...merged, ...custom];
};

export const mergeCmsSnapshot = (saved?: Partial<CmsSnapshot> | null): CmsSnapshot => {
  const fallback = createDefaultCmsSnapshot();
  const normalizedSaved = saved ? normalizeRetiredAreas(saved) : null;
  if (!normalizedSaved) return fallback;
  return {
    ...fallback,
    ...normalizedSaved,
    version: CMS_VERSION,
    updatedAt: normalizedSaved.updatedAt ?? fallback.updatedAt,
    pages: mergePages(fallback.pages, normalizedSaved.pages),
    locationPages: mergeLocationPages(fallback.locationPages, normalizedSaved.locationPages),
    properties: mergeProperties(fallback.properties, normalizedSaved.properties),
    media: normalizedSaved.media?.length ? normalizedSaved.media : fallback.media,
    leads: normalizedSaved.leads ?? fallback.leads,
    settings: { ...fallback.settings, ...normalizedSaved.settings },
    digitalTwin: mergeDigitalTwin(fallback.digitalTwin, normalizedSaved.digitalTwin),
  };
};

const readStoredSnapshot = (): CmsSnapshot => {
  if (!isBrowser()) return createDefaultCmsSnapshot();
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    const normalizedRaw = raw ? replaceRetiredAreas(raw) : raw;
    if (raw && normalizedRaw !== raw) {
      window.localStorage.setItem(CMS_STORAGE_KEY, normalizedRaw);
    }
    memorySnapshot = mergeCmsSnapshot(
      normalizedRaw ? (JSON.parse(normalizedRaw) as Partial<CmsSnapshot>) : null,
    );
    return memorySnapshot;
  } catch {
    memorySnapshot = createDefaultCmsSnapshot();
    return memorySnapshot;
  }
};

export const getCmsSnapshot = (): CmsSnapshot => {
  if (memorySnapshot) return memorySnapshot;
  return readStoredSnapshot();
};

export const saveCmsSnapshot = (snapshot: CmsSnapshot) => {
  const normalizedSnapshot = normalizeRetiredAreas(snapshot);
  const next: CmsSnapshot = {
    ...normalizedSnapshot,
    version: CMS_VERSION,
    updatedAt: new Date().toISOString(),
  };
  memorySnapshot = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep the live CMS usable even if browser storage is full from large uploaded images.
    }
  }
  emit();
};

export const updateCmsSnapshot = (updater: (snapshot: CmsSnapshot) => CmsSnapshot) => {
  saveCmsSnapshot(updater(clone(getCmsSnapshot())));
};

export const resetCmsSnapshot = () => {
  memorySnapshot = createDefaultCmsSnapshot();
  if (isBrowser()) window.localStorage.removeItem(CMS_STORAGE_KEY);
  emit();
};

export const importCmsSnapshot = (snapshot: Partial<CmsSnapshot>) => {
  saveCmsSnapshot(mergeCmsSnapshot(snapshot));
};

export const subscribeCms = (listener: () => void) => {
  listeners.add(listener);
  if (isBrowser()) {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (isBrowser()) {
      window.removeEventListener("storage", listener);
    }
  };
};

export const useCmsSnapshot = () =>
  useSyncExternalStore(subscribeCms, getCmsSnapshot, () => serverSnapshot);

export const useCmsSettings = () => useCmsSnapshot().settings;

export const useCmsTwinPage = (pageId: string) => {
  const snapshot = useCmsSnapshot();
  return snapshot.digitalTwin.pages[pageId];
};

export const useCmsTwinText = (
  pageId: string,
  sectionId: string,
  componentId: string,
  microId: string,
  fallback: string,
) => {
  const page = useCmsTwinPage(pageId);
  return twinValue(page, sectionId, componentId, microId, fallback);
};

export const useCmsTwinHref = (
  pageId: string,
  sectionId: string,
  componentId: string,
  microId: string,
  fallback: string,
) => {
  const page = useCmsTwinPage(pageId);
  return twinHref(page, sectionId, componentId, microId, fallback);
};

export const useCmsTwinVisible = (
  pageId: string,
  sectionId: string,
  componentId?: string,
  microId?: string,
) => {
  const page = useCmsTwinPage(pageId);
  const section = page?.sections.find((item) => item.id === sectionId);
  if (!section) return true;
  if (!section.visible) return false;
  if (!componentId) return true;
  const component = section.components.find((item) => item.id === componentId);
  if (!component) return true;
  if (!component.visible) return false;
  if (!microId) return true;
  return findTwinMicro(page, sectionId, componentId, microId)?.visible ?? true;
};

export const useCmsProperties = () => {
  const snapshot = useCmsSnapshot();
  const fallbackBySlug = new Map(
    createDefaultCmsSnapshot().properties.map((item) => [item.slug, item]),
  );
  const visible = snapshot.properties
    .filter((property) => !property.hidden)
    .map((property) => {
      const fallback = fallbackBySlug.get(property.slug);
      const image = property.image || fallback?.image || property.gallery[0] || "";
      return {
        ...property,
        image,
        gallery: property.gallery.length
          ? property.gallery
          : (fallback?.gallery ?? (image ? [image] : [])),
        amenities: property.amenities.length ? property.amenities : (fallback?.amenities ?? []),
      };
    });
  return visible.length ? visible : createDefaultCmsSnapshot().properties;
};

export const useCmsLocationData = (slug: string, fallback: CmsLocationPage["data"]) => {
  const snapshot = useCmsSnapshot();
  const data = snapshot.locationPages[slug]?.data;
  if (!data) return fallback;
  return {
    ...fallback,
    ...data,
    gallery: data.gallery.length ? data.gallery : fallback.gallery,
    boys: data.boys.length ? data.boys : fallback.boys,
    girls: data.girls.length ? data.girls : fallback.girls,
    faqs: data.faqs.length ? data.faqs : fallback.faqs,
  };
};

export const useCmsHiddenSections = (pageId: string) => {
  const snapshot = useCmsSnapshot();
  const page = snapshot.pages[pageId] ?? snapshot.locationPages[pageId];
  return new Set(page?.sections.filter((section) => section.hidden).map((section) => section.id));
};

const replaceString = (value: unknown, from: string, to: string): unknown => {
  if (typeof value === "string") return value === from ? to : value;
  if (Array.isArray(value)) return value.map((item) => replaceString(item, from, to));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, replaceString(child, from, to)]),
    );
  }
  return value;
};

export const replaceMediaEverywhere = (snapshot: CmsSnapshot, fromUrl: string, toUrl: string) =>
  replaceString(snapshot, fromUrl, toUrl) as CmsSnapshot;

export const applySectionTextToScope = (
  snapshot: CmsSnapshot,
  sectionId: string,
  patch: Partial<
    Pick<CmsSection, "heading" | "subheading" | "paragraph" | "buttonText" | "buttonHref">
  >,
  scope: "all-locations" | "all-main-areas" | "all-sub-areas" | "all-properties" | "entire-website",
) => {
  const applyToSections = (sections: CmsSection[]) =>
    sections.map((section) => (section.id === sectionId ? { ...section, ...patch } : section));

  if (scope === "entire-website") {
    Object.values(snapshot.pages).forEach((page) => {
      page.sections = applyToSections(page.sections);
    });
  }

  if (scope === "entire-website" || scope === "all-locations") {
    Object.values(snapshot.locationPages).forEach((page) => {
      page.sections = applyToSections(page.sections);
    });
  }

  if (scope === "all-main-areas" || scope === "all-sub-areas") {
    Object.values(snapshot.locationPages)
      .filter((page) => page.pageType === (scope === "all-main-areas" ? "main-area" : "sub-area"))
      .forEach((page) => {
        page.sections = applyToSections(page.sections);
      });
  }

  if (scope === "entire-website" || scope === "all-properties") {
    snapshot.properties = snapshot.properties.map((property) => ({
      ...property,
      sections: applyToSections(property.sections ?? []),
    }));
  }

  return snapshot;
};
