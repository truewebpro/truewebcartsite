// src/app/services/page.tsx
// Services page, built from the approved liquid glass mockup. Services come from the database.
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../PageShell";
import ServiceIcon from "../ServiceIcon";
import { getServices } from "@/lib/db";
import { HOW_WE_WORK as HOW } from "@/lib/services-seed";
import { Arrow, Band, GlassPage, Heading, Hero, Sec } from "../site/glass";
import FeatureCard from "../site/FeatureCard";

export const metadata: Metadata = {
  title: "IT services",
  description: "Web design and development, ecommerce, custom software, SEO and ongoing support from TrueWeb Pro.",
};


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
            {services.map((s) => (
              <FeatureCard
                key={s.slug}
                icon={<span className="gx-gico"><ServiceIcon name={s.icon} className="w-6 h-6" /></span>}
                title={<Link href={`/services/${s.slug}`}>{s.title}</Link>}
                text={s.summary}
                keys={s.features.slice(0, 3)}
                items={s.features.map((text) => ({ text }))}
                noun="points"
                footer={<Link className="gx-more" href={`/services/${s.slug}`}>Learn more <Arrow /></Link>}
              />
            ))}
            <div className="gx-navycard">
              <div>
                <h2>Not sure which fits?</h2>
                <p>Tell us what you are trying to do and we will shape the solution.</p>
              </div>
              <Link className="gx-btn gx-o" href="/contact">Talk to us</Link>
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
