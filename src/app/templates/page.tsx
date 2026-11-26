// src/app/templates/page.tsx
// Templates page: the templates in the Store Builder, and how templates work.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LayoutTemplate } from "lucide-react";
import PageShell from "../PageShell";
import { DEMO_SHOP_URL, SIGNUP_URL } from "../site/links";
import { Band, GlassPage, Heading, Hero, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "Templates",
  description: "Templates for online shops and business websites. Pick a look and change it any time; your content stays.",
};

const SOON = [
  { name: "Atelier", kind: "Online shop: fashion", bg: "linear-gradient(135deg,#E3E7F2,#C9D3EA)" },
  { name: "Lumen", kind: "Salon and beauty", bg: "linear-gradient(135deg,#F1DDF0,#D9C3EE)" },
  { name: "Harbour", kind: "Wholesale and trade", bg: "linear-gradient(135deg,#D8EDE3,#BCDCCD)" },
  { name: "Crumb", kind: "Bakery and cafe", bg: "linear-gradient(135deg,#F4E9D2,#E6D0A8)" },
];

const HOW = [
  { t: "Pick one", d: "Choose a template in the Store Builder and see it with your own logo and colours." },
  { t: "Make it yours", d: "Change colours, fonts and sections with a live preview. No code needed." },
  { t: "Switch any time", d: "Try another template whenever you like. Your old design is saved so you can go back." },
];

export default function TemplatesPage() {
  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><LayoutTemplate size={14} aria-hidden /> Templates</span>
          <h1 className="gx-h1">Pick a look. Keep your content.</h1>
          <p className="gx-lead">Start from a template made for your kind of business. Change it any time; your products, pages and logo stay.</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href={SIGNUP_URL}>Start 3 days free</Link>
            <a className="gx-btn gx-g" href={DEMO_SHOP_URL} target="_blank" rel="noopener">See a live demo</a>
          </div>
        </Hero>
        <Sec tone="a">
          <div className="gx-cards gx-c3 !mt-0">
            <article className="gx-card gx-lg gx-tcard">
              <div className="gx-tshot"><Image src="/home/photos/banner.webp" alt="Marisol template" fill sizes="400px" className="object-cover" /></div>
              <div className="gx-tbody"><div><h3>Marisol</h3><p>Restaurant website</p></div><span className="gx-tag">Free</span></div>
            </article>
            {SOON.map((t) => (
              <article key={t.name} className="gx-card gx-lg gx-tcard">
                <div className="gx-tshot" style={{ background: t.bg }} aria-hidden />
                <div className="gx-tbody"><div><h3>{t.name}</h3><p>{t.kind}</p></div><span className="gx-tag gx-s">Coming soon</span></div>
              </article>
            ))}
            <article className="gx-card gx-lg flex flex-col justify-center">
              <h3 className="!m-0">Need something specific?</h3>
              <p>We can design a template just for your business.</p>
              <Link className="gx-btn gx-g gx-sm mt-4 self-start" href="/services/web-design">See Web Design</Link>
            </article>
          </div>
        </Sec>
        <Sec tone="b">
          <Heading title="How templates work" />
          <ol className="gx-cards gx-c3 list-none p-0">
            {HOW.map((s, i) => (
              <li key={s.t} className="gx-card gx-lg">
                <span className="gx-num" aria-hidden>{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." />
      </GlassPage>
    </PageShell>
  );
}
