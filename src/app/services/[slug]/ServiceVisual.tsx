// src/app/services/[slug]/ServiceVisual.tsx
// The picture in each service page header: a small browser (or phone) showing the work, with two glass notes.
import type { ReactNode } from "react";
import { BadgeCheck, Smartphone, Gauge, Lock, Bell, ShoppingCart, Truck, RefreshCw, Link2, Search, MapPin, Mail, Megaphone, Boxes, Store, ShieldCheck, Activity } from "lucide-react";

type Note = { icon: ReactNode; title: string; text: string; color: string };

const RED = "#D92A04", GREEN = "#0F6B3A", BLUE = "#2A6DF4", AMBER = "#B7791F";

function Notes({ a, b }: { a: Note; b: Note }) {
  return (
    <>
      {[a, b].map((n, i) => (
        <div key={n.title} className={`gx-float ${i ? "gx-b" : "gx-a"} gx-lg gx-shine`} aria-hidden>
          <div className="gx-row">
            <span className="gx-dot" style={{ background: `color-mix(in srgb, ${n.color} 14%, transparent)`, color: n.color }}>{n.icon}</span>
            <div><b>{n.title}</b>{n.text}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="gx-browser" aria-hidden>
      <div className="gx-top"><i /><i /><i /><span className="gx-url">{url}</span></div>
      <div className="gx-sv">{children}</div>
    </div>
  );
}

const Lines = ({ n = 3 }: { n?: number }) => (
  <div className="gx-sv-lines">{Array.from({ length: n }, (_, i) => <span key={i} style={{ width: `${90 - i * 18}%` }} />)}</div>
);

const PICTURES: Record<string, { body: ReactNode; a: Note; b: Note }> = {
  "web-design": {
    body: (
      <Browser url="your-business.com">
        <div className="gx-sv-hero"><span className="gx-sv-h" /><span className="gx-sv-h2" /><span className="gx-sv-cta" /></div>
        <div className="gx-sv-grid3"><div /><div /><div /></div>
      </Browser>
    ),
    a: { icon: <Smartphone size={16} />, title: "Phone layout", text: "Made first", color: RED },
    b: { icon: <BadgeCheck size={16} />, title: "Design approved", text: "Ready to build", color: GREEN },
  },
  "web-development": {
    body: (
      <Browser url="your-business.com">
        <div className="gx-sv-code">
          <span><i>&lt;section</i> class=&quot;hero&quot;<i>&gt;</i></span>
          <span className="gx-sv-in">&lt;h1&gt;Welcome&lt;/h1&gt;</span>
          <span className="gx-sv-in">&lt;a href=&quot;/contact&quot;&gt;Get in touch&lt;/a&gt;</span>
          <span><i>&lt;/section&gt;</i></span>
        </div>
        <div className="gx-sv-meter"><b>98</b><span>Page speed</span></div>
      </Browser>
    ),
    a: { icon: <Gauge size={16} />, title: "Loads fast", text: "Good Core Web Vitals", color: GREEN },
    b: { icon: <Lock size={16} />, title: "Padlock on", text: "Secure hosting", color: BLUE },
  },
  "app-development": {
    body: (
      <div className="gx-sv-phone" aria-hidden>
        <div className="gx-sv-notch" />
        <div className="gx-sv-hero !h-[110px]"><span className="gx-sv-h" /><span className="gx-sv-cta" /></div>
        <div className="gx-sv-list"><div /><div /><div /></div>
        <div className="gx-sv-tabbar"><i /><i /><i /><i /></div>
      </div>
    ),
    a: { icon: <Bell size={16} />, title: "Push notification", text: "Your order is on its way", color: RED },
    b: { icon: <Smartphone size={16} />, title: "iPhone and Android", text: "One build", color: BLUE },
  },
  "ecommerce-development": {
    body: (
      <Browser url="your-shop.com">
        <div className="gx-sv-shopbar"><b>Your shop</b><span><ShoppingCart size={13} /> Cart (2)</span></div>
        <div className="gx-sv-grid3 gx-sv-products"><div><i /><span /></div><div><i /><span /></div><div><i /><span /></div></div>
      </Browser>
    ),
    a: { icon: <ShoppingCart size={16} />, title: "Order placed", text: "Paid by card", color: GREEN },
    b: { icon: <Truck size={16} />, title: "Delivery label", text: "Ready to print", color: AMBER },
  },
  "website-integrations": {
    body: (
      <Browser url="admin.your-business.com">
        <div className="gx-sv-hub">
          {["Payments", "Accounting", "CRM", "Delivery"].map((t) => <span key={t}>{t}</span>)}
          <b>Your site</b>
        </div>
      </Browser>
    ),
    a: { icon: <RefreshCw size={16} />, title: "In sync", text: "Orders and stock", color: GREEN },
    b: { icon: <Link2 size={16} />, title: "Pay by link", text: "Sent to customer", color: BLUE },
  },
  "seo-services": {
    body: (
      <Browser url="google.com">
        <div className="gx-sv-search"><Search size={13} /> plumber near me</div>
        <div className="gx-sv-results">
          <div className="gx-on"><b>Your Business</b><span>your-business.com</span><Lines n={2} /></div>
          <div><b /><Lines n={2} /></div>
          <div><b /><Lines n={2} /></div>
        </div>
      </Browser>
    ),
    a: { icon: <Search size={16} />, title: "Page optimised", text: "Titles and text", color: GREEN },
    b: { icon: <MapPin size={16} />, title: "Local search", text: "Found on the map", color: RED },
  },
  "digital-marketing": {
    body: (
      <Browser url="mail.your-business.com">
        <div className="gx-sv-mail">
          <div className="gx-sv-hero !h-[96px]"><span className="gx-sv-h" /><span className="gx-sv-cta" /></div>
          <Lines n={3} />
          <div className="gx-sv-grid3"><div /><div /><div /></div>
        </div>
      </Browser>
    ),
    a: { icon: <Mail size={16} />, title: "Email campaign", text: "Sent to subscribers", color: BLUE },
    b: { icon: <Megaphone size={16} />, title: "Shopping ads", text: "Live on Google", color: RED },
  },
  "marketplace-listing": {
    body: (
      <Browser url="seller.marketplace.com">
        <div className="gx-sv-listing"><i /><div><b>Your product</b><Lines n={2} /><span className="gx-sv-cta" /></div></div>
        <div className="gx-sv-chips">{["Amazon", "eBay", "Etsy", "TikTok Shop"].map((t) => <span key={t}>{t}</span>)}</div>
      </Browser>
    ),
    a: { icon: <Store size={16} />, title: "Listing live", text: "Photos and text ready", color: GREEN },
    b: { icon: <Boxes size={16} />, title: "Stock in step", text: "With your shop", color: AMBER },
  },
  "hosting-maintenance-support": {
    body: (
      <Browser url="status.your-business.com">
        <div className="gx-sv-status"><b><span className="gx-sv-live" /> All systems working</b></div>
        <div className="gx-sv-bars">{Array.from({ length: 24 }, (_, i) => <i key={i} />)}</div>
        <Lines n={2} />
      </Browser>
    ),
    a: { icon: <ShieldCheck size={16} />, title: "Backup done", text: "Updates applied", color: GREEN },
    b: { icon: <Activity size={16} />, title: "Monitoring", text: "Uptime and errors", color: BLUE },
  },
};

export default function ServiceVisual({ slug }: { slug: string }) {
  const p = PICTURES[slug] ?? PICTURES["web-design"];
  return (
    <div className="gx-vis gx-svis">
      {p.body}
      <Notes a={p.a} b={p.b} />
    </div>
  );
}
