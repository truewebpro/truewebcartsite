// src/app/PageShell.tsx
import React from "react";
import SiteHeader from "./site/SiteHeader";
import SiteFooter from "./site/SiteFooter";

/**
 * Shared chrome for every page: fixed glass header, main, footer. Every page follows the light/dark switch.
 * Inner pages leave room at the top for the fixed bar; the home hero runs under it.
 */
export default function PageShell({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  return (
    <>
      <SiteHeader />
      <main className={`flex-1 h-page ${home ? "" : "pt-[calc(60px+env(safe-area-inset-top))]"}`}>{children}</main>
      <SiteFooter />
    </>
  );
}
