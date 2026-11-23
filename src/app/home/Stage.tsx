// src/app/home/Stage.tsx
import type { CSSProperties, ReactNode } from "react";
import sections from "./desktop/sections.json";

const BG = Object.fromEntries((sections as [string, string, string, string][]).map(([n, l, d]) => [n, { l, d }]));

/**
 * Desktop (1280px and up): the section exactly as in the approved mockup, light and dark,
 * scaled to fit screens between 1280 and 1440 px and centred on wider screens.
 * Phones, tablets and small laptops get the responsive version passed as `mobile`.
 */
export default function Stage({ name, id, light, dark, mobile }: { name: string; id?: string; light: ReactNode; dark: ReactNode; mobile: ReactNode }) {
  const bg = BG[name];
  return (
    <div id={id} className="scroll-mt-16">
      <div className="hidden xl:block h-stage" style={{ "--bgl": bg?.l, "--bgd": bg?.d } as CSSProperties}>
        <div className="h-stage-inner h-only-light">{light}</div>
        <div className="h-stage-inner h-only-dark">{dark}</div>
      </div>
      <div className="xl:hidden">{mobile}</div>
    </div>
  );
}
