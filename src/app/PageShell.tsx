import React from "react";
import ParticleNetworkBackground from "./ParticleNetworkBackground";
import SiteNav from "./SiteNav";
import FooterBenjamen from "./FooterBenjamen";

/** Shared chrome for inner pages: animated background, nav, footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <ParticleNetworkBackground />
      <div className="relative z-10 font-['Kodchasan',sans-serif]">
        <SiteNav />
        <main className="pt-32 sm:pt-40 bg-[#F4F3ED]/90">{children}</main>
        <FooterBenjamen />
      </div>
    </>
  );
}
