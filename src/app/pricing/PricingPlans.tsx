// src/app/pricing/PricingPlans.tsx
"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { APP_CATEGORIES, formatPrice, type Catalog, type SiteKind } from "@/lib/catalog";

type Interval = "monthly" | "yearly";

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
    <div role="group" aria-label={label} className="inline-flex p-1.5 rounded-full bg-white border border-line">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`px-5 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${
            value === o.value ? "bg-navy text-white" : "text-graphite hover:bg-navy/5"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function PricingPlans({ catalog, initialKind }: { catalog: Catalog; initialKind: SiteKind }) {
  const [kind, setKind] = useState<SiteKind>(initialKind);
  const [interval, setInterval] = useState<Interval>("monthly");
  const yearly = interval === "yearly";

  const plans = catalog.plans.filter((p) => p.kind === kind);
  const status = new Map(catalog.planApps.map((pa) => [`${pa.planSlug}:${pa.appKey}`, pa.status]));
  // Website plans list only the apps that apply without a cart.
  const apps = catalog.apps.filter(
    (a) => kind === "shop" || plans.some((p) => status.has(`${p.slug}:${a.key}`))
  );
  const categories = [
    ...APP_CATEGORIES.filter((c) => apps.some((a) => a.category === c)),
    ...[...new Set(apps.map((a) => a.category))].filter((c) => !(APP_CATEGORIES as readonly string[]).includes(c)),
  ];

  return (
    <>
      <section id="plans" className="max-w-[1240px] mx-auto px-6 pt-18 sm:pt-20 pb-10 text-center">
        <h1 className="font-display font-bold text-[40px] sm:text-[52px] leading-[1.08] text-navy">
          Simple plans. Add apps when you need them.
        </h1>
        <p className="mt-4 mx-auto max-w-[640px] text-lg leading-relaxed text-muted">
          Every plan includes hosting, SSL, your own domain, the admin app and support. Pay monthly, or yearly and get
          2 months free.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Toggle
            label="Kind of site"
            value={kind}
            onChange={setKind}
            options={[
              { value: "shop", label: "Online shop" },
              { value: "website", label: "Website" },
            ]}
          />
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

        <div className="mt-11 grid gap-5 grid-cols-[repeat(auto-fit,minmax(290px,1fr))] text-left">
          {plans.map((p) => {
            const price = formatPrice(yearly ? p.yearlyPrice : p.monthlyPrice);
            const included = catalog.planApps.filter((pa) => pa.planSlug === p.slug && pa.status === "included").length;
            const dark = p.isPopular;
            return (
              <div
                key={p.slug}
                className={`rounded-3xl p-8 flex flex-col gap-4 border ${
                  dark ? "bg-navy text-white border-navy" : "bg-white text-graphite border-line"
                }`}
              >
                <div className="flex justify-between items-center gap-3">
                  <h2 className="font-display font-bold text-[26px]">{p.name}</h2>
                  {p.isPopular && (
                    <span className="px-3 py-1 rounded-full bg-cta text-white text-[13px] font-semibold">Most popular</span>
                  )}
                </div>
                <p className={`text-[15px] leading-normal ${dark ? "text-[#D5DEEE]" : "text-muted"}`}>{p.tagline}</p>
                <p className="min-h-[56px] flex items-baseline gap-1.5">
                  {price ? (
                    <>
                      <span className="font-display font-bold text-[44px]">{price}</span>
                      <span className="text-base">{yearly ? "/year" : "/month"}</span>
                    </>
                  ) : (
                    <span className="font-display font-bold text-2xl">Ask for a price</span>
                  )}
                </p>
                <Link
                  href={`/contact?plan=${p.slug}`}
                  className={`py-3.5 rounded-full text-center font-semibold transition-colors ${
                    dark ? "bg-cta text-white hover:bg-[#c02503]" : "bg-navy text-white hover:bg-navy-deep"
                  }`}
                >
                  Choose {p.name}
                </Link>
                <ul className="flex flex-col gap-2.5">
                  {[...p.highlights, `${included} apps included`].map((h) => (
                    <li key={h} className="flex gap-2.5 text-[15px]">
                      <Check aria-hidden className="w-[18px] h-[18px] mt-0.5 shrink-0" strokeWidth={2.6} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-sm text-muted">
          Prices exclude VAT. Upgrade or downgrade any time and the difference is worked out for you.
        </p>
      </section>

      <section id="apps" className="scroll-mt-24 max-w-[1240px] mx-auto px-6 py-12">
        <h2 className="font-display font-bold text-4xl text-navy">Apps in each plan</h2>
        <p className="mt-2.5 max-w-[720px] text-base leading-relaxed text-muted">
          Apps not in your plan can be added on their own, monthly or yearly. Most have a free trial, and carry on as a
          paid add-on when the trial ends unless you remove them.
        </p>
        <div className="mt-7 bg-white border border-line rounded-[22px] overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-[15px]">
            <thead>
              <tr className="bg-[#F1EEE6] text-left">
                <th scope="col" className="px-5 py-4 font-semibold">App</th>
                {plans.map((p) => (
                  <th key={p.slug} scope="col" className="px-5 py-4 font-semibold w-[140px]">
                    {p.name}
                  </th>
                ))}
                <th scope="col" className="px-5 py-4 font-semibold w-[200px]">On its own</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <Fragment key={cat}>
                  <tr>
                    <th
                      scope="rowgroup"
                      colSpan={plans.length + 2}
                      className="px-5 pt-5 pb-2 text-left font-display text-[17px] text-cta-text border-t border-line"
                    >
                      {cat}
                    </th>
                  </tr>
                  {apps
                    .filter((a) => a.category === cat)
                    .map((a) => {
                      const addon = formatPrice(yearly ? a.addonYearly : a.addonMonthly);
                      return (
                        <tr key={a.key} className="border-t border-[#EFEBE2]">
                          <th scope="row" className="px-5 py-3 text-left font-normal">
                            <span className="block font-semibold text-navy">{a.name}</span>
                            <span className="block mt-0.5 text-[13px] text-muted">{a.description}</span>
                          </th>
                          {plans.map((p) => {
                            const s = status.get(`${p.slug}:${a.key}`);
                            return (
                              <td
                                key={p.slug}
                                className={`px-5 py-3 font-semibold ${
                                  s === "included" ? "text-[#0F6B3A]" : s === "addon" ? "text-navy" : "text-muted font-normal"
                                }`}
                              >
                                {s === "included" ? "Included" : s === "addon" ? "Add-on" : "Not available"}
                              </td>
                            );
                          })}
                          <td className="px-5 py-3 text-sm text-muted">
                            {a.soldAlone ? (
                              <>
                                {addon ? `${addon}${yearly ? "/year" : "/month"}` : "Price on request"}
                                {a.trialDays > 0 && <span className="block">{a.trialDays}-day free trial</span>}
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
      </section>
    </>
  );
}
