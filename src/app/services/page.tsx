// src/app/services/page.tsx
// Services page, built from the approved liquid glass mockup. Services come from the database.
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../PageShell";
import ServiceIcon from "../ServiceIcon";
import { getServices } from "@/lib/db";
import { Arrow, Band, GlassPage, Heading, Hero, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "IT services",
  description: "Web design and development, ecommerce, custom software, SEO and ongoing support from TrueWeb Pro.",
};

const HOW = [
  { t: "Tell us the problem", d: "A short call or message about what you want to achieve." },
  { t: "Get a fixed quote", d: "A clear price and timeline, so there are no surprises." },
  { t: "We build it", d: "You see progress early and often, and say what to change." },
  { t: "We look after it", d: "Hosting, fixes and changes from a named contact." },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill">TrueWeb Pro services</span>
          <h1 className="gx-h1">IT services, built around your business.</h1>
          <p className="gx-lead">From a first website to a custom platform, and the support that keeps it running. Pick what you need, or bring us the problem.</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href="/contact">Get a quote</Link>
            <Link className="gx-btn gx-g" href="#all-services">See services</Link>
          </div>
        </Hero>

        <Sec tone="a" id="all-services">
          <div className="gx-cards gx-c3 !mt-0">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="gx-card gx-lg gx-svc">
                <span className="gx-gico"><ServiceIcon name={s.icon} className="w-6 h-6" /></span>
                <h2 className="gx-card-h">{s.title}</h2>
                <p>{s.summary}</p>
                <span className="gx-more">Learn more <Arrow /></span>
              </Link>
            ))}
            <div className="gx-card gx-lg flex flex-col justify-center">
              <h2 className="gx-card-h !m-0">Not sure which fits?</h2>
              <p>Tell us what you are trying to do and we will shape the solution.</p>
              <Link className="gx-btn gx-o gx-sm mt-4 self-start" href="/contact">Talk to us</Link>
            </div>
          </div>
        </Sec>

        <Sec tone="b">
          <Heading title="How we work" />
          <ol className="gx-cards gx-c4 list-none p-0">
            {HOW.map((s, i) => (
              <li key={s.t} className="gx-card gx-lg">
                <span className="gx-num" aria-hidden>{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </Sec>

        <Band
          title="Have a project in mind?"
          accent="Get a fixed quote."
          text="Tell us what you need. We reply within one working day."
          primary={{ href: "/contact", label: "Get a quote" }}
          secondary={{ href: "#all-services", label: "See services" }}
        />
      </GlassPage>
    </PageShell>
  );
}
