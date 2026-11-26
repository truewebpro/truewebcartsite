// src/app/pricing/PricingPlans.tsx
"use client";

import { Fragment, useState, type MouseEvent } from "react";
import { formatPrice, type Catalog, type Plan, type SiteKind } from "@/lib/catalog";
import { Hero, Sec, Heading } from "../site/glass";
import PlanCard from "../site/PlanCard";
import { LARGE_FROM } from "../home/LargePlans";

type Interval = "monthly" | "yearly";

const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "ref"];

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="gx-tog gx-lgp">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={value === o.value ? "gx-on" : ""}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function PricingPlans({ catalog, initialKind }: { catalog: Catalog; initialKind: SiteKind }) {
  const hasWebsites = catalog.plans.some((p) => p.kind === "website");
  const [kind, setKind] = useState<SiteKind>(hasWebsites ? initialKind : "shop");
  const [interval, setInterval] = useState<Interval>("monthly");
  const yearly = interval === "yearly";

  const plans = catalog.plans.filter((p) => p.kind === kind);
  // plans from £299 a month get their own "For large businesses" row, so the main row stays at 4 cards
  const isLarge = (p: Plan) => p.kind === "shop" && (p.monthlyPrice ?? 0) >= LARGE_FROM;
  const small = plans.filter((p) => !isLarge(p));
  const large = plans.filter(isLarge);
  const status = new Map(catalog.planApps.map((pa) => [`${pa.planSlug}:${pa.appKey}`, pa.status]));
  // website plans list only the apps that apply to them; apps on every plan are named once, above the table
  const apps = catalog.apps.filter(
    (a) => !a.everyPlan && (kind === "shop" || plans.some((p) => status.has(`${p.slug}:${a.key}`)))
  );
  const everyPlan = catalog.apps.filter((a) => a.everyPlan);
  const categoryKeys = [
    ...Object.keys(catalog.categories).filter((c) => apps.some((a) => a.category === c)),
    ...[...new Set(apps.map((a) => a.category))].filter((c) => !(c in catalog.categories)),
  ];

  // ad and social links (utm_*, gclid, fbclid) go on to the sign-up, so it knows where people came from
  const addTracking = (e: MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    if (!link.href.includes("/signup?")) return;
    const here = new URLSearchParams(window.location.search);
    const url = new URL(link.href);
    TRACKING_KEYS.forEach((k) => here.get(k) && url.searchParams.set(k, here.get(k) as string));
    link.href = url.toString();
  };

  // 4 plans sit 4 in a row (2 by 2 on tablets), 2 plans sit side by side
  const rowClass = (n: number) => (n === 2 ? "gx-two" : n === 4 ? "gx-four" : "");

  const card = (p: Plan, i: number) => <PlanCard key={p.slug} catalog={catalog} plan={p} i={i} yearly={yearly} onClick={addTracking} />;

  return (
    <>
      <Hero>
        <span className="gx-pill">3 days free on every plan</span>
        <h1 className="gx-h1">Simple plans. Add apps when you need them.</h1>
        <p className="gx-lead">
          Every plan includes hosting, SSL, your own domain, the admin app and support. Pay monthly, or yearly and get 2 months free.
        </p>
        <div className="gx-cta flex-col items-center !gap-3">
          {hasWebsites && (
            <Toggle
              label="Kind of site"
              value={kind}
              onChange={setKind}
              options={[
                { value: "website", label: "Business Website" },
                { value: "shop", label: "Ecommerce Website" },
              ]}
            />
          )}
          <Toggle
            label="Billing"
            value={interval}
            onChange={setInterval}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly, 2 months free" },
            ]}
          />
        </div>
      </Hero>

      <Sec tone="a" id="plans">
        <div className={`gx-plans ${rowClass(small.length)}`}>{small.map(card)}</div>
        {large.length > 0 && (
          <>
            <div className="mt-16">
              <Heading title="For large businesses" sub="Every app, priority help and room to grow. Start with 3 days free." />
            </div>
            <div className={`gx-plans ${rowClass(large.length)}`}>{large.map((p, i) => card(p, i + 4))}</div>
          </>
        )}
        <p className="gx-h2sub gx-center !text-[14px]">Prices exclude VAT. Upgrade or downgrade any time and the difference is worked out for you.</p>
      </Sec>

      <Sec tone="b" id="apps">
        <Heading
          title="Apps in each plan"
          sub={`Apps not in your plan can be added on their own, monthly or yearly, and many have a free trial.${
            everyPlan.length > 0 ? ` Every plan includes ${everyPlan.map((a) => a.name).join(" and ")}.` : ""
          }`}
        />
        <div className="gx-tblwrap gx-lg">
          <div className="gx-tblscroll">
            <table className="gx-apps">
              <thead>
                <tr>
                  <th scope="col">App</th>
                  {plans.map((p) => (
                    <th key={p.slug} scope="col">{p.name}</th>
                  ))}
                  <th scope="col">On its own</th>
                </tr>
              </thead>
              <tbody>
                {categoryKeys.map((cat) => (
                  <Fragment key={cat}>
                    <tr className="gx-cat">
                      <th scope="rowgroup" colSpan={plans.length + 2}>{catalog.categories[cat] ?? cat}</th>
                    </tr>
                    {apps
                      .filter((a) => a.category === cat)
                      .map((a) => {
                        const addon = formatPrice(yearly ? a.addonYearly : a.addonMonthly);
                        return (
                          <tr key={a.key}>
                            <th scope="row">
                              <span className="flex items-center gap-3">
                                {a.icon ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={a.icon} alt="" width={28} height={28} loading="lazy" className="w-7 h-7 rounded-lg object-contain shrink-0 bg-white" />
                                ) : (
                                  <span aria-hidden className="w-7 h-7 rounded-lg bg-[var(--gx-chip)] shrink-0" />
                                )}
                                <span>
                                  <span className="block font-bold">{a.name}</span>
                                  {a.line && <span className="block mt-0.5 text-[13px] font-normal text-[var(--gx-muted)]">{a.line}</span>}
                                </span>
                              </span>
                            </th>
                            {plans.map((p) => {
                              const st = status.get(`${p.slug}:${a.key}`);
                              return (
                                <td key={p.slug}>
                                  {st === "included" ? <span className="gx-yes">Included</span> : st === "addon" ? <span className="gx-add">Add-on</span> : <span className="gx-no">Not available</span>}
                                </td>
                              );
                            })}
                            <td className="!text-[13px] text-[var(--gx-muted)]">
                              {a.soldAlone ? (
                                <>
                                  {addon ? `${addon}${yearly ? "/year" : "/month"}` : "Price on request"}
                                  {(a.trialDays ?? 0) > 0 && <span className="block">{a.trialDays}-day free trial</span>}
                                </>
                              ) : (
                                "In plans only"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Sec>
    </>
  );
}
