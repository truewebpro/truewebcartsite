// src/proxy.ts
// www.truewebcart.com is the main address. Visitors who open twcarts.com (or www.twcarts.com) are sent,
// with a permanent redirect, to the same page on www.truewebcart.com, so Google sees one site.
// Other twcarts.com addresses (admin, super, shop addresses) are separate apps and never reach this site.
// The bare truewebcart.com is sent to www by CloudFront on AWS, but it is handled here too in case it arrives.
// Partner referral links (?ref=CODE) are remembered in a cookie for 90 days.
import { NextResponse, type NextRequest } from "next/server";

const MAIN_HOST = "www.truewebcart.com";
const SEND_TO_MAIN = new Set(["twcarts.com", "www.twcarts.com", "truewebcart.com"]);

export function proxy(request: NextRequest) {
  const raw = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const host = raw.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
  if (!SEND_TO_MAIN.has(host)) return remembered(request);

  const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${MAIN_HOST}`);
  return NextResponse.redirect(url, 301);
}

// Partner Program: a link with ?ref=CODE is remembered for 90 days, so sign-up links later carry it (src/app/site/RefLinks.tsx).
function remembered(request: NextRequest) {
  const res = NextResponse.next();
  const ref = request.nextUrl.searchParams.get("ref");
  if (ref && /^[A-Za-z0-9]{2,30}$/.test(ref) && !request.cookies.get("twc_ref")) {
    res.cookies.set("twc_ref", ref.toUpperCase(), { maxAge: 60 * 60 * 24 * 90, path: "/", sameSite: "lax", secure: true });
  }
  return res;
}
