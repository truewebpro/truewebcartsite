"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  metric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Reyes",
    role: "VP of Sales Operations",
    company: "Corporate Hub",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    quote:
      "We used to spend two full days every month reconciling rep payouts by hand. CommissionCalc collapsed that into a single afternoon, and disputes practically disappeared.",
    rating: 5,
    metric: "-90% Disputes",
  },
  {
    id: 2,
    name: "Priya Nathan",
    role: "Head of Revenue",
    company: "Northbridge Finance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    quote:
      "Modeling tiered accelerators used to live in a fragile spreadsheet only one person understood. Now the whole team trusts the numbers.",
    rating: 5,
    metric: "10x Scale",
  },
  {
    id: 3,
    name: "Daniel Okafor",
    role: "Commissions Manager",
    company: "Vantage Partners",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    quote:
      "Reps can see their own payout in real time instead of waiting on finance. It's changed how much they trust the comp plan.",
    rating: 5,
    metric: "+42% Payout Speed",
  },
  {
    id: 4,
    name: "Laura Bianchi",
    role: "Director of Finance",
    company: "Kestrel Capital",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    quote:
      "Switching from manual calculations saved us real money in overpayment errors within the first quarter alone.",
    rating: 5,
    metric: "$2M Saved",
  },
];

export default function TestimonialCommission() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const spotlight = TESTIMONIALS[activeIndex];
  const supporting = [
    TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(activeIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-6 font-['Kodchasan',sans-serif]"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        #testimonials .bg-ribbed {
          background-color: rgba(244, 243, 237, 0.9);
          background-image: repeating-linear-gradient(
            to right,
            rgba(245, 243, 236, 0) 0px,
            rgba(245, 243, 236, 0) 64px,
            rgba(0, 0, 0, 0.028) 64px,
            rgba(0, 0, 0, 0.028) 65px,
            rgba(255, 255, 255, 0.4) 65px,
            rgba(255, 255, 255, 0.4) 66px
          );
        }
      `}</style>
      <div className="bg-ribbed absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-[60px]"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8FE3A] opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4ed17] border border-black/15" />
            </span>
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-tight text-neutral-800">
              Real Customer Proof
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-normal bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent tracking-tight leading-[1.08] mb-5">
            What Our Users Say
          </h2>

          <p className="text-[16px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-xl mx-auto">
            Over 10,000 sales professionals and compensation managers rely on CommissionCalc every day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
        >
          {/* Left spotlight card */}
          <div className="lg:col-span-7 group relative bg-white rounded-[32px] border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.07)] hover:border-neutral-300/90 transition-all min-h-[440px] lg:min-h-[480px] overflow-hidden flex flex-col">
            <div className="pointer-events-none absolute -top-8 -right-8 w-44 h-44 rounded-full bg-[#E8FE3A]/10 blur-[60px]" />

            <div className="relative p-8 sm:p-10 flex flex-col flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col flex-1"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {Array.from({ length: spotlight.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[12px] font-semibold text-neutral-500">Verified Partner</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-emerald-800 font-bold text-[12px]">{spotlight.metric}</span>
                    </div>
                  </div>

                  <p className="text-[20px] sm:text-[22px] md:text-[24px] text-neutral-900 leading-[1.4] font-medium tracking-tight flex-1">
                    &ldquo;{spotlight.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-neutral-100 pt-8 mt-8">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={spotlight.avatar}
                        alt={spotlight.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-neutral-100 shadow-md transition-transform group-hover:scale-105"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-base text-neutral-900">{spotlight.name}</span>
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-[12px] sm:text-[14px] text-neutral-500">{spotlight.role}</p>
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-xl px-4 py-2 text-right">
                      <p className="text-[12px] font-bold uppercase text-neutral-500">Corporate Hub</p>
                      <p className="text-[12px] sm:text-[13px] font-semibold text-neutral-800">{spotlight.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right supporting stack */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            <AnimatePresence mode="popLayout">
              {supporting.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
                  className="group bg-white rounded-[24px] p-6 sm:p-7 border border-neutral-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.05)] transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold bg-neutral-100/80 px-2.5 py-1 rounded-full text-neutral-700">
                      {item.metric}
                    </span>
                  </div>

                  <p className="text-[14px] sm:text-[15px] text-neutral-700 leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[12px] sm:text-[14px] text-neutral-900">{item.name}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <p className="text-[11px] text-neutral-500">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-400">{item.company}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
