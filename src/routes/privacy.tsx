import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cmsPageHead } from "@/lib/cms/head";
import { twinValue } from "@/lib/cms/digital-twin";
import { useCmsTwinPage } from "@/lib/cms/store";

export const Route = createFileRoute("/privacy")({
  head: () =>
    cmsPageHead("privacy", {
      title: "Privacy Policy - MyRoomiee",
      description: "How MyRoomiee collects, uses and protects your information.",
      canonical: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const twin = useCmsTwinPage("privacy");

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-4xl font-bold">
          {twinValue(twin, "article", "content", "heading", "Privacy Policy")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {twinValue(twin, "article", "content", "updated", "Last Updated: May 28, 2026")}
        </p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Welcome to My Roomiee ("Company", "we", "our", or "us"). Your privacy is important to
            us, and we are committed to protecting your personal information and maintaining
            transparency regarding how your data is collected, used, stored, and protected. This
            Privacy Policy explains how My Roomiee collects, uses, processes, stores, and safeguards
            information provided by users ("you", "your", or "user") when accessing or using our
            website https://myroomiee.com/ and related services (collectively referred to as the
            "Platform").
          </p>
          <p>
            By accessing or using the Platform, you agree to the collection and use of information
            in accordance with this Privacy Policy. If you do not agree with the terms mentioned
            herein, please discontinue use of the Platform immediately. This Privacy Policy should
            be read together with our Terms & Conditions and other policies published on the
            Platform.
          </p>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              1. About Our Business
            </h2>
            <p>
              My Roomiee is a Mumbai-based accommodation platform that helps users discover and
              inquire about furnished PG accommodation, rental stays, and premium PG accommodation
              options in areas including Malad, Goregaon, Jogeshwari, and nearby locations. We
              provide information related to accommodation facilities, amenities, room availability,
              and booking inquiries for students, working professionals, and individuals seeking
              rental accommodation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              2. Information We Collect
            </h2>
            <p>
              We may collect information from you in several ways, including information you
              voluntarily provide and information automatically collected while using the Platform.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              2.1 Information You Provide Voluntarily
            </h3>
            <p>We may collect personal information including but not limited to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>City or Preferred Location</li>
              <li>Accommodation Preferences</li>
              <li>Occupancy Requirements</li>
              <li>Budget Information</li>
              <li>Gender Preferences (where voluntarily provided)</li>
              <li>Inquiry Details</li>
              <li>Communication Preferences</li>
            </ul>
            <p>
              This information may be collected when you submit inquiry forms, contact us via phone,
              WhatsApp, or email, request property information, register interest in accommodation,
              participate in surveys or promotional campaigns, or communicate with us through social
              media platforms.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              2.2 Information Collected Automatically
            </h3>
            <p>
              When you access the Platform, certain information may automatically be collected,
              including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Access Time</li>
              <li>Pages Visited</li>
              <li>Clickstream Data</li>
              <li>Referral URLs</li>
              <li>Approximate Geographic Location</li>
              <li>Mobile Device Information</li>
            </ul>
            <p>
              This information helps us improve Platform performance, user experience, security
              monitoring, analytics and optimization, and service reliability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              3. Cookies & Tracking Technologies
            </h2>
            <p>
              Our Platform may use Cookies and similar tracking technologies to improve your
              browsing experience and analyze website performance. Cookies help us understand user
              behavior, remember preferences, improve website speed and usability, analyze traffic
              patterns, enhance marketing performance, and personalize user experience.
            </p>
            <p>
              You may choose to disable Cookies through your browser settings. However, certain
              features of the Platform may not function properly if Cookies are disabled.
            </p>
            <p>
              We may also use third-party analytics and advertising tools, including but not limited
              to Google Analytics, Google Ads, Meta Pixel, and Remarketing Technologies. These
              services may collect information in accordance with their own privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              4. How We Use Your Information
            </h2>
            <p>We use the information collected for legitimate business purposes including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Responding to accommodation inquiries</li>
              <li>Providing property details and availability</li>
              <li>Improving our Platform and services</li>
              <li>Communicating with users</li>
              <li>Sending service-related updates</li>
              <li>Providing customer support</li>
              <li>Managing bookings and inquiries</li>
              <li>Conducting internal analytics</li>
              <li>Improving marketing campaigns</li>
              <li>Preventing fraud and unauthorized activity</li>
              <li>Maintaining platform security</li>
              <li>Complying with legal obligations</li>
            </ul>
            <p>
              We may also use your information to contact you regarding available accommodation
              options, promotions or offers, service updates, important notices, and customer
              support follow-ups.
            </p>
            <p>
              By submitting your information, you consent to receiving communication through calls,
              SMS, WhatsApp, email, and push notifications. You may opt out of promotional
              communication at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              5. Sharing & Disclosure of Information
            </h2>
            <p>
              We do not sell your personal information to third parties. However, we may share
              information with trusted third-party service providers for purposes including website
              hosting, analytics, marketing services, customer communication, payment processing,
              technical support, and advertising platforms.
            </p>
            <p>
              We may also disclose information if required under applicable law, to comply with
              legal obligations, to protect our legal rights, to investigate fraud or misuse, during
              business restructuring, mergers, or acquisitions, or to enforce our Terms &
              Conditions. All third-party partners are expected to maintain appropriate
              confidentiality and security standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              6. Third-Party Links
            </h2>
            <p>
              Our Platform may contain links to third-party websites, social media platforms, or
              external services. We are not responsible for the privacy practices, policies, or
              content of such third-party platforms. Users are advised to review the privacy
              policies of those websites independently before providing any personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">7. Data Security</h2>
            <p>
              We implement commercially reasonable administrative, technical, and organizational
              measures to protect your information from unauthorized access, misuse, alteration,
              disclosure, destruction, and data breaches. While we strive to use industry-standard
              security practices, no method of internet transmission or electronic storage is
              completely secure. Therefore, we cannot guarantee absolute security of your
              information. Users are also responsible for maintaining the confidentiality of their
              devices and communication channels while accessing the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              8. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary for providing services,
              resolving disputes, legal compliance, security monitoring, business operations, and
              fraud prevention. Once information is no longer required, we may securely delete,
              anonymize, or archive it in accordance with applicable laws and operational
              requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              9. User Rights & Choices
            </h2>
            <p>
              You may have certain rights regarding your personal information, subject to applicable
              laws, including the right to access your personal information, correct inaccurate
              information, request deletion of your information, withdraw consent for communication,
              restrict certain processing activities, and request clarification regarding data
              usage. To exercise any of these rights, you may contact us using the details mentioned
              below. Please note that withdrawing consent or requesting deletion of information may
              limit our ability to provide certain services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              10. Marketing Communication
            </h2>
            <p>
              By submitting your information on the Platform, you consent to receive communication
              from My Roomiee through phone calls, SMS, WhatsApp messages, email communication, and
              promotional notifications. These communications may include property recommendations,
              booking assistance, service updates, promotional offers, and customer support
              communication. Users may opt out of promotional communication at any time by
              contacting us directly. Please note that we may still send important non-promotional
              communication related to your inquiries or active services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              11. Google Ads & Advertising Services
            </h2>
            <p>
              Our Platform may use advertising services provided by third-party platforms including
              Google Ads, Google Analytics, Meta Ads, and Remarketing Platforms. These services may
              use Cookies, device identifiers, and tracking technologies to measure advertisement
              performance, improve marketing effectiveness, display relevant advertisements,
              understand user behavior, and optimize campaigns. Third-party advertising providers
              may collect information in accordance with their own privacy policies. Users can
              manage advertising preferences through their browser settings and advertising platform
              controls.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              12. Social Media Platforms
            </h2>
            <p>
              Our Platform may include links to social media services including but not limited to
              Instagram, Facebook, WhatsApp, YouTube, and LinkedIn. Interactions on these platforms
              are governed by their respective privacy policies and terms. We are not responsible
              for the privacy practices of external social media platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              13. Children's Privacy
            </h2>
            <p>
              Our services are intended for individuals above the age of 18 years. We do not
              knowingly collect personal information from children under the age of 18. If we become
              aware that information has been collected from a minor without appropriate consent, we
              may delete such information from our systems. Parents or guardians who believe that a
              child has submitted personal information may contact us for immediate removal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              14. International Data Transfers
            </h2>
            <p>
              Information collected through the Platform may be processed, stored, or transferred to
              servers located within or outside India, depending on the services and third-party
              providers used by us. By using the Platform, you consent to such storage and transfer
              of information in accordance with this Privacy Policy. We take reasonable measures to
              ensure appropriate safeguards are implemented for such transfers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              15. User Responsibility
            </h2>
            <p>
              Users are responsible for providing accurate information, maintaining confidentiality
              of their communication devices, avoiding unauthorized sharing of personal details, and
              using the Platform lawfully. Users should avoid sharing sensitive financial or
              confidential information through unsecured channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">16. Disclaimer</h2>
            <p>
              While we take commercially reasonable efforts to safeguard user information, no online
              platform or internet transmission can guarantee complete security. By using the
              Platform, you acknowledge and accept inherent internet-related security risks,
              potential technical interruptions, and risks associated with third-party services. My
              Roomiee shall not be held responsible for unauthorized access caused by user
              negligence, malware, phishing attacks, compromised devices, third-party platform
              vulnerabilities, or circumstances beyond our reasonable control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              17. Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update, revise, or modify this Privacy Policy at any time
              without prior notice. Updated versions will be published on this page along with the
              revised "Last Updated" date. Continued use of the Platform after any modifications
              constitutes your acceptance of the updated Privacy Policy. Users are encouraged to
              periodically review this page for updates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              18. Grievance Redressal
            </h2>
            <p>
              If you have any concerns, complaints, or queries regarding this Privacy Policy or the
              handling of your personal information, you may contact us using the details below. We
              will make reasonable efforts to respond to grievances within a reasonable timeframe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              19. Contact Information
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
            <h2 className="font-display text-xl font-semibold text-foreground">20. Consent</h2>
            <p>
              By accessing or using the Platform, submitting inquiry forms, contacting us, or using
              any services provided by My Roomiee, you acknowledge that you have read this Privacy
              Policy, understand the collection and usage of information, consent to the practices
              described herein, and agree to the Terms & Conditions of the Platform. If you do not
              agree with this Privacy Policy, please discontinue use of the Platform immediately.
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
