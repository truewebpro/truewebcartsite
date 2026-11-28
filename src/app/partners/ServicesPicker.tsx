"use client";
// src/app/partners/ServicesPicker.tsx: "What you do" as a dropdown with tick boxes. Each ticked service is sent as "services".
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function ServicesPicker({ options, labelledBy }: { options: string[]; labelledBy: string }) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const toggle = (o: string) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));
  const text = picked.length === 0 ? "Choose services" : picked.length <= 2 ? picked.join(", ") : `${picked.slice(0, 2).join(", ")} +${picked.length - 2}`;

  return (
    <div className="gx-pick" ref={box}>
      {picked.map((p) => <input key={p} type="hidden" name="services" value={p} />)}
      <button type="button" className={`gx-pick-btn ${picked.length ? "" : "gx-pick-empty"}`} aria-haspopup="listbox" aria-expanded={open} aria-labelledby={labelledBy} onClick={() => setOpen((v) => !v)}>
        <span>{text}</span>
        <ChevronDown size={18} aria-hidden className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      {open && (
        <ul className="gx-pick-list" role="listbox" aria-multiselectable="true" aria-labelledby={labelledBy}>
          {options.map((o) => {
            const on = picked.includes(o);
            return (
              <li key={o} role="option" aria-selected={on}>
                <button type="button" onClick={() => toggle(o)} className={on ? "on" : ""}>
                  <span className="gx-pick-box" aria-hidden>{on && <Check size={13} strokeWidth={3} />}</span>
                  {o}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
