// src/app/home/MobileApp.tsx
import Image from "next/image";
import { Bell, Bot, ChevronLeft, Fingerprint, MessageCircle, Package, Printer, RotateCcw, ScanBarcode } from "lucide-react";
import { Heading, Section } from "./parts";

const FEATURES = [
  { label: "Order alerts", icon: Bell },
  { label: "Scan barcodes", icon: ScanBarcode },
  { label: "Print labels", icon: Printer },
  { label: "Reply to chats", icon: MessageCircle },
  { label: "Face ID sign-in", icon: Fingerprint },
  { label: "Update stock", icon: Package },
  { label: "Refunds and returns", icon: RotateCcw },
  { label: "Ask the assistant", icon: Bot },
];

const ALERTS = [
  ["New order 1043", "Sophie M., 2 items, £50.00"],
  ["Customer message", "Do you ship to Ireland?"],
  ["Low stock", "Stone mug, 3 left"],
];

function Chip({ f }: { f: (typeof FEATURES)[number] }) {
  const Icon = f.icon;
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full h-glass text-[14px] font-bold text-[var(--h-text)] whitespace-nowrap">
      <Icon className="w-4 h-4 text-[#D92A04]" aria-hidden />
      {f.label}
    </span>
  );
}

function Phone() {
  return (
    <div className="relative w-[280px] sm:w-[300px] aspect-[9/19] rounded-[48px] p-[10px] bg-[linear-gradient(145deg,#2A3550,#0B1224)] shadow-[0_40px_90px_rgba(8,31,69,0.35),inset_0_0_0_2px_rgba(255,255,255,0.12)]">
      <div className="relative h-full rounded-[38px] overflow-hidden bg-[linear-gradient(180deg,#1E3C7A,#0A1A3A)]">
        <span className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[90px] h-[26px] rounded-full bg-black z-20" />
        {/* lock screen with alerts */}
        <div className="h-lock absolute inset-0 px-4 pt-14 text-white">
          <p className="text-center text-[13px] font-semibold opacity-80">Sunday 22 November</p>
          <p className="text-center text-[64px] font-extrabold leading-none tracking-[-2px]">9:41</p>
          <ul className="mt-6 grid gap-2">
            {ALERTS.map(([t, s], k) => (
              <li key={t} className="h-alert rounded-2xl bg-white/80 text-[#081F45] p-3 backdrop-blur" style={{ animationDelay: `${k * 0.5}s` }}>
                <p className="flex items-center gap-2 text-[11px] font-bold opacity-70">
                  <Image src="/home/tw-mark.png" alt="" width={18} height={15} className="w-4 h-auto" /> TWCarts <span className="ml-auto font-medium">now</span>
                </p>
                <p className="mt-1 text-[13px] font-extrabold">{t}</p>
                <p className="text-[12px] opacity-80">{s}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* the order opens */}
        <div className="h-order absolute inset-0 bg-[#F4F6FA] text-[#081F45] pt-12 px-4 flex flex-col">
          <p className="flex items-center gap-1 text-[15px] font-extrabold"><ChevronLeft className="w-5 h-5" aria-hidden /> Order 1043</p>
          <p className="mt-2 flex gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-[#E3F4EA] text-[#0F6B3A] text-[11px] font-bold">Paid</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFF3DB] text-[#8A5A00] text-[11px] font-bold">To pack</span>
          </p>
          <div className="mt-3 flex items-center gap-2.5 p-3 rounded-2xl bg-white">
            <span className="w-9 h-9 rounded-full bg-[#081F45] text-white text-[12px] font-bold inline-flex items-center justify-center">SM</span>
            <span><span className="block text-[13px] font-extrabold">Sophie M.</span><span className="block text-[11px] text-[#4A5163]">Manchester, 3rd order</span></span>
          </div>
          <div className="mt-2 p-3 rounded-2xl bg-white grid gap-2 text-[12px]">
            {[["amber", "Amber candle", "2 x £22.00", "£44.00"], ["bag", "Gift bag", "1 x £6.00", "£6.00"]].map(([img, n, q, t]) => (
              <div key={n} className="flex items-center gap-2">
                <span className="relative w-9 h-9 rounded-lg bg-[#E8F3EC]"><Image src={`/home/photos/${img}.webp`} alt="" fill sizes="36px" className="object-contain p-1" /></span>
                <span className="flex-1"><span className="block font-bold">{n}</span><span className="text-[#4A5163]">{q}</span></span>
                <span className="font-bold">{t}</span>
              </div>
            ))}
            <div className="border-t border-[#E6E9F0] pt-2 flex justify-between font-extrabold"><span>Total</span><span>£50.00</span></div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <span className="py-2.5 rounded-xl bg-[#081F45] text-white text-center text-[12px] font-bold">Print label</span>
            <span className="py-2.5 rounded-xl bg-[#D92A04] text-white text-center text-[12px] font-bold">Mark as sent</span>
          </div>
          <p className="mt-2 text-center text-[11px] font-bold text-[#0F6B3A]">Customer emailed with tracking</p>
        </div>
      </div>
    </div>
  );
}

export default function MobileApp() {
  const left = FEATURES.slice(0, 4);
  const right = FEATURES.slice(4);
  return (
    <Section id="mobile-app" glows>
      <Heading title="Your online shop, in your pocket" sub="Everything you need on the go, from new order alerts to printing labels." />
      <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
        <ul className="hidden lg:grid gap-4 justify-items-end">
          {left.map((f, k) => <li key={f.label} className="h-float" style={{ animationDelay: `${-k}s` }}><Chip f={f} /></li>)}
        </ul>
        <Phone />
        <ul className="hidden lg:grid gap-4 justify-items-start">
          {right.map((f, k) => <li key={f.label} className="h-float" style={{ animationDelay: `${-k - 2}s` }}><Chip f={f} /></li>)}
        </ul>
        <ul className="lg:hidden flex flex-wrap justify-center gap-2.5 max-w-[560px]">
          {FEATURES.map((f) => <li key={f.label}><Chip f={f} /></li>)}
        </ul>
      </div>
      <div className="mt-10 flex justify-center gap-3">
        <Image src="/home/logos/appstore.png" alt="Download on the App Store" width={362} height={104} className="h-[46px] w-auto" />
        <Image src="/home/logos/googleplay.png" alt="Get it on Google Play" width={363} height={104} className="h-[46px] w-auto" />
      </div>
    </Section>
  );
}
