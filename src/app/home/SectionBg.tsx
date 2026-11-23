// src/app/home/SectionBg.tsx
/** The background every mockup section has: a faint grid, light beams running along it, and a soft glow. */
const X = [
  [191, "#D92A04", 7, 0], [319, "var(--h-beam)", 9, -3], [511, "#F5A524", 8, -5],
  [703, "var(--h-beam)", 10, -1], [831, "#D92A04", 7.5, -4], [895, "var(--h-beam)", 11, -7],
] as const;
const Y = [
  ["13%", "var(--h-beam)", 8, -2], ["31%", "#D92A04", 9.5, -6], ["53%", "#F5A524", 7, -1],
  ["71%", "var(--h-beam)", 10, -4], ["89%", "#D92A04", 8.5, -7],
] as const;

export default function SectionBg({ glow = true }: { glow?: boolean }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_900px_560px_at_50%_50%,#000_35%,transparent_100%)]">
        <div className="absolute inset-0 [background-image:linear-gradient(var(--h-gridline)_1px,transparent_1px),linear-gradient(90deg,var(--h-gridline)_1px,transparent_1px)] [background-size:64px_64px]" />
        {X.map(([top, c, d, delay]) => (
          <div key={top} className="gbx absolute left-0 w-[240px] h-[3px] rounded-[3px]" style={{ top, background: `linear-gradient(90deg, transparent, ${c})`, animationDuration: `${d}s`, animationDelay: `${delay}s` }} />
        ))}
        {Y.map(([left, c, d, delay]) => (
          <div key={left} className="gby absolute top-0 w-[3px] h-[240px] rounded-[3px]" style={{ left, background: `linear-gradient(180deg, transparent, ${c})`, animationDuration: `${d}s`, animationDelay: `${delay}s` }} />
        ))}
      </div>
      {glow && (
        <div aria-hidden className="gbg absolute left-1/2 -ml-[310px] top-[220px] w-[620px] h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(closest-side, var(--h-softglow), rgba(255,255,255,0))" }} />
      )}
    </>
  );
}
