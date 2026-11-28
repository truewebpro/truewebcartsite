"use client";
// src/app/partners/EarnCalc.tsx: "See what you could earn" (live stores x an average store at £60 a month x the level's rate).
import { useState } from "react";

const AVG = 60;
const money = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export default function EarnCalc() {
  const [n, setN] = useState(10);
  const rate = n >= 15 ? 0.2 : n >= 5 ? 0.15 : 0.1;
  const level = n >= 15 ? "Gold" : n >= 5 ? "Silver" : "Bronze";
  const month = n * AVG * rate;

  return (
    <div className="gx-panel gx-lg gx-calc">
      <div>
        <h2 className="gx-h2 !text-left">See what you could earn</h2>
        <p className="gx-h2sub !text-left !ml-0">Move the slider to the number of live stores. Shown with an average store paying £60 a month.</p>
        <label htmlFor="pc-n" className="block mt-6 mb-2 font-extrabold text-[var(--gx-text)]">{n} live {n === 1 ? "store" : "stores"}</label>
        <input id="pc-n" type="range" min={1} max={40} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#D92A04]" />
      </div>
      <div className="gx-calc-out" aria-live="polite">
        <small>You&apos;d earn about</small>
        <b>{money(month)} a month</b>
        <span>{money(month * 12)} a year at {level} ({Math.round(rate * 100)}%)</span>
      </div>
    </div>
  );
}
