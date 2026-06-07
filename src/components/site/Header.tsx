import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useCmsSettings, useCmsTwinPage } from "@/lib/cms/store";
import { twinHref, twinValue } from "@/lib/cms/digital-twin";
import { BrandLogo } from "./BrandLogo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const settings = useCmsSettings();
  const twin = useCmsTwinPage("header");
  const brandName = twinValue(twin, "header", "brand", "name", settings.brandName);
  const callHref = twinHref(twin, "header", "cta-group", "phone", settings.phoneHref);
  const callLabel = twinValue(twin, "header", "cta-group", "phone", "Call");
  const visitHref = twinHref(twin, "header", "cta-group", "primary", "/contact");
  const visitLabel = twinValue(twin, "header", "cta-group", "primary", settings.primaryCtaText);
  const navItems = nav.map((item) => ({
    ...item,
    label: twinValue(twin, "header", "navigation", item.label.toLowerCase(), item.label),
    to: twinHref(twin, "header", "navigation", item.label.toLowerCase(), item.to),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <BrandLogo className="h-10 w-10" />
          <span>{brandName}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to as "/"}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={callHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent"
          >
            <Phone className="h-4 w-4" /> {callLabel}
          </a>
          <Link
            to={visitHref as "/contact"}
            className="rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-lift"
          >
            {visitLabel}
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to as "/"}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to={visitHref as "/contact"}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              {visitLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
