// src/app/home/Foundations.tsx
"use client";

import { useState } from "react";
import { Check, Headphones, Puzzle, ShieldCheck, Zap } from "lucide-react";
import { SIGNUP_URL } from "../site/links";

const TABS = [
  { key: "Reliability", icon: Zap, text: "Your online shop runs on fast cloud hosting with pages served from a worldwide network, so it loads quickly wherever your customers are." },
  { key: "Security", icon: ShieldCheck, text: "A secure padlock on every page, payment keys stored encrypted, and staff only see what you let them see." },
  { key: "Expert support", icon: Headphones, text: "Real people and your AI shop assistant are here 24/7, by chat or email, whenever you need a hand." },
  { key: "Functionality", icon: Puzzle, text: "Apps built in, from loyalty and subscriptions to B2B prices and AI writing. Turn on what you need." },
];

function Visual({ k }: { k: string }) {
  if (k === "Reliability") {
    return (
      <div className="relative h-full min-h-[260px] flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full max-w-[460px]" aria-hidden>
          <ellipse cx="200" cy="110" rx="170" ry="90" fill="none" stroke="var(--h-line)" strokeWidth="2" />
          <ellipse cx="200" cy="110" rx="80" ry="90" fill="none" stroke="var(--h-line)" strokeWidth="2" />
          <line x1="30" y1="110" x2="370" y2="110" stroke="var(--h-line)" strokeWidth="2" />
          {[[90, 70], [250, 60], [320, 130], [150, 150], [210, 110]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#D92A04" opacity="0.15">
                <animate attributeName="r" values="8;18;8" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="6" fill="#D92A04" />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-glass rounded-2xl px-5 py-3 text-center">
          <p className="text-[26px] font-extrabold text-[var(--h-text)] leading-none">Fast</p>
          <p className="text-[13px] text-[var(--h-muted)]">pages everywhere</p>
        </div>
      </div>
    );
  }
  if (k === "Security") {
    return (
      <div className="h-full min-h-[260px] flex flex-col items-center justify-center gap-5">
        <span className="w-24 h-24 rounded-[28px] bg-[#0F8A55]/12 text-[#0F8A55] dark:text-[#3DDC91] inline-flex items-center justify-center">
          <ShieldCheck className="w-12 h-12" aria-hidden />
        </span>
        <ul className="flex flex-wrap justify-center gap-2">
          {["SSL padlock", "Encrypted keys", "Staff permissions"].map((c) => (
            <li key={c} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full h-glass text-[14px] font-bold text-[var(--h-text)]">
              <Check className="w-4 h-4 text-[#0F8A55]" strokeWidth={3} aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (k === "Expert support") {
    return (
      <div className="h-full min-h-[260px] flex flex-col justify-center gap-2.5 max-w-[420px] mx-auto w-full">
        <p className="ml-auto max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-[#081F45] text-white text-[14px] dark:bg-white dark:text-[#081F45]">Can you help me set up delivery?</p>
        <p className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md h-glass text-[14px] text-[var(--h-text)]">Of course. Open Settings, then Shipping, and pick your zones.</p>
        <p className="ml-auto max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-[#081F45] text-white text-[14px] dark:bg-white dark:text-[#081F45]">Done, thank you!</p>
        <p className="mt-2 inline-flex items-center gap-2 text-[13px] font-bold text-[#0F8A55] dark:text-[#3DDC91]">
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          Support online 24/7
        </p>
      </div>
    );
  }
  return (
    <div className="h-full min-h-[260px] flex flex-wrap content-center justify-center gap-2">
      {["Product reviews", "Loyalty and rewards", "Subscriptions", "Trade accounts", "Write with AI", "Shop assistant", "Order risk", "Delivery protection", "Store builder"].map((a, i) => (
        <span key={a} className="px-3.5 py-2 rounded-full h-glass text-[14px] font-bold text-[var(--h-text)] h-float" style={{ animationDelay: `${-i * 0.6}s` }}>
          {a}
        </span>
      ))}
    </div>
  );
}

export default function Foundations() {
  const [i, setI] = useState(0);
  const t = TABS[i];
  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Foundations" className="flex gap-2 overflow-x-auto h-noscroll -mx-4 px-4 sm:justify-center">
        {TABS.map((tab, k) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-controls="found-panel"
              onClick={() => setI(k)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full text-[15px] font-bold transition-colors ${
                k === i ? "bg-[#081F45] text-white dark:bg-white dark:text-[#081F45]" : "bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[var(--h-text)]"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden />
              {tab.key}
            </button>
          );
        })}
      </div>
      <div id="found-panel" role="tabpanel" className="h-glass mt-6 rounded-[28px] p-6 sm:p-10 grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
        <div key={t.key} className="h-fade-in">
          <h3 className="text-[28px] sm:text-[34px] font-extrabold tracking-[-0.8px] text-[var(--h-text)]">{t.key}</h3>
          <p className="mt-3 text-[16px] sm:text-[17px] leading-relaxed text-[var(--h-muted)]">{t.text}</p>
          <a href={SIGNUP_URL} className="mt-6 inline-flex px-6 py-3 rounded-full bg-cta text-white font-extrabold hover:bg-[#c02503] transition-colors">
            Get started
          </a>
        </div>
        <div key={`${t.key}-v`} className="h-fade-in">
          <Visual k={t.key} />
        </div>
      </div>
    </div>
  );
}
