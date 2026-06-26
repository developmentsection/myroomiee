import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Snowflake, Camera, Shirt, Refrigerator, Microwave, BookOpen, Armchair,
  Box, Sparkles, Flame, Droplet, ShieldCheck, MapPin, IndianRupee,
  Search, Star, ArrowRight, Phone, MessageCircle, CheckCircle2, Users,
  CalendarCheck, KeyRound, Home, BedDouble, ClipboardCheck, Truck,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { properties, mumbaiLocations, propertyRoomOptions } from "@/lib/properties";
import { locationPages, mainAreaSlugs } from "@/lib/pg-locations";
import { roomOptionNames } from "@/lib/room-labels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyRoomiee — Premium PG & Managed PG Rooms in Mumbai" },
      { name: "description", content: "Fully furnished AC PG, managed PG accommodation in Mumbai. WiFi, housekeeping, security, zero brokerage. Book a free visit." },
      { property: "og:title", content: "MyRoomiee — Premium PG & PG accommodation in Mumbai" },
      { property: "og:description", content: "Fully furnished AC rooms with WiFi, housekeeping, security and zero brokerage across Mumbai." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-home.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "MyRoomiee",
          image: "https://myroomiee.com/og-home.jpg",
          url: "https://myroomiee.com",
          telephone: "+91-8879779777",
          priceRange: "Rs. 8,000-Rs. 25,000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Flat 1005, Keshav Shiv Heights, Malad East",
            addressLocality: "Mumbai",
            addressRegion: "MH",
            postalCode: "400097",
            addressCountry: "IN",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1284" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <PgToggleSection />
      <PropertyRotator />
      <FeaturedProperties />
      <WhyChoose />
      <ComparisonTable />
      <AmenitiesMarquee />
      <AppExperience />
      <PropertyExperience />
      <LocationsGrid />
      <Testimonials />
      <FAQTeaser />
      <ContactCTA />
    </SiteLayout>
  );
}

/* -------------------- HERO -------------------- */

const realRoomImage = (folder: string, number: number) => `/room-images/${folder}/image-${String(number).padStart(2, "0")}.jpeg`;

const heroRoom = realRoomImage("shivdham-building-1-boys", 9);
const roomSingle = realRoomImage("shivdham-building-1-girls", 1);
const roomTwin = realRoomImage("shivdham-building-1-boys", 10);
const roomLounge = realRoomImage("vaibhav-kutir-heights", 14);
const roomPremium = realRoomImage("om-gautam-boys", 1);
const roomGirls = realRoomImage("ashok-samrath-building-girls", 9);

const heroCarouselItems: { label: string; img: string; tag?: string }[] = [
  { label: "Premium AC Rooms", img: heroRoom, tag: "Most loved" },
  { label: "Common Bedroom Rooms", img: roomTwin, tag: "Best value" },
  { label: "Hall Room Options", img: roomTwin, tag: "Budget friendly" },
  { label: "Study Areas", img: roomSingle, tag: "For students" },
  { label: "Move-in Ready Rooms", img: roomLounge, tag: "PG accommodation" },
  { label: "Fully Furnished Rooms", img: roomPremium, tag: "Shared facility" },
  { label: "Girls PG Rooms", img: roomGirls, tag: "Safe & verified" },
  { label: "Boys PG Rooms", img: roomSingle, tag: "Move-in ready" },
  { label: "Premium Furnished Rooms", img: heroRoom, tag: "Fully furnished" },
  { label: "Property Highlights", img: roomLounge, tag: "Top rated" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-gradient-to-b from-[color:var(--brand-soft)] to-transparent" />
      <div className="mx-auto w-full max-w-7xl overflow-hidden px-5 pt-16 pb-14 md:overflow-visible md:pt-20">
        <div className="grid min-w-0 items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-w-0">
            <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-soft backdrop-blur sm:text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Trusted by 2,500+ residents across Mumbai
            </span>
            <h1 className="mt-4 max-w-[calc(100vw-2.5rem)] break-words font-display text-[1.8rem] font-bold leading-[1.1] tracking-tight sm:text-4xl md:max-w-none md:text-6xl">
              <span className="md:hidden">Premium PG Rooms in Mumbai</span>
              <span className="hidden md:inline">Premium PG & <span className="text-gradient-brand">Managed PG Rooms</span> in Mumbai</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Fully furnished AC rooms with WiFi, housekeeping, security and zero brokerage. Book a free visit today.
            </p>
            <div className="mt-7 grid w-full max-w-[calc(100vw-2.5rem)] gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <Link to="/contact" className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-lift sm:w-auto">
                Book Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/properties" className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent sm:w-auto">
                Explore Properties
              </Link>
              <a href="https://wa.me/918879779777" className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent sm:w-auto">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
              <a href="tel:+918879779777" className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent sm:w-auto">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:gap-6">
              {[
                { k: "2,500+", v: "Happy Residents" },
                { k: "40+", v: "Properties" },
                { k: "4.8★", v: "Google Rating" },
              ].map((s) => (
                <div key={s.k} className="min-w-0">
                  <dt className="font-display text-xl font-bold sm:text-2xl">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}

function HeroCarousel() {
  const loop = [...heroCarouselItems, ...heroCarouselItems];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      <div className="pause-on-hover relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-lift">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="hero-carousel flex w-max gap-4 p-4">
          {loop.map((item, i) => (
            <div
              key={i}
              className="group relative h-[360px] w-[min(78vw,320px)] shrink-0 overflow-hidden rounded-2xl shadow-soft md:h-[500px] md:w-[380px]"
            >
              <img
                src={item.img}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                style={{ animation: "zoom-soft 8s ease-in-out infinite alternate" }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                {item.tag && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--brand)]">
                    <CheckCircle2 className="h-3 w-3" /> {item.tag}
                  </span>
                )}
                <p className="mt-2 font-display text-lg font-bold text-white">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating trust cards */}
      <FloatingTrustCards />
    </motion.div>
  );
}

const trustCards: { icon: typeof CheckCircle2; title: string; sub: string; pos: string; delay: number }[] = [
  { icon: CheckCircle2, title: "Visit Scheduled", sub: "Manager confirmation", pos: "-top-4 -left-4", delay: 0 },
  { icon: Star, title: "4.9 Google Rating", sub: "1,284 verified reviews", pos: "top-24 -right-5", delay: 0.8 },
  { icon: BedDouble, title: roomOptionNames, sub: "Choose your room type", pos: "bottom-28 -left-6", delay: 1.4 },
  { icon: KeyRound, title: "Ready To Move In", sub: "Furnished AC rooms", pos: "-bottom-4 right-4", delay: 0.4 },
];

function FloatingTrustCards() {
  return (
    <>
      {trustCards.map((c) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: c.delay },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: c.delay },
          }}
          className={`pointer-events-none absolute z-20 hidden w-[200px] rounded-2xl border border-border bg-white/95 p-3 shadow-lift backdrop-blur md:block ${c.pos}`}
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
              <c.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold leading-tight">{c.title}</p>
              <p className="text-[11px] text-muted-foreground">{c.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

/* -------------------- PG TOGGLE -------------------- */

function PgToggleSection() {
  const [gender, setGender] = useState<"boys" | "girls">("boys");
  const filtered = useMemo(
    () => properties.filter((p) => p.gender === gender || p.gender === "any").slice(0, 3),
    [gender]
  );
  const highlights = [
    { k: "Fully Furnished", v: "Ready to Move In" },
    { k: "AC + WiFi", v: "Included in Rent" },
    { k: "Daily", v: "Housekeeping Service" },
    { k: "Zero", v: "Brokerage Fees" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">For everyone</span>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Find your perfect space</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Toggle between Boys PG and Girls PG to see curated properties, pricing and amenities tailored for you.</p>

        <div className="relative mt-8 inline-flex rounded-full border border-border bg-white/70 p-1 shadow-soft backdrop-blur">
          {(["boys", "girls"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className="relative z-10 min-w-[140px] rounded-full px-6 py-2.5 text-sm font-semibold transition"
              style={{ color: gender === g ? "white" : "var(--color-foreground)" }}
            >
              {gender === g && (
                <motion.span layoutId="pg-toggle" className="absolute inset-0 -z-10 rounded-full gradient-brand shadow-lift" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              {g === "boys" ? "Boys PG" : "Girls PG"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key={gender}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-4 md:grid-cols-4"
        >
          {highlights.map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="font-display text-2xl font-bold text-gradient-brand">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          key={gender + "-cards"}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6 grid gap-6 md:grid-cols-3"
        >
          {filtered.map((p) => (
            <motion.div key={p.slug} variants={{ hidden: { opacity: 0, y: 14, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}>
              <PropertyCard p={p} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          key={gender + "-amenities"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Available options for {gender === "boys" ? "boys" : "girls"}: <span className="font-medium text-foreground">{roomOptionNames} AC room options</span>
        </motion.p>
      </AnimatePresence>
    </section>
  );
}

/* -------------------- FEATURED -------------------- */

function FeaturedProperties() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Featured" title="Premium properties handpicked for you" sub="Verified, fully furnished and ready to move in across Mumbai." cta={{ to: "/properties", label: "View all" }} />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => <PropertyCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}

/* -------------------- WHY CHOOSE -------------------- */

const whyItems = [
  { icon: IndianRupee, title: "Zero Brokerage", desc: "Move in without paying a single rupee in brokerage. Transparent pricing, always." },
  { icon: ShieldCheck, title: "Verified Properties", desc: "Every property is physically inspected and verified by the MyRoomiee team." },
  { icon: MapPin, title: "Prime Locations", desc: "Walking distance from stations, offices and colleges across Mumbai." },
  { icon: Sparkles, title: "Professional Housekeeping", desc: "Daily cleaning, fresh linen and trained staff. Hotel-grade hygiene." },
  { icon: Camera, title: "Safe Living", desc: "24x7 CCTV, biometric access, on-ground wardens and verified residents." },
  { icon: Armchair, title: "Fully Furnished", desc: "Bed, mattress, wardrobe, study desk, AC and Wi-Fi. Just bring your bag." },
];

function WhyChoose() {
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Why MyRoomiee" title="A premium accommodation experience" sub="Designed end-to-end for working professionals and students who care about quality." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((it) => (
            <div key={it.title} className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- COMPARISON -------------------- */

const comparisonRows = [
  ["Brokerage", "Free", "Rs. 5,000-Rs. 15,000"],
  ["AC", "Yes", "Sometimes"],
  ["WiFi", "Included", "Extra"],
  ["Housekeeping", "Included", "No"],
  ["Support", "24x7", "Limited"],
];

function ComparisonTable() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20">
      <SectionHead eyebrow="Compare" title="MyRoomiee vs local PG" sub="Visitors compare comfort, costs and support before choosing where to stay." />
      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
        <table className="w-full text-left text-sm">
          <thead className="bg-[color:var(--surface)] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-semibold">Feature</th>
              <th className="px-5 py-4 font-semibold text-[color:var(--brand)]">MyRoomiee</th>
              <th className="px-5 py-4 font-semibold">Local PG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comparisonRows.map(([feature, roomiee, local]) => (
              <tr key={feature}>
                <td className="px-5 py-4 font-semibold">{feature}</td>
                <td className="px-5 py-4 font-medium text-foreground">{roomiee}</td>
                <td className="px-5 py-4 text-muted-foreground">{local}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* -------------------- AMENITIES -------------------- */

const amenities = [
  { icon: Snowflake, name: "AC" }, { icon: Wifi, name: "WiFi" }, { icon: Camera, name: "CCTV" },
  { icon: Shirt, name: "Laundry" }, { icon: Refrigerator, name: "Fridge" }, { icon: Microwave, name: "Microwave" },
  { icon: BookOpen, name: "Study Table" }, { icon: Armchair, name: "Chair" }, { icon: Box, name: "Cupboard" },
  { icon: Sparkles, name: "Housekeeping" }, { icon: Flame, name: "Geyser" },
  { icon: Droplet, name: "RO Water" },
];

function AmenitiesMarquee() {
  const loop = [...amenities, ...amenities];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="What's included" title="Everything you need, from day one" sub="Each MyRoomiee property includes practical comfort, clean rooms and clear pricing." />
      </div>
      <div className="pause-on-hover relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-slow flex w-max items-center gap-4 px-4">
          {loop.map((a, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.2 }}
              className="flex h-28 w-[180px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card text-center shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--brand-soft)] to-white text-[color:var(--brand)] shadow-soft">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">{a.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- PROPERTY ROTATOR -------------------- */

function PropertyRotator() {
  const [i, setI] = useState(0);
  const items = properties.slice(0, 5);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [items.length]);
  const p = items[i];
  const roomOptions = propertyRoomOptions(p);
  const targetRoom = roomOptions[0];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Now Showing" title="Featured property of the moment" sub="A rotating showcase of newly available rooms across Mumbai." />
      <div className="mt-10 grid items-stretch gap-6 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift md:grid-cols-[1.2fr_1fr]">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug + "-img"}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[320px] md:min-h-[440px]"
          >
            <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[color:var(--brand)] shadow-soft">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified Property
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col justify-between p-7 md:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.slug + "-txt"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">{p.location}</p>
              <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold">₹{p.priceFrom.toLocaleString("en-IN")}</span>
                <span className="text-sm text-muted-foreground">/ month onwards</span>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Room Options</dt>
                  <dd className="mt-0.5 font-semibold">{roomOptions.map((room) => room.label).join(" · ")}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Availability</dt>
                  <dd className="mt-0.5 font-semibold text-emerald-600">Beds available</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Nearest station</dt>
                  <dd className="mt-0.5 font-semibold">{p.station} • {p.stationKm} km</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">For</dt>
                  <dd className="mt-0.5 font-semibold capitalize">{p.gender === "any" ? "PG accommodation" : p.gender + " PG"}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-1.5">
              {items.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setI(j)}
                  aria-label={`Show property ${j + 1}`}
                  className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-[color:var(--brand)]" : "w-3 bg-border"}`}
                />
              ))}
            </div>
            <Link
              to="/properties/$slug"
              params={{ slug: targetRoom?.slug ?? p.slug }}
              search={{ location: `pg-in-${p.locationSlug}`, property: p.slug }}
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lift"
            >
              Book Visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- APP EXPERIENCE -------------------- */

const journeySteps: { icon: typeof Home; title: string; desc: string; ui: { label: string; value: string }[] }[] = [
  { icon: Search, title: "Share Requirement", desc: "Tell us location, budget and room option.", ui: [{ label: "Location", value: "Malad East" }, { label: "Budget", value: "Rs. 12,000" }] },
  { icon: BedDouble, title: "Choose Room Type", desc: `Compare ${roomOptionNames} options.`, ui: [{ label: "Room Type", value: "Common Bedroom" }, { label: "AC + WiFi", value: "Included" }] },
  { icon: CalendarCheck, title: "Schedule Visit", desc: "Free property tour at a slot you choose.", ui: [{ label: "Visit Slot", value: "Sat, 4:30 PM" }, { label: "Manager", value: "Confirmed" }] },
  { icon: ClipboardCheck, title: "Confirm With Manager", desc: "Finalize rent, deposit and documents offline.", ui: [{ label: "Deposit", value: "As discussed" }, { label: "Documents", value: "Verified" }] },
  { icon: Truck, title: "Move In", desc: "Walk in with your bag. Your room is ready.", ui: [{ label: "Move-in", value: "Planned" }, { label: "Keys", value: "Ready" }] },
];

function AppExperience() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="How it works" title="Simple visit process, no online room booking" sub="Share your requirement, visit the property, confirm details with the manager and move in after verification." />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {journeySteps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">STEP {idx + 1}</span>
              </div>
              <p className="mt-4 font-display text-base font-bold">{s.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
          <p className="text-sm text-muted-foreground">
            Room confirmation is handled by the MyRoomiee manager after visit, document verification, rent discussion and deposit confirmation. The website does not provide online room booking.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">Schedule Visit</Link>
            <a href="https://wa.me/918879779777" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Talk on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- EXPERIENCE -------------------- */

function PropertyExperience() {
  const steps = [
    { n: "01", t: "Browse verified properties", d: "Filter by location, budget and room option." },
    { n: "02", t: "Schedule a free visit", d: "Pick a slot. Our manager walks you through the property." },
    { n: "03", t: "Confirm with our manager", d: "Review rent, deposit, documents and move-in date before paying." },
  ];
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <SectionHead align="left" eyebrow="Property Experience" title="Hotel-like comfort, home-like warmth" sub="From spotless rooms to dependable Wi-Fi and responsive support, your stay is planned for peace of mind." />
          <div className="mt-8 space-y-5">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="font-display text-xl font-bold text-gradient-brand">{s.n}</span>
                <div>
                  <h4 className="font-display font-semibold">{s.t}</h4>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-lift">
            <img src={roomLounge} alt="MyRoomiee PG accommodation lounge" loading="lazy" className="h-[480px] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden w-[220px] rounded-2xl border border-border bg-white/90 p-4 shadow-lift backdrop-blur md:block">
            <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--brand)]"><Star className="h-4 w-4 fill-current" /> 4.9 / 5</div>
            <p className="mt-1 text-sm font-semibold">Housekeeping rating</p>
            <p className="text-xs text-muted-foreground">Based on 980+ resident reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- LOCATIONS -------------------- */

function LocationsGrid() {
  const mainPages = mainAreaSlugs.map((slug) => locationPages[slug]).filter(Boolean);
  const subAreas = mainPages.flatMap((page) => page.serviceAreas ?? []).slice(0, 24);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Locations We Serve" title="PG rooms across Mumbai main areas and subareas" sub="Explore MyRoomiee in Malad East, Malad West, Goregaon East, Goregaon West, Jogeshwari East, Jogeshwari West and nearby subareas." cta={{ to: "/locations", label: "All locations" }} />
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {mainPages.map((p) => (
          <Link
            key={p.slug}
            to="/$slug"
            params={{ slug: p.slug }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--brand)] shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <MapPin className="h-3.5 w-3.5" /> PG in {p.area}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {subAreas.map((l) => (
          <Link
            key={l.href}
            to="/$slug"
            params={{ slug: l.href.replace(/^\//, "") }}
            className="group inline-flex min-h-11 w-full max-w-full items-center justify-between gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift sm:w-auto sm:justify-start"
          >
            <span className="inline-flex min-w-0 items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[color:var(--brand)]" />
              <span className="min-w-0 break-words">{l.name}</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]" />
          </Link>
        ))}
      </div>
    </section>
  );
}
/* -------------------- TESTIMONIALS -------------------- */

const testimonials = [
  { name: "Aarav Mehta", role: "Software Engineer, Powai", text: "Moved into MyRoomiee Powai 8 months ago. The rooms are spotless, internet is fast, and the team is genuinely responsive. Easily the best PG experience I've had in Mumbai." },
  { name: "Sneha Iyer", role: "Marketing Lead, BKC", text: "I felt safe from day one — CCTV, biometric entry, and the warden actually knows everyone. Worth every rupee, and zero brokerage was a huge plus." },
  { name: "Rahul Verma", role: "MBA Student, Andheri", text: "Fully furnished, AC, daily housekeeping, and zero brokerage made the move simple. Visited on Saturday and moved in by Monday." },
];

function Testimonials() {
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Reviews" title="Loved by residents across Mumbai" sub="4.8 average rating on Google by 2,500+ residents" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-yellow-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full gradient-brand font-semibold text-white">{t.name[0]}</span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */

const faqs = [
  { q: "Is brokerage really zero?", a: "Yes. MyRoomiee charges zero brokerage. You pay only the security deposit and monthly rent — nothing else." },
  { q: "Are the rooms fully furnished?", a: "Every room comes with a bed, mattress, wardrobe, study desk, chair, AC and high-speed Wi-Fi. Common areas include fridge, microwave, RO water and more." },
  { q: "How do I book a visit?", a: "Click Book Visit or WhatsApp us. A property manager will confirm your slot within 15 minutes and walk you through the property." },
  { q: "Do you offer both Boys and Girls PG?", a: "Yes. We have dedicated Boys PG, Girls PG and unisex PG properties across 42 Mumbai locations." },
  { q: "Is food included?", a: "No. MyRoomiee does not include food in any package. Residents can use nearby food options or arrange it separately as per their preference." },
];

function FAQTeaser() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <SectionHead eyebrow="FAQ" title="Frequently asked questions" sub="Everything you wanted to know about living with MyRoomiee." />
      <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
        {faqs.map((f, i) => (
          <button key={f.q} onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-5 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-base font-semibold">{f.q}</span>
              <span className={`grid h-7 w-7 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)] transition ${open === i ? "rotate-45" : ""}`}>+</span>
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 text-sm text-muted-foreground">
                  {f.a}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CONTACT CTA + MAP -------------------- */

function ContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to move in?</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Book a free visit today. Our team will help you pick the perfect property in your preferred Mumbai location.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-lift">Book Visit</Link>
              <a href="https://wa.me/918879779777" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">WhatsApp Now</a>
              <a href="tel:+918879779777" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Call +91 8879779777</a>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Flat No. 1005, Keshav Shiv Heights, Malad East, Mumbai 400097
            </div>
          </div>
          <div className="relative min-h-[280px] bg-[color:var(--surface-muted)]">
            <iframe
              title="MyRoomiee Office"
              src="https://www.google.com/maps?q=Keshav+Shiv+Heights+Malad+East+Mumbai&output=embed"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SHARED -------------------- */

function SectionHead({ eyebrow, title, sub, cta, align = "center" }: { eyebrow?: string; title: string; sub?: string; cta?: { to: string; label: string }; align?: "center" | "left" }) {
  const cls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${cls}`}>
      {eyebrow && <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">{eyebrow}</span>}
      <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="max-w-2xl text-muted-foreground">{sub}</p>}
      {cta && (
        <Link to={cta.to} className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand)] hover:gap-2">
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}



