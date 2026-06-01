import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Star, ArrowRight, Phone, MapPin, Train, Bus,
  ShoppingBag, Building2, GraduationCap, HeartPulse, Snowflake, Wifi, Camera,
  Sparkles, Droplet, Plug, Flame, Refrigerator, Microwave, BookOpen, Armchair,
  Box, Shirt, ChefHat, CheckCircle2, BedDouble, Users, IndianRupee,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { SiteLayout } from "./SiteLayout";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { PgLocationData, PgLandmark } from "@/lib/pg-locations";
import { pgContact } from "@/lib/pg-locations";

const amenitiesGrid = [
  { icon: Snowflake, name: "AC" }, { icon: Wifi, name: "WiFi" }, { icon: Camera, name: "CCTV" },
  { icon: Sparkles, name: "Housekeeping" }, { icon: Shirt, name: "Laundry" },
  { icon: Refrigerator, name: "Fridge" }, { icon: Microwave, name: "Microwave" },
  { icon: BookOpen, name: "Study Table" }, { icon: Armchair, name: "Chair" },
  { icon: Plug, name: "Power Backup" }, { icon: Droplet, name: "RO Water" },
  { icon: Flame, name: "Geyser" }, { icon: Box, name: "Cupboard" },
  { icon: ChefHat, name: "Meals" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const reviewAvatar = (name: string, index: number) => {
  const initial = name.trim()[0]?.toUpperCase() ?? "M";
  const colors = [
    ["#2563eb", "#60a5fa"],
    ["#0f766e", "#5eead4"],
    ["#7c3aed", "#c4b5fd"],
  ][index % 3];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${colors[0]}"/>
          <stop offset="1" stop-color="${colors[1]}"/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#g)"/>
      <circle cx="70" cy="25" r="18" fill="rgba(255,255,255,0.16)"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="700" fill="white">${initial}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

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

export function PgLocationPage({ data }: { data: PgLocationData }) {
  return (
    <SiteLayout>
      <Hero data={data} />
      <TrustStrip data={data} />
      <PgRooms data={data} />
      <AreasWeServe data={data} />
      <Amenities />
      <WhyChoose />
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
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-gradient-to-b from-[color:var(--brand-soft)] to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-12 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" />
              Verified PG • {data.area} • {data.city}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {data.headline.split(" in ")[0]} in <span className="text-gradient-brand">{data.area}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{data.subheadline}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-lift">
                Book Visit in {data.area} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={pgContact.whatsappHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-accent">
                <WhatsAppIcon className="h-4 w-4 text-muted-foreground transition group-hover:text-[#25D366]" /> WhatsApp
              </a>
              <a href={pgContact.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: data.googleRating, suffix: "★", decimals: 1, labelValue: data.googleReviews, labelSuffix: "+ reviews", label: "" },
                { value: data.propertyCount, suffix: "", decimals: 0, label: "Properties" },
                { value: data.residentCount, suffix: "+", decimals: 0, label: "Residents" },
                { value: data.startingRent, prefix: "₹", suffix: "", decimals: 0, label: "Starting / mo" },
              ].map((s) => (
                <div key={s.label || s.labelSuffix}>
                  <dt className="font-display text-2xl font-bold">
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </dt>
                  <dd className="text-xs text-muted-foreground">
                    {s.labelValue !== undefined ? <AnimatedNumber value={s.labelValue} suffix={s.labelSuffix} /> : s.label}
                  </dd>
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
  const loop = [...data.gallery, ...data.gallery];
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative min-w-0 overflow-hidden">
      <div className="pause-on-hover relative max-w-full overflow-hidden rounded-[2rem] border border-border bg-white shadow-lift">
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
          {list.map((r, i) => (
            <motion.div
              key={r.type + i}
              variants={{ hidden: { opacity: 0, y: 14, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={r.image} alt={`${r.type} PG in ${data.area}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Verified
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background">
                  {gender === "boys" ? "Boys" : "Girls"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold">{r.type}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {data.area}, {data.city}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-[color:var(--surface-muted)] px-2.5 py-1 text-xs text-muted-foreground">{a}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="font-display text-xl font-bold">₹{r.priceFrom.toLocaleString("en-IN")}<span className="text-sm font-medium text-muted-foreground">/mo</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-600">{r.available} beds available</p>
                    <Link to="/contact" className="mt-1.5 inline-flex items-center gap-1 rounded-full gradient-brand px-3 py-1.5 text-xs font-semibold text-white shadow-soft">
                      View {data.area} PG <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ---------------- AREAS WE SERVE ---------------- */
function AreasWeServe({ data }: { data: PgLocationData }) {
  if (!data.serviceAreas?.length) return null;
  const visibleAreas = data.serviceAreas.slice(0, 20);

  return (
    <section className="bg-[color:var(--surface)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          eyebrow={`Areas We Serve in ${data.area}`}
          title={`Popular Areas Near Our PGs in ${data.area}`}
          sub="Explore fully furnished PG and coliving spaces across Malad East and nearby localities with premium amenities, excellent connectivity, and zero brokerage."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5"
        >
          {visibleAreas.map((area) => (
            <motion.a
              key={area.name}
              href={area.href}
              variants={fadeUp}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-label={`View PGs in ${area.name}`}
              className="group relative flex min-h-[58px] items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-card px-3 py-3 text-center shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand)]/45 hover:shadow-lift"
            >
              <span className="pointer-events-none absolute inset-x-4 top-0 h-8 rounded-full bg-[color:var(--brand-soft)] opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />
              <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)] transition duration-300 group-hover:scale-110">
                <MapPin className="h-3.5 w-3.5 fill-current stroke-[2.4] opacity-90" />
              </span>
              <span className="relative min-w-0 truncate text-sm font-semibold text-foreground">{area.name}</span>
            </motion.a>
          ))}
        </motion.div>
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
      <SectionHead eyebrow="Amenities" title="Everything you need, included" sub="Each room and common area is loaded with premium amenities — no hidden costs." />
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
            <img src={data.gallery[3]?.src ?? data.gallery[0].src} alt={`Coliving in ${data.area}`} loading="lazy" className="h-[440px] w-full object-cover" />
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
  return (
    <section className="bg-[color:var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Gallery" title={`Inside our ${data.area} properties`} sub="Real photos of bedrooms, study areas, lounges, dining and washrooms." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {data.gallery.map((g, i) => (
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
              src={data.gallery[open].src}
              alt={data.gallery[open].alt}
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
  const [active, setActive] = useState(data.testimonials.length);
  const [paused, setPaused] = useState(false);
  const [animateTrack, setAnimateTrack] = useState(true);
  const loop = useMemo(() => [...data.testimonials, ...data.testimonials, ...data.testimonials], [data.testimonials]);
  const slideStep = loop.length > 0 ? 100 / loop.length : 0;

  useEffect(() => {
    if (paused || data.testimonials.length === 0) return;
    const timer = window.setInterval(() => setActive((current) => current + 1), 4000);
    return () => window.clearInterval(timer);
  }, [paused, data.testimonials.length]);

  useEffect(() => {
    const base = data.testimonials.length;
    if (base === 0) return;

    if (active >= base * 2 || active <= 0) {
      const timer = window.setTimeout(() => {
        setAnimateTrack(false);
        setActive(active >= base * 2 ? base : base * 2 - 1);
        window.setTimeout(() => setAnimateTrack(true), 40);
      }, 520);
      return () => window.clearTimeout(timer);
    }
  }, [active, data.testimonials.length]);

  if (data.testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHead align="left" eyebrow="Google Reviews" title={`Loved by residents in ${data.area}`} sub={`${data.googleRating}★ average • ${data.googleReviews}+ verified Google reviews`} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActive((current) => current - 1)}
            aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setActive((current) => current + 1)}
            aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden">
        <motion.div
          animate={{ x: `-${active * slideStep}%` }}
          transition={animateTrack ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          className="flex w-[900%] md:w-[450%] lg:w-[300%]"
        >
          {loop.map((t, i) => (
            <div key={`${t.name}-${i}`} className="px-2" style={{ flex: `0 0 ${100 / loop.length}%` }}>
              <article className="group flex h-full min-h-[280px] flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-[color:var(--brand)]/35 hover:shadow-lift">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={reviewAvatar(t.name, i)} alt={`${t.name} profile`} className="h-12 w-12 rounded-full shadow-soft" loading="lazy" />
                    <div>
                      <h3 className="font-display text-base font-semibold">{t.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand-soft)] px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand)]">
                    <GoogleIcon /> Verified
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <div className="flex gap-0.5 text-yellow-400">
                    {Array.from({ length: t.rating }).map((_, starIndex) => <Star key={starIndex} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">Google rating</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-[color:var(--brand)]">
                  <CheckCircle2 className="h-4 w-4" /> Google verified resident review
                </div>
              </article>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- SEO CONTENT ---------------- */
function SeoContent({ data }: { data: PgLocationData }) {
  const guideCards = useMemo(() => [
    { title: "How To Choose A PG", category: "Planning", image: data.gallery[0]?.src, body: `Compare location, safety, amenities, commute time and rent before choosing a PG in ${data.area}.` },
    { title: "Boys PG vs Girls PG", category: "Room Types", image: data.gallery[1]?.src, body: "Understand security, community, rules and comfort differences before shortlisting your stay." },
    { title: "Single Sharing vs Triple Sharing", category: "Budget", image: data.gallery[2]?.src, body: "Choose the right sharing type based on privacy needs, monthly budget and daily routine." },
    { title: "Benefits Of Fully Furnished PGs", category: "Amenities", image: data.gallery[3]?.src, body: "Move in faster with a ready bed, wardrobe, WiFi, AC, housekeeping and managed common areas." },
    { title: `Best Areas To Stay In ${data.area}`, category: "Local Guide", image: data.gallery[4]?.src, body: `Explore well-connected localities near offices, stations, markets and daily essentials in ${data.area}.` },
    { title: "Things To Check Before Booking", category: "Checklist", image: data.gallery[5]?.src, body: "Review visit quality, deposit terms, meals, security, access rules and maintenance support." },
  ], [data]);
  const [active, setActive] = useState(guideCards.length);
  const [paused, setPaused] = useState(false);
  const [animateTrack, setAnimateTrack] = useState(true);
  const loop = useMemo(() => [...guideCards, ...guideCards, ...guideCards], [guideCards]);
  const slideStep = loop.length > 0 ? 100 / loop.length : 0;

  useEffect(() => {
    if (paused || guideCards.length === 0) return;
    const timer = window.setInterval(() => setActive((current) => current + 1), 4000);
    return () => window.clearInterval(timer);
  }, [paused, guideCards.length]);

  useEffect(() => {
    const base = guideCards.length;
    if (base === 0) return;

    if (active >= base * 2 || active <= 0) {
      const timer = window.setTimeout(() => {
        setAnimateTrack(false);
        setActive(active >= base * 2 ? base : base * 2 - 1);
        window.setTimeout(() => setAnimateTrack(true), 40);
      }, 520);
      return () => window.clearTimeout(timer);
    }
  }, [active, guideCards.length]);

  return (
    <section className="bg-[color:var(--surface)] py-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead align="left" eyebrow="Accommodation Guide" title="Accommodation Guide" sub="Everything you need to know before choosing your next PG or coliving space." />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActive((current) => current - 1)}
              aria-label="Previous guide"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive((current) => current + 1)}
              aria-label="Next guide"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <motion.div
            animate={{ x: `-${active * slideStep}%` }}
            transition={animateTrack ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
            className="flex w-[1800%] md:w-[900%] lg:w-[600%]"
          >
            {loop.map((card, i) => (
              <div key={`${card.title}-${i}`} className="px-2" style={{ flex: `0 0 ${100 / loop.length}%` }}>
                <motion.article
                  className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:border-[color:var(--brand)]/35 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-muted)]">
                    <img src={card.image} alt={card.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[color:var(--brand)] shadow-soft backdrop-blur">
                      {card.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 min-h-[60px] text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                    <a href={`/${data.slug}#faq`} className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground shadow-soft transition hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)] hover:text-[color:var(--brand)] hover:shadow-lift">
                      Read More <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </motion.article>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faqs({ data }: { data: PgLocationData }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-20">
      <SectionHead eyebrow="FAQ" title={`PG in ${data.area} — frequently asked questions`} sub="Everything you wanted to know before booking your stay." />
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
              <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-lift">Book {data.area} Visit</Link>
              <a href={pgContact.whatsappHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-accent">
                <WhatsAppIcon className="h-4 w-4 text-muted-foreground transition group-hover:text-[#25D366]" /> WhatsApp Now
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
            <img src={data.gallery[0].src} alt={`PG in ${data.area}`} className="absolute inset-0 h-full w-full object-cover" />
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
      <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="max-w-2xl text-muted-foreground">{sub}</p>}
    </div>
  );
}

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0, duration = 1100 }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(value * easeOut(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  const formatted = display.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span>{prefix}{formatted}{suffix}</span>;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.7 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H2.2V17A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.9 14.2a6.7 6.7 0 0 1 0-4.3V7.1H2.2a11 11 0 0 0 0 9.8l3.7-2.7z" />
      <path fill="#EA4335" d="M12 5.3c1.6 0 3.1.6 4.2 1.7l3.2-3.2A10.8 10.8 0 0 0 12 1 11 11 0 0 0 2.2 7.1l3.7 2.8C6.8 7.2 9.2 5.3 12 5.3z" />
    </svg>
  );
}

// Unused but kept to avoid tree-shake warnings on imports used conditionally above.
export const _kept = { BedDouble, Users };
