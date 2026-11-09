// src/app/pricing/page.tsx
import type { Metadata } from "next";
import PageShell from "../PageShell";
import { Container } from "../site/ui";
import PricingPlans from "./PricingPlans";
import { getCatalog } from "@/lib/db";
import { PLAN_FAQ } from "@/lib/features";
import type { SiteKind } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Pricing, plans and apps",
  description:
    "Plans for online shops and business websites, monthly or yearly with 2 months free, plus apps you can add on their own.",
};

type Props = { searchParams: Promise<{ kind?: string | string[] }> };

export default async function PricingPage({ searchParams }: Props) {
  const [catalog, sp] = await Promise.all([getCatalog(), searchParams]);
  const kind: SiteKind = sp.kind === "website" ? "website" : "shop";

  return (
    <PageShell>
      <PricingPlans catalog={catalog} initialKind={kind} />

      <Container className="pt-12 pb-24">
        <h2 className="font-display font-bold text-4xl text-navy">Questions about plans</h2>
        <div className="mt-7 grid gap-4 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {PLAN_FAQ.map((q) => (
            <div key={q.q} className="bg-white border border-line rounded-[18px] p-6">
              <h3 className="text-[17px] font-semibold text-navy">{q.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{q.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
