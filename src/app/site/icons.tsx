// src/app/site/icons.tsx
import {
  ArrowLeftRight, BookOpen, CircleHelp, Coffee, Globe, LayoutGrid, LayoutTemplate, Link2, Mail,
  MessageCircle, Package, Play, Shirt, ShoppingCart, Smartphone, Sparkles,
} from "lucide-react";
import type { MenuIcon } from "./links";

const MAP = {
  cart: ShoppingCart, globe: Globe, layout: LayoutTemplate, grid: LayoutGrid, phone: Smartphone, link: Link2,
  shirt: Shirt, cup: Coffee, spark: Sparkles, box: Package,
  book: BookOpen, play: Play, move: ArrowLeftRight, help: CircleHelp, chat: MessageCircle, mail: Mail,
} as const;

/** Coloured tile tints, cycled by position. Text colour first, tile colour second. */
const TINTS: [string, string][] = [
  ["#D92A04", "rgba(217,42,4,0.12)"],
  ["#2450B8", "rgba(36,80,184,0.12)"],
  ["#0F8A55", "rgba(15,138,85,0.12)"],
  ["#B7791F", "rgba(183,121,31,0.14)"],
  ["#6B4BC8", "rgba(107,75,200,0.12)"],
  ["#1F7FB7", "rgba(31,127,183,0.12)"],
];

export function IconTile({ icon, index, size = 38 }: { icon: MenuIcon; index: number; size?: number }) {
  const Icon = MAP[icon];
  const [fg, bg] = TINTS[index % TINTS.length];
  return (
    <span
      aria-hidden
      className="shrink-0 inline-flex items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: bg, color: fg }}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
    </span>
  );
}

const SOCIAL = [
  { label: "Facebook", d: "M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3h2v9h3v-9h2.5l.5-3h-3V6.8c0-.5.4-.8.8-.8H15V3Z" },
  { label: "LinkedIn", d: "M4 4h4v16H4zM6 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM10 9h4v2c.6-1.2 2-2.2 4-2.2 3 0 4 2 4 5V20h-4v-5.5c0-1.5-.5-2.5-2-2.5s-2 1.1-2 2.5V20h-4z" },
  { label: "Instagram", d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" },
  { label: "Email", d: "M3 7l9 6 9-6M3 6h18v12H3z" },
];

export function SocialIcons() {
  return (
    <ul className="flex gap-2.5">
      {SOCIAL.map((s) => (
        <li key={s.label}>
          <a
            href={s.label === "Email" ? "/contact" : "#"}
            aria-label={s.label}
            className="inline-flex w-10 h-10 rounded-full items-center justify-center bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[var(--h-text)] hover:-translate-y-0.5 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={s.d} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
