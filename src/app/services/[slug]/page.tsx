// src/app/services/[slug]/page.tsx
// One service (agreed 27/11/2026): header in a big glass panel with a picture of the work, what's included next to
// a navy quote card, how we work, other services and the closing band. Sections keep the animated background.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../PageShell";
import ServiceIcon from "../../ServiceIcon";
import { getServiceBySlug, getServices } from "@/lib/db";
import { HOW_WE_WORK } from "@/lib/services-seed";
import { Arrow, Band, GlassPage, Heading, Sec, Tick } from "../../site/glass";
import ServiceVisual from "./ServiceVisual";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, all] = await Promise.all([getServiceBySlug(slug), getServices()]);
  if (!service) notFound();
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 4);
  const quote = `/contact?service=${service.slug}`;

  return (
    <PageShell>
      <GlassPage>
        <Sec tone="a">
          <Link className="gx-back" href="/services"><Arrow back /> All services</Link>
          <div className="gx-panel gx-lg gx-svhero">
            <div>
              <span className="gx-gico !w-[58px] !h-[58px]"><ServiceIcon name={service.icon} className="w-7 h-7" /></span>
              <h1 className="gx-h1 !mt-5">{service.title}</h1>
              <p className="gx-lead !font-semibold !text-[var(--gx-text)]">{service.tagline}</p>
              <p className="gx-lead !mt-3">{service.summary}</p>
              <div className="gx-cta">
                <Link className="gx-btn gx-o" href={quote}>Get a quote</Link>
                <Link className="gx-btn gx-g" href="#included">See what&apos;s included</Link>
              </div>
              <div className="gx-ticks">
                <span><b className="gx-ck">✓</b>Fixed quote</span>
                <span><b className="gx-ck">✓</b>Reply within one working day</span>
              </div>
            </div>
            <ServiceVisual slug={service.slug} />
          </div>
        </Sec>

        <Sec tone="b" id="included">
          <h2 className="gx-h2">What&apos;s included</h2>
          <p className="gx-h2sub !ml-0 !text-left max-w-[680px]">{service.description}</p>
          <div className="gx-svinc">
            <ul className="gx-panel gx-lg">
              {service.features.map((f) => (
                <li key={f}><span className="gx-svck"><Tick /></span>{f}</li>
              ))}
            </ul>
            <div className="gx-quote">
              <h3 className="gx-quote-h">Interested in {service.title}?</h3>
              <p>Tell us a little about your project and we will come back with a clear, fixed quote.</p>
              <Link className="gx-btn gx-o w-full" href={quote}>Get a quote</Link>
              <p className="gx-svnote">We reply within one working day</p>
            </div>
          </div>
        </Sec>

        <Sec tone="a">
          <Heading title="How we work" />
          <ol className="gx-cards gx-c4 list-none p-0">
            {HOW_WE_WORK.map((s, i) => (
              <li key={s.t} className="gx-card gx-lg">
                <span className="gx-num" aria-hidden>{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </Sec>

        <Sec tone="b">
          <Heading title="Other services" />
          <div className="gx-cards gx-c4">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="gx-card gx-lg gx-svc">
                <span className="gx-gico"><ServiceIcon name={s.icon} className="w-6 h-6" /></span>
                <h3>{s.title}</h3>
                <p>{s.tagline}</p>
                <span className="gx-more">Learn more <Arrow /></span>
              </Link>
            ))}
          </div>
          <p className="gx-center !mt-6"><Link className="gx-btn gx-g gx-sm" href="/services">See all services</Link></p>
        </Sec>

        <Band
          title="Have a project in mind?"
          accent="Get a fixed quote."
          text="Tell us what you need. We reply within one working day."
          primary={{ href: quote, label: "Get a quote" }}
          secondary={{ href: "/services", label: "See services" }}
        />
      </GlassPage>
    </PageShell>
  );
}
