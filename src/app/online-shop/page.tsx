// src/app/online-shop/page.tsx
import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageShell from "../PageShell";
import { Container, CtaBand, Eyebrow } from "../site/ui";
import { SHOP_FEATURES } from "@/lib/features";

export const metadata: Metadata = {
  title: "Online shop features",
  description:
    "Products, checkout and payments, UK delivery, orders, loyalty, B2B trade and sales reps, an AI shop assistant and more, all in one admin.",
};

export default function OnlineShopPage() {
  return (
    <PageShell>
      <section className="bg-navy text-white">
        <Container className="pt-20 pb-16">
          <Eyebrow light>Online shop</Eyebrow>
          <h1 className="mt-4 font-display font-bold text-[40px] sm:text-[56px] leading-[1.06] max-w-[860px]">
            Every feature you need to sell online, to shoppers and to the trade.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#D5DEEE] max-w-[680px]">
            Your own fast shop on your own domain, run from one admin. Features marked App can be switched on from
            the App Store when you need them.
          </p>
          <nav aria-label="Feature groups" className="flex flex-wrap gap-2.5 mt-8">
            {SHOP_FEATURES.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="px-4 py-2.5 rounded-full bg-navy-soft border border-[#2B5296] text-sm font-medium hover:bg-[#1A4A94]"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="pt-14 pb-8 flex flex-col gap-5">
        {SHOP_FEATURES.map((g, i) => (
          <section
            key={g.id}
            id={g.id}
            className="scroll-mt-24 bg-white border border-line rounded-3xl p-7 sm:p-9 flex flex-wrap gap-9"
          >
            <div className="flex-[1_1_300px] min-w-0">
              <p className="font-display text-[15px] font-semibold text-cta-text">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display font-bold text-3xl leading-tight text-navy">{g.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{g.text}</p>
            </div>
            <ul className="flex-[2_1_560px] min-w-0 grid gap-x-7 gap-y-3.5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {g.items.map((it) => (
                <li key={it.text} className="flex gap-2.5 items-start text-[15px] leading-normal text-graphite">
                  <Check aria-hidden className="w-[18px] h-[18px] mt-0.5 shrink-0 text-navy" strokeWidth={2.6} />
                  <span>
                    {it.text}
                    {it.app && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-[#EEF2FA] text-navy text-xs font-semibold whitespace-nowrap">
                        App
                      </span>
                    )}
                    {it.soon && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-[#FDEDE8] text-[#9A2002] text-xs font-semibold whitespace-nowrap">
                        Coming soon
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>

      <div className="pt-8">
        <CtaBand
          title="See which plan has what you need."
          primary={{ href: "/pricing", label: "Compare plans" }}
        />
      </div>
    </PageShell>
  );
}
