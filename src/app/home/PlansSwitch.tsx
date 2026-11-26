"use client";
// src/app/home/PlansSwitch.tsx
// The Business Website / Ecommerce Website switch and the plan cards under it (home page).
import Link from "next/link";
import { useState } from "react";

export interface CardData {
  key: string;
  name: string;
  tag: string;
  price: string;
  unit: string;
  button: string;
  href: string;
  lines: string[];
  badge: string | null;
  popular: boolean;
}

export interface KindData {
  key: string;
  label: string;
  includes: string[];
  free: CardData;
  plans: CardData[];
}

function Card({ c }: { c: CardData }) {
  return (
    <article className={`gx-plan gx-lg h-full ${c.popular ? "gx-pop" : ""}`}>
      {c.badge && <span className={`gx-badge ${c.popular ? "" : "gx-badge-start"}`}>{c.badge}</span>}
      <h3>{c.name}</h3>
      <p className="gx-for">{c.tag}</p>
      <div className="gx-price">
        <b>{c.price}</b>
        <span>{c.unit}</span>
      </div>
      <ul>
        {c.lines.map((l, k) => (
          <li key={l} className={k === 0 && l.startsWith("Everything") ? "gx-b" : ""}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gx-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5 12 5 5 9-10" />
            </svg>
            <span>{l}</span>
          </li>
        ))}
      </ul>
      <Link className={`gx-plan-btn gx-btn ${c.popular ? "gx-o" : "gx-g"}`} href={c.href}>
        {c.button}
      </Link>
    </article>
  );
}

export default function PlansSwitch({ kinds }: { kinds: KindData[] }) {
  const [on, setOn] = useState(kinds[0]?.key);
  const k = kinds.find((x) => x.key === on) ?? kinds[0];
  if (!k) return null;
  const all = [k.free, ...k.plans];

  return (
    <div className="gx-page">
      {kinds.length > 1 && (
        <div className="flex justify-center mt-8">
          <div role="group" aria-label="Kind of site" className="gx-tog gx-lgp">
            {kinds.map((x) => (
              <button key={x.key} type="button" aria-pressed={x.key === k.key} className={x.key === k.key ? "gx-on" : ""} onClick={() => setOn(x.key)}>
                {x.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-7 text-center">
        <p className="text-[15px] font-extrabold text-[var(--h-text)] mb-3">Every plan includes</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] font-semibold text-[var(--h-text)]">
          {k.includes.map((label) => (
            <li key={label} className="inline-flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gx-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12 5 5 9-10" />
              </svg>
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div key={k.key} className={`gx-plans gx-plans-fade ${all.length === 4 ? "gx-four" : ""}`}>
        {all.map((c) => (
          <Card key={c.key} c={c} />
        ))}
      </div>
    </div>
  );
}
