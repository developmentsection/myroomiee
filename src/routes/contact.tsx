import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { openWhatsAppEnquiry } from "@/lib/enquiry";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MyRoomiee — Book a Free PG Visit in Mumbai" },
      { name: "description", content: "Get in touch with MyRoomiee to book a free PG visit in Mumbai. Call, WhatsApp or fill the form — we respond in 15 minutes." },
      { property: "og:title", content: "Contact MyRoomiee" },
      { property: "og:description", content: "Book a free PG visit in Mumbai." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsAppEnquiry({
      Source: "Contact page",
      Name: String(form.get("name") ?? ""),
      Phone: String(form.get("phone") ?? ""),
      Email: String(form.get("email") ?? ""),
      Location: String(form.get("location") ?? ""),
      Message: String(form.get("message") ?? ""),
    });
    setStatus("Opening WhatsApp with your enquiry details.");
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Talk to a property manager</h1>
          <p className="mt-4 text-muted-foreground">We respond within 15 minutes during business hours.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_1fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Input label="Full name" name="name" placeholder="Your name" required />
            <Input label="Phone" name="phone" placeholder="+91 8879779777" required />
            <Input label="Email" name="email" type="email" placeholder="you@example.com" full />
            <Input label="Preferred location" name="location" placeholder="e.g. Andheri West, Powai" full required />
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</label>
              <textarea name="message" rows={4} placeholder="Tell us your budget, move-in date and preferences" className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
            </div>
          </div>
          <button type="submit" className="mt-5 w-full rounded-full gradient-brand px-5 py-3.5 text-sm font-semibold text-white shadow-soft">Request callback</button>
          {status && <p className="mt-3 rounded-xl bg-[color:var(--brand-soft)] px-3 py-2 text-xs font-semibold text-[color:var(--brand)]">{status}</p>}
          <p className="mt-3 text-xs text-muted-foreground">By submitting you agree to our Privacy Policy and Terms.</p>
        </form>

        <div className="space-y-4">
          <Info icon={MapPin} title="Office" lines={["MyRoomiee HQ", "Flat No. 1005, Keshav Shiv Heights, Malad East, Mumbai 400097"]} />
          <Info icon={Phone} title="Call" lines={[<a key="p" href="tel:+918879779777">+91 8879779777</a>]} />
          <Info icon={MessageCircle} title="WhatsApp" lines={[<a key="w" href="https://wa.me/918879779777">+91 8879779777</a>]} />
          <Info icon={Mail} title="Email" lines={[<a key="m" href="mailto:contact@myroomiee.com">contact@myroomiee.com</a>]} />
          <Info icon={Clock} title="Hours" lines={["Mon–Sun • 9:00 AM – 9:00 PM"]} />
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe title="Map" src="https://www.google.com/maps?q=Keshav+Shiv+Heights+Malad+East+Mumbai&output=embed" className="h-[260px] w-full" loading="lazy" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({
  label,
  name,
  placeholder,
  full,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  full?: boolean;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
    </div>
  );
}

function Info({ icon: Icon, title, lines }: { icon: typeof MapPin; title: string; lines: ReactNode[] }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]"><Icon className="h-5 w-5" /></span>
      <div>
        <p className="font-display font-semibold">{title}</p>
        {lines.map((l, i) => <p key={i} className="text-sm text-muted-foreground">{l}</p>)}
      </div>
    </div>
  );
}
