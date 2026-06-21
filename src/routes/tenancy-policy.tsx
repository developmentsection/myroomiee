  import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

const sections = [
  {
    title: "Booking Policy",
    body: "MyRoomiee does not provide instant online room booking. The website is used for inquiry, WhatsApp/call communication and free visit scheduling. A room is considered confirmed only after the property manager verifies availability, explains rent and deposit, completes required checks and receives the agreed payment.",
  },
  {
    title: "General Policy",
    body: "All residents must follow property rules, respect other residents, maintain cleanliness and use shared facilities responsibly. MyRoomiee may update property-specific rules based on safety, maintenance, society requirements or operational needs.",
  },
  {
    title: "Package Inclusion",
    body: "A MyRoomiee room package may include furnished bed, mattress, wardrobe, study table, chair, WiFi, air conditioned room options, CCTV security, RO drinking water, housekeeping and access to selected common appliances depending on the property. Exact inclusions must be confirmed during the visit.",
  },
  {
    title: "Package Exclusions",
    body: "Food or meals are not included in any MyRoomiee package. Parking, personal electricity usage, personal laundry, damages, personal consumables and any optional vendor services are not included unless the property manager confirms them in writing.",
  },
  {
    title: "Documentation",
    body: "Residents must submit valid government ID, recent photograph, emergency contact details and any additional documents requested for resident verification. Incomplete or incorrect documents may delay or cancel move-in.",
  },
  {
    title: "Agreement, Police Verification and C-Form",
    body: "Where applicable, residents must cooperate for rental documentation, police verification, society entry formalities and C-Form requirements. MyRoomiee may deny occupancy if mandatory verification is not completed.",
  },
  {
    title: "Token Payment Terms",
    body: "Any token amount is collected only after manager discussion and availability confirmation. Token terms, validity, adjustment and refundability must be clearly confirmed before payment because rules may differ by property and room type.",
  },
  {
    title: "Rental Payment Terms",
    body: "Monthly rent must be paid on or before the due date shared by the property manager. Late payment may attract reminders, penalties or restriction of services as per property rules.",
  },
  {
    title: "Security Deposit Terms",
    body: "Security deposit is refundable subject to notice period, pending rent, unpaid bills, property damage, missing items, cleaning charges and proper handover of keys or access cards. Deposit amount differs by property and room type.",
  },
  {
    title: "Electricity Bill Payment Terms",
    body: "Electricity billing depends on the property. Some rooms may include standard electricity usage while others may charge actual usage or excess usage separately. Residents must confirm the electricity policy before move-in.",
  },
  {
    title: "Payment Terms",
    body: "Payments should be made only through approved methods shared by the MyRoomiee manager. Residents should keep payment proof and must not make payments to unverified third parties.",
  },
  {
    title: "Exit Notice",
    body: "Residents must provide exit notice as per the agreed notice period. Early exit, insufficient notice or sudden move-out may affect deposit refund or final settlement.",
  },
  {
    title: "Refund Terms",
    body: "Refunds, if applicable, are processed after room inspection, dues clearance and final account settlement. Refund timelines may vary depending on banking process and completion of handover formalities.",
  },
  {
    title: "Rules to be followed during Stay",
    body: "Residents must avoid loud noise, unauthorized visitors, damage to property, misuse of common areas, illegal activity and behavior that disturbs others. Violation of rules may lead to warning, penalty or termination of stay.",
  },
];

export const Route = createFileRoute("/tenancy-policy")({
  head: () => ({
    meta: [
      { title: "Tenancy Policy - MyRoomiee" },
      { name: "description", content: "MyRoomiee tenancy policy for PG accommodation in Mumbai, including visits, room selection, rent, deposit, food policy, amenities and house rules." },
      { property: "og:title", content: "Tenancy Policy - MyRoomiee" },
      { property: "og:description", content: "Rules and policy for MyRoomiee residents." },
    ],
    links: [{ rel: "canonical", href: "/tenancy-policy" }],
  }),
  component: TenancyPolicyPage,
});

function TenancyPolicyPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Policy</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Tenancy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last Updated: June 21, 2026</p>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          This tenancy policy explains how MyRoomiee manages inquiries, property visits, room selection, resident verification, rent, deposits and stay rules for PG accommodation in Mumbai. Please read it carefully before confirming a room.
        </p>

        <div className="mt-10 space-y-5">
          {sections.map((section, index) => (
            <section key={section.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold">
                {index + 1}. {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-border bg-[color:var(--surface)] p-6">
          <h2 className="font-display text-xl font-semibold">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            For questions about rent, deposit, room rules, move-in or move-out, contact MyRoomiee before making a payment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="tel:+918879779777" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">Call +91 8879779777</a>
            <Link to="/contact" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Send Inquiry</Link>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}
