import { createFileRoute, notFound } from "@tanstack/react-router";
import { PgLocationPage } from "@/components/site/PgLocationPage";
import { resolveLocationPage } from "@/lib/pg-locations";
import { resolveLocationSeo } from "@/lib/pg-location-head";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const data = resolveLocationPage(params.slug);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => resolveLocationSeo(loaderData.slug),
  component: LocationSlugPage,
});

function LocationSlugPage() {
  const data = Route.useLoaderData();
  return <PgLocationPage data={data} />;
}
