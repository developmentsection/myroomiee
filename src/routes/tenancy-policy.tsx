import { createFileRoute } from "@tanstack/react-router";
import { Accordion } from "@/components/legal/Accordion";
import { PageHeader } from "@/components/legal/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { tenancyPolicySections } from "@/content/tenancy-policy";

export const Route = createFileRoute("/tenancy-policy")({
  head: () => ({
    meta: [
      { title: "Tenancy Policy - MyRoomiee" },
      {
        name: "description",
        content:
          "Read the complete MyRoomiee tenancy policy covering booking, rent, security deposit, documentation, refund, exit notice, utilities and rules during stay.",
      },
      { property: "og:title", content: "Tenancy Policy - MyRoomiee" },
      {
        property: "og:description",
        content: "Complete tenancy policy for MyRoomiee accommodation residents.",
      },
    ],
    links: [{ rel: "canonical", href: "/tenancy-policy" }],
  }),
  component: TenancyPolicyPage,
});

function TenancyPolicyPage() {
  return (
    <SiteLayout>
      <main>
        <PageHeader
          eyebrow="Policy"
          title="Tenancy Policy"
          subtitle="Please read these policies carefully before booking or moving into any MyRoomiee accommodation."
        />

        <section className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-5 sm:py-14 lg:py-16" aria-label="Tenancy policy sections">
          <Accordion sections={tenancyPolicySections} />
        </section>
      </main>
    </SiteLayout>
  );
}
