export interface Service {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  features: string[];
  icon: string;
}

/**
 * The services TrueWeb Pro offers, in the order they show in the Resources menu and on /services.
 * This list decides which services exist and their order. If the `services` table has a published row
 * with the same slug, that row's text is used instead, so wording can still be edited in the database.
 * Old slugs (web-design-development, custom-software-web-apps, seo-digital-marketing) redirect to the
 * new pages in next.config.ts.
 */
export const SERVICES_SEED: Service[] = [
  {
    slug: "web-design",
    title: "Web Design",
    tagline: "Clean designs that are easy to use and look like your brand.",
    summary: "Website and online shop designs that are clear, quick to use and work on every screen.",
    description:
      "We design pages around what your customers came to do: find something, trust you and get in touch or buy. You see the design before anything is built, and every page is made for phones first.",
    features: [
      "Designs made for your brand, not a recycled template",
      "Phone, tablet and desktop layouts",
      "Clear pages that lead to enquiries or sales",
      "You approve the design before we build",
      "Handed over ready to build in TWCarts or custom code",
    ],
    icon: "PenTool",
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, secure websites built to grow with you.",
    summary: "Custom websites and web apps that load quickly, rank well and are easy to update.",
    description:
      "We build marketing sites, business websites and web apps that are fast, secure and easy for your team to update. Pages are built so search engines can read them, and you can change content without calling a developer.",
    features: [
      "Fast pages and good Core Web Vitals",
      "Secure hosting with a padlock on every page",
      "Search-friendly page structure",
      "Easy content updates after launch",
      "Customer portals, dashboards and booking tools when you need them",
    ],
    icon: "Code2",
  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "iPhone and Android apps for your customers or your team.",
    summary: "Mobile apps that let customers order, book or stay in touch, and tools that help your staff on the go.",
    description:
      "We build apps for iPhone and Android that connect to your online shop or systems: ordering and loyalty apps for customers, or simple tools for your team. We take care of the App Store and Google Play listings too.",
    features: [
      "iPhone and Android from one build",
      "Connected to your online shop, stock and customers",
      "Push notifications and sign-in",
      "App Store and Google Play listing",
      "Updates and support after launch",
    ],
    icon: "Smartphone",
  },
  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    tagline: "Online shops built to sell, with the features you need.",
    summary: "Online shops on TWCarts or fully custom, with checkout, payments and the integrations behind them.",
    description:
      "From a first online shop to custom features on top of TWCarts, we build ecommerce that is simple for customers to buy from and simple for your team to run. We set up payments and delivery, and connect your shop to the systems behind it.",
    features: [
      "Online shops on TWCarts or custom-built",
      "Custom features, apps and checkout changes",
      "Payments, delivery and email set up",
      "Product and customer data moved across",
      "Faster checkout and more sales",
    ],
    icon: "ShoppingCart",
  },
  {
    slug: "website-integrations",
    title: "Website Integrations",
    tagline: "Connect your website to the tools you already use.",
    summary: "Payments, accounting, CRM, delivery and stock systems connected to your website or online shop.",
    description:
      "We connect your website or online shop to the rest of your business, so orders, stock, customers and invoices move on their own instead of being typed in twice. We work with ready-made connections or build one through the tool's API.",
    features: [
      "Payment providers and pay by link",
      "Accounting and invoicing tools",
      "CRM and email marketing",
      "Couriers, labels and tracking",
      "Stock and warehouse systems",
    ],
    icon: "Plug",
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    tagline: "Be found by the people already searching for what you sell.",
    summary: "Technical, on-page and local SEO that brings steady, relevant visitors from Google.",
    description:
      "We find what is holding your site back in search and fix it: technical problems, page titles and text, structured data, speed and internal links. Then we focus on the pages most likely to move your rankings and report what changed.",
    features: [
      "Technical SEO audit and fixes",
      "Keyword research and page optimisation",
      "Product, category and service page text",
      "Local SEO and Google Business Profile",
      "Monthly reporting from Search Console",
    ],
    icon: "Search",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Ads, social and email that bring the right visitors.",
    summary: "Google and social ads, email campaigns and content that turn visitors into customers.",
    description:
      "We plan and run marketing that pays for itself: Google Shopping and search ads, social ads, and email flows that bring customers back. You get clear reporting on what each pound brings in.",
    features: [
      "Google Shopping and search ads",
      "Facebook, Instagram and TikTok ads",
      "Email flows and campaigns",
      "Content and social posts",
      "Clear monthly reports on sales and cost",
    ],
    icon: "Megaphone",
  },
  {
    slug: "marketplace-listing",
    title: "Marketplace Listing",
    tagline: "Sell on Amazon, eBay, Etsy and TikTok Shop.",
    summary: "Marketplace accounts set up and listings written so your products sell where people already shop.",
    description:
      "We set up your marketplace accounts, write and optimise your listings, and keep stock and prices in step with your online shop, so you can sell in more places without more admin.",
    features: [
      "Amazon, eBay, Etsy and TikTok Shop set-up",
      "Listing titles, photos and descriptions that sell",
      "Stock and prices kept in step with your shop",
      "Category and keyword research",
      "Help with reviews and account health",
    ],
    icon: "Store",
  },
  {
    slug: "hosting-maintenance-support",
    title: "Hosting, Maintenance and Support",
    tagline: "Reliable hosting and a team you can actually reach.",
    summary: "Managed hosting, updates, backups, monitoring and ongoing support after launch.",
    description:
      "Launching is the start, not the finish. We host and look after your site or app, keeping software updated, backed up and monitored, and we are on hand for changes, fixes and questions when you need them.",
    features: [
      "Managed hosting and deployments",
      "Security updates and regular backups",
      "Uptime and error monitoring",
      "Small changes and fixes on request",
      "A named contact, not a ticket queue",
    ],
    icon: "LifeBuoy",
  },
];

/** "How we work" steps on /services and every service page. */
export const HOW_WE_WORK = [
  { t: "Tell us the problem", d: "A short call or message about what you want to achieve." },
  { t: "Get a fixed quote", d: "A clear price and timeline, so there are no surprises." },
  { t: "We build it", d: "You see progress early and often, and say what to change." },
  { t: "We look after it", d: "Hosting, fixes and changes from a named contact." },
];
