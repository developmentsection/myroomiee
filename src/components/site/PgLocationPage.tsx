import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Star, ArrowRight, Phone, MessageCircle, MapPin, Train, Bus,
  ShoppingBag, Building2, GraduationCap, HeartPulse, Snowflake, Wifi, Camera,
  Sparkles, Droplet, Flame, Refrigerator, Microwave, BookOpen, Armchair,
  Box, Shirt, CheckCircle2, BedDouble, Users, IndianRupee,
} from "lucide-react";
import { SiteLayout } from "./SiteLayout";
import type { PgLocationData, PgLandmark, PgRoomCard } from "@/lib/pg-locations";
import { pgContact, safePreviewGallery } from "@/lib/pg-locations";
import { properties, resolvePropertyBySlug, type Property, type SharingType } from "@/lib/properties";

const amenitiesGrid = [
  { icon: Snowflake, name: "AC" }, { icon: Wifi, name: "WiFi" }, { icon: Camera, name: "CCTV" },
  { icon: Sparkles, name: "Housekeeping" }, { icon: Shirt, name: "Laundry" },
  { icon: Refrigerator, name: "Fridge" }, { icon: Microwave, name: "Microwave" },
  { icon: BookOpen, name: "Study Table" }, { icon: Armchair, name: "Chair" },
  { icon: Droplet, name: "RO Water" },
  { icon: Flame, name: "Geyser" }, { icon: Box, name: "Cupboard" },
];

const landmarkIcon = (t: PgLandmark["type"]) => {
  switch (t) {
    case "Station": return Train;
    case "Metro": return Bus;
    case "Mall": return ShoppingBag;
    case "Office": return Building2;
    case "College": return GraduationCap;
    case "Hospital": return HeartPulse;
  }
};

const bedroomGallery = (data: PgLocationData) => safePreviewGallery(data.gallery).slice(0, 3);
const bedroomImage = (data: PgLocationData, index = 0) => bedroomGallery(data)[index]?.src ?? "";

export function PgLocationPage({ data }: { data: PgLocationData }) {
  return (
    <SiteLayout>
      <Hero data={data} />
      <TrustStrip data={data} />
      <PgRooms data={data} />
      <ServiceAreas data={data} />
      <WhyChoose />
      <Amenities />
      <WhyStay data={data} />
      <Landmarks data={data} />
      <Gallery data={data} />
      <Reviews data={data} />
      <SeoContent data={data} />
      <Faqs data={data} />
      <Map data={data} />
      <FinalCta data={data} />
    </SiteLayout>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ data }: { data: PgLocationData }) {
  const startingRent = locationStartingRent(data);
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-gradient-to-b from-[color:var(--brand-soft)] to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-12 md:pt-20">
        <div className="grid min-w-0 items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-w-0">
            <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" />
              Verified PG • {data.area} • {data.city}
            </span>
            <h1 className="mt-4 break-words font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {data.headline.split(" in ")[0]} in <span className="text-gradient-brand">{data.area}</span>
            </h1>
            <p className="mt-5 max-w-xl break-words text-base text-muted-foreground md:text-lg">{data.subheadline}</p>

            <div className="mt-7 grid w-full gap-3 sm:flex sm:flex-wrap">
              <Link to="/contact" className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-lift">
                Book Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={pgContact.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
              <a href={pgContact.phoneHref} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { k: `${data.googleRating}★`, v: `${data.googleReviews}+ reviews` },
                { k: `${data.propertyCount}+`, v: "Properties" },
                { k: `${data.residentCount}+`, v: "Residents" },
                { k: `₹${startingRent.toLocaleString("en-IN")}`, v: "Starting / mo" },
              ].map((s) => (
                <div key={s.v} className="min-w-0">
                  <dt className="font-display text-2xl font-bold">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <HeroCarousel data={data} />
        </div>
      </div>
    </section>
  );
}

function HeroCarousel({ data }: { data: PgLocationData }) {
  const heroItems = bedroomGallery(data);
  const loop = [...heroItems, ...heroItems];
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
      <div className="pause-on-hover relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-lift">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="hero-carousel flex w-max gap-4 p-4">
          {loop.map((item, i) => (
            <div key={i} className="group relative h-[400px] w-[300px] shrink-0 overflow-hidden rounded-2xl shadow-soft md:h-[480px] md:w-[360px]">
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" style={{ animation: "zoom-soft 8s ease-in-out infinite alternate" }} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--brand)]">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
                <p className="mt-2 font-display text-lg font-bold text-white">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- TRUST STRIP ---------------- */
function TrustStrip({ data }: { data: PgLocationData }) {
  const items = [
    { icon: ShieldCheck, t: "Verified Properties" },
    { icon: IndianRupee, t: "Zero Brokerage" },
    { icon: Sparkles, t: "Daily Housekeeping" },
    { icon: Camera, t: "24x7 CCTV" },
    { icon: Train, t: `${data.station} Station Nearby` },
  ];
  return (
    <section className="mx-auto -mt-2 max-w-6xl px-5">
      <div className="rounded-3xl border border-border bg-card p-3 shadow-lift md:p-4">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-5">
          {items.map((it) => (
            <div key={it.t} className="flex items-center gap-3 rounded-2xl bg-[color:var(--surface)] px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                <it.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">{it.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PG ROOMS + TOGGLE ---------------- */
const propertySlugForSharing = (sharing: string) => {
  const normalized = sharing.toLowerCase();
  if (normalized.includes("single")) return "single-ac-room";
  if (normalized.includes("triple")) return "triple-sharing-room";
  return "double-sharing-room";
};

const sharingTypeForRoom = (sharing: string): SharingType => {
  const normalized = sharing.toLowerCase();
  if (normalized.includes("single")) return "Single";
  if (normalized.includes("triple")) return "Triple";
  return "Double";
};

const propertyMatchesGender = (property: Property, gender: "boys" | "girls") =>
  property.gender === "any" || property.gender === gender;

const propertyForRoom = (room: PgRoomCard, gender: "boys" | "girls") => {
  const sharing = sharingTypeForRoom(room.sharing);
  const exactProperty = room.propertySlug ? resolvePropertyBySlug(room.propertySlug) : undefined;
  if (exactProperty?.sharing.includes(sharing) && propertyMatchesGender(exactProperty, gender)) return exactProperty;

  return (
    properties.find((property) => propertyMatchesGender(property, gender) && property.sharing.includes(sharing)) ??
    properties.find((property) => property.sharing.includes(sharing)) ??
    properties[0]
  );
};

const roomDisplayPrice = (room: PgRoomCard, gender: "boys" | "girls") => {
  const property = propertyForRoom(room, gender);
  const sharing = sharingTypeForRoom(room.sharing);
  return property?.prices[sharing] ?? room.priceFrom ?? property?.priceFrom ?? 0;
};

const locationStartingRent = (data: PgLocationData) => {
  const prices = [
    ...data.boys.map((room) => roomDisplayPrice(room, "boys")),
    ...data.girls.map((room) => roomDisplayPrice(room, "girls")),
  ].filter((price) => price > 0);
  return prices.length ? Math.min(...prices) : data.startingRent;
};

function PgRooms({ data }: { data: PgLocationData }) {
  const [gender, setGender] = useState<"boys" | "girls">("boys");
  const list = useMemo(() => (gender === "boys" ? data.boys : data.girls), [gender, data]);
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Featured Properties" title={`Premium PGs in ${data.area}`} sub="Choose your room type — single, double or triple sharing. Every room is fully furnished and move-in ready." />

      <div className="mt-8 flex justify-center">
        <div className="relative inline-flex rounded-full border border-border bg-white/70 p-1 shadow-soft backdrop-blur">
          {(["boys", "girls"] as const).map((g) => (
            <button key={g} onClick={() => setGender(g)} className="relative z-10 min-w-[140px] rounded-full px-6 py-2.5 text-sm font-semibold transition" style={{ color: gender === g ? "white" : "var(--color-foreground)" }}>
              {gender === g && <motion.span layoutId="pg-loc-toggle" className="absolute inset-0 -z-10 rounded-full gradient-brand shadow-lift" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              {g === "boys" ? "Boys PG" : "Girls PG"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={gender}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((r, i) => {
            const property = propertyForRoom(r, gender);
            const price = roomDisplayPrice(r, gender);
            return (
              <motion.div
                key={r.type + i}
                variants={{ hidden: { opacity: 0, y: 14, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
                className="h-full"
              >
                <Link
                  to="/properties/$slug"
                  params={{ slug: propertySlugForSharing(r.sharing) }}
                  search={{ location: data.slug, property: property.slug }}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft outline-none transition hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2"
                >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={bedroomImage(data, i % 3)} alt={`${r.type} PG in ${data.area}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Verified
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background">
                  {gender === "boys" ? "Boys" : "Girls"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-tight">{r.type}</h3>
                  <p className="mt-1 inline-flex max-w-full items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {data.area}, {data.city}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-[color:var(--surface-muted)] px-2.5 py-1 text-xs text-muted-foreground">{a}</span>
                  ))}
                </div>
                <div className="mt-auto flex min-w-0 items-end justify-between gap-3 border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="font-display text-xl font-bold">₹{price.toLocaleString("en-IN")}<span className="text-sm font-medium text-muted-foreground">/mo</span></p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold text-emerald-600">{r.sharing} option</p>
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full gradient-brand px-3 py-1.5 text-xs font-semibold text-white shadow-soft">
                      View Details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function ServiceAreas({ data }: { data: PgLocationData }) {
  const areas = data.serviceAreas ?? [];
  if (areas.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20">
      <SectionHead eyebrow="Nearby Areas" title={`Explore PG locations around ${data.area}`} sub="All main locations and sub-area pages are clickable with updated MyRoomiee details." />
      <div className="mt-10 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <Link
            key={area.href}
            to={area.href}
            className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:shadow-lift"
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-words font-display text-base font-semibold">{area.name}</p>
                <p className="mt-1 break-words text-sm text-muted-foreground">{area.description}</p>
              </div>
              {area.badge && <span className="shrink-0 rounded-full bg-[color:var(--brand-soft)] px-2 py-1 text-[10px] font-bold text-[color:var(--brand)]">{area.badge}</span>}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand)]">
              View location <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE ---------------- */
function WhyChoose() {
  const items = [
    { icon: IndianRupee, t: "Zero Brokerage", d: "Move in without paying any brokerage. Pay only deposit and rent." },
    { icon: ShieldCheck, t: "Verified Properties", d: "Every property is physically inspected by the MyRoomiee team." },
    { icon: MapPin, t: "Prime Locations", d: "Walking distance from stations, offices and colleges." },
    { icon: Armchair, t: "Fully Furnished", d: "Bed, mattress, wardrobe, study desk, AC and WiFi — ready to use." },
    { icon: Sparkles, t: "Professional Housekeeping", d: "Daily cleaning, fresh linen and trained staff." },
    { icon: Camera, t: "CCTV & Safe Living", d: "24x7 CCTV, biometric access and verified residents." },
    { icon: Wifi, t: "High-speed WiFi", d: "Stable WiFi across rooms — perfect for WFH and study." },
    { icon: Droplet, t: "RO Water", d: "Clean, filtered drinking water on every floor." },
  ];
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Why MyRoomiee" title="A premium accommodation experience" sub="Designed end-to-end for working professionals and students who care about quality." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.t} className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{it.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- AMENITIES ---------------- */
function Amenities() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Amenities" title="Realistic amenities included" sub="Practical room and common-area features available across MyRoomiee properties." />
      <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
        {amenitiesGrid.map((a) => (
          <div key={a.name} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--brand-soft)] to-white text-[color:var(--brand)] shadow-soft">
              <a.icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold">{a.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WHY STAY ---------------- */
function WhyStay({ data }: { data: PgLocationData }) {
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <SectionHead align="left" eyebrow="Location Advantage" title={`Why stay in ${data.area}?`} sub={data.intro} />
          <ul className="mt-8 space-y-3">
            {data.whyStay.map((w) => (
              <li key={w} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--brand)]" />
                <span className="text-sm">{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-lift">
            <img src={bedroomImage(data, 1)} alt={`PG rooms in ${data.area}`} loading="lazy" className="h-[440px] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden w-[230px] rounded-2xl border border-border bg-white/95 p-4 shadow-lift backdrop-blur md:block">
            <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--brand)]"><Star className="h-4 w-4 fill-current" /> {data.googleRating} / 5</div>
            <p className="mt-1 text-sm font-semibold">Resident rating</p>
            <p className="text-xs text-muted-foreground">{data.googleReviews}+ verified Google reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- LANDMARKS ---------------- */
function Landmarks({ data }: { data: PgLocationData }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Nearby Landmarks" title={`What's around our ${data.area} PGs`} sub="Distance and travel time from MyRoomiee properties." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.landmarks.map((l) => {
          const Icon = landmarkIcon(l.type);
          return (
            <div key={l.name} className="rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-[color:var(--surface-muted)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{l.type}</span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{l.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{l.distanceKm} km • {l.minutes} min</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery({ data }: { data: PgLocationData }) {
  const [open, setOpen] = useState<number | null>(null);
  const gallery = bedroomGallery(data);
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Gallery" title={`Inside our ${data.area} properties`} sub="Real photos of furnished rooms and move-in ready spaces." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left">
                <p className="text-xs font-semibold text-white">{g.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
          >
            <motion.img
              initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
              src={gallery[open].src}
              alt={gallery[open].alt}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-lift"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- REVIEWS ---------------- */
function Reviews({ data }: { data: PgLocationData }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Google Reviews" title={`Loved by residents in ${data.area}`} sub={`${data.googleRating}★ average • ${data.googleReviews}+ verified Google reviews`} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {data.testimonials.map((t) => (
          <div key={t.name} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex gap-0.5 text-yellow-400">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed">"{t.text}"</p>
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
    </section>
  );
}

/* ---------------- SEO CONTENT ---------------- */
function SeoContent({ data }: { data: PgLocationData }) {
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Accommodation Guide" title={`Everything about PGs in ${data.area}`} sub={`From rent and amenities to safety and connectivity — your complete guide to renting a PG in ${data.area}.`} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.seoBlocks.map((b) => (
            <article key={b.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <h3 className="font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faqs({ data }: { data: PgLocationData }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <SectionHead eyebrow="FAQ" title={`PG in ${data.area} — frequently asked questions`} sub="Everything you need to know before scheduling a property visit." />
      <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
        {data.faqs.map((f, i) => (
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

/* ---------------- MAP ---------------- */
function Map({ data }: { data: PgLocationData }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Property Coverage" title={`Find us across ${data.area}`} sub="Our managed properties are spread across the most preferred streets and societies in the area." />
      <div className="mt-10 overflow-hidden rounded-[2rem] border border-border shadow-lift">
        <iframe
          title={`MyRoomiee ${data.area}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(data.mapQuery)}&output=embed`}
          className="h-[420px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCta({ data }: { data: PgLocationData }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Looking for the best PG in {data.area}?</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Book a free visit today. Our {data.area} property manager will walk you through available rooms and amenities.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-lift">Book Visit</Link>
              <a href={pgContact.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Now
              </a>
              <a href={pgContact.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <Phone className="h-4 w-4" /> {pgContact.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              {["Verified", "Zero Brokerage", "Daily Housekeeping", "CCTV Secured", "Furnished"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1 rounded-full border border-border bg-[color:var(--surface)] px-2.5 py-1 font-semibold text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-[color:var(--brand)]" /> {b}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4" />
              <span>{pgContact.address}</span>
            </div>
          </div>
          <div className="relative min-h-[280px] bg-[color:var(--surface-muted)]">
            <img src={bedroomImage(data)} alt={`PG in ${data.area}`} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow?: string; title: string; sub?: string; align?: "center" | "left" }) {
  const cls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${cls}`}>
      {eyebrow && <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">{eyebrow}</span>}
      <h2 className="max-w-full break-words font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="max-w-2xl break-words text-muted-foreground">{sub}</p>}
    </div>
  );
}

// Unused but kept to avoid tree-shake warnings on imports used conditionally above.
export const _kept = { BedDouble, Users };

