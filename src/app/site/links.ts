// src/app/site/links.ts
export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://admin.twcarts.com";
/** "Start free" and the email boxes: the 3-day free trial, no card (admin.twcarts.com/signup/trial?email=). */
export const SIGNUP_URL = `${ADMIN_URL}/signup/trial`;
export const DEMO_SHOP_URL = process.env.NEXT_PUBLIC_DEMO_SHOP_URL ?? "https://www.twcarts.site";

export type MenuIcon =
  | "cart" | "globe" | "layout" | "grid" | "phone" | "link"
  | "shirt" | "cup" | "spark" | "box"
  | "book" | "play" | "move" | "help" | "chat" | "mail"
  | "pen" | "code" | "plug" | "search" | "megaphone" | "store" | "truck" | "receipt" | "boxes" | "building";

export interface MenuItem {
  label: string;
  line: string;
  href: string;
  icon: MenuIcon;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
  /** Show the items in 2 columns (long groups like Services). */
  cols?: 1 | 2;
  /** A link under the group, like "All services". */
  more?: { label: string; href: string };
}

export interface NavEntry {
  label: string;
  href: string;
  /** Opens the full-width panel on hover. */
  groups?: MenuGroup[];
  /** The card on the right of the panel. Without it the panel shows "Open your online shop today". */
  promo?: { title: string; line: string; href: string; cta: string };
  /** No card on the right of the panel; the groups use the full width. */
  hideCard?: boolean;
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
          { label: "Ecommerce Website", line: "Sell online with cart and payments", href: "/online-shop", icon: "cart" },
          { label: "Business Website", line: "Show your business, no selling", href: "/websites", icon: "globe" },
          { label: "Templates", line: "Ready-made designs", href: "/templates", icon: "layout" },
        ],
      },
      {
        title: "Grow",
        items: [
          { label: "App Store", line: "Apps built in", href: "/app-store", icon: "grid" },
          { label: "Mobile app", line: "Orders on your phone", href: "/mobile-app", icon: "phone" },
          { label: "Domains", line: "Find or connect a name", href: "/domains", icon: "link" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/fashion",
    groups: [
      {
        title: "By business",
        items: [
          { label: "Fashion", line: "Clothes and accessories", href: "/solutions/fashion", icon: "shirt" },
          { label: "Food and drink", line: "Cafes, bakeries, delis", href: "/solutions/food-and-drink", icon: "cup" },
          { label: "Beauty", line: "Salons and cosmetics", href: "/solutions/beauty", icon: "spark" },
          { label: "Wholesale", line: "Sell to other businesses", href: "/solutions/wholesale", icon: "box" },
        ],
      },
      {
        title: "By need",
        items: [
          { label: "Shipping", line: "Delivery zones, labels and tracking", href: "/solutions/shipping", icon: "truck" },
          { label: "Invoicing", line: "Invoices and pay now links", href: "/solutions/invoicing", icon: "receipt" },
          { label: "Stock", line: "Stock across your online shop", href: "/solutions/stock", icon: "boxes" },
          { label: "Trade and B2B", line: "Trade prices, bulk orders and reps", href: "/solutions/trade-b2b", icon: "building" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/services",
    groups: [
      {
        title: "Services",
        cols: 2,
        more: { label: "All services", href: "/services" },
        items: [
          { label: "Web Design", line: "Clean, easy-to-use designs", href: "/services/web-design", icon: "pen" },
          { label: "Web Development", line: "Fast, secure websites", href: "/services/web-development", icon: "code" },
          { label: "App Development", line: "iPhone and Android apps", href: "/services/app-development", icon: "phone" },
          { label: "Ecommerce Development", line: "Custom online shop features", href: "/services/ecommerce-development", icon: "cart" },
          { label: "Website Integrations", line: "Payments, accounting and CRM", href: "/services/website-integrations", icon: "plug" },
          { label: "SEO Services", line: "Get found on Google", href: "/services/seo-services", icon: "search" },
          { label: "Digital Marketing", line: "Ads, social and email", href: "/services/digital-marketing", icon: "megaphone" },
          { label: "Marketplace Listing", line: "Amazon, eBay, Etsy, TikTok Shop", href: "/services/marketplace-listing", icon: "store" },
        ],
      },
      {
        title: "Migration",
        more: { label: "How migration works", href: "/migrate" },
        items: [
          { label: "Migrate from Shopify", line: "Products, customers and orders", href: "/migrate/shopify", icon: "move" },
          { label: "Migrate from Wix", line: "Products, pages and customers", href: "/migrate/wix", icon: "move" },
          { label: "Migrate from WooCommerce", line: "Products, customers and orders", href: "/migrate/woocommerce", icon: "move" },
          { label: "Migrate from OpenCart", line: "Products, customers and orders", href: "/migrate/opencart", icon: "move" },
        ],
      },
    ],
    hideCard: true,
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
          { label: "FAQs", line: "Answers to common questions", href: "/faqs", icon: "help" },
          { label: "Chat with us", line: "Talk to the team", href: "/contact", icon: "chat" },
          { label: "Become a partner", line: "Earn by recommending TWCarts", href: "/partners", icon: "building" },
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
    title: "Ecommerce Website",
    links: [
      { label: "Features", href: "/online-shop" },
      { label: "Shop builder", href: "/online-shop" },
      { label: "Templates", href: "/templates" },
      { label: "App Store", href: "/app-store" },
      { label: "Domains", href: "/domains" },
      { label: "Mobile app", href: "/mobile-app" },
    ],
  },
  {
    title: "Business Website",
    links: [
      { label: "Website builder", href: "/websites" },
      { label: "Templates", href: "/templates" },
      { label: "Blog", href: "/blog" },
      { label: "Custom domain", href: "/domains" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { label: "Plans", href: "/pricing" },
      { label: "Compare plans", href: "/pricing" },
      { label: "3 day free trial", href: "/pricing" },
      { label: "Move from Shopify", href: "/migrate/shopify" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help centre", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact us", href: "/contact" },
      { label: "Chat with us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Partner Program", href: "/partners" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];
