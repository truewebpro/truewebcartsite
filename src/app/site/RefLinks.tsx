"use client";
// src/app/site/RefLinks.tsx
// Partner Program: a visitor who came with ?ref=CODE has it remembered for 90 days (cookie set in src/proxy.ts).
// Every sign-up link on the site then carries the code, so the new shop is linked to that partner.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_URL } from "./links";

function refCode(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)twc_ref=([A-Za-z0-9]{2,30})/);
  return m ? m[1] : null;
}

export default function RefLinks() {
  const path = usePathname();

  useEffect(() => {
    const ref = refCode();
    if (!ref) return;
    const tag = () =>
      document.querySelectorAll<HTMLAnchorElement>(`a[href^="${ADMIN_URL}/signup"]`).forEach((a) => {
        const url = new URL(a.href);
        if (url.searchParams.has("ref")) return;
        url.searchParams.set("ref", ref);
        a.href = url.toString();
      });
    tag();
    const watch = new MutationObserver(tag);
    watch.observe(document.body, { childList: true, subtree: true });
    return () => watch.disconnect();
  }, [path]);

  return null;
}
