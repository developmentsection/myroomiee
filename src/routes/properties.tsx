import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { properties } from "@/lib/properties";
import { Search } from "lucide-react";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "PG & PG properties in Mumbai — MyRoomiee" },
      { name: "description", content: "Browse verified fully furnished PG, managed PG accommodation in Mumbai. Filter by location, budget and sharing." },
      { property: "og:title", content: "Properties — MyRoomiee" },
      { property: "og:description", content: "Browse verified PG and PG properties across Mumbai." },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

const sharingOptions = ["Any", "Single", "Double", "Triple"];
const genderOptions = ["Any", "Boys", "Girls", "Family"] as const;
const detailSlugBySharing: Record<string, string> = {
  Any: "double-sharing-room",
  Single: "single-ac-room",
  Double: "double-sharing-room",
  Triple: "triple-sharing-room",
};

function PropertiesPage() {
  const locationState = useLocation();
  const [q, setQ] = useState("");
  const [budget, setBudget] = useState(20000);
  const [sharing, setSharing] = useState("Any");
  const [gender, setGender] = useState<(typeof genderOptions)[number]>("Any");
  const [ac, setAc] = useState(false);

  const filtered = useMemo(() =>
    properties.filter((p) => {
      if (q && !`${p.name} ${p.location}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (p.priceFrom > budget) return false;
      if (sharing !== "Any" && !p.sharing.includes(sharing)) return false;
      if (ac && !p.ac) return false;
      if (gender === "Boys" && !(p.gender === "boys" || p.gender === "any")) return false;
      if (gender === "Girls" && !(p.gender === "girls" || p.gender === "any")) return false;
      if (gender === "Family" && p.gender !== "any") return false;
      return true;
    }), [q, budget, sharing, gender, ac]);

  if (locationState.pathname !== "/properties") {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Properties</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">Find your next home in Mumbai</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{properties.length}+ verified properties. Zero brokerage. Move in same day.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft h-fit lg:sticky lg:top-24">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Location or property" className="w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span>Budget</span><span className="text-[color:var(--brand)]">₹{budget.toLocaleString("en-IN")}</span>
              </label>
              <input type="range" min={5000} max={25000} step={500} value={budget} onChange={(e) => setBudget(+e.target.value)} className="mt-3 w-full accent-[color:var(--brand)]" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sharing</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {sharingOptions.map((s) => (
                  <button key={s} onClick={() => setSharing(s)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${sharing === s ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]" : "border-border bg-background hover:bg-accent"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">For</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {genderOptions.map((g) => (
                  <button key={g} onClick={() => setGender(g)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${gender === g ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]" : "border-border bg-background hover:bg-accent"}`}>{g}</button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 rounded-xl bg-[color:var(--surface)] px-3 py-2.5">
              <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} className="h-4 w-4 accent-[color:var(--brand)]" />
              <span className="text-sm font-medium">AC rooms only</span>
            </label>
          </aside>

          <div>
            <p className="mb-5 text-sm text-muted-foreground">{filtered.length} properties match your filters</p>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">No properties match. Try widening your filters.</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((p) => <PropertyCard key={p.slug} p={p} detailSlug={detailSlugBySharing[sharing]} />)}
              </div>
            )}
            <div className="mt-10 rounded-3xl gradient-brand p-8 text-white">
              <h3 className="font-display text-2xl font-bold">Can't decide? Talk to us.</h3>
              <p className="mt-2 max-w-md text-sm text-white/85">Our property managers will help you shortlist 2–3 best fits in under 10 minutes.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/contact" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand)]">Book Visit</Link>
                <a href="https://wa.me/918879779777" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold">WhatsApp Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

