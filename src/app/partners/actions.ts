"use server";
// Partner applications from /partners go to the TWCarts platform (super admin › Partners), server to server.

import { headers } from "next/headers";
import { PLATFORM_URL } from "@/lib/platform";

export interface ApplyState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "company" | "email" | "country" | "type" | "website" | "portfolio_url" | "terms", string>>;
}

const hits = new Map<string, number[]>();
function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TYPES = ["freelancer", "agency", "developer"];
const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const url = (v: string) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v);

export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  if (str(formData.get("company_website"))) return { status: "success", message: "Thanks for applying." }; // honeypot

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return { status: "error", message: "You've sent a few applications recently. Please try again in a little while." };

  const body = {
    name: str(formData.get("name")),
    company: str(formData.get("company")),
    email: str(formData.get("email")),
    phone: str(formData.get("phone")) || null,
    country: str(formData.get("country")),
    website: url(str(formData.get("website"))) || null,
    portfolio_url: url(str(formData.get("portfolio_url"))) || null,
    type: str(formData.get("type")),
    services: formData.getAll("services").map((s) => String(s)).slice(0, 12),
    about: str(formData.get("about")).slice(0, 2000) || null,
    terms: formData.get("terms") === "on",
  };

  const fieldErrors: NonNullable<ApplyState["fieldErrors"]> = {};
  if (body.name.length < 2) fieldErrors.name = "Please enter your name.";
  if (body.company.length < 2) fieldErrors.company = "Please enter your company or trading name.";
  if (!EMAIL_RE.test(body.email)) fieldErrors.email = "Please enter a valid email address.";
  if (body.country.length < 2) fieldErrors.country = "Please enter your country.";
  if (!TYPES.includes(body.type)) fieldErrors.type = "Choose what describes you best.";
  if (!body.terms) fieldErrors.terms = "Please agree to the partner terms.";
  if (Object.keys(fieldErrors).length) return { status: "error", message: "Please check the highlighted fields.", fieldErrors };

  try {
    const res = await fetch(`${PLATFORM_URL}/public-api/partners/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-Partners-Secret": process.env.PARTNERS_APPLY_SECRET ?? "" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (res.status === 201) {
      return { status: "success", message: "Thanks for applying! We'll look at your application and reply by email, usually within one working day." };
    }
    const data = (await res.json().catch(() => ({}))) as { message?: string; errors?: Record<string, string[]> };
    if (res.status === 422 && data.errors) {
      const fe: NonNullable<ApplyState["fieldErrors"]> = {};
      for (const [k, v] of Object.entries(data.errors)) (fe as Record<string, string>)[k] = v[0];
      return { status: "error", message: data.message ?? "Please check the highlighted fields.", fieldErrors: fe };
    }
  } catch {
    // fall through
  }
  return { status: "error", message: "Sorry, we couldn't send your application just now. Please try again in a moment." };
}
