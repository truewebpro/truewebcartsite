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
 * Starter content. On first run these rows are inserted into the `services`
 * table (only if the table is empty). After that, edit the rows in MySQL , 
 * this file is also the fallback shown if the database is unreachable.
 */
export const SERVICES_SEED: Service[] = [
  {
    slug: "web-design-development",
    title: "Web Design & Development",
    tagline: "Fast, clean websites that turn visitors into enquiries.",
    summary:
      "Custom-designed, mobile-first websites built for speed, clarity and search visibility.",
    description:
      "We design and build marketing sites and business websites around how your customers actually look for you. Every page is mobile-first, quick to load and structured so search engines can read it, and you get a site you can update without calling a developer.",
    features: [
      "Custom design, no recycled templates",
      "Mobile-first, responsive layouts",
      "Performance and Core Web Vitals focus",
      "Search-friendly page structure",
      "Easy content updates after launch",
    ],
    icon: "Globe",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    tagline: "Online stores built to sell, on Shopify or fully custom.",
    summary:
      "Shopify builds, custom storefronts, product migration and integrations with the tools you already use.",
    description:
      "From a first Shopify store to a custom storefront with its own admin, we build e-commerce that is simple for customers to buy from and simple for your team to run. We handle product and customer migration, shipping and payment setup, and connect your store to the systems behind it.",
    features: [
      "Shopify theme and store builds",
      "Custom storefronts and admin dashboards",
      "Product and customer data migration",
      "Shipping, payments and email integrations",
      "Checkout and conversion improvements",
    ],
    icon: "ShoppingCart",
  },
  {
    slug: "custom-software-web-apps",
    title: "Custom Software & Web Apps",
    tagline: "Internal tools and customer portals shaped around your process.",
    summary:
      "Bespoke web applications, portals and automations that replace spreadsheets and manual work.",
    description:
      "When off-the-shelf software doesn't fit, we build the tool that does: customer portals, internal dashboards, booking and quoting systems, and automations that remove repetitive admin. We start small, ship something usable quickly, and grow it with you.",
    features: [
      "Customer and B2B portals",
      "Internal dashboards and reporting",
      "Workflow automation and integrations",
      "API design and third-party connections",
      "Iterative delivery, usable early, improved often",
    ],
    icon: "Code2",
  },
  {
    slug: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    tagline: "Be found by the people already searching for what you sell.",
    summary:
      "Technical SEO, content and on-page optimisation to bring in steady, relevant search traffic.",
    description:
      "We improve how your site is found and how well it converts. That starts with a technical and content audit, then focuses on the fixes and pages most likely to move rankings, product and category copy, structured data, internal linking and speed.",
    features: [
      "Technical SEO audits and fixes",
      "Keyword research and page-level optimisation",
      "Product, category and service page copy",
      "Structured data and rich results",
      "Search Console and analytics reporting",
    ],
    icon: "TrendingUp",
  },
  {
    slug: "hosting-maintenance-support",
    title: "Hosting, Maintenance & Support",
    tagline: "Reliable hosting and a team you can actually reach.",
    summary:
      "Managed hosting, updates, backups, monitoring and ongoing support after launch.",
    description:
      "Launching is the start, not the finish. We host and look after your site or app, keeping software updated, backed up and monitored, and we're on hand for changes, fixes and questions when you need them.",
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
