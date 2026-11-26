// src/app/domains/page.tsx
// Domains page: find a new name (example search until a registrar is chosen) or connect your own.
import type { Metadata } from "next";
import { Link2 } from "lucide-react";
import PageShell from "../PageShell";
import { Band, FaqPanel, GlassPage, Heading, Hero, Sec } from "../site/glass";

export const metadata: Metadata = {
  title: "Domains",
  description: "Get a new domain for your online shop or connect one you already own, with a free secure padlock.",
};

const EXAMPLE: [string, boolean][] = [["bloomandco.com", true], ["bloomandco.co.uk", false], ["bloomandco.shop", false], ["bloomandco.store", false]];

const STEPS = [
  { t: "Add it in your admin", d: "Type your domain in Settings, Domains." },
  { t: "Add two records", d: "We show you exactly what to add where your domain is managed." },
  { t: "You are live", d: "We check it and add a free secure padlock (SSL)." },
];

const FAQ = [
  { q: "Is a custom domain included?", a: "Yes. Every plan lets you use your own domain." },
  { q: "Can I keep my domain where it is?", a: "Yes. Connect it from wherever it is registered; you do not need to move it." },
  { q: "Do I get a secure padlock?", a: "Yes. We add a free SSL certificate as soon as your domain is connected." },
];

export default function DomainsPage() {
  return (
    <PageShell>
      <GlassPage>
        <Hero>
          <span className="gx-pill"><Link2 size={14} aria-hidden /> Domains</span>
          <h1 className="gx-h1">Get the perfect name for your online shop.</h1>
          <p className="gx-lead">Search for a new name, or connect one you already own. We set it up and keep it secure.</p>
        </Hero>
        <Sec tone="a">
          <form action="/contact" method="get" className="gx-search gx-lgp" role="search">
            <input type="hidden" name="topic" value="domain" />
            <label htmlFor="domain-q" className="sr-only">Domain name</label>
            <input id="domain-q" name="domain" placeholder="yourshopname" autoComplete="off" />
            <button className="gx-btn gx-o gx-sm cursor-pointer" type="submit">Search</button>
          </form>
          <div className="gx-dres gx-lg" aria-label="Example search">
            {EXAMPLE.map(([d, taken]) => (
              <div key={d} className="gx-mrow">
                <b>{d}</b>
                {taken ? <small>Taken</small> : <b style={{ color: "var(--gx-green)" }}>Available</b>}
              </div>
            ))}
          </div>
          <p className="gx-h2sub gx-center !text-[14px]">Example search. Live search is on the way; until then, send us the name you want and we will set it up.</p>
        </Sec>
        <Sec tone="b">
          <Heading title="Already have a domain?" sub="Keep it where it is. Connect it in three steps." />
          <ol className="gx-cards gx-c3 list-none p-0">
            {STEPS.map((s, i) => (
              <li key={s.t} className="gx-card gx-lg">
                <span className="gx-num" aria-hidden>{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </Sec>
        <Sec tone="a">
          <FaqPanel name="domain-faq" title="Questions about domains" sub="Ask us if your question is not here." items={FAQ} />
        </Sec>
        <Band title="Open your online shop today." accent="Pay nothing for 3 days." text="No credit card required. Cancel any time." />
      </GlassPage>
    </PageShell>
  );
}
