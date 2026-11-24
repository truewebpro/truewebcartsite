// src/app/home/Closing.tsx
import { Check, Search } from "lucide-react";
import { Heading, Section, StartForm } from "./parts";
import SectionBg from "./SectionBg";

const RESULTS: [string, boolean][] = [[".com", false], [".co.uk", true], [".shop", true], [".store", true]];

export function Domains() {
  return (
    <Section id="domains" className="bg-[linear-gradient(180deg,#DCE6F7_0%,#F3F6FC_40%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#0B2350_0%,#071633_100%)]">
      <Heading title="Get the perfect domain for your online shop" sub="Search for a new name or connect one you already own. We set it up and keep it secure." />
      <div className="h-glass mt-10 mx-auto max-w-[760px] rounded-[28px] p-4 sm:p-6">
        <form action="/contact" method="get" className="flex flex-col sm:flex-row gap-2.5">
          <input type="hidden" name="topic" value="domain" />
          <label htmlFor="domain-name" className="sr-only">Domain name</label>
          <div className="flex-1 flex items-center gap-2 px-4 h-[54px] rounded-full bg-[var(--h-input)] border-[1.5px] border-[var(--h-input-bd)]">
            <Search className="w-5 h-5 text-[var(--h-soft)]" aria-hidden />
            <input id="domain-name" name="domain" placeholder="yourshopname" autoCapitalize="none" autoCorrect="off" spellCheck={false} className="min-w-0 flex-1 bg-transparent outline-none text-[16px] text-[var(--h-text)] placeholder:text-[var(--h-soft)]" />
          </div>
          <button type="submit" className="h-[54px] px-7 rounded-full bg-cta text-white font-extrabold hover:bg-[#c02503] transition-colors">Search</button>
        </form>
        <p className="mt-5 text-[13px] font-bold text-[var(--h-soft)]">Example search</p>
        <ul className="mt-2 grid gap-2">
          {RESULTS.map(([tld, free]) => (
            <li key={tld} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-2xl bg-[var(--h-chip)] border border-[var(--h-card-bd)]">
              <span className="min-w-0 text-[14px] sm:text-[15px] text-[var(--h-text)] truncate"><b>bloomandco</b>{tld}</span>
              {free ? (
                <>
                  <span className="ml-auto shrink-0 inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-bold text-[#0F8A55] dark:text-[#3DDC91]"><Check className="w-4 h-4" strokeWidth={3} aria-hidden />Available</span>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-[#081F45] text-white text-[12px] font-bold dark:bg-white dark:text-[#081F45]">Add</span>
                </>
              ) : (
                <span className="ml-auto shrink-0 text-[12px] sm:text-[13px] font-bold text-[var(--h-soft)]">Taken</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[14px] text-[var(--h-muted)]">
          <b className="text-[var(--h-text)]">Already have a domain?</b> Connect it in a few steps.
        </p>
      </div>
    </Section>
  );
}

const FAQS = [
  ["How does the 3 day free trial work?", "Sign up with your email, build your online shop and add your products. After 3 days, pick a plan to keep selling. Everything you made stays saved."],
  ["Do I need a credit card to start?", "No. You only add payment details when you choose a plan."],
  ["Can I sell to customers anywhere?", "Yes. Customers anywhere can visit your online shop and buy. You choose which countries you deliver to."],
  ["Can I use my own domain?", "Yes. Every plan includes a custom domain, so your online shop can live at your own address."],
  ["Can I move my online shop from Shopify?", "Yes. We move your products and customers from Shopify for you."],
  ["Is there a phone app?", "Yes. The TWCarts app for iPhone and Android lets you see orders, reply to customers and print labels on the go."],
  ["Can I cancel any time?", "Yes. There is no contract and no setup fee. Cancel from your account whenever you like."],
];

export function Faqs() {
  return (
    <section id="faqs" className="relative overflow-hidden scroll-mt-16 py-[40px] sm:py-[50px] bg-[linear-gradient(180deg,#F7E3F2_0%,#F3F6FC_45%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#1E2257_0%,#0A1638_45%,#050F24_100%)]">
      <SectionBg />
      <div className="relative mx-auto max-w-[1440px] px-3 sm:px-6 xl:px-[60px]">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[44px] dark:shadow-[0_0_0_1px_rgba(160,190,255,0.22)]">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,#1D3F8F_0%,#0A2857_45%,#050F24_100%)]" />
          <div aria-hidden className="s12b absolute -right-20 -top-[120px] w-[460px] h-[460px] rounded-full bg-[#D92A04] opacity-[0.18] blur-[110px]" />
          <div className="relative px-5 pt-12 pb-10 sm:px-12 sm:pt-16 lg:px-[110px] xl:px-[170px] xl:pt-20 xl:pb-[60px]">
            <h2 className="mb-4 sm:mb-6 text-[34px] sm:text-[48px] xl:text-[64px] font-extrabold tracking-[-2px] leading-[1.05] text-white">Frequently asked questions</h2>
            {FAQS.map(([q, a], k) => (
              <details key={q} name="faq" className="h-faq border-b border-white/[0.14] py-4 sm:py-[22px]" open={k === 0}>
                <summary className="flex items-center justify-between gap-5">
                  <span className="text-[17px] sm:text-[21px] xl:text-[25px] font-bold text-white">{q}</span>
                  <span className="h-plus shrink-0 inline-flex w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white items-center justify-center" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#081F45" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-[820px] text-[15px] sm:text-[18px] leading-[1.55] text-[#C9D4EA]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TICKS = ["3 days free", "No credit card needed", "Apps built in", "iPhone and Android app", "Payments built in", "Delivery labels", "24/7 support team", "Cancel any time"];

export function SignupBand() {
  return (
    <section className="relative overflow-hidden py-[56px] sm:py-[64px] lg:py-[72px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FC_50%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#050F24_0%,#071633_50%,#050F24_100%)]">
      <SectionBg />
      <div className="relative mx-auto max-w-[1320px] px-3 sm:px-6 lg:px-[60px]">
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] bg-[radial-gradient(80%_90%_at_50%_0%,#12306E_0%,#071633_55%,#040B1C_100%)] pt-14 sm:pt-20 pb-8 dark:ring-1 dark:ring-[rgba(160,190,255,0.22)]">
          <div aria-hidden className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(160,190,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(160,190,255,0.12)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000,transparent)]" />
          <div className="relative px-5 text-center">
            <h2 className="font-extrabold tracking-[-0.04em] leading-[1.04] text-[34px] sm:text-[52px] lg:text-[64px] text-balance">
              <span className="block text-white">Start your online shop today.</span>
              <span className="block text-[#FF7A52]">Pay nothing for 3 days.</span>
            </h2>
            <div className="mt-10 sm:mt-12">
              <StartForm id="band-email" dark />
            </div>
            <p className="mt-4 text-[15px] font-bold text-[#C9D4EA]">No credit card required.</p>
          </div>
          <div className="relative mt-10 h-marquee-wrap h-fade-edges overflow-hidden">
            <ul className="h-marquee gap-3" style={{ animationDuration: "35s" }}>
              {[...TICKS, ...TICKS].map((t, k) => (
                <li key={k} aria-hidden={k >= TICKS.length} className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-[14px] font-bold whitespace-nowrap">
                  <Check className="w-4 h-4 text-[#3DDC91]" strokeWidth={3} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
