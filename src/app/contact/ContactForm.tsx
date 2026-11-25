"use client";
// src/app/contact/ContactForm.tsx
// The contact form as a liquid glass card. Sends to the same server action as before (submitContact).
import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitContact, type ContactState } from "./actions";
import { Blob } from "../site/glass";

export interface ServiceOption {
  slug: string;
  title: string;
}

const INITIAL: ContactState = { status: "idle", message: "" };

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="text-[13px] font-bold text-[#D92A04]">
      {text}
    </p>
  );
}

export default function ContactForm({ services, defaultService = "" }: { services: ServiceOption[]; defaultService?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  const errs = state.fieldErrors ?? {};

  return (
    <div className="gx-form gx-lg">
      <Blob i={0} style={{ right: -70, top: -70 }} />
      <Blob i={1} style={{ left: -70, bottom: -80 }} />
      {state.status === "success" ? (
        <div className="flex flex-col items-start gap-4 py-6" role="status">
          <CheckCircle2 className="w-10 h-10 text-[var(--gx-green)]" aria-hidden />
          <p className="text-[18px] font-bold text-[var(--gx-text)]">{state.message}</p>
          <button type="button" onClick={() => window.location.reload()} className="gx-btn gx-g gx-sm cursor-pointer">
            Send another message
          </button>
        </div>
      ) : (
        <form action={formAction} noValidate>
          {/* honeypot, hidden from people, tempting to bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {state.status === "error" && !state.fieldErrors && (
            <p role="alert" className="mb-4 text-[14px] font-bold text-[#D92A04]">
              {state.message}
            </p>
          )}

          <div className="gx-row2">
            <div className="gx-field">
              <label htmlFor="cu-name">Your name</label>
              <input id="cu-name" name="name" type="text" autoComplete="name" aria-invalid={!!errs.name} aria-describedby={errs.name ? "cu-name-e" : undefined} />
              <FieldError id="cu-name-e" text={errs.name} />
            </div>
            <div className="gx-field">
              <label htmlFor="cu-email">Email</label>
              <input id="cu-email" name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} aria-describedby={errs.email ? "cu-email-e" : undefined} />
              <FieldError id="cu-email-e" text={errs.email} />
            </div>
          </div>
          <div className="gx-row2 mt-4">
            <div className="gx-field">
              <label htmlFor="cu-business">Business name (optional)</label>
              <input id="cu-business" name="business" type="text" autoComplete="organization" />
            </div>
            <div className="gx-field">
              <label htmlFor="cu-service">What is it about?</label>
              <select id="cu-service" name="service" defaultValue={defaultService} aria-invalid={!!errs.service}>
                <option value="">Choose one</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              <FieldError id="cu-service-e" text={errs.service} />
            </div>
          </div>
          <div className="gx-field mt-4">
            <label htmlFor="cu-message">Message</label>
            <textarea id="cu-message" name="message" placeholder="A few lines about what you need" aria-invalid={!!errs.message} aria-describedby={errs.message ? "cu-message-e" : undefined} />
            <FieldError id="cu-message-e" text={errs.message} />
          </div>
          <label htmlFor="cu-call" className="flex items-center gap-2.5 mt-4 text-[14px] font-bold text-[var(--gx-text)] cursor-pointer">
            <input type="checkbox" id="cu-call" name="wants_call" className="w-4 h-4 accent-[#D92A04]" />
            I would like a free call to talk it through
          </label>
          <button className="gx-btn gx-o w-full mt-5 cursor-pointer disabled:opacity-70" type="submit" disabled={pending}>
            {pending ? "Sending..." : "Send message"}
          </button>
          <p className="mt-3 text-center text-[12.5px] text-[var(--gx-muted)]">We only use your details to reply to you.</p>
        </form>
      )}
    </div>
  );
}
