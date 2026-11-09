// src/app/PageShell.tsx
import React from "react";
import SiteHeader from "./site/SiteHeader";
import SiteFooter from "./site/SiteFooter";

/** Shared chrome for every page: header, main, footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
