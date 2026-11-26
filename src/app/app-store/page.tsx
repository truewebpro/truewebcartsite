// src/app/app-store/page.tsx
// App Store page: every app from super admin › Plans and apps, grouped by category, with which plans include it.
import type { Metadata } from "next";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import PageShell from "../PageShell";
import { getCatalog } from "@/lib/db";
import { formatPrice, type App, type Catalog } from "@/lib/catalog";
import { SIGNUP_URL } from "../site/links";
import { Band, GlassPage, Hero, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "App Store",
  description: "Apps built into TWCarts: reviews, loyalty, subscriptions, trade accounts, AI and more. Switch on what you need.",
};

/** "Included from Basic", "Add-on £9/month" or "In plans only", worked out from the catalog. */
function planLine(catalog: Catalog, a: App) {
  if (a.everyPlan) return "Every plan";
  const shopPlans = catalog.plans.filter((p) => p.kind === "shop").sort((x, y) => (x.monthlyPrice ?? 0) - (y.monthlyPrice ?? 0));
  const first = shopPlans.find((p) => catalog.planApps.some((pa) => pa.planSlug === p.slug && pa.appKey === a.key && pa.status === "included"));
  if (first) return `Included from ${first.name}`;
  const addon = formatPrice(a.addonMonthly);
  if (a.soldAlone && addon) return `Add-on ${addon}/month`;
  return a.soldAlone ? "Add-on" : "In plans only";
}

/** Names for the category keys, used when super admin has not named a category. */
const CAT_NAMES: Record<string, string> = {
  sell: "Sell more",
  b2b: "Trade and B2B",
  marketing: "Marketing and AI",
  protection: "Protection",
  tools: "Shipping and tools",
  design: "Design",
  dropshipping: "Dropshipping",
};

export default async function AppStorePage() {
  const catalog = await getCatalog();
  const cats = [
    ...Object.keys(catalog.categories).filter((c) => catalog.apps.some((a) => a.category === c)),
    ...[...new Set(catalog.apps.map((a) => a.category))].filter((c) => !(c in catalog.categories)),
  ];

  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><LayoutGrid size={14} aria-hidden /> App Store</span>
          <h1 className="gx-h1">Apps built in. Switch on what you need.</h1>
          <p className="gx-lead">Every app is made for TWCarts, so there is nothing to install and no extra logins. Many have a free trial.</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href={SIGNUP_URL}>Start 3 days free</Link>
            <Link className="gx-btn gx-g" href="/pricing">Compare plans</Link>
          </div>
        </Hero>
        <Sec tone="a">
          {cats.length > 1 && (
            <nav className="gx-chiprow !mt-0 mb-10" aria-label="App categories">
              {cats.map((c) => (
                <a key={c} className="gx-lgp" href={`#cat-${c}`}>{catalog.categories[c] ?? CAT_NAMES[c] ?? c}</a>
              ))}
            </nav>
          )}
          {cats.map((c) => (
            <section key={c} className="gx-catsec" aria-labelledby={`cat-${c}`}>
              <h2 id={`cat-${c}`} className="gx-cathead">{catalog.categories[c] ?? CAT_NAMES[c] ?? c}</h2>
              <div className="gx-cards gx-c3 !mt-5">
                {catalog.apps
                  .filter((a) => a.category === c)
                  .map((a) => (
                    <article key={a.key} className="gx-card gx-lg gx-acard">
                      <div className="gx-atop">
                        {a.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={a.icon} alt="" width={46} height={46} loading="lazy" className="gx-appimg" />
                        ) : (
                          <span className="gx-appimg" aria-hidden />
                        )}
                        <h3>{a.name}</h3>
                      </div>
                      <p>{a.line ?? ""}</p>
                      <div className="gx-afoot">
                        <span>{(a.trialDays ?? 0) > 0 ? `${a.trialDays}-day free trial` : "Plans"}</span>
                        <b>{planLine(catalog, a)}</b>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="Every app you need, switched on in a click." />
      </GlassPage>
    </PageShell>
  );
}
