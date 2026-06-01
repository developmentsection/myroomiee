import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Is brokerage really zero?", a: "Yes — MyRoomiee charges zero brokerage. You pay only the refundable security deposit and monthly rent." },
  { q: "Are rooms fully furnished?", a: "Every room has a bed, mattress, wardrobe, study desk, chair, AC and WiFi. Common areas include fridge, microwave, RO water, gas stove and washing facilities." },
  { q: "What is the security deposit?", a: "Typically 1–2 months of rent. It's fully refundable at move-out after standard inspection." },
  { q: "Do you have lock-in?", a: "Most properties have a 3-month minimum stay. Specific terms are shared during your visit." },
  { q: "What about food?", a: "Most properties offer healthy breakfast and dinner. Some offer fully equipped community kitchens for self-cooking." },
  { q: "Are visitors allowed?", a: "Yes — visitors are allowed in common areas with prior intimation. Overnight stay policy varies by property." },
  { q: "Do you have AC and non-AC options?", a: "Both. You can filter by AC on the Properties page or just ask our team." },
  { q: "What documents are required?", a: "Government ID (Aadhaar/PAN), one passport photo, and a digital rental agreement signed in 5 minutes." },
  { q: "Can I book online?", a: "Yes — book a free visit online, finalize on-site, and pay securely via UPI/card/netbanking." },
  { q: "Do you serve all of Mumbai?", a: "We currently operate in 42 prime Mumbai locations including Andheri, Bandra, Powai, Thane, Lower Parel, Navi Mumbai and more." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MyRoomiee PG & Coliving Mumbai" },
      { name: "description", content: "Answers to common questions about MyRoomiee PG, coliving, pricing, deposits, food, visits and policies." },
      { property: "og:title", content: "FAQ — MyRoomiee" },
      { property: "og:description", content: "Common questions about MyRoomiee PG and coliving." },
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