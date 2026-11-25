// src/app/websites/page.tsx
// Business Website page, built from the approved liquid glass mockup.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Globe, FileText, Mail, CalendarDays, Clock, List, Image as Photo, Star, Newspaper, MessageSquare } from "lucide-react";
import PageShell from "../PageShell";
import { getCatalog } from "@/lib/db";
import { WEBSITE_FEATURES, SECTION_TYPES, GO_LIVE_STEPS } from "@/lib/features";
import { SIGNUP_URL } from "../site/links";
import { Band, COLS, GlassPage, Heading, Hero, Ico, Sec } from "../site/glass";
import PlanCard from "../site/PlanCard";

export const metadata: Metadata = {
  title: "Business Website: pages and templates",
  description:
    "A website for your restaurant, salon or service business: templates, sections, forms and booking requests, opening hours and a map.",
};

const FEATURE_ICON: ReactNode[] = [
  <FileText key="1" size={24} />, <Mail key="2" size={24} />, <CalendarDays key="3" size={24} />, <Clock key="4" size={24} />,
  <List key="5" size={24} />, <Photo key="6" size={24} />, <Star key="7" size={24} />, <Newspaper key="8" size={24} />, <MessageSquare key="9" size={24} />,
];

// sections that only make sense on an online shop are left out here
const WEBSITE_SECTIONS = SECTION_TYPES.filter((s) => s !== "Featured products" && s !== "Collections");

function HeroSite() {
  return (
    <>
      <div className="gx-browser" aria-hidden>
        <div className="gx-top"><i /><i /><i /><span className="gx-url">marisol-kitchen.com</span></div>
        <div className="gx-shopnav" style={{ background: "#7A2E1F" }}>
          <b>Marisol</b>
          <span>Menu &nbsp; About &nbsp; <span className="gx-cart">Book a table</span></span>
        </div>
        <div className="relative h-[190px]">
          <Image src="/home/photos/banner.webp" alt="" fill sizes="560px" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(40,15,8,.78),rgba(40,15,8,.1))]" />
          <div className="absolute left-[18px] top-[30px] text-white max-w-[240px]">
            <div className="text-[24px] font-extrabold leading-[1.1]">Seasonal food, made with care</div>
            <div className="text-[12px] opacity-85 mt-2">Open Tuesday to Sunday</div>
            <span className="inline-block mt-3 bg-[#F5A524] text-[#3B1A0E] text-[11px] font-extrabold px-3 py-1.5 rounded-full">See the menu</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 px-4 py-3.5">
          {[["Starters", "from £6"], ["Mains", "from £14"], ["Desserts", "from £6"]].map(([t, p]) => (
            <div key={t} className="gx-mrow !block !m-0"><b className="text-[12px]">{t}</b><br /><small>{p}</small></div>
          ))}
        </div>
      </div>
      <div className="gx-float gx-a gx-lg gx-shine" aria-hidden>
        <div className="gx-row"><span className="gx-dot" style={{ background: "rgba(42,109,244,.14)", color: "#2A6DF4" }}><CalendarDays size={16} /></span><div><b>Booking request</b>Saturday, 7:30pm, 4 people</div></div>
      </div>
      <div className="gx-float gx-b gx-lg gx-shine" aria-hidden>
        <div className="gx-row"><span className="gx-dot" style={{ background: "rgba(15,107,58,.14)", color: "#0F6B3A" }}><Clock size={16} /></span><div><b>Open today</b>12:00 to 22:00</div></div>
      </div>
    </>
  );
}

export default async function WebsitesPage() {
  const catalog = await getCatalog();
  const plans = catalog.plans.filter((p) => p.kind === "website");
  const top = plans.length > 1 ? plans[plans.length - 1].slug : "";
  const popular = plans.some((p) => p.isPopular) ? undefined : top;

  return (
    <PageShell>
      <GlassPage>
        <Hero visual={<HeroSite />}>
          <span className="gx-pill"><Globe size={14} strokeWidth={2.4} aria-hidden /> Business Website</span>
          <h1 className="gx-h1">A website for your business, without the shop.</h1>
          <p className="gx-lead">For restaurants, salons, trades and services. Pick a template, add your photos and text, and take enquiries and bookings straight into your Inbox.</p>
          <div className="gx-cta">
            <Link className="gx-btn gx-o" href={SIGNUP_URL}>Start 3 days free</Link>
            <Link className="gx-btn gx-g" href="#plans">See website plans</Link>
          </div>
          <div className="gx-ticks">
            <span><b className="gx-ck">✓</b>No credit card required</span>
            <span><b className="gx-ck">✓</b>Your own domain</span>
            <span><b className="gx-ck">✓</b>Move to an Ecommerce Website later</span>
          </div>
        </Hero>

        <Sec tone="a">
          <Heading title="What your website can do" sub="Everything a local business needs to be found, look good and get enquiries." />
          <div className="gx-cards gx-c3">
            {WEBSITE_FEATURES.map((f, i) => (
              <div key={f.title} className="gx-card gx-lg">
                <Ico color={COLS[i % 6]}>{FEATURE_ICON[i]}</Ico>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </Sec>

        <Sec tone="b">
          <div className="gx-panel gx-lg">
            <Heading title="Sections you can add to any page" sub="Press + between sections, pick one and see it live." />
            <div className="gx-chips">
              {WEBSITE_SECTIONS.map((s) => (
                <span key={s} className="gx-lgp">{s}</span>
              ))}
            </div>
          </div>
        </Sec>

        <Sec tone="a" id="templates">
          <Heading title="Pick a look. Keep your content." sub="Change template any time. Your pages, photos, blog and logo stay, and your old design is saved so you can go back." />
          <div className="gx-cards gx-c3">
            <div className="gx-card gx-lg !p-0">
              <div className="relative h-[200px]"><Image src="/home/photos/banner.webp" alt="Marisol restaurant template" fill sizes="400px" className="object-cover" /></div>
              <div className="p-5 flex justify-between items-center">
                <div><h3 className="!m-0">Marisol</h3><p className="!mt-1">Restaurant website</p></div>
                <span className="gx-tag">Free</span>
              </div>
            </div>
            <div className="gx-card gx-lg !p-0">
              <div className="h-[200px] bg-[linear-gradient(135deg,#E8D5F5,#C9DDF8)]" aria-hidden />
              <div className="p-5 flex justify-between items-center">
                <div><h3 className="!m-0">Salon</h3><p className="!mt-1">On the way</p></div>
                <span className="gx-tag gx-s">Coming soon</span>
              </div>
            </div>
            <div className="gx-card gx-lg flex flex-col justify-center">
              <h3 className="!m-0">Need something specific?</h3>
              <p>Trades, clinics, studios and more on the way. We can also design one for you.</p>
              <Link className="gx-btn gx-g gx-sm mt-4 self-start" href="/contact">Talk to us</Link>
            </div>
          </div>
        </Sec>

        <Sec tone="b">
          <Heading title="How we get you live" />
          <ol className="gx-cards gx-c4 list-none p-0">
            {GO_LIVE_STEPS.map((s, i) => (
              <li key={s.title} className="gx-card gx-lg">
                <span className="gx-num" aria-hidden>{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </Sec>

        <Sec tone="a" id="plans">
          <Heading title="Website plans" sub="Every plan starts with 3 days free, no credit card required." />
          {plans.length ? (
            <div className={`gx-plans ${plans.length === 2 ? "gx-two" : ""}`}>
              {plans.map((p, i) => (
                <PlanCard key={p.slug} catalog={catalog} plan={p} i={i} popular={popular ? p.slug === popular : undefined} />
              ))}
            </div>
          ) : (
            <p className="gx-h2sub gx-center">
              Website plans are on the way. <Link href="/contact" className="underline font-bold">Talk to us</Link> and we will set yours up.
            </p>
          )}
        </Sec>

        <Band
          title="Get your website live."
          accent="Pay nothing for 3 days."
          text="No credit card required. Cancel any time."
          secondary={{ href: "/pricing?kind=website", label: "Compare plans" }}
        />
      </GlassPage>
    </PageShell>
  );
}
