// src/app/home/ShopBuilder.tsx
import Image from "next/image";
import { ArrowUp, Menu } from "lucide-react";
import { Heading, Section } from "./parts";

const PRODUCTS = [
  { name: "Amber candle", price: "£22", img: "amber" },
  { name: "Room spray", price: "£16", img: "spray" },
  { name: "Stone mug", price: "£14", img: "mug" },
  { name: "Gift bag", price: "£6", img: "bag" },
];
const SECTIONS = [
  { name: "Banner", tint: "#FFE1D6" },
  { name: "Product grid", tint: "#DCE6FF" },
  { name: "Reviews", tint: "#D9F2E4", on: true },
  { name: "Newsletter", tint: "#FFF0CC" },
  { name: "FAQ", tint: "#EADFFF" },
];
const GREEN = "#1F6B4A";

function Browser() {
  return (
    <div className="rounded-[18px] sm:rounded-[22px] overflow-hidden bg-white border border-[#E6E9F0] shadow-[0_30px_80px_rgba(11,47,102,0.16)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#F3F5F9]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 px-3 py-1 rounded-full bg-white text-[12px] text-[#4A5163] truncate">bloomandco.twcarts.com</span>
      </div>
      <div className="flex items-center gap-4 px-4 sm:px-6 py-3 text-white" style={{ background: GREEN }}>
        <span className="font-extrabold text-[15px] sm:text-[17px] mr-auto">Bloom &amp; Co</span>
        <span className="hidden md:flex gap-6 text-[14px] font-bold">
          <span>New in</span><span>Bestsellers</span><span>Gifts</span><span>About</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-white/20 text-[13px] font-bold">Cart (2)</span>
      </div>
      <div className="p-4 sm:p-6 grid sm:grid-cols-[1.1fr_1fr] gap-5 sm:gap-7 items-center">
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
          <Image src="/home/photos/banner.webp" alt="A lit candle on a wooden table" fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
        </div>
        <div>
          <p className="text-[30px] sm:text-[40px] font-extrabold tracking-[-1px] text-[#0E2A1F] leading-tight">Bloom &amp; Co</p>
          <p className="mt-2 text-[15px] text-[#4A5163]">Hand-poured candles and home scents, made in small batches.</p>
          <span className="mt-4 inline-flex px-5 py-2.5 rounded-full text-white text-[15px] font-bold" style={{ background: GREEN }}>Shop all</span>
        </div>
      </div>
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {PRODUCTS.map((p) => (
          <div key={p.name}>
            <div className="relative aspect-[4/3] rounded-xl bg-[#E8F3EC] overflow-hidden">
              <Image src={`/home/photos/${p.img}.webp`} alt="" fill sizes="(min-width: 768px) 180px, 45vw" className="object-contain p-3" />
            </div>
            <p className="mt-2 text-[14px] font-bold text-[#0E2A1F]">{p.name}</p>
            <p className="text-[13px] text-[#4A5163]">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Editor() {
  return (
    <div className="h-glass !bg-[var(--h-glass-strong)] rounded-[20px] p-3 w-full">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-[var(--h-chip)]">
        <span className="py-2 text-center text-[14px] font-bold text-[var(--h-muted)]">Theme</span>
        <span className="py-2 text-center text-[14px] font-bold rounded-full bg-[#081F45] text-white">Sections</span>
      </div>
      <ul className="mt-2">
        {SECTIONS.map((s) => (
          <li key={s.name} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${s.on ? "bg-[#0F8A55]/10" : ""}`}>
            <span className="w-9 h-7 rounded-md" style={{ background: s.tint }} />
            <span className="text-[15px] font-bold text-[var(--h-text)]">{s.name}</span>
            {s.on && <span className="ml-auto text-[12px] font-bold text-[#0F8A55]">Added</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Assistant() {
  return (
    <div className="h-glass !bg-[var(--h-glass-strong)] rounded-[20px] p-4 w-full">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-full bg-[linear-gradient(135deg,#F5A524,#D92A04)]" />
        <span className="text-[15px] font-extrabold text-[var(--h-text)]">Shop assistant</span>
      </div>
      <p className="mt-3 ml-auto w-fit max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-md bg-[#081F45] text-white text-[14px]">
        Add customer reviews under my products
      </p>
      <p className="mt-2 w-fit max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[#E3F4EA] text-[#0F5A36] text-[14px] font-bold">
        Done. Reviews are live on your online shop.
      </p>
      <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl border border-[var(--h-input-bd)] bg-[var(--h-input)]">
        <span className="text-[14px] text-[var(--h-soft)]">Ask me anything</span>
        <span className="w-7 h-7 rounded-full bg-cta text-white inline-flex items-center justify-center"><ArrowUp className="w-4 h-4" aria-hidden /></span>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="w-[200px] rounded-[34px] p-2 bg-[#0B1530] shadow-[0_30px_70px_rgba(11,47,102,0.3)]">
      <div className="rounded-[27px] overflow-hidden bg-white">
        <div className="flex items-center justify-between px-3.5 py-3 text-white text-[13px] font-extrabold" style={{ background: GREEN }}>
          Bloom &amp; Co <Menu className="w-4 h-4" aria-hidden />
        </div>
        <div className="p-3">
          <div className="relative aspect-[5/4] rounded-xl overflow-hidden">
            <Image src="/home/photos/banner.webp" alt="" fill sizes="180px" className="object-cover" />
          </div>
          <p className="mt-2 text-[20px] font-extrabold text-[#0E2A1F]">Bloom &amp; Co</p>
          <span className="mt-1.5 inline-flex px-3.5 py-1.5 rounded-full text-white text-[12px] font-bold" style={{ background: GREEN }}>Shop all</span>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["amber", "spray"].map((p) => (
              <div key={p} className="relative aspect-square rounded-lg bg-[#E8F3EC]">
                <Image src={`/home/photos/${p}.webp`} alt="" fill sizes="80px" className="object-contain p-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopBuilder() {
  return (
    <Section>
      <Heading
        title="Make your online shop look like your brand."
        sub="Change colours, fonts and sections and see every change live. Or ask the shop assistant to do it for you."
      />
      {/* phones and tablets: stacked */}
      <div className="mt-10 sm:mt-12 xl:hidden grid gap-4 max-w-[860px] mx-auto">
        <Browser />
        <div className="grid md:grid-cols-2 gap-4">
          <Editor />
          <Assistant />
        </div>
      </div>
      {/* desktop: layered like the mockup */}
      <div className="hidden xl:block relative mt-14 h-[600px]">
        <div className="absolute left-[150px] right-[180px] top-[20px]"><Browser /></div>
        <div className="absolute left-0 top-[80px] w-[270px] h-float"><Editor /></div>
        <div className="absolute right-0 top-0 h-float" style={{ animationDelay: "-2s" }}><Phone /></div>
        <div className="absolute right-[-10px] top-[350px] w-[310px] h-float" style={{ animationDelay: "-4s" }}><Assistant /></div>
      </div>
    </Section>
  );
}
