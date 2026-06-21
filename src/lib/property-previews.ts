import type { Property } from "@/lib/properties";
import { resolveLocationPage, safePreviewGallery, safePreviewImageList } from "@/lib/pg-locations";

const roomImageFor = (property: Property) => {
  const location = resolveLocationPage(`pg-in-${property.locationSlug}`);
  if (!location) return undefined;

  return (
    [...location.boys, ...location.girls].find((room) => room.type === property.occupancyType)
      ?.image ?? safePreviewGallery(location.gallery)[0]?.src
  );
};

export const withSafePropertyPreview = (property: Property): Property => {
  const image =
    safePreviewImageList([roomImageFor(property), property.image, ...(property.gallery ?? [])].filter(Boolean) as string[])[0] ??
    property.image;

  return image === property.image ? property : { ...property, image };
};
