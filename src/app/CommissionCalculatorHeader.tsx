"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Copy,
  Check,
  Download,
  SlidersHorizontal,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import LightBeamButton from "./LightBeamButton";

// ================= SELF-CONTAINED TYPES =================
type CommissionType = "flat" | "tiered" | "fixed";

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface Tier {
  min: number;
  max: number | null;
  rate: number;
}

interface CalculationResult {
  saleAmount: number;
  commissionType: CommissionType;
  grossCommission: number;
  netCommission: number;
  effectiveRate: number;
  splitPercent: number;
  currency: Currency;
  dealName: string;
  tierBreakdowns: {
    tierIndex: number;
    eligibleAmount: number;
    rate: number;
    earned: number;
    min: number;
    max: number | null;
  }[];
  fixedPayout: number;
  unitsCalculated: number;
}

// ================= SELF-CONTAINED CURRENCIES =================
const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "JPY", symbol: "\u00A5", name: "Japanese Yen" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
];

// ================= SELF-CONTAINED CALCULATOR UTILS =================
function formatMoney(amount: number, currency: { symbol: string; code: string }): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function calculateCommission(params: {
  saleAmount: number;
  commissionType: CommissionType;
  rate?: number;
  fixedAmount?: number;
  units?: number;
  tiers?: Tier[];
  splitPercent?: number;
  currency: Currency;
  dealName?: string;
}): CalculationResult {
  const {
    saleAmount,
    commissionType,
    rate = 0,
    fixedAmount = 0,
    units = 1,
    tiers = [],
    splitPercent = 100,
    currency,
    dealName = "New Opportunity",
  } = params;

  let grossCommission = 0;
  const tierBreakdowns: CalculationResult["tierBreakdowns"] = [];
  let fixedPayout = 0;
  let unitsCalculated = 0;

  if (commissionType === "flat") {
    grossCommission = (saleAmount * rate) / 100;
  } else if (commissionType === "tiered") {
    let remaining = saleAmount;
    tiers.forEach((tier, idx) => {
      if (remaining <= 0) return;
      const rangeMax = tier.max === null ? Infinity : tier.max;
      const tierCapacity = rangeMax - tier.min;
      const eligible = Math.max(0, Math.min(remaining, tierCapacity));

      if (eligible > 0) {
        const earned = (eligible * tier.rate) / 100;
        grossCommission += earned;
        tierBreakdowns.push({
          tierIndex: idx,
          eligibleAmount: eligible,
          rate: tier.rate,
          earned,
          min: tier.min,
          max: tier.max,
        });
        remaining -= eligible;
      }
    });
  } else if (commissionType === "fixed") {
    fixedPayout = fixedAmount;
    unitsCalculated = units;
    grossCommission = fixedAmount * units;
  }

  const netCommission = (grossCommission * splitPercent) / 100;
  const effectiveRate = saleAmount > 0 ? (netCommission / saleAmount) * 100 : 0;

  return {
    saleAmount,
    commissionType,
    grossCommission,
    netCommission,
    effectiveRate,
    splitPercent,
    currency,
    dealName,
    tierBreakdowns,
    fixedPayout,
    unitsCalculated,
  };
}

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ================= CALCULATOR STATES =================
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [commissionType, setCommissionType] = useState<CommissionType>("flat");
  const [saleAmount, setSaleAmount] = useState<number>(50000);
  const [rate, setRate] = useState<number>(8);
  const [fixedAmount, setFixedAmount] = useState<number>(500);
  const [units, setUnits] = useState<number>(5);
  const [splitPercent, setSplitPercent] = useState<number>(100);
  const [showSplitOption, setShowSplitOption] = useState<boolean>(false);
  const [dealName] = useState<string>("Q3 Enterprise Deal");

  const [tiers, setTiers] = useState<Tier[]>([
    { min: 0, max: 20000, rate: 5 },
    { min: 20000, max: 50000, rate: 8 },
    { min: 50000, max: null, rate: 12 },
  ]);

  const [result, setResult] = useState<CalculationResult>(() =>
    calculateCommission({
      saleAmount: 50000,
      commissionType: "flat",
      rate: 8,
      splitPercent: 100,
      currency: CURRENCIES[0],
      dealName: "Q3 Enterprise Deal",
    })
  );

  const [copied, setCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animatedCommission, setAnimatedCommission] = useState(0);
  const saleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isHovered) {
      const start = 0;
      const end = result.netCommission;
      const duration = 850;
      const startTime = performance.now();
      let animationFrameId: number;

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        setAnimatedCommission(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setAnimatedCommission(end);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrameId);
    } else {
      setAnimatedCommission(0);
    }
  }, [isHovered, result.netCommission]);

  const computeNow = () => {
    const res = calculateCommission({
      saleAmount,
      commissionType,
      rate,
      fixedAmount,
      units,
      tiers,
      splitPercent: showSplitOption ? splitPercent : 100,
      currency,
      dealName,
    });
    setResult(res);
    return res;
  };

  useEffect(() => {
    computeNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleAmount, commissionType, rate, fixedAmount, units, tiers, splitPercent, showSplitOption, currency, dealName]);

  const handleCalculateClick = () => {
    setIsCalculating(true);
    const res = computeNow();

    try {
      if (res.netCommission > 0) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.55 },
          colors: ["#E8FE3A", "#101927", "#10B880"],
        });
      }
    } catch (_e) {
      // ignore
    }

    setTimeout(() => {
      setIsCalculating(false);
    }, 300);
  };

  const handleCopyResult = () => {
    const textToCopy =
      "Commission Summary:\n" +
      "Deal: " + result.dealName + "\n" +
      "Sale Amount: " + formatMoney(result.saleAmount, result.currency) + "\n" +
      "Structure: " + result.commissionType.toUpperCase() + "\n" +
      "Gross Commission: " + formatMoney(result.grossCommission, result.currency) + "\n" +
      "Agent Take-Home (" + result.splitPercent + "%): " + formatMoney(result.netCommission, result.currency) + "\n" +
      "Effective Rate: " + result.effectiveRate.toFixed(2) + "%";

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const quickPills = [10000, 25000, 50000, 100000, 250000];

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact Us", href: "#contact" },
    { label: "FAQ", href: "#faq" },
  ];

  const noop = () => {};

  return (
    <div className={className}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* SECTION 1: FLOATING NAVIGATION BAR */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none">
        <style>{".bg-ribbed{background-color:rgba(244,243,237,0.9);background-image:repeating-linear-gradient(to right,rgba(245,243,236,0) 0px,rgba(245,243,236,0) 64px,rgba(0,0,0,0.028) 64px,rgba(0,0,0,0.028) 65px,rgba(255,255,255,0.4) 65px,rgba(255,255,255,0.4) 66px);}@keyframes moneyFloat{0%,100%{transform:translateY(0px);}50%{transform:translateY(-12px);}}.animate-money-hover{transition:transform 0.4s ease-out;}.group:hover .animate-money-hover{animation:moneyFloat 2.2s ease-in-out infinite;}@keyframes dangleSway{0%{transform:rotate(0deg);}20%{transform:rotate(6deg);}40%{transform:rotate(-5deg);}60%{transform:rotate(3deg);}80%{transform:rotate(-2deg);}100%{transform:rotate(0deg);}}.animate-dangle{transform-origin:top center;animation:dangleSway 3s ease-in-out infinite;}@keyframes arrowFlyAcross{0%{transform:translateX(-125px) scale(0.85);opacity:0;}20%{transform:translateX(-90px) scale(1.4);opacity:1;}50%{transform:translateX(-50px) scale(1.65);opacity:1;}80%{transform:translateX(-15px) scale(1.4);opacity:1;}100%{transform:translateX(0px) scale(1.25);opacity:1;}}.nav-curve-char{display:inline-block;transform:translateY(0px);transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1);}.group\\/nav:hover .nav-curve-char{transform:translateY(var(--curve-y,0px));}.group:hover .animate-arrow-sweep{animation:arrowFlyAcross 0.65s cubic-bezier(0.22,1,0.36,1) forwards;}@keyframes marqueeScroll{0%{transform:translateX(0%);}100%{transform:translateX(-50%);}}.animate-marquee-infinite{display:flex;width:max-content;animation:marqueeScroll 24s linear infinite;}.animate-marquee-infinite:hover{animation-play-state:paused;}@keyframes meshFloat1{0%{transform:translate(0px,0px) scale(1) rotate(0deg);}50%{transform:translate(360px,120px) scale(0.95) rotate(90deg);}100%{transform:translate(0px,0px) scale(1) rotate(180deg);}}@keyframes meshFloat2{0%{transform:translate(0px,0px) scale(1) rotate(0deg);}50%{transform:translate(-380px,-90px) scale(0.9) rotate(-90deg);}100%{transform:translate(0px,0px) scale(1) rotate(-180deg);}}@keyframes meshFloat3{0%{transform:translate(0px,0px) scale(1);}50%{transform:translate(-200px,220px) scale(0.92);}100%{transform:translate(0px,0px) scale(1);}}@keyframes meshFloat4{0%{transform:translate(0px,0px) scale(1);}50%{transform:translate(240px,-140px) scale(0.88);}100%{transform:translate(0px,0px) scale(1);}}@keyframes meshFloat5{0%{transform:translate(0px,0px) scale(1) rotate(0deg);}50%{transform:translate(160px,-180px) scale(0.9) rotate(120deg);}100%{transform:translate(0px,0px) scale(1) rotate(180deg);}}.animate-mesh-1{animation:meshFloat1 16s ease-in-out infinite alternate;}.animate-mesh-2{animation:meshFloat2 19s ease-in-out infinite alternate;}.animate-mesh-3{animation:meshFloat3 17s ease-in-out infinite alternate;}.animate-mesh-4{animation:meshFloat4 21s ease-in-out infinite alternate;}.animate-mesh-5{animation:meshFloat5 18s ease-in-out infinite alternate;}@keyframes liquidMove1{0%,100%{transform:translate(0,-50%) scale(1);}50%{transform:translate(30px,-40%) scale(1.3);}}@keyframes liquidMove2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-20px,15px) scale(1.2);}}@keyframes liquidMove3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(15px,-15px) scale(1.25);}}.animate-liquid-1{animation:liquidMove1 6s ease-in-out infinite;}.animate-liquid-2{animation:liquidMove2 7s ease-in-out infinite;}.animate-liquid-3{animation:liquidMove3 8s ease-in-out infinite;}"}</style>

        <motion.div
          initial={{ y: -45, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
          className="w-full max-w-[1440px] mx-auto pointer-events-auto"
        >
          <div className="relative overflow-hidden w-full bg-white/75 backdrop-blur-md rounded-full border border-neutral-200/90 shadow-[0_8px_35px_rgba(0,0,0,0.06)] transition-all">
            {/* liquid glass blob layer */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#0D163F]/25 blur-2xl animate-liquid-1" />
              <div className="absolute left-1/3 -top-8 w-28 h-28 rounded-full bg-[#DF081A]/20 blur-2xl animate-liquid-2" />
              <div className="absolute right-10 -bottom-8 w-24 h-24 rounded-full bg-[#0D163F]/20 blur-2xl animate-liquid-3" />
            </div>

            <div className="relative z-10 pl-5 sm:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 flex items-center justify-between gap-4">
            <a href="#" className="flex items-center group focus:outline-none shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Trueweb Cart"
                className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-105"
              />
            </a>

            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
              {navLinks.map((link) => {
                const chars = Array.from(link.label);
                const totalChars = chars.length;
                return (
                  <div key={link.label} className="relative group/nav py-1 flex flex-col items-center">
                    <a
                      href={link.href}
                      className="inline-flex items-center text-neutral-600 group-hover/nav:bg-gradient-to-r group-hover/nav:from-[#0D163F] group-hover/nav:to-[#DF081A] group-hover/nav:bg-clip-text group-hover/nav:text-transparent transition-all duration-300 whitespace-nowrap select-none font-['Kodchasan',sans-serif]"
                    >
                      {chars.map((char, i) => {
                        const curveOffset = -Math.sin((i / (totalChars - 1)) * Math.PI) * 4.5;
                        return (
                          <span
                            key={i}
                            className="nav-curve-char inline-block"
                            style={{
                              "--curve-y": curveOffset + "px",
                              transitionDelay: i * 18 + "ms",
                            } as React.CSSProperties}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        );
                      })}
                    </a>
                    <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center opacity-0 group-hover/nav:opacity-100 -translate-y-2 group-hover/nav:translate-y-0 transition-all duration-300 ease-out z-50">
                      <div className="w-[1px] h-7 bg-neutral-300 shadow-xs" />
                      <img
                        src="https://cdn.jiro.build/Commission/Images/image%2084.png"
                        alt="Hanging bill"
                        referrerPolicy="no-referrer"
                        className="w-4 h-auto object-contain drop-shadow-md origin-top animate-dangle mt-[-1px]"
                      />
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={noop}
                className="px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-black hover:bg-[#0D163F]/10 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap font-['Kodchasan',sans-serif]"
              >
                Log in
              </button>
              <LightBeamButton onClick={noop} className="!px-5 !py-2 !text-sm">
                Get started
              </LightBeamButton>
            </div>

            <div className="flex sm:hidden items-center gap-1.5">
              <LightBeamButton onClick={noop} className="!px-3.5 !py-1.5 !text-xs">
                Get started
              </LightBeamButton>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-neutral-700 hover:text-black rounded-full"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" as const }}
                className="sm:hidden mt-2.5 bg-white/98 backdrop-blur-lg rounded-3xl p-5 border border-neutral-200 shadow-2xl flex flex-col gap-2.5"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-base font-medium text-neutral-800 hover:bg-gradient-to-r hover:from-[#0D163F] hover:to-[#DF081A] hover:bg-clip-text hover:text-transparent rounded-2xl transition-all duration-300 font-['Kodchasan',sans-serif]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 mt-1 border-t border-neutral-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold text-neutral-700 hover:bg-[#0D163F]/10 rounded-2xl font-['Kodchasan',sans-serif]"
                  >
                    Log in
                  </button>
                  <LightBeamButton onClick={() => setMobileMenuOpen(false)} className="w-full">
                    Get started free
                  </LightBeamButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* SECTION 2: HERO SECTION WITH LIVE WORKING CALCULATOR + LOGOS */}
      <section
        id="calculator"
        className="relative pt-32 sm:pt-40 pb-6 bg-ribbed overflow-hidden font-['Kodchasan',sans-serif]"
      >
        {/* Mesh gradient overlay removed to keep this section flush with the flat #F4F3ED background used elsewhere on the page */}

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-5 flex flex-col items-start text-left font-['Kodchasan',sans-serif]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-start w-full"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-xs sm:text-[13px] font-medium text-neutral-800 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-neutral-300 transition-all font-['Kodchasan',sans-serif]">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8FE3A] opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4ec16] border border-black/15 shadow-xs" />
                  </span>
                  <span className="tracking-tight text-neutral-800">Commission Calculator &amp; Tracking</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-normal bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent tracking-tight leading-[1.05] mb-6 font-['Kodchasan',sans-serif]">
                  Calculate Your Commission in Seconds
                </h1>

                <p className="text-[17px] text-neutral-600 leading-relaxed mb-8 max-w-md font-['Kodchasan',sans-serif]">
                  Calculate deal earnings, model tiered quota accelerators, and automate rep and broker split payouts with instant mathematical accuracy.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.35, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full flex flex-col items-start"
              >
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-4 font-['Kodchasan',sans-serif]">
                  <LightBeamButton onClick={noop}>Get started</LightBeamButton>

                  <LightBeamButton onClick={noop}>
                    <Play className="w-3.5 h-3.5 fill-white inline-block mr-2 -mt-0.5" />
                    Contact us / Demo
                  </LightBeamButton>
                </div>

                <p className="text-xs text-neutral-500 mt-2 font-['Kodchasan',sans-serif]">
                  No signup required for basic calculation • Private &amp; client-side
                </p>
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
