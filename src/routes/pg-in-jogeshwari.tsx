import { createFileRoute } from "@tanstack/react-router";
import { PgLocationPage } from "@/components/site/PgLocationPage";
import { pgLocations } from "@/lib/pg-locations";
import { buildLocationHead } from "@/lib/pg-location-head";

const data = pgLocations["pg-in-jogeshwari"];

export const Route = createFileRoute("/pg-in-jogeshwari")({
  head: () => buildLocationHead(data),
  component: () => <PgLocationPage data={data} />,
});