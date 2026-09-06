"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronDown } from "lucide-react";
import LightBeamButton from "./LightBeamButton";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Who do you work with?",
    a: "I primarily work with founders, executives, and business owners who are looking to scale their operations and refine their leadership approach.",
  },
  {
    q: "What results can I expect?",
    a: "Clients typically see improved decision-making speed, clearer strategic alignment, and measurable growth in their key performance indicators within the first 90 days.",
  },
  {
    q: "Do you only offer long-term consulting?",
    a: "While long-term partnerships yield the best results, I also offer intensive strategy sessions and project-based consulting for specific business challenges.",
  },
  {
    q: "How do we work together?",
    a: "We start with a deep-dive discovery call to identify your needs, followed by a tailored roadmap that includes regular strategy sessions and hands-on support.",
  },
  {
    q: "What makes your consulting different?",
    a: "My approach combines high-level strategic thinking with practical, operational experience, ensuring that advice is not just theoretical but actionable.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is based on the scope and complexity of the engagement. I offer several packages designed to provide maximum value at different stages of business growth.",
  },
];

export default function ContactUs02Orbit() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="contact"
      className="bg-[#F4F3ED]/90 py-6 px-6 relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-[1200px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Left card — FAQ accordion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[16px] p-10 border border-[#E4E4E5] shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col"
          >
            <div className="mb-10">
              <span className="text-[11px] text-[#777776] font-bold tracking-[0.2em] uppercase block mb-6">
                WHAT I GET ASKED
              </span>
              <h2
                className="text-[42px] font-semibold bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent leading-tight mb-6"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Your questions
                <br />
                Answered
              </h2>
              <p className="text-[#777776] text-[14px] leading-relaxed max-w-[320px]">
                Have a question before reaching out? Here are the answers to what we get asked most.
              </p>
            </div>

            <div className="space-y-3 mb-10">
              {FAQS.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={item.q}
                    onClick={() => toggle(i)}
                    className="bg-[#F9F8FB] hover:bg-[#F2F4F6] transition-all duration-300 rounded-[8px] overflow-hidden cursor-pointer group"
                  >
                    <div className="p-4 flex items-center gap-4">
                      <span className="shrink-0 text-[#0D163F]">
                        {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                      </span>
                      <span
                        className={
                          "text-[15px] font-medium " +
                          (isOpen ? "text-[#131213]" : "text-[#444444] group-hover:text-[#131213]")
                        }
                      >
                        {item.q}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="px-11 pb-4 text-[14px] text-[#777776] leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right card — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[16px] p-10 border border-[#E4E4E5] shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col"
          >
            <div className="mb-10">
              <span className="text-[11px] text-[#777776] font-bold tracking-[0.2em] uppercase block mb-6">
                REACH OUT TO US
              </span>
              <h2
                className="text-[42px] font-semibold bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent leading-tight mb-6"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Ready?
                <br />
                Let&apos;s connect
              </h2>
              <p className="text-[#777776] text-[14px] leading-relaxed">
                We&apos;d love to learn more about your business. Fill out the form and we&apos;ll reach out shortly.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] text-[#777776] font-bold uppercase block">
                    FULL NAME <span className="text-[#DF081A]">&#10033;</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full bg-white border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#0D163F] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-[#777776] font-bold uppercase block">
                    EMAIL <span className="text-[#DF081A]">&#10033;</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@yourbusiness.com"
                    className="w-full bg-white border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#0D163F] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] text-[#777776] font-bold uppercase block">BUSINESS NAME</label>
                  <input
                    type="text"
                    placeholder="Your Business Inc."
                    className="w-full bg-white border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#0D163F] transition-colors"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[11px] text-[#777776] font-bold uppercase block">
                    PACKAGE INTERESTED IN <span className="text-[#DF081A]">&#10033;</span>
                  </label>
                  <select
                    defaultValue=""
                    className="w-full appearance-none bg-white border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-[14px] text-[#A8A9A8] focus:outline-none focus:border-[#0D163F] transition-colors"
                  >
                    <option value="">Select...</option>
                    <option>Starter Setup</option>
                    <option>Growth Plan</option>
                    <option>Enterprise Solution</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-[42px] text-[#A8A9A8] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-[#777776] font-bold uppercase block">
                  TELL US ABOUT YOUR BUSINESS OR CHALLENGE <span className="text-[#DF081A]">&#10033;</span>
                </label>
                <textarea
                  placeholder="Tell us what you're building..."
                  className="w-full min-h-[120px] resize-y bg-white border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#0D163F] transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="consultation"
                  className="w-4 h-4 rounded-[4px] border-[#E1E1E1] text-[#0D163F] focus:ring-[#0D163F] cursor-pointer"
                />
                <label htmlFor="consultation" className="text-[13px] text-[#444444] cursor-pointer">
                  WOULD YOU LIKE TO BOOK A FREE CONSULTATION CALL?
                </label>
              </div>

              <LightBeamButton className="w-full !py-4">Submit</LightBeamButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
