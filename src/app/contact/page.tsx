// src/app/contact/page.tsx
// Contact page, built from the approved liquid glass mockup.
import type { Metadata } from "next";
import { FileText, Phone, LifeBuoy } from "lucide-react";
import PageShell from "../PageShell";
import { getServices } from "@/lib/db";
import ContactForm from "./ContactForm";
import { FaqPanel, GlassPage, Ico, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions about TWCarts, a website or something custom. Tell us about your project and we will come back with a clear, fixed quote.",
};

const FAQ = [
  { q: "Who do you work with?", a: "Mostly small and growing businesses, from first-time online sellers to companies that have outgrown their website or software." },
  { q: "How does a project start?", a: "You tell us what you want to achieve. We reply with a few questions, then a clear scope and a fixed quote, with no surprises later." },
  { q: "Can you work with the tools we already use?", a: "Usually, yes. We connect to Shopify, payment providers, delivery, email and accounting tools, and can build around your current systems." },
  { q: "How much does it cost?", a: "Every project is priced on its own, so there is no standard price list. Send us the details and we will come back with a fixed quote." },
  { q: "I already use TWCarts. Where do I get help?", a: "Use Help inside your admin. If you are stuck, send us a message here and we will pick it up." },
];

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const [services, sp] = await Promise.all([getServices(), searchParams]);
  const options = [
    { slug: "ecommerce-website", title: "Ecommerce Website" },
    { slug: "business-website", title: "Business Website" },
    { slug: "migration", title: "Moving my online shop to TWCarts" },
    ...services.map((s) => ({ slug: s.slug, title: s.title })),
    { slug: "something-else", title: "Something else" },
  ];
  const requested = Array.isArray(sp.service) ? sp.service[0] : sp.service;
  const defaultService = options.some((s) => s.slug === requested) ? (requested as string) : "";

  return (
    <PageShell>
      <GlassPage>
        <Sec tone="a">
          <div className="gx-split gx-split-contact">
            <div>
              <span className="gx-pill">Contact us</span>
              <h1 className="gx-h1">Tell us about your project.</h1>
              <p className="gx-lead">Questions about TWCarts, a website, or something custom. Send us a message and we will reply by email.</p>
              <div className="gx-ways">
                <div className="gx-way gx-lg">
                  <Ico color="#2A6DF4"><FileText size={20} /></Ico>
                  <div><b>A clear, fixed quote</b><small>Tell us what you need and we will price it, with no surprises later</small></div>
                </div>
                <div className="gx-way gx-lg">
                  <Ico color="#0F6B3A"><Phone size={20} /></Ico>
                  <div><b>Prefer to talk?</b><small>Tick the box on the form and we will call you</small></div>
                </div>
                <div className="gx-way gx-lg">
                  <Ico color="#D92A04"><LifeBuoy size={20} /></Ico>
                  <div><b>Already a customer?</b><small>Use Help inside your admin for the quickest answer</small></div>
                </div>
              </div>
            </div>
            <ContactForm services={options} defaultService={defaultService} />
          </div>
        </Sec>
        <Sec tone="b">
          <FaqPanel name="contact-faq" title="Before you write" sub="Quick answers to what people ask most." items={FAQ} />
        </Sec>
      </GlassPage>
    </PageShell>
  );
}
