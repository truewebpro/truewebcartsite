// src/app/site/links.ts
export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://admin.twcarts.com";
export const DEMO_SHOP_URL = process.env.NEXT_PUBLIC_DEMO_SHOP_URL ?? "https://www.twcarts.site";

export const NAV_LINKS = [
  { label: "Online shop", href: "/online-shop" },
  { label: "Websites", href: "/websites" },
  { label: "Templates", href: "/websites#templates" },
  { label: "App Store", href: "/pricing#apps" },
  { label: "Pricing", href: "/pricing" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
