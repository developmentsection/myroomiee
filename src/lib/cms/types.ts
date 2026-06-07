import type {
  LocationPageData,
  LocationPageInheritance,
  LocationPageType,
  PgLocationData,
} from "@/lib/pg-locations";
import type { Property } from "@/lib/properties";

export type CmsScope = "entire-website" | "page" | "main-area" | "sub-area" | "properties";

export type CmsDevice = "desktop" | "tablet" | "mobile";

export type CmsTwinMicroType =
  | "text"
  | "image"
  | "icon"
  | "badge"
  | "counter"
  | "cta"
  | "url"
  | "alt"
  | "caption"
  | "overlay"
  | "visibility"
  | "sort-order"
  | "animation"
  | "background"
  | "layout"
  | "json";

export interface CmsSeo {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
  schemaJson?: string;
  breadcrumbSchemaJson?: string;
  faqSchemaJson?: string;
  localBusinessSchemaJson?: string;
}

export interface CmsButton {
  label: string;
  href: string;
}

export interface CmsContentBlock {
  id: string;
  type: "text" | "image" | "cta" | "faq" | "testimonial" | "custom";
  title: string;
  subtitle?: string;
  body?: string;
  image?: string;
  button?: CmsButton;
  hidden?: boolean;
}

export interface CmsTwinImageMeta {
  src: string;
  alt: string;
  caption?: string;
  overlayText?: string;
  badge?: string;
  focalPoint?: string;
  crop?: string;
}

export interface CmsTwinMicroComponent {
  id: string;
  name: string;
  type: CmsTwinMicroType;
  value: string;
  fallbackValue?: string;
  href?: string;
  icon?: string;
  image?: CmsTwinImageMeta;
  visible: boolean;
  sortOrder: number;
  animation?: string;
  background?: string;
  layout?: string;
  tooltip?: string;
  locked?: boolean;
  inheritedFrom?: string;
  override?: boolean;
  applyKey?: string;
  device?: Partial<Record<CmsDevice, string>>;
}

export interface CmsTwinComponent {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  sortOrder: number;
  inheritedFrom?: string;
  override?: boolean;
  locked?: boolean;
  microComponents: CmsTwinMicroComponent[];
}

export interface CmsTwinSection {
  id: string;
  name: string;
  visible: boolean;
  sortOrder: number;
  inheritedFrom?: string;
  override?: boolean;
  locked?: boolean;
  components: CmsTwinComponent[];
}

export interface CmsTwinPage {
  id: string;
  title: string;
  route: string;
  group:
    | "home"
    | "locations"
    | "properties"
    | "property-detail"
    | "main-area"
    | "sub-area"
    | "about"
    | "faqs"
    | "contact"
    | "legal"
    | "global";
  visible: boolean;
  inheritedFrom?: string;
  parentId?: string;
  sections: CmsTwinSection[];
}

export interface CmsDigitalTwin {
  pages: Record<string, CmsTwinPage>;
}

export interface CmsSection {
  id: string;
  type: string;
  name: string;
  heading: string;
  subheading?: string;
  paragraph?: string;
  buttonText?: string;
  buttonHref?: string;
  images: string[];
  blocks: CmsContentBlock[];
  hidden?: boolean;
  custom?: boolean;
}

export interface CmsPage {
  id: string;
  title: string;
  route: string;
  group: "home" | "locations" | "properties" | "about" | "faqs" | "contact" | "legal" | "global";
  sections: CmsSection[];
  seo: CmsSeo;
}

export interface CmsProperty extends Property {
  hidden?: boolean;
  seo?: CmsSeo;
  sections?: CmsSection[];
}

export interface CmsLocationPage {
  slug: string;
  pageType: LocationPageType;
  mainArea: string;
  mainAreaSlug: string;
  parentSlug?: string;
  parentArea?: string;
  childSlugs: string[];
  subAreas: string[];
  data: LocationPageData | PgLocationData;
  sections: CmsSection[];
  seo: CmsSeo;
  inheritance?: LocationPageInheritance;
  applyToAll?: {
    enabled: boolean;
    scope: CmsScope;
    sourceSlug?: string;
    fields: string[];
  };
  hidden?: boolean;
}

export interface CmsMediaAsset {
  id: string;
  name: string;
  url: string;
  alt: string;
  usage: string[];
  tags: string[];
}

export interface CmsLead {
  id: string;
  createdAt: string;
  source: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: "new" | "contacted" | "visited" | "closed" | "lost";
}

export interface CmsGlobalSettings {
  brandName: string;
  logoText?: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  footerNote: string;
  email?: string;
  address?: string;
  copyrightText?: string;
  categoriesText?: string;
}

export interface CmsSnapshot {
  version: number;
  updatedAt: string;
  pages: Record<string, CmsPage>;
  locationPages: Record<string, CmsLocationPage>;
  properties: CmsProperty[];
  media: CmsMediaAsset[];
  leads: CmsLead[];
  settings: CmsGlobalSettings;
  digitalTwin: CmsDigitalTwin;
}
