import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import PageShell from "../../PageShell";
import ServiceIcon from "../../ServiceIcon";
import LightBeamButton from "../../LightBeamButton";
import { getServiceBySlug, getServices } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, all] = await Promise.all([getServiceBySlug(slug), getServices()]);
  if (!service) notFound();

  const others = all.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[14px] text-neutral-500 hover:text-[#0D163F] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D163F] to-[#DF081A] text-white flex items-center justify-center mb-7">
                <ServiceIcon name={service.icon} className="w-7 h-7" />
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent tracking-tight leading-[1.08] mb-5">
                {service.title}
              </h1>
              <p
                className="text-[22px] text-[#101927] italic leading-snug mb-7"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {service.tagline}
              </p>
              <p className="text-[17px] text-neutral-600 leading-relaxed mb-10">{service.description}</p>

              <div className="bg-white rounded-[20px] p-8 border border-[#E4E4E5] shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                <h2 className="text-[13px] font-bold text-[#777776] tracking-[0.2em] uppercase mb-6">
                  What&apos;s included
                </h2>
                <ul className="flex flex-col gap-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[16px] text-[#101927]">
                      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#0D163F] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="rounded-[20px] p-8 text-white bg-[radial-gradient(120%_90%_at_50%_0%,#1a2557_0%,#0D163F_45%,#060a1f_100%)]">
                <h2 className="text-[26px] font-normal leading-snug mb-3">Interested in {service.title}?</h2>
                <p className="text-[15px] text-white/70 leading-relaxed mb-7">
                  Tell us a little about your project and we&apos;ll come back with a clear, fixed quote.
                </p>
                <LightBeamButton href={`/contact?service=${service.slug}`}>Get a quote</LightBeamButton>
              </div>

              {others.length > 0 && (
                <div className="bg-white rounded-[20px] p-6 border border-[#E4E4E5]">
                  <h2 className="text-[13px] font-bold text-[#777776] tracking-[0.2em] uppercase mb-4">
                    Other services
                  </h2>
                  <ul className="flex flex-col">
                    {others.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center justify-between py-3 text-[15px] text-neutral-700 hover:text-[#0D163F] border-b border-neutral-100 last:border-0 transition-colors"
                        >
                          {s.title} <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
