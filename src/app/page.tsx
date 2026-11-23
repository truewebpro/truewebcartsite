// src/app/page.tsx
import PageShell from "./PageShell";
import { getCatalog } from "@/lib/db";
import Hero from "./home/Hero";
import ShopBuilder from "./home/ShopBuilder";
import Plans from "./home/Plans";
import Describe from "./home/Describe";
import Templates from "./home/Templates";
import Integrations from "./home/Integrations";
import Foundations from "./home/Foundations";
import Analytics from "./home/Analytics";
import MobileApp from "./home/MobileApp";
import { Domains, Faqs, SignupBand } from "./home/Closing";
import { Heading, Section } from "./home/parts";

export default async function Home() {
  const catalog = await getCatalog();

  return (
    <PageShell home>
      <Hero />
      <ShopBuilder />
      <Plans catalog={catalog} />
      <Describe />
      <Section>
        <Heading title="Pick the website template you love" />
        <Templates />
      </Section>
      <Integrations catalog={catalog} />
      <Section>
        <Heading
          title="Build your online shop on solid foundations"
          sub="We look after hosting, security and updates, so your online shop stays fast and safe."
        />
        <Foundations />
      </Section>
      <Analytics />
      <MobileApp />
      <Domains />
      <Faqs />
      <SignupBand />
    </PageShell>
  );
}
