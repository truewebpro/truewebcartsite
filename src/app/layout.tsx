import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./home/home.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://truewebcartsite-production.up.railway.app"),
  title: {
    default: "TWCarts: open your online shop today, 3 days free",
    template: "%s | TWCarts",
  },
  description:
    "Online shops and websites for businesses anywhere, with payments, delivery labels and an AI assistant built in. 3 days free, no credit card required.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050f24" },
  ],
};

/** Sets the saved theme before the page paints, so there is no flash. Light is the default. */
/** A ?theme=dark or ?theme=light link shows that theme without saving it (handy for sharing previews). */
const THEME_SCRIPT = `try{var q=new URLSearchParams(location.search).get("theme");var t=q||localStorage.getItem("tw-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${jakarta.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
