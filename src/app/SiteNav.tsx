"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LightBeamButton from "./LightBeamButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Features", href: "/#features" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/contact#faq" },
];

export default function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navLinks = NAV_LINKS;
  const noop = () => {};
  const goContact = () => router.push("/contact");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

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
            <Link href="/" className="flex items-center group focus:outline-none shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Trueweb Cart"
                className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-neutral-600">
              {navLinks.map((link) => {
                const chars = Array.from(link.label);
                const totalChars = chars.length;
                return (
                  <div key={link.label} className="relative group/nav py-1 flex flex-col items-center">
                    <Link
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
                    </Link>
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

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                onClick={noop}
                className="px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-black hover:bg-[#0D163F]/10 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap font-['Kodchasan',sans-serif]"
              >
                Log in
              </button>
              <LightBeamButton onClick={goContact} className="!px-5 !py-2 !text-sm">
                Get started
              </LightBeamButton>
            </div>

            <div className="flex lg:hidden items-center gap-1.5">
              <LightBeamButton onClick={goContact} className="!px-3.5 !py-1.5 !text-xs">
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
                className="lg:hidden mt-2.5 bg-white/98 backdrop-blur-lg rounded-3xl p-5 border border-neutral-200 shadow-2xl flex flex-col gap-2.5"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-base font-medium text-neutral-800 hover:bg-gradient-to-r hover:from-[#0D163F] hover:to-[#DF081A] hover:bg-clip-text hover:text-transparent rounded-2xl transition-all duration-300 font-['Kodchasan',sans-serif]"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-1 border-t border-neutral-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold text-neutral-700 hover:bg-[#0D163F]/10 rounded-2xl font-['Kodchasan',sans-serif]"
                  >
                    Log in
                  </button>
                  <LightBeamButton onClick={() => { setMobileMenuOpen(false); goContact(); }} className="w-full">
                    Get started free
                  </LightBeamButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}
