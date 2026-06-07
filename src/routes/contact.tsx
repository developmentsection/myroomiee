import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cmsPageHead } from "@/lib/cms/head";
import { twinValue } from "@/lib/cms/digital-twin";
import { updateCmsSnapshot, useCmsSettings, useCmsTwinPage } from "@/lib/cms/store";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () =>
    cmsPageHead("contact", {
      title: "Contact MyRoomiee - Book a Free PG Visit in Mumbai",
      description:
        "Get in touch with MyRoomiee to book a free PG visit in Mumbai. Call, WhatsApp or fill the form - we respond in 15 minutes.",
      canonical: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const settings = useCmsSettings();
  const twin = useCmsTwinPage("contact");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });
  const [saved, setSaved] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateCmsSnapshot((draft) => {
      draft.leads.unshift({
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
        source: "contact",
        name: form.name || "Website visitor",
        phone: form.phone,
        email: form.email,
        message: [form.location, form.message].filter(Boolean).join("\n"),
        status: "new",
      });
      return draft;
    });
    setSaved(true);
    openWhatsApp(
      settings.whatsappHref,
      buildWhatsAppMessage("New MyRoomiee website enquiry", [
        { label: "Name", value: form.name || "Website visitor" },
        { label: "Phone", value: form.phone },
        { label: "Email", value: form.email },
        { label: "Preferred location", value: form.location },
        { label: "Message", value: form.message },
      ]),
    );
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            {twinValue(twin, "hero", "content", "eyebrow", "Contact")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            {twinValue(twin, "hero", "content", "heading", "Book a free property visit")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {twinValue(
              twin,
              "hero",
              "content",
              "description",
              "Tell us your preferred location and budget.",
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_1fr]">
        <form
          onSubmit={submit}
          className="rounded-3xl border border-border bg-card p-7 shadow-soft"
        >
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Input
              label={twinValue(twin, "form", "fields", "name", "Full name")}
              placeholder="Your name"
              value={form.name}
              onChange={(value) => update("name", value)}
            />
            <Input
              label={twinValue(twin, "form", "fields", "phone", "Phone")}
              placeholder="+91 99999 99999"
              value={form.phone}
              onChange={(value) => update("phone", value)}
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(value) => update("email", value)}
              full
            />
            <Input
              label={twinValue(twin, "form", "fields", "location", "Preferred location")}
              placeholder="e.g. Andheri West, Powai"
              value={form.location}
              onChange={(value) => update("location", value)}
              full
            />
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {twinValue(twin, "form", "fields", "message", "Message")}
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(event) => update("message", event.currentTarget.value)}
                placeholder="Tell us your budget, move-in date and preferences"
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-full gradient-brand px-5 py-3.5 text-sm font-semibold text-white shadow-soft"
          >
            {saved
              ? "Opening WhatsApp"
              : twinValue(twin, "form", "fields", "submit", "Send Enquiry")}
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            By submitting you agree to our Privacy Policy and Terms.
          </p>
        </form>

        <div className="space-y-4">
          <Info
            icon={MapPin}
            title="Office"
            lines={["MyRoomiee HQ", settings.address ?? "Mumbai"]}
          />
          <Info
            icon={Phone}
            title="Call"
            lines={[
              <a key="p" href={settings.phoneHref}>
                {settings.phone}
              </a>,
            ]}
          />
          <Info
            icon={MessageCircle}
            title="WhatsApp"
            lines={[
              <a key="w" href={settings.whatsappHref}>
                {settings.phone}
              </a>,
            ]}
          />
          <Info
            icon={Mail}
            title="Email"
            lines={[
              <a key="m" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>,
            ]}
          />
          <Info icon={Clock} title="Hours" lines={["Mon-Sun - 9:00 AM - 9:00 PM"]} />
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Andheri+West+Mumbai&output=embed"
              className="h-[260px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  full,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function Info({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof MapPin;
  title: string;
  lines: ReactNode[];
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display font-semibold">{title}</p>
        {lines.map((line, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
