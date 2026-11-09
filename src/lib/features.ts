// src/lib/features.ts
/** Feature lists for the Online shop and Websites pages. */

export interface FeatureItem {
  text: string;
  /** Switched on from the App Store. */
  app?: boolean;
  soon?: boolean;
}

export interface FeatureGroup {
  id: string;
  title: string;
  text: string;
  items: FeatureItem[];
}

const f = (text: string): FeatureItem => ({ text });
const a = (text: string): FeatureItem => ({ text, app: true });
const soon = (text: string): FeatureItem => ({ text, soon: true });

export const SHOP_FEATURES: FeatureGroup[] = [
  {
    id: "catalogue",
    title: "Products and catalogue",
    text: "Add products your way: by hand, by spreadsheet or straight from Shopify.",
    items: [
      f("Products with variants, options and photos"),
      f("Brands, types and tags"),
      f("Collections that fill themselves from brand, type and tags"),
      f("Bundles, offers and add-ons"),
      f("Quantity price breaks"),
      f("Publish dates and duplicate product"),
      f("Import and export by spreadsheet"),
      f("Media library for photos and videos"),
      a("Pre-order"),
      a("Write descriptions with AI"),
    ],
  },
  {
    id: "checkout",
    title: "Checkout and payments",
    text: "A quick checkout for guests and returning customers, with the payment provider you already use.",
    items: [
      f("Guest checkout, account optional"),
      f("Find address by house number and postcode"),
      f("Worldpay, Viva Wallet, CyberSource, PayPal and Stripe"),
      f("Bank transfer orders"),
      f("Refunds from the admin"),
      f("Pay now links by email"),
      f("Discount codes and store credit"),
      f("Prices with or without VAT"),
      a("Age check with photo ID"),
      a("Delivery protection"),
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    text: "UK delivery set up by postcode, with labels and tracking from your Sendcloud account.",
    items: [
      f("Delivery zones by postcode"),
      f("Flat or price-based rates"),
      f("Free delivery over a set amount"),
      f("Click and Collect from your locations"),
      f("Tracking links on every order"),
      a("Sendcloud labels for Royal Mail and DPD"),
    ],
  },
  {
    id: "orders",
    title: "Orders",
    text: "Every order sits in exactly one stage, so your team always knows what to do next.",
    items: [
      f("Stages from Pending to Delivered"),
      f("Draft orders"),
      f("Abandoned carts and checkouts"),
      f("Pick lists, packing slips and invoices as PDF"),
      f("Batch printing"),
      f("Your own order number prefix"),
      a("Order risk checks"),
    ],
  },
  {
    id: "customers",
    title: "Customers and loyalty",
    text: "Bring customers back with rewards, reviews and timely emails.",
    items: [
      f("Customer accounts with order history and invoices"),
      f("Email sign-ups saved as customers"),
      a("Sign-up pop-up with welcome codes"),
      a("Loyalty points and rewards"),
      a("Product reviews with photos"),
      a("Back in stock alerts"),
      a("Price match requests"),
      a("Subscriptions"),
      a("VIP access links"),
    ],
  },
  {
    id: "b2b",
    title: "B2B trade and sales reps",
    text: "Sell to trade customers on the same shop, at their own prices.",
    items: [
      a("Trade account applications"),
      a("Company prices per product and quantity"),
      a("Hide prices until signed in"),
      a("Bulk order form"),
      a("Pay on account with credit limits"),
      a("Sales rep portal: order for customers"),
      a("Rep commission"),
      a("Price proposals approved by the owner"),
    ],
  },
  {
    id: "ai",
    title: "AI assistant and Inbox",
    text: "Ava answers customers day and night, and your team picks up when a person is needed.",
    items: [
      a("Ava: answers, product picks, add to cart"),
      a("Discount codes only when a customer hesitates"),
      a("Voice questions"),
      f("Inbox for website chats with saved replies"),
      f("Take over a chat or hand it back to Ava"),
      f("Ask TrueWebCart: help inside your admin"),
      a("Claude connector for content"),
      soon("Email, WhatsApp and Messenger in the Inbox"),
    ],
  },
  {
    id: "design",
    title: "Shop design",
    text: "Change how your shop looks without a developer.",
    items: [
      f("Templates from the Store Builder"),
      f("Home page built from sections, with live preview"),
      f("Header and footer styles"),
      f("Theme colours, fonts and corner style"),
      f("Search panel with popular searches and brands"),
      f("Announcement bar and menus"),
      f("Blog, pages and policies"),
      f("Password page while you build"),
    ],
  },
  {
    id: "marketing",
    title: "Marketing and Google",
    text: "Get found and get reviewed.",
    items: [
      f("Discount codes with rules"),
      f("Page titles and meta text for every page"),
      a("Google Search Console, Analytics, Merchant Center and Ads"),
      soon("Google Reviews"),
      soon("Trustpilot"),
      soon("Judge.me review import"),
    ],
  },
  {
    id: "admin",
    title: "Admin, reports and phone app",
    text: "Know how the shop is doing and let the right people in.",
    items: [
      f("Live sales, orders and visitors on your admin home"),
      f("Reports with CSV and PDF export"),
      f("Staff and permissions"),
      f("Admin app for iPhone and Android"),
      a("Shopify import: products, customers, orders and more"),
      a("Emails through Mailtrap"),
    ],
  },
];

export const WEBSITE_FEATURES = [
  { title: "Pages built with sections", text: "Build each page from ready sections and see it exactly as visitors will." },
  { title: "Forms to your Inbox", text: "Contact and enquiry forms arrive in the Inbox, where your team replies." },
  { title: "Booking requests", text: "Visitors ask for a date and time, and you confirm by email." },
  { title: "Opening hours and map", text: "Set opening hours once, with special dates, and show them with a map." },
  { title: "Price list and menu", text: "Show a menu or price list that is easy to keep up to date." },
  { title: "Photo gallery and cards", text: "Show your work, rooms or dishes in galleries and photo cards." },
  { title: "Reviews", text: "Show what your customers say, with Google Reviews coming soon." },
  { title: "Blog and news", text: "Post news and articles, each with its own page title for search." },
  { title: "AI assistant", text: "Ava answers questions about your business and takes details for you." },
];

export const SECTION_TYPES = [
  "Hero", "Image with text", "Photo cards", "Photo gallery", "Price list", "Form",
  "Opening hours and map", "Info strip", "Reviews", "Newsletter", "Blog posts",
  "Countdown", "Featured products", "Collections",
];

export const TEMPLATES = [
  { name: "Marisol", kind: "Restaurant website", price: "Free", tone: "bg-[#E9E3D6]" },
];

export const GO_LIVE_STEPS = [
  { title: "We set it up", text: "We create your site and apply your template while it stays behind a password page." },
  { title: "You add your content", text: "Upload your logo, photos and text, or let us do it for you." },
  { title: "Choose a plan", text: "Pick monthly or yearly and pay securely with Stripe." },
  { title: "Go live", text: "Your site opens on your own domain as soon as the plan is paid." },
];

export const PLAN_FAQ = [
  { q: "Is there a free trial?", a: "Apps have free trials. When a trial ends the app carries on as a paid add-on, and we remind you 3 days before." },
  { q: "Can I change plan later?", a: "Yes. When you upgrade you only pay the difference for the rest of the period. Add-ons your new plan includes are removed and credited." },
  { q: "What if a payment fails?", a: "Your shop stays open. You have 7 days to update your card before paid apps switch off. Nothing is deleted." },
  { q: "Can I cancel?", a: "Yes. Your shop stays open until the end of the paid period and your data is kept for 90 days." },
  { q: "How do I pay?", a: "By card through Stripe. Your card details never reach us. Bills and invoices are in your admin." },
  { q: "Who sets up my shop?", a: "We do. We build it behind a password page, hand it over to you, and it opens when you choose a plan." },
];
