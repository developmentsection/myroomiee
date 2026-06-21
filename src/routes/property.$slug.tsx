import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { properties, resolvePropertyBySlug } from "@/lib/properties";
import { PropertyDetailView } from "@/routes/properties.$slug";
import { useCmsProperties } from "@/lib/cms/store";

const BASE_URL = "https://myroomiee.com";

export const Route = createFileRoute("/property/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  loader: ({ params }) => {
    const p = resolvePropertyBySlug(params.slug);
    return p ?? null;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonical = `${BASE_URL}/properties/${loaderData.slug}`;
    const title = `${loaderData.name} in ${loaderData.location} | MyRoomiee PG`;
    const description = `Fully furnished AC room in ${loaderData.location}, Mumbai from Rs. ${loaderData.priceFrom.toLocaleString("en-IN")}/month with WiFi, housekeeping, CCTV and zero brokerage.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: PropertyAlias,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Property not found</h1>
        <Link
          to="/properties"
          className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white"
        >
          Back to properties
        </Link>
      </div>
    </SiteLayout>
  ),
});

function PropertyAlias() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const fallbackProperty = Route.useLoaderData();
  const cmsProperties = useCmsProperties();
  const property = cmsProperties.find((item) => item.slug === slug) ?? fallbackProperty;
  if (!property) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Property not found</h1>
          <Link
            to="/properties"
            className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white"
          >
            Back to properties
          </Link>
        </div>
      </SiteLayout>
    );
  }
  return <PropertyDetailView p={property} routeSlug={slug} locationSlug={search.location} />;
}
