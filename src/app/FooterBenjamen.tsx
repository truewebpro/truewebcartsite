"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUp } from "lucide-react";
import LightBeamButton from "./LightBeamButton";

const SOCIALS = [
  { name: "INSTAGRAM", handle: "@benjamencavalon" },
  { name: "LINKEDIN", handle: "Benjamen Cavalon" },
  { name: "BEHANCE", handle: "benjamensocials" },
  { name: "TWITTER", handle: "@benjamen_smm" },
];

const headingContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.012, delayChildren: 0.15 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 150 },
  },
};

function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      className="font-shoulders font-bold text-[24px] text-black tracking-wider uppercase flex flex-wrap"
      variants={headingContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((letter, li) => (
            <motion.span key={li} variants={letterVariants} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export default function FooterBenjamen() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full bg-[#F4F3ED]/90 border-t border-[rgba(0,0,0,0.06)] select-none overflow-hidden flex flex-col items-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100..900&family=Geist:wght@100..900&family=Inter:ital,wght@0,300..900;1,300..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        #footer .font-shoulders { font-family: 'Big Shoulders Display', sans-serif !important; }
        #footer .font-geist { font-family: 'Geist', sans-serif !important; }
        #footer .font-mono-jb { font-family: 'JetBrains Mono', monospace !important; }
      `}</style>

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row gap-0 lg:gap-[36px]">
        <div id="footer-right-container" className="flex flex-col xl:w-[1312px] w-full pt-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-start justify-between gap-12 w-full mb-[64px]">
            {/* A. Brand + tagline */}
            <div className="flex flex-col gap-4 text-left max-w-[360px]">
              <div className="flex items-center gap-[10px]">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <AnimatedHeading text="BENJAMEN CAVALON" />
              </div>
              <p className="font-geist text-[14px] text-neutral-600 leading-relaxed">
                Result-focused Social Media Specialist &amp; Content Producer dedicated to scaling digital visibility through creative metrics.
              </p>
            </div>

            {/* B. Social column */}
            <div className="flex flex-col gap-4">
              <span className="font-mono-jb text-[11px] text-neutral-400 tracking-widest uppercase">{"// CONNECT SOCIAL"}</span>
              <div className="grid grid-cols-2 gap-[24px]">
                {SOCIALS.map((s) => (
                  <a key={s.name} href="#" className="flex flex-col text-left hover:opacity-80 transition-opacity">
                    <span className="font-geist text-[12px] font-bold text-neutral-400 uppercase tracking-wider">{s.name}</span>
                    <span className="font-geist text-[14px] font-medium text-black">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* C. Inquiries + Back to Top */}
            <div className="flex flex-col gap-6 text-left md:items-center md:col-span-2 lg:col-span-1 lg:items-end md:text-center lg:text-right">
              <span className="font-mono-jb text-[11px] text-neutral-400 tracking-widest uppercase">{"// STRATEGIC INQUIRIES"}</span>
              <a
                href="mailto:hello@benjamencavalon.com"
                className="font-geist text-[18px] sm:text-[20px] font-semibold text-black hover:underline"
              >
                hello@benjamencavalon.com
              </a>
              <LightBeamButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Back to Top
                <ArrowUp className="w-4 h-4 inline-block ml-2" />
              </LightBeamButton>
            </div>
          </div>

          {/* Watermark */}
          <div className="w-full relative py-6 select-none overflow-hidden pointer-events-none">
            <div
              aria-hidden="true"
              className="opacity-40 bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent font-shoulders font-extrabold text-[64px] sm:text-[72px] md:text-[95px] lg:text-[145px] xl:text-[180px] leading-[0.95] text-center tracking-tighter uppercase whitespace-normal sm:whitespace-nowrap"
              style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
            >
              TRUEWEBCART
            </div>
          </div>

          {/* Bottom bar */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(0,0,0,0.06)] text-neutral-500 font-geist text-[13px] text-center sm:text-left">
            <p>© {currentYear} Benjamen Cavalon Portfolio. All rights reserved.</p>
            <div className="flex items-center gap-[24px]">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <span className="text-neutral-300">|</span>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
