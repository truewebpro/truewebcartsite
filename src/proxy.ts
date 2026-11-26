// src/proxy.ts
// www.truewebcart.com is the main address. Visitors who open twcarts.com (or www.twcarts.com) are sent,
// with a permanent redirect, to the same page on www.truewebcart.com, so Google sees one site.
// Other twcarts.com addresses (admin, super, shop addresses) are separate apps and never reach this site.
// The bare truewebcart.com is sent to www by CloudFront on AWS, but it is handled here too in case it arrives.
import { NextResponse, type NextRequest } from "next/server";

const MAIN_HOST = "www.truewebcart.com";
const SEND_TO_MAIN = new Set(["twcarts.com", "www.twcarts.com", "truewebcart.com"]);

export function proxy(request: NextRequest) {
  const raw = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const host = raw.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
  if (!SEND_TO_MAIN.has(host)) return NextResponse.next();

  const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${MAIN_HOST}`);
  return NextResponse.redirect(url, 301);
}
