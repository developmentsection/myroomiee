import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Bus,
  CalendarCheck,
  Camera,
  Car,
  ChefHat,
  Clock,
  CheckCircle2,
  ChevronDown,
  Droplet,
  Expand,
  Flame,
  Home,
  Hospital,
  Landmark,
  MapPin,
  MessageCircle,
  Microwave,
  Phone,
  Plug,
  Refrigerator,
  Shield,
  Shirt,
  Sparkles,
  Train,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { properties, realisticAmenities, type Property } from "@/lib/properties";
import { resolveLocationPage, type PgLandmark } from "@/lib/pg-locations";
import { getCmsSnapshot, useCmsProperties, useCmsSettings, useCmsTwinPage } from "@/lib/cms/store";
import { twinHref, twinValue } from "@/lib/cms/digital-twin";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";

const BASE_URL = "https://myroomiee.com";

type PropertySearch = {
  location?: string;
};

export const Route = createFileRoute("/properties/$slug")({
  validateSearch: (search: Record<string, unknown>): PropertySearch => ({
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  loaderDeps: ({ search }) => ({ location: search.location }),
  loader: ({ params, deps }) => {
    const p = properties.find((x) => x.slug === params.slug);
    return createLocationAwareProperty(p ?? null, deps.location);
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const baseProperty = properties.find((item) => item.slug === loaderData.slug);
    const cmsProperty = getCmsSnapshot().properties.find((item) => item.slug === loaderData.slug);
    const hasLocationContext = Boolean(
      baseProperty && baseProperty.location !== loaderData.location,
    );
    const seo = hasLocationContext ? undefined : cmsProperty?.seo;
    const contextQuery =
      hasLocationContext && loaderData.locationSlug
        ? `?location=pg-in-${loaderData.locationSlug}`
        : "";
    const url = seo?.canonicalUrl || `${BASE_URL}/properties/${loaderData.slug}${contextQuery}`;
    const title = seo?.metaTitle || `${loaderData.name} in ${loaderData.location} | MyRoomiee PG`;
    const description =
      seo?.metaDescription ||
      `${loaderData.occupancyType} in ${loaderData.location}, Mumbai from Rs. ${loaderData.priceFrom.toLocaleString("en-IN")}/month with WiFi, meals, housekeeping, CCTV and zero brokerage.`;
    const ogImage = seo?.ogImage || loaderData.image;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(seo?.keywords ? [{ name: "keywords", content: seo.keywords }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        ...(seo?.robots ? [{ name: "robots", content: seo.robots }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: loaderData.name,
            description,
            image: loaderData.gallery,
            url,
            telephone: loaderData.manager.phone,
            priceRange: `Rs. ${loaderData.priceFrom}+`,
            address: {
              "@type": "PostalAddress",
              streetAddress: loaderData.location,
              addressLocality: "Mumbai",
              addressRegion: "MH",
              addressCountry: "IN",
            },
            amenityFeature: loaderData.amenities.map((name) => ({
              "@type": "LocationFeatureSpecification",
              name,
              value: true,
            })),
          }),
        },
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
                name: "Properties",
                item: `${BASE_URL}/properties`,
              },
              { "@type": "ListItem", position: 3, name: loaderData.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PropertyDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Property not found</h1>
        <Link
          to="/properties"
          className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white"
        >
          Back to properties
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="p-12 text-center">Something went wrong.</div>
    </SiteLayout>
  ),
});

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  AC: Sparkles,
  Laundry: Shirt,
  Meals: ChefHat,
  Housekeeping: Sparkles,
  Microwave,
  Refrigerator,
  Cupboard: Home,
  Parking: Car,
  Lift: Building2,
  Security: Shield,
  CCTV: Camera,
  "Water Purifier": Droplet,
  "Power Backup": Plug,
  "Gas Connection": Flame,
  "Modular Kitchen": ChefHat,
  "Washing Machine": Shirt,
  "24 Hour Water": Droplet,
  "24 Hour Electricity": Plug,
  Garden: Sparkles,
  "Rainwater Harvesting": Droplet,
};

const nearbyIcons: Record<Property["nearby"][number]["type"], typeof MapPin> = {
  "Metro Station": Train,
  Mall: Building2,
  "Railway Station": Train,
  "Bus Stop": Bus,
  Hospital,
  College: Landmark,
  "IT Park": Building2,
};

const houseRuleGroups: {
  title: string;
  icon: typeof Home;
  items: string[];
}[] = [
  {
    title: "Living Guidelines",
    icon: Home,
    items: [
      "Maintain cleanliness of room and common areas",
      "Respect fellow residents",
      "Avoid excessive noise",
      "Follow designated quiet hours",
      "Use shared amenities responsibly",
    ],
  },
  {
    title: "Visitor Policy",
    icon: Users,
    items: [
      "Visitors allowed only during approved hours",
      "Overnight guests not permitted",
      "Visitor entry subject to management approval",
    ],
  },
  {
    title: "Safety & Security",
    icon: Shield,
    items: [
      "Do not share access credentials",
      "Report maintenance issues promptly",
      "Follow emergency procedures",
      "CCTV monitored common areas",
    ],
  },
  {
    title: "Restricted Activities",
    icon: X,
    items: [
      "No smoking inside property",
      "No alcohol consumption in common areas",
      "No illegal activities",
      "No property damage",
    ],
  },
  {
    title: "Stay Terms",
    icon: CalendarCheck,
    items: ["Security deposit terms", "Notice period", "Lock-in period", "Refund policy summary"],
  },
];

function PropertyDetail() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const fallbackProperty = Route.useLoaderData();
  const cmsProperties = useCmsProperties();
  const baseProperty = cmsProperties.find((item) => item.slug === slug) ?? fallbackProperty;
  const property = useMemo(
    () => createLocationAwareProperty(baseProperty, search.location),
    [baseProperty, search.location],
  );
  if (!property) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Property not found</h1>
          <Link
            to="/properties"
            className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white"
          >
            Back to properties
          </Link>
        </div>
      </SiteLayout>
    );
  }
  return <PropertyDetailView p={property} />;
}

function createLocationAwareProperty(p: Property | null, locationSlug?: string): Property | null {
  if (!p || !locationSlug) return p;

  const location = resolveLocationPage(locationSlug);
  if (!location) return p;

  const roomName = p.occupancyType;
  const nearby = location.landmarks.slice(0, 6).map((landmark) => ({
    label: landmark.name,
    type: toNearbyType(landmark),
    distance: `${landmark.distanceKm} km`,
  }));

  return {
    ...p,
    name: `MyRoomiee ${location.area} ${roomName}`,
    location: location.area,
    locationSlug: location.slug.replace(/^pg-in-/, ""),
    station: location.station,
    stationKm: location.landmarks[0]?.distanceKm ?? p.stationKm,
    priceFrom: p.priceFrom,
    description: `${roomName} in ${location.area}, Mumbai with fully furnished rooms, WiFi, housekeeping, CCTV security, zero brokerage and quick access to ${location.mainArea}. This page reflects the area selected from the MyRoomiee locations page.`,
    nearby: nearby.length ? nearby : p.nearby,
  };
}

function toNearbyType(landmark: PgLandmark): Property["nearby"][number]["type"] {
  switch (landmark.type) {
    case "Station":
      return "Railway Station";
    case "Metro":
      return "Metro Station";
    case "Mall":
      return "Mall";
    case "College":
      return "College";
    case "Hospital":
      return "Hospital";
    case "Office":
      return "IT Park";
  }
}

export function PropertyDetailView({ p }: { p: Property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [inquiry, setInquiry] = useState({
    name: "",
    phone: "",
    visitDate: "",
    message: "",
  });
  const cmsProperties = useCmsProperties();
  const settings = useCmsSettings();
  const twin = useCmsTwinPage("property-detail");
  const similar = useMemo(
    () =>
      cmsProperties
        .filter(
          (item) =>
            item.slug !== p.slug &&
            (item.locationSlug === p.locationSlug ||
              item.gender === p.gender ||
              item.gender === "any"),
        )
        .slice(0, 4),
    [cmsProperties, p.gender, p.locationSlug, p.slug],
  );
  const displaySimilar =
    similar.length > 0 ? similar : cmsProperties.filter((item) => item.slug !== p.slug).slice(0, 4);
  const updateInquiry = (field: keyof typeof inquiry, value: string) =>
    setInquiry((current) => ({ ...current, [field]: value }));
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsApp(
      p.manager.whatsappHref,
      buildWhatsAppMessage("New MyRoomiee property enquiry", [
        { label: "Property", value: p.name },
        { label: "Location", value: `${p.location}, Mumbai` },
        { label: "Room type", value: p.occupancyType },
        { label: "Starting rent", value: `Rs. ${p.priceFrom.toLocaleString("en-IN")}/month` },
        { label: "Name", value: inquiry.name },
        { label: "Phone", value: inquiry.phone },
        { label: "Preferred visit date", value: inquiry.visitDate },
        { label: "Message", value: inquiry.message },
      ]),
    );
  };

  return (
    <SiteLayout>
      <main className="pb-20">
        <section className="bg-[color:var(--surface)]">
          <div className="mx-auto max-w-7xl px-5 py-6 md:py-10">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />{" "}
              {twinValue(twin, "global-labels", "labels", "back", "Back to properties")}
            </Link>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_390px]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
                  <div className="relative aspect-[1.14] md:aspect-[1.75]">
                    <img
                      src={p.gallery[activeImage]}
                      alt={`${p.name} gallery image ${activeImage + 1}`}
                      className="h-full w-full object-cover"
                      fetchPriority="high"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(activeImage)}
                      className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-bold text-foreground shadow-soft backdrop-blur transition hover:bg-white"
                      aria-label="Open fullscreen gallery"
                    >
                      <Expand className="h-4 w-4" /> Preview
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {p.gallery.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`aspect-[1.2] overflow-hidden rounded-2xl border transition ${activeImage === idx ? "border-[color:var(--brand)] ring-2 ring-[color:var(--brand-soft)]" : "border-border"}`}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-lift lg:sticky lg:top-24 lg:h-fit"
              >
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)]">
                  <MapPin className="h-4 w-4" /> {p.location}, Mumbai
                </p>
                <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                  {p.name}
                </h1>
                <div className="mt-5 flex items-end gap-2">
                  <span className="whitespace-nowrap font-display text-3xl font-bold sm:text-4xl">
                    Rs. {p.priceFrom.toLocaleString("en-IN")}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    {twinValue(twin, "global-labels", "labels", "month", "/month onwards")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Zero brokerage. Visit booking is free.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <InfoPill icon={BedDouble} label="Occupancy" value={p.occupancyType} />
                  <InfoPill icon={Train} label="Station" value={`${p.stationKm} km`} />
                  <InfoPill icon={Users} label="Beds" value={`${p.beds} total`} />
                  <InfoPill icon={Clock} label="Status" value={p.availability} />
                </div>
                <div className="mt-6 grid gap-2">
                  <Link
                    to={twinHref(twin, "global-labels", "labels", "book", "/contact") as "/contact"}
                    className="inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:shadow-lift"
                  >
                    <CalendarCheck className="h-4 w-4" />{" "}
                    {twinValue(twin, "global-labels", "labels", "book", settings.primaryCtaText)}
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={p.manager.whatsappHref}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-bold hover:bg-accent"
                    >
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />{" "}
                      {twinValue(
                        twin,
                        "global-labels",
                        "labels",
                        "whatsapp",
                        settings.secondaryCtaText,
                      )}
                    </a>
                    <a
                      href={p.manager.phoneHref}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-bold hover:bg-accent"
                    >
                      <Phone className="h-4 w-4" />{" "}
                      {twinValue(twin, "global-labels", "labels", "call", "Call")}
                    </a>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <SectionShell>
          <SectionTitle eyebrow="Highlights" title="Built for everyday comfort" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              { icon: BedDouble, label: "Beds", value: `${p.beds} beds` },
              { icon: Droplet, label: "Bathrooms", value: `${p.bathrooms} bathrooms` },
              { icon: Building2, label: "Floor", value: p.floor },
              { icon: Home, label: "Area", value: p.area },
              { icon: Wifi, label: "Internet", value: p.internet },
              { icon: ChefHat, label: "Meals", value: p.meals },
              { icon: Sparkles, label: "Housekeeping", value: p.housekeeping },
              { icon: Car, label: "Parking", value: p.parking },
              { icon: Droplet, label: "Water", value: p.water },
              { icon: Plug, label: "Power Backup", value: p.powerBackup },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                  <item.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-base font-bold">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell muted>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionTitle
              eyebrow="Description"
              title="Premium PG living in a prime Mumbai location"
            />
            <div className="space-y-4 text-base leading-7 text-muted-foreground">
              <p>{p.description}</p>
              <p>
                Every inquiry is handled by the property team so you can compare room types, confirm
                current availability and schedule a visit without brokerage pressure. Pricing is
                transparent, and move-in support is available after your visit.
              </p>
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionTitle eyebrow="Amenities" title="Realistic amenities included" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {realisticAmenities
              .filter((name) => p.amenities.includes(name))
              .map((name, idx) => {
                const Icon = amenityIcons[name] ?? Sparkles;
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="flex min-h-20 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold">{name}</span>
                  </motion.div>
                );
              })}
          </div>
        </SectionShell>

        <SectionShell muted>
          <SectionTitle eyebrow="Nearby" title="Daily commute and essentials nearby" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.nearby.map((place) => {
              const Icon = nearbyIcons[place.type] ?? MapPin;
              return (
                <div
                  key={place.label}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {place.type}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold">{place.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{place.distance}</p>
                </div>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell muted>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <HouseRulesGuidelines />
            <div>
              <SectionTitle eyebrow="Contact" title="Talk to the property manager" />
              <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-lift">
                <div className="flex items-center gap-4">
                  <img
                    src={p.manager.photo}
                    alt={p.manager.name}
                    loading="lazy"
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold">{p.manager.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.manager.role}</p>
                    <p className="mt-1 text-sm font-semibold">{p.manager.phone}</p>
                  </div>
                </div>
                <form onSubmit={submitInquiry} className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    value={inquiry.name}
                    onChange={(event) => updateInquiry("name", event.currentTarget.value)}
                    className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                    placeholder="Your name"
                    aria-label="Your name"
                  />
                  <input
                    value={inquiry.phone}
                    onChange={(event) => updateInquiry("phone", event.currentTarget.value)}
                    className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                    placeholder="Phone number"
                    aria-label="Phone number"
                  />
                  <input
                    value={inquiry.visitDate}
                    onChange={(event) => updateInquiry("visitDate", event.currentTarget.value)}
                    className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand)] sm:col-span-2"
                    placeholder="Preferred visit date"
                    aria-label="Preferred visit date"
                  />
                  <textarea
                    value={inquiry.message}
                    onChange={(event) => updateInquiry("message", event.currentTarget.value)}
                    className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand)] sm:col-span-2"
                    rows={3}
                    placeholder="Message"
                    aria-label="Message"
                  />
                  <button
                    type="submit"
                    className="rounded-full gradient-brand px-5 py-3 text-sm font-bold text-white shadow-soft sm:col-span-2"
                  >
                    {twinValue(twin, "global-labels", "labels", "send", "Send Inquiry")}
                  </button>
                </form>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={p.manager.whatsappHref}
                    className="rounded-full border border-border px-4 py-3 text-center text-sm font-bold hover:bg-accent"
                  >
                    {twinValue(
                      twin,
                      "global-labels",
                      "labels",
                      "whatsapp",
                      settings.secondaryCtaText,
                    )}
                  </a>
                  <a
                    href={p.manager.phoneHref}
                    className="rounded-full border border-border px-4 py-3 text-center text-sm font-bold hover:bg-accent"
                  >
                    {twinValue(twin, "global-labels", "labels", "call", "Call Now")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionTitle
            eyebrow="Similar"
            title={twinValue(twin, "global-labels", "labels", "similar", "Similar properties")}
          />
          <div className="mt-6 flex gap-5 overflow-x-auto pb-3 snap-x">
            {displaySimilar.map((item) => (
              <div key={item.slug} className="w-[310px] shrink-0 snap-start md:w-[360px]">
                <PropertyCard p={item} />
              </div>
            ))}
          </div>
        </SectionShell>

        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[60] bg-slate-950/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-full items-center justify-center">
              <img
                src={p.gallery[lightboxIndex]}
                alt={`${p.name} fullscreen preview`}
                className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-lift"
              />
            </div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 px-4">
              {p.gallery.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`h-14 w-16 overflow-hidden rounded-xl border ${idx === lightboxIndex ? "border-white" : "border-white/20"}`}
                  aria-label={`Show fullscreen image ${idx + 1}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </SiteLayout>
  );
}

function HouseRulesGuidelines() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <SectionTitle eyebrow="Rules" title="House Rules & Stay Guidelines" />
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        To ensure a comfortable, safe and respectful living environment for all residents, the
        following guidelines apply to every MyRoomiee property.
      </p>
      <div className="mt-6 space-y-3">
        {houseRuleGroups.map((group, index) => {
          const Icon = group.icon;
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={group.title}
              layout
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[color:var(--surface)]"
                aria-expanded={isOpen}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-base font-bold">{group.title}</span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180 text-[color:var(--brand)]" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <div className="grid gap-2 border-t border-border px-4 py-4">
                      {group.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand)]" />
                          <span className="leading-6 text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SectionShell({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <section className={muted ? "bg-[color:var(--surface)] py-16" : "py-16"}>
      <div className="mx-auto max-w-7xl px-5">{children}</div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[color:var(--surface)] p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}
