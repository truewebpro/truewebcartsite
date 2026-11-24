// src/app/home/Plans.tsx
// Phones, tablets and small laptops. Desktop uses home/desktop/Plans.tsx (the mockup itself).
import Link from "next/link";
import { type Catalog, type Plan, formatPrice, planLines } from "@/lib/catalog";
import { SIGNUP_URL } from "../site/links";
import { Heading } from "./parts";
import SectionBg from "./SectionBg";

const INCLUDES: [string, string][] = [
  ["Custom domain", "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 0c2.8 2.7 4 6.2 4 10s-1.2 7.3-4 10m0-20c-2.8 2.7-4 6.2-4 10s1.2 7.3 4 10M2 12h20"],
  ["Secure hosting", "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"],
  ["Payments built in", "M3 6h18v12H3zM3 10h18"],
  ["AI shop assistant", "M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3Z"],
  ["24/7 support team", "M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 13v4a2 2 0 0 0 2 2h1v-6H4"],
];

const LINES: Record<string, { tag: string; lines: string[] }> = {
  basic: { tag: "For your first online shop", lines: ["Online shop and checkout", "Payments built in", "Delivery labels", "Product reviews", "Sign-up pop-up", "Google tools"] },
  ecommerce: { tag: "Grow your sales", lines: ["Everything in Basic", "Loyalty and rewards", "Pre-orders", "Write with AI", "Order risk checks", "Delivery protection"] },
  elite: { tag: "Sell more, do less", lines: ["Everything in Ecommerce", "Subscriptions", "Shop assistant (AI chat)", "Claude connector", "Trade accounts (B2B)"] },
};

const BLOBS = [
  ["#FF8A5C", "-10%", "35%", 22, 0], ["#5B86D6", "25%", "45%", 26, -5], ["#3DDC91", "55%", "38%", 24, -9],
  ["#F5A524", "75%", "44%", 28, -3], ["#D92A04", "38%", "62%", 20, -7],
] as const;

function chooseHref(catalog: Catalog, p: Plan) {
  if (!p.signupReady || !catalog.signupUrl) return `/contact?plan=${encodeURIComponent(p.slug)}`;
  return `${SIGNUP_URL}?${new URLSearchParams({ plan: p.slug })}`; // "Start 3 days free": the free trial
}

function Card({
  name, tag, price, unit, button, href, lines, popular = false, delay,
}: { name: string; tag: string; price: string; unit: string; button: string; href: string; lines: string[]; popular?: boolean; delay: number }) {
  return (
    <div className="relative flex">
      <article
        className={`relative w-full flex flex-col rounded-[24px] px-[22px] pt-7 pb-[26px] backdrop-blur-[22px] backdrop-saturate-[1.6] bg-white/[0.52] shadow-[0_24px_60px_rgba(11,47,102,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] dark:bg-white/[0.08] dark:shadow-[0_24px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] ${
          popular ? "border-2 border-[#D92A04]" : "border border-white/75 dark:border-white/[0.18]"
        }`}
      >
        {popular && (
          <span className="absolute z-[3] -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#0F6B3A] text-white text-[12px] font-extrabold whitespace-nowrap shadow-[0_8px_18px_rgba(15,107,58,0.3)]">
            Most popular
          </span>
        )}
        <h3 className="text-[22px] font-extrabold text-[var(--h-text)]">{name}</h3>
        <p className="mt-1 text-[14px] text-[var(--h-muted)]">{tag}</p>
        <p className="mt-[18px] mb-5 flex items-baseline gap-1 text-[var(--h-text)]">
          <span className="text-[46px] font-extrabold tracking-[-1.5px]">{price}</span>
          <span className="text-[15px] font-semibold text-[var(--h-muted)]">{unit}</span>
        </p>
        {popular ? (
          <Link href={href} className="block text-center py-[13px] rounded-full bg-[#D92A04] text-white text-[15px] font-extrabold">{button}</Link>
        ) : (
          <Link href={href} className="block text-center py-[11px] rounded-full border-2 border-[#081F45] text-[#081F45] dark:border-white dark:text-white text-[15px] font-extrabold">{button}</Link>
        )}
        <div className="h-px mt-[22px] mb-[18px] bg-[rgba(11,47,102,0.12)] dark:bg-white/15" />
        <ul className="grid gap-2.5">
          {lines.map((l, k) => (
            <li key={l} className={`flex gap-2 text-[14px] leading-[1.4] text-[var(--h-body)] ${k === 0 && l.startsWith("Everything") ? "font-bold" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6B3A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 dark:stroke-[#3DDC91]" aria-hidden>
                <path d="m5 12 5 5 9-10" />
              </svg>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </article>
      <div aria-hidden className="s3-shine" style={{ "--d": `${delay}s` }} />
    </div>
  );
}

export default function Plans({ catalog }: { catalog: Catalog }) {
  const shop = catalog.plans
    .filter((p) => p.kind === "shop" && p.monthlyPrice !== null)
    .sort((a, b) => (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0))
    .slice(0, 3);
  const anyPopular = shop.some((p) => p.isPopular);

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#071633_0%,#0B2350_100%)]">
      <SectionBg />
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {BLOBS.map(([c, l, t, d, delay]) => (
          <div key={c} className="s3-b absolute w-[420px] h-[420px] rounded-full opacity-[0.55] dark:opacity-[0.45] blur-[70px]" style={{ background: c, left: l, top: t, animationDuration: `${d}s`, animationDelay: `${delay}s` }} />
        ))}
      </div>
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Heading title="Find the right plan for your online shop" sub="Every plan starts with 3 days free. No credit card required." />
        <div className="mt-7 text-center">
          <p className="text-[15px] font-extrabold text-[var(--h-text)] mb-3.5">Every plan includes</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[15px] font-semibold text-[var(--h-text)]">
            {INCLUDES.map(([label, d]) => (
              <li key={label} className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 max-w-[760px] mx-auto">
          <Card name="Free" tag="Try it before you pay" price="£0" unit="for 3 days" button="Start free" href={SIGNUP_URL} delay={0}
            lines={["Build your online shop from a template", "Add your products", "Try every feature", "Pick a plan when you are ready"]} />
          {shop.map((p, k) => {
            const copy = LINES[p.name.toLowerCase()];
            const popular = p.isPopular || (!anyPopular && p.name.toLowerCase() === "ecommerce");
            return (
              <Card key={p.slug} name={p.name} tag={copy?.tag ?? "Online shop plan"} price={formatPrice(p.monthlyPrice) ?? ""} unit="/month"
                button="Start 3 days free" href={chooseHref(catalog, p)} lines={copy?.lines ?? planLines(catalog, p)} popular={popular} delay={(k + 1) * 1.5} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
