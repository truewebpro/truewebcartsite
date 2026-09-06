"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import LightBeamButton from "./LightBeamButton";

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  cta: string;
  href: string;
  features: Feature[];
}

const FEATURES: Feature[] = [
  { text: "Full access to online fitness", included: true },
  { text: "Guided mindfulness practices", included: true },
  { text: "Structured weekly program", included: true },
  { text: "Community access", included: true },
  { text: "Progress tracking", included: false },
];

const PLANS: Plan[] = [
  {
    id: 1,
    title: "Online Transformation",
    subtitle: "Perfect to start your transformation",
    price: "$49",
    cta: "Get Started Today",
    href: "#contact",
    features: FEATURES,
  },
  {
    id: 2,
    title: "Community Plan",
    subtitle: "Perfect for support and motivation.",
    price: "$79",
    cta: "Join Community",
    href: "#login",
    features: FEATURES,
  },
  {
    id: 3,
    title: "1:1 Personal Coaching",
    subtitle: "Perfect for committed goal achievers",
    price: "$149",
    cta: "Get Started Today",
    href: "#contact",
    features: FEATURES,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Pricing05Solra() {
  const [activeCardId, setActiveCardId] = useState(2);

  return (
    <section
      id="pricing"
      className="w-full flex items-center justify-center bg-[#F4F3ED]/90 py-6 px-4 md:px-[135px] overflow-hidden"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <motion.div
        id="pricing-05-container"
        className="w-full max-w-[1440px] flex flex-col items-center gap-[80px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div id="pricing-05-header" variants={itemVariants} className="flex flex-col items-center gap-4 max-w-[720px]">
          <h2
            id="pricing-05-heading"
            className="bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent text-[48px] font-bold leading-[120%] text-center tracking-[-0.3px]"
            style={{ fontFamily: '"Crimson Pro", serif' }}
          >
            Commit to Your Mind
            <br />
            and Body Growth
          </h2>
          <p id="pricing-05-subheading" className="text-[#0D163F] text-[18px] leading-[28px] opacity-80 text-center font-normal font-sans">
            Transparent pricing with no hidden fees and full support.
          </p>
        </motion.div>

        <div
          id="pricing-05-cards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1170px]"
          onMouseLeave={() => setActiveCardId(2)}
        >
          {PLANS.map((plan) => {
            const isActive = activeCardId === plan.id;
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                onMouseEnter={() => setActiveCardId(plan.id)}
                whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className={
                  "flex flex-col justify-between p-8 rounded-[24px] transition-all duration-500 ease-in-out border " +
                  (isActive ? "bg-[#0D163F] text-white border-transparent" : "bg-white text-[#0D163F] border-[#E4E6EB]")
                }
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-[22px] font-semibold" style={{ fontFamily: '"Crimson Pro", serif' }}>
                    {plan.title}
                  </h3>
                  <p className="text-[16px] opacity-80 font-sans">{plan.subtitle}</p>
                </div>

                <div className={"h-[1px] w-full transition-colors duration-500 my-6 " + (isActive ? "bg-white/10" : "bg-black/10")} />

                <div className="flex flex-col gap-3">
                  <h4 className="text-[16px] font-semibold font-sans">Included:</h4>
                  <ul className="flex flex-col gap-4">
                    {plan.features.map((feature) =>
                      feature.included ? (
                        <li key={feature.text} className="flex items-center gap-3">
                          <CheckCircle2
                            size={20}
                            className={"transition-colors duration-500 " + (isActive ? "text-[#DF081A]" : "text-[#0D163F]")}
                          />
                          <span className="text-[16px] font-sans opacity-100">{feature.text}</span>
                        </li>
                      ) : (
                        <li key={feature.text} className="flex items-center gap-3">
                          <XCircle size={20} className="opacity-40" />
                          <span className="text-[16px] font-sans opacity-40">{feature.text}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[14px] opacity-60 font-sans">Start from</span>
                    <span className="text-[36px] font-semibold" style={{ fontFamily: '"Crimson Pro", serif' }}>
                      {plan.price}
                    </span>
                    <span className="text-[14px] opacity-60 font-sans">/month</span>
                  </div>

                  <LightBeamButton className="w-full !py-[14px]">{plan.cta}</LightBeamButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
