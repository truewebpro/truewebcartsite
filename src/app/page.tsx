// src/app/page.tsx
import Link from "next/link";
import { Building2, LayoutGrid, MessageSquare, RefreshCw, ShoppingCart, Truck } from "lucide-react";
import PageShell from "./PageShell";
import { Button, Container, CtaBand, Eyebrow } from "./site/ui";
import { DEMO_SHOP_URL } from "./site/links";
import { APPS_SEED, APP_CATEGORIES } from "@/lib/catalog";

const STRIP = [
  { title: "6 ways to pay", text: "Worldpay, Viva Wallet, CyberSource, PayPal, Stripe, bank transfer" },
  { title: "Royal Mail and DPD", text: "Labels and tracking through Sendcloud" },
  { title: `${APPS_SEED.length} apps`, text: "Turn on what you need, when you need it" },
  { title: "iPhone and Android", text: "Run orders and stock from your phone" },
];

const HIGHLIGHTS = [
  { icon: ShoppingCart, title: "Products, cart and checkout", text: "Variants, brands, collections that fill themselves, bundles and add-ons, pre-order, guest checkout and postcode address lookup." },
  { icon: Truck, title: "Orders and delivery", text: "Order stages from unpaid to delivered, pick lists and packing slips, Click and Collect, labels for Royal Mail and DPD." },
  { icon: Building2, title: "B2B trade and sales reps", text: "Trade accounts, company prices, bulk order form, pay on account, and reps who order for their customers and earn commission." },
  { icon: MessageSquare, title: "Ava, your AI shop assistant", text: "Answers customers, recommends products, adds them to the cart and hands over to your team in the Inbox." },
  { icon: RefreshCw, title: "Customers come back", text: "Loyalty points, discount codes, sign-up pop-up, product reviews, back in stock emails and subscriptions." },
  { icon: LayoutGrid, title: "Move from Shopify in a day", text: "Import products, collections, pages, blog posts, customers, orders and reviews from your Shopify store." },
];

const APP_PHONE = [
  "Alerts for new orders and waiting chats",
  "Fulfil orders, print packing slips, invoices and labels",
  "Scan barcodes to find products and count stock",
  "Reply to customers from the Inbox",
  "Reps see their customers, orders and commission",
];

export default function Home() {
  const appsByCategory = APP_CATEGORIES.map((c) => ({
    category: c,
    names: APPS_SEED.filter((a) => a.category === c).map((a) => a.name),
  }));

  return (
    <PageShell>
      <section className="bg-navy text-white">
        <Container className="py-20 sm:py-24 flex flex-wrap gap-14 items-center">
          <div className="flex-[1_1_520px] min-w-0">
            <Eyebrow light>Online shops and business websites, built in the UK</Eyebrow>
            <h1 className="mt-4 font-display font-bold text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.04]">
              Your own shop or website, with everything you need to sell.
            </h1>
            <p className="mt-6 text-lg sm:text-[19px] leading-relaxed text-[#D5DEEE] max-w-[560px]">
              Pick an online shop or a website, choose a template, and run it all from one admin and one
              phone app. Payments, delivery, B2B trade, an AI shop assistant and {APPS_SEED.length} apps are
              ready when you need them.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Button href="/pricing">See plans and pricing</Button>
              <Button href={DEMO_SHOP_URL} variant="outline-light">
                View the demo shop
              </Button>
            </div>
          </div>
          <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-4">
            <Link href="/online-shop" className="block bg-white text-graphite rounded-[20px] p-7 hover:-translate-y-0.5 transition-transform">
              <span className="text-[13px] font-semibold text-cta-text uppercase tracking-[0.06em]">Online shop</span>
              <span className="block mt-2 font-display text-[26px] font-bold text-navy">Sell products online</span>
              <span className="block mt-2 text-[15px] leading-relaxed text-muted">
                Products, cart, checkout, delivery, customers, discounts, B2B trade accounts and sales reps.
              </span>
            </Link>
            <Link href="/websites" className="block bg-navy-soft border border-[#2B5296] rounded-[20px] p-7 hover:-translate-y-0.5 transition-transform">
              <span className="text-[13px] font-semibold text-[#FFB9A6] uppercase tracking-[0.06em]">Website</span>
              <span className="block mt-2 font-display text-[26px] font-bold">A business website, no checkout</span>
              <span className="block mt-2 text-[15px] leading-relaxed text-[#D5DEEE]">
                5 or 10 page sites for restaurants, salons and services, with forms, bookings, opening hours and a map.
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section aria-label="What is included" className="bg-white border-b border-line">
        <Container className="py-7 grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {STRIP.map((s) => (
            <div key={s.title}>
              <p className="font-display text-[22px] font-bold text-navy">{s.title}</p>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section id="features">
        <Container className="pt-24 pb-10">
          <Eyebrow>Everything in one admin</Eyebrow>
          <h2 className="mt-3 font-display font-bold text-4xl sm:text-[44px] leading-[1.1] text-navy max-w-[760px]">
            Built for shops that sell to the public and to the trade.
          </h2>
          <div className="mt-12 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white border border-line rounded-[20px] p-7">
                <Icon aria-hidden className="w-7 h-7 text-navy" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-[22px] font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/online-shop" className="font-semibold text-navy underline underline-offset-4">
              See every online shop feature
            </Link>
          </p>
        </Container>
      </section>

      <section id="templates">
        <Container className="py-16">
          <div className="bg-white border border-line rounded-[28px] p-8 sm:p-12 flex flex-wrap gap-12 items-center">
            <div className="flex-[1_1_400px] min-w-0">
              <Eyebrow>Store Builder</Eyebrow>
              <h2 className="mt-3 font-display font-bold text-4xl leading-[1.1] text-navy">
                Start from a template, change anything.
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                Templates set your colours, fonts, header, footer and pages in one click. Add sections with the +
                button, see them live, and restore your last design any time. Free and premium templates.
              </p>
              <div className="mt-6">
                <Button href="/websites#templates" variant="navy">
                  Browse templates
                </Button>
              </div>
            </div>
            <div className="flex-[1_1_420px] min-w-0 grid grid-cols-3 gap-3.5" aria-hidden>
              <div className="aspect-[3/4] rounded-2xl bg-[#E9E3D6] flex items-end p-3.5 text-[13px] font-semibold text-muted">Marisol</div>
              <div className="aspect-[3/4] rounded-2xl bg-[#DCE4F1]" />
              <div className="aspect-[3/4] rounded-2xl bg-[#F1DDD6]" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-deep text-white">
        <Container className="py-24">
          <div className="flex flex-wrap justify-between gap-6 items-end">
            <div className="max-w-[640px]">
              <Eyebrow light>App Store</Eyebrow>
              <h2 className="mt-3 font-display font-bold text-4xl sm:text-[44px] leading-[1.1]">
                Turn on the apps you need. Pay only for what you add.
              </h2>
            </div>
            <Button href="/pricing#apps" variant="outline-light">
              See all {APPS_SEED.length} apps
            </Button>
          </div>
          <div className="mt-11 grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {appsByCategory.map((g) => (
              <div key={g.category} className="bg-[#0F2A5A] border border-[#22437E] rounded-[18px] p-6">
                <p className="text-[13px] text-[#A9B9D6]">{g.category}</p>
                <p className="mt-2 text-base leading-relaxed">{g.names.join(", ")}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="app">
        <Container className="pt-24 pb-16 flex flex-wrap gap-14 items-center">
          <div className="flex-[1_1_460px] min-w-0">
            <Eyebrow>Admin app for iPhone and Android</Eyebrow>
            <h2 className="mt-3 font-display font-bold text-4xl leading-[1.1] text-navy">Your shop in your pocket.</h2>
            <ul className="mt-6 flex flex-col gap-3 text-base text-graphite list-disc pl-5">
              {APP_PHONE.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div aria-hidden className="mx-auto w-[260px] h-[520px] rounded-[44px] bg-white border-[10px] border-navy p-5 flex flex-col gap-3">
            <div className="h-5 w-24 rounded-full bg-[#EEF2FA] mx-auto" />
            <div className="mt-3 rounded-2xl bg-[#EEF2FA] h-24" />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F6F4EE] h-20" />
              <div className="rounded-2xl bg-[#F6F4EE] h-20" />
            </div>
            <div className="rounded-2xl border border-line h-14" />
            <div className="rounded-2xl border border-line h-14" />
            <div className="rounded-2xl border border-line h-14" />
          </div>
        </Container>
      </section>

      <section id="services">
        <Container className="pt-8 pb-16">
          <div className="bg-white border border-line rounded-[28px] p-8 sm:p-10 flex flex-wrap gap-6 justify-between items-center">
            <div className="max-w-[720px]">
              <h2 className="font-display font-bold text-3xl text-navy">Want us to build it for you?</h2>
              <p className="mt-2.5 text-base leading-relaxed text-muted">
                Our team sets up your shop, moves your products, designs your pages and hands it over ready to open.
                We also build custom software and apps.
              </p>
            </div>
            <Button href="/services" variant="navy">
              See our services
            </Button>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Ready to open your shop?"
        text="We set it up, you choose a plan, and it goes live when you are ready."
        primary={{ href: "/pricing", label: "Choose a plan" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </PageShell>
  );
}
