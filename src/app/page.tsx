// src/app/page.tsx
import PageShell from "./PageShell";
import { getCatalog } from "@/lib/db";
import Stage from "./home/Stage";
import Hero from "./home/Hero";
import ShopBuilder from "./home/ShopBuilder";
import Plans from "./home/Plans";
import ViewPricing from "./home/ViewPricing";
import Describe from "./home/Describe";
import { Domains, Faqs, SignupBand } from "./home/Closing";
import { TemplatesMobile, IntegrationsMobile, FoundationsMobile, AnalyticsMobile, MobileAppMobile } from "./home/MobilePieces";
import { HeroDark, HeroLight } from "./home/desktop/Hero";
import { BuilderDark, BuilderLight } from "./home/desktop/Builder";
import { PlansDark, PlansLight } from "./home/desktop/Plans";
import { DescribeDark, DescribeLight } from "./home/desktop/Describe";
import { TemplatesDark, TemplatesLight } from "./home/desktop/Templates";
import { IntegrationsDark, IntegrationsLight } from "./home/desktop/Integrations";
import { FoundationsDark, FoundationsLight } from "./home/desktop/Foundations";
import { AnalyticsDark, AnalyticsLight } from "./home/desktop/Analytics";
import { MobileAppDark, MobileAppLight } from "./home/desktop/MobileApp";
import { DomainsDark, DomainsLight } from "./home/desktop/Domains";
import { BandDark, BandLight } from "./home/desktop/Band";

/**
 * Home page. From 1280px up every section is the approved mockup itself (home/desktop, generated);
 * phones, tablets and small laptops get the responsive versions in home/*.tsx.
 */
export default async function Home() {
  const catalog = await getCatalog();

  return (
    <PageShell home>
      <Stage name="Hero" light={<HeroLight />} dark={<HeroDark />} mobile={<Hero />} />
      <Stage name="Builder" light={<BuilderLight />} dark={<BuilderDark />} mobile={<ShopBuilder />} />
      <Stage name="Plans" id="plans" light={<PlansLight catalog={catalog} />} dark={<PlansDark catalog={catalog} />} mobile={<Plans catalog={catalog} />} />
      <ViewPricing />
      <Stage name="Describe" light={<DescribeLight />} dark={<DescribeDark />} mobile={<Describe />} />
      <Stage
        name="Templates"
        light={<TemplatesLight />}
        dark={<TemplatesDark />}
        mobile={<TemplatesMobile />}
      />
      <Stage name="Integrations" light={<IntegrationsLight />} dark={<IntegrationsDark />} mobile={<IntegrationsMobile appCount={catalog.apps.length} />} />
      <Stage
        name="Foundations"
        light={<FoundationsLight />}
        dark={<FoundationsDark />}
        mobile={<FoundationsMobile />}
      />
      <Stage name="Analytics" light={<AnalyticsLight />} dark={<AnalyticsDark />} mobile={<AnalyticsMobile />} />
      <Stage name="MobileApp" id="mobile-app" light={<MobileAppLight />} dark={<MobileAppDark />} mobile={<MobileAppMobile />} />
      <Stage name="Domains" id="domains" light={<DomainsLight />} dark={<DomainsDark />} mobile={<Domains />} />
      <Faqs />
      <Stage name="Band" light={<BandLight />} dark={<BandDark />} mobile={<SignupBand />} />
    </PageShell>
  );
}
