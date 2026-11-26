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
  /** The 3 key points shown on the card. The full list opens under "See all features". */
  keys: [string, string, string];
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
    keys: ["Products with variants, options and photos", "Collections that fill themselves", "Import from a spreadsheet or Shopify"],
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
    keys: ["Guest checkout, account optional", "Card, PayPal and other payment providers", "Discount codes and store credit"],
    items: [
      f("Guest checkout, account optional"),
      f("Find address as you type"),
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
    text: "Set delivery by country or postcode, with labels and tracking from your Sendcloud account.",
    keys: ["Delivery by country or postcode", "Free delivery over a set amount", "Labels and tracking with Sendcloud"],
    items: [
      f("Delivery zones by country or postcode"),
      f("Flat or price-based rates"),
      f("Free delivery over a set amount"),
      f("Click and Collect from your locations"),
      f("Tracking links on every order"),
      a("Sendcloud labels for your carriers"),
    ],
  },
  {
    id: "orders",
    title: "Orders",
    text: "Every order sits in exactly one stage, so your team always knows what to do next.",
    keys: ["Clear stages from Pending to Delivered", "Pick lists, packing slips and invoices", "Abandoned carts and checkouts"],
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
    keys: ["Loyalty points and rewards", "Reviews with photos", "Back in stock alerts"],
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
    title: "Trade and sales reps",
    text: "Sell to trade customers on the same online shop, at their own prices.",
    keys: ["Trade accounts with their own prices", "Bulk order form", "Sales reps with commission"],
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
    text: "Your shop assistant answers customers day and night, and your team picks up when a person is needed.",
    keys: ["Answers customers day and night", "Suggests products and adds them to the cart", "Hand over to your team any time"],
    items: [
      a("Answers, product picks and add to cart"),
      a("Discount codes only when a customer hesitates"),
      a("Voice questions"),
      f("Inbox for website chats with saved replies"),
      f("Take over a chat or hand it back"),
      f("Ask TrueWebCart: help inside your admin"),
      soon("Email, WhatsApp and Messenger in the Inbox"),
    ],
  },
  {
    id: "design",
    title: "Shop design",
    text: "Change how your online shop looks without a developer.",
    keys: ["Templates and ready sections", "Live preview as you edit", "Your colours, fonts and menus"],
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
    text: "Get found on Google and get reviewed.",
    keys: ["Discount codes with rules", "Page titles and text for Google", "Google Analytics, Merchant Center and Ads"],
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
    text: "Know how your online shop is doing and let the right people in.",
    keys: ["Live sales, orders and visitors", "Reports to CSV and PDF", "Admin app for iPhone and Android"],
    items: [
      f("Live sales, orders and visitors on your admin home"),
      f("Reports with CSV and PDF export"),
      f("Staff and permissions"),
      f("Admin app for iPhone and Android"),
      a("Emails through Mailtrap"),
    ],
  },
];


/** Business Website page: short feature cards (3 key points, the full list under "See all"). */
export const WEBSITE_GROUPS: (Omit<FeatureGroup, "keys"> & { keys: string[] })[] = [
  {
    id: "pages",
    title: "Pages and design",
    text: "Build each page from ready sections and see it exactly as visitors will.",
    keys: ["Ready sections for every page", "See it exactly as visitors will", "Change template, keep your content"],
    items: [
      f("Pages built from ready sections"),
      f("Press + between sections to add one"),
      f("See each page exactly as visitors will"),
      f("Hero, image with text and info strip sections"),
      f("Countdown and newsletter sections"),
      f("Change template any time"),
      f("Your old design is saved so you can go back"),
    ],
  },
  {
    id: "enquiries",
    title: "Forms and Inbox",
    text: "Contact and enquiry forms arrive in the Inbox, where your team replies.",
    keys: ["Contact and enquiry forms", "Messages arrive in your Inbox", "Your team replies from one place"],
    items: [
      f("Contact and enquiry forms"),
      f("Add a form to any page"),
      f("Messages arrive in your Inbox"),
      f("Your team replies from one place"),
    ],
  },
  {
    id: "visit",
    title: "Bookings, hours and map",
    text: "Visitors ask for a date and time, and see when you are open and where to find you.",
    keys: ["Booking requests for a date and time", "Opening hours with special dates", "A map to find you"],
    items: [
      f("Booking requests for a date and time"),
      f("You confirm bookings by email"),
      f("Set opening hours once"),
      f("Special dates, like holidays"),
      f("A map to find you"),
      f("Info strip for key details"),
    ],
  },
  {
    id: "show",
    title: "Menus, photos and reviews",
    text: "Show your menu, your work and what your customers say.",
    keys: ["Price list or menu", "Photo galleries and photo cards", "Customer reviews"],
    items: [
      f("Price list or menu"),
      f("Easy to keep up to date"),
      f("Photo galleries"),
      f("Photo cards"),
      f("Customer reviews"),
      soon("Google Reviews"),
    ],
  },
  {
    id: "blog",
    title: "Blog and search",
    text: "Post news and articles, each with its own page title for search.",
    keys: ["News and articles", "Page titles for search", "Blog posts section on any page"],
    items: [
      f("News and articles"),
      f("Page titles for search"),
      f("Blog posts section on any page"),
      f("Newsletter sign-up section"),
      f("Your own domain"),
    ],
  },
  {
    id: "ai",
    title: "AI assistant",
    text: "Your assistant answers questions about your business and takes details for you.",
    keys: ["Answers questions about your business", "Takes visitor details for you", "Available day and night"],
    items: [],
  },
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
  { q: "Is there a free trial?", a: "Yes. Every plan starts with 3 days free and no credit card. Pick a plan any time to keep your online shop or website." },
  { q: "Can I change plan later?", a: "Yes. When you upgrade you only pay the difference for the rest of the period. Add-ons your new plan includes are removed and credited." },
  { q: "What if a payment fails?", a: "Your online shop stays open. You have 7 days to update your card before paid apps switch off. Nothing is deleted." },
  { q: "Can I cancel?", a: "Yes. Your online shop stays open until the end of the paid period and your data is kept for 90 days." },
  { q: "How do I pay?", a: "By card through Stripe. Your card details never reach us. Bills and invoices are in your admin." },
  { q: "Who sets up my online shop?", a: "You can, in about 5 minutes. Or we build it for you behind a password page and hand it over." },
];
