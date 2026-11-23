// src/app/home/Fit.tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Shows a fixed-size mockup piece (width x height) scaled down to fit its column, never larger than 1. */
export default function Fit({ width, height, children, className = "" }: { width: number; height: number; children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;
    const set = () => {
      const s = Math.min(1, b.clientWidth / width);
      i.style.transform = `scale(${s})`;
      b.style.height = `${height * s}px`;
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(b);
    return () => ro.disconnect();
  }, [width, height]);
  return (
    <div ref={box} className={`relative w-full ${className}`} style={{ height }}>
      <div ref={inner} className="absolute left-1/2 top-0 origin-top" style={{ width, height, marginLeft: -width / 2 }}>
        {children}
      </div>
    </div>
  );
}
