"use client";

import React from "react";
import { motion } from "framer-motion";
import LightBeamButton from "./LightBeamButton";
import SiteNav from "./SiteNav";

// ================= BRAND LOGO INTERFACE & DATA =================
interface BrandItem {
  name: string;
  render: () => React.ReactNode;
}

const AUTHENTIC_BRAND_LOGOS: BrandItem[] = [
  {
    name: "Stripe",
    render: () => (
      <div className="flex items-center">
        <svg viewBox="0 0 60 25" className="h-5 w-auto fill-current" aria-label="Stripe">
          <path d="M59.64 14.28c0-4.44-2.18-7.94-6.42-7.94-4.26 0-6.84 3.5-6.84 7.9 0 5.22 3.1 7.82 7.4 7.82 2.1 0 3.7-.46 4.9-1.12v-3.32c-1.2.6-2.58.94-4.14.94-1.68 0-3.14-.6-3.36-2.52h8.42c.04-.46.04-1.12.04-1.76zm-8.44-1.54c0-1.78 1.08-2.52 2.06-2.52.96 0 1.98.74 1.98 2.52h-4.04zm-8.32-6.4c-1.34 0-2.22.62-2.7 1.08l-.18-.88h-4.3v19.4h4.74v-5.2c.5.42 1.32.96 2.5 1 2.94 0 5.48-2.42 5.48-7.66-.02-4.9-2.54-7.74-5.54-7.74zm-1.12 11.72c-.8 0-1.46-.28-1.94-.78v-6.38c.5-.54 1.16-.84 1.96-.84 1.54 0 2.68 1.48 2.68 4 0 2.54-1.14 4-2.7 4zm-11.44-13.4l-4.78 1.02v3.74h-2.5v3.66h2.5v6.5c0 3.12 1.54 4.8 4.38 4.8 1.18 0 2.08-.2 2.62-.48v-3.56c-.44.18-1.02.28-1.64.28-1.1 0-1.56-.56-1.56-1.72v-5.82h3.36V7.66h-3.36V4.66h.98zm-9.36 17.28V7.66H16.2v14.28h4.76zm-.04-16.74c0-1.42-1.12-2.54-2.54-2.54-1.4 0-2.52 1.12-2.52 2.54 0 1.4 1.12 2.52 2.52 2.52 1.42 0 2.54-1.12 2.54-2.52zM12.9 8.84c-1.16-.54-2.76-.94-4.22-.94-2.92 0-4.8 1.52-4.8 4.08 0 3.96 5.44 3.32 5.44 5.04 0 .6-.52.88-1.34.88-1.46 0-3.34-.62-4.5-1.36l-1.36 3.6c1.3.72 3.42 1.2 5.6 1.2 3.08 0 5.12-1.52 5.12-4.14 0-4.28-5.46-3.5-5.46-5.14 0-.52.44-.8 1.18-.8 1.24 0 2.86.46 3.96 1.04l1.38-3.46z" />
        </svg>
      </div>
    ),
  },
  {
    name: "Linear",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current" aria-label="Linear">
          <path d="M1.2 58.7L58.7 1.2c1.6-1.6 4.2-1.6 5.8 0l34.3 34.3c1.6 1.6 1.6 4.2 0 5.8L41.3 98.8c-1.6 1.6-4.2 1.6-5.8 0L1.2 64.5c-1.6-1.6-1.6-4.2 0-5.8z" fill="none" stroke="currentColor" strokeWidth={8} />
          <path d="M28 45L48 25" stroke="currentColor" strokeWidth={8} strokeLinecap="round" />
        </svg>
        <span className="font-semibold tracking-tight text-base font-['Kodchasan',sans-serif]">Linear</span>
      </div>
    ),
  },
  {
    name: "Notion",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Notion">
          <path d="M4.46 4.21c.75.6 1.03.56 2.43.46l11.76-.84c1.12-.09 1.3-.46 1.12-1.02L18.77 1.5c-.28-.56-.93-.93-1.77-.84L2.96 1.78c-.93.1-1.3.65-.93 1.49zm1.12 4.1v12.23c0 .93.47 1.4 1.5 1.3l12.78-.74c1.03-.1 1.3-.66 1.3-1.5V7.57c0-.84-.37-1.21-1.21-1.12L7.07 7.2c-.84.09-1.5.46-1.5 1.12zm10.73.94c.19.84.19 1.58-.65 1.68l-.84.09v7.37c0 .84-.37 1.12-1.21 1.12-.84 0-1.12-.28-1.59-1.03l-3.36-5.32v4.86l1.21.28c.66.18.66.74.47 1.5l-2.8.18c-.19-.84-.19-1.5.65-1.68l.84-.1V10.83c0-.84.28-1.12 1.12-1.12.84 0 1.21.28 1.68 1.03l3.36 5.32V12.23l-1.21-.28c-.66-.19-.66-.75-.47-1.5l2.8-.28z" />
        </svg>
        <span className="font-bold tracking-tight text-base font-['Kodchasan',sans-serif]">Notion</span>
      </div>
    ),
  },
  {
    name: "HubSpot",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="HubSpot">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2a2 2 0 0 0-2 2v2.1a6.002 6.002 0 0 0-3.9 3.9H4a2 2 0 1 0 4 4h2.1A6.002 6.002 0 0 0 10 17.9V20a2 2 0 1 0 4 0v-2.1a6.002 6.002 0 0 0 3.9-3.9H20a2 2 0 1 0 0-4h-2.1A6.002 6.002 0 0 0 14 6.1V4a2 2 0 0 0-2-2z" fill="none" stroke="currentColor" strokeWidth={2} />
        </svg>
        <span className="font-bold tracking-tight text-base font-['Kodchasan',sans-serif]">HubSpot</span>
      </div>
    ),
  },
  {
    name: "Salesforce",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-6 h-5 fill-current" aria-label="Salesforce">
          <path d="M19.3 9.4c-.4-2.8-2.8-4.9-5.7-4.9-1.8 0-3.4.8-4.4 2.2-1-.7-2.3-1.1-3.6-1.1-3.1 0-5.6 2.5-5.6 5.6 0 .4 0 .8.1 1.1C.2 13.1 0 14 0 15c0 3.3 2.7 6 6 6h13c2.8 0 5-2.2 5-5 0-2.4-1.7-4.4-4-4.9-.4-.6-.6-1.1-.7-1.7z" />
        </svg>
        <span className="font-bold tracking-tight text-base font-['Kodchasan',sans-serif]">salesforce</span>
      </div>
    ),
  },
  {
    name: "Ramp",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Ramp">
          <path d="M4 4h7.5l8.5 8.5-7.5 7.5L4 11.5V4zm3 3v3.5l4.5 4.5 3.5-3.5L10.5 7H7z" />
        </svg>
        <span className="font-bold tracking-tight text-base font-['Kodchasan',sans-serif]">ramp</span>
      </div>
    ),
  },
  {
    name: "Intercom",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Intercom">
          <path d="M19 3H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2v3l4-3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-11 9H6V8h2v4zm4 1h-2V7h2v6zm4-1h-2V8h2v4z" />
        </svg>
        <span className="font-bold tracking-tight text-base font-['Kodchasan',sans-serif]">Intercom</span>
      </div>
    ),
  },
  {
    name: "Brex",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Brex">
          <path d="M4 4h10a6 6 0 0 1 4.5 9.9A6 6 0 0 1 14 20H4V4zm4 4v3h5.5a2 2 0 0 0 0-4H8zm0 5v3h6a2 2 0 0 0 0-4H8z" />
        </svg>
        <span className="font-extrabold tracking-wider text-base font-['Kodchasan',sans-serif]">BREX</span>
      </div>
    ),
  },
  {
    name: "Loom",
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Loom">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2a4 4 0 0 0-4 4v2.5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zm0 20a4 4 0 0 0 4-4v-2.5a4 4 0 0 0-8 0V18a4 4 0 0 0 4 4zm10-10a4 4 0 0 0-4-4h-2.5a4 4 0 0 0 0 8H18a4 4 0 0 0 4-4zM2 12a4 4 0 0 0-4 4h2.5a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
        </svg>
        <span className="font-bold tracking-tight text-base font-['Kodchasan',sans-serif]">loom</span>
      </div>
    ),
  },
];

// Mesh gradient background component removed — this section now uses the flat
// #F4F3ED background shared with every other section on the page instead.

export default function CommissionCalculatorHeaderCommission({ className }: { className?: string }) {
  const noop = () => {};

  return (
    <div className={className}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <SiteNav />

      {/* SECTION 2: HERO SECTION — Air-inspired minimal, airy layout */}
      <section
        id="calculator"
        className="relative pt-32 sm:pt-40 pb-10 sm:pb-16 bg-ribbed overflow-hidden font-['Kodchasan',sans-serif]"
      >
        {/* Mesh gradient overlay removed to keep this section flush with the flat #F4F3ED background used elsewhere on the page */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col items-start text-left font-['Kodchasan',sans-serif]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-start w-full"
              >
                <span className="text-[13px] font-medium text-neutral-500 tracking-[0.08em] uppercase mb-5">
                  Commission Operations
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-normal text-[#101927] tracking-tight leading-[1.08] mb-7">
                  Commission tracking,{" "}
                  <span
                    className="italic bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    without the chaos.
                  </span>
                </h1>

                <p className="text-[17px] text-neutral-500 leading-relaxed mb-10 max-w-sm">
                  One place to calculate, model, and pay out every deal — so reps trust the number and finance never re-checks it by hand.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.35, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full flex flex-col items-start"
              >
                <div className="flex flex-wrap items-center gap-5 w-full sm:w-auto mb-6">
                  <LightBeamButton onClick={noop}>Get started</LightBeamButton>

                  <a
                    href="#pricing"
                    className="text-[15px] font-medium text-neutral-700 hover:text-[#0D163F] transition-colors inline-flex items-center gap-1.5"
                  >
                    See pricing <span aria-hidden="true">→</span>
                  </a>
                </div>

                <span className="text-xs text-neutral-400 tracking-wide">
                  Loved by sales teams and finance ops everywhere
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 38, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 1.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-7 relative group font-['Kodchasan',sans-serif]"
            >
              <div
                id="hero-dashboard-preview"
                className="relative z-10 bg-white rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-white/90 p-3 sm:p-4 transition-all overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dashboard-preview.png"
                  alt="Trueweb Cart dashboard preview"
                  className="w-full h-auto rounded-[20px] object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-16 sm:mt-20 pt-2 font-['Kodchasan',sans-serif]"
          >
            <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-6 font-['Kodchasan',sans-serif]">
              Trusted by modern sales teams and revenue leaders worldwide
            </p>

            <div className="relative overflow-hidden w-full py-2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="animate-marquee-infinite flex items-center gap-10 sm:gap-16">
                {[...AUTHENTIC_BRAND_LOGOS, ...AUTHENTIC_BRAND_LOGOS, ...AUTHENTIC_BRAND_LOGOS].map((brand, index) => (
                  <div
                    key={brand.name + "-" + index}
                    className="flex items-center text-neutral-400 hover:text-neutral-900 shrink-0 transition-colors cursor-pointer select-none"
                  >
                    {brand.render()}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
