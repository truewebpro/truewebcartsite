// src/app/migrate/MigrationParts.tsx
// Shared sections for the migration pages.
import Link from "next/link";
import type { ReactNode } from "react";
import { Box, Users, ShoppingCart, LayoutTemplate, Star, Link2 } from "lucide-react";
import { MIGRATIONS } from "@/lib/migrations";
import { COLS, Heading, Ico, Sec } from "../site/glass";

export const QUOTE_HREF = "/contact?service=migration";

const MOVES: { icon: ReactNode; t: string; d: string }[] = [
  { icon: <Box size={24} />, t: "Products", d: "With variants, photos, prices and stock" },
  { icon: <Users size={24} />, t: "Customers", d: "Accounts and email sign-ups" },
  { icon: <ShoppingCart size={24} />, t: "Orders", d: "Your order history" },
  { icon: <LayoutTemplate size={24} />, t: "Categories and collections", d: "And the products in them" },
  { icon: <Star size={24} />, t: "Reviews", d: "Where your old platform lets us export them" },
  { icon: <Link2 size={24} />, t: "Links and Google", d: "Old links redirect, so you keep your ranking" },
];

export function WhatMoves({ tone = "a" }: { tone?: "a" | "b" }) {
  return (
    <Sec tone={tone}>
      <Heading title="What comes with you" />
      <div className="gx-cards gx-c3">
        {MOVES.map((m, i) => (
          <div key={m.t} className="gx-card gx-lg">
            <Ico color={COLS[i % 6]}>{m.icon}</Ico>
            <h3>{m.t}</h3>
            <p>{m.d}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

export function HowItWorks({ from, tone = "b" }: { from?: string; tone?: "a" | "b" }) {
  const steps = [
    { t: "Tell us your shop", d: `Send us your ${from ? `${from} ` : "shop "}address. We reply with a plan and a fixed price.` },
    { t: "We copy everything", d: "Products, customers and orders come across behind a password page." },
    { t: "You check it", d: "Look through your new online shop and tell us what to change." },
    { t: "Switch over", d: "We point your domain to TWCarts. Old links keep working." },
  ];
  return (
    <Sec tone={tone}>
      <Heading title="How the move works" />
      <ol className="gx-cards gx-c4 list-none p-0">
        {steps.map((s, i) => (
          <li key={s.t} className="gx-card gx-lg">
            <span className="gx-num" aria-hidden>{i + 1}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </Sec>
  );
}

export function OtherPlatforms({ current }: { current?: string }) {
  return (
    <div className="mt-12">
      <Heading title={current ? "Moving from somewhere else?" : "Where are you moving from?"} />
      <div className="gx-plat">
        {MIGRATIONS.map((m) => (
          <Link key={m.slug} href={`/migrate/${m.slug}`} className={`gx-lgp ${m.slug === current ? "gx-on" : ""}`} aria-current={m.slug === current ? "page" : undefined}>
            {m.name}
          </Link>
        ))}
        <Link href={QUOTE_HREF} className="gx-lgp">Something else</Link>
      </div>
    </div>
  );
}
