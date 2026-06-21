import { createFileRoute } from "@tanstack/react-router";
import { PgLocationPage } from "@/components/site/PgLocationPage";
import { pgLocations } from "@/lib/pg-locations";
import { buildLocationHead } from "@/lib/pg-location-head";

const data = pgLocations["pg-in-goregaon"];

export const Route = createFileRoute("/pg-in-goregaon")({
  head: () => buildLocationHead(data),
  component: () => <PgLocationPage data={data} />,
});