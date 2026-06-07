import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cmsPageHead } from "@/lib/cms/head";
import { twinValue } from "@/lib/cms/digital-twin";
import { useCmsTwinPage } from "@/lib/cms/store";

const fallbackFaqs = [
  {
    q: "Is brokerage really zero?",
    a: "Yes - MyRoomiee charges zero brokerage. You pay only the refundable security deposit and monthly rent.",
  },
  {
    q: "Are rooms fully furnished?",
    a: "Every room has a bed, mattress, wardrobe, AC and WiFi. Common areas include refrigerator, microwave, water purifier, gas connection and washing facilities.",
  },
  {
    q: "What is the security deposit?",
    a: "Typically 1-2 months of rent. It's fully refundable at move-out after standard inspection.",
  },
  {
    q: "Do you have lock-in?",
    a: "Most properties have a 3-month minimum stay. Specific terms are shared during your visit.",
  },
  {
    q: "What about food?",
    a: "Most properties offer healthy breakfast and dinner. Some offer fully equipped community kitchens for self-cooking.",
  },
  {
    q: "Are visitors allowed?",
    a: "Yes - visitors are allowed in common areas with prior intimation. Overnight stay policy varies by property.",
  },
  {
    q: "Do you have AC and non-AC options?",
    a: "Both. You can filter by AC on the Properties page or just ask our team.",
  },
  {
    q: "What documents are required?",
    a: "Government ID (Aadhaar/PAN), one passport photo, and a digital rental agreement signed in 5 minutes.",
  },
  {
    q: "Can I book online?",
    a: "Yes - book a free visit online, finalize on-site, and pay securely via UPI/card/netbanking.",
  },
  {
    q: "Do you serve all of Mumbai?",
    a: "We currently operate in prime Mumbai locations including Malad, Goregaon, Jogeshwari and nearby sub-areas.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fallbackFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...cmsPageHead("faqs", {
      title: "FAQ - MyRoomiee Premium PG Accommodation Mumbai",
      description:
        "Answers to common questions about MyRoomiee PG, premium PG accommodation, pricing, deposits, food, visits and policies.",
      canonical: "/faq",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  const twin = useCmsTwinPage("faqs");
  const cmsFaqs =
    twin?.sections
      .find((section) => section.id === "faqs")
      ?.components.find((component) => component.id === "items")
      ?.microComponents.filter((micro) => micro.visible)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((micro) => {
        const [q, ...answerParts] = micro.value.split("|");
        return {
          q: q || micro.name,
          a: answerParts.join("|") || micro.fallbackValue || "",
        };
      })
      .filter((item) => item.q && item.a) ?? [];
  const faqs = cmsFaqs.length ? cmsFaqs : fallbackFaqs;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
          {twinValue(twin, "faqs", "content", "eyebrow", "FAQ")}
        </p>
        <h1 className="mt-2 text-center font-display text-4xl font-bold">
          {twinValue(twin, "faqs", "content", "heading", "Frequently asked questions")}
        </h1>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
          {faqs.map((f, i) => (
            <button
              key={f.q}
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-6 py-5 text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-base font-semibold">{f.q}</span>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)] transition ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-muted-foreground"
                  >
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
