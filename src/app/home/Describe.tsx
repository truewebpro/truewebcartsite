// src/app/home/Describe.tsx
// Phones, tablets and small laptops. Desktop uses home/desktop/Describe.tsx (the mockup itself).
import { SIGNUP_URL } from "../site/links";
import { Heading } from "./parts";
import SectionBg from "./SectionBg";

const IDEAS = [
  "A candle shop with gifts and home scents",
  "Handmade jewellery, rings and earrings",
  "A coffee roastery that ships fresh beans",
  "A kids clothing brand with organic cotton",
];
const CHIPS = ["Candle shop", "Clothing brand", "Coffee roastery", "Bakery", "Jewellery", "Pet shop"];
const SPARK = "M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7L12 2Zm7 12 1 2.6 2.6 1-2.6 1L19 21.2l-1-2.6-2.6-1 2.6-1L19 14Z";

export default function Describe() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 bg-[linear-gradient(180deg,#DCE6F7_0%,#FFFFFF_45%,#F3F6FC_100%)] dark:bg-[linear-gradient(180deg,#0B2350_0%,#071633_100%)]">
      <SectionBg />
      <div aria-hidden className="s4-sky dark:[background:linear-gradient(180deg,rgba(40,90,180,0),rgba(40,90,180,0.35))]" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Heading
          title="Describe your online shop. We set it up in minutes."
          sub="Write one line about what you sell. We pick a template, write your first product text and get your online shop ready for you to edit."
        />
        <div className="relative mt-10 sm:mt-12 mx-auto max-w-[860px] p-2.5 rounded-[26px] bg-white/55 backdrop-blur-[16px] border border-white/85 shadow-[0_30px_70px_rgba(11,47,102,0.16)] dark:bg-white/10 dark:border-white/[0.22]">
          <div className="relative min-h-[150px] rounded-[18px] bg-white border border-[#E6E9F0] p-5 sm:p-6 pb-[84px] sm:pb-6">
            <p className="sr-only">For example: {IDEAS.join(", ")}.</p>
            <div aria-hidden className="relative h-[52px] sm:h-[30px]">
              {IDEAS.map((t, k) => (
                <span key={t} className={`h-type h-type${k} absolute left-0 top-0 text-[16px] sm:text-[20px] leading-[26px] text-[#1C1E27]`}>
                  {t}
                  <span className="s4-caret ml-0.5" />
                </span>
              ))}
            </div>
            <a
              href={SIGNUP_URL}
              className="s4-go absolute left-3.5 right-3.5 bottom-3.5 sm:left-auto sm:right-3.5 inline-flex items-center justify-center gap-2.5 px-[26px] py-3.5 rounded-full bg-[#D92A04] text-white text-[17px] font-extrabold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden><path d={SPARK} /></svg>
              Build my online shop
            </a>
          </div>
        </div>
        <p className="relative mt-4 text-center text-[13px] text-[#5A6275] dark:text-[#9AA6BF]">AI can make mistakes. Check everything before your online shop goes live.</p>
        <ul className="relative mt-6 flex flex-wrap justify-center gap-2.5">
          {CHIPS.map((c) => (
            <li key={c} className="px-[18px] py-2.5 rounded-full bg-white/75 border border-[#DDE3EE] text-[15px] font-bold text-[#081F45] dark:bg-white/[0.08] dark:border-white/[0.22] dark:text-white">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
