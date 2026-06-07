import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cmsPageHead } from "@/lib/cms/head";
import { twinValue } from "@/lib/cms/digital-twin";
import { useCmsTwinPage } from "@/lib/cms/store";
import { locationSlugFromArea, pgServiceAreaGroups } from "@/lib/pg-locations";

const BASE_URL = "https://myroomiee.com";

type ServiceSection = {
  title: string;
  subtitle: string;
  href: string;
  areas: string[];
};

const serviceLocations: ServiceSection[] = pgServiceAreaGroups.map((group) => ({
  title: group.title,
  subtitle: "Sub Areas",
  href: group.href,
  areas: group.areas,
}));

export const Route = createFileRoute("/locations")({
  head: () => {
    const title = "MyRoomiee PG Locations in Malad, Goregaon & Jogeshwari";
    const description =
      "Explore MyRoomiee premium PG service areas in Malad East, Malad West, Goregaon East, Goregaon West, Jogeshwari East and Jogeshwari West.";
    const head = cmsPageHead("locations", {
      title,
      description,
      canonical: `${BASE_URL}/locations`,
    });

    return {
      ...head,
      meta: [
        ...head.meta,
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${BASE_URL}/locations` },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
              {
                "@type": "ListItem",
                position: 2,
                name: "Locations",
                item: `${BASE_URL}/locations`,
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MyRoomiee service locations",
            itemListElement: serviceLocations.map((section, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${BASE_URL}${section.href}`,
              name: `PG in ${section.title}`,
            })),
          }),
        },
      ],
    };
  },
  component: LocationsPage,
});

function LocationsPage() {
  const twin = useCmsTwinPage("locations");
  const uniqueServiceLocations = useMemo(() => dedupeServiceAreas(serviceLocations), []);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              {twinValue(twin, "hero", "content", "eyebrow", "Locations")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              {twinValue(
                twin,
                "hero",
                "content",
                "heading",
                "Premium PG Service Areas Around Malad, Goregaon and Jogeshwari",
              )}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              {twinValue(
                twin,
                "hero",
                "content",
                "description",
                "Browse only the areas where MyRoomiee actively serves residents. Each card lists unique sub-areas under its parent location.",
              )}
            </p>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {uniqueServiceLocations.map((section) => (
              <a
                key={section.title}
                href={section.href}
                className="group rounded-2xl border border-border bg-white p-4 shadow-soft transition hover:scale-[1.03] hover:border-[color:var(--brand)] hover:bg-[color:var(--brand-soft)] hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Main Area
                    </p>
                    <h2 className="mt-1 font-display text-xl font-bold">{section.title}</h2>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--brand)] text-white">
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-18">
        <div className="space-y-8">
          {uniqueServiceLocations.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: sectionIndex * 0.03 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-7"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
                    {section.subtitle}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{section.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {section.areas.length} unique sub-areas linked to {section.title}.
                  </p>
                </div>
                <a
                  href={section.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-[1.03] hover:shadow-lift"
                >
                  View PG in {section.title}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {section.areas.map((area, areaIndex) => (
                  <motion.a
                    key={area}
                    href={`/${locationSlugFromArea(area)}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, delay: Math.min(areaIndex * 0.01, 0.12) }}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft transition hover:border-[color:var(--brand)] hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-offset-2"
                    aria-label={`View PG options near ${area} in ${section.title}`}
                  >
                    <MapPin className="h-4 w-4 text-[color:var(--brand)]" />
                    {area}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function dedupeServiceAreas(sections: ServiceSection[]): ServiceSection[] {
  const seen = new Set<string>();

  return sections.map((section) => ({
    ...section,
    areas: section.areas.filter((area) => {
      const key = area
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }),
  }));
}
