// src/app/online-shop/page.tsx
// Ecommerce Website page, built from the approved liquid glass mockup.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Box, CreditCard, Truck, ListChecks, Heart, Building2, MessageSquare, Brush, Search, BarChart3, ShoppingCart, Check, ChevronDown } from "lucide-react";
import PageShell from "../PageShell";
import { SHOP_FEATURES } from "@/lib/features";
import { SIGNUP_URL } from "../site/links";
import { Band, COLS, GlassPage, Hero, Ico, Sec, Tick } from "../site/glass";
import ScrollTabs from "../site/ScrollTabs";

export const metadata: Metadata = {
  title: "Ecommerce Website features",
  description:
    "Products, checkout and payments, delivery, orders, loyalty, trade accounts and sales reps, an AI shop assistant and more, all in one admin.",
};

const ICON: Record<string, ReactNode> = {
  catalogue: <Box size={24} />,
  checkout: <CreditCard size={24} />,
  delivery: <Truck size={24} />,
  orders: <ListChecks size={24} />,
  customers: <Heart size={24} />,
  b2b: <Building2 size={24} />,
  ai: <MessageSquare size={24} />,
  design: <Brush size={24} />,
  marketing: <Search size={24} />,
  admin: <BarChart3 size={24} />,
};

const TAB: Record<string, string> = {
  catalogue: "Products",
  checkout: "Checkout",
  delivery: "Delivery",
  orders: "Orders",
  customers: "Customers",
  b2b: "Trade and reps",
  ai: "AI assistant",
  design: "Shop design",
  marketing: "Marketing",
  admin: "Admin and app",
};

const green = { color: "var(--gx-green)" };
const Row = ({ children }: { children: ReactNode }) => <div className="gx-mrow">{children}</div>;

/** The small live example next to each feature group. */
const MINI: Record<string, ReactNode> = {
  catalogue: (
    <>
      <h3 className="gx-mini-h">Amber candle</h3>
      <div className="flex gap-3.5 items-center">
        <Image src="/home/photos/amber.webp" alt="" width={96} height={96} className="w-24 h-24 rounded-[14px] object-cover" />
        <div>
          <div className="text-[24px] font-extrabold text-[var(--gx-text)]">£22.00</div>
          <small className="text-[var(--gx-muted)]">In stock: 48</small>
        </div>
      </div>
      <div className="mt-3.5 text-[12px] font-bold text-[var(--gx-muted)]">Size</div>
      <div className="gx-sw">
        <span>Small</span>
        <span className="gx-on">Medium</span>
        <span>Large</span>
      </div>
      <Row>
        <span>Buy 3 or more</span>
        <b style={green}>£19.00 each</b>
      </Row>
    </>
  ),
  checkout: (
    <>
      <h3 className="gx-mini-h">Checkout</h3>
      <Row><span>Amber candle x 2</span><b>£44.00</b></Row>
      <Row><span>Delivery</span><b>Free</b></Row>
      <Row><span>Discount WELCOME10</span><b style={green}>-£4.40</b></Row>
      <div className="flex gap-2 mt-3">
        {["Card", "PayPal", "Pay later"].map((x) => (
          <span key={x} className="gx-mrow flex-1 justify-center !m-0">{x}</span>
        ))}
      </div>
      <span className="gx-btn gx-o w-full mt-3">Pay £39.60</span>
    </>
  ),
  delivery: (
    <>
      <h3 className="gx-mini-h">Order #1043, Sophie M.</h3>
      <div className="border-2 border-dashed border-[var(--gx-card-b)] rounded-[14px] p-3.5 text-[12.5px] text-[var(--gx-text)]">
        <b>Shipping label</b>
        <br />Sophie M.<br />12 Elm Road, Leeds
        <svg width="100%" height="34" viewBox="0 0 200 34" preserveAspectRatio="none" aria-hidden>
          <g fill="currentColor">{Array.from({ length: 44 }, (_, i) => <rect key={i} x={i * 4.5} y="0" width={i % 3 ? 2 : 3} height="34" />)}</g>
        </svg>
      </div>
      <Row><span>Tracking</span><b style={green}>Out for delivery</b></Row>
    </>
  ),
  orders: (
    <>
      <h3 className="gx-mini-h">Order #1043</h3>
      <div className="gx-stages">
        <span className="gx-done">Paid</span><span className="gx-done">Picked</span><span className="gx-now">Packing</span><span>Shipped</span><span>Delivered</span>
      </div>
      <div className="mt-3.5" />
      <Row><span>Amber candle</span><small>x 1</small></Row>
      <Row><span>Gift bag</span><small>x 1</small></Row>
      <div className="flex gap-2 mt-3">
        <span className="gx-btn gx-l gx-sm">Print slip</span>
        <span className="gx-btn gx-o gx-sm">Mark as packed</span>
      </div>
    </>
  ),
  customers: (
    <>
      <h3 className="gx-mini-h">Sophie&apos;s rewards</h3>
      <div className="gx-pts">720 <span className="text-[15px] text-[var(--gx-muted)] font-bold">points</span></div>
      <div className="gx-barr"><i /></div>
      <small className="block mt-2 text-[var(--gx-muted)]">280 points to a £10 reward</small>
      <div className="mt-3.5" />
      <Row>
        <span>
          <span className="gx-stars">★★★★★</span>
          <br />
          <small>&quot;Smells amazing, lasts for ages.&quot;</small>
        </span>
      </Row>
    </>
  ),
  b2b: (
    <>
      <h3 className="gx-mini-h">Trade prices, Harbour Gifts Ltd</h3>
      <table className="gx-tp">
        <thead><tr><th>Product</th><th>Retail</th><th>Their price</th></tr></thead>
        <tbody>
          <tr><td>Amber candle</td><td>£22</td><td className="gx-p">£13.20</td></tr>
          <tr><td>Room spray</td><td>£16</td><td className="gx-p">£9.60</td></tr>
          <tr><td>Stone mug</td><td>£14</td><td className="gx-p">£8.40</td></tr>
        </tbody>
      </table>
      <Row><span>Credit limit</span><b>£2,000</b></Row>
    </>
  ),
  ai: (
    <>
      <h3 className="gx-mini-h">Shop assistant</h3>
      <div className="gx-bub gx-me">Do you have a gift under £30?</div>
      <div className="gx-bub gx-ai">Yes! The Amber candle and Gift bag come to £28. Shall I add them to your cart?</div>
      <div className="gx-bub gx-me">Yes please</div>
      <div className="mt-3" />
      <Row><small>Added 2 items to cart</small><b style={green}>✓</b></Row>
    </>
  ),
  design: (
    <>
      <h3 className="gx-mini-h">Home page sections</h3>
      <Row><span>Banner</span><small>Drag</small></Row>
      <Row><span>Product grid</span><small>Drag</small></Row>
      <div className="gx-mrow outline-2 outline outline-[var(--gx-green)]"><span>Reviews</span><b className="text-[12px]" style={green}>Added</b></div>
      <Row><span>Newsletter</span><small>Drag</small></Row>
      <div className="flex gap-2 mt-3" aria-hidden>
        {["#1F5B3A", "#D92A04", "#0B2F66"].map((c, i) => (
          <span key={c} className={`w-7 h-7 rounded-full ${i === 2 ? "ring-2 ring-[var(--gx-text)] ring-offset-2 ring-offset-transparent" : ""}`} style={{ background: c }} />
        ))}
      </div>
    </>
  ),
  marketing: (
    <>
      <h3 className="gx-mini-h">On Google</h3>
      <div className="gx-serp">
        <div className="gx-u">bloomandco.com › candles</div>
        <div className="gx-t">Hand-poured candles | Bloom &amp; Co</div>
        <div className="gx-d">Soy candles and home scents, made in small batches. Free delivery over £40.</div>
        <div className="gx-stars mt-1.5">★★★★★ <span className="text-[var(--gx-muted)]">4.9 (212)</span></div>
      </div>
      <Row><span>Code SUMMER20</span><b style={green}>Used 64 times</b></Row>
    </>
  ),
  admin: (
    <>
      <h3 className="gx-mini-h">Sales today</h3>
      <div className="gx-pts">£842 <span className="text-[13px] font-extrabold" style={green}>+12%</span></div>
      <svg className="gx-spark" viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="gx-sg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2A6DF4" stopOpacity=".35" /><stop offset="1" stopColor="#2A6DF4" stopOpacity="0" /></linearGradient>
        </defs>
        <path d="M0 90 L30 80 L60 84 L90 60 L120 66 L150 40 L180 50 L210 30 L240 38 L270 18 L300 24 L300 110 L0 110Z" fill="url(#gx-sg)" />
        <path d="M0 90 L30 80 L60 84 L90 60 L120 66 L150 40 L180 50 L210 30 L240 38 L270 18 L300 24" fill="none" stroke="#2A6DF4" strokeWidth="3" />
      </svg>
    </>
  ),
};

const WORKS = [
  { name: "Stripe" }, { name: "PayPal" }, { name: "Worldpay" }, { name: "Viva Wallet" },
  { name: "Sendcloud", logo: "sendcloud" }, { name: "Google", logo: "google" }, { name: "Klaviyo", logo: "klaviyo" },
  { name: "Mailchimp", logo: "mailchimp" }, { name: "Trustpilot", logo: "trustpilot" },
];

function HeroShop() {
  return (
    <>
      <div className="gx-browser" aria-hidden>
        <div className="gx-top"><i /><i /><i /><span className="gx-url">bloomandco.twcarts.com</span></div>
        <div className="gx-shopnav"><b>Bloom &amp; Co</b><span>New in &nbsp; Gifts &nbsp; <span className="gx-cart">Cart (2)</span></span></div>
        <div className="gx-shophero">
          <Image src="/home/photos/banner.webp" alt="" width={300} height={120} />
          <div>
            <h4>Bloom &amp; Co</h4>
            <p>Hand-poured candles and home scents.</p>
            <span className="gx-sb">Shop all</span>
          </div>
        </div>
        <div className="gx-prods">
          {[["amber", "Amber candle", "£22"], ["spray", "Room spray", "£16"], ["mug", "Stone mug", "£14"], ["bag", "Gift bag", "£6"]].map(([f, n, p]) => (
            <div key={f}>
              <Image src={`/home/photos/${f}.webp`} alt="" width={120} height={120} />
              {n}
              <small>{p}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="gx-float gx-a gx-lg gx-shine" aria-hidden>
        <div className="gx-row"><span className="gx-dot" style={{ background: "rgba(15,107,58,.14)", color: "#0F6B3A" }}><Check size={16} /></span><div><b>New order #1043</b>£38.00 paid by card</div></div>
      </div>
      <div className="gx-float gx-b gx-lg gx-shine" aria-hidden>
        <div className="gx-row"><span className="gx-dot" style={{ background: "rgba(42,109,244,.14)", color: "#2A6DF4" }}><Box size={16} /></span><div><b>Label printed</b>Out for delivery tomorrow</div></div>
      </div>
    </>
  );
}

export default function OnlineShopPage() {
  return (
    <PageShell>
      <GlassPage>
        <Hero panel visual={<HeroShop />}>
          <span className="gx-pill"><ShoppingCart size={14} strokeWidth={2.4} aria-hidden /> Ecommerce Website</span>
          <h1 className="gx-h1">Everything you need to sell online.</h1>
          <p className="gx-lead">Your own fast online shop on your own domain, with cart, payments, delivery labels and an AI assistant. All run from one admin.</p>
          <div className="gx-cta">
            <Link className="gx-btn gx-o" href={SIGNUP_URL}>Start 3 days free</Link>
            <Link className="gx-btn gx-g" href="/pricing?kind=shop">See pricing</Link>
          </div>
          <div className="gx-ticks">
            <span><b className="gx-ck">✓</b>No credit card required</span>
            <span><b className="gx-ck">✓</b>Sell worldwide</span>
            <span><b className="gx-ck">✓</b>Import from Shopify</span>
          </div>
        </Hero>

        <ScrollTabs label="Feature groups" tabs={SHOP_FEATURES.map((g) => ({ id: g.id, label: TAB[g.id] ?? g.title }))} />

        {SHOP_FEATURES.map((g, i) => (
          <Sec key={g.id} tone={i % 2 ? "b" : "a"}>
            <section id={g.id} className={`gx-grp gx-lg ${i % 2 ? "gx-flip" : ""}`} aria-labelledby={`${g.id}-h`}>
              <div className="gx-txt">
                <Ico color={COLS[i % 6]}>{ICON[g.id] ?? <Box size={24} />}</Ico>
                <h2 id={`${g.id}-h`}>{g.title}</h2>
                <p className="gx-sub">{g.text}</p>
                <ul className="gx-keys">
                  {g.keys.map((k) => (
                    <li key={k}>
                      <Tick />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
                <details className="gx-all">
                  <summary className="gx-lgp">
                    <span className="gx-all-open">See all {g.items.length} features</span>
                    <span className="gx-all-close">Show fewer</span>
                    <ChevronDown size={15} strokeWidth={2.6} aria-hidden />
                  </summary>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.text}>
                        <Tick />
                        <span>
                          {it.text}
                          {it.app && <span className="gx-tag">App</span>}
                          {it.soon && <span className="gx-tag gx-s">Coming soon</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              <div className="gx-mini" aria-hidden>{MINI[g.id]}</div>
            </section>
          </Sec>
        ))}

        <Sec tone="a">
          <div className="gx-works">
            <h2 className="gx-works-h">Works with what you already use</h2>
            <p>Payments, delivery, email and reviews, connected in a few clicks.</p>
            <div className="gx-logos">
              {WORKS.map((w) => (
                <span key={w.name} className="gx-lgp">
                  {w.logo && <Image src={`/home/logos/${w.logo}.webp`} alt="" width={22} height={22} />}
                  {w.name}
                </span>
              ))}
            </div>
          </div>
        </Sec>

        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." secondary={{ href: "/pricing?kind=shop", label: "Compare plans" }} />
      </GlassPage>
    </PageShell>
  );
}
