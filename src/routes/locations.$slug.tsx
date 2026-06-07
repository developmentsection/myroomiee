import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveLocationPage } from "@/lib/pg-locations";

export const Route = createFileRoute("/locations/$slug")({
  beforeLoad: ({ params }) => {
    const targetSlug = `pg-in-${params.slug}`;

    if (resolveLocationPage(targetSlug)) {
      throw redirect({
        to: "/$slug",
        params: { slug: targetSlug },
        statusCode: 301,
      });
    }

    throw redirect({
      to: "/locations",
      statusCode: 301,
    });
  },
});
