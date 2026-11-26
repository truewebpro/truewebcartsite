// src/lib/faqs.ts
/** Questions on the FAQs page (/faqs), grouped. Plan questions come from PLAN_FAQ so they stay in one place. */
import { PLAN_FAQ } from "./features";

export interface FaqGroup {
  id: string;
  title: string;
  items: { q: string; a: string }[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      { q: "How does the 3 day free trial work?", a: "Sign up with your email, build your online shop and add your products. After 3 days, pick a plan to keep selling. Everything you made stays saved." },
      { q: "Do I need a credit card to start?", a: "No. You only add payment details when you choose a plan." },
      { q: "What is the difference between an Ecommerce Website and a Business Website?", a: "An Ecommerce Website sells products online with a cart, payments and delivery. A Business Website shows your business and takes enquiries and booking requests, with no online selling." },
    ],
  },
  { id: "plans", title: "Plans and billing", items: PLAN_FAQ },
  {
    id: "selling",
    title: "Selling",
    items: [
      { q: "Can I sell to customers anywhere?", a: "Yes. Customers anywhere can visit your online shop and buy. You choose which countries you deliver to." },
      { q: "Can I use my own domain?", a: "Yes. Every plan includes a custom domain, so your online shop can live at your own address." },
      { q: "Is there a phone app?", a: "Yes. The TWCarts app for iPhone and Android lets you see orders, reply to customers and print labels on the go." },
    ],
  },
  {
    id: "moving",
    title: "Moving to TWCarts",
    items: [
      { q: "Can I move my online shop from Shopify, Wix, WooCommerce or OpenCart?", a: "Yes. We move your products, customers and orders for you, and your old shop stays open until you switch." },
      { q: "Will I lose my Google ranking?", a: "We redirect your old links to the new pages, so search engines and customers find you in the same places." },
    ],
  },
];
