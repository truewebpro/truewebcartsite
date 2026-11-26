// src/app/faqs/page.tsx
// FAQs page: common questions, grouped.
import type { Metadata } from "next";
import Link from "next/link";
import { CircleHelp } from "lucide-react";
import PageShell from "../PageShell";
import { FAQ_GROUPS } from "@/lib/faqs";
import { Band, FaqPanel, GlassPage, Hero, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about TWCarts: the free trial, plans, selling, domains and moving your online shop.",
};

export default function FaqsPage() {
  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><CircleHelp size={14} aria-hidden /> FAQs</span>
          <h1 className="gx-h1">Answers to common questions.</h1>
          <p className="gx-lead">Cannot find what you need? Send us a message and we will help.</p>
          <div className="gx-cta justify-center"><Link className="gx-btn gx-g" href="/contact">Contact us</Link></div>
        </Hero>
        <Sec tone="a">
          <nav className="gx-chiprow !mt-0 mb-10" aria-label="Question groups">
            {FAQ_GROUPS.map((g) => (
              <a key={g.id} className="gx-lgp" href={`#${g.id}`}>{g.title}</a>
            ))}
          </nav>
          <div className="gx-faqstack">
            {FAQ_GROUPS.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <FaqPanel name={`faq-${g.id}`} title={g.title} sub="" items={g.items} />
              </div>
            ))}
          </div>
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." secondary={{ href: "/contact", label: "Contact us" }} />
      </GlassPage>
    </PageShell>
  );
}
