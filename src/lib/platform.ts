// src/lib/platform.ts
import { NOT_LISTED, type App, type AppStatus, type Catalog, type Plan, type PlanApp, type SiteKind } from "./catalog";

/**
 * Reads plans and apps from the platform (super.twcarts.com/public-api/catalog), so prices and what each plan
 * includes are set once, in the super admin's Plans and apps. Next.js keeps the answer for 5 minutes.
 */

export const PLATFORM_URL = (process.env.PLATFORM_URL ?? "https://super.twcarts.com").replace(/\/+$/, "");

interface RawPlan {
  slug: string;
  name: string;
  site_type?: string;
  monthly_price: number | null;
  yearly_price: number | null;
  trial_days: number | null;
  products_limit: number | null;
  staff_limit: number | null;
  pages_limit: number | null;
  is_popular: boolean;
  signup_ready: boolean;
  apps: Record<string, string>;
}

interface RawApp {
  key: string;
  name: string;
  category: string;
  line: string | null;
  icon: string | null;
  every_plan: boolean;
  sold_alone: boolean;
  monthly_price: number | null;
  yearly_price: number | null;
  trial_days: number | null;
}

export interface RawCatalog {
  categories: Record<string, string>;
  plans: RawPlan[];
  apps: RawApp[];
  signup_url?: string;
}

/** The platform's answer as it came (kept as the last good copy), or null when it can't be reached. */
export async function fetchRawCatalog(): Promise<RawCatalog | null> {
  try {
    const res = await fetch(`${PLATFORM_URL}/public-api/catalog`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { data?: RawCatalog };
    if (!body.data || !Array.isArray(body.data.plans) || !Array.isArray(body.data.apps)) throw new Error("unexpected answer");
    return body.data;
  } catch (err) {
    console.error("[platform] catalog not available:", err);
    return null;
  }
}

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

export function toCatalog(raw: RawCatalog, source: Catalog["source"]): Catalog {
  const plans: Plan[] = raw.plans.map((p) => ({
    slug: String(p.slug),
    kind: (p.site_type === "website" ? "website" : "shop") as SiteKind,
    name: String(p.name),
    monthlyPrice: num(p.monthly_price),
    yearlyPrice: num(p.yearly_price),
    productsLimit: num(p.products_limit),
    staffLimit: num(p.staff_limit),
    pagesLimit: num(p.pages_limit),
    trialDays: num(p.trial_days),
    isPopular: Boolean(p.is_popular),
    signupReady: Boolean(p.signup_ready),
  }));
  const apps: App[] = raw.apps.filter((a) => !NOT_LISTED.includes(String(a.key))).map((a) => ({
    key: String(a.key),
    name: String(a.name),
    category: String(a.category),
    line: a.line ?? null,
    icon: a.icon ?? null,
    everyPlan: Boolean(a.every_plan),
    soldAlone: Boolean(a.sold_alone),
    addonMonthly: num(a.monthly_price),
    addonYearly: num(a.yearly_price),
    trialDays: num(a.trial_days),
  }));
  const planApps: PlanApp[] = raw.plans.flatMap((p) =>
    Object.entries(p.apps ?? {})
      .filter(([key, mode]) => (mode === "included" || mode === "addon") && !NOT_LISTED.includes(key))
      .map(([appKey, mode]) => ({ planSlug: String(p.slug), appKey, status: mode as AppStatus }))
  );
  return {
    plans,
    apps,
    planApps,
    categories: raw.categories ?? {},
    signupUrl: raw.signup_url ?? `${PLATFORM_URL.replace("://super.", "://admin.")}/signup`,
    source,
  };
}
