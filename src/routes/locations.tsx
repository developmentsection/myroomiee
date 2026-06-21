import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { locationPages, mainAreaSlugs } from "@/lib/pg-locations";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations We Serve - MyRoomiee PG Mumbai" },
      { name: "description", content: "Explore MyRoomiee PG rooms across Malad East, Malad West, Goregaon East, Goregaon West, Jogeshwari East, Jogeshwari West and nearby Mumbai subareas." },
      { property: "og:title", content: "Locations - MyRoomiee" },
      { property: "og:description", content: "Premium MyRoomiee PG rooms across Mumbai main areas and subareas." },
    ],
    links: [{ rel: "canonical", href: "/locations" }],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  const mainPages = mainAreaSlugs.map((slug) => locationPages[slug]).filter(Boolean);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Locations</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">PG locations across Mumbai</h1>
          <p className="mt-4 text-muted-foreground">
            Browse MyRoomiee PG rooms in main areas and nearby subareas. Every page is clickable and updated with MyRoomiee details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mainPages.map((main) => (
            <Link
              key={main.slug}
              to={`/${main.slug}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[color:var(--surface)]">
                <img src={main.gallery[0]?.src} alt={`PG in ${main.area}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand)]">
                  <MapPin className="h-3.5 w-3.5" /> Main Area
                </p>
                <h2 className="mt-2 font-display text-xl font-bold">{main.area}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{main.subheadline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand)]">
                  View PGs <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {mainPages.map((main) => (
        <section key={main.slug} className="border-t border-border/70 py-14">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Subareas</p>
                <h2 className="font-display text-2xl font-bold">PG near {main.area}</h2>
              </div>
              <Link to={`/${main.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand)]">
                Open {main.area} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(main.serviceAreas ?? []).map((area) => (
                <Link
                  key={area.href}
                  to={area.href}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:shadow-lift"
                >
                  <div>
                    <p className="text-sm font-semibold">{area.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{area.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </SiteLayout>
  );
}
