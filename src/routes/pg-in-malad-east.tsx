import { createFileRoute } from "@tanstack/react-router";
import { PgLocationPage } from "@/components/site/PgLocationPage";
import { pgLocations } from "@/lib/pg-locations";
import { buildLocationHead } from "@/lib/pg-location-head";

const data = pgLocations["pg-in-malad-east"];

export const Route = createFileRoute("/pg-in-malad-east")({
  head: () => buildLocationHead(data),
  component: () => <PgLocationPage data={data} />,
});
