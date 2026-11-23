// src/app/home/Analytics.tsx
import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { Heading, Section } from "./parts";

const FEED = [
  ["Someone added Amber candle to the cart", "just now"],
  ["New order 1043 for £50.00", "1 min ago"],
  ["A visitor from Manchester is looking at Room spray", "2 min ago"],
  ["New 5 star review on Stone mug", "4 min ago"],
  ["A visitor reached checkout", "6 min ago"],
  ["New order 1042 for £28.00", "9 min ago"],
  ["12 people are on your online shop now", "10 min ago"],
];
const COUNTRIES: [string, number][] = [["United Kingdom", 72], ["United States", 41], ["Germany", 23], ["France", 17], ["Australia", 11]];
const HOURS = [3, 5, 8, 12, 10, 7, 9, 14, 18, 16, 11, 6];

function Card({ title, sub, children, className = "" }: { title: string; sub?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`h-glass rounded-[24px] p-5 w-[300px] sm:w-[330px] shrink-0 snap-start ${className}`}>
      <p className="text-[16px] font-extrabold text-[var(--h-text)]">{title}</p>
      {sub && <p className="text-[13px] text-[var(--h-muted)]">{sub}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Cards({ copy = false }: { copy?: boolean }) {
  return (
    <>
      <Card title="Tips for you">
        <ul className="grid gap-2.5">
          {["Your checkout rate was 68% this week", "Your online shop is busiest on Saturdays", "18% of visitors came back for a second look"].map((t) => (
            <li key={t} className="px-3 py-2.5 rounded-xl bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[14px] text-[var(--h-body)]">{t}</li>
          ))}
        </ul>
      </Card>
      <Card title="Live activity" sub="What visitors are doing right now">
        <div className="h-[196px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="h-feed">
            {[...FEED, ...FEED].map(([t, w], k) => (
              <li key={k} aria-hidden={k >= FEED.length || copy} className="flex gap-3 py-2 border-b border-[var(--h-line)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#0F8A55] shrink-0" />
                <span className="text-[13px] text-[var(--h-body)] flex-1">{t}</span>
                <span className="text-[12px] text-[var(--h-soft)] whitespace-nowrap">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <Card title="Sales today">
        <p className="text-[34px] font-extrabold tracking-[-1px] text-[var(--h-text)] leading-none">£1,284</p>
        <p className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold text-[#0F8A55] dark:text-[#3DDC91]">
          <TrendingUp className="w-4 h-4" aria-hidden /> 12% vs yesterday
        </p>
        <svg viewBox="0 0 280 100" className="mt-3 w-full h-[100px]" aria-hidden>
          <path d="M0 80 C30 75 50 60 80 62 S130 40 160 45 S220 20 280 12" fill="none" stroke="#D92A04" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 85 C40 82 70 75 100 72 S170 60 200 58 S250 50 280 46" fill="none" stroke="var(--h-soft)" strokeWidth="2" strokeDasharray="5 6" />
        </svg>
        <p className="flex gap-4 text-[12px] text-[var(--h-muted)]">
          <span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#D92A04]" />Today</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-3 border-t-2 border-dashed border-[var(--h-soft)]" />Yesterday</span>
        </p>
      </Card>
      <Card title="Where visitors come from">
        <ul className="grid gap-2.5">
          {COUNTRIES.map(([c, v]) => (
            <li key={c}>
              <div className="flex justify-between text-[13px] text-[var(--h-body)]"><span>{c}</span><span className="font-bold">{v}%</span></div>
              <div className="mt-1 h-2 rounded-full bg-[var(--h-chip)] border border-[var(--h-card-bd)] overflow-hidden">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#2450B8,#5B86D6)]" style={{ width: `${v}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Busiest hours" sub="Orders by hour, last 7 days">
        <div className="flex items-end gap-1.5 h-[130px]">
          {HOURS.map((h, k) => (
            <span key={k} className="h-bar-grow flex-1 rounded-t-md bg-[linear-gradient(180deg,#F5A524,#D92A04)]" style={{ height: `${(h / 18) * 100}%`, animationDelay: `${k * 0.05}s` }} />
          ))}
        </div>
        <p className="mt-2 flex justify-between text-[12px] text-[var(--h-soft)]"><span>9am</span><span>1pm</span><span>5pm</span><span>9pm</span></p>
      </Card>
    </>
  );
}

export default function Analytics() {
  return (
    <Section glows>
      <Heading title="See what is working in your online shop" sub="Live visitors, sales and simple tips in one place, so you know what to do next." />
      {/* phones and tablets: swipe */}
      <div className="lg:hidden mt-10 -mx-4 sm:-mx-6 px-4 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory h-noscroll pb-2">
        <Cards />
      </div>
      {/* desktop: a slow moving strip that stops on hover */}
      <div className="hidden lg:block mt-12 -mx-8 h-marquee-wrap h-fade-edges overflow-hidden">
        <div className="h-marquee gap-5 py-2" style={{ animationDuration: "60s" }}>
          <Cards />
          <div className="contents" aria-hidden><Cards copy /></div>
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] text-[var(--h-soft)]">Example figures from a demo online shop.</p>
    </Section>
  );
}
