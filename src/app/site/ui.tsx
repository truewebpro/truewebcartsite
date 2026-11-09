// src/app/site/ui.tsx
import Link from "next/link";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-sm font-semibold tracking-[0.08em] uppercase ${
        light ? "text-[#FFB9A6]" : "text-cta-text"
      }`}
    >
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1240px] mx-auto px-6 ${className}`}>{children}</div>;
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 items-start text-[15px] leading-normal">
      <Check aria-hidden className="w-[18px] h-[18px] mt-0.5 shrink-0" strokeWidth={2.6} />
      <span>{children}</span>
    </li>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "cta" | "navy" | "outline-light" | "white" };

const BTN: Record<NonNullable<BtnProps["variant"]>, string> = {
  cta: "bg-cta text-white hover:bg-[#c02503]",
  navy: "bg-navy text-white hover:bg-navy-deep",
  "outline-light": "border border-[#6F88B5] text-white hover:bg-white/10",
  white: "bg-white text-cta-text hover:bg-[#FFF1EC]",
};

export function Button({ href, children, variant = "cta" }: BtnProps) {
  const cls = `inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-base transition-colors ${BTN[variant]}`;
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <Container className="pb-24">
      <div className="bg-cta text-white rounded-[28px] px-8 sm:px-12 py-12 sm:py-14 flex flex-wrap gap-6 justify-between items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>
          {text && <p className="mt-2.5 text-[17px]">{text}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={primary.href} variant="white">
            {primary.label}
          </Button>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center px-6 py-3.5 rounded-full border border-white font-semibold hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
}
