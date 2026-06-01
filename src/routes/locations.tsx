import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { mumbaiLocations } from "@/lib/properties";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations We Serve — MyRoomiee PG Mumbai" },
      { name: "description", content: "MyRoomiee operates premium PG and coliving in 42 Mumbai locations — Andheri, Bandra, Powai, Thane, Lower Parel and more." },
      { property: "og:title", content: "Locations — MyRoomiee" },
      { property: "og:description", content: "Premium PG across 42 Mumbai locations." },
    ],
    links: [{ rel: "canonical", href: "/locations" }],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  const regions = Array.from(new Set(mumbaiLocations.map((l) => l.region)));
  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Locations</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">PGs in 42 prime Mumbai neighbourhoods</h1>
          <p className="mt-4 text-muted-foreground">Find premium MyRoomiee accommodation near your workplace or college.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        {regions.map((r) => (
          <div key={r} className="mb-12">
            <h2 className="font-display text-2xl font-bold">{r} Mumbai</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {mumbaiLocations.filter((l) => l.region === r).map((l) => (
                <Link key={l.slug} to="/locations/$slug" params={{ slug: l.slug }} className="group flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:shadow-lift">
                  <MapPin className="h-3.5 w-3.5 text-[color:var(--brand)]" /> {l.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}