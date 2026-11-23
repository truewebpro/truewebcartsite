// src/app/site/SiteFooter.tsx
import Link from "next/link";
import { FOOTER_COLUMNS, SIGNUP_URL } from "./links";
import { SocialIcons } from "./icons";

/** Call to action strip, moving colour line, tips sign-up and link columns. No logo, no app badges. */
export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-[var(--h-body)] bg-[linear-gradient(180deg,var(--h-bg)_0%,var(--h-bg2)_50%,var(--h-bg3)_100%)]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="h-glow h-drift w-[520px] h-[520px] -left-20 top-32" style={{ background: "var(--h-glow-a)" }} />
        <div className="h-glow h-drift w-[480px] h-[480px] left-[40%] top-56" style={{ background: "var(--h-glow-b)", animationDelay: "-7s" }} />
        <div className="h-glow h-drift w-[520px] h-[520px] right-[-80px] top-32" style={{ background: "var(--h-glow-c)", animationDelay: "-13s" }} />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-[60px] pt-10 sm:pt-12">
        <div className="h-glass rounded-[28px] px-6 py-6 sm:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-[22px] sm:text-[28px] font-extrabold tracking-[-0.6px] text-[var(--h-text)]">
              Ready to open your online shop?
            </p>
            <p className="mt-1 text-[15px] text-[var(--h-muted)]">3 days free, no credit card required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a href={SIGNUP_URL} className="whitespace-nowrap px-7 py-3.5 rounded-full bg-cta text-white text-center font-extrabold hover:bg-[#c02503] transition-colors">
              Start Free Today
            </a>
            <Link href="/pricing" className="whitespace-nowrap px-7 py-3.5 rounded-full border-2 border-[var(--h-text)] text-[var(--h-text)] text-center font-extrabold">
              See pricing
            </Link>
          </div>
        </div>

        <div aria-hidden className="h-colour-line h-1 rounded mt-12" />

        <div className="mt-12 grid gap-10 xl:grid-cols-[380px_1fr] xl:gap-16 px-0 xl:px-[50px]">
          <div>
            <p className="text-[18px] font-extrabold text-[var(--h-text)]">Get tips and news</p>
            <p className="mt-1.5 mb-3.5 text-[15px] text-[var(--h-muted)]">Ideas to grow your online shop, once a month.</p>
            <form action="/contact" method="get" className="flex gap-2 max-w-[400px]">
              <input type="hidden" name="topic" value="newsletter" />
              <label htmlFor="footer-email" className="sr-only">Your email address</label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 px-4 py-3 rounded-full bg-[var(--h-input)] border-[1.5px] border-[var(--h-input-bd)] text-[15px] text-[var(--h-text)] placeholder:text-[var(--h-soft)]"
              />
              <button type="submit" className="px-5 py-3 rounded-full bg-cta text-white text-[14px] font-extrabold shrink-0">
                Sign up
              </button>
            </form>
            <div className="mt-6">
              <SocialIcons />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((c) => (
              <div key={c.title}>
                <p className="text-[15px] font-extrabold text-[var(--h-text)] mb-4">{c.title}</p>
                <ul className="grid gap-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[15px] text-[var(--h-muted)] hover:text-[var(--h-text)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 xl:mx-[50px] py-6 pb-[calc(24px+env(safe-area-inset-bottom))] border-t border-[var(--h-line)] flex flex-col sm:flex-row gap-3 sm:justify-between text-[14px] text-[var(--h-soft)]">
          <span>© {new Date().getFullYear()} TrueWeb Pro Ltd. All rights reserved.</span>
          <span className="flex gap-5">
            <Link href="/terms" className="hover:text-[var(--h-text)]">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--h-text)]">Privacy</Link>
            <Link href="/cookies" className="hover:text-[var(--h-text)]">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
