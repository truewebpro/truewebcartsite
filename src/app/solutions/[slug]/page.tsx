// src/app/solutions/[slug]/page.tsx
// One solution (by kind of business or by need), from src/lib/solutions.ts.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import PageShell from "../../PageShell";
import { SOLUTIONS, solutionBySlug } from "@/lib/solutions";
import { SIGNUP_URL } from "../../site/links";
import { Band, GlassPage, Heading, Hero, Sec, Tick } from "../../site/glass";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = solutionBySlug((await params).slug);
  if (!s) return { title: "Solutions" };
  return { title: `${s.title}: ${s.heading.replace(/\.$/, "")}`, description: s.lead };
}

export default async function SolutionPage({ params }: Props) {
  const s = solutionBySlug((await params).slug);
  if (!s) notFound();
  const others = SOLUTIONS.filter((o) => o.group === s.group && o.slug !== s.slug);

  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><Sparkles size={14} aria-hidden /> {s.group === "business" ? "For your business" : "Solutions"}: {s.title}</span>
          <h1 className="gx-h1">{s.heading}</h1>
          <p className="gx-lead">{s.lead}</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href={SIGNUP_URL}>Start 3 days free</Link>
            <Link className="gx-btn gx-g" href="/pricing?kind=shop">See pricing</Link>
          </div>
        </Hero>
        <Sec tone="a">
          <div className="gx-cards gx-c3 !mt-0">
            {s.points.map((p) => (
              <div key={p.title} className="gx-card gx-lg">
                <span className="inline-flex"><Tick /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </Sec>
        <Sec tone="b">
          <Heading title="Apps worth switching on" sub="Turn them on from the App Store when you need them." />
          <div className="gx-chiprow">
            {s.apps.map((a) => (
              <Link key={a} className="gx-lgp" href="/app-store">{a}</Link>
            ))}
          </div>
          <div className="mt-14">
            <Heading title={s.group === "business" ? "Other kinds of business" : "Other solutions"} />
            <div className="gx-plat">
              {others.map((o) => (
                <Link key={o.slug} href={`/solutions/${o.slug}`} className="gx-lgp">{o.title}</Link>
              ))}
            </div>
          </div>
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." />
      </GlassPage>
    </PageShell>
  );
}
