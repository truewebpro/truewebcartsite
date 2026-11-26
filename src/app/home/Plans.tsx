// src/app/home/Plans.tsx
// "Find the right plan" on the home page, at every screen size. Business Website plans show first, with a
// switch to Ecommerce Website plans. Names, prices and lines come from super admin › Plans and apps.
import { type Catalog, type Plan, formatPrice, planLines } from "@/lib/catalog";
import { SIGNUP_URL } from "../site/links";
import { Heading } from "./parts";
import SectionBg from "./SectionBg";
import PlansSwitch, { type CardData, type KindData } from "./PlansSwitch";

const LINES: Record<string, { tag: string; lines: string[] }> = {
  starter: { tag: "Start selling online", lines: [] },
  basic: { tag: "For your first online shop", lines: ["Online shop and checkout", "Payments built in", "Delivery labels", "Product reviews", "Sign-up pop-up", "Google tools"] },
  ecommerce: { tag: "Grow your sales", lines: ["Everything in Basic", "Loyalty and rewards", "Pre-orders", "Write with AI", "Order risk checks", "Delivery protection"] },
  elite: { tag: "Sell more, do less", lines: ["Everything in Ecommerce", "Subscriptions", "Shop assistant (AI chat)", "VAT display switch", "Trade accounts (B2B)"] },
};

/** Badge for a plan: Most popular wins; Starter gets its own badge. */
export function planBadge(p: Plan, popular: boolean): string | null {
  if (popular) return "Most popular";
  if (p.name.toLowerCase() === "starter") return "Starter";
  return null;
}

function chooseHref(catalog: Catalog, p: Plan) {
  if (!p.signupReady || !catalog.signupUrl) return `/contact?plan=${encodeURIComponent(p.slug)}`;
  return `${SIGNUP_URL}?${new URLSearchParams({ plan: p.slug })}`; // "Start 3 days free": the free trial
}

function cards(catalog: Catalog, plans: Plan[], fallbackPopular: string | null): CardData[] {
  const anyPopular = plans.some((p) => p.isPopular);
  return plans.map((p) => {
    const copy = LINES[p.name.toLowerCase()];
    const popular = p.isPopular || (!anyPopular && p.slug === fallbackPopular);
    const tag =
      p.kind === "website"
        ? p.pagesLimit
          ? `Up to ${p.pagesLimit} ${p.pagesLimit === 1 ? "page" : "pages"}`
          : "Business website plan"
        : copy?.tag ?? "Online shop plan";
    return {
      key: p.slug,
      name: p.name,
      tag,
      price: formatPrice(p.monthlyPrice) ?? "",
      unit: "/month",
      button: "Start 3 days free",
      href: chooseHref(catalog, p),
      lines: copy?.lines.length ? copy.lines : planLines(catalog, p),
      badge: planBadge(p, popular),
      popular,
    };
  });
}

export default function Plans({ catalog }: { catalog: Catalog }) {
  const byPrice = (a: Plan, b: Plan) => (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0);
  const shop = catalog.plans.filter((p) => p.kind === "shop" && p.monthlyPrice !== null).sort(byPrice).slice(0, 3);
  const web = catalog.plans.filter((p) => p.kind === "website" && p.monthlyPrice !== null).sort(byPrice).slice(0, 3);
  const ecommerceSlug = shop.find((p) => p.name.toLowerCase() === "ecommerce")?.slug ?? null;

  const kinds: KindData[] = [];
  if (web.length) {
    kinds.push({
      key: "website",
      label: "Business Website",
      includes: ["Custom domain", "Secure hosting", "Forms and booking requests", "AI assistant", "24/7 support team"],
      free: {
        key: "free-website", name: "Free", tag: "Try it before you pay", price: "£0", unit: "for 3 days", button: "Start free", href: SIGNUP_URL,
        lines: ["Build your website from a template", "Add your pages and photos", "Try every feature", "Pick a plan when you are ready"], badge: null, popular: false,
      },
      plans: cards(catalog, web, web.length === 3 ? web[1].slug : null),
    });
  }
  kinds.push({
    key: "shop",
    label: "Ecommerce Website",
    includes: ["Custom domain", "Secure hosting", "Payments built in", "AI shop assistant", "24/7 support team"],
    free: {
      key: "free-shop", name: "Free", tag: "Try it before you pay", price: "£0", unit: "for 3 days", button: "Start free", href: SIGNUP_URL,
      lines: ["Build your online shop from a template", "Add your products", "Try every feature", "Pick a plan when you are ready"], badge: null, popular: false,
    },
    plans: cards(catalog, shop, ecommerceSlug),
  });

  return (
    <section id="plans" className="relative overflow-hidden scroll-mt-16 py-14 sm:py-20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#071633_0%,#0B2350_100%)]">
      <SectionBg />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Heading title="Find the right plan for your business" sub="Every plan starts with 3 days free. No credit card required." />
        <PlansSwitch kinds={kinds} />
      </div>
    </section>
  );
}
