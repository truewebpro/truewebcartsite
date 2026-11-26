// src/app/site/FeatureCard.tsx
// Short feature card, like the Online shop page: icon, title, a line, 3 key points and the full list under "See all".
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { FeatureItem } from "@/lib/features";
import { Tick } from "./glass";

export default function FeatureCard({
  icon, title, text, keys, items = [], noun = "features", footer,
}: {
  icon: ReactNode;
  title: ReactNode;
  text: string;
  keys: string[];
  items?: FeatureItem[];
  noun?: string;
  footer?: ReactNode;
}) {
  return (
    <article className="gx-card gx-lg gx-fcard">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
      <ul className="gx-fkeys">
        {keys.map((k) => (
          <li key={k}>
            <Tick />
            <span>{k}</span>
          </li>
        ))}
      </ul>
      {items.length > keys.length && (
        <details className="gx-all">
          <summary className="gx-lgp">
            <span className="gx-all-open">See all {items.length} {noun}</span>
            <span className="gx-all-close">Show fewer</span>
            <ChevronDown size={15} strokeWidth={2.6} aria-hidden />
          </summary>
          <ul className="gx-fkeys">
            {items.map((it) => (
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
      )}
      {footer && <div className="gx-ffoot">{footer}</div>}
    </article>
  );
}
