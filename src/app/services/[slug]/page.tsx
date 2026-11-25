// src/app/services/[slug]/page.tsx
// One service, built from the approved liquid glass mockup.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../PageShell";
import ServiceIcon from "../../ServiceIcon";
import { getServiceBySlug, getServices } from "@/lib/db";
import { Arrow, Band, GlassPage, Sec, Tick } from "../../site/glass";

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
  const others = all.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      <GlassPage>
        <Sec tone="a">
          <Link className="gx-back" href="/services"><Arrow back /> All services</Link>
          <div className="gx-split">
            <div>
              <span className="gx-gico !w-[58px] !h-[58px]"><ServiceIcon name={service.icon} className="w-7 h-7" /></span>
              <h1 className="gx-h1 !mt-5">{service.title}</h1>
              <p className="gx-lead !text-[21px] !font-semibold !text-[var(--gx-text)]">{service.tagline}</p>
              <p className="gx-lead">{service.description}</p>
              <div className="gx-panel gx-lg mt-8">
                <h2 className="m-0 mb-4 text-[20px] font-extrabold text-[var(--gx-text)]">What&apos;s included</h2>
                <ul className="list-none m-0 p-0 grid gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[16px] text-[var(--gx-text)]"><Tick />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="grid gap-[18px]">
              <div className="gx-quote">
                <h2 className="gx-quote-h">Interested in {service.title}?</h2>
                <p>Tell us a little about your project and we will come back with a clear, fixed quote.</p>
                <Link className="gx-btn gx-o w-full" href={`/contact?service=${service.slug}`}>Get a quote</Link>
              </div>
              {others.length > 0 && (
                <nav className="gx-panel gx-lg !p-6" aria-label="Other services">
                  <h2 className="m-0 mb-1.5 text-[16px] font-extrabold text-[var(--gx-text)]">Other services</h2>
                  <div className="gx-olist">
                    {others.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`}>
                        {s.title}
                        <span aria-hidden>›</span>
                      </Link>
                    ))}
                  </div>
                </nav>
              )}
            </aside>
          </div>
        </Sec>
        <Band
          title="Have a project in mind?"
          accent="Get a fixed quote."
          text="Tell us what you need. We reply within one working day."
          primary={{ href: `/contact?service=${service.slug}`, label: "Get a quote" }}
          secondary={{ href: "/services", label: "See services" }}
        />
      </GlassPage>
    </PageShell>
  );
}
