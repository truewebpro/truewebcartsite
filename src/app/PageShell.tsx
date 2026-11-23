// src/app/PageShell.tsx
import React from "react";
import SiteHeader from "./site/SiteHeader";
import SiteFooter from "./site/SiteFooter";

/**
 * Shared chrome for every page: fixed glass header, main, footer.
 * The home page follows the light/dark switch; inner pages stay light until they get a dark design.
 */
export default function PageShell({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  if (home) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 h-page">{children}</main>
        <SiteFooter />
      </>
    );
  }
  return (
    <div data-theme="light" className="contents">
      <SiteHeader showTheme={false} />
      <main className="flex-1 pt-[calc(60px+env(safe-area-inset-top))]">{children}</main>
      <SiteFooter />
    </div>
  );
}
