import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShieldCheck, Users, Building2, Heart, Home, Sparkles } from "lucide-react";

const lounge = "/room-images/vaibhav-kutir-heights/image-14.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MyRoomiee - Managed PG Accommodation in Mumbai" },
      { name: "description", content: "Learn about MyRoomiee, a Mumbai managed PG accommodation brand founded by Mrs. Sweta Rita with zero brokerage, furnished AC rooms, WiFi, housekeeping and safe living." },
      { property: "og:title", content: "About MyRoomiee" },
      { property: "og:description", content: "Managed PG accommodation across Mumbai with transparent pricing, furnished rooms and resident-first support." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--surface)]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">About Us</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Safe, furnished PG accommodation for modern Mumbai living</h1>
          <p className="mt-4 text-muted-foreground">
            MyRoomiee provides managed PG accommodation and furnished rooms across Mumbai for students, working professionals and residents who want clarity, comfort and zero brokerage.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <img src={lounge} alt="MyRoomiee furnished common area" className="rounded-[2rem] border border-border shadow-lift" />
        <div>
          <h2 className="font-display text-3xl font-bold">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            MyRoomiee was built to solve a simple but stressful problem: finding a clean, safe and reasonably priced PG in Mumbai without paying brokerage or dealing with unclear promises. Many residents arrive in the city for work, studies or a career change, and their first requirement is a place that feels secure, organized and ready to live in.
          </p>
          <p className="mt-3 text-muted-foreground">
            Today MyRoomiee houses 2,500+ residents across the city, with a 4.8 rating on Google and a strong renewal rate from residents who value transparent pricing, responsive support and practical amenities.
          </p>
        </div>
      </section>

      <section className="bg-[color:var(--surface)] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Meet Our Founder</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Mrs. Sweta Rita</h2>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">Owner & Founder, MyRoomiee</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Mrs. Sweta Rita founded MyRoomiee with a deep understanding of the challenges students and working professionals face while searching for urban accommodation. Her focus is simple: transparent pricing, secure premises, clean furnished rooms and a supportive living environment.
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              MyRoomiee offers a safe, peaceful and fully facilitated environment with CCTV surveillance, verified properties and professional housekeeping. Rooms are spacious, well ventilated and furnished with beds, wardrobes, study tables, WiFi and air conditioning where applicable.
            </p>
            <p>
              Residents can choose single, double or triple sharing as per budget and requirement. Our team helps visitors compare room options, understand rent and deposit clearly, schedule a property visit and confirm the stay only after the details are verified with the property manager.
            </p>
            <p>
              We do not include food in any package. This keeps pricing transparent and allows residents to choose food arrangements according to their routine, taste and budget.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-center font-display text-3xl font-bold">What we stand for</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: ShieldCheck, t: "Zero Brokerage", d: "Clear pricing without broker charges." },
            { icon: Users, t: "Community", d: "A supportive environment for residents." },
            { icon: Building2, t: "Verified", d: "Properties checked by our team." },
            { icon: Heart, t: "Care", d: "Responsive support when residents need help." },
            { icon: Home, t: "Furnished", d: "Beds, wardrobes, study tables and WiFi." },
            { icon: Sparkles, t: "Clean", d: "Regular housekeeping and maintained spaces." },
          ].map((v) => (
            <div key={v.t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--surface)] py-20">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="font-display text-3xl font-bold">Why residents choose MyRoomiee in Mumbai</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Mumbai is fast, expensive and competitive. A good PG should reduce stress, not add to it. MyRoomiee focuses on practical resident needs: safe entry, clean rooms, reliable WiFi, air conditioned options, housekeeping, transparent rent, refundable deposit clarity and quick support from the property manager.
            </p>
            <p>
              Our managed PG rooms are suitable for students preparing for exams, working professionals with long office hours, people relocating to Mumbai and residents who want flexible sharing options. Whether the requirement is single, double or triple sharing, our team helps shortlist the best-fit rooms before a visit.
            </p>
            <p>
              Every inquiry is handled with a clear process: understand the requirement, show matching rooms, schedule a visit, explain rules and deposit, verify documents and then confirm the move-in. There is no forced online booking on the website.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="font-display text-3xl font-bold">A resident-first PG brand built around clarity</h2>
        <div className="mt-6 grid gap-6 text-muted-foreground md:grid-cols-2">
          <p>
            Under the guidance of Mrs. Sweta Rita, MyRoomiee focuses on the everyday details that matter in shared accommodation: verified rooms, clear rent communication, safety checks, clean common areas, WiFi access, air conditioned options and a practical move-in process. Every inquiry is handled by understanding the resident's location, budget, sharing preference and move-in timeline.
          </p>
          <p>
            MyRoomiee serves residents searching for PG in Malad, PG in Goregaon, PG in Jogeshwari and nearby Mumbai subareas. Our team helps visitors compare single, double and triple sharing rooms before they make a decision. We do not provide online room booking on the website; final confirmation happens after manager discussion, visit, document verification and payment confirmation.
          </p>
          <p>
            We believe transparent accommodation is better than overpromising. Food is not included in any MyRoomiee package, so residents can choose food arrangements based on their own routine, taste, health needs and budget. This helps keep room pricing clear and avoids confusion about what is included in rent.
          </p>
          <p>
            Our goal is to build a trusted network of managed PG rooms for students, working professionals and young residents across Mumbai. Safety, cleanliness, affordability, zero brokerage and responsive support remain the core principles behind every MyRoomiee property.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Want to see a property?</h2>
        <p className="mt-3 text-muted-foreground">Visits are free, and our team will take you through the best room options for your budget, location and sharing preference.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white">Schedule Visit</Link>
          <Link to="/properties" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Explore Properties</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
