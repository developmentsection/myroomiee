import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { properties, propertyImages } from "@/lib/properties";
import { MapPin, Train, Building2, Hospital, ShoppingBag, ShieldCheck, Phone, MessageCircle, Wifi, Snowflake, Camera, Sparkles, Droplet, ChefHat } from "lucide-react";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — MyRoomiee` },
      { name: "description", content: `Fully furnished ${loaderData.gender === "girls" ? "Girls" : loaderData.gender === "boys" ? "Boys" : "PG / Coliving"} accommodation in ${loaderData.location}, Mumbai. Starting from ₹${loaderData.priceFrom.toLocaleString("en-IN")}/month.` },
      { property: "og:title", content: `${loaderData.name} — MyRoomiee` },
      { property: "og:description", content: `Premium PG in ${loaderData.location} from ₹${loaderData.priceFrom.toLocaleString("en-IN")}/mo.` },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  component: PropertyDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Property not found</h1>
        <Link to="/properties" className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">Back to properties</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => <SiteLayout><div className="p-12 text-center">Something went wrong.</div></SiteLayout>,
});

const amenityList = [
  { icon: Snowflake, name: "AC" }, { icon: Wifi, name: "WiFi" }, { icon: Camera, name: "CCTV" },
  { icon: Sparkles, name: "Housekeeping" }, { icon: Droplet, name: "RO Water" }, { icon: ChefHat, name: "Meals" },
];

function PropertyDetail() {
  const p = Route.useLoaderData();
  const gallery = [p.image, propertyImages.lounge, propertyImages.kitchen, propertyImages.bath];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <Link to="/properties" className="text-sm text-muted-foreground hover:text-foreground">← Back to properties</Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {p.location}, Mumbai</div>
            <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">{p.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.verified && <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand)]"><ShieldCheck className="h-3.5 w-3.5" /> Verified</span>}
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">{p.gender === "any" ? "Boys + Girls" : p.gender === "boys" ? "Boys PG" : "Girls PG"}</span>
              {p.ac && <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">AC</span>}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <img src={gallery[0]} alt={p.name} className="h-[300px] w-full rounded-3xl object-cover md:col-span-2 md:row-span-2 md:h-full" />
          {gallery.slice(1).map((g, i) => (
            <img key={i} src={g} loading="lazy" alt="" className="hidden h-[148px] w-full rounded-2xl object-cover md:block" />
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-2xl font-bold">About this property</h2>
              <p className="mt-3 text-muted-foreground">A premium managed PG in {p.location} designed for working professionals and students. Fully furnished rooms, daily housekeeping, healthy meals and 24x7 security — everything you need to feel at home from day one.</p>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {amenityList.map((a) => (
                  <div key={a.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]"><a.icon className="h-5 w-5" /></span>
                    <span className="text-sm font-medium">{a.name}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold">Pricing</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {p.sharing.map((s: string, i: number) => (
                  <div key={s} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <p className="text-sm font-semibold">{s} Sharing</p>
                    <p className="mt-2 font-display text-2xl font-bold">₹{(p.priceFrom + i * 1500).toLocaleString("en-IN")}<span className="text-sm font-medium text-muted-foreground">/mo</span></p>
                    <p className="mt-1 text-xs text-muted-foreground">Includes meals, WiFi, housekeeping</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold">Nearby</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Train, label: `${p.station} Station`, dist: `${p.stationKm} km` },
                  { icon: Building2, label: "Reputed Colleges", dist: "Within 2 km" },
                  { icon: Hospital, label: "Multispeciality Hospitals", dist: "Within 1.5 km" },
                  { icon: ShoppingBag, label: "Malls & Markets", dist: "Within 1 km" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]"><n.icon className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-semibold">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.dist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold">Location</h2>
              <div className="mt-4 overflow-hidden rounded-3xl border border-border">
                <iframe title="Map" src={`https://www.google.com/maps?q=${encodeURIComponent(p.location + " Mumbai")}&output=embed`} className="h-[360px] w-full" loading="lazy" />
              </div>
            </section>
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-2xl font-bold">Send an inquiry</h2>
              <form className="mt-4 grid gap-3 md:grid-cols-2">
                <input className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Your name" />
                <input className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Phone number" />
                <input className="md:col-span-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Email (optional)" />
                <textarea rows={3} className="md:col-span-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="When would you like to visit?" />
                <button type="button" className="md:col-span-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft">Request callback</button>
              </form>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit space-y-3 rounded-3xl border border-border bg-card p-6 shadow-lift">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-display text-3xl font-bold">₹{p.priceFrom.toLocaleString("en-IN")}<span className="text-base font-medium text-muted-foreground">/month</span></p>
            <p className="text-xs text-muted-foreground">Refundable security deposit • Zero brokerage</p>
            <Link to="/contact" className="mt-3 block rounded-full gradient-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-soft">Book Free Visit</Link>
            <a href="https://wa.me/919999999999" className="block rounded-full border border-border px-5 py-3 text-center text-sm font-semibold hover:bg-accent"><MessageCircle className="-mt-0.5 mr-1 inline h-4 w-4 text-[#25D366]" /> WhatsApp</a>
            <a href="tel:+919999999999" className="block rounded-full border border-border px-5 py-3 text-center text-sm font-semibold hover:bg-accent"><Phone className="-mt-0.5 mr-1 inline h-4 w-4" /> Call Now</a>
            <div className="mt-2 rounded-2xl bg-[color:var(--surface)] p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Availability:</strong> Move-in available this week.
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}