"use server";

import { headers } from "next/headers";
import { saveContactMessage } from "@/lib/db";

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message" | "service", string>>;
}

// Very small in-process rate limit (per server instance) to blunt form spam.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_HITS;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG_RE = /^[a-z0-9-]{1,120}$/;

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (str(formData.get("company_website"))) {
    return { status: "success", message: "Thanks, we'll be in touch shortly." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent a few messages recently. Please try again in a little while.",
    };
  }

  const name = str(formData.get("name"));
  const email = str(formData.get("email"));
  const business = str(formData.get("business"));
  const service = str(formData.get("service"));
  const message = str(formData.get("message"));
  const wantsCall = formData.get("wants_call") === "on";

  const fieldErrors: NonNullable<ContactState["fieldErrors"]> = {};
  if (name.length < 2 || name.length > 160) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 190) fieldErrors.email = "Please enter a valid email address.";
  if (!service || !SLUG_RE.test(service)) fieldErrors.service = "Please choose a service.";
  if (message.length < 10) fieldErrors.message = "Please tell us a little more (at least 10 characters).";
  if (message.length > 5000) fieldErrors.message = "That message is a bit long, please shorten it.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const saved = await saveContactMessage({
    name,
    email,
    business: business ? business.slice(0, 190) : null,
    serviceSlug: service,
    message,
    wantsCall,
  });

  if (!saved) {
    return {
      status: "error",
      message: "Sorry, we couldn't send your message just now. Please try again in a moment.",
    };
  }

  return { status: "success", message: "Thanks, your message is in. We'll be in touch shortly." };
}
