import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { mumbaiLocations, properties, type Property } from "@/lib/properties";
import { ArrowRight, MapPin, ShieldCheck, IndianRupee, Sparkles } from "lucide-react";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const loc = mumbaiLocations.find((l) => l.slug === params.slug);
    if (!loc) throw notFound();
    const related = properties.filter((p) => p.locationSlug === loc.slug);
    return { loc, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `PG Accommodation in ${loaderData.loc.name}, Mumbai - MyRoomiee` },
      { name: "description", content: `Premium fully furnished PG accommodation in ${loaderData.loc.name}, Mumbai. Zero brokerage, AC rooms, WiFi and housekeeping.` },
      { property: "og:title", content: `PG in ${loaderData.loc.name} — MyRoomiee` },
      { property: "og:description", content: `Verified PG in ${loaderData.loc.name}.` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/locations/${loaderData.loc.slug}` }] : [],
  }),
  component: LocationDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Location not found</h1>
        <Link to="/locations" className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">All locations</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => <SiteLayout><div className="p-12 text-center">Something went wrong.</div></SiteLayout>,
});

function LocationDetail() {
  const { loc, related } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]"><MapPin className="h-3.5 w-3.5" /> {loc.region} Mumbai</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">PG Accommodation in {loc.name}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">Premium fully furnished PG in {loc.name} with AC rooms, WiFi and housekeeping. Zero brokerage.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft">Book Visit in {loc.name}</Link>
            <a href="https://wa.me/918879779777" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">WhatsApp Now</a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Verified properties", d: `Every PG in ${loc.name} is physically inspected.` },
            { icon: IndianRupee, t: "Transparent pricing", d: "From ₹8,499/mo. Zero brokerage. No hidden charges." },
            { icon: Sparkles, t: "Premium amenities", d: "AC, WiFi, CCTV and housekeeping included." },
          ].map((b) => (
            <div key={b.t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]"><b.icon className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-lg font-semibold">{b.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold">{related.length > 0 ? `Properties in ${loc.name}` : `Properties near ${loc.name}`}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(related.length > 0 ? related : properties.slice(0, 3)).map((p: Property) => <PropertyCard key={p.slug} p={p} />)}
          </div>
        </div>
        <div className="mt-14 overflow-hidden rounded-3xl border border-border">
          <iframe title={`Map ${loc.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(loc.name + " Mumbai")}&output=embed`} className="h-[360px] w-full" loading="lazy" />
        </div>
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold">Other locations</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {mumbaiLocations.filter((l) => l.slug !== loc.slug).slice(0, 18).map((l) => (
              <Link key={l.slug} to="/locations/$slug" params={{ slug: l.slug }} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium hover:border-[color:var(--brand)]/40 transition">
                <span>{l.name}</span><ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[color:var(--brand)]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
