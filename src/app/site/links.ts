// src/app/site/links.ts
export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://admin.twcarts.com";
export const SIGNUP_URL = `${ADMIN_URL}/signup`;
export const DEMO_SHOP_URL = process.env.NEXT_PUBLIC_DEMO_SHOP_URL ?? "https://www.twcarts.site";

export type MenuIcon =
  | "cart" | "globe" | "layout" | "grid" | "phone" | "link"
  | "shirt" | "cup" | "spark" | "box"
  | "book" | "play" | "move" | "help" | "chat" | "mail";

export interface MenuItem {
  label: string;
  line: string;
  href: string;
  icon: MenuIcon;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export interface NavEntry {
  label: string;
  href: string;
  /** Opens the full-width panel on hover. */
  groups?: MenuGroup[];
}

/** Main menu: Products, Solutions, Resources, Pricing, Support. */
export const NAV: NavEntry[] = [
  {
    label: "Products",
    href: "/online-shop",
    groups: [
      {
        title: "Sell online",
        items: [
          { label: "Online shop", line: "Sell anything, anywhere", href: "/online-shop", icon: "cart" },
          { label: "Websites", line: "Pages for any business", href: "/websites", icon: "globe" },
          { label: "Templates", line: "Ready-made designs", href: "/websites#templates", icon: "layout" },
        ],
      },
      {
        title: "Grow",
        items: [
          { label: "App Store", line: "Apps built in", href: "/pricing#apps", icon: "grid" },
          { label: "Mobile app", line: "Orders on your phone", href: "/#mobile-app", icon: "phone" },
          { label: "Domains", line: "Find or connect a name", href: "/#domains", icon: "link" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/online-shop",
    groups: [
      {
        title: "By business",
        items: [
          { label: "Fashion", line: "Clothes and accessories", href: "/online-shop", icon: "shirt" },
          { label: "Food and drink", line: "Cafes, bakeries, delis", href: "/online-shop", icon: "cup" },
          { label: "Beauty", line: "Salons and cosmetics", href: "/online-shop", icon: "spark" },
          { label: "Wholesale", line: "Sell to other businesses", href: "/online-shop", icon: "box" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/services",
    groups: [
      {
        title: "Learn",
        items: [
          { label: "Services", line: "We can build it for you", href: "/services", icon: "book" },
          { label: "Move from Shopify", line: "Bring your shop across", href: "/online-shop", icon: "move" },
          { label: "Demo shop", line: "See a live online shop", href: DEMO_SHOP_URL, icon: "play" },
        ],
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Support",
    href: "/contact",
    groups: [
      {
        title: "Get help",
        items: [
          { label: "Contact us", line: "Send us a message", href: "/contact", icon: "mail" },
          { label: "FAQs", line: "Answers to common questions", href: "/#faqs", icon: "help" },
          { label: "Chat with us", line: "Talk to the team", href: "/contact", icon: "chat" },
        ],
      },
    ],
  },
];

/** Kept for any inner page that still lists plain links. */
export const NAV_LINKS = NAV.map((n) => ({ label: n.label, href: n.href }));

/** Footer columns, as in the approved footer mockup. /blog, /about, /terms, /privacy and /cookies are still to be made. */
export const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Online shop",
    links: [
      { label: "Features", href: "/online-shop" },
      { label: "Shop builder", href: "/online-shop" },
      { label: "Templates", href: "/websites#templates" },
      { label: "App Store", href: "/pricing#apps" },
      { label: "Domains", href: "/#domains" },
      { label: "Mobile app", href: "/#mobile-app" },
    ],
  },
  {
    title: "Websites",
    links: [
      { label: "Website builder", href: "/websites" },
      { label: "Templates", href: "/websites#templates" },
      { label: "Blog", href: "/blog" },
      { label: "Custom domain", href: "/#domains" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { label: "Plans", href: "/pricing" },
      { label: "Compare plans", href: "/pricing" },
      { label: "3 day free trial", href: "/pricing" },
      { label: "Move from Shopify", href: "/online-shop" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help centre", href: "/contact" },
      { label: "FAQs", href: "/#faqs" },
      { label: "Contact us", href: "/contact" },
      { label: "Chat with us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];
