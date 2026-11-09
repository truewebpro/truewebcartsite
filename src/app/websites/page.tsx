// src/app/websites/page.tsx
import type { Metadata } from "next";
import PageShell from "../PageShell";
import { Button, Container, CtaBand, Eyebrow } from "../site/ui";
import { GO_LIVE_STEPS, SECTION_TYPES, TEMPLATES, WEBSITE_FEATURES } from "@/lib/features";

export const metadata: Metadata = {
  title: "Business websites and templates",
  description:
    "A website for your restaurant, salon or service business: templates, sections, forms and booking requests, opening hours and a map. 5 and 10 page plans.",
};

export default function WebsitesPage() {
  return (
    <PageShell>
      <section className="bg-navy text-white">
        <Container className="py-20 flex flex-wrap gap-12 items-center">
          <div className="flex-[1_1_520px] min-w-0">
            <Eyebrow light>Websites</Eyebrow>
            <h1 className="mt-4 font-display font-bold text-[40px] sm:text-[56px] leading-[1.06]">
              A website for your business, without a cart or checkout.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#D5DEEE] max-w-[600px]">
              For restaurants, salons, trades and services. Choose a template, add your photos and text, and take
              enquiries and booking requests straight into your Inbox.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/pricing?kind=website">See website plans</Button>
              <Button href="#templates" variant="outline-light">
                Browse templates
              </Button>
            </div>
          </div>
          <div className="flex-[1_1_380px] min-w-0 bg-white rounded-[22px] p-7 text-graphite">
            <p className="font-display font-bold text-xl text-navy">Website plans</p>
            <div className="flex flex-col gap-3 mt-4">
              {[
                ["Website 5", "5 pages, home page counts"],
                ["Website 10", "10 pages, home page counts"],
                ["Move to a shop later", "Keep your design"],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-wrap justify-between gap-2 p-4 border border-line rounded-[14px]">
                  <span className="font-semibold">{t}</span>
                  <span className="text-muted">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-24 pb-10">
        <h2 className="font-display font-bold text-4xl text-navy">What your website can do</h2>
        <div className="mt-9 grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {WEBSITE_FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-line rounded-[20px] p-6">
              <h3 className="font-display font-bold text-xl text-navy">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-12">
        <div className="bg-white border border-line rounded-[28px] p-8 sm:p-11">
          <h2 className="font-display font-bold text-3xl text-navy">Sections you can add to any page</h2>
          <p className="mt-2.5 text-base text-muted">Press + between sections, pick one, see it live, done.</p>
          <ul className="flex flex-wrap gap-2.5 mt-6">
            {SECTION_TYPES.map((s) => (
              <li key={s} className="px-4 py-2 rounded-full bg-[#F1EEE6] border border-line text-sm font-medium text-graphite">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <section id="templates" className="scroll-mt-24">
        <Container className="py-16">
          <Eyebrow>Templates</Eyebrow>
          <h2 className="mt-3 font-display font-bold text-4xl text-navy">Pick a look. Keep your content.</h2>
          <p className="mt-3 text-base leading-relaxed text-muted max-w-[640px]">
            Applying a template keeps your products, orders, customers, blog, menus and logo. Your current design is
            saved, so you can restore it. Free and premium templates, with more added regularly.
          </p>
          <div className="mt-9 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {TEMPLATES.map((t) => (
              <div key={t.name} className="bg-white border border-line rounded-[22px] overflow-hidden">
                <div className={`h-60 ${t.tone}`} aria-hidden />
                <div className="p-5 flex justify-between items-center gap-3">
                  <div>
                    <p className="font-display font-bold text-[19px] text-navy">{t.name}</p>
                    <p className="mt-1 text-sm text-muted">{t.kind}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#EEF2FA] text-navy text-[13px] font-semibold">{t.price}</span>
                </div>
              </div>
            ))}
            <div className="border border-dashed border-[#C9C2B2] rounded-[22px] p-8 flex flex-col justify-center">
              <p className="font-display font-bold text-xl text-navy">More templates on the way</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Shops, salons, trades and more. Need something specific? We can design one for you.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-8 pb-24">
        <h2 className="font-display font-bold text-4xl text-navy">How we get you live</h2>
        <ol className="mt-8 grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {GO_LIVE_STEPS.map((s, i) => (
            <li key={s.title} className="bg-white border border-line rounded-[20px] p-6">
              <span className="inline-flex w-9 h-9 rounded-full bg-navy text-white items-center justify-center font-bold">
                {i + 1}
              </span>
              <p className="mt-3.5 font-display font-bold text-[19px] text-navy">{s.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>

      <CtaBand
        title="Get your website live."
        text="Tell us about your business and we will set it up."
        primary={{ href: "/pricing?kind=website", label: "See website plans" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </PageShell>
  );
}
