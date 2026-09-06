"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Play, Star, Menu, X, Users, CreditCard, Layout } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", hasDropdown: false },
  { label: "Features", hasDropdown: true },
  { label: "Pricing", hasDropdown: false },
  { label: "Use Cases", hasDropdown: false },
];

const FEATURE_DROPDOWN_ITEMS = [
  "Platform Overview",
  "Member Management",
  "Content Delivery",
  "Analytics",
];

const FEATURES = [
  {
    icon: Users,
    title: "Membership Management",
    description: "Easily manage members, access levels, and permissions from one dashboard.",
  },
  {
    icon: CreditCard,
    title: "Recurring Subscriptions",
    description: "Create flexible pricing plans and automate recurring payments effortlessly.",
  },
  {
    icon: Layout,
    title: "Course & Content Builder",
    description: "Launch courses, gated content, and digital products in minutes — effortlessly.",
  },
];

const LOGOS = [
  { name: "Unbounce", src: "https://cdn.jiro.build/Fable/Company%20Logo/unbounce.svg" },
  { name: "HubSpot", src: "https://cdn.jiro.build/Fable/Company%20Logo/Hubspot.svg" },
  { name: "Outsystems", src: "https://cdn.jiro.build/Fable/Company%20Logo/outsystems.svg" },
  { name: "Autodesk", src: "https://cdn.jiro.build/Fable/Company%20Logo/AUTODESK.svg" },
  { name: "Vermeer", src: "https://cdn.jiro.build/Fable/Company%20Logo/Vermeer.svg" },
  { name: "Typeform", src: "https://cdn.jiro.build/Fable/Company%20Logo/Typeform.svg" },
];

const intersectionDotShadow = {
  boxShadow:
    "0 5px 2px rgba(143,143,143,0.03), 0 3px 2px rgba(143,143,143,0.08), 0 1px 1px rgba(143,143,143,0.12), 0 0 1px rgba(143,143,143,0.20)",
};

function Button({
  variant = "default",
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }) {
  const base =
    "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-[#FF4E01] text-white hover:bg-[#E74700]",
    outline: "border-[#E7E6E6] bg-white text-[#0E0E0F] hover:bg-gray-50",
  };
  return (
    <button className={base + " " + variants[variant] + " " + className} {...props}>
      {children}
    </button>
  );
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F5" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#35A852" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EB4334" />
    </svg>
  );
}

export default function AiMembershipHeader({ className = "" }: { className?: string }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <div className={"relative w-full bg-white flex flex-col items-center overflow-hidden " + className}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .font-figtree { font-family: 'Figtree', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-caveat { font-family: 'Caveat', cursive; }
      `}</style>

      {/* ---------- Navbar ---------- */}
      <div className="w-full max-w-[1248px] mx-auto flex flex-col items-center gap-[10px] self-stretch px-4 pt-6 z-50">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex p-3 items-center self-stretch rounded-full bg-[#F9F5F0] shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.jiro.build/Fable/All%20SVG/Logomark.svg"
            alt="MemberFlow Logo"
            referrerPolicy="no-referrer"
            className="w-[40px] h-[34px] sm:w-[48px] sm:h-[40px] pl-2 flex-1 lg:hidden"
          />

          <div className="flex-1 hidden lg:flex items-center gap-4 pl-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setFeaturesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setFeaturesOpen(false)}
                >
                  <button
                    onClick={() => setActiveLink(link.label)}
                    className={
                      "flex items-center gap-1 px-4 py-1.5 rounded-full border font-inter text-[15px] font-medium transition-all duration-300 " +
                      (isActive
                        ? "border-[#FF4E01] text-[#0E0E0F] bg-[#FEF5F0]"
                        : "border-transparent text-[#0E0E0F] hover:border-[#FF4E01] hover:bg-[#FEF5F0]")
                    }
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                  {link.hasDropdown && featuresOpen && (
                    <div className="absolute top-full left-0 mt-1 z-50 w-56 p-2 rounded-2xl bg-white shadow-xl border border-[#E3DDD9]">
                      {FEATURE_DROPDOWN_ITEMS.map((item) => (
                        <div key={item} className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 text-[#0E0E0F] rounded-lg">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="hidden md:flex lg:hidden flex-1 justify-center"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.jiro.build/Fable/All%20SVG/Logomark.svg"
            alt="MemberFlow Logo"
            referrerPolicy="no-referrer"
            className="hidden lg:flex justify-center shrink-0 w-[48px] h-[40px]"
          />

          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4 pr-1">
            <a href="#" className="hidden md:block text-[#0E0E0F] font-inter text-[15px] font-medium hover:opacity-70 transition-opacity">
              Login
            </a>
            <Button className="hidden md:flex px-4 py-3 rounded-full bg-[#FF4E01] hover:bg-[#E74700] text-[#FAFBFA] font-inter text-[16px] font-medium leading-6 tracking-[-0.3px]">
              Build for free
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ---------- Mobile menu ---------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white border-b border-[#E3DDD9] px-8 py-6 flex flex-col gap-4 overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.label} href="#" className="flex items-center gap-1 text-[18px] font-medium text-[#0E0E0F]">
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
            <div className="h-[1px] bg-[#E3DDD9] my-2" />
            <a href="#" className="text-[18px] font-medium text-[#0E0E0F]">Login</a>
            <Button className="bg-[#FF4E01] text-white rounded-full w-full h-12 font-semibold">Build for free</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Hero ---------- */}
      <div className="w-full max-w-[1248px] px-4 mt-[96px] flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E3DDD9] mb-6"
        >
          <span className="px-2.5 py-0.5 bg-[#FF4E01] rounded-full text-white font-inter text-[13px] font-semibold">New</span>
          <span className="font-inter text-[14px] text-[#414141]">AI-Powered Membership Platform</span>
          <span className="w-[1px] h-4 bg-[#E3DDD9]" />
          <a href="#" className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F4F4F4] text-[#414141] text-[13px] font-medium hover:bg-[#EEEEEF] transition-colors">
            Get Early Access
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
          className="font-figtree font-bold text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-2px] text-[#0E0E0F] text-center max-w-[850px] mb-4"
        >
          Build, Launch &amp; Scale Your Membership Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: "easeOut" }}
          className="font-inter text-[16px] md:text-[20px] leading-[30px] text-[#414141] text-center max-w-[710px] mb-8"
        >
          Create courses, manage members, accept payments, and grow your community — all from one powerful platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease: "easeOut" }}
          className="relative flex flex-col sm:flex-row items-center gap-3 mb-[64px]"
        >
          <Button className="group flex px-6 py-4 rounded-full bg-[#FF4E01] hover:bg-[#E74700] text-white font-inter text-[16px] font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.10)]">
            Get Started Free
            <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="group flex px-6 py-4 rounded-full border border-[#E7E6E6] bg-white text-[#0E0E0F] font-inter text-[16px] font-semibold hover:shadow-lg">
            Schedule a Demo
            <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="absolute -left-[260px] bottom-[-46px] hidden md:block">
            <span className="font-caveat text-[24px] text-[#6A7381] -rotate-3 inline-block">Try it Free for 7 days</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.jiro.build/Fable/Other%20IMG/arrow.png"
              alt=""
              referrerPolicy="no-referrer"
              className="w-[72px] h-[40px] object-contain brightness-75 absolute left-[calc(100%+4px)] -top-5"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-[1248px] aspect-video md:aspect-[1248/620] relative group"
        >
          <div className="rounded-[20px] overflow-hidden w-full h-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.jiro.build/Fable/Other%20IMG/header%203%20dashboard.png"
              alt="MemberFlow Dashboard"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setVideoOpen(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
            >
              <span className="p-3 rounded-full bg-[#FAFBFA] transition-transform hover:scale-[1.08]">
                <span className="flex p-2.5 rounded-full bg-white">
                  <Play className="w-6 h-6 text-[#FF4E01] fill-[#FF4E01]" />
                </span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ---------- Features & social-proof grid ---------- */}
      <div className="w-full max-w-[1376px] mt-6 mb-32 relative z-20 px-4 xl:px-0">
        <div className="hidden xl:block h-[1px] bg-[#E3DDD9] w-[1376px]" />
        <div className="w-full max-w-[1248px] mx-auto border-l border-r border-[#E3DDD9] bg-white relative">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={
                    "p-8 md:p-10 border-b border-[#E3DDD9] hover:bg-gray-50/50 transition-colors duration-500" +
                    (i < FEATURES.length - 1 ? " md:border-r" : "")
                  }
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF4E01] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,79,0,0.2)] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-figtree font-bold text-[22px] tracking-tight text-[#0E0E0F] mb-2">{feature.title}</h3>
                  <p className="font-inter text-[16px] leading-[26px] text-[#535253]">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border-t border-[#E3DDD9]">
            <div className="p-8 md:p-10 lg:border-r border-[#E3DDD9]">
              <p className="font-inter text-[15px] text-[#6A6A6A] mb-2">Trusted by</p>
              <h4 className="font-figtree font-bold text-[32px] text-[#0E0E0F] mb-3">127K+ Creators</h4>
              <div className="flex items-center gap-2 mb-1">
                <GoogleG />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FF4E01] fill-[#FF4E01]" />
                  ))}
                </div>
              </div>
              <p className="font-inter text-[13px] text-[#6A6A6A]">4.9 Average user rating</p>
            </div>

            <div className="overflow-hidden relative bg-[#FAFBFA]/30 flex flex-col justify-center gap-8 py-8">
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-16 items-center whitespace-nowrap"
              >
                {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={logo.name + "-a-" + i}
                    src={logo.src}
                    alt={logo.name}
                    referrerPolicy="no-referrer"
                    className="h-8 w-auto opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </motion.div>

              <motion.div
                animate={{ x: [-1000, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-16 items-center whitespace-nowrap"
              >
                {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={logo.name + "-b-" + i}
                    src={logo.src}
                    alt={logo.name}
                    referrerPolicy="no-referrer"
                    className="h-8 w-auto opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* decorative corner intersection dots */}
          <span style={intersectionDotShadow} className="hidden xl:block absolute -top-1 -left-1 w-2 h-2 bg-white rounded-[2px] z-40" />
          <span style={intersectionDotShadow} className="hidden xl:block absolute -top-1 -right-1 w-2 h-2 bg-white rounded-[2px] z-40" />
          <span style={intersectionDotShadow} className="hidden xl:block absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-[2px] z-40" />
          <span style={intersectionDotShadow} className="hidden xl:block absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-[2px] z-40" />
        </div>
        <div className="hidden xl:block h-[1px] bg-[#E3DDD9] w-[1376px]" />
      </div>

      {/* ---------- Video modal ---------- */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close video"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <video
                src="https://cdn.jiro.build/Landing%20Page/videos/Website%20header%20video%20(convert%20version).mp4"
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
