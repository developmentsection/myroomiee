import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { cmsPageHead } from "@/lib/cms/head";
import { twinHref, twinValue } from "@/lib/cms/digital-twin";
import { useCmsProperties, useCmsSettings, useCmsTwinPage } from "@/lib/cms/store";
import { Search } from "lucide-react";

export const Route = createFileRoute("/properties")({
  head: () =>
    cmsPageHead("properties", {
      title: "Premium PG Accommodation in Mumbai | MyRoomiee",
      description:
        "Browse premium fully furnished PG, managed PG accommodation in Mumbai. Filter by location, budget and sharing.",
      canonical: "/properties",
    }),
  component: PropertiesPage,
});

const sharingOptions = ["Any", "Single", "Double", "Triple"];
const genderOptions = ["Any", "Boys", "Girls", "Family"] as const;

function PropertiesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const cmsProperties = useCmsProperties();
  const settings = useCmsSettings();
  const twin = useCmsTwinPage("properties");
  const [q, setQ] = useState("");
  const [budget, setBudget] = useState(20000);
  const [sharing, setSharing] = useState("Any");
  const [gender, setGender] = useState<(typeof genderOptions)[number]>("Any");
  const [ac, setAc] = useState(false);

  const filtered = useMemo(
    () =>
      cmsProperties.filter((p) => {
        if (q && !`${p.name} ${p.location}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (p.priceFrom > budget) return false;
        if (sharing !== "Any" && !p.sharing.includes(sharing)) return false;
        if (ac && !p.ac) return false;
        if (gender === "Boys" && !(p.gender === "boys" || p.gender === "any")) return false;
        if (gender === "Girls" && !(p.gender === "girls" || p.gender === "any")) return false;
        if (gender === "Family" && p.gender !== "any") return false;
        return true;
      }),
    [cmsProperties, q, budget, sharing, gender, ac],
  );

  if (pathname !== "/properties") {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            {twinValue(twin, "hero", "content", "eyebrow", "Properties")}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">
            {twinValue(twin, "hero", "content", "heading", "Find your next home in Mumbai")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {cmsProperties.length}+{" "}
            {twinValue(
              twin,
              "hero",
              "content",
              "description",
              "premium PG options. Zero brokerage. Move in same day.",
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft h-fit lg:sticky lg:top-24">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {twinValue(twin, "filters", "labels", "search", "Search")}
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={twinValue(
                    twin,
                    "filters",
                    "labels",
                    "search-placeholder",
                    "Location or property",
                  )}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span>{twinValue(twin, "filters", "labels", "budget", "Budget")}</span>
                <span className="text-[color:var(--brand)]">₹{budget.toLocaleString("en-IN")}</span>
              </label>
              <input
                type="range"
                min={5000}
                max={25000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(+e.target.value)}
                className="mt-3 w-full accent-[color:var(--brand)]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {twinValue(twin, "filters", "labels", "sharing", "Sharing")}
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {sharingOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSharing(s)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium ${sharing === s ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]" : "border-border bg-background hover:bg-accent"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {twinValue(twin, "filters", "labels", "for", "For")}
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {genderOptions.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium ${gender === g ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]" : "border-border bg-background hover:bg-accent"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 rounded-xl bg-[color:var(--surface)] px-3 py-2.5">
              <input
                type="checkbox"
                checked={ac}
                onChange={(e) => setAc(e.target.checked)}
                className="h-4 w-4 accent-[color:var(--brand)]"
              />
              <span className="text-sm font-medium">
                {twinValue(twin, "filters", "labels", "ac", "AC rooms only")}
              </span>
            </label>
          </aside>

          <div>
            <p className="mb-5 text-sm text-muted-foreground">
              {filtered.length} properties match your filters
            </p>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
                No properties match. Try widening your filters.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((p) => (
                  <PropertyCard key={p.slug} p={p} />
                ))}
              </div>
            )}
            <div className="mt-10 rounded-3xl gradient-brand p-8 text-white">
              <h3 className="font-display text-2xl font-bold">
                {twinValue(twin, "cta", "content", "heading", "Can't decide? Talk to us.")}
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/85">
                {twinValue(
                  twin,
                  "cta",
                  "content",
                  "description",
                  "Our property managers will help you shortlist 2-3 best fits in under 10 minutes.",
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={twinHref(twin, "cta", "cta-group", "primary", "/contact") as "/contact"}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand)]"
                >
                  {twinValue(twin, "cta", "cta-group", "primary", settings.primaryCtaText)}
                </Link>
                <a
                  href={twinHref(twin, "cta", "cta-group", "secondary", settings.whatsappHref)}
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold"
                >
                  {twinValue(twin, "cta", "cta-group", "secondary", settings.secondaryCtaText)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
