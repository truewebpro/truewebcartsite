// src/app/site/SiteHeader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ADMIN_URL, NAV, SIGNUP_URL } from "./links";
import { IconTile } from "./icons";
import ThemeToggle from "./ThemeToggle";

/**
 * Thin tinted frosted bar, fixed to the top.
 * Desktop: hover a link for the liquid glass drop; Products, Solutions, Resources and Support open a full-width glass panel.
 * Phones and tablets: a menu button opens a frosted sheet with the same groups.
 */
export default function SiteHeader({ showTheme = true }: { showTheme?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = NAV.findIndex((n) => n.href !== "/" && pathname.startsWith(n.href.split("#")[0]));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  const openNow = (i: number | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  const current = open !== null ? NAV[open] : null;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
      onMouseLeave={closeSoon}
    >
      <div className="h-bar relative z-20">
        <div className="mx-auto max-w-[1312px] h-[60px] px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 xl:flex-1" onClick={() => { setSheet(false); setOpen(null); }}>
            <Image src="/logo.png" alt="" width={56} height={46} className="h-[26px] w-auto dark-tile" priority />
            <span className="font-extrabold text-[18px] text-[var(--h-text)]">TWCarts</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5 xl:gap-1 mx-auto xl:mx-0">
            {NAV.map((n, i) => {
              const isActive = i === activeIndex;
              const colour = isActive ? "text-[var(--h-active)] font-bold" : "text-[var(--h-muted)] font-semibold";
              const inner = (
                <>
                  <span className="h-drop" aria-hidden />
                  <span className="h-label">
                    {n.label}
                    {n.groups && <ChevronDown className="w-3 h-3 ml-1" strokeWidth={3} aria-hidden />}
                  </span>
                </>
              );
              return n.groups ? (
                <button
                  key={n.label}
                  type="button"
                  className={`h-link px-3 xl:px-4 py-2 text-[14px] whitespace-nowrap rounded-full ${colour}`}
                  aria-expanded={open === i}
                  aria-controls="site-menu-panel"
                  data-open={open === i}
                  onMouseEnter={() => openNow(i)}
                  onFocus={() => openNow(i)}
                  onClick={() => openNow(open === i ? null : i)}
                >
                  {inner}
                </button>
              ) : (
                <Link
                  key={n.label}
                  href={n.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`h-link px-3 xl:px-4 py-2 text-[14px] whitespace-nowrap rounded-full ${colour}`}
                  onMouseEnter={() => openNow(null)}
                  onFocus={() => openNow(null)}
                >
                  {inner}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto lg:ml-0 xl:flex-1 flex items-center justify-end gap-1 sm:gap-3">
            {showTheme && <ThemeToggle />}
            <a href={ADMIN_URL} className="hidden lg:inline whitespace-nowrap text-[14px] font-semibold text-[var(--h-text)] px-2">
              Log in
            </a>
            <a
              href={SIGNUP_URL}
              className="hidden sm:inline-flex whitespace-nowrap px-4 py-2 rounded-full bg-cta text-white text-[14px] font-bold hover:bg-[#c02503] transition-colors"
            >
              Start free
            </a>
            <button
              type="button"
              onClick={() => setSheet((v) => !v)}
              aria-expanded={sheet}
              aria-controls="site-menu-sheet"
              aria-label={sheet ? "Close menu" : "Open menu"}
              className="lg:hidden inline-flex w-11 h-11 items-center justify-center rounded-full text-[var(--h-text)] hover:bg-[var(--h-chip)]"
            >
              {sheet ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* desktop full-width panel */}
      {current?.groups && (
        <>
          <div
            aria-hidden
            className="hidden lg:block fixed inset-x-0 bottom-0 top-[calc(60px+env(safe-area-inset-top))] z-0 bg-[var(--h-dim)] backdrop-blur-[6px] h-fade-in"
            onMouseEnter={closeSoon}
            onClick={() => setOpen(null)}
          />
          <div
            id="site-menu-panel"
            key={current.label}
            className="hidden lg:block absolute inset-x-0 top-full z-10 h-panel h-panel-in shadow-[0_30px_60px_rgba(8,31,69,0.14)]"
            onMouseEnter={() => openNow(open)}
          >
            <div className={`mx-auto max-w-[1180px] px-8 py-8 grid gap-6 ${current.groups.some((g) => g.cols === 2) ? "grid-cols-[1.75fr_1fr_270px]" : "grid-cols-[1fr_1fr_300px]"}`}>
              {current.groups.map((g, gi) => (
                <div key={g.title} className="h-stagger">
                  <p className="px-3 pb-2 text-[12px] font-extrabold text-[var(--h-soft)]">{g.title}</p>
                  <ul className={g.cols === 2 ? "grid grid-cols-2 gap-x-2" : undefined}>
                    {g.items.map((it, ii) => (
                      <li key={it.label}>
                        <Link
                          href={it.href}
                          onClick={() => setOpen(null)}
                          className="flex gap-3 items-start p-3 rounded-2xl hover:bg-[var(--h-chip)] transition-colors"
                        >
                          <IconTile icon={it.icon} index={gi * 3 + ii} />
                          <span>
                            <span className="block text-[14px] font-extrabold text-[var(--h-text)]">{it.label}</span>
                            <span className="block mt-0.5 text-[13px] text-[var(--h-muted)]">{it.line}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {g.more && (
                    <Link href={g.more.href} onClick={() => setOpen(null)} className="inline-flex items-center gap-1.5 mt-1 px-3 py-2 text-[13.5px] font-extrabold text-[var(--h-text)] hover:underline">
                      {g.more.label}
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              ))}
              {current.groups.length < 2 && <div aria-hidden />}
              {current.promo ? (
                <Link
                  href={current.promo.href}
                  onClick={() => setOpen(null)}
                  className="h-stagger flex flex-col justify-between rounded-[20px] p-5 text-white bg-[radial-gradient(130%_120%_at_0%_0%,#1F4C9A_0%,#0B2350_55%,#3A1410_140%)] shadow-[0_20px_50px_rgba(8,31,69,0.25)] hover:-translate-y-0.5 transition-transform"
                >
                  <span>
                    <span className="block text-[19px] leading-[1.2] font-extrabold">{current.promo.title}</span>
                    <span className="block mt-2 text-[14px] leading-[1.5] text-[#C9D4EA]">{current.promo.line}</span>
                  </span>
                  <span className="mt-6 inline-flex self-start px-4 py-2.5 rounded-full bg-[#D92A04] text-[13.5px] font-extrabold">{current.promo.cta}</span>
                </Link>
              ) : (
                <a
                  href={SIGNUP_URL}
                  className="h-stagger block rounded-[20px] overflow-hidden h-card shadow-[0_10px_30px_rgba(11,47,102,0.10)] hover:-translate-y-0.5 transition-transform"
                >
                  <span className="flex items-center justify-center h-[150px] bg-[linear-gradient(160deg,#FFF3DB,#FFE9E2)]">
                    <Image src="/home/photos/amber.webp" alt="" width={127} height={130} className="h-[130px] w-auto" />
                  </span>
                  <span className="block px-4 py-3.5">
                    <span className="block text-[15px] font-extrabold text-[var(--h-text)]">Open your online shop today</span>
                    <span className="block mt-0.5 text-[13px] text-[var(--h-muted)]">3 days free, no credit card required.</span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </>
      )}

      {/* phones and tablets: frosted sheet */}
      {sheet && (
        <div
          id="site-menu-sheet"
          className="lg:hidden fixed inset-x-0 bottom-0 top-[calc(60px+env(safe-area-inset-top))] z-10 h-panel h-fade-in overflow-y-auto overscroll-contain"
        >
          <nav aria-label="Main" className="mx-auto max-w-[640px] px-5 pt-3 pb-[calc(24px+env(safe-area-inset-bottom))]">
            <ul>
              {NAV.map((n) =>
                n.groups ? (
                  <li key={n.label} className="border-b border-[var(--h-line)]">
                    <details className="group">
                      <summary className="flex items-center justify-between py-4 text-[17px] font-bold text-[var(--h-text)] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        {n.label}
                        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <div className="pb-3">
                        {n.groups.map((g, gi) => (
                          <div key={g.title}>
                            {n.groups!.length > 1 && <p className="pt-2 pb-1 text-[12px] font-extrabold text-[var(--h-soft)]">{g.title}</p>}
                            <ul>
                              {g.items.map((it, ii) => (
                                <li key={it.label}>
                                  <Link href={it.href} onClick={() => setSheet(false)} className="flex gap-3 items-center py-2.5">
                                    <IconTile icon={it.icon} index={gi * 4 + ii} size={36} />
                                    <span>
                                      <span className="block text-[15px] font-bold text-[var(--h-text)]">{it.label}</span>
                                      <span className="block text-[13px] text-[var(--h-muted)]">{it.line}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            {g.more && (
                              <Link href={g.more.href} onClick={() => setSheet(false)} className="inline-block py-2 text-[14px] font-extrabold text-[var(--h-text)] underline underline-offset-4">
                                {g.more.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={n.label} className="border-b border-[var(--h-line)]">
                    <Link href={n.href} onClick={() => setSheet(false)} className="block py-4 text-[17px] font-bold text-[var(--h-text)]">
                      {n.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="grid gap-3 mt-6">
              <a href={SIGNUP_URL} className="py-3.5 text-center rounded-full bg-cta text-white font-bold">
                Start free
              </a>
              <a href={ADMIN_URL} className="py-3.5 text-center rounded-full border border-[var(--h-input-bd)] font-bold text-[var(--h-text)]">
                Log in
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
