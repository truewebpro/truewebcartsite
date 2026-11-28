// src/app/partners/page.tsx
// "Become a partner": the TWCarts Partner Program (claude/partner-program-plan.md, mockup approved 28/11/2026).
import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, Percent, Users, Store, Send, BadgeCheck, Banknote } from "lucide-react";
import PageShell from "../PageShell";
import { Band, COLS, FaqPanel, GlassPage, Heading, Hero, Ico, Sec, Tick } from "../site/glass";
import ApplyForm from "./ApplyForm";
import EarnCalc from "./EarnCalc";

export const metadata: Metadata = {
  title: "Partner Program: earn with TWCarts",
  description:
    "For developers, freelancers and agencies. Recommend TWCarts, build online shops and websites for your clients, and earn 10% to 20% of what each store pays, every month it stays.",
};

const PARTNERS_LOGIN = "https://partners.truewebcart.com/login";

const WHY = [
  { icon: <Percent size={24} />, title: "Earn every month", text: "10% of every plan and app payment from the stores you bring, rising to 20% as you grow. Paid for as long as the store stays." },
  { icon: <Users size={24} />, title: "Send us leads", text: "Know a business that needs a shop but don't want to build it? Send them to us. You earn when their store goes live." },
  { icon: <Store size={24} />, title: "Build for your clients", text: "Build online shops and business websites on TWCarts. Your clients pay us for the plan, and you earn on every payment." },
];

const STEPS = [
  { title: "Apply", text: "Tell us about you and your work. We usually reply within one working day." },
  { title: "Share, send or build", text: "Share your link or code, send us a lead, or build a store for a client." },
  { title: "Get paid monthly", text: "When a store goes live, you earn on every payment. Payouts go out on the 1st of each month." },
];

const LEVELS = [
  { name: "Bronze", for: "When you join", rate: "10%", lines: ["Your referral link and code", "Send us leads", "Partner dashboard", "Earnings report and CSV export", "Paid monthly by Stripe or PayPal", "Demo shop and partner resources"] },
  { name: "Silver", for: "5 or more live stores", rate: "15%", lines: ["Everything in Bronze", "15% on every payment from all your stores", "Listed in the partner directory", "New rate from the next payment"] },
  { name: "Gold", for: "15 or more live stores", rate: "20%", lines: ["Everything in Silver", "20% on every payment from all your stores", "Featured first in the directory", "Priority leads"], best: true },
];
const TERMS = [
  { q: "What do I earn?", a: "A share of what each store you bring pays TWCarts for its plan and apps, without VAT: 10% at Bronze, 15% at Silver (5 or more live stores) and 20% at Gold (15 or more). Stores from leads you send earn 10%. You don't earn on the store's own sales." },
  { q: "For how long?", a: "Every month the store stays on TWCarts and stays linked to you. Your level goes up by itself as more of your stores go live." },
  { q: "How is a store linked to me?", a: "When the client signs up with your link (remembered for 90 days) or your partner code, or from a lead you sent. The first partner wins, and the link is fixed once the store makes its first payment." },
  { q: "When am I paid?", a: "Each payment waits 30 days, in case of a refund. Then it's paid on the 1st of the next month by Stripe to your bank or to your PayPal. Under £25 rolls over to the next month. We pay the fees." },
  { q: "What about refunds?", a: "If a store's payment is refunded or charged back, your share of it is taken back, from your next payout if it was already paid." },
  { q: "What can't I do?", a: "Refer your own business, use misleading ads or spam, or bid on TWCarts brand names in ads. We may close partner accounts that break these rules. Payouts follow the full partner terms, which you agree to when you apply." },
];

function HeroPicture() {
  return (
    <>
      <div className="gx-browser" aria-hidden>
        <div className="gx-top"><i /><i /><i /><span className="gx-url">partners.truewebcart.com</span></div>
        <div className="gx-sv">
          <div className="gx-pt-stats">
            <div><small>This month</small><b>£71.40</b></div>
            <div><small>Live stores</small><b>7</b></div>
            <div><small>Next payout</small><b>£64.20</b></div>
          </div>
          <div className="gx-pt-chart">
            <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden><path d="M0 80 L40 72 L80 74 L120 58 L160 52 L200 40 L240 30 L300 14" fill="none" stroke="#D92A04" strokeWidth="3" /></svg>
          </div>
        </div>
      </div>
      <div className="gx-float gx-a gx-lg gx-shine" aria-hidden>
        <div className="gx-row"><span className="gx-dot" style={{ background: "rgba(15,107,58,.14)", color: "#0F6B3A" }}><BadgeCheck size={16} /></span><div><b>Store went live</b>+£14.85 a month for you</div></div>
      </div>
      <div className="gx-float gx-b gx-lg gx-shine" aria-hidden>
        <div className="gx-row"><span className="gx-dot" style={{ background: "rgba(42,109,244,.14)", color: "#2A6DF4" }}><Banknote size={16} /></span><div><b>Payout sent</b>1st of the month, by PayPal</div></div>
      </div>
    </>
  );
}

export default function PartnersPage() {
  return (
    <PageShell>
      <GlassPage>
        <Hero panel visual={<HeroPicture />}>
          <span className="gx-pill"><Handshake size={14} strokeWidth={2.4} aria-hidden /> Partner Program</span>
          <h1 className="gx-h1">Build on TWCarts. Earn every month.</h1>
          <p className="gx-lead">For developers, freelancers and agencies. Recommend TWCarts, send us leads or build for your clients, and earn 10% to 20% of what each store pays, for as long as it stays.</p>
          <div className="gx-cta">
            <Link className="gx-btn gx-o" href="#apply">Apply to join</Link>
            <a className="gx-btn gx-g" href={PARTNERS_LOGIN}>Partner sign in</a>
          </div>
          <div className="gx-ticks">
            <span><b className="gx-ck">✓</b>Free to join</span>
            <span><b className="gx-ck">✓</b>Paid monthly by Stripe or PayPal</span>
            <span><b className="gx-ck">✓</b>Worldwide</span>
          </div>
        </Hero>

        <Sec tone="a">
          <Heading title="Why partners choose TWCarts" />
          <div className="gx-cards gx-c3">
            {WHY.map((w, i) => (
              <div key={w.title} className="gx-card gx-lg">
                <Ico color={COLS[i]}>{w.icon}</Ico>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </Sec>

        <Sec tone="b">
          <Heading title="How it works" />
          <ol className="gx-cards gx-c3 list-none p-0">
            {STEPS.map((s, i) => (
              <li key={s.title} className="gx-card gx-lg">
                <span className="gx-num" aria-hidden>{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </Sec>

        <Sec tone="a">
          <Heading title="Grow your level, grow your rate" sub="Your level goes up by itself as more of your stores go live." />
          <div className="gx-plans gx-levels">
            {LEVELS.map((l) => (
              <div key={l.name} className={`gx-plan gx-lg ${l.best ? "gx-pop" : ""}`}>
                {l.best && <span className="gx-badge gx-badge-best">Best rate</span>}
                <h3>{l.name}</h3>
                <p className="gx-for">{l.for}</p>
                <div className="gx-price">
                  <b>{l.rate}</b>
                  <span>of every payment</span>
                </div>
                <div className="gx-alt">Every month the store stays</div>
                <ul>
                  {l.lines.map((t, k) => (
                    <li key={t} className={k === 0 && t.startsWith("Everything") ? "gx-b" : ""}>
                      <Tick />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <Link className={`gx-plan-btn gx-btn ${l.best ? "gx-o" : "gx-g"}`} href="#apply">Apply to join</Link>
              </div>
            ))}
          </div>
        </Sec>

        <Sec tone="b">
          <EarnCalc />
        </Sec>

        <Sec tone="a">
          <Heading title="Paid your way" sub="Choose Stripe or PayPal in your dashboard. We pay the fees, so you get the full amount." />
          <div className="gx-cards gx-c2">
            <div className="gx-card gx-lg gx-payway"><span className="gx-paylogo" style={{ background: "#635BFF", color: "#fff" }}>stripe</span><div><h3>Straight to your bank</h3><p>Connect your bank with Stripe. Works in most countries.</p></div></div>
            <div className="gx-card gx-lg gx-payway"><span className="gx-paylogo" style={{ background: "#FFC43A", color: "#003087" }}>PayPal</span><div><h3>To your PayPal account</h3><p>Sign in with PayPal once. Payouts arrive on the 1st.</p></div></div>
          </div>
        </Sec>

        <Sec tone="b" id="apply">
          <div className="gx-split gx-split-contact">
            <div>
              <span className="gx-pill"><Send size={14} strokeWidth={2.4} aria-hidden /> Apply</span>
              <h2 className="gx-h2 !text-left !mt-4">Join the Partner Program</h2>
              <p className="gx-lead">It takes two minutes. We look at every application and reply by email, usually within one working day.</p>
              <div className="gx-ways">
                <div className="gx-way gx-lg"><Ico color="#0F6B3A"><Percent size={20} /></Ico><div><b>10% to 20% every month</b><small>On every plan and app payment from your stores</small></div></div>
                <div className="gx-way gx-lg"><Ico color="#2A6DF4"><Banknote size={20} /></Ico><div><b>Paid on the 1st</b><small>By Stripe to your bank, or to your PayPal</small></div></div>
                <div className="gx-way gx-lg"><Ico color="#D92A04"><Users size={20} /></Ico><div><b>Leads for you</b><small>Business owners who want an expert to build their shop</small></div></div>
              </div>
            </div>
            <ApplyForm />
          </div>
        </Sec>

        <Sec tone="a" id="terms">
          <FaqPanel name="partner-terms" title="Partner terms in short" sub="The key points of how the program works." items={TERMS} />
        </Sec>

        <Band
          title="Ready to earn with TWCarts?"
          accent="Free to join."
          text="Apply in two minutes. Already a partner? Sign in to your dashboard."
          primary={{ href: "#apply", label: "Apply to join" }}
          secondary={{ href: PARTNERS_LOGIN, label: "Partner sign in" }}
        />
      </GlassPage>
    </PageShell>
  );
}
