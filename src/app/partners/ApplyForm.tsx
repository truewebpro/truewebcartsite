"use client";
// src/app/partners/ApplyForm.tsx: the partner application, as a liquid glass card (same fields style as Contact).
import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitApplication, type ApplyState } from "./actions";

const INITIAL: ApplyState = { status: "idle", message: "" };
const SERVICES = ["Store setup", "Design", "Development", "Migration", "SEO", "Marketing", "Product photos", "Support"];

function Err({ id, text }: { id: string; text?: string }) {
  return text ? <p id={id} className="text-[13px] font-bold text-[#D92A04]">{text}</p> : null;
}

export default function ApplyForm() {
  const [state, action, pending] = useActionState(submitApplication, INITIAL);
  const e = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="gx-form gx-lg">
        <div className="flex flex-col items-start gap-4 py-6" role="status">
          <CheckCircle2 className="w-10 h-10 text-[var(--gx-green)]" aria-hidden />
          <p className="text-[18px] font-bold text-[var(--gx-text)]">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gx-form gx-lg">
      <form action={action} noValidate>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {state.status === "error" && !state.fieldErrors && <p role="alert" className="mb-4 text-[14px] font-bold text-[#D92A04]">{state.message}</p>}
        <div className="gx-row2">
          <div className="gx-field">
            <label htmlFor="pa-name">Your name</label>
            <input id="pa-name" name="name" type="text" autoComplete="name" aria-invalid={!!e.name} aria-describedby={e.name ? "pa-name-e" : undefined} />
            <Err id="pa-name-e" text={e.name} />
          </div>
          <div className="gx-field">
            <label htmlFor="pa-company">Company or trading name</label>
            <input id="pa-company" name="company" type="text" autoComplete="organization" aria-invalid={!!e.company} aria-describedby={e.company ? "pa-company-e" : undefined} />
            <Err id="pa-company-e" text={e.company} />
          </div>
        </div>
        <div className="gx-row2 mt-4">
          <div className="gx-field">
            <label htmlFor="pa-email">Email</label>
            <input id="pa-email" name="email" type="email" autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "pa-email-e" : undefined} />
            <Err id="pa-email-e" text={e.email} />
          </div>
          <div className="gx-field">
            <label htmlFor="pa-phone">Phone (optional)</label>
            <input id="pa-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
        </div>
        <div className="gx-row2 mt-4">
          <div className="gx-field">
            <label htmlFor="pa-country">Country</label>
            <input id="pa-country" name="country" type="text" autoComplete="country-name" defaultValue="United Kingdom" aria-invalid={!!e.country} aria-describedby={e.country ? "pa-country-e" : undefined} />
            <Err id="pa-country-e" text={e.country} />
          </div>
          <div className="gx-field">
            <label htmlFor="pa-type">You are</label>
            <select id="pa-type" name="type" defaultValue="" aria-invalid={!!e.type} aria-describedby={e.type ? "pa-type-e" : undefined}>
              <option value="">Choose one</option>
              <option value="agency">An agency</option>
              <option value="freelancer">A freelancer</option>
              <option value="developer">A developer</option>
            </select>
            <Err id="pa-type-e" text={e.type} />
          </div>
        </div>
        <div className="gx-row2 mt-4">
          <div className="gx-field">
            <label htmlFor="pa-website">Website (optional)</label>
            <input id="pa-website" name="website" type="url" placeholder="yourstudio.com" aria-invalid={!!e.website} />
            <Err id="pa-website-e" text={e.website} />
          </div>
          <div className="gx-field">
            <label htmlFor="pa-portfolio">Portfolio link (optional)</label>
            <input id="pa-portfolio" name="portfolio_url" type="url" placeholder="A site you built" aria-invalid={!!e.portfolio_url} />
            <Err id="pa-portfolio-e" text={e.portfolio_url} />
          </div>
        </div>
        <fieldset className="mt-4 gx-field">
          <legend className="text-[14px] font-extrabold text-[var(--gx-text)] mb-2">What you do (choose any)</legend>
          <div className="gx-checks">
            {SERVICES.map((s) => (
              <label key={s} className="gx-check"><input type="checkbox" name="services" value={s} /><span>{s}</span></label>
            ))}
          </div>
        </fieldset>
        <div className="gx-field mt-4">
          <label htmlFor="pa-about">Tell us a little about your work (optional)</label>
          <textarea id="pa-about" name="about" rows={3} />
        </div>
        <label className="gx-consent mt-4">
          <input type="checkbox" name="terms" aria-invalid={!!e.terms} aria-describedby={e.terms ? "pa-terms-e" : undefined} />
          <span>I agree to the <a href="#terms">partner terms</a>.</span>
        </label>
        <Err id="pa-terms-e" text={e.terms} />
        <button type="submit" disabled={pending} className="gx-btn gx-o w-full mt-5 cursor-pointer disabled:opacity-70">
          {pending ? "Sending…" : "Apply to join"}
        </button>
      </form>
    </div>
  );
}
