"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronDown, CheckCircle2 } from "lucide-react";
import LightBeamButton from "./LightBeamButton";
import { submitContact, type ContactState } from "./contact/actions";
import { SERVICES_SEED } from "@/lib/services-seed";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Who do you work with?",
    a: "Mostly small and growing businesses across the UK, from first-time online sellers to established companies that have outgrown their current website or software.",
  },
  {
    q: "How does a project start?",
    a: "You tell us what you're trying to achieve. We reply with a few clarifying questions, then a clear scope and a fixed quote, no surprises later.",
  },
  {
    q: "Do you only build new things?",
    a: "No. We also improve, migrate and rescue existing websites, stores and apps, and look after them once they're live.",
  },
  {
    q: "What happens after launch?",
    a: "You can look after the site yourself, or we can host and maintain it, updates, backups, monitoring and changes on request.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Usually, yes. We regularly integrate with Shopify, payment providers, shipping, email and accounting tools, and can build around your existing systems.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is scoped individually, so there's no standard price list. Send us the details and we'll come back with a fixed quote.",
  },
];

export interface ServiceOption {
  slug: string;
  title: string;
}

const DEFAULT_OPTIONS: ServiceOption[] = SERVICES_SEED.map((s) => ({ slug: s.slug, title: s.title }));

const INITIAL: ContactState = { status: "idle", message: "" };

const inputCls =
  "w-full bg-white border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#0D163F] transition-colors";

function FieldError({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="text-[12px] text-[#DF081A] mt-1">{text}</p>;
}

export default function ContactUs02Orbit({
  services = DEFAULT_OPTIONS,
  defaultService = "",
  bgClass = "bg-[#F4F3ED]/90",
}: {
  services?: ServiceOption[];
  defaultService?: string;
  bgClass?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));
  const errs = state.fieldErrors ?? {};

  return (
    <section
      id="contact"
      className={`${bgClass} py-16 sm:py-20 px-6 relative overflow-hidden`}
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
          {/* Left card, FAQ accordion */}
          <motion.div
            id="faq"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-28 bg-white rounded-[16px] p-10 border border-[#E4E4E5] shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col"
          >
            <div className="mb-10">
              <span className="text-[11px] text-[#777776] font-bold tracking-[0.2em] uppercase block mb-6">
                WHAT WE GET ASKED
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

          {/* Right card, Contact form (saves to Postgres via server action) */}
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

            {state.status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-6" role="status">
                <CheckCircle2 className="w-10 h-10 text-[#0D163F]" />
                <p className="text-[18px] font-medium text-[#131213]">{state.message}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-[14px] text-[#0D163F] underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={formAction} className="space-y-6" noValidate>
                {/* honeypot, hidden from people, tempting to bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {state.status === "error" && !state.fieldErrors && (
                  <p role="alert" className="text-[14px] text-[#DF081A] bg-[#DF081A]/5 rounded-[8px] px-4 py-3">
                    {state.message}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="cu-name" className="text-[11px] text-[#777776] font-bold uppercase block">
                      FULL NAME <span className="text-[#DF081A]">&#10033;</span>
                    </label>
                    <input id="cu-name" name="name" type="text" placeholder="John Smith" className={inputCls} />
                    <FieldError text={errs.name} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cu-email" className="text-[11px] text-[#777776] font-bold uppercase block">
                      EMAIL <span className="text-[#DF081A]">&#10033;</span>
                    </label>
                    <input
                      id="cu-email"
                      name="email"
                      type="email"
                      placeholder="john@yourbusiness.com"
                      className={inputCls}
                    />
                    <FieldError text={errs.email} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="cu-business" className="text-[11px] text-[#777776] font-bold uppercase block">
                      BUSINESS NAME
                    </label>
                    <input
                      id="cu-business"
                      name="business"
                      type="text"
                      placeholder="Your Business Ltd."
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <label htmlFor="cu-service" className="text-[11px] text-[#777776] font-bold uppercase block">
                      SERVICE INTERESTED IN <span className="text-[#DF081A]">&#10033;</span>
                    </label>
                    <select
                      id="cu-service"
                      name="service"
                      defaultValue={defaultService}
                      className={`${inputCls} appearance-none text-[#444444] cursor-pointer`}
                    >
                      <option value="">Select...</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-[42px] text-[#A8A9A8] pointer-events-none" />
                    <FieldError text={errs.service} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cu-message" className="text-[11px] text-[#777776] font-bold uppercase block">
                    TELL US ABOUT YOUR PROJECT <span className="text-[#DF081A]">&#10033;</span>
                  </label>
                  <textarea
                    id="cu-message"
                    name="message"
                    placeholder="Tell us what you're building..."
                    className={`${inputCls} min-h-[120px] resize-y`}
                  />
                  <FieldError text={errs.message} />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="cu-call"
                    name="wants_call"
                    className="w-4 h-4 rounded-[4px] border-[#E1E1E1] accent-[#0D163F] cursor-pointer"
                  />
                  <label htmlFor="cu-call" className="text-[13px] text-[#444444] cursor-pointer">
                    WOULD YOU LIKE A FREE CONSULTATION CALL?
                  </label>
                </div>

                <LightBeamButton type="submit" disabled={pending} className="w-full !py-4">
                  {pending ? "Sending..." : "Submit"}
                </LightBeamButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
