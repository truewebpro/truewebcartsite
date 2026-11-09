// src/app/site/SiteFooter.tsx
import Link from "next/link";
import { ADMIN_URL } from "./links";

const PLATFORM = [
  { label: "Online shop", href: "/online-shop" },
  { label: "Websites", href: "/websites" },
  { label: "Templates", href: "/websites#templates" },
  { label: "App Store", href: "/pricing#apps" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY = [
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/contact#faq" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy text-[#D5DEEE]">
      <div className="max-w-[1240px] mx-auto px-6 pt-16 pb-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] text-[15px]">
        <div>
          <p className="font-display font-bold text-xl text-white">Trueweb Cart</p>
          <p className="mt-2.5 leading-relaxed">Online shops and business websites for UK businesses.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-white">Platform</p>
          {PLATFORM.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-white">Company</p>
          {COMPANY.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
          <a href={ADMIN_URL} className="hover:text-white">
            Log in
          </a>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto px-6 py-6 border-t border-[#2B5296] text-[13px]">
        © {new Date().getFullYear()} Trueweb Cart
      </div>
    </footer>
  );
}
