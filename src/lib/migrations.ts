// src/lib/migrations.ts
/** "Migrate from …" pages (/migrate/[platform]). Shown under Migration in the Resources menu. */

export interface Migration {
  slug: string;
  name: string;
  /** What we bring across, beyond the basics every platform has. */
  extra: string;
}

export const MIGRATIONS: Migration[] = [
  { slug: "shopify", name: "Shopify", extra: "Products with variants, collections, customers, orders and most review apps" },
  { slug: "wix", name: "Wix", extra: "Store products, pages, blog posts, customers and orders" },
  { slug: "woocommerce", name: "WooCommerce", extra: "Products and variations, categories, customers, orders and reviews" },
  { slug: "opencart", name: "OpenCart", extra: "Products and options, categories, customers and orders" },
];

export const migrationBySlug = (slug: string) => MIGRATIONS.find((m) => m.slug === slug) ?? null;
