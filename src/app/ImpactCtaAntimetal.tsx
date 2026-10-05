"use client";

import { motion } from "framer-motion";
import LightBeamButton from "./LightBeamButton";

export default function ImpactCtaAntimetal() {
  return (
    <section
      id="impact"
      className="relative w-full overflow-hidden py-6 font-['Kodchasan',sans-serif]"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #1a2557 0%, #0D163F 42%, #060a1f 78%, #020308 100%)",
      }}
    >
      {/* converging dotted constellation */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="dotFade" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 26 }).map((_, i) => {
          const t = i / 25;
          const x = 720 - (1 - t) * 620;
          const y = 60 + t * 260;
          return <circle key={`l-${i}`} cx={x} cy={y} r={1.6} fill="url(#dotFade)" />;
        })}
        {Array.from({ length: 26 }).map((_, i) => {
          const t = i / 25;
          const x = 720 + (1 - t) * 620;
          const y = 60 + t * 260;
          return <circle key={`r-${i}`} cx={x} cy={y} r={1.6} fill="url(#dotFade)" />;
        })}
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const x = 720 - (1 - t) * 160;
          const y = 320 + t * 260;
          return <circle key={`d-${i}`} cx={x} cy={y} r={1.6} fill="url(#dotFade)" />;
        })}
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const x = 720 + (1 - t) * 160;
          const y = 320 + t * 260;
          return <circle key={`d2-${i}`} cx={x} cy={y} r={1.6} fill="url(#dotFade)" />;
        })}
      </svg>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center"
        >
          <h2 className="text-[26px] sm:text-[34px] lg:text-[40px] font-normal leading-[1.3] tracking-tight max-w-2xl">
            <span className="text-white/90">Sales teams lose 20% of</span>
            <br />
            <span className="text-white">their commission to spreadsheet errors.</span>
          </h2>

          <div className="mt-9">
            <LightBeamButton onClick={() => {}}>Start tracking accurately</LightBeamButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
