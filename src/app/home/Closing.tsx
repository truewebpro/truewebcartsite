// src/app/home/Closing.tsx
import { Check, Search } from "lucide-react";
import { Heading, Section, StartForm } from "./parts";

const RESULTS: [string, boolean][] = [[".com", false], [".co.uk", true], [".shop", true], [".store", true]];

export function Domains() {
  return (
    <Section id="domains">
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
  ["Can I move my online shop from Shopify?", "Yes. The Shopify import app brings your products and customers over in a few steps."],
  ["Is there a phone app?", "Yes. The TWCarts app for iPhone and Android lets you see orders, reply to customers and print labels on the go."],
  ["Can I cancel any time?", "Yes. There is no contract and no setup fee. Cancel from your account whenever you like."],
];

export function Faqs() {
  return (
    <section id="faqs" className="relative py-[56px] sm:py-[64px] lg:py-[72px] scroll-mt-20">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-6 lg:px-[60px]">
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] bg-[radial-gradient(80%_90%_at_50%_0%,#12306E_0%,#071633_55%,#040B1C_100%)] px-5 py-12 sm:px-12 sm:py-16 dark:ring-1 dark:ring-[rgba(160,190,255,0.22)]">
          <h2 className="text-center text-[30px] sm:text-[44px] font-extrabold tracking-[-1px] text-white">Frequently asked questions</h2>
          <div className="mt-8 sm:mt-10 mx-auto max-w-[820px] grid gap-3">
            {FAQS.map(([q, a], k) => (
              <details key={q} className="h-faq group rounded-[20px] bg-white/[0.06] border border-white/[0.12]" open={k === 0}>
                <summary className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <span className="flex-1 text-[16px] sm:text-[18px] font-bold text-white">{q}</span>
                  <span className="h-plus shrink-0 w-9 h-9 rounded-full bg-white text-[#081F45] inline-flex items-center justify-center text-[22px] font-bold leading-none" aria-hidden>+</span>
                </summary>
                <p className="px-5 pb-5 sm:px-6 text-[15px] sm:text-[16px] leading-relaxed text-[#C9D4EA]">{a}</p>
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
    <section className="relative py-[56px] sm:py-[64px] lg:py-[72px]">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-6 lg:px-[60px]">
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
