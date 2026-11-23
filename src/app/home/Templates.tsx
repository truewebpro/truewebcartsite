// src/app/home/Templates.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Star } from "lucide-react";

interface Tpl {
  cat: string;
  name: string;
  line: string;
  bg: string;
  ink: string;
  accent: string;
}

const MAIN: Tpl[] = [
  { cat: "Home and living", name: "Bloom & Co", line: "Hand-poured candles and scents.", bg: "#F6EFE6", ink: "#3B2A1A", accent: "#1F6B4A" },
  { cat: "Fashion", name: "Northwear", line: "Everyday basics, made to last.", bg: "#EEF1F6", ink: "#10213F", accent: "#10213F" },
  { cat: "Beauty", name: "Glow Lab", line: "Clean skincare that works.", bg: "#FBEAF0", ink: "#4A1630", accent: "#C2416F" },
  { cat: "Food and drink", name: "Bean There", line: "Small batch coffee, roasted weekly.", bg: "#F3E9DC", ink: "#2E1B0E", accent: "#8A4B1F" },
];
const MORE: Tpl[] = [
  { cat: "Beauty", name: "Velvet", line: "Colour that lasts all day.", bg: "#2A1430", ink: "#FFFFFF", accent: "#E25A8C" },
  { cat: "Fashion", name: "Kite Kids", line: "Bright clothes for little explorers.", bg: "#FFF4D6", ink: "#1D3A6E", accent: "#F28C28" },
  { cat: "Food and drink", name: "Fresh Press", line: "Cold pressed juice, delivered.", bg: "#E6F6E9", ink: "#123D24", accent: "#2E9E57" },
  { cat: "Home and living", name: "Oak & Ash", line: "Simple things for slow mornings.", bg: "#ECE7E1", ink: "#2B2621", accent: "#6B5B4A" },
];

function MiniSite({ t, big = false }: { t: Tpl; big?: boolean }) {
  return (
    <div className="rounded-[18px] overflow-hidden border border-black/5 shadow-[0_20px_50px_rgba(11,47,102,0.14)]" style={{ background: t.bg, color: t.ink }}>
      <div className="flex items-center gap-3 px-4 py-2.5 text-[12px] font-bold border-b border-black/5">
        <span className={`font-extrabold mr-auto ${big ? "text-[15px]" : "text-[13px]"}`}>{t.name}</span>
        <span className="opacity-70">Shop</span>
        <span className="opacity-70 hidden min-[380px]:inline">About</span>
        <span className="opacity-70">Cart</span>
      </div>
      <div className={big ? "px-6 sm:px-8 py-8 sm:py-12" : "px-4 py-6"}>
        <p className={`font-extrabold tracking-[-0.5px] leading-tight ${big ? "text-[28px] sm:text-[40px]" : "text-[18px]"}`}>{t.name}</p>
        <p className={`mt-1.5 opacity-80 ${big ? "text-[15px] sm:text-[17px]" : "text-[13px]"}`}>{t.line}</p>
        <span className={`mt-4 inline-flex rounded-full text-white font-bold ${big ? "px-5 py-2.5 text-[14px]" : "px-3.5 py-1.5 text-[12px]"}`} style={{ background: t.accent }}>
          Shop now
        </span>
      </div>
      <div className={`grid grid-cols-3 gap-2 ${big ? "px-6 sm:px-8 pb-6" : "px-4 pb-4"}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`rounded-lg ${big ? "h-16 sm:h-24" : "h-10"}`} style={{ background: t.accent, opacity: 0.12 + i * 0.08 }} />
        ))}
      </div>
      <div className={`flex items-center gap-2 border-t border-black/5 ${big ? "px-6 sm:px-8 py-3" : "px-4 py-2"} text-[12px] font-bold`}>
        <span className="opacity-70">Loved by customers</span>
        <span className="flex text-[#F5A524]" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
        </span>
      </div>
    </div>
  );
}

export default function Templates() {
  const [i, setI] = useState(0);
  const t = MAIN[i];
  return (
    <>
      <div role="tablist" aria-label="Template type" className="mt-8 flex gap-2 overflow-x-auto h-noscroll justify-start sm:justify-center -mx-4 px-4">
        {MAIN.map((m, k) => (
          <button
            key={m.cat}
            role="tab"
            type="button"
            aria-selected={k === i}
            aria-controls="tpl-panel"
            onClick={() => setI(k)}
            className={`shrink-0 px-4 py-2.5 rounded-full text-[14px] font-bold transition-colors ${
              k === i ? "bg-[#081F45] text-white dark:bg-white dark:text-[#081F45]" : "bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[var(--h-text)]"
            }`}
          >
            {m.cat}
          </button>
        ))}
      </div>

      <div id="tpl-panel" role="tabpanel" className="h-glass mt-8 rounded-[28px] p-4 sm:p-6 grid lg:grid-cols-[340px_1fr] gap-6 items-center">
        <div className="order-2 lg:order-1 px-1 sm:px-2">
          <p className="text-[13px] font-extrabold text-[var(--h-cta-text)]">{t.cat}</p>
          <h3 className="mt-1 text-[28px] sm:text-[34px] font-extrabold tracking-[-0.8px] text-[var(--h-text)]">{t.name}</h3>
          <p className="mt-2 text-[16px] text-[var(--h-muted)]">{t.line} Ready for your products, with checkout and delivery built in.</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["Phone ready", "Fast pages", "Easy to edit"].map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[var(--h-text)]">
                <Check className="w-3.5 h-3.5 text-[#0F8A55]" strokeWidth={3} aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <Link href="/websites#templates" className="mt-6 inline-flex px-6 py-3 rounded-full bg-cta text-white font-extrabold hover:bg-[#c02503] transition-colors">
            Browse all templates
          </Link>
        </div>
        <div key={t.name} className="order-1 lg:order-2 h-fade-in">
          <MiniSite t={t} big />
        </div>
      </div>

      <div className="mt-6 h-marquee-wrap h-fade-edges overflow-hidden">
        <div className="h-marquee gap-4" style={{ animationDuration: "45s" }}>
          {[...MORE, ...MAIN, ...MORE, ...MAIN].map((m, k) => (
            <div key={k} className="w-[240px] shrink-0" aria-hidden={k >= 8}>
              <MiniSite t={m} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
