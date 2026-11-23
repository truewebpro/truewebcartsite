// src/app/home/Integrations.tsx
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Catalog } from "@/lib/catalog";
import { Heading, Section } from "./parts";

const TOOLS = [
  { name: "Google", logo: "google" },
  { name: "Mailchimp", logo: "mailchimp" },
  { name: "Klaviyo", logo: "klaviyo" },
  { name: "Trustpilot", logo: "trustpilot" },
  { name: "Judge.me", logo: "judgeme" },
  { name: "WhatsApp", logo: null },
  { name: "Sendcloud", logo: "sendcloud" },
  { name: "AWS", logo: "aws" },
];

function Logo({ t, size = 44 }: { t: (typeof TOOLS)[number]; size?: number }) {
  return t.logo ? (
    <Image src={`/home/logos/${t.logo}.webp`} alt="" width={size} height={size} className="object-contain" style={{ width: size, height: size }} />
  ) : (
    <span className="inline-flex items-center justify-center rounded-xl bg-[#25D366] text-white" style={{ width: size, height: size }}>
      <MessageCircle className="w-1/2 h-1/2" aria-hidden />
    </span>
  );
}

function Tile({ t }: { t: (typeof TOOLS)[number] }) {
  return (
    <div className="h-glass rounded-[20px] px-3 py-4 flex flex-col items-center gap-2 text-center">
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-[0_6px_18px_rgba(11,47,102,0.10)]">
        <Logo t={t} size={36} />
      </span>
      <span className="text-[14px] font-extrabold text-[var(--h-text)]">{t.name}</span>
      <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0F8A55] dark:text-[#3DDC91]">
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        Connected
      </span>
    </div>
  );
}

export default function Integrations({ catalog }: { catalog: Catalog }) {
  const apps = catalog.apps.filter((a) => a.line);
  const half = Math.ceil(apps.length / 2);
  const rows = [apps.slice(0, half), apps.slice(half)];
  const angle = (i: number) => (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;

  return (
    <Section glows>
      <Heading title="Works with the tools you already use" sub="Connect Google, email, reviews, chat and delivery in a few clicks. No code needed." />

      {/* phones and tablets */}
      <div className="lg:hidden mt-10 grid grid-cols-2 min-[480px]:grid-cols-4 gap-3">
        {TOOLS.map((t) => <Tile key={t.name} t={t} />)}
      </div>

      {/* desktop hub */}
      <div className="hidden lg:block relative mx-auto mt-12 w-[760px] h-[560px]">
        <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 760 560">
          {TOOLS.map((_, i) => (
            <line
              key={i}
              x1={380}
              y1={280}
              x2={380 + Math.cos(angle(i)) * 300}
              y2={280 + Math.sin(angle(i)) * 220}
              stroke="var(--h-line)"
              strokeWidth={2}
              strokeDasharray="4 8"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2s" repeatCount="indefinite" />
            </line>
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-[32px] bg-white shadow-[0_20px_50px_rgba(11,47,102,0.2)] flex items-center justify-center">
          <Image src="/home/tw-mark.png" alt="TWCarts" width={132} height={108} className="w-[78px] h-auto" />
        </div>
        {TOOLS.map((t, i) => (
          <div
            key={t.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[150px] h-float"
            style={{ left: 380 + Math.cos(angle(i)) * 300, top: 280 + Math.sin(angle(i)) * 220, animationDelay: `${-i * 0.7}s` }}
          >
            <Tile t={t} />
          </div>
        ))}
      </div>

      <div className="mt-14 lg:mt-10 text-center">
        <h3 className="text-[24px] sm:text-[30px] font-extrabold tracking-[-0.6px] text-[var(--h-text)]">Plus {catalog.apps.length} apps built in</h3>
        <p className="mt-2 text-[16px] text-[var(--h-muted)] max-w-[560px] mx-auto">
          Turn on what you need from the App Store. No extra logins, no extra bills from other companies.
        </p>
      </div>
      <div className="mt-8 grid gap-3 -mx-4 sm:-mx-6 lg:-mx-8">
        {rows.map((row, r) => (
          <div key={r} className="h-marquee-wrap h-fade-edges overflow-hidden">
            <ul className={`h-marquee gap-3 ${r ? "h-marquee-rev" : ""}`} style={{ animationDuration: `${50 + r * 8}s` }}>
              {[...row, ...row].map((a, k) => (
                <li
                  key={`${a.key}-${k}`}
                  aria-hidden={k >= row.length}
                  className="shrink-0 h-glass rounded-full pl-4 pr-5 py-2.5"
                >
                  <span className="block text-[14px] font-extrabold text-[var(--h-text)] whitespace-nowrap">{a.name}</span>
                  <span className="block text-[12px] text-[var(--h-muted)] whitespace-nowrap">{a.line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
