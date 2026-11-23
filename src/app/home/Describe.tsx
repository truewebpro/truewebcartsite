// src/app/home/Describe.tsx
import { Sparkles } from "lucide-react";
import { SIGNUP_URL } from "../site/links";
import { Heading, Section } from "./parts";

const IDEAS = [
  "A candle shop with gifts and home scents",
  "Handmade jewellery, rings and earrings",
  "A coffee roastery that ships fresh beans",
  "A kids clothing brand with organic cotton",
];
const CHIPS = ["Candle shop", "Clothing brand", "Coffee roastery", "Bakery", "Jewellery", "Pet shop"];

export default function Describe() {
  return (
    <Section>
      <Heading
        title="Describe your online shop. We set it up in minutes."
        sub="Write one line about what you sell. We pick a template, write your first product text and get your online shop ready for you to edit."
      />
      <form action={SIGNUP_URL} method="get" className="h-glass mt-10 mx-auto max-w-[820px] rounded-[28px] p-3 sm:p-4">
        <div className="relative flex items-start gap-3 rounded-[20px] bg-[var(--h-input)] border border-[var(--h-input-bd)] p-4 sm:p-5 min-h-[120px]">
          <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-[#D92A04]" aria-hidden />
          <label htmlFor="describe-shop" className="sr-only">What do you sell?</label>
          <textarea
            id="describe-shop"
            name="idea"
            rows={2}
            placeholder=" "
            className="peer w-full resize-none bg-transparent outline-none text-[17px] text-[var(--h-text)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-[52px] sm:left-[56px] right-4 top-4 sm:top-5 h-[26px] overflow-hidden text-[17px] text-[var(--h-soft)] peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden"
          >
            <span className="block h-rotate4">
              {IDEAS.map((i) => (
                <span key={i} className="block h-[26px] leading-[26px] truncate">{i}</span>
              ))}
            </span>
          </span>
        </div>
        <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex gap-2 overflow-x-auto h-noscroll -mx-1 px-1 md:flex-wrap md:overflow-visible">
            {CHIPS.map((c) => (
              <span key={c} className="shrink-0 px-3.5 py-2 rounded-full text-[14px] font-bold bg-[var(--h-chip)] border border-[var(--h-card-bd)] text-[var(--h-text)]">
                {c}
              </span>
            ))}
          </div>
          <button type="submit" className="md:ml-auto shrink-0 px-6 py-3.5 rounded-full bg-cta text-white font-extrabold hover:bg-[#c02503] transition-colors">
            Build my online shop
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-[13px] text-[var(--h-soft)]">AI can make mistakes. Check everything before your online shop goes live.</p>
    </Section>
  );
}
