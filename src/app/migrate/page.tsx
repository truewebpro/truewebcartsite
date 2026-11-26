// src/app/migrate/page.tsx
// Migration overview: how a move works and which platforms we move from.
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import PageShell from "../PageShell";
import { SIGNUP_URL } from "../site/links";
import { Band, GlassPage, Hero, Sec } from "../site/glass";
import { HowItWorks, OtherPlatforms, QUOTE_HREF, WhatMoves } from "./MigrationParts";

export const metadata: Metadata = {
  title: "Move your online shop to TWCarts",
  description: "Move from Shopify, Wix, WooCommerce or OpenCart to TWCarts. We bring your products, customers and orders across for you.",
};

export default function MigrateIndex() {
  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><ArrowLeftRight size={14} aria-hidden /> Migration</span>
          <h1 className="gx-h1">Move your online shop to TWCarts.</h1>
          <p className="gx-lead">From Shopify, Wix, WooCommerce, OpenCart and more. We bring your products, customers and orders across, and your shop stays open while we move it.</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href={QUOTE_HREF}>Get a free migration quote</Link>
            <Link className="gx-btn gx-g" href={SIGNUP_URL}>Start 3 days free</Link>
          </div>
        </Hero>
        <Sec tone="a">
          <OtherPlatforms />
        </Sec>
        <WhatMoves tone="b" />
        <HowItWorks tone="a" />
        <Band
          title="Ready to move?"
          accent="We will do it for you."
          text="Tell us where you sell now and we will send a plan and a fixed price."
          primary={{ href: QUOTE_HREF, label: "Get a free migration quote" }}
          secondary={{ href: "/pricing?kind=shop", label: "Compare plans" }}
        />
      </GlassPage>
    </PageShell>
  );
}
