// src/app/pricing/page.tsx
// Pricing page, built from the approved liquid glass mockup. Plans and apps come from super admin.
import type { Metadata } from "next";
import PageShell from "../PageShell";
import PricingPlans from "./PricingPlans";
import { getCatalog } from "@/lib/db";
import { PLAN_FAQ } from "@/lib/features";
import type { SiteKind } from "@/lib/catalog";
import { Band, FaqPanel, GlassPage, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "Pricing, plans and apps",
  description:
    "Plans for Ecommerce Websites and Business Websites, monthly or yearly with 2 months free, plus apps you can add on their own.",
};

type Props = { searchParams: Promise<{ kind?: string | string[] }> };

export default async function PricingPage({ searchParams }: Props) {
  const [catalog, sp] = await Promise.all([getCatalog(), searchParams]);
  // Business Website plans show first unless the link asks for ?kind=shop
  const kind: SiteKind = sp.kind === "shop" ? "shop" : "website";

  return (
    <PageShell>
      <GlassPage>
        <PricingPlans catalog={catalog} initialKind={kind} />
        <Sec tone="a">
          <FaqPanel name="plan-faq" title="Questions about plans" sub="Still not sure? Talk to us and we will help you pick." items={PLAN_FAQ} />
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." secondary={{ href: "/contact", label: "Talk to us" }} />
      </GlassPage>
    </PageShell>
  );
}
