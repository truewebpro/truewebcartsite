// src/app/solutions/[slug]/page.tsx
// One solution (by kind of business or by need), from src/lib/solutions.ts.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import PageShell from "../../PageShell";
import { SOLUTIONS, solutionBySlug } from "@/lib/solutions";
import { SIGNUP_URL } from "../../site/links";
import { NAV, type MenuIcon } from "../../site/links";
import { IconTile } from "../../site/icons";
import { Arrow, Band, GlassPage, Heading, Hero, Sec, Tick } from "../../site/glass";
import { getCatalog } from "@/lib/db";
import type { App } from "@/lib/catalog";

const norm = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

/** The App Store app with this name, if the catalog has it. */
function findApp(apps: App[], name: string) {
  const n = norm(name);
  return apps.find((a) => norm(a.name) === n) ?? apps.find((a) => norm(a.name).includes(n) || n.includes(norm(a.name)));
}

/** The icon the Solutions menu uses for this page. */
function menuIcon(href: string): MenuIcon {
  for (const e of NAV) for (const g of e.groups ?? []) for (const it of g.items) if (it.href === href) return it.icon;
  return "spark";
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = solutionBySlug((await params).slug);
  if (!s) return { title: "Solutions" };
  return { title: `${s.title}: ${s.heading.replace(/\.$/, "")}`, description: s.lead };
}

export default async function SolutionPage({ params }: Props) {
  const s = solutionBySlug((await params).slug);
  if (!s) notFound();
  const others = SOLUTIONS.filter((o) => o.group === s.group && o.slug !== s.slug);
  const catalog = await getCatalog();

  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><Sparkles size={14} aria-hidden /> {s.group === "business" ? "For your business" : "Solutions"}: {s.title}</span>
          <h1 className="gx-h1">{s.heading}</h1>
          <p className="gx-lead">{s.lead}</p>
          <div className="gx-cta justify-center">
            <Link className="gx-btn gx-o" href={SIGNUP_URL}>Start 3 days free</Link>
            <Link className="gx-btn gx-g" href="/pricing?kind=shop">See pricing</Link>
          </div>
        </Hero>
        <Sec tone="a">
          <div className="gx-cards gx-c3 !mt-0">
            {s.points.map((p) => (
              <div key={p.title} className="gx-card gx-lg">
                <span className="inline-flex"><Tick /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </Sec>
        <Sec tone="b">
          <Heading title="Apps worth switching on" sub="Turn them on from the App Store when you need them." />
          <div className="gx-cards gx-c3">
            {s.apps.map((name) => {
              const a = findApp(catalog.apps, name);
              return (
                <Link key={name} href={a ? `/app-store#cat-${a.category}` : "/app-store"} className="gx-card gx-lg gx-acard gx-linkcard">
                  <div className="gx-atop">
                    {a?.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.icon} alt="" width={46} height={46} loading="lazy" className="gx-appimg" />
                    ) : (
                      <span className="gx-appimg gx-appletter" aria-hidden>{(a?.name ?? name).charAt(0)}</span>
                    )}
                    <h3>{a?.name ?? name}</h3>
                  </div>
                  <p>{a?.line ?? "Turn it on from the App Store."}</p>
                  <span className="gx-amore">See in App Store <Arrow /></span>
                </Link>
              );
            })}
          </div>
          <div className="mt-16">
            <Heading title={s.group === "business" ? "Other kinds of business" : "Other solutions"} />
            <div className="gx-cards gx-c3">
              {others.map((o, i) => (
                <Link key={o.slug} href={`/solutions/${o.slug}`} className="gx-card gx-lg gx-linkcard gx-solcard">
                  <IconTile icon={menuIcon(`/solutions/${o.slug}`)} index={i} size={46} />
                  <div>
                    <h3>{o.title}</h3>
                    <p>{o.line}</p>
                  </div>
                  <span className="gx-solarrow" aria-hidden><Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." />
      </GlassPage>
    </PageShell>
  );
}
