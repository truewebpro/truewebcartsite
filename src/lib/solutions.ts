// src/lib/solutions.ts
/** Solutions pages (/solutions/[slug]): by kind of business and by need. Shown in the Solutions menu. */

export interface SolutionPoint {
  title: string;
  text: string;
}

export interface Solution {
  slug: string;
  group: "business" | "need";
  title: string;
  /** One short line for the menu. */
  line: string;
  heading: string;
  lead: string;
  points: SolutionPoint[];
  /** Apps or features worth switching on, shown as chips. */
  apps: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "fashion",
    group: "business",
    title: "Fashion",
    line: "Clothes and accessories",
    heading: "An online shop made for fashion.",
    lead: "Sizes and colours, lookbook pages, and returns that are easy to handle. Sell clothes and accessories without the fuss.",
    points: [
      { title: "Sizes and colours", text: "Every product can have size and colour options, each with its own stock and photos." },
      { title: "Collections that fill themselves", text: "New in, sale and by brand collections update as you add products." },
      { title: "Pre-order new drops", text: "Take orders before stock arrives and send them when it lands." },
      { title: "Reviews with photos", text: "Let customers show how items look and fit." },
      { title: "Back in stock alerts", text: "Customers ask to be told when a size is back, and the email goes out by itself." },
      { title: "Welcome codes", text: "A sign-up pop-up turns visitors into email subscribers with a welcome code." },
    ],
    apps: ["Product reviews", "Back in stock", "Pre-order", "Loyalty and rewards", "Sign-up pop-up"],
  },
  {
    slug: "food-and-drink",
    group: "business",
    title: "Food and drink",
    line: "Cafes, bakeries, delis",
    heading: "Sell food and drink online, local or nationwide.",
    lead: "Click and Collect, local delivery by postcode and subscriptions for regulars. Built for cafes, bakeries, delis and drinks brands.",
    points: [
      { title: "Click and Collect", text: "Customers order online and pick up from your shop." },
      { title: "Local delivery by postcode", text: "Deliver to nearby postcodes at your own prices and times." },
      { title: "Subscriptions", text: "Coffee, boxes and regular orders on repeat, paid automatically." },
      { title: "Age check", text: "Check customers are 18 or over before they buy alcohol." },
      { title: "Menus and price lists", text: "Show what you sell clearly, with allergens and descriptions." },
      { title: "Offers and codes", text: "Discount codes with rules, and store credit for regulars." },
    ],
    apps: ["Subscriptions", "Age check", "Delivery protection", "Loyalty and rewards"],
  },
  {
    slug: "beauty",
    group: "business",
    title: "Beauty",
    line: "Salons and cosmetics",
    heading: "For beauty brands and salons.",
    lead: "Sell products online, take booking requests for treatments and bring customers back with rewards.",
    points: [
      { title: "Sell your products", text: "Skincare, cosmetics and gift sets with shades, sizes and bundles." },
      { title: "Booking requests", text: "Customers ask for a date and time for a treatment, and you confirm by email." },
      { title: "Loyalty and rewards", text: "Points on every order and visit keep customers coming back." },
      { title: "Subscriptions", text: "Refills and favourites delivered on a schedule." },
      { title: "Reviews with photos", text: "Before and after photos build trust with new customers." },
      { title: "AI shop assistant", text: "Answers questions about products and ingredients day and night." },
    ],
    apps: ["Loyalty and rewards", "Subscriptions", "Product reviews", "Shop assistant"],
  },
  {
    slug: "wholesale",
    group: "business",
    title: "Wholesale",
    line: "Sell to other businesses",
    heading: "Sell to trade customers, on the same online shop.",
    lead: "Trade accounts with their own prices, bulk ordering and payment on account, alongside your retail customers.",
    points: [
      { title: "Trade accounts", text: "Businesses apply for an account and you approve them." },
      { title: "Their own prices", text: "Set prices per company, per product and per quantity." },
      { title: "Hide prices until signed in", text: "Retail visitors see your shop, trade prices stay private." },
      { title: "Bulk order form", text: "Trade customers order many products in one go." },
      { title: "Pay on account", text: "Give trusted customers credit limits and payment terms." },
      { title: "Sales reps", text: "Reps order for their customers and earn commission." },
    ],
    apps: ["Trade accounts", "Bulk order", "Sales reps"],
  },
  {
    slug: "shipping",
    group: "need",
    title: "Shipping",
    line: "Delivery zones, labels and tracking",
    heading: "Delivery, labels and tracking in one place.",
    lead: "Set delivery by country or postcode, print labels from your orders and send tracking to customers automatically.",
    points: [
      { title: "Delivery zones", text: "Set rates by country or postcode, flat or by order value." },
      { title: "Free delivery over a set amount", text: "Encourage bigger orders with a free delivery threshold." },
      { title: "Labels from your orders", text: "Print labels for your carriers through Sendcloud." },
      { title: "Tracking for customers", text: "Every order gets a tracking link by email." },
      { title: "Click and Collect", text: "Let customers pick up from your locations." },
      { title: "Delivery protection", text: "Offer cover for lost and damaged parcels at checkout." },
    ],
    apps: ["Sendcloud", "Delivery protection"],
  },
  {
    slug: "invoicing",
    group: "need",
    title: "Invoicing",
    line: "Invoices and pay now links",
    heading: "Invoices and payments without the paperwork.",
    lead: "Invoices made for every order, pay now links by email and payment on account for trade customers.",
    points: [
      { title: "Invoices for every order", text: "Create PDF invoices automatically, with your logo and VAT details." },
      { title: "Pay now links", text: "Send a link by email and get paid by card." },
      { title: "Draft orders", text: "Build an order for a customer and send it for payment." },
      { title: "Pay on account", text: "Trade customers pay later within their credit limit." },
      { title: "Prices with or without VAT", text: "Show prices the way your customers expect." },
      { title: "Reports to CSV and PDF", text: "Export sales and payments for your accountant." },
    ],
    apps: ["Trade accounts"],
  },
  {
    slug: "stock",
    group: "need",
    title: "Stock",
    line: "Stock across your shop and channels",
    heading: "Know what you have, everywhere you sell.",
    lead: "Stock for every size and colour, low stock warnings and back in stock alerts, updated as you sell.",
    points: [
      { title: "Stock per variant", text: "Track every size, colour and option on its own." },
      { title: "Updated as you sell", text: "Stock goes down with each order and back up with each refund." },
      { title: "Import and export", text: "Update stock in bulk with a spreadsheet." },
      { title: "Back in stock alerts", text: "Customers get an email when an item returns." },
      { title: "Pre-order", text: "Keep selling while new stock is on the way." },
      { title: "Scan barcodes", text: "Find a product and update stock with your phone camera." },
    ],
    apps: ["Back in stock", "Pre-order"],
  },
  {
    slug: "trade-b2b",
    group: "need",
    title: "Trade and B2B",
    line: "Trade prices, bulk orders and reps",
    heading: "Everything you need to sell to businesses.",
    lead: "Trade prices, bulk ordering, payment on account and sales reps, all inside your online shop.",
    points: [
      { title: "Company prices", text: "Set prices per company, product and quantity." },
      { title: "Approve who can buy", text: "Businesses apply and you approve their trade account." },
      { title: "Bulk order form", text: "A quick order form for repeat trade customers." },
      { title: "Credit limits", text: "Let trusted customers pay on account." },
      { title: "Sales reps with commission", text: "Reps place orders for customers and earn commission." },
      { title: "Price proposals", text: "Reps suggest prices and you approve them." },
    ],
    apps: ["Trade accounts", "Bulk order", "Sales reps"],
  },
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug) ?? null;
