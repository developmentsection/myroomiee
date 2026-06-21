import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[color:var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-5">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <BrandLogo className="h-8 w-8" />
            MyRoomiee
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Managed PG and furnished accommodation across Mumbai. Zero brokerage, verified properties, premium living.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/locations" className="hover:text-foreground">Locations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Top PG Locations</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pg-in-malad" className="hover:text-foreground">PG in Malad</Link></li>
            <li><Link to="/pg-in-goregaon" className="hover:text-foreground">PG in Goregaon</Link></li>
            <li><Link to="/pg-in-jogeshwari" className="hover:text-foreground">PG in Jogeshwari</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
            <li><Link to="/tenancy-policy" className="hover:text-foreground">Tenancy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Reach Us</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Flat 1005, Keshav Shiv Heights, Malad East, Mumbai 400097</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> <a href="tel:+918879779777">+91 8879779777</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> <a href="mailto:contact@myroomiee.com">contact@myroomiee.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} MyRoomiee. All rights reserved.</p>
          <p>Managed PG • PG accommodation • Furnished Accommodation • Mumbai</p>
        </div>
      </div>
    </footer>
  );
}

