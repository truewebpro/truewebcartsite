// src/app/site/PlanCard.tsx
// One plan as a liquid glass card. Used on the pricing page and the Business Website page.
import { formatPrice, planLines, type Catalog, type Plan } from "@/lib/catalog";
import { Tick } from "./glass";

export function planHref(catalog: Catalog, p: Plan, yearly: boolean) {
  if (!p.signupReady || !catalog.signupUrl) return `/contact?plan=${encodeURIComponent(p.slug)}`;
  const q = new URLSearchParams({ plan: p.slug, interval: yearly && p.yearlyPrice ? "year" : "month" });
  return `${catalog.signupUrl}?${q.toString()}`;
}

const pounds = (pence: number) => `£${Math.round(pence / 100).toLocaleString("en-GB")}`;

export default function PlanCard({
  catalog,
  plan: p,
  yearly = false,
  popular,
  lines,
  sub,
  onClick,
}: {
  catalog: Catalog;
  plan: Plan;
  i?: number;
  yearly?: boolean;
  popular?: boolean;
  lines?: string[];
  sub?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const pop = popular ?? p.isPopular;
  const price = formatPrice(yearly ? p.yearlyPrice : p.monthlyPrice);
  const items = lines ?? planLines(catalog, p);
  const alt = yearly
    ? p.yearlyPrice
      ? `${pounds(p.yearlyPrice / 12)} a month, paid yearly`
      : p.monthlyPrice
        ? "Monthly only"
        : ""
    : p.yearlyPrice
      ? `or ${pounds(p.yearlyPrice)} a year`
      : "";
  const forLine = sub ?? (p.kind === "website" && p.pagesLimit ? `Up to ${p.pagesLimit} ${p.pagesLimit === 1 ? "page" : "pages"}` : "");

  return (
    <div className={`gx-plan gx-lg ${pop ? "gx-pop" : ""}`}>
      {pop && <span className="gx-badge">Most popular</span>}
      <h3>{p.name}</h3>
      {forLine && <p className="gx-for">{forLine}</p>}
      <div className="gx-price">
        {price ? (
          <>
            <b>{price}</b>
            <span>{yearly ? "/year" : "/month"} + VAT</span>
          </>
        ) : (
          <b className="!text-[24px] !tracking-normal">Ask for a price</b>
        )}
      </div>
      <div className="gx-alt">{alt}</div>
      <a className={`gx-btn ${pop ? "gx-o" : "gx-g"}`} href={planHref(catalog, p, yearly)} onClick={onClick}>
        {p.signupReady ? "Start 3 days free" : `Ask about ${p.name}`}
      </a>
      <ul>
        {items.map((l, k) => (
          <li key={l} className={k === 0 && l.startsWith("Everything") ? "gx-b" : ""}>
            <Tick />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
