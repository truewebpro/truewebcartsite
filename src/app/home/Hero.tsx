// src/app/home/Hero.tsx
import { StartForm, Tick } from "./parts";

const BEAMS_X = [
  { top: 191, colour: "#D92A04", dur: 7, delay: 0 },
  { top: 319, colour: "#0B2F66", dur: 9, delay: -3 },
  { top: 511, colour: "#F5A524", dur: 8, delay: -5 },
  { top: 703, colour: "#0B2F66", dur: 10, delay: -1 },
];
const BEAMS_Y = [
  { left: "13%", colour: "#0B2F66", dur: 8, delay: -2 },
  { left: "31%", colour: "#D92A04", dur: 9.5, delay: -6 },
  { left: "71%", colour: "#0B2F66", dur: 10, delay: -4 },
  { left: "89%", colour: "#D92A04", dur: 8.5, delay: -7 },
];

function Words({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="h-word" style={{ animationDelay: `${start + i * 0.08}s` }}>
          {w}
          {" "}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(60px+env(safe-area-inset-top)+56px)] sm:pt-[calc(60px+env(safe-area-inset-top)+88px)] pb-[64px] sm:pb-[88px] bg-[linear-gradient(180deg,var(--h-bg)_0%,var(--h-bg2)_55%,var(--h-bg3)_100%)]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 h-grid" />
        {BEAMS_X.map((b, i) => (
          <span key={`x${i}`} className="h-beam-x" style={{ top: b.top, background: `linear-gradient(90deg, transparent, ${b.colour})`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
        ))}
        {BEAMS_Y.map((b, i) => (
          <span key={`y${i}`} className="h-beam-y hidden sm:block" style={{ left: b.left, background: `linear-gradient(180deg, transparent, ${b.colour})`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
        ))}
        <div className="h-glow h-drift w-[520px] h-[520px] left-[-160px] top-[120px]" style={{ background: "var(--h-glow-a)" }} />
        <div className="h-glow h-drift w-[460px] h-[460px] right-[-140px] top-[260px]" style={{ background: "var(--h-glow-b)", animationDelay: "-8s" }} />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 text-center">
        <p className="inline-flex px-5 py-2 rounded-full border-2 border-[#0F6B3A] bg-[#E5F4EA] text-[#0F6B3A] text-[15px] sm:text-[17px] font-extrabold dark:bg-transparent dark:border-[#3DDC91] dark:text-[#3DDC91]">
          3 Days Free Trial
        </p>
        <h1 className="mt-6 sm:mt-8 font-extrabold tracking-[-0.04em] leading-[1.02] text-[40px] min-[390px]:text-[44px] sm:text-[64px] lg:text-[88px] text-balance">
          <Words text="Open your online shop today." start={0} className="block text-[var(--h-text)]" />
          <Words text="Pay nothing for 3 days." start={0.4} className="block text-[#D92A04]" />
        </h1>
        <p className="mt-6 mx-auto max-w-[560px] text-[17px] sm:text-[20px] leading-relaxed text-[var(--h-body)]">
          Online shops and websites for businesses anywhere, with payments, delivery labels and an AI assistant built in.
        </p>

        <div className="mt-12 sm:mt-14 px-1">
          <StartForm id="hero-email" />
        </div>
        <p className="mt-4 text-[14px] sm:text-[15px] font-bold text-[var(--h-body)]">
          3 days free, cancel any time. No credit card required.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <Tick>No setup fee</Tick>
          <Tick>Cancel any time</Tick>
          <Tick>24/7 support team</Tick>
        </div>
      </div>
    </section>
  );
}
