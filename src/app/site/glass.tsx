// src/app/site/glass.tsx
// Building blocks for the liquid glass inner pages (approved mockup "Inner pages, liquid glass").
// Styles live in glass.css (all classes start gx-); the section background is the home page's SectionBg.
import type { ReactNode } from "react";
import Link from "next/link";
import SectionBg from "../home/SectionBg";
import { SIGNUP_URL } from "./links";

const BLOBS = ["#FF8A5C", "#5B86D6", "#3DDC91", "#F5A524", "#A77BF3", "#2A6DF4"];
export const COLS = ["#D92A04", "#2A6DF4", "#0F6B3A", "#6B3FA0", "#F5A524", "#0B2F66"];

/** A soft colour blob that drifts behind the glass, so the glass picks up its colour. */
export function Blob({ i, style }: { i: number; style: React.CSSProperties }) {
  return <span aria-hidden className="gx-blob" style={{ background: BLOBS[((i % 6) + 6) % 6], ...style }} />;
}

export function Tick() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gx-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={back ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

/** Icon in a small glass tile. */
export function Ico({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="gx-ico gx-lgp" style={{ color }}>
      {children}
    </span>
  );
}

/** Every inner page sits inside this, so the gx- styles and reduced motion rules apply. */
export function GlassPage({ children }: { children: ReactNode }) {
  return <div className="gx-page">{children}</div>;
}

/** Full-width section with the home page background (grid, light beams, glow) and alternating gradients. */
export function Sec({ tone = "a", id, children, pad = true }: { tone?: "a" | "b"; id?: string; children: ReactNode; pad?: boolean }) {
  return (
    <section id={id} className={`gx-sec ${pad ? "gx-secpad" : ""} gx-${tone} scroll-mt-28`}>
      <SectionBg />
      <div className="gx-wrap">{children}</div>
    </section>
  );
}

/** Page top. Two columns with a picture on the right, or centred when there is no picture. */
export function Hero({ children, visual }: { children: ReactNode; visual?: ReactNode }) {
  return (
    <section className={`gx-hero gx-sec ${visual ? "" : "gx-short"}`}>
      <SectionBg />
      <div className="gx-wrap">
        <div className="gx-in">
          <div>{children}</div>
          {visual && <div className="gx-vis">{visual}</div>}
        </div>
      </div>
    </section>
  );
}

export function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="gx-center">
      <h2 className="gx-h2">{title}</h2>
      {sub && <p className="gx-h2sub">{sub}</p>}
    </div>
  );
}

type Btn = { href: string; label: string };

/** The rounded navy band at the end of a page. */
export function Band({
  title,
  accent,
  text,
  primary = { href: SIGNUP_URL, label: "Start 3 days free" },
  secondary = { href: "/pricing", label: "Compare plans" },
}: {
  title: string;
  accent: string;
  text: string;
  primary?: Btn;
  secondary?: Btn;
}) {
  return (
    <section className="gx-band gx-sec gx-b">
      <SectionBg glow={false} />
      <div className="gx-wrap">
        <div className="gx-box">
          <h2 className="gx-band-h">
            {title}
            <em>{accent}</em>
          </h2>
          <p>{text}</p>
          <div className="gx-cta" style={{ justifyContent: "center" }}>
            <Link className="gx-btn gx-o" href={primary.href}>
              {primary.label}
            </Link>
            <Link className="gx-btn gx-g" href={secondary.href}>
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Questions in the navy panel, same as the home page FAQ. Only one open at a time. */
export function FaqPanel({ title, sub, items, name }: { title: string; sub: string; items: { q: string; a: string }[]; name: string }) {
  return (
    <div className="gx-faq">
      <span aria-hidden className="gx-blob" style={{ width: 300, height: 300, background: "#2A6DF4", right: -80, top: -80, opacity: 0.35 }} />
      <div>
        <h2>{title}</h2>
        <p className="gx-s">{sub}</p>
      </div>
      <div>
        {items.map((it, i) => (
          <details key={it.q} name={name} open={i === 0}>
            <summary>
              {it.q}
              <i aria-hidden>+</i>
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
