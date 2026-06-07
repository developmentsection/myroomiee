import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { findTwinMicro, twinHref, twinValue } from "@/lib/cms/digital-twin";
import { useCmsSettings, useCmsTwinPage } from "@/lib/cms/store";
import { BrandLogo } from "./BrandLogo";

const parseLabelHref = (value: string, fallbackHref: string) => {
  const [label, href] = value.split("|");
  return { label: label || value, href: href || fallbackHref };
};

export function Footer() {
  const settings = useCmsSettings();
  const twin = useCmsTwinPage("footer");
  const brandName = twinValue(twin, "footer", "brand", "name", settings.brandName);
  const description = twinValue(twin, "footer", "brand", "description", settings.footerNote);
  const address = twinValue(twin, "footer", "contact", "address", settings.address ?? "");
  const phone = twinValue(twin, "footer", "contact", "phone", settings.phone);
  const phoneHref = twinHref(twin, "footer", "contact", "phone", settings.phoneHref);
  const email = twinValue(
    twin,
    "footer",
    "contact",
    "email",
    settings.email ?? "contact@myroomiee.com",
  );
  const emailHref = twinHref(twin, "footer", "contact", "email", `mailto:${email}`);
  const copyrightText = twinValue(
    twin,
    "footer",
    "bottom",
    "copyright",
    settings.copyrightText ?? "MyRoomiee. All rights reserved.",
  );
  const categoriesText = twinValue(
    twin,
    "footer",
    "bottom",
    "categories",
    settings.categoriesText ?? "Managed PG Accommodation - Premium PG Rooms - Mumbai",
  );

  const linkGroup = (componentId: string, fallbacks: { label: string; href: string }[]) =>
    fallbacks.map((item, index) => {
      const micro = findTwinMicro(twin, "footer", componentId, `item-${index + 1}`);
      return parseLabelHref(micro?.value ?? `${item.label}|${item.href}`, item.href);
    });

  const companyLinks = linkGroup("company-links", [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Locations", href: "/locations" },
  ]);
  const topLocations = linkGroup("top-locations", [
    { label: "PG in Malad East", href: "/pg-in-malad-east" },
    { label: "PG in Goregaon East", href: "/pg-in-goregaon-east" },
    { label: "PG in Jogeshwari East", href: "/pg-in-jogeshwari-east" },
  ]);
  const legalLinks = linkGroup("legal-links", [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ]);

  return (
    <footer className="border-t border-border/60 bg-[color:var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-5">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <BrandLogo className="h-10 w-10" />
            {brandName}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        </div>

        <FooterLinkGroup title="Company" links={companyLinks} />
        <FooterLinkGroup title="Top PG Locations" links={topLocations} />
        <FooterLinkGroup title="Legal" links={legalLinks} />

        <div>
          <h4 className="text-sm font-semibold">Reach Us</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4" /> <a href={phoneHref}>{phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4" /> <a href={emailHref}>{email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {copyrightText}
          </p>
          <p>{categoriesText}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((item) => (
          <li key={item.href}>
            <Link to={item.href as "/"} className="hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
