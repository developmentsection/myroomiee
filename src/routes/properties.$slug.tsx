import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BrandLogo } from "@/components/site/BrandLogo";
import { properties, propertyRoomOptions, resolvePropertyBySlug, roomOptionBySlug } from "@/lib/properties";
import { resolveLocationPage, safePreviewImageList } from "@/lib/pg-locations";
import { openWhatsAppEnquiry } from "@/lib/enquiry";
import {
  Armchair,
  BedDouble,
  Box,
  Building2,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Flame,
  Home,
  Hospital,
  MapPin,
  MessageCircle,
  Microwave,
  Phone,
  Refrigerator,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Train,
  Wifi,
} from "lucide-react";

export const Route = createFileRoute("/properties/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    location: typeof search.location === "string" ? search.location : undefined,
    property: typeof search.property === "string" ? search.property : undefined,
  }),
  loader: ({ params, location }) => {
    const search = location.search as { property?: string };
    const p = (search.property ? resolvePropertyBySlug(search.property) : undefined) ?? resolvePropertyBySlug(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} - MyRoomiee` },
          {
            name: "description",
            content: `Fully furnished AC accommodation in ${loaderData.location}, Mumbai. Master Bedroom, Common Bedroom and Hall options from Rs. ${loaderData.priceFrom.toLocaleString("en-IN")}/month.`,
          },
          { property: "og:title", content: `${loaderData.name} - MyRoomiee` },
          { property: "og:description", content: `Premium PG in ${loaderData.location} from Rs. ${loaderData.priceFrom.toLocaleString("en-IN")}/mo.` },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  component: PropertyDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Property not found</h1>
        <Link to="/properties" className="mt-6 inline-flex rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">
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

const amenityGroups = [
  {
    title: "Features / Amenities",
    items: [
      { icon: Home, name: "Fully furnished room setup" },
      { icon: Snowflake, name: "Air conditioned rooms" },
      { icon: Armchair, name: "New furniture" },
      { icon: Building2, name: "Well-ventilated rooms" },
      { icon: ShieldCheck, name: "Ready to move in" },
    ],
  },
  {
    title: "Common",
    items: [
      { icon: Wifi, name: "100 mbps internet" },
      { icon: Sparkles, name: "Daily housekeeping" },
      { icon: Camera, name: "CCTV security" },
      { icon: Droplet, name: "RO drinking water" },
      { icon: Phone, name: "Responsive property support" },
    ],
  },
  {
    title: "Kitchen",
    items: [
      { icon: Home, name: "Modular kitchen" },
      { icon: Microwave, name: "Microwave oven" },
      { icon: Refrigerator, name: "Refrigerator" },
      { icon: Shirt, name: "Washing machine" },
      { icon: Droplet, name: "Water purifier" },
      { icon: Flame, name: "Gas connection / electric induction" },
    ],
  },
  {
    title: "Rooms",
    items: [
      { icon: BedDouble, name: "Personal beds" },
      { icon: Box, name: "Personal wardrobes" },
      { icon: ShieldCheck, name: "Ortho-bond mattresses" },
      { icon: Armchair, name: "Side table with charging points" },
      { icon: Sparkles, name: "Bedsheet and pillows available on request" },
    ],
  },
];

const policySections = [
  {
    title: "Living Guidelines",
    body: "Residents are expected to keep rooms and common areas clean, respect fellow residents, avoid excessive noise and use shared amenities responsibly.",
  },
  {
    title: "Visitor Policy",
    body: "Visitors are allowed only with property manager approval and only during permitted visiting hours. Overnight stays by visitors are not allowed unless approved in writing.",
  },
  {
    title: "Safety and Verification",
    body: "Government ID, emergency contact details and basic resident verification are required before move-in. MyRoomiee properties include secure entry and CCTV-monitored common areas wherever available.",
  },
  {
    title: "Package Inclusions",
    body: "Standard packages include furnished rooms, air conditioning, WiFi, housekeeping support, RO drinking water and access to shared kitchen facilities as available at the property.",
  },
  {
    title: "Package Exclusions",
    body: "Food, meals, personal electricity usage, personal laundry, damage charges and optional vendor services are not included in any MyRoomiee package unless confirmed by the manager in writing.",
  },
  {
    title: "Payments and Deposit",
    body: "Rent, token amount, refundable security deposit and electricity terms are confirmed by the property manager before move-in. Receipts and payment confirmation should be kept by the resident.",
  },
  {
    title: "Exit Notice and Refund",
    body: "Residents should follow the notice period confirmed for the selected property. Refunds, deductions and final settlement are processed after room handover and pending dues are checked.",
  },
  {
    title: "Rules During Stay",
    body: "Illegal activities, property damage, nuisance, misuse of amenities and behavior that affects resident safety are not permitted at any MyRoomiee property.",
  },
];

function PropertyDetail() {
  const p = Route.useLoaderData();
  const params = Route.useParams();
  const search = Route.useSearch();
  return <PropertyDetailView p={p} routeSlug={params.slug} locationSlug={search.location} />;
}

export function PropertyDetailView({
  p,
  routeSlug,
  locationSlug,
}: {
  p: (typeof properties)[number];
  routeSlug?: string;
  locationSlug?: string;
}) {
  const locationData = locationSlug ? resolveLocationPage(locationSlug) : undefined;
  const roomTypes = propertyRoomOptions(p);
  const activeRoom = roomOptionBySlug(p, routeSlug);
  const area = locationData?.area ?? p.location;
  const station = locationData?.station ?? p.station;
  const stationKm = locationData?.landmarks?.[0]?.distanceKm ?? p.stationKm;
  const displayRent = activeRoom?.price ?? p.priceFrom;
  const locationSearch: { location: string | undefined; property: string | undefined } = {
    location: locationSlug,
    property: p.slug,
  };
  const allImages = useMemo(() => Array.from(new Set([p.image, ...(p.gallery ?? [])].filter(Boolean))), [p.gallery, p.image]);
  const safeFrontImages = safePreviewImageList(allImages);
  const gallery = [...safeFrontImages, ...allImages.filter((image) => !safeFrontImages.includes(image))];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const mainImage = selectedImage && gallery.includes(selectedImage) ? selectedImage : (gallery[0] ?? p.image);
  const activePreviewImage = gallery[previewIndex] ?? mainImage;
  const openPreview = () => {
    setPreviewIndex(Math.max(0, gallery.indexOf(mainImage)));
    setPreviewOpen(true);
  };
  const showPreviewImage = (index: number) => {
    const nextIndex = (index + gallery.length) % gallery.length;
    setPreviewIndex(nextIndex);
    setSelectedImage(gallery[nextIndex]);
  };
  const displayName = p.name;
  const nearbyItems = [
    { icon: Train, label: `${station} Station`, dist: `${stationKm} km` },
    { icon: Building2, label: "Colleges and offices", dist: "Easy daily commute" },
    { icon: Hospital, label: "Hospitals and clinics", dist: "Nearby access" },
    { icon: ShoppingBag, label: "Markets and essentials", dist: "Close to property" },
  ];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <Link to="/properties" className="text-sm text-muted-foreground hover:text-foreground">
          Back to properties
        </Link>

        <div className="mt-6 grid min-w-0 gap-9 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="order-1 min-w-0">
            <div className="relative overflow-hidden rounded-3xl bg-[color:var(--surface-muted)]">
              <img src={mainImage} alt={displayName} className="h-[320px] w-full object-cover sm:h-[380px] md:h-[520px]" />
              <button type="button" onClick={openPreview} className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold shadow-soft">
                Preview all
              </button>
            </div>
            <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedImage(g)}
                  className={`h-20 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-36 ${mainImage === g ? "ring-2 ring-[color:var(--brand)]" : "ring-1 ring-border"}`}
                  aria-label={`Show ${displayName} image ${i + 1}`}
                >
                  <img src={g} alt={`${displayName} thumbnail ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <aside className="order-2 min-w-0 h-fit space-y-4 rounded-3xl border border-border bg-card p-5 shadow-lift sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-sm font-bold text-[color:var(--brand)]">
              <MapPin className="h-4 w-4" /> {area}, Mumbai
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{displayName}</h1>
            <div>
              <p className="font-display text-3xl font-bold sm:text-4xl">
                Rs. {displayRent.toLocaleString("en-IN")}
                <span className="text-base font-medium text-muted-foreground"> /month onwards</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Zero brokerage. Free property visit.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[color:var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Occupancy</p>
                <p className="mt-1 font-semibold">{activeRoom?.label ?? p.occupancyType}</p>
              </div>
              <div className="rounded-2xl bg-[color:var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Station</p>
                <p className="mt-1 font-semibold">{stationKm} km</p>
              </div>
              <div className="rounded-2xl bg-[color:var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Options</p>
                <p className="mt-1 font-semibold">{roomTypes.map((room) => room.label).join(", ")}</p>
              </div>
              <div className="rounded-2xl bg-[color:var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Support</p>
                <p className="mt-1 font-semibold">24x7 assistance</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Choose as per requirement</p>
              {roomTypes.map((room) => (
                <Link
                  key={room.label}
                  to="/properties/$slug"
                  params={{ slug: room.slug }}
                  search={locationSearch}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-3 text-sm transition hover:bg-accent ${
                    activeRoom?.slug === room.slug ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]" : "border-border"
                  }`}
                >
                  <span>
                    <span className="block font-bold">{room.label}</span>
                    <span className="text-xs text-muted-foreground">Managed furnished room option</span>
                  </span>
                  <span className="font-bold">Rs. {room.price.toLocaleString("en-IN")}</span>
                </Link>
              ))}
            </div>

            <Link to="/contact" className="block rounded-full gradient-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-soft">
              Schedule Free Visit
            </Link>
            <a href="https://wa.me/918879779777" className="block rounded-full border border-border px-5 py-3 text-center text-sm font-semibold hover:bg-accent">
              <MessageCircle className="-mt-0.5 mr-1 inline h-4 w-4 text-[#25D366]" /> WhatsApp
            </a>
            <a href="tel:+918879779777" className="block rounded-full border border-border px-5 py-3 text-center text-sm font-semibold hover:bg-accent">
              <Phone className="-mt-0.5 mr-1 inline h-4 w-4" /> Call Now
            </a>
            <div className="rounded-2xl bg-[color:var(--surface)] p-3 text-xs text-muted-foreground">
              Final rent, deposit and room allocation are confirmed by the property manager after the visit.
            </div>
          </aside>
        </div>

        <div className="mt-8 lg:mt-12">
          <HighlightsSection />
        </div>

        <div className="mt-14 space-y-14">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Description</p>
            <h2 className="mt-2 font-display text-3xl font-bold">About this property</h2>
            <p className="mt-4 max-w-4xl text-muted-foreground">
              {displayName} offers managed PG accommodation in {area} for students and working professionals who want a clean, secure and fully furnished place to stay. The room options include {roomTypes.map((room) => room.label).join(", ")} and are supported by WiFi, housekeeping and responsive local assistance.
            </p>
          </section>

          <FeatureAmenityList />

          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Nearby</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Nearby places</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyItems.map((n) => (
                <div key={n.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <n.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Location</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Map</h2>
            <div className="mt-5 overflow-hidden rounded-3xl border border-border">
              <iframe title="Map" src={`https://www.google.com/maps?q=${encodeURIComponent(`${area} Mumbai`)}&output=embed`} className="h-[360px] w-full" loading="lazy" />
            </div>
          </section>

          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <PropertyPolicySection />
            <ContactManagerCard propertyName={displayName} area={area} room={activeRoom?.label} />
          </div>

          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Similar</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Similar room options</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {roomTypes.map((room) => (
                <Link
                  key={room.label}
                  to="/properties/$slug"
                  params={{ slug: room.slug }}
                  search={locationSearch}
                  className={`rounded-2xl border p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift ${
                    activeRoom?.slug === room.slug ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)]" : "border-border bg-card"
                  }`}
                >
                  <p className="text-sm font-semibold">{room.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold">
                    Rs. {room.price.toLocaleString("en-IN")}
                    <span className="text-sm font-medium text-muted-foreground">/mo</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Includes AC, WiFi and housekeeping. Food is not included.</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
      {previewOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label={`${displayName} gallery preview`}>
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/80 p-3 text-white shadow-lift">
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-bold text-white">{displayName} gallery</p>
                <p className="text-sm font-semibold text-white/80">
                  {previewIndex + 1} / {gallery.length}
                </p>
              </div>
              <button type="button" onClick={() => setPreviewOpen(false)} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-slate-950 shadow-soft hover:bg-white/90">
                Close
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={() => showPreviewImage(previewIndex - 1)}
                  className="absolute left-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 sm:left-3"
                  aria-label="Show previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              <img src={activePreviewImage} alt={`${displayName} gallery image ${previewIndex + 1}`} className="max-h-[72vh] w-full max-w-5xl rounded-2xl object-contain shadow-lift" />
              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={() => showPreviewImage(previewIndex + 1)}
                  className="absolute right-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 sm:right-3"
                  aria-label="Show next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => showPreviewImage(index)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-white/10 ${previewIndex === index ? "ring-2 ring-white" : "ring-1 ring-white/20"}`}
                  aria-label={`Preview ${displayName} image ${index + 1}`}
                >
                  <img src={image} alt={`${displayName} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function HighlightsSection() {
  const items = [
    { icon: Home, label: "Fully Furnished", value: "Ready to Move In" },
    { icon: Wifi, label: "AC + WiFi", value: "Included in Rent" },
    { icon: Sparkles, label: "Daily", value: "Housekeeping Service" },
    { icon: ShieldCheck, label: "Zero", value: "Brokerage Fees" },
  ];

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Highlights</p>
      <h2 className="mt-2 font-display text-3xl font-bold">Built for everyday comfort</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
              <item.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-lg font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureAmenityList() {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Amenities</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Features and amenities</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-bold">
          <BrandLogo className="h-8 w-8" />
          MyRoomiee
        </div>
      </div>

      <div className="no-scrollbar mt-6 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0">
        {amenityGroups.map((group) => (
          <div key={group.title} className="w-[82vw] shrink-0 rounded-2xl border border-border bg-background p-5 shadow-soft sm:w-[360px] md:w-auto md:shrink">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="pt-1">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function PropertyPolicySection() {
  return (
    <section>
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Rules</p>
        <h2 className="mt-2 font-display text-3xl font-bold">House Rules and Stay Guidelines</h2>
        <p className="mt-3 text-muted-foreground">
          These MyRoomiee guidelines keep every property clean, safe and comfortable for residents. Exact property terms are confirmed before move-in.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {policySections.map((section) => (
          <details key={section.title} className="group rounded-2xl border border-border bg-background shadow-soft transition open:border-[color:var(--brand)]/30 open:bg-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-foreground">
              <span className="inline-flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                {section.title}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
            </summary>
            <p className="border-t border-border px-5 py-4 text-sm leading-6 text-muted-foreground">{section.body}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactManagerCard({ propertyName, area, room }: { propertyName: string; area: string; room?: string }) {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsAppEnquiry({
      Source: "Property detail page",
      Property: propertyName,
      Area: area,
      Room: room,
      Name: String(form.get("name") ?? ""),
      Phone: String(form.get("phone") ?? ""),
      "Visit Date": String(form.get("visitDate") ?? ""),
      Message: String(form.get("message") ?? ""),
    });
    setStatus("Opening WhatsApp with your inquiry details.");
  };

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">Contact</p>
      <h2 className="mt-2 font-display text-3xl font-bold">Talk to the property manager</h2>
      <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-lift">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-14 w-14" />
          <div>
            <p className="text-lg font-bold">MyRoomiee Support</p>
            <p className="text-sm text-muted-foreground">Property Manager</p>
            <p className="font-bold">+91 8879779777</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <input name="name" required className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Your name" />
          <input name="phone" required className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Phone number" />
          <input name="visitDate" className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Preferred visit date" />
          <textarea name="message" rows={3} className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm" placeholder="Message" />
          <button type="submit" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-soft">Send Inquiry</button>
          {status && <p className="rounded-xl bg-[color:var(--brand-soft)] px-3 py-2 text-xs font-semibold text-[color:var(--brand)]">{status}</p>}
        </form>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <a href="https://wa.me/918879779777" className="rounded-full border border-border px-5 py-3 text-center text-sm font-semibold hover:bg-accent">
            <MessageCircle className="-mt-0.5 mr-1 inline h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
          <a href="tel:+918879779777" className="rounded-full border border-border px-5 py-3 text-center text-sm font-semibold hover:bg-accent">
            <Phone className="-mt-0.5 mr-1 inline h-4 w-4" /> Call
          </a>
        </div>
      </div>
    </section>
  );
}
