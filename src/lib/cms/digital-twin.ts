import type {
  CmsDigitalTwin,
  CmsTwinComponent,
  CmsTwinImageMeta,
  CmsTwinMicroComponent,
  CmsTwinMicroType,
  CmsTwinPage,
  CmsTwinSection,
} from "./types";

export const twinMicro = (
  id: string,
  name: string,
  type: CmsTwinMicroType,
  value: string,
  options: Partial<CmsTwinMicroComponent> = {},
): CmsTwinMicroComponent => ({
  id,
  name,
  type,
  value,
  fallbackValue: options.fallbackValue ?? value,
  href: options.href,
  icon: options.icon,
  image: options.image,
  visible: options.visible ?? true,
  sortOrder: options.sortOrder ?? 0,
  animation: options.animation ?? "",
  background: options.background ?? "",
  layout: options.layout ?? "",
  tooltip: options.tooltip ?? "",
  locked: options.locked ?? false,
  inheritedFrom: options.inheritedFrom,
  override: options.override ?? false,
  applyKey: options.applyKey ?? id,
  device: options.device ?? {},
});

export const twinText = (
  id: string,
  name: string,
  value: string,
  options: Partial<CmsTwinMicroComponent> = {},
) => twinMicro(id, name, "text", value, options);

export const twinCta = (
  id: string,
  name: string,
  label: string,
  href: string,
  options: Partial<CmsTwinMicroComponent> = {},
) => twinMicro(id, name, "cta", label, { ...options, href });

export const twinImage = (
  id: string,
  name: string,
  image: CmsTwinImageMeta,
  options: Partial<CmsTwinMicroComponent> = {},
) => twinMicro(id, name, "image", image.src, { ...options, image });

export const twinComponent = (
  id: string,
  name: string,
  type: string,
  microComponents: CmsTwinMicroComponent[],
  options: Partial<CmsTwinComponent> = {},
): CmsTwinComponent => ({
  id,
  name,
  type,
  visible: options.visible ?? true,
  sortOrder: options.sortOrder ?? 0,
  inheritedFrom: options.inheritedFrom,
  override: options.override ?? false,
  locked: options.locked ?? false,
  microComponents: microComponents
    .map((micro, index) => ({ ...micro, sortOrder: micro.sortOrder || index }))
    .sort((a, b) => a.sortOrder - b.sortOrder),
});

export const twinSection = (
  id: string,
  name: string,
  components: CmsTwinComponent[],
  options: Partial<CmsTwinSection> = {},
): CmsTwinSection => ({
  id,
  name,
  visible: options.visible ?? true,
  sortOrder: options.sortOrder ?? 0,
  inheritedFrom: options.inheritedFrom,
  override: options.override ?? false,
  locked: options.locked ?? false,
  components: components
    .map((component, index) => ({ ...component, sortOrder: component.sortOrder || index }))
    .sort((a, b) => a.sortOrder - b.sortOrder),
});

export const twinPage = (
  id: string,
  title: string,
  route: string,
  group: CmsTwinPage["group"],
  sections: CmsTwinSection[],
  options: Partial<CmsTwinPage> = {},
): CmsTwinPage => ({
  id,
  title,
  route,
  group,
  visible: options.visible ?? true,
  inheritedFrom: options.inheritedFrom,
  parentId: options.parentId,
  sections: sections
    .map((section, index) => ({ ...section, sortOrder: section.sortOrder || index }))
    .sort((a, b) => a.sortOrder - b.sortOrder),
});

export const findTwinMicro = (
  page: CmsTwinPage | undefined,
  sectionId: string,
  componentId: string,
  microId: string,
) =>
  page?.sections
    .find((section) => section.id === sectionId)
    ?.components.find((component) => component.id === componentId)
    ?.microComponents.find((micro) => micro.id === microId);

export const twinValue = (
  page: CmsTwinPage | undefined,
  sectionId: string,
  componentId: string,
  microId: string,
  fallback: string,
) => {
  const micro = findTwinMicro(page, sectionId, componentId, microId);
  if (!micro || !micro.visible) return fallback;
  return micro.value || fallback;
};

export const twinHref = (
  page: CmsTwinPage | undefined,
  sectionId: string,
  componentId: string,
  microId: string,
  fallback: string,
) => {
  const micro = findTwinMicro(page, sectionId, componentId, microId);
  if (!micro || !micro.visible) return fallback;
  return micro.href || micro.value || fallback;
};

export const twinImageMeta = (
  page: CmsTwinPage | undefined,
  sectionId: string,
  componentId: string,
  microId: string,
  fallback: CmsTwinImageMeta,
) => {
  const micro = findTwinMicro(page, sectionId, componentId, microId);
  if (!micro || !micro.visible) return fallback;
  return {
    src: micro.image?.src || micro.value || fallback.src,
    alt: micro.image?.alt || fallback.alt,
    caption: micro.image?.caption ?? fallback.caption,
    overlayText: micro.image?.overlayText ?? fallback.overlayText,
    badge: micro.image?.badge ?? fallback.badge,
    focalPoint: micro.image?.focalPoint ?? fallback.focalPoint,
    crop: micro.image?.crop ?? fallback.crop,
  };
};

export const mergeDigitalTwin = (
  fallback: CmsDigitalTwin,
  saved?: Partial<CmsDigitalTwin>,
): CmsDigitalTwin => ({
  pages: {
    ...fallback.pages,
    ...(saved?.pages ?? {}),
  },
});

export const flattenTwinMicros = (digitalTwin: CmsDigitalTwin) =>
  Object.values(digitalTwin.pages).flatMap((page) =>
    page.sections.flatMap((section) =>
      section.components.flatMap((component) =>
        component.microComponents.map((micro) => ({
          page,
          section,
          component,
          micro,
        })),
      ),
    ),
  );
