import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cmsPageHead } from "@/lib/cms/head";
import { twinValue } from "@/lib/cms/digital-twin";
import { useCmsTwinPage } from "@/lib/cms/store";

export const Route = createFileRoute("/terms")({
  head: () =>
    cmsPageHead("terms", {
      title: "Terms & Conditions - MyRoomiee",
      description: "Terms governing the use of MyRoomiee's website, properties and services.",
      canonical: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  const twin = useCmsTwinPage("terms");

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-4xl font-bold">
          {twinValue(twin, "article", "content", "heading", "Terms & Conditions")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {twinValue(twin, "article", "content", "updated", "Last Updated: May 28, 2026")}
        </p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Welcome to My Roomiee ("Company", "we", "our", or "us"). These Terms & Conditions
            ("Terms") govern your access to and use of our website https://myroomiee.com/, services,
            inquiries, communication channels, and related platforms (collectively referred to as
            the "Platform"). By accessing, browsing, using, or submitting information through the
            Platform, you acknowledge that you have read, understood, and agreed to be bound by
            these Terms & Conditions, our Privacy Policy, and all applicable laws and regulations.
            If you do not agree with these Terms, you must discontinue use of the Platform
            immediately.
          </p>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              1. About My Roomiee
            </h2>
            <p>
              My Roomiee is a Mumbai-based accommodation and PG discovery platform that provides
              information regarding furnished PG accommodation, rental stays, premium PG rooms, and
              related housing services in Mumbai including Malad, Goregaon, Jogeshwari, and nearby
              areas. The Platform allows users to browse accommodation information, submit
              accommodation inquiries, contact property representatives, request room availability,
              learn about amenities and pricing, and connect regarding accommodation services. My
              Roomiee operates as a genuine accommodation service platform and strives to provide
              accurate and updated information regarding listed properties and accommodation
              facilities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">2. Eligibility</h2>
            <p>By using the Platform, you confirm that:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You are at least 18 years old;</li>
              <li>You are legally capable of entering into binding agreements;</li>
              <li>The information provided by you is accurate and complete;</li>
              <li>You will use the Platform in accordance with applicable laws.</li>
            </ul>
            <p>
              Users under 18 years of age must not use the Platform without appropriate parental or
              legal guardian supervision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              3. User Responsibilities
            </h2>
            <p>Users agree:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>To provide genuine and accurate information;</li>
              <li>Not to misuse the Platform;</li>
              <li>Not to submit false inquiries or spam requests;</li>
              <li>Not to attempt unauthorized access to the Platform;</li>
              <li>Not to use the Platform for unlawful or fraudulent activities;</li>
              <li>Not to interfere with the operation or security of the Platform.</li>
            </ul>
            <p>
              Users are solely responsible for the accuracy of information submitted, communication
              made through the Platform, and any agreements or arrangements entered into with
              accommodation providers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              4. Accommodation Information
            </h2>
            <p>
              My Roomiee attempts to ensure that property descriptions, amenities, room
              availability, pricing, photographs, and other accommodation-related details are
              reasonably accurate. However, availability may change without notice; prices may vary;
              amenities may differ from actual conditions; and certain photographs may be
              representative in nature. Users are advised to independently verify rent, deposit
              amount, amenities, property condition, rules and restrictions, and safety and
              suitability before making any payment or accommodation decision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              5. No Guarantee of Availability
            </h2>
            <p>
              Submission of an inquiry through the Platform does not guarantee room availability,
              reservation confirmation, booking acceptance, or accommodation allotment.
              Accommodation allocation is subject to availability, owner/management approval,
              verification processes, internal policies, and operational requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              6. Communication Consent
            </h2>
            <p>
              By submitting your contact details through the Platform, you expressly consent to
              receiving communication from My Roomiee through calls, SMS, WhatsApp, email, and
              notifications. These communications may include accommodation recommendations, service
              updates, booking-related discussions, promotional offers, and customer support
              communication. Users may opt out of promotional communication by contacting us
              directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              7. Booking & Payments
            </h2>
            <p>
              Any booking, reservation, deposit payment, or rental agreement entered into between
              users and accommodation providers shall be governed by mutually agreed terms between
              the respective parties. My Roomiee may assist with inquiries and communication but
              shall not be liable for disputes between parties, refund disagreements, rental
              conflicts, security deposit issues, accommodation dissatisfaction, or personal
              disagreements between occupants. Users are advised to review all terms carefully,
              verify accommodation details independently, and maintain written payment records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              8. Pricing Disclaimer
            </h2>
            <p>
              Prices displayed on the Platform may vary depending on room type, occupancy,
              availability, seasonal demand, management decisions, and property-specific conditions.
              My Roomiee reserves the right to update, modify, or remove pricing information without
              prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              9. Third-Party Services
            </h2>
            <p>
              The Platform may contain links or references to third-party services including payment
              providers, maps, social media platforms, analytics tools, and external websites. My
              Roomiee does not control or guarantee the services, policies, or practices of
              third-party platforms. Users access third-party services at their own discretion and
              risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              10. Intellectual Property Rights
            </h2>
            <p>
              All content available on the Platform including text, graphics, logos, design,
              photographs, branding, layouts, website structure, and content arrangement is the
              property of My Roomiee unless otherwise stated and is protected under applicable
              intellectual property laws. Users may not reproduce, copy, distribute, modify,
              republish, or commercially exploit any content from the Platform without prior written
              permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              11. Prohibited Activities
            </h2>
            <p>
              Users shall not impersonate another individual or organization, submit misleading
              information, use automated systems or bots, upload malicious software, attempt
              unauthorized access, disrupt website operations, or use the Platform for illegal
              activities. Any misuse may result in suspension of access, blocking of inquiries, or
              legal action where applicable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              12. Platform Availability
            </h2>
            <p>
              We strive to maintain uninterrupted Platform availability. However, My Roomiee does
              not guarantee continuous uptime, error-free operation, uninterrupted access, or
              complete accuracy of information. The Platform may occasionally become unavailable due
              to maintenance, technical failures, server downtime, upgrades, or circumstances beyond
              our control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              13. User-Generated Content
            </h2>
            <p>
              Users may voluntarily submit reviews, comments, feedback, inquiry details,
              testimonials, images, and communication content through the Platform or associated
              communication channels. By submitting such content, you grant My Roomiee a
              non-exclusive, royalty-free, worldwide right to use, reproduce, publish, display,
              modify, and distribute such content for operational, marketing, promotional, and
              service-related purposes.
            </p>
            <p>
              Users agree not to submit content that is unlawful, abusive, defamatory, misleading,
              offensive, fraudulent, infringes intellectual property rights, or violates applicable
              laws. My Roomiee reserves the right to remove or restrict content at its discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              14. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted under applicable law, My Roomiee, its owners,
              employees, representatives, affiliates, partners, and service providers shall not be
              liable for direct or indirect losses, accommodation disputes, property conditions,
              rental disagreements, payment disputes, data loss, service interruptions, user
              dissatisfaction, technical failures, unauthorized access, third-party actions,
              personal injury, theft or property damage, inaccuracies in listings, or decisions made
              based on Platform content. Users acknowledge that accommodation decisions are made at
              their own discretion and risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              15. Disclaimer of Warranties
            </h2>
            <p>
              The Platform and services are provided on an "as is" and "as available" basis without
              warranties of any kind, whether express or implied. My Roomiee does not guarantee
              uninterrupted service, complete accuracy, error-free operation, suitability for
              specific purposes, or guaranteed accommodation outcomes. We disclaim all warranties
              including merchantability, fitness for a particular purpose, non-infringement, and
              data reliability. Users use the Platform entirely at their own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              16. Indemnification
            </h2>
            <p>
              Users agree to indemnify, defend, and hold harmless My Roomiee, its directors,
              employees, affiliates, agents, and representatives from and against any claims,
              liabilities, damages, losses, expenses, or legal costs arising out of misuse of the
              Platform, violation of these Terms, unlawful activities, false information submitted
              by users, infringement of third-party rights, or disputes arising from accommodation
              arrangements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              17. Suspension & Termination
            </h2>
            <p>
              My Roomiee reserves the right to suspend, restrict, or terminate access to the
              Platform at any time without prior notice if a user violates these Terms, engages in
              suspicious activity, submits false inquiries, abuses communication channels, attempts
              unauthorized access, or engages in fraudulent or harmful behavior. Termination may
              also occur for legal compliance, operational reasons, security concerns, or technical
              requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              18. Privacy Policy
            </h2>
            <p>
              Use of the Platform is also governed by our Privacy Policy. By using the Platform, you
              consent to collection of information, processing of personal data, communication
              practices, and cookies and tracking technologies as described in the Privacy Policy.
              Users are encouraged to review the Privacy Policy periodically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              19. External Links Disclaimer
            </h2>
            <p>
              The Platform may contain links to third-party websites, services, advertisements, or
              social media platforms. My Roomiee does not endorse external websites, does not
              guarantee external content, is not responsible for third-party practices, and shall
              not be liable for damages arising from external links. Users access third-party
              platforms at their own discretion and risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              20. Force Majeure
            </h2>
            <p>
              My Roomiee shall not be held liable for failure or delay in performance caused by
              circumstances beyond reasonable control including but not limited to natural
              disasters, floods, fires, pandemics, strikes, government restrictions, internet
              failures, cyber attacks, power outages, and technical breakdowns.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              21. Modification of Services
            </h2>
            <p>
              We reserve the right to modify, suspend, discontinue, or update any portion of the
              Platform or services without prior notice. This includes property listings, website
              features, pricing, inquiry systems, communication methods, and promotional offers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              22. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by and interpreted in accordance with the
              laws of India. Any disputes arising out of or related to the Platform shall be subject
              to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">23. Severability</h2>
            <p>
              If any provision of these Terms is determined to be invalid, unlawful, or
              unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">24. Waiver</h2>
            <p>
              Failure by My Roomiee to enforce any provision of these Terms shall not constitute a
              waiver of such rights. Any waiver shall only be valid if made in writing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              25. Entire Agreement
            </h2>
            <p>
              These Terms & Conditions, together with the Privacy Policy and other policies
              published on the Platform, constitute the complete agreement between users and My
              Roomiee regarding use of the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              26. Grievance Redressal
            </h2>
            <p>
              If you have any concerns, complaints, or grievances regarding these Terms or the
              Platform, you may contact us through the details provided below. We will make
              reasonable efforts to resolve grievances within a reasonable timeframe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              27. Contact Information
            </h2>
            <div className="space-y-1">
              <p>
                <strong>My Roomiee</strong>
              </p>
              <p>Website: https://myroomiee.com/</p>
              <p>Email: contact@myroomiee.com</p>
              <p>Phone: +91 88797 79777</p>
              <p>
                Office Address: Flat No. 1005, Keshav Shiv Heights, Pandit Solicitor Road, Opposite
                Blue Diamond, Malad East, Mumbai – 400097
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              28. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, submitting inquiries, or using any services offered through
              the Platform, you acknowledge that you have read these Terms & Conditions, understand
              your rights and obligations, agree to comply with these Terms, and consent to the
              practices described herein. If you do not agree with these Terms, please discontinue
              use of the Platform immediately.
            </p>
          </section>

          <p className="pt-4 text-xs text-muted-foreground">
            © 2026 My Roomiee. All Rights Reserved.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
