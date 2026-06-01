import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShieldCheck, Users, Building2, Heart } from "lucide-react";
import lounge from "@/assets/room-lounge.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MyRoomiee — Managed PG & Coliving in Mumbai" },
      { name: "description", content: "MyRoomiee is a managed accommodation brand operating premium PG and coliving spaces across 42 Mumbai locations." },
      { property: "og:title", content: "About MyRoomiee" },
      { property: "og:description", content: "Managed PG and coliving spaces across Mumbai." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">About Us</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Reimagining rented living in Mumbai</h1>
          <p className="mt-4 text-muted-foreground">MyRoomiee is a managed accommodation brand operating premium PG, coliving and furnished apartments across 42 prime Mumbai locations.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <img src={lounge} alt="" className="rounded-[2rem] border border-border shadow-lift" />
        <div>
          <h2 className="font-display text-3xl font-bold">Our story</h2>
          <p className="mt-4 text-muted-foreground">We started MyRoomiee after experiencing the friction of finding a clean, safe and reasonably priced PG in Mumbai. Brokers, deposits, hidden charges, unclear policies — it was a mess. We set out to build the opposite: transparent pricing, verified properties, and a team that genuinely cares.</p>
          <p className="mt-3 text-muted-foreground">Today MyRoomiee houses 12,000+ residents across the city, with a 4.8★ rating on Google and 95% renewal rate. We're proud of what we've built — but we're just getting started.</p>
        </div>
      </section>

      <section className="bg-[color:var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-center font-display text-3xl font-bold">What we stand for</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Transparent", d: "No hidden fees. Ever." },
              { icon: Users, t: "Community", d: "Curated coliving with great neighbours." },
              { icon: Building2, t: "Premium", d: "Hotel-grade hygiene and amenities." },
              { icon: Heart, t: "Care", d: "A team that picks up the phone." },
            ].map((v) => (
              <div key={v.t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]"><v.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Want to see a property?</h2>
        <p className="mt-3 text-muted-foreground">Visits are free, and we'll take you through 2–3 best fits for your budget and location.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">Book Visit</Link>
          <Link to="/properties" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Explore Properties</Link>
        </div>
      </section>
    </SiteLayout>
  );
}