// src/app/home/LargePlans.tsx
// "For large businesses": the plans from £400 a month (Enterprise, Unlimited), under the 4 plan cards on the home page.
// Names and prices come from super admin › Plans and apps; the lines below are the copy for each plan.
import Link from "next/link";
import { type Catalog, type Plan, formatPrice, planLines } from "@/lib/catalog";
import { SIGNUP_URL } from "../site/links";

/** Super admin tools, not listed in the App Store yet: not named or counted on the site. */
const NOT_LISTED = ["claude", "shopify"];

/** Plans at or above this monthly price (pence) show here instead of in the 4 cards. */
export const LARGE_FROM = 40000;

const COPY: Record<string, { tag: string; lines: (apps: number) => string[] }> = {
  enterprise: {
    tag: "For big shops and teams",
    lines: (apps) => [
      "Everything in Elite",
      `${apps} apps included`,
      "Write with AI and Shop assistant (5,000 chats a month)",
      "Subscriptions",
      "Dropship",
      "Priority support",
    ],
  },
  unlimited: {
    tag: "Every app, no caps",
    lines: () => [
      "Everything in Enterprise",
      "Every app included, now and new ones",
      "Sales reps with commission",
      "Sell as a dropship supplier",
      "Unlimited AI chats (fair use)",
      "Account manager and free move from Shopify",
    ],
  },
};

export function largePlans(catalog: Catalog): Plan[] {
  return catalog.plans
    .filter((p) => p.kind === "shop" && (p.monthlyPrice ?? 0) >= LARGE_FROM)
    .sort((a, b) => (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0));
}

function trialHref(catalog: Catalog, p: Plan) {
  if (!p.signupReady || !catalog.signupUrl) return `/contact?plan=${encodeURIComponent(p.slug)}`;
  return `${SIGNUP_URL}?${new URLSearchParams({ plan: p.slug })}`; // "Start 3 days free": the free trial
}

const year = (pence: number | null) => (pence === null ? null : `£${(pence / 100).toLocaleString("en-GB")}`);

export default function LargePlans({ catalog }: { catalog: Catalog }) {
  const plans = largePlans(catalog);
  if (!plans.length) return null;
  const top = plans[plans.length - 1].slug;
  const included = (slug: string) => catalog.planApps.filter((pa) => pa.planSlug === slug && pa.status === "included" && !NOT_LISTED.includes(pa.appKey)).length;

  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 bg-[#DCE6F7] dark:bg-[#0B2350]">
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[420px] h-[420px] rounded-full blur-[70px] opacity-40 dark:opacity-35 bg-[#FF8A5C] -left-16 top-10" />
        <div className="absolute w-[420px] h-[420px] rounded-full blur-[70px] opacity-40 dark:opacity-35 bg-[#5B86D6] left-[42%] top-32" />
        <div className="absolute w-[420px] h-[420px] rounded-full blur-[70px] opacity-40 dark:opacity-35 bg-[#3DDC91] -right-20 top-0" />
      </div>
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h3 className="m-0 text-[30px] sm:text-[38px] leading-[1.1] font-extrabold tracking-[-1px] text-[var(--h-text)]">For large businesses</h3>
            <p className="mt-2.5 max-w-[560px] text-[17px] leading-[1.5] text-[var(--h-muted)]">
              Every app, priority help and room to grow. Start with 3 days free, no credit card required.
            </p>
          </div>
          <p className="text-[14px] font-bold text-[var(--h-muted)] whitespace-nowrap">Pay yearly: 2 months free</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {plans.map((p) => {
            const copy = COPY[p.slug] ?? COPY[p.name.toLowerCase()];
            const isTop = p.slug === top;
            const lines = copy ? copy.lines(included(p.slug)) : planLines(catalog, p);
            return (
              <article
                key={p.slug}
                className={`relative grid gap-5 sm:grid-cols-[1fr_1.15fr] sm:gap-7 rounded-[24px] px-7 pt-[30px] pb-7 backdrop-blur-[22px] backdrop-saturate-[1.6] bg-white/[0.55] shadow-[0_24px_60px_rgba(11,47,102,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] dark:bg-white/[0.08] dark:shadow-[0_24px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] ${
                  isTop ? "border-2 border-[#D92A04]" : "border border-white/80 dark:border-white/[0.18]"
                }`}
              >
                {isTop && (
                  <span className="absolute -top-[13px] left-7 px-3.5 py-1.5 rounded-full bg-[#0F6B3A] text-white text-[12px] font-extrabold">
                    Everything, no limits
                  </span>
                )}
                <div>
                  <h4 className="text-[24px] font-extrabold text-[var(--h-text)]">{p.name}</h4>
                  <p className="mt-1 text-[14px] text-[var(--h-muted)]">{copy?.tag ?? "For large businesses"}</p>
                  <p className="mt-[18px] mb-1 flex items-baseline gap-1 text-[var(--h-text)]">
                    <span className="text-[46px] font-extrabold tracking-[-1.5px]">{formatPrice(p.monthlyPrice)}</span>
                    <span className="text-[15px] font-semibold text-[var(--h-muted)]">/month</span>
                  </p>
                  <p className="mb-5 text-[13px] text-[var(--h-muted)]">{p.yearlyPrice ? `or ${year(p.yearlyPrice)} a year` : " "}</p>
                  {isTop ? (
                    <Link href={trialHref(catalog, p)} className="block text-center py-3 rounded-full bg-[#D92A04] text-white text-[15px] font-extrabold">Start 3 days free</Link>
                  ) : (
                    <Link href={trialHref(catalog, p)} className="block text-center py-[10px] rounded-full border-2 border-[#081F45] text-[#081F45] dark:border-white dark:text-white text-[15px] font-extrabold">Start 3 days free</Link>
                  )}
                  <Link href={`/contact?plan=${encodeURIComponent(p.slug)}`} className="block mt-2.5 text-center text-[14px] font-bold underline underline-offset-[3px] text-[#081F45] dark:text-white">
                    Talk to us
                  </Link>
                </div>
                <ul className="grid gap-2.5 content-start">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
