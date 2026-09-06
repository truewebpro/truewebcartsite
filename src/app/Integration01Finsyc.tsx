"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";

const LEFT_CARDS = [
  { name: "Plaid", desc: "Connect banks securely", icon: "https://cdn.jiro.build/Amox/All%20Images/Plaid-icon-01.png" },
  { name: "Stripe", desc: "Payments made simple", icon: "https://cdn.jiro.build/Amox/All%20Images/Stripe-icon-02.png" },
  { name: "PayPal", desc: "Send and receive money", icon: "https://cdn.jiro.build/Amox/All%20Images/PayPal-icon-03.png" },
  { name: "Visa", desc: "Card transactions sync", icon: "https://cdn.jiro.build/Amox/All%20Images/Visa-icon-04.png" },
];

const RIGHT_CARDS = [
  { name: "Mastercard", desc: "Track credit & debit cards", icon: "https://cdn.jiro.build/Amox/All%20Images/Mastercard-icon-05.png" },
  { name: "QuickBooks", desc: "Accounting made easy", icon: "https://cdn.jiro.build/Amox/All%20Images/QuickBooks-icon-06.png" },
  { name: "Xero", desc: "Sync your business data", icon: "https://cdn.jiro.build/Amox/All%20Images/Xero-icon-07.png" },
  { name: "Coinbase", desc: "Track your investments", icon: "https://cdn.jiro.build/Amox/All%20Images/Coinbase-icon-08.png" },
];

const TOP_VALUES = ["0px", "96px", "192px", "288px"];
const LEFT_ANGLES = [225, 195, 165, 135];
const RIGHT_ANGLES = [-45, -15, 15, 45];
const CARD_TARGET_Y = [40, 136, 232, 328];

function IntegrationCard({
  name,
  desc,
  icon,
  side,
  idx,
  isLargeScreen,
}: {
  name: string;
  desc: string;
  icon: string;
  side: "left" | "right";
  idx: number;
  isLargeScreen: boolean;
}) {
  const positionStyle: React.CSSProperties = isLargeScreen
    ? { position: "absolute", top: TOP_VALUES[idx], [side]: 0 }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
      style={positionStyle}
      className="group w-[240px] sm:w-[260px] lg:w-[280px] h-[72px] lg:h-[80px] bg-white rounded-[16px] lg:rounded-[20px] p-3 lg:p-[16px] flex items-center gap-3 lg:gap-4 shadow-[0_4px_20px_rgba(4,39,24,0.02)] hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-all cursor-default border border-black/[0.02]"
    >
      <div className="w-[48px] h-[48px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <div>
        <p className="text-[#052719] font-semibold text-[14px] lg:text-[16px] leading-tight">{name}</p>
        <p className="text-[#052719]/40 text-[12px] lg:text-[13px] font-sans mt-0.5">{desc}</p>
      </div>
    </motion.div>
  );
}

function ConnectionSvg() {
  const cx = 620;
  const cy = 184;
  const r = 84;

  function anchor(angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      viewBox="0 0 1240 368"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="line-gradient-left" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#128F5E" stopOpacity="0.02" />
          <stop offset="1" stopColor="#128F5E" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="line-gradient-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#128F5E" stopOpacity="0.02" />
          <stop offset="1" stopColor="#128F5E" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {LEFT_ANGLES.map((angle, i) => {
        const a = anchor(angle);
        const d = `M ${a.x} ${a.y} Q ${a.x - 150} ${a.y} 280 ${CARD_TARGET_Y[i]}`;
        return (
          <g key={"left-" + i}>
            <path d={d} stroke="url(#line-gradient-left)" strokeWidth={1.8} strokeDasharray="4 4" opacity={0.9} />
            <circle r={3.5} fill="#128F5E">
              <animateMotion dur="3.5s" repeatCount="indefinite" begin={i * 0.4 + "s"} path={d} />
            </circle>
          </g>
        );
      })}

      {RIGHT_ANGLES.map((angle, i) => {
        const a = anchor(angle);
        const d = `M ${a.x} ${a.y} Q ${a.x + 150} ${a.y} 960 ${CARD_TARGET_Y[i]}`;
        return (
          <g key={"right-" + i}>
            <path d={d} stroke="url(#line-gradient-right)" strokeWidth={1.8} strokeDasharray="4 4" opacity={0.9} />
            <circle r={3.5} fill="#128F5E">
              <animateMotion dur="3.5s" repeatCount="indefinite" begin={i * 0.4 + 0.2 + "s"} path={d} />
            </circle>
          </g>
        );
      })}

      {[...LEFT_ANGLES, ...RIGHT_ANGLES].map((angle, i) => {
        const a = anchor(angle);
        return (
          <motion.circle
            key={"seal-dot-" + i}
            cx={a.x}
            cy={a.y}
            r={5}
            fill="#128F5E"
            animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
          />
        );
      })}
    </svg>
  );
}

export default function Integration01Finsyc() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function update() {
      setWindowWidth(window.innerWidth);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isLargeScreen = windowWidth >= 1024;

  return (
    <section id="integrations" className="w-full bg-[#F4F3ED]/90 py-6 overflow-hidden relative flex justify-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .finsyc-section .font-sans { font-family: 'Onest', sans-serif; }
      `}</style>

      <div className="finsyc-section w-full max-w-[1440px] px-6 lg:px-[96px] font-sans">
        <div className="w-full max-w-[1248px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12 md:mb-[80px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#128F5E]/5 border border-[#128F5E]/10 mb-6"
            >
              <Star className="w-4 h-4 text-[#128F5E] fill-[#128F5E]" />
              <span className="text-[#128F5E] text-[14px] font-medium font-sans">Integrations</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[32px] sm:text-[40px] md:text-[52px] font-semibold bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent leading-[1.2] md:leading-[58px] tracking-tight md:tracking-[-1.8px] mb-6 max-w-2xl"
            >
              Connect all your financial tools in <span className="italic text-black/40">one place</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] md:text-[18px] text-[#052719] leading-[1.6] md:leading-[28px] max-w-[612px] font-sans font-normal opacity-80"
            >
              Seamlessly integrate your bank accounts, cards, and financial apps to get a complete, real-time view of your finances.
            </motion.p>
          </div>

          <div className="relative w-full max-w-[1240px] mx-auto min-h-[400px] lg:h-[368px] flex items-center justify-center">
            <ConnectionSvg />

            <div className="w-full flex flex-col lg:block relative z-10 lg:h-full">
              <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[280px] mb-8 lg:mb-0">
                {LEFT_CARDS.map((c, i) => (
                  <IntegrationCard key={c.name} {...c} side="left" idx={i} isLargeScreen={isLargeScreen} />
                ))}
              </div>

              <div className="flex items-center justify-center py-8 lg:py-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <div className="relative w-[100px] lg:w-[124px] flex items-center justify-center">
                  <motion.div
                    className="absolute -m-8 lg:-m-[58px] inset-0 rounded-full bg-[#E5F2EA]/60"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute -m-4 lg:-m-[32px] inset-0 rounded-full bg-white/40 backdrop-blur" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="relative w-full aspect-square rounded-full bg-white shadow-[0_12px_48px_rgba(19,142,95,0.12)] flex items-center justify-center"
                  >
                    <div className="w-[80%] aspect-square rounded-full bg-[#FAFFFC] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://cdn.jiro.build/Amox/All%20SVG/only%20loto-%20Finsyc.svg"
                        alt="Finsyc"
                        referrerPolicy="no-referrer"
                        className="w-[50px] lg:w-[64px] object-contain opacity-95"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[280px] mt-8 lg:mt-0">
                {RIGHT_CARDS.map((c, i) => (
                  <IntegrationCard key={c.name} {...c} side="right" idx={i} isLargeScreen={isLargeScreen} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-12 md:mt-[80px] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 md:px-[24px] py-2 md:py-[11px] rounded-full border border-[#128F5E]/15 bg-white/50 shadow-[0_4px_24px_rgba(19,142,95,0.03)]"
            >
              <ShieldCheck className="w-5 h-5 text-[#128F5E]" />
              <p className="text-[13px] md:text-[15px]">
                <span className="text-[#128F5E] font-semibold">Bank-level security.</span>
                <span className="text-[#052719]/40"> Your data is encrypted and never shared.</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-[13px] md:text-[15px] text-[#052719]/40 font-sans tracking-tight text-center"
            >
              Trusted by <span className="font-semibold text-[#128F5E]">100,000+</span> users. Connect with{" "}
              <span className="font-semibold text-[#128F5E]">10,000+</span> financial institutions worldwide.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
