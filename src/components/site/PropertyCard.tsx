import { Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, CalendarCheck, MapPin, Train } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/lib/properties";
import { safePreviewImageList } from "@/lib/pg-locations";

export function PropertyCard({ p, detailSlug = "double-sharing-room" }: { p: Property; detailSlug?: string }) {
  const previewImage = safePreviewImageList([p.image, ...(p.gallery ?? [])])[0] ?? p.image;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        to="/properties/$slug"
        params={{ slug: detailSlug }}
        search={{ location: `pg-in-${p.locationSlug}` }}
        aria-label={`View details for ${p.name}`}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft outline-none transition duration-300 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[1.18] overflow-hidden bg-[color:var(--surface-muted)]">
          <img
            src={previewImage}
            alt={`${p.name} room in ${p.location}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          />
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[color:var(--brand)] shadow-soft backdrop-blur">
            {p.availability}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight text-foreground">
              {p.name}
            </h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-[color:var(--brand)]" /> {p.location}, Mumbai
            </p>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 rounded-2xl bg-[color:var(--surface)] p-3 text-xs">
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-[color:var(--brand)]" />
              <span className="font-medium">{p.occupancyType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Train className="h-4 w-4 text-[color:var(--brand)]" />
              <span className="font-medium">{p.stationKm} km</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="font-display text-2xl font-bold text-foreground">
                Rs. {p.priceFrom.toLocaleString("en-IN")}
                <span className="text-sm font-medium text-muted-foreground">/mo</span>
              </p>
            </div>
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-brand text-white shadow-soft transition group-hover:translate-x-0.5 group-hover:shadow-lift">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>

          <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)] px-4 py-2.5 text-sm font-bold text-[color:var(--brand)]">
            <CalendarCheck className="h-4 w-4" /> View Details
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
