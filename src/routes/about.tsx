import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Heart, ShieldCheck, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cmsPageHead } from "@/lib/cms/head";
import { twinHref, twinValue } from "@/lib/cms/digital-twin";
import { useCmsTwinPage } from "@/lib/cms/store";
import lounge from "@/assets/room-lounge.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    cmsPageHead("about", {
      title: "About MyRoomiee - Managed Premium PG Accommodation in Mumbai",
      description:
        "MyRoomiee is a managed accommodation brand operating premium PG rooms across Mumbai.",
      canonical: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const twin = useCmsTwinPage("about");
  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            {twinValue(twin, "hero", "content", "eyebrow", "About Us")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            {twinValue(twin, "hero", "content", "heading", "Reimagining rented living in Mumbai")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {twinValue(
              twin,
              "hero",
              "content",
              "description",
              "MyRoomiee is a managed accommodation brand operating premium PG rooms across Malad, Goregaon and Jogeshwari.",
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <img
          src={lounge}
          alt={twinValue(twin, "story", "content", "image", "MyRoomiee premium PG lounge")}
          className="rounded-[2rem] border border-border shadow-lift"
        />
        <div>
          <h2 className="font-display text-3xl font-bold">
            {twinValue(twin, "story", "content", "heading", "Our story")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {twinValue(
              twin,
              "story",
              "content",
              "paragraph-1",
              "We started MyRoomiee after experiencing the friction of finding a clean, safe and reasonably priced PG in Mumbai.",
            )}
          </p>
          <p className="mt-3 text-muted-foreground">
            {twinValue(
              twin,
              "story",
              "content",
              "paragraph-2",
              "Today MyRoomiee houses 12,000+ residents across the city, with a 4.8 rating on Google and 95% renewal rate.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-[color:var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-center font-display text-3xl font-bold">What we stand for</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Transparent", d: "No hidden fees. Ever." },
              {
                icon: Users,
                t: "Community",
                d: "Curated managed PG living with great neighbours.",
              },
              { icon: Building2, t: "Premium", d: "Hotel-grade hygiene and amenities." },
              { icon: Heart, t: "Care", d: "A team that picks up the phone." },
            ].map((v) => (
              <div key={v.t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Want to see a property?</h2>
        <p className="mt-3 text-muted-foreground">
          Visits are free, and we'll take you through 2-3 best fits for your budget and location.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={twinHref(twin, "cta", "cta-group", "primary", "/contact") as "/contact"}
            className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white"
          >
            {twinValue(twin, "cta", "cta-group", "primary", "Book Visit")}
          </Link>
          <Link
            to="/properties"
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent"
          >
            Explore Properties
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
