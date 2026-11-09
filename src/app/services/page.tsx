import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "../PageShell";
import ServiceIcon from "../ServiceIcon";
import LightBeamButton from "../LightBeamButton";
import { getServices } from "@/lib/db";

export const metadata: Metadata = {
  title: "IT services",
  description:
    "Web design and development, e-commerce, custom software, SEO and ongoing support from Trueweb Cart.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <PageShell>
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-[13px] font-medium text-neutral-500 tracking-[0.08em] uppercase mb-5 block">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-normal text-[#101927] tracking-tight leading-[1.08] mb-6">
              IT services,{" "}
              <span
                className="italic bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                built around your business.
              </span>
            </h1>
            <p className="text-[17px] text-neutral-500 leading-relaxed">
              From a first website to a custom platform and the support that keeps it running , 
              pick what you need, or bring us the problem and we&apos;ll shape the solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white rounded-[20px] p-8 border border-[#E4E4E5] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(13,22,63,0.10)] transition-all duration-300 flex flex-col"
              >
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D163F] to-[#DF081A] text-white flex items-center justify-center mb-6">
                  <ServiceIcon name={s.icon} className="w-6 h-6" />
                </span>
                <h2 className="text-[22px] font-medium text-[#101927] mb-3 leading-snug">{s.title}</h2>
                <p className="text-[15px] text-neutral-500 leading-relaxed mb-6 flex-1">{s.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0D163F] group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 mb-6 flex flex-col items-center text-center gap-5">
            <p className="text-[17px] text-neutral-600">Not sure which service fits? Tell us what you&apos;re trying to do.</p>
            <LightBeamButton href="/contact">Talk to us</LightBeamButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
