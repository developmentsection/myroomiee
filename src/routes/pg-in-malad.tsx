import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pg-in-malad")({
  beforeLoad: () => {
    throw redirect({
      to: "/pg-in-malad-east",
      statusCode: 301,
    });
  },
});
