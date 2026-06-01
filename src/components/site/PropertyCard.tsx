import { Link } from "@tanstack/react-router";
import { MapPin, Train, ShieldCheck } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {p.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Verified
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background">
          {p.gender === "any" ? "Boys + Girls" : p.gender === "boys" ? "Boys" : "Girls"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold">{p.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {p.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.amenities.slice(0, 4).map((a) => (
            <span key={a} className="rounded-full bg-[color:var(--surface-muted)] px-2.5 py-1 text-xs text-muted-foreground">{a}</span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-display text-xl font-bold text-foreground">₹{p.priceFrom.toLocaleString("en-IN")}<span className="text-sm font-medium text-muted-foreground">/mo</span></p>
          </div>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Train className="h-3.5 w-3.5" /> {p.station} • {p.stationKm}km
          </p>
        </div>
      </div>
    </Link>
  );
}