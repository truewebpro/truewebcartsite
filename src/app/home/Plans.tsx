// src/app/home/Plans.tsx
import Link from "next/link";
import { Check } from "lucide-react";
import { type Catalog, type Plan, formatPrice, planLines } from "@/lib/catalog";
import { SIGNUP_URL } from "../site/links";
import { Heading, Section } from "./parts";

const INCLUDES = ["Custom domain", "Secure hosting", "Payments built in", "AI shop assistant", "24/7 support team"];

/** Card lines for the home page, by plan name. Plans not listed here use lines worked out from the platform. */
const LINES: Record<string, { tag: string; lines: string[] }> = {
  basic: { tag: "For your first online shop", lines: ["Online shop and checkout", "Payments built in", "Delivery labels", "Product reviews", "Sign-up pop-up", "Google tools"] },
  ecommerce: { tag: "Grow your sales", lines: ["Everything in Basic", "Loyalty and rewards", "Pre-orders", "Write with AI", "Order risk checks", "Delivery protection"] },
  elite: { tag: "Sell more, do less", lines: ["Everything in Ecommerce", "Subscriptions", "Shop assistant (AI chat)", "Claude connector", "Trade accounts (B2B)"] },
};

function chooseHref(catalog: Catalog, p: Plan) {
  if (!p.signupReady || !catalog.signupUrl) return `/contact?plan=${encodeURIComponent(p.slug)}`;
  return `${catalog.signupUrl}?${new URLSearchParams({ plan: p.slug, interval: "month" })}`;
}

function Lines({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-2.5">
      {items.map((l) => (
        <li key={l} className="flex gap-2.5 items-start text-[15px] text-[var(--h-body)]">
          <Check className="w-[18px] h-[18px] mt-0.5 shrink-0 text-[#0F8A55]" strokeWidth={2.8} aria-hidden />
          {l}
        </li>
      ))}
    </ul>
  );
}

export default function Plans({ catalog }: { catalog: Catalog }) {
  const shop = catalog.plans
    .filter((p) => p.kind === "shop" && p.monthlyPrice !== null)
    .sort((a, b) => (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0))
    .slice(0, 3);
  const anyPopular = shop.some((p) => p.isPopular);

  return (
    <Section id="plans" glows>
      <Heading title="Find the right plan for your online shop" sub="Every plan starts with 3 days free. No credit card required." />

      <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
        <span className="text-[14px] font-extrabold text-[var(--h-text)] mr-1">Every plan includes</span>
        {INCLUDES.map((i) => (
          <span key={i} className="px-3 py-1.5 rounded-full text-[13px] font-bold bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[var(--h-text)]">
            {i}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
        <article className="h-glass rounded-[26px] p-6 flex flex-col">
          <h3 className="text-[22px] font-extrabold text-[var(--h-text)]">Free</h3>
          <p className="text-[14px] text-[var(--h-muted)]">Try it before you pay</p>
          <p className="mt-5 flex items-baseline gap-1.5">
            <span className="text-[44px] font-extrabold tracking-[-1px] text-[var(--h-text)]">£0</span>
            <span className="text-[15px] font-bold text-[var(--h-muted)]">for 3 days</span>
          </p>
          <a href={SIGNUP_URL} className="mt-5 py-3 rounded-full border-2 border-[var(--h-text)] text-center font-extrabold text-[var(--h-text)]">
            Start free
          </a>
          <Lines items={["Build your online shop from a template", "Add your products", "Try every feature", "Pick a plan when you are ready"]} />
        </article>

        {shop.map((p) => {
          const copy = LINES[p.name.toLowerCase()];
          const popular = p.isPopular || (!anyPopular && p.name.toLowerCase() === "ecommerce");
          return (
            <article
              key={p.slug}
              className={`relative rounded-[26px] p-6 flex flex-col ${
                popular ? "bg-[#081F45] text-white shadow-[0_30px_70px_rgba(8,31,69,0.35)] dark:ring-1 dark:ring-white/20" : "h-glass"
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-cta text-white text-[12px] font-extrabold">Most popular</span>
              )}
              <h3 className={`text-[22px] font-extrabold ${popular ? "text-white" : "text-[var(--h-text)]"}`}>{p.name}</h3>
              <p className={`text-[14px] ${popular ? "text-[#C9D4EA]" : "text-[var(--h-muted)]"}`}>{copy?.tag ?? "Online shop plan"}</p>
              <p className="mt-5 flex items-baseline gap-1">
                <span className={`text-[44px] font-extrabold tracking-[-1px] ${popular ? "text-white" : "text-[var(--h-text)]"}`}>{formatPrice(p.monthlyPrice)}</span>
                <span className={`text-[15px] font-bold ${popular ? "text-[#C9D4EA]" : "text-[var(--h-muted)]"}`}>/month</span>
              </p>
              <Link
                href={chooseHref(catalog, p)}
                className={`mt-5 py-3 rounded-full text-center font-extrabold transition-colors ${
                  popular ? "bg-cta text-white hover:bg-[#c02503]" : "bg-[#081F45] text-white hover:bg-[#0B2F66] dark:bg-white dark:text-[#081F45]"
                }`}
              >
                Start 3 days free
              </Link>
              <div className={popular ? "[&_li]:text-[#E3EAF7]" : ""}>
                <Lines items={copy?.lines ?? planLines(catalog, p)} />
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-center">
        <Link href="/pricing" className="text-[15px] font-extrabold text-[var(--h-cta-text)] underline underline-offset-4">
          Compare all plans
        </Link>
      </p>
    </Section>
  );
}
