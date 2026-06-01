import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Snowflake, Camera, Shirt, Refrigerator, Microwave, BookOpen, Armchair,
  Box, Sparkles, Plug, Flame, Droplet, ChefHat, ShieldCheck, MapPin, IndianRupee,
  Search, Star, ArrowRight, Phone, MessageCircle, CheckCircle2, Users,
  CalendarCheck, KeyRound, Home, BedDouble, ClipboardCheck, Truck,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { properties, mumbaiLocations } from "@/lib/properties";
import heroRoom from "@/assets/hero-room.jpg";
import roomLounge from "@/assets/room-lounge.jpg";
import roomKitchen from "@/assets/room-kitchen.jpg";
import roomSingle from "@/assets/room-single.jpg";
import roomTwin from "@/assets/room-twin.jpg";
import roomBath from "@/assets/room-bath.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyRoomiee — Premium PG & Coliving Spaces in Mumbai" },
      { name: "description", content: "Fully furnished AC PG, coliving and managed accommodation in Mumbai. WiFi, housekeeping, security, zero brokerage. Book a free visit." },
      { property: "og:title", content: "MyRoomiee — Premium PG & Coliving in Mumbai" },
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
          telephone: "+91-99999-99999",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Andheri West",
            addressLocality: "Mumbai",
            addressRegion: "MH",
            postalCode: "400058",
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
      <SearchBar />
      <PropertyRotator />
      <FeaturedProperties />
      <WhyChoose />
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

const heroCarouselItems: { label: string; img: string; tag?: string }[] = [
  { label: "Premium AC Rooms", img: heroRoom, tag: "Most loved" },
  { label: "Double Sharing Rooms", img: roomTwin, tag: "Best value" },
  { label: "Triple Sharing Rooms", img: roomTwin, tag: "Budget friendly" },
  { label: "Study Areas", img: roomSingle, tag: "For students" },
  { label: "Community Lounge", img: roomLounge, tag: "Coliving" },
  { label: "Dining Space", img: roomKitchen, tag: "Healthy meals" },
  { label: "Girls PG Rooms", img: roomBath, tag: "Safe & verified" },
  { label: "Boys PG Rooms", img: roomSingle, tag: "Move-in ready" },
  { label: "Premium Furnished Rooms", img: heroRoom, tag: "Fully furnished" },
  { label: "Property Highlights", img: roomLounge, tag: "Top rated" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-gradient-to-b from-[color:var(--brand-soft)] to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-14 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Trusted by 12,000+ residents across Mumbai
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Premium PG & <span className="text-gradient-brand">Coliving Spaces</span> in Mumbai
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Fully furnished AC rooms with WiFi, housekeeping, security and zero brokerage. Book a free visit today.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-lift">
                Book Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                Explore Properties
              </Link>
              <a href="https://wa.me/919999999999" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
              <a href="tel:+919999999999" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { k: "12K+", v: "Happy Residents" },
                { k: "180+", v: "Properties" },
                { k: "4.8★", v: "Google Rating" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl font-bold">{s.k}</dt>
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
              className="group relative h-[420px] w-[320px] shrink-0 overflow-hidden rounded-2xl shadow-soft md:h-[500px] md:w-[380px]"
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
  { icon: CheckCircle2, title: "Room Booked Today", sub: "Andheri West • 2 mins ago", pos: "-top-4 -left-4", delay: 0 },
  { icon: Star, title: "4.9 Google Rating", sub: "1,284 verified reviews", pos: "top-24 -right-5", delay: 0.8 },
  { icon: BedDouble, title: "3 Beds Available", sub: "Powai Coliving", pos: "bottom-28 -left-6", delay: 1.4 },
  { icon: KeyRound, title: "Move-in Confirmed", sub: "Bandra Girls PG", pos: "-bottom-4 right-4", delay: 0.4 },
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
  const stats = gender === "boys"
    ? { rooms: "120+", areas: "38+", price: "₹8,499", amenities: "AC • WiFi • Meals • Laundry" }
    : { rooms: "95+", areas: "32+", price: "₹9,499", amenities: "AC • WiFi • CCTV • Meals • Housekeeping" };

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

      <AnimatePresence mode="wait">
        <motion.div
          key={gender}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-4 md:grid-cols-4"
        >
          {[
            { k: stats.rooms, v: "Rooms available" },
            { k: stats.areas, v: "Mumbai locations" },
            { k: stats.price, v: "Starting price/mo" },
            { k: "Free", v: "Visit & cancellation" },
          ].map((s) => (
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
          Included for {gender === "boys" ? "Boys" : "Girls"} PGs: <span className="font-medium text-foreground">{stats.amenities}</span>
        </motion.p>
      </AnimatePresence>
    </section>
  );
}

/* -------------------- SEARCH -------------------- */

function SearchBar() {
  return (
    <section className="mx-auto -mt-4 max-w-5xl px-5">
      <div className="rounded-3xl border border-border bg-card p-3 shadow-lift md:p-4">
        <div className="grid gap-2 md:grid-cols-[1.2fr_1fr_1fr_auto]">
          <Field icon={MapPin} label="Location" placeholder="Andheri, Powai, Bandra..." />
          <Field icon={IndianRupee} label="Budget" placeholder="Up to ₹15,000" />
          <Field icon={Users} label="Sharing" placeholder="Single, Double, Triple" />
          <Link to="/properties" className="inline-flex items-center justify-center gap-2 rounded-2xl gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft">
            <Search className="h-4 w-4" /> Search
          </Link>
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, placeholder }: { icon: typeof MapPin; label: string; placeholder: string }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-[color:var(--surface)] px-4 py-3">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <input className="bg-transparent text-sm outline-none placeholder:text-muted-foreground/70" placeholder={placeholder} />
      </div>
    </label>
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

/* -------------------- AMENITIES -------------------- */

const amenities = [
  { icon: Snowflake, name: "AC" }, { icon: Wifi, name: "WiFi" }, { icon: Camera, name: "CCTV" },
  { icon: Shirt, name: "Laundry" }, { icon: Refrigerator, name: "Fridge" }, { icon: Microwave, name: "Microwave" },
  { icon: BookOpen, name: "Study Table" }, { icon: Armchair, name: "Chair" }, { icon: Box, name: "Cupboard" },
  { icon: Sparkles, name: "Housekeeping" }, { icon: Plug, name: "Power Backup" }, { icon: Flame, name: "Geyser" },
  { icon: Droplet, name: "RO Water" }, { icon: ChefHat, name: "Gas Stove" },
];

function AmenitiesMarquee() {
  const loop = [...amenities, ...amenities];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="What's included" title="Everything you need, from day one" sub="Each MyRoomiee property comes loaded with premium amenities — no hidden costs." />
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
                  <dt className="text-xs text-muted-foreground">Sharing</dt>
                  <dd className="mt-0.5 font-semibold">{p.sharing.join(" · ")}</dd>
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
                  <dd className="mt-0.5 font-semibold capitalize">{p.gender === "any" ? "Coliving" : p.gender + " PG"}</dd>
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
            <Link to="/properties/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lift">
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
  { icon: Search, title: "Find Room", desc: "Search by location, budget and sharing type.", ui: [{ label: "Location", value: "Andheri West" }, { label: "Budget", value: "₹12,000" }] },
  { icon: BedDouble, title: "Select Bed", desc: "Pick your bed in a real floor plan.", ui: [{ label: "Room 204", value: "Double sharing" }, { label: "Bed B", value: "Available" }] },
  { icon: CalendarCheck, title: "Schedule Visit", desc: "Free property tour at a slot you choose.", ui: [{ label: "Sat, 4:30 PM", value: "Confirmed" }, { label: "Manager", value: "Rohan K." }] },
  { icon: ClipboardCheck, title: "Confirm Booking", desc: "Digital agreement and secure payment.", ui: [{ label: "Deposit", value: "₹15,000" }, { label: "Status", value: "Paid" }] },
  { icon: Truck, title: "Move In", desc: "Walk in with your bag. Everything is ready.", ui: [{ label: "Move-in", value: "Mon, 10 AM" }, { label: "Keys", value: "Ready" }] },
];

function AppExperience() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="How it works" title="Your move-in journey, designed like a product" sub="From discovery to keys-in-hand — a five-step experience built on transparency and speed." />
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {journeySteps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative"
            >
              {/* phone frame */}
              <div className="relative mx-auto w-full max-w-[220px] rounded-[2rem] border border-border bg-gradient-to-b from-white to-[color:var(--surface-muted)] p-3 shadow-lift transition-transform group-hover:-translate-y-1">
                <div className="rounded-[1.4rem] border border-border bg-white p-3">
                  <div className="flex items-center justify-between">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                      <s.icon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground">STEP 0{idx + 1}</span>
                  </div>
                  <p className="mt-3 font-display text-sm font-bold">{s.title}</p>
                  <div className="mt-3 space-y-2">
                    {s.ui.map((u) => (
                      <div key={u.label} className="rounded-xl bg-[color:var(--surface)] px-3 py-2">
                        <p className="text-[10px] text-muted-foreground">{u.label}</p>
                        <p className="text-xs font-semibold">{u.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl gradient-brand px-3 py-2 text-center text-[11px] font-semibold text-white">
                    Continue
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- EXPERIENCE -------------------- */

function PropertyExperience() {
  const steps = [
    { n: "01", t: "Browse verified properties", d: "Filter by location, budget and sharing type." },
    { n: "02", t: "Schedule a free visit", d: "Pick a slot. Our manager walks you through the property." },
    { n: "03", t: "Move in the same day", d: "Sign digitally, pay securely, and start living premium." },
  ];
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <SectionHead align="left" eyebrow="Property Experience" title="Hotel-like comfort, home-like warmth" sub="From spotless rooms to dependable Wi-Fi and warm meals — your stay is engineered for peace of mind." />
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
            <img src={roomLounge} alt="MyRoomiee coliving lounge" loading="lazy" className="h-[480px] w-full object-cover" />
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
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Locations We Serve" title="42 prime neighbourhoods across Mumbai" sub="From Andheri to Thane, Powai to Lower Parel — find premium PGs near you." cta={{ to: "/locations", label: "All locations" }} />
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {[
          { to: "/pg-in-malad-east", label: "PG in Malad East" },
          { to: "/pg-in-goregaon", label: "PG in Goregaon" },
          { to: "/pg-in-jogeshwari", label: "PG in Jogeshwari" },
        ].map((p) => (
          <Link
            key={p.to}
            to={p.to}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--brand)] shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <MapPin className="h-3.5 w-3.5" /> {p.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {mumbaiLocations.slice(0, 24).map((l) => (
          <Link key={l.slug} to="/locations/$slug" params={{ slug: l.slug }} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:shadow-lift">
            <span>{l.name}</span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]" />
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
  { name: "Rahul Verma", role: "MBA Student, Andheri", text: "Fully furnished, AC, daily housekeeping, and the food is honestly home-quality. Booked the visit on a Saturday and moved in by Monday." },
];

function Testimonials() {
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Reviews" title="Loved by residents across Mumbai" sub="4.8★ average rating on Google • 1,200+ verified reviews" />
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
  { q: "Do you offer both Boys and Girls PG?", a: "Yes. We have dedicated Boys PG, Girls PG and unisex coliving properties across 42 Mumbai locations." },
  { q: "Is food included?", a: "Most properties include healthy meals (breakfast + dinner). Some properties offer fully equipped community kitchens — your choice." },
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
              <a href="https://wa.me/919999999999" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">WhatsApp Now</a>
              <a href="tel:+919999999999" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Call +91 99999 99999</a>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Andheri West, Mumbai, Maharashtra 400058
            </div>
          </div>
          <div className="relative min-h-[280px] bg-[color:var(--surface-muted)]">
            <iframe
              title="MyRoomiee Office"
              src="https://www.google.com/maps?q=Andheri+West+Mumbai&output=embed"
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
