// src/app/home/Hero.tsx
import { StartForm, Tick } from "./parts";
import SectionBg from "./SectionBg";


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
    <section className="relative overflow-hidden pt-[calc(60px+env(safe-area-inset-top)+56px)] sm:pt-[calc(60px+env(safe-area-inset-top)+88px)] pb-[64px] sm:pb-[88px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#050F24_0%,#0A2857_100%)]">
      <SectionBg />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 text-center">
        <p className="t1-pill inline-flex px-5 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-[#0F6B3A] bg-[#E7F4EC] text-[#0B5A30] text-[15px] sm:text-[17px] font-extrabold dark:bg-transparent dark:border-[#3DDC91] dark:text-[#3DDC91]">
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
