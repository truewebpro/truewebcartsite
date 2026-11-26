// src/app/migrate/[platform]/page.tsx
// "Migrate from …" page, one per platform in src/lib/migrations.ts.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";
import PageShell from "../../PageShell";
import { MIGRATIONS, migrationBySlug } from "@/lib/migrations";
import { SIGNUP_URL } from "../../site/links";
import { Band, FaqPanel, GlassPage, Hero, Sec } from "../../site/glass";
import { HowItWorks, OtherPlatforms, QUOTE_HREF, WhatMoves } from "../MigrationParts";

type Props = { params: Promise<{ platform: string }> };

export function generateStaticParams() {
  return MIGRATIONS.map((m) => ({ platform: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = migrationBySlug((await params).platform);
  if (!m) return { title: "Migration" };
  return {
    title: `Migrate from ${m.name} to TWCarts`,
    description: `Move your online shop from ${m.name} to TWCarts: ${m.extra}. We can do it all for you.`,
  };
}

export default async function MigratePage({ params }: Props) {
  const m = migrationBySlug((await params).platform);
  if (!m) notFound();

  const faq = [
    { q: "Does my shop go offline?", a: `No. Your ${m.name} shop stays open until you are ready to switch.` },
    { q: "What exactly comes across?", a: `${m.extra}. We tell you before we start if anything cannot be moved.` },
    { q: "How long does it take?", a: "It depends on how many products and orders you have. We tell you the timeline before we start." },
    { q: "What does it cost?", a: "We send you a fixed price after we look at your shop, so there are no surprises." },
  ];

  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><ArrowLeftRight size={14} aria-hidden /> Migration</span>
          <h1 className="gx-h1">Move from {m.name} to TWCarts.</h1>
          <p className="gx-lead">Bring your products, customers and orders across. We can do it all for you, and your shop stays open while we move it.</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href={`${QUOTE_HREF}&from=${m.slug}`}>Get a free migration quote</Link>
            <Link className="gx-btn gx-g" href={SIGNUP_URL}>Start 3 days free</Link>
          </div>
        </Hero>
        <WhatMoves />
        <HowItWorks from={m.name} />
        <Sec tone="a">
          <FaqPanel name="migrate-faq" title="Questions about moving" sub="Every move is different. Ask us anything." items={faq} />
          <OtherPlatforms current={m.slug} />
        </Sec>
        <Band
          title="Ready to move?"
          accent="We will do it for you."
          text="Tell us where you sell now and we will send a plan and a fixed price."
          primary={{ href: `${QUOTE_HREF}&from=${m.slug}`, label: "Get a free migration quote" }}
          secondary={{ href: "/pricing", label: "Compare plans" }}
        />
      </GlassPage>
    </PageShell>
  );
}
