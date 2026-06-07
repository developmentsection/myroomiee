import {
  locationPages as universalLocationPages,
  mainAreaSlugs,
  pgContact,
  type LocationPageData,
  type PgLocationData,
} from "@/lib/pg-locations";
import { properties, type Property } from "@/lib/properties";
import type {
  CmsDigitalTwin,
  CmsLocationPage,
  CmsMediaAsset,
  CmsPage,
  CmsProperty,
  CmsSection,
  CmsSeo,
  CmsSnapshot,
} from "./types";
import {
  twinComponent,
  twinCta,
  twinImage,
  twinMicro,
  twinPage,
  twinSection,
  twinText,
} from "./digital-twin";

export const CMS_VERSION = 1;
export { mainAreaSlugs };

const BASE_URL = "https://myroomiee.com";

export const DEFAULT_CMS_UPDATED_AT = "2026-06-02T00:00:00.000Z";

const section = (
  id: string,
  name: string,
  heading: string,
  options: Partial<CmsSection> = {},
): CmsSection => ({
  id,
  type: options.type ?? id,
  name,
  heading,
  subheading: options.subheading ?? "",
  paragraph: options.paragraph ?? "",
  buttonText: options.buttonText ?? "",
  buttonHref: options.buttonHref ?? "",
  images: options.images ?? [],
  blocks: options.blocks ?? [],
  hidden: options.hidden ?? false,
  custom: options.custom ?? false,
});

const seo = (
  route: string,
  metaTitle: string,
  metaDescription: string,
  ogImage?: string,
): CmsSeo => ({
  metaTitle,
  metaDescription,
  ogImage,
  canonicalUrl: `${BASE_URL}${route}`,
  robots: "index, follow",
  schemaJson: "",
  breadcrumbSchemaJson: "",
  faqSchemaJson: "",
  localBusinessSchemaJson: "",
});

const page = (
  id: CmsPage["id"],
  title: string,
  route: string,
  group: CmsPage["group"],
  sections: CmsSection[],
  pageSeo: CmsSeo,
): CmsPage => ({
  id,
  title,
  route,
  group,
  sections,
  seo: pageSeo,
});

const homeSections = (firstProperty?: Property): CmsSection[] => [
  section("hero", "Hero Section", "Find your perfect PG in Mumbai", {
    subheading:
      "Premium managed PGs and managed PG homes with clean rooms, meals, housekeeping and easy move-in support.",
    buttonText: "Explore Properties",
    buttonHref: "/properties",
    images: firstProperty ? [firstProperty.image, ...firstProperty.gallery] : [],
  }),
  section("pg-toggle", "Boys / Girls PG Toggle", "Choose the stay that fits you"),
  section("featured-properties", "Featured Properties", "Premium properties handpicked for you"),
  section("location-overview", "Location Overview", "Explore popular Mumbai PG locations"),
  section("amenities", "Amenities Section", "Comforts included with MyRoomiee homes"),
  section("benefits", "Benefits Section", "Why residents choose MyRoomiee"),
  section("testimonials", "Testimonials", "Loved by residents across Mumbai"),
  section("faqs", "FAQs Section", "Questions before moving in"),
  section("cta", "CTA Section", "Ready to visit your next room?", {
    buttonText: "Book a Visit",
    buttonHref: "/contact",
  }),
];

const locationSections = (data: PgLocationData): CmsSection[] => [
  section("hero", "Location Hero", data.headline, {
    subheading: data.subheadline,
    paragraph: data.intro,
    buttonText: `Book Visit in ${data.area}`,
    buttonHref: "/contact",
    images: data.gallery.map((item) => item.src),
  }),
  section("trust-strip", "Trust Strip", `${data.area} stay highlights`),
  section("property-listings", "Property Listing Section", `Premium PGs in ${data.area}`),
  section("nearby-areas", "Nearby Areas", `Popular Areas Near Our PGs in ${data.area}`, {
    blocks: (data.serviceAreas ?? []).map((item) => ({
      id: item.href.replace(/^\//, ""),
      type: "custom",
      title: item.name,
      subtitle: item.badge,
      body: item.description,
      button: { label: "View area", href: item.href },
    })),
  }),
  section("amenities", "Amenities Section", "Amenities included in MyRoomiee PGs"),
  section("why-choose", "Why Choose Us", "Why choose MyRoomiee"),
  section("why-stay", "Location Benefits", `Why stay in ${data.area}?`, {
    paragraph: data.whyStay.join("\n"),
  }),
  section("landmarks", "Location Overview", `What's around our ${data.area} PGs`),
  section("gallery", "Gallery Section", `Inside our ${data.area} properties`, {
    images: data.gallery.map((item) => item.src),
  }),
  section("testimonials", "Testimonials", `Loved by residents in ${data.area}`),
  section("seo-content", "SEO Content", `PG in ${data.area}`, {
    blocks: data.seoBlocks.map((item, index) => ({
      id: `seo-${index + 1}`,
      type: "text",
      title: item.title,
      body: item.body,
    })),
  }),
  section("faqs", "FAQs Section", `PG in ${data.area} - frequently asked questions`, {
    blocks: data.faqs.map((item, index) => ({
      id: `faq-${index + 1}`,
      type: "faq",
      title: item.q,
      body: item.a,
    })),
  }),
  section("map", "Contact Section", `Find us across ${data.area}`),
  section("cta", "CTA Section", `Looking for the best PG in ${data.area}?`, {
    buttonText: `Book ${data.area} Visit`,
    buttonHref: "/contact",
    images: data.gallery[0]?.src ? [data.gallery[0].src] : [],
  }),
];

const propertySections = (property: Property): CmsSection[] => [
  section("hero", "Property Hero", property.name, {
    subheading: `${property.occupancyType} in ${property.location}`,
    paragraph: property.description,
    buttonText: "Book Visit",
    buttonHref: "/contact",
    images: property.gallery,
  }),
  section("gallery", "Property Gallery", `${property.name} gallery`, { images: property.gallery }),
  section("amenities", "Property Amenities", "Amenities", {
    blocks: property.amenities.map((item) => ({ id: item, type: "custom", title: item })),
  }),
  section("features", "Property Features", "Property highlights"),
  section("rules", "Property Rules", "House rules", {
    blocks: property.rules.map((item) => ({
      id: item.label,
      type: "custom",
      title: item.label,
      body: item.value,
    })),
  }),
  section("nearby", "Nearby Areas", "Nearby places", {
    blocks: property.nearby.map((item) => ({
      id: item.label,
      type: "custom",
      title: item.label,
      subtitle: item.type,
      body: item.distance,
    })),
  }),
  section("faqs", "FAQ", "Property questions"),
  section("cta", "CTA Section", "Schedule a visit", {
    buttonText: "Book Visit",
    buttonHref: "/contact",
  }),
];

const propertySeo = (property: Property): CmsSeo =>
  seo(
    `/properties/${property.slug}`,
    `${property.name} in ${property.location} | MyRoomiee PG`,
    `${property.occupancyType} in ${property.location}, Mumbai from Rs. ${property.priceFrom.toLocaleString("en-IN")}/month.`,
    property.image,
  );

const locationSeo = (data: PgLocationData): CmsSeo =>
  seo(
    `/${data.slug}`,
    `PG in ${data.area}, Mumbai | Boys & Girls PG | MyRoomiee`,
    data.subheadline,
    data.gallery[0]?.src,
  );

const createLocationPage = (data: LocationPageData): CmsLocationPage => ({
  slug: data.slug,
  pageType: data.pageType,
  mainArea: data.mainArea,
  mainAreaSlug: data.mainAreaSlug,
  parentSlug: data.parentSlug,
  parentArea: data.parentArea,
  childSlugs: data.childSlugs,
  subAreas: (data.serviceAreas ?? []).map((item) => item.name),
  data,
  sections: locationSections(data),
  seo: locationSeo(data),
  inheritance: data.inheritance,
  applyToAll: {
    enabled: false,
    scope: data.pageType,
    sourceSlug: data.parentSlug,
    fields: [],
  },
});

const createProperty = (property: Property): CmsProperty => ({
  ...property,
  hidden: false,
  seo: propertySeo(property),
  sections: propertySections(property),
});

const collectMedia = (
  locationPages: Record<string, CmsLocationPage>,
  cmsProperties: CmsProperty[],
): CmsMediaAsset[] => {
  const byUrl = new Map<string, CmsMediaAsset>();
  const add = (url: string | undefined, name: string, alt: string, usage: string) => {
    if (!url) return;
    const existing = byUrl.get(url);
    if (existing) {
      if (!existing.usage.includes(usage)) existing.usage.push(usage);
      return;
    }
    byUrl.set(url, {
      id: `media-${byUrl.size + 1}`,
      name,
      url,
      alt,
      usage: [usage],
      tags: [],
    });
  };

  cmsProperties.forEach((property) => {
    add(property.image, `${property.name} cover`, property.name, `property:${property.slug}`);
    property.gallery.forEach((url, index) =>
      add(url, `${property.name} gallery ${index + 1}`, property.name, `property:${property.slug}`),
    );
    add(property.manager.photo, `${property.manager.name} photo`, property.manager.name, "manager");
  });

  Object.values(locationPages).forEach((location) => {
    location.data.gallery.forEach((item) =>
      add(item.src, `${location.mainArea} ${item.alt}`, item.alt, `location:${location.slug}`),
    );
  });

  return [...byUrl.values()];
};

const commonCtaComponent = (primary = "Book Visit", primaryHref = "/contact") =>
  twinComponent("cta-group", "CTA Group", "cta-group", [
    twinCta("primary", "Primary CTA", primary, primaryHref, { icon: "ArrowRight" }),
    twinCta("secondary", "Secondary CTA", "WhatsApp", pgContact.whatsappHref, {
      icon: "WhatsApp",
    }),
    twinCta("phone", "Phone CTA", "Call Now", pgContact.phoneHref, { icon: "Phone" }),
  ]);

const cardListComponent = (id: string, name: string, items: string[]) =>
  twinComponent(
    id,
    name,
    "card-list",
    items.map((item, index) =>
      twinText(`item-${index + 1}`, `${name} ${index + 1}`, item, {
        sortOrder: index,
        applyKey: `${id}:item`,
      }),
    ),
  );

const globalFaqItems = [
  "Is brokerage really zero?|Yes - MyRoomiee charges zero brokerage. You pay only the refundable security deposit and monthly rent.",
  "Are rooms fully furnished?|Every room has a bed, mattress, wardrobe, AC and WiFi. Common areas include refrigerator, microwave, water purifier, gas connection and washing facilities.",
  "What is the security deposit?|Typically 1-2 months of rent. It's fully refundable at move-out after standard inspection.",
  "Do you have lock-in?|Most properties have a 3-month minimum stay. Specific terms are shared during your visit.",
  "What about food?|Most properties offer healthy breakfast and dinner. Some offer fully equipped community kitchens for self-cooking.",
  "Are visitors allowed?|Yes - visitors are allowed in common areas with prior intimation. Overnight stay policy varies by property.",
  "Do you have AC and non-AC options?|Both. You can filter by AC on the Properties page or just ask our team.",
  "What documents are required?|Government ID (Aadhaar/PAN), one passport photo, and a digital rental agreement signed in 5 minutes.",
  "Can I book online?|Yes - book a free visit online, finalize on-site, and pay securely via UPI/card/netbanking.",
  "Do you serve all of Mumbai?|We currently operate in prime Mumbai locations including Malad, Goregaon, Jogeshwari and nearby sub-areas.",
];

const createDigitalTwin = (
  locationPages: Record<string, CmsLocationPage>,
  cmsProperties: CmsProperty[],
  firstProperty?: Property,
): CmsDigitalTwin => {
  const heroImage = firstProperty?.image ?? "";
  const pages: CmsDigitalTwin["pages"] = {
    header: twinPage("header", "Header", "global:header", "global", [
      twinSection("header", "Header", [
        twinComponent("brand", "Brand", "brand", [
          twinText("logo", "Logo Text", "M"),
          twinText("name", "Brand Name", "MyRoomiee"),
          twinCta("home-link", "Home Link", "Home", "/"),
        ]),
        twinComponent("navigation", "Navigation", "navigation", [
          twinCta("home", "Home Link", "Home", "/"),
          twinCta("properties", "Properties Link", "Properties", "/properties"),
          twinCta("locations", "Locations Link", "Locations", "/locations"),
          twinCta("about", "About Link", "About", "/about"),
          twinCta("faq", "FAQ Link", "FAQ", "/faq"),
          twinCta("contact", "Contact Link", "Contact", "/contact"),
        ]),
        commonCtaComponent("Book Visit", "/contact"),
      ]),
    ]),
    footer: twinPage("footer", "Footer", "global:footer", "global", [
      twinSection("footer", "Footer", [
        twinComponent("brand", "Brand", "brand", [
          twinText("name", "Brand Name", "MyRoomiee"),
          twinText(
            "description",
            "Description",
            "Premium PG accommodation and furnished PG rooms across Mumbai. Zero brokerage, premium service, ready-to-move rooms.",
          ),
        ]),
        cardListComponent("company-links", "Company Links", [
          "About Us|/about",
          "Contact|/contact",
          "FAQ|/faq",
          "Locations|/locations",
        ]),
        cardListComponent("top-locations", "Top PG Locations", [
          "PG in Malad East|/pg-in-malad-east",
          "PG in Goregaon East|/pg-in-goregaon-east",
          "PG in Jogeshwari East|/pg-in-jogeshwari-east",
        ]),
        cardListComponent("legal-links", "Legal Links", [
          "Privacy Policy|/privacy",
          "Terms & Conditions|/terms",
        ]),
        twinComponent("contact", "Reach Us", "contact", [
          twinText("address", "Address", pgContact.address, { icon: "MapPin" }),
          twinCta("phone", "Phone", pgContact.phone, pgContact.phoneHref, { icon: "Phone" }),
          twinCta("email", "Email", pgContact.email, `mailto:${pgContact.email}`, { icon: "Mail" }),
        ]),
        twinComponent("bottom", "Bottom Bar", "text-group", [
          twinText("copyright", "Copyright", "MyRoomiee. All rights reserved."),
          twinText(
            "categories",
            "Categories",
            "Managed PG Accommodation - Premium PG Rooms - Mumbai",
          ),
        ]),
      ]),
    ]),
    floating: twinPage("floating", "Floating Components", "global:floating", "global", [
      twinSection("whatsapp", "WhatsApp FAB", [
        twinComponent("fab", "Floating WhatsApp Button", "cta", [
          twinCta("button", "WhatsApp Button", "WhatsApp MyRoomiee", pgContact.whatsappHref, {
            icon: "WhatsApp",
          }),
          twinText("message", "Prefilled Message", "Hi MyRoomiee, I'm looking for a PG in Mumbai"),
        ]),
      ]),
    ]),
    home: twinPage("home", "Home", "/", "home", [
      twinSection("hero", "Hero", [
        twinComponent("badge", "Badge", "badge", [
          twinText("text", "Badge Text", "Trusted by 1,200+ residents across Mumbai", {
            icon: "ShieldCheck",
          }),
        ]),
        twinComponent("heading", "Heading", "heading", [
          twinText("prefix", "Heading Prefix", "Premium Boys & Girls"),
          twinText("highlight", "Highlight Text", "PG Accommodation"),
          twinText("suffix", "Heading Suffix", "in Mumbai"),
        ]),
        twinComponent("description", "Description", "text", [
          twinText(
            "text",
            "Description",
            "Fully furnished AC rooms with WiFi, housekeeping, security and zero brokerage. Book a free visit today.",
          ),
        ]),
        commonCtaComponent("Book Visit", "/contact"),
        twinComponent("counters", "Counter Group", "counter-group", [
          twinMicro("residents", "Happy Residents", "counter", "12K+"),
          twinMicro("properties", "Properties", "counter", "180+"),
          twinMicro("rating", "Google Rating", "4.8"),
        ]),
        twinComponent("hero-image", "Hero Image", "image", [
          twinImage("image", "Hero Image", {
            src: heroImage,
            alt: "MyRoomiee room",
            caption: "Premium AC Rooms",
            badge: "Most loved",
            overlayText: "Premium AC Rooms",
          }),
        ]),
      ]),
      twinSection("search", "Search Bar", [
        twinComponent("fields", "Fields", "form", [
          twinText("location-label", "Location Label", "Location"),
          twinText("location-placeholder", "Location Placeholder", "Andheri, Powai, Bandra..."),
          twinText("budget-label", "Budget Label", "Budget"),
          twinText("budget-placeholder", "Budget Placeholder", "Up to Rs. 15,000"),
          twinText("sharing-label", "Sharing Label", "Sharing"),
          twinText("sharing-placeholder", "Sharing Placeholder", "Single, Double, Triple"),
          twinCta("submit", "Search CTA", "Search", "/properties", { icon: "Search" }),
        ]),
      ]),
      twinSection("featured-properties", "Featured Properties", [
        twinComponent("heading", "Section Heading", "heading", [
          twinText("eyebrow", "Eyebrow", "Featured"),
          twinText("title", "Title", "Premium properties handpicked for you"),
          twinText("sub", "Description", "Fully furnished and ready to move in across Mumbai."),
          twinCta("view-all", "View All CTA", "View all", "/properties"),
        ]),
      ]),
      twinSection("benefits", "Benefits", [
        cardListComponent("benefit-cards", "Benefit Cards", [
          "Zero Brokerage|Move in without paying brokerage.",
          "Managed Properties|Reviewed by the MyRoomiee team.",
          "Prime Locations|Walking distance from stations, offices and colleges.",
          "Professional Housekeeping|Daily cleaning and trained staff.",
          "Safe Living|24x7 CCTV and on-ground support.",
          "Fully Furnished|Bed, mattress, wardrobe, AC and Wi-Fi.",
        ]),
      ]),
      twinSection("cta", "Contact CTA", [
        twinComponent("content", "CTA Content", "cta-section", [
          twinText("heading", "Heading", "Ready to move in?"),
          twinText(
            "description",
            "Description",
            "Book a free visit today. Our team will help you pick the perfect property in your preferred Mumbai location.",
          ),
          twinCta("book", "Book Visit CTA", "Book Visit", "/contact"),
          twinCta("whatsapp", "WhatsApp CTA", "WhatsApp Now", pgContact.whatsappHref),
          twinCta("call", "Call CTA", `Call ${pgContact.phone}`, pgContact.phoneHref),
        ]),
      ]),
    ]),
    properties: twinPage("properties", "Properties", "/properties", "properties", [
      twinSection("hero", "Hero", [
        twinComponent("content", "Hero Content", "heading", [
          twinText("eyebrow", "Eyebrow", "Properties"),
          twinText("heading", "Heading", "Find your next home in Mumbai"),
          twinText(
            "description",
            "Description",
            "premium PG options. Zero brokerage. Move in same day.",
          ),
        ]),
      ]),
      twinSection("filters", "Filters", [
        twinComponent("labels", "Filter Labels", "form", [
          twinText("search", "Search Label", "Search"),
          twinText("search-placeholder", "Search Placeholder", "Location or property"),
          twinText("budget", "Budget Label", "Budget"),
          twinText("sharing", "Sharing Label", "Sharing"),
          twinText("for", "For Label", "For"),
          twinText("ac", "AC Checkbox Label", "AC rooms only"),
        ]),
      ]),
      twinSection("cta", "CTA", [
        twinComponent("content", "CTA Content", "cta-section", [
          twinText("heading", "Heading", "Can't decide? Talk to us."),
          twinText(
            "description",
            "Description",
            "Our property managers will help you shortlist 2-3 best fits in under 10 minutes.",
          ),
        ]),
        commonCtaComponent("Book Visit", "/contact"),
      ]),
    ]),
    "property-detail": twinPage(
      "property-detail",
      "Property Detail",
      "/properties/:slug",
      "property-detail",
      [
        twinSection("global-labels", "Property Detail Labels", [
          twinComponent("labels", "Labels", "text-group", [
            twinText("back", "Back Link", "Back to properties"),
            twinText("starting-from", "Starting From", "Starting from"),
            twinText("month", "Month Suffix", "/month onwards"),
            twinText("similar", "Similar Heading", "Similar properties"),
            twinCta("book", "Book Visit CTA", "Book Visit", "/contact"),
            twinText("send", "Send Inquiry CTA", "Send Inquiry"),
            twinCta("whatsapp", "WhatsApp CTA", "WhatsApp", pgContact.whatsappHref),
            twinCta("call", "Call CTA", "Call", pgContact.phoneHref),
          ]),
        ]),
      ],
    ),
    locations: twinPage("locations", "Locations", "/locations", "locations", [
      twinSection("hero", "Hero", [
        twinComponent("content", "Hero Content", "heading", [
          twinText("eyebrow", "Eyebrow", "Locations"),
          twinText(
            "heading",
            "Heading",
            "PG and premium PG service areas around Malad, Goregaon and Jogeshwari",
          ),
          twinText(
            "description",
            "Description",
            "Browse only the areas where MyRoomiee actively serves residents.",
          ),
        ]),
      ]),
      twinSection("cards", "Location Cards", [
        cardListComponent("main-areas", "Main Areas", [
          "Malad East|/pg-in-malad-east",
          "Malad West|/pg-in-malad-west",
          "Goregaon East|/pg-in-goregaon-east",
          "Goregaon West|/pg-in-goregaon-west",
          "Jogeshwari East|/pg-in-jogeshwari-east",
          "Jogeshwari West|/pg-in-jogeshwari-west",
        ]),
      ]),
    ]),
    about: twinPage("about", "About", "/about", "about", [
      twinSection("hero", "Hero", [
        twinComponent("content", "Hero Content", "heading", [
          twinText("eyebrow", "Eyebrow", "About Us"),
          twinText("heading", "Heading", "Reimagining rented living in Mumbai"),
          twinText(
            "description",
            "Description",
            "MyRoomiee is a managed accommodation brand operating premium PG rooms across Malad, Goregaon and Jogeshwari.",
          ),
        ]),
      ]),
      twinSection("story", "Story", [
        twinComponent("content", "Story Content", "image-text", [
          twinImage("image", "Story Image", { src: heroImage, alt: "MyRoomiee premium PG lounge" }),
          twinText("heading", "Heading", "Our story"),
          twinText(
            "paragraph-1",
            "Paragraph 1",
            "We started MyRoomiee after experiencing the friction of finding a clean, safe and reasonably priced PG in Mumbai.",
          ),
          twinText(
            "paragraph-2",
            "Paragraph 2",
            "Today MyRoomiee houses 12,000+ residents across the city, with a 4.8 rating on Google and 95% renewal rate.",
          ),
        ]),
      ]),
      twinSection("cta", "CTA", [commonCtaComponent("Book Visit", "/contact")]),
    ]),
    contact: twinPage("contact", "Contact", "/contact", "contact", [
      twinSection("hero", "Hero", [
        twinComponent("content", "Hero Content", "heading", [
          twinText("eyebrow", "Eyebrow", "Contact"),
          twinText("heading", "Heading", "Book a free property visit"),
          twinText("description", "Description", "Tell us your preferred location and budget."),
        ]),
      ]),
      twinSection("form", "Form", [
        twinComponent("fields", "Fields", "form", [
          twinText("name", "Name Label", "Name"),
          twinText("phone", "Phone Label", "Phone"),
          twinText("location", "Preferred Location Label", "Preferred Location"),
          twinText("message", "Message Label", "Message"),
          twinCta("submit", "Submit CTA", "Send Enquiry", "#"),
        ]),
      ]),
    ]),
    faqs: twinPage("faqs", "FAQ", "/faq", "faqs", [
      twinSection("faqs", "FAQs", [
        twinComponent("content", "FAQ Header", "heading", [
          twinText("eyebrow", "Eyebrow", "FAQ"),
          twinText("heading", "Heading", "Frequently asked questions"),
        ]),
        twinComponent(
          "items",
          "FAQ Items",
          "faq-list",
          globalFaqItems.map((item, index) =>
            twinText(`faq-${index + 1}`, `FAQ ${index + 1}`, item, {
              sortOrder: index,
              applyKey: "global-faq",
            }),
          ),
        ),
      ]),
    ]),
    privacy: twinPage("privacy", "Privacy", "/privacy", "legal", [
      twinSection("article", "Article", [
        twinComponent("content", "Legal Content", "legal", [
          twinText("heading", "Heading", "Privacy Policy"),
          twinText("updated", "Last Updated", "Last Updated: May 28, 2026"),
        ]),
      ]),
    ]),
    terms: twinPage("terms", "Terms", "/terms", "legal", [
      twinSection("article", "Article", [
        twinComponent("content", "Legal Content", "legal", [
          twinText("heading", "Heading", "Terms & Conditions"),
          twinText("updated", "Last Updated", "Last Updated: May 28, 2026"),
        ]),
      ]),
    ]),
  };

  cmsProperties.forEach((property) => {
    pages[`property:${property.slug}`] = twinPage(
      `property:${property.slug}`,
      property.name,
      `/properties/${property.slug}`,
      "property-detail",
      [
        twinSection("property", "Property Data", [
          twinComponent("identity", "Identity", "property", [
            twinText("name", "Name", property.name),
            twinText("location", "Location", property.location),
            twinMicro("price", "Starting Rent", "counter", String(property.priceFrom)),
            twinText("availability", "Availability", property.availability),
            twinText("description", "Description", property.description),
          ]),
          twinComponent(
            "amenities",
            "Amenities",
            "tag-list",
            property.amenities.map((amenity, index) =>
              twinText(`amenity-${index + 1}`, amenity, amenity),
            ),
          ),
          twinComponent(
            "nearby",
            "Nearby Places",
            "card-list",
            property.nearby.map((place, index) =>
              twinText(
                `nearby-${index + 1}`,
                place.label,
                `${place.type}|${place.label}|${place.distance}`,
              ),
            ),
          ),
          twinComponent(
            "rules",
            "Rules",
            "card-list",
            property.rules.map((rule, index) =>
              twinText(`rule-${index + 1}`, rule.label, `${rule.label}|${rule.value}`),
            ),
          ),
          twinComponent("manager", "Manager", "person", [
            twinText("name", "Manager Name", property.manager.name),
            twinText("role", "Manager Role", property.manager.role),
            twinCta(
              "phone",
              "Manager Phone",
              property.manager.phone,
              `tel:${property.manager.phone}`,
            ),
            twinImage("photo", "Manager Photo", {
              src: property.manager.photo,
              alt: property.manager.name,
            }),
          ]),
        ]),
      ],
    );
  });

  Object.values(locationPages).forEach((location) => {
    const pageId = `location:${location.slug}`;
    pages[pageId] = twinPage(
      pageId,
      location.data.area,
      `/${location.slug}`,
      location.pageType === "sub-area" ? "sub-area" : "main-area",
      [
        twinSection("hero", "Hero", [
          twinComponent("content", "Hero Content", "heading", [
            twinText(
              "badge",
              "Badge",
              `Managed PG - ${location.data.area} - ${location.data.city}`,
              {
                inheritedFrom: location.parentSlug ? `location:${location.parentSlug}` : undefined,
              },
            ),
            twinText("headline", "Headline", location.data.headline),
            twinText("subheadline", "Subheadline", location.data.subheadline),
            twinCta("book", "Book Visit CTA", `Book Visit in ${location.data.area}`, "/contact"),
            twinCta("whatsapp", "WhatsApp CTA", "WhatsApp", pgContact.whatsappHref),
            twinCta("call", "Call CTA", "Call Now", pgContact.phoneHref),
          ]),
          twinComponent("counters", "Counters", "counter-group", [
            twinMicro("rating", "Google Rating", "counter", String(location.data.googleRating)),
            twinMicro("properties", "Properties", "counter", String(location.data.propertyCount)),
            twinMicro("residents", "Residents", "counter", String(location.data.residentCount)),
            twinMicro("rent", "Starting Rent", "counter", String(location.data.startingRent)),
          ]),
        ]),
        twinSection("rooms", "Room Cards", [
          twinComponent(
            "boys",
            "Boys Rooms",
            "card-list",
            location.data.boys.map((room, index) =>
              twinText(
                `boys-${index + 1}`,
                room.type,
                `${room.type}|${room.sharing}|${room.priceFrom}|${room.available}`,
              ),
            ),
          ),
          twinComponent(
            "girls",
            "Girls Rooms",
            "card-list",
            location.data.girls.map((room, index) =>
              twinText(
                `girls-${index + 1}`,
                room.type,
                `${room.type}|${room.sharing}|${room.priceFrom}|${room.available}`,
              ),
            ),
          ),
        ]),
        twinSection("gallery", "Gallery", [
          twinComponent(
            "images",
            "Gallery Images",
            "gallery",
            location.data.gallery.map((image, index) =>
              twinImage(`image-${index + 1}`, image.alt, {
                src: image.src,
                alt: image.alt,
                caption: image.alt,
              }),
            ),
          ),
        ]),
        twinSection("content", "Content", [
          twinComponent(
            "why-stay",
            "Why Stay",
            "list",
            location.data.whyStay.map((item, index) =>
              twinText(`point-${index + 1}`, `Point ${index + 1}`, item),
            ),
          ),
          twinComponent(
            "landmarks",
            "Landmarks",
            "card-list",
            location.data.landmarks.map((item, index) =>
              twinText(
                `landmark-${index + 1}`,
                item.name,
                `${item.type}|${item.name}|${item.distanceKm}|${item.minutes}`,
              ),
            ),
          ),
          twinComponent(
            "reviews",
            "Reviews",
            "testimonial-list",
            location.data.testimonials.map((item, index) =>
              twinText(
                `review-${index + 1}`,
                item.name,
                `${item.name}|${item.role}|${item.text}|${item.rating}`,
              ),
            ),
          ),
          twinComponent(
            "faqs",
            "FAQs",
            "faq-list",
            location.data.faqs.map((item, index) =>
              twinText(`faq-${index + 1}`, item.q, `${item.q}|${item.a}`),
            ),
          ),
        ]),
        twinSection("cta", "Final CTA", [
          twinComponent("content", "CTA Content", "cta-section", [
            twinText("heading", "Heading", `Looking for the best PG in ${location.data.area}?`),
            twinText(
              "description",
              "Description",
              `Book a free visit today. Our ${location.data.area} property manager will walk you through available rooms and amenities.`,
            ),
            twinCta("book", "Book Visit CTA", `Book ${location.data.area} Visit`, "/contact"),
            twinCta("whatsapp", "WhatsApp CTA", "WhatsApp Now", pgContact.whatsappHref),
            twinCta("call", "Call CTA", pgContact.phone, pgContact.phoneHref),
            twinText("address", "Address", pgContact.address, { icon: "MapPin" }),
          ]),
        ]),
      ],
      {
        parentId: location.parentSlug ? `location:${location.parentSlug}` : undefined,
        inheritedFrom: location.parentSlug ? `location:${location.parentSlug}` : undefined,
      },
    );
  });

  return { pages };
};

export const createDefaultCmsSnapshot = (): CmsSnapshot => {
  const cmsProperties = properties.map(createProperty);
  const locationPages = Object.fromEntries(
    Object.values(universalLocationPages).map((data) => [data.slug, createLocationPage(data)]),
  );
  const firstProperty = properties[0];

  return {
    version: CMS_VERSION,
    updatedAt: DEFAULT_CMS_UPDATED_AT,
    pages: {
      home: page(
        "home",
        "Home",
        "/",
        "home",
        homeSections(firstProperty),
        seo(
          "/",
          "MyRoomiee | Premium PG Accommodation in Mumbai",
          "Find managed PG and managed PG homes in Mumbai with furnished rooms, meals, housekeeping and quick visits.",
          firstProperty?.image,
        ),
      ),
      locations: page(
        "locations",
        "Locations",
        "/locations",
        "locations",
        [
          section("hero", "Hero Section", "MyRoomiee PG Locations in Mumbai"),
          section("main-areas", "Main Areas", "Six primary service locations"),
          section("nearby-areas", "Nearby Areas", "Sub areas covered by MyRoomiee"),
          section("cta", "CTA Section", "Need help finding the right area?", {
            buttonText: "Talk to us",
            buttonHref: "/contact",
          }),
        ],
        seo(
          "/locations",
          "MyRoomiee PG Locations in Malad, Goregaon & Jogeshwari",
          "Explore MyRoomiee PG and premium PG service areas in Malad, Goregaon and Jogeshwari.",
        ),
      ),
      properties: page(
        "properties",
        "Properties",
        "/properties",
        "properties",
        [
          section("hero", "Hero Section", "Properties"),
          section("filters", "Property Filters", "Find your fit"),
          section("property-cards", "Property Cards", "Available properties"),
          section("cta", "CTA Section", "Need help shortlisting?", {
            buttonText: "Contact us",
            buttonHref: "/contact",
          }),
        ],
        seo(
          "/properties",
          "Premium PG Accommodation in Mumbai | MyRoomiee",
          "Browse furnished PG, managed PG accommodation in Mumbai.",
          firstProperty?.image,
        ),
      ),
      about: page(
        "about",
        "About",
        "/about",
        "about",
        [
          section("hero", "Hero Section", "About MyRoomiee"),
          section("story", "Introduction Section", "Our story"),
          section("benefits", "Benefits Section", "What we manage"),
          section("cta", "CTA Section", "Find your room"),
        ],
        seo("/about", "About MyRoomiee", "Learn about MyRoomiee managed PG and managed PG homes."),
      ),
      faqs: page(
        "faqs",
        "FAQs",
        "/faq",
        "faqs",
        [section("faqs", "FAQs Section", "Frequently asked questions")],
        seo("/faq", "MyRoomiee FAQs", "Answers about MyRoomiee PG bookings, rent and visits."),
      ),
      contact: page(
        "contact",
        "Contact",
        "/contact",
        "contact",
        [
          section("hero", "Hero Section", "Contact MyRoomiee"),
          section("form", "Contact Section", "Send an enquiry"),
          section("map", "Map Section", "Find us"),
        ],
        seo("/contact", "Contact MyRoomiee", "Contact MyRoomiee for PG and PG visits."),
      ),
      privacy: page(
        "privacy",
        "Privacy",
        "/privacy",
        "legal",
        [section("article", "Privacy Article", "Privacy Policy")],
        seo("/privacy", "Privacy Policy | MyRoomiee", "Read the MyRoomiee privacy policy."),
      ),
      terms: page(
        "terms",
        "Terms",
        "/terms",
        "legal",
        [section("article", "Terms Article", "Terms & Conditions")],
        seo("/terms", "Terms & Conditions | MyRoomiee", "Read the MyRoomiee terms and conditions."),
      ),
      footer: page(
        "footer",
        "Footer",
        "global:footer",
        "global",
        [section("footer", "Footer Section", "MyRoomiee")],
        seo("/", "MyRoomiee", "MyRoomiee global footer settings."),
      ),
    },
    locationPages,
    properties: cmsProperties,
    media: collectMedia(locationPages, cmsProperties),
    leads: [],
    settings: {
      brandName: "MyRoomiee",
      phone: pgContact.phone,
      logoText: "M",
      phoneHref: pgContact.phoneHref,
      whatsappHref: pgContact.whatsappHref,
      primaryCtaText: "Book Visit",
      secondaryCtaText: "WhatsApp",
      footerNote: "Managed PG and managed PG homes across Mumbai.",
      email: pgContact.email,
      address: pgContact.address,
      copyrightText: "MyRoomiee. All rights reserved.",
      categoriesText: "Managed PG Accommodation - Premium PG Rooms - Mumbai",
    },
    digitalTwin: createDigitalTwin(locationPages, cmsProperties, firstProperty),
  };
};
