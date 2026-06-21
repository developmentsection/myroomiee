import { resolveLocationPage, type LocationPageData, type PgLocationData } from "./pg-locations";
import { cmsLocationHead } from "./cms/head";

const BASE = "https://www.myroomiee.com";

export function buildLocationHead(d: PgLocationData | LocationPageData) {
  const url = `${BASE}/${d.slug}`;
  const title = `${d.headline} | MyRoomiee - ${d.area} PG from Rs. ${d.startingRent.toLocaleString("en-IN")}`;
  const description = `${d.subheadline} Boys and girls PG in ${d.area}, ${d.city}. ${d.propertyCount}+ verified properties, ${d.googleRating} star rated by ${d.googleReviews}+ residents.`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: `PG in ${d.area}, Boys PG in ${d.area}, Girls PG in ${d.area}, AC PG in ${d.area}, Furnished PG in ${d.area}, PG near ${d.area} Station, MyRoomiee ${d.area}` },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: `MyRoomiee - PG in ${d.area}`,
          description,
          url,
          telephone: "+91-8879779777",
          priceRange: `Rs. ${d.startingRent}-Rs. ${d.startingRent + 6000}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: d.area,
            addressLocality: d.city,
            addressRegion: "MH",
            postalCode: d.pincode,
            addressCountry: "IN",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: d.googleRating.toString(),
            reviewCount: d.googleReviews.toString(),
          },
          amenityFeature: ["AC", "WiFi", "CCTV", "Housekeeping", "RO Water", "Laundry"].map((n) => ({
            "@type": "LocationFeatureSpecification",
            name: n,
            value: true,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: d.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" },
            { "@type": "ListItem", position: 2, name: `PG in ${d.area}`, item: url },
          ],
        }),
      },
    ],
  };
}

export function resolveLocationSeo(slug: string) {
  const data = resolveLocationPage(slug);
  return data ? cmsLocationHead(data.slug, buildLocationHead(data)) : undefined;
}

