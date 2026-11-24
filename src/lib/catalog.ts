// src/lib/catalog.ts
/**
 * Plans and App Store apps shown on the site.
 * They come from the platform (super.twcarts.com › Plans and apps) through src/lib/platform.ts.
 * The seed below is only a last fallback, for local development or if the platform has never answered.
 * Prices are in pence; null means "not set yet".
 */

export type SiteKind = "shop" | "website";
export type AppStatus = "included" | "addon";

export interface Plan {
  slug: string;
  kind: SiteKind;
  name: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  productsLimit: number | null;
  staffLimit: number | null;
  pagesLimit: number | null;
  trialDays: number | null;
  isPopular: boolean;
  /** Can be bought on the sign-up page now. */
  signupReady: boolean;
}

export interface App {
  key: string;
  name: string;
  category: string;
  line: string | null;
  icon: string | null;
  everyPlan: boolean;
  soldAlone: boolean;
  addonMonthly: number | null;
  addonYearly: number | null;
  trialDays: number | null;
}

/** Super admin tools, not in the App Store yet: the site never names, lists or counts them. */
export const NOT_LISTED = ["claude", "shopify"];

export interface PlanApp {
  planSlug: string;
  appKey: string;
  status: AppStatus;
}

export interface Catalog {
  plans: Plan[];
  apps: App[];
  planApps: PlanApp[];
  /** category key => name, in display order */
  categories: Record<string, string>;
  signupUrl: string | null;
  /** "platform" (fresh), "snapshot" (last good copy) or "seed" */
  source: "platform" | "snapshot" | "seed";
}

const plan = (slug: string, kind: SiteKind, name: string, isPopular = false): Plan => ({
  slug, kind, name, monthlyPrice: null, yearlyPrice: null, productsLimit: null, staffLimit: null,
  pagesLimit: kind === "website" ? (slug.endsWith("10") ? 10 : 5) : null, trialDays: null, isPopular, signupReady: false,
});

const app = (key: string, name: string, category: string, line: string): App => ({
  key, name, category, line, icon: null, everyPlan: false, soldAlone: true, addonMonthly: null, addonYearly: null, trialDays: null,
});

const PLANS_SEED: Plan[] = [
  plan("starter", "shop", "Starter"),
  plan("growth", "shop", "Growth", true),
  plan("pro", "shop", "Pro"),
  plan("website-5", "website", "Website 5"),
  plan("website-10", "website", "Website 10", true),
];

const APPS_SEED: App[] = [
  app("popup", "Sign-up pop-up", "sell", "Emails for a discount code"),
  app("reviews", "Product reviews", "sell", "Stars and reviews on products"),
  app("bis", "Back in stock", "sell", "Email when it's back"),
  app("loyalty", "Loyalty & rewards", "sell", "Points for every order"),
  app("preorder", "Pre-order", "sell", "Sell before stock arrives"),
  app("pricematch", "Price match", "sell", "Customers send a cheaper price"),
  app("subs", "Subscriptions", "sell", "Repeat orders on a schedule"),
  app("b2b", "Trade accounts", "b2b", "B2B companies and their prices"),
  app("bulk", "Bulk order", "b2b", "Order many products in one go"),
  app("reps", "Sales reps", "b2b", "Reps order for customers, earn commission"),
  app("google", "Google", "marketing", "Search Console, Analytics, Merchant Center, Ads"),
  app("writer", "Write with AI", "marketing", "Descriptions and SEO text"),
  app("ava", "Shop assistant", "marketing", "AI chat that sells"),
  app("age", "Age check", "protection", "18+ pop-up and photo ID"),
  app("risk", "Order risk", "protection", "Spot risky orders"),
  app("protect", "Delivery protection", "protection", "Cover lost and damaged parcels"),
  app("vip", "VIP access", "protection", "Products only some customers see"),
  app("sendcloud", "Sendcloud", "tools", "Labels and tracking"),
  app("emails", "Emails (Mailtrap)", "tools", "Send marketing emails"),
];

/** Lowest shop plan (1 Starter, 2 Growth, 3 Pro) that includes each app; lower plans get it as an add-on. */
const SHOP_LEVEL: Record<string, number> = {
  popup: 1, reviews: 1, bis: 1, google: 1, age: 1, sendcloud: 1, emails: 1, shopify: 1,
  loyalty: 2, preorder: 2, pricematch: 2, writer: 2, risk: 2, protect: 2, vip: 2,
  subs: 3, b2b: 3, bulk: 3, reps: 3, ava: 3, claude: 3,
};
const WEBSITE_APPS: Record<string, [AppStatus, AppStatus]> = {
  popup: ["included", "included"], google: ["included", "included"], emails: ["included", "included"],
  age: ["included", "included"], writer: ["addon", "included"], ava: ["addon", "addon"], claude: ["addon", "addon"],
};

function seedPlanApps(): PlanApp[] {
  const rows: PlanApp[] = [];
  for (const a of APPS_SEED) {
    ["starter", "growth", "pro"].forEach((planSlug, i) =>
      rows.push({ planSlug, appKey: a.key, status: i + 1 >= (SHOP_LEVEL[a.key] ?? 1) ? "included" : "addon" })
    );
    const web = WEBSITE_APPS[a.key];
    if (web) {
      rows.push({ planSlug: "website-5", appKey: a.key, status: web[0] });
      rows.push({ planSlug: "website-10", appKey: a.key, status: web[1] });
    }
  }
  return rows;
}

export const CATEGORIES_SEED: Record<string, string> = {
  sell: "Sell more",
  b2b: "B2B",
  marketing: "Marketing",
  protection: "Protection",
  tools: "Shipping & tools",
  design: "Design",
  dropship: "Dropshipping",
};

export const CATALOG_SEED: Catalog = {
  plans: PLANS_SEED,
  apps: APPS_SEED,
  planApps: seedPlanApps(),
  categories: CATEGORIES_SEED,
  signupUrl: null,
  source: "seed",
};

export function formatPrice(pence: number | null): string | null {
  if (pence === null) return null;
  const pounds = pence / 100;
  return `£${Number.isInteger(pounds) ? pounds : pounds.toFixed(2)}`;
}

/** Plan card lines, worked out from the plan's limits and apps (no copy to keep in step). */
export function planLines(catalog: Catalog, p: Plan): string[] {
  const included = (slug: string) =>
    new Set(catalog.planApps.filter((pa) => pa.planSlug === slug && pa.status === "included").map((pa) => pa.appKey));
  const mine = included(p.slug);
  const lines: string[] = [];

  if (p.kind === "website") {
    lines.push(p.pagesLimit === 1 ? "1 page" : p.pagesLimit ? `${p.pagesLimit} pages, home page counts` : "Unlimited pages");
  } else {
    lines.push(p.productsLimit ? `${p.productsLimit.toLocaleString("en-GB")} products` : "Unlimited products");
  }
  lines.push(p.staffLimit ? `${p.staffLimit} staff ${p.staffLimit === 1 ? "account" : "accounts"}` : "Unlimited staff accounts");

  const samePlans = catalog.plans.filter((x) => x.kind === p.kind);
  const prev = samePlans[samePlans.indexOf(p) - 1];
  const names = (keys: string[]) =>
    keys.map((k) => catalog.apps.find((a) => a.key === k)?.name).filter(Boolean) as string[];
  if (prev) {
    const extra = names([...mine].filter((k) => !included(prev.slug).has(k)));
    lines.push(`Everything in ${prev.name}`);
    if (extra.length) lines.push(`Plus ${extra.slice(0, 4).join(", ")}${extra.length > 4 ? ` and ${extra.length - 4} more` : ""}`);
  } else {
    lines.push(p.kind === "website" ? "Templates, sections and forms" : "Online shop with cart and checkout");
    const some = names([...mine].filter((k) => !catalog.apps.find((a) => a.key === k)?.everyPlan));
    if (some.length) lines.push(some.slice(0, 4).join(", "));
  }
  lines.push(`${mine.size} apps included`);
  return lines;
}
