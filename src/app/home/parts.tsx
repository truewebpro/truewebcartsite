// src/app/home/parts.tsx
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { SIGNUP_URL } from "../site/links";
import SectionBg from "./SectionBg";

/** Every section: same space above its heading and below its last item. */
export function Section({
  id, children, className = "", glows = false,
}: { id?: string; children: ReactNode; className?: string; glows?: boolean }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-[56px] sm:py-[64px] lg:py-[72px] scroll-mt-20 ${
        className || "bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#071633_0%,#0B2350_100%)]"
      }`}
    >
      <SectionBg />
      {glows && (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="h-glow h-drift w-[420px] h-[420px] -left-24 top-10" style={{ background: "var(--h-glow-a)" }} />
          <div className="h-glow h-drift w-[380px] h-[380px] -right-24 bottom-0" style={{ background: "var(--h-glow-b)", animationDelay: "-9s" }} />
        </div>
      )}
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Heading({ title, sub, align = "center" }: { title: ReactNode; sub?: ReactNode; align?: "center" | "left" }) {
  const c = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-[900px] ${c}`}>
      <h2 className="text-[32px] leading-[1.08] sm:text-[44px] lg:text-[52px] font-extrabold tracking-[-1.2px] lg:tracking-[-1.6px] text-[var(--h-text)] text-balance">
        {title}
      </h2>
      {sub && <p className={`mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-[var(--h-body)] max-w-[700px] ${c}`}>{sub}</p>}
    </div>
  );
}

/** Green spinning "3 DAYS FREE" badge. */
export function DaysBadge({ className = "", uid }: { className?: string; uid: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center justify-center rounded-full bg-[#0F6B3A] text-white border-[3px] border-white shadow-[0_10px_30px_rgba(15,107,58,0.35)] ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full h-spin">
        <defs>
          <path id={`badge-${uid}`} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text fill="#fff" fontSize="10.5" fontWeight="800" letterSpacing="2.2">
          <textPath href={`#badge-${uid}`}>3 DAYS FREE ✦ 3 DAYS FREE ✦</textPath>
        </text>
      </svg>
      <span className="relative text-center leading-none">
        <span className="block text-[26px] font-extrabold">3</span>
        <span className="block text-[9px] font-extrabold tracking-wide">DAYS</span>
      </span>
    </span>
  );
}

/** Email box and Start Free Today, used in the hero and the closing band. The email goes to sign-up. */
export function StartForm({ id, dark = false }: { id: string; dark?: boolean }) {
  return (
    <form action={SIGNUP_URL} method="get" className="relative flex flex-col sm:flex-row gap-3 w-full max-w-[680px] mx-auto">
      <label htmlFor={id} className="sr-only">Email address</label>
      <input
        id={id}
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="Enter your email address"
        className={`w-full min-w-0 sm:flex-1 h-[58px] sm:h-[64px] px-6 rounded-full text-[17px] outline-none focus:ring-4 focus:ring-[#D92A04]/25 ${
          dark
            ? "bg-white text-[#081F45] placeholder:text-[#6B7385] border-0"
            : "bg-[var(--h-input)] text-[var(--h-text)] placeholder:text-[var(--h-soft)] border-2 border-[var(--h-text)]"
        }`}
      />
      <button type="submit" className="h-ring h-[58px] sm:h-[64px] px-8 rounded-full bg-cta text-white text-[18px] font-extrabold hover:bg-[#c02503] transition-colors shrink-0">
        Start Free Today
      </button>
      <DaysBadge uid={id} className="!hidden sm:!inline-flex absolute sm:-right-3 sm:-top-14 sm:w-[84px] sm:h-[84px] lg:-right-12 lg:-top-16 lg:w-[96px] lg:h-[96px]" />
    </form>
  );
}

export function Tick({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[15px] font-bold whitespace-nowrap ${
      light ? "bg-white/10 text-white border border-white/20" : "bg-[var(--h-chip)] text-[var(--h-text)] border border-[var(--h-card-bd)] shadow-[0_4px_14px_rgba(11,47,102,0.06)]"
    }`}>
      <Check className={`w-4 h-4 ${light ? "text-[#3DDC91]" : "text-[#0F8A55]"}`} strokeWidth={3} aria-hidden />
      {children}
    </span>
  );
}
