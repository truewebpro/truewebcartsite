"use client";
// src/app/site/SlideToggle.tsx
// Glass switch with a pill that slides to the chosen option. Red for the kind of site, navy for billing.
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export default function SlideToggle<T extends string>({
  label, value, options, onChange, tone = "navy",
}: {
  label: string;
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
  tone?: "red" | "navy";
}) {
  const box = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const place = () => {
      const on = box.current?.querySelector<HTMLButtonElement>("button[aria-pressed='true']");
      if (on) setThumb({ left: on.offsetLeft, width: on.offsetWidth });
    };
    place();
    const ro = new ResizeObserver(place);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [value]);

  return (
    <div ref={box} role="group" aria-label={label} className={`gx-slide gx-lgp gx-slide-${tone}`}>
      <span aria-hidden className="gx-thumb" style={thumb ? { left: thumb.left, width: thumb.width } : { opacity: 0 }} />
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} className={value === o.value ? "gx-on" : ""} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
