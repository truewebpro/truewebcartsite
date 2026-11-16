import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://truewebcartsite-production.up.railway.app"),
  title: {
    default: "Trueweb Cart: online shops and business websites, UK",
    template: "%s | Trueweb Cart",
  },
  description:
    "Your own online shop or business website with payments, delivery, B2B trade, an AI shop assistant and 30+ apps. Built and supported in the UK.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
