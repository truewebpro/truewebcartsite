"use client";
// src/app/site/ScrollTabs.tsx
// Glass tabs that stay under the bar and light up the part of the page being read.
import { useEffect, useState } from "react";

export default function ScrollTabs({ tabs, label }: { tabs: { id: string; label: string }[]; label: string }) {
  const [on, setOn] = useState(tabs[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [tabs]);

  return (
    <nav className="gx-tabs" aria-label={label}>
      <div className="gx-wrap">
        {tabs.map((t) => (
          <a key={t.id} href={`#${t.id}`} className={`gx-lgp ${on === t.id ? "gx-on" : ""}`} aria-current={on === t.id ? "true" : undefined}>
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
