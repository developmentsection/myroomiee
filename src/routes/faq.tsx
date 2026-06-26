import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Is brokerage really zero?", a: "Yes. MyRoomiee charges zero brokerage. You pay only the refundable security deposit and monthly rent." },
  { q: "Are rooms fully furnished?", a: "Every room has a bed, mattress, wardrobe, study desk, chair, WiFi and air conditioned options. Common areas include practical shared facilities such as RO water, microwave, refrigerator and washing access where available." },
  { q: "What is the security deposit?", a: "The security deposit depends on the property and room type. Our manager confirms the exact rent and deposit before you make any payment decision." },
  { q: "Do you have lock-in?", a: "Minimum stay and notice period vary by property. Specific terms are shared clearly during your visit and confirmation process." },
  { q: "Is food included?", a: "No. MyRoomiee does not include food in any package. Residents can arrange it separately as per their routine, taste and budget." },
  { q: "Are visitors allowed?", a: "Visitor rules vary by property and must be followed as per the property manager's instructions. Overnight visitor stays are not automatically allowed." },
  { q: "Do you have AC and non-AC options?", a: "Yes. You can ask for air conditioned Master Bedroom, Common Bedroom or Hall options." },
  { q: "What documents are required?", a: "Usually a government ID, one photo and basic verification details are required. The exact checklist is confirmed by the manager." },
  { q: "Can I book online?", a: "No. The website is for inquiry and visit scheduling. Final room selection, rent, deposit and move-in are confirmed with the MyRoomiee property manager." },
  { q: "Do you serve all of Mumbai?", a: "We focus on key Mumbai PG locations including Malad, Goregaon, Jogeshwari and nearby areas, with more locations added as inventory is verified." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - MyRoomiee PG Mumbai" },
      { name: "description", content: "Answers to common questions about MyRoomiee PG accommodation, pricing, deposits, visits, food policy and room options." },
      { property: "og:title", content: "FAQ - MyRoomiee" },
      { property: "og:description", content: "Common questions about MyRoomiee PG accommodation." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">FAQ</p>
        <h1 className="mt-2 text-center font-display text-4xl font-bold">Frequently asked questions</h1>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
          {faqs.map((f, i) => (
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
    </SiteLayout>
  );
}
