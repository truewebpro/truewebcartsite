// src/app/site/SiteHeader.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ADMIN_URL, NAV_LINKS } from "./links";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path !== "/" && !href.includes("#") && pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
      <div className="max-w-[1240px] mx-auto px-6 py-3.5 flex items-center gap-7">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-[30px] w-auto" />
          <span className="font-display font-bold text-xl text-navy">Trueweb Cart</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex flex-1 gap-6 text-[15px] font-medium">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={
                isActive(l.href)
                  ? "text-cta-text font-semibold"
                  : "text-graphite hover:text-navy transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <a href={ADMIN_URL} className="px-4 py-2.5 text-[15px] font-semibold text-navy hover:bg-navy/5 rounded-full">
            Log in
          </a>
          <Link
            href="/pricing"
            className="px-5 py-2.5 rounded-full bg-cta text-white text-[15px] font-semibold hover:bg-[#c02503] transition-colors"
          >
            Start your shop
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden ml-auto w-11 h-11 inline-flex items-center justify-center rounded-full text-navy hover:bg-navy/5"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-line bg-white px-6 pb-6 pt-2">
          <nav aria-label="Main" className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-graphite border-b border-line/70"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2.5 mt-5">
            <a href={ADMIN_URL} className="py-3 text-center rounded-full border border-line font-semibold text-navy">
              Log in
            </a>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="py-3 text-center rounded-full bg-cta text-white font-semibold"
            >
              Start your shop
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
