// src/lib/catalog.ts
/**
 * Plans, apps and feature lists shown on the site.
 * The plans, apps and plan_apps rows are seeded into Postgres from here on
 * first run (only when the tables are empty). After that, edit them in the
 * database. This file is also the fallback when the database is unreachable.
 * Prices are in pence; null means "not set yet" and shows "Ask for a price".
 */

export type SiteKind = "shop" | "website";
export type AppStatus = "included" | "addon";

export interface Plan {
  slug: string;
  kind: SiteKind;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  highlights: string[];
  isPopular: boolean;
}

export interface App {
  key: string;
  name: string;
  category: string;
  description: string;
  soldAlone: boolean;
  addonMonthly: number | null;
  addonYearly: number | null;
  trialDays: number;
}

export interface PlanApp {
  planSlug: string;
  appKey: string;
  status: AppStatus;
}

export interface Catalog {
  plans: Plan[];
  apps: App[];
  planApps: PlanApp[];
}

export const APP_CATEGORIES = [
  "Sell more",
  "B2B",
  "Marketing",
  "Protection",
  "Shipping and tools",
] as const;

export const PLANS_SEED: Plan[] = [
  {
    slug: "starter",
    kind: "shop",
    name: "Starter",
    tagline: "For a new shop getting its first orders.",
    monthlyPrice: null,
    yearlyPrice: null,
    highlights: [
      "Online shop with cart and checkout",
      "All payment providers",
      "Delivery zones and Click and Collect",
      "Orders, customers and discount codes",
      "Admin app for iPhone and Android",
    ],
    isPopular: false,
  },
  {
    slug: "growth",
    kind: "shop",
    name: "Growth",
    tagline: "For a busy shop that wants repeat customers.",
    monthlyPrice: null,
    yearlyPrice: null,
    highlights: [
      "Everything in Starter",
      "Loyalty, pre-order and price match",
      "Write with AI",
      "Order risk and delivery protection",
      "VIP access links",
    ],
    isPopular: true,
  },
  {
    slug: "pro",
    kind: "shop",
    name: "Pro",
    tagline: "For shops that sell to the trade too.",
    monthlyPrice: null,
    yearlyPrice: null,
    highlights: [
      "Everything in Growth",
      "Trade accounts and company prices",
      "Bulk order form and sales reps",
      "Ava shop assistant",
      "Subscriptions and Claude connector",
    ],
    isPopular: false,
  },
  {
    slug: "website-5",
    kind: "website",
    name: "Website 5",
    tagline: "A simple site for a local business.",
    monthlyPrice: null,
    yearlyPrice: null,
    highlights: [
      "5 pages, home page counts",
      "Templates and sections",
      "Forms and booking requests to your Inbox",
      "Opening hours and map",
      "Blog",
    ],
    isPopular: false,
  },
  {
    slug: "website-10",
    kind: "website",
    name: "Website 10",
    tagline: "More room for services, menus and news.",
    monthlyPrice: null,
    yearlyPrice: null,
    highlights: [
      "10 pages, home page counts",
      "Everything in Website 5",
      "Write with AI",
      "Google tools",
      "Move to an online shop any time",
    ],
    isPopular: true,
  },
];

const app = (
  key: string,
  name: string,
  category: string,
  description: string,
  trialDays = 0
): App => ({
  key,
  name,
  category,
  description,
  soldAlone: true,
  addonMonthly: null,
  addonYearly: null,
  trialDays,
});

export const APPS_SEED: App[] = [
  app("signup_popup", "Sign-up pop-up", "Sell more", "Welcome codes for new email sign-ups"),
  app("reviews", "Product reviews", "Sell more", "Star ratings and photo reviews"),
  app("back_in_stock", "Back in stock", "Sell more", "Email customers when stock returns"),
  app("loyalty", "Loyalty and rewards", "Sell more", "Points on every order"),
  app("pre_order", "Pre-order", "Sell more", "Take orders before stock arrives"),
  app("price_match", "Price match", "Sell more", "Customers send a lower price they found"),
  app("subscriptions", "Subscriptions", "Sell more", "Repeat orders on a schedule"),
  app("b2b", "Trade accounts", "B2B", "Applications, companies and their own prices"),
  app("bulk_order", "Bulk order", "B2B", "One form to order many products"),
  app("sales_reps", "Sales reps", "B2B", "Rep portal, commission and price proposals"),
  app("google", "Google", "Marketing", "Search Console, Analytics, Merchant Center and Ads"),
  app("write_ai", "Write with AI", "Marketing", "Product descriptions and page text"),
  app("assistant", "Shop assistant", "Marketing", "Ava answers customers and helps them buy"),
  app("claude_connector", "Claude connector", "Marketing", "Write and publish content from Claude"),
  app("age_check", "Age check", "Protection", "Photo ID check for age-restricted products"),
  app("order_risk", "Order risk", "Protection", "Flags orders that look like fraud"),
  app("delivery_protection", "Delivery protection", "Protection", "Optional cover at checkout"),
  app("vip", "VIP access", "Protection", "Private links to hidden products"),
  app("sendcloud", "Sendcloud", "Shipping and tools", "Labels for Royal Mail and DPD"),
  app("emails", "Emails", "Shipping and tools", "Order and marketing emails through Mailtrap"),
  app("shopify_import", "Shopify import", "Shipping and tools", "Move everything from Shopify"),
];

/** Lowest shop plan that includes each app (lower plans get it as an add-on). */
const SHOP_LEVEL: Record<string, number> = {
  signup_popup: 1, reviews: 1, back_in_stock: 1, google: 1, age_check: 1,
  sendcloud: 1, emails: 1, shopify_import: 1,
  loyalty: 2, pre_order: 2, price_match: 2, write_ai: 2, order_risk: 2,
  delivery_protection: 2, vip: 2,
  subscriptions: 3, b2b: 3, bulk_order: 3, sales_reps: 3, assistant: 3,
  claude_connector: 3,
};

/** Website plans: apps that make sense without a cart. */
const WEBSITE_APPS: Record<string, [AppStatus, AppStatus]> = {
  signup_popup: ["included", "included"],
  google: ["included", "included"],
  emails: ["included", "included"],
  age_check: ["included", "included"],
  write_ai: ["addon", "included"],
  assistant: ["addon", "addon"],
  claude_connector: ["addon", "addon"],
};

function buildPlanApps(): PlanApp[] {
  const rows: PlanApp[] = [];
  const shopPlans = ["starter", "growth", "pro"];
  for (const a of APPS_SEED) {
    shopPlans.forEach((planSlug, i) => {
      rows.push({
        planSlug,
        appKey: a.key,
        status: i + 1 >= (SHOP_LEVEL[a.key] ?? 1) ? "included" : "addon",
      });
    });
    const web = WEBSITE_APPS[a.key];
    if (web) {
      rows.push({ planSlug: "website-5", appKey: a.key, status: web[0] });
      rows.push({ planSlug: "website-10", appKey: a.key, status: web[1] });
    }
  }
  return rows;
}

export const PLAN_APPS_SEED: PlanApp[] = buildPlanApps();

export const CATALOG_SEED: Catalog = {
  plans: PLANS_SEED,
  apps: APPS_SEED,
  planApps: PLAN_APPS_SEED,
};

export function formatPrice(pence: number | null): string | null {
  if (pence === null) return null;
  const pounds = pence / 100;
  return `£${Number.isInteger(pounds) ? pounds : pounds.toFixed(2)}`;
}
