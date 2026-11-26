// src/app/mobile-app/page.tsx
// Mobile app page: the TWCarts admin app for iPhone and Android.
import type { Metadata } from "next";
import { Bell, ScanLine, Printer, MessageSquare, ShieldCheck, Package, Smartphone } from "lucide-react";
import PageShell from "../PageShell";
import { Band, COLS, FaqPanel, GlassPage, Heading, Hero, Ico, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "Mobile app",
  description: "Run your online shop from your phone: orders, stock, labels and chats, for iPhone and Android.",
};

const FEATURES = [
  { icon: <Bell size={24} />, t: "Order alerts", d: "Know the second a new order comes in." },
  { icon: <ScanLine size={24} />, t: "Scan barcodes", d: "Find a product or update stock with your camera." },
  { icon: <Printer size={24} />, t: "Print labels", d: "Print delivery labels from your phone." },
  { icon: <MessageSquare size={24} />, t: "Reply to chats", d: "Answer customers from your Inbox on the go." },
  { icon: <ShieldCheck size={24} />, t: "Face ID sign-in", d: "Quick and safe sign-in." },
  { icon: <Package size={24} />, t: "Update stock", d: "Change stock and prices in seconds." },
];

const FAQ = [
  { q: "Does the app cost extra?", a: "No. It comes with every plan." },
  { q: "Can my staff use it?", a: "Yes. Each person signs in with their own account and sees what you let them see." },
  { q: "When is it in the stores?", a: "Soon. We will email you as soon as it is ready to download." },
];

function Phone() {
  return (
    <div className="gx-phone" aria-hidden>
      <div className="gx-scr">
        <div className="gx-ph">Orders</div>
        {[["#1043 Sophie M.", "£38.00"], ["#1042 James K.", "£64.50"], ["#1041 Aisha R.", "£22.00"]].map(([o, p]) => (
          <div key={o} className="gx-prow"><b>{o}</b><span className="font-extrabold text-[#0F6B3A]">{p}</span></div>
        ))}
        <div className="gx-prow !bg-[#081F45] text-white"><b>Print label</b><span>›</span></div>
      </div>
    </div>
  );
}

export default function MobileAppPage() {
  return (
    <PageShell>
      <GlassPage>
        <Hero visual={<Phone />}>
          <span className="gx-pill"><Smartphone size={14} aria-hidden /> Mobile app</span>
          <h1 className="gx-h1">Your online shop, in your pocket.</h1>
          <p className="gx-lead">Orders, stock, labels and chats on your phone, for iPhone and Android.</p>
          <div className="gx-badges"><span>App Store, coming soon</span><span>Google Play, coming soon</span></div>
        </Hero>
        <Sec tone="a">
          <Heading title="Everything you need on the go" />
          <div className="gx-cards gx-c3">
            {FEATURES.map((f, i) => (
              <div key={f.t} className="gx-card gx-lg">
                <Ico color={COLS[i % 6]}>{f.icon}</Ico>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </Sec>
        <Sec tone="b">
          <FaqPanel name="app-faq" title="Questions about the app" sub="The app comes free with every plan." items={FAQ} />
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." />
      </GlassPage>
    </PageShell>
  );
}
