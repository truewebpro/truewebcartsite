import type { Metadata } from "next";
import PageShell from "../PageShell";
import ContactUs02Orbit from "../ContactUs02Orbit";
import { getServices } from "@/lib/db";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Tell us about your project and we'll come back with a clear, fixed quote.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const [services, sp] = await Promise.all([getServices(), searchParams]);
  const requested = Array.isArray(sp.service) ? sp.service[0] : sp.service;
  const defaultService = services.some((s) => s.slug === requested) ? (requested as string) : "";

  return (
    <PageShell>
      <ContactUs02Orbit
        services={services.map((s) => ({ slug: s.slug, title: s.title }))}
        defaultService={defaultService}
        bgClass="bg-transparent"
      />
    </PageShell>
  );
}
