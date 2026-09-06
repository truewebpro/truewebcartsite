"use client";

const CARDS = [
  {
    title: "Change cursor style and size",
    description:
      "Customize your screen shares with perfectly sized cursor designs and eye-catching movement trails to guide viewers.",
    image: "https://cdn.jiro.build/ZeroDrift/Image/Change%20cursor%20style%20and%20size..png",
  },
  {
    title: "Personas",
    description:
      "Clone your voice once. Every Velo you create sounds like you're narrating it - even when you're not.",
    image: "https://cdn.jiro.build/ZeroDrift/Image/Personas.png",
  },
  {
    title: "Easy-to-use editor",
    description:
      "Trim silences, polish sound levels, and format captions without needing expensive audio or video editing tools.",
    image: "https://cdn.jiro.build/ZeroDrift/Image/Easy-to-use%20editor.png",
  },
  {
    title: "Use your brand kit",
    description:
      "Embed custom decision trees, surveys, links, and calendars directly inside videos to convert views into results.",
    image: "https://cdn.jiro.build/ZeroDrift/Image/Step%2001.svg",
  },
  {
    title: "Shareable Links",
    description:
      "See exactly who watched, how long they stayed, and which screen call-to-actions triggered replies in real-time.",
    image: "https://cdn.jiro.build/ZeroDrift/Image/Shareable%20Links.png",
  },
  {
    title: "Rewrite scripts with context",
    description:
      "Equip your startup team with shareable workspaces, unified media folders, and customizable player templates.",
    image: "https://cdn.jiro.build/ZeroDrift/Image/Rewrite%20scripts%20with%20context..png",
  },
];

function CaseCard({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <div className="w-[280px] xs:w-[320px] md:w-[540px] h-auto shrink-0 bg-white rounded-[16px] p-5 sm:p-6 md:p-8 flex flex-col justify-start items-start border border-black/[0.02] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 group">
      <div className="w-full h-[180px] md:h-[260px] bg-[#F4F3ED] rounded-[10px] flex items-center justify-center relative overflow-hidden shrink-0 select-none border border-black/[0.015]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.01] transition-colors duration-300" />
      </div>
      <div className="flex flex-col items-start gap-3 max-w-[460px] w-full mt-6">
        <h3
          className="font-instrument-serif text-[#010100] text-[26px] md:text-[34px] font-normal leading-tight text-left select-none"
          style={{ fontStyle: "normal" }}
        >
          {title}
        </h3>
        <p className="font-instrument-sans text-[#585555] text-sm md:text-[16px] font-normal leading-[1.5] text-left select-none">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Features03ZeroDrift() {
  const doubledCards = [...CARDS, ...CARDS];

  return (
    <section id="features" className="w-full bg-[#F4F3ED]/90 relative">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital,wght@0,400;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .font-instrument-serif { font-family: 'Instrument Serif', serif; }
        .font-instrument-sans { font-family: 'Instrument Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container-scrolling { animation: marquee 45s linear infinite; }
        .marquee-paused { animation-play-state: paused !important; }
        .cards-wrapper { position: relative; width: 100%; }
        .cards-wrapper::before, .cards-wrapper::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 20; pointer-events: none;
        }
        .cards-wrapper::before { left: 0; background: linear-gradient(to right, rgba(244,243,237,0.98) 15%, rgba(244,243,237,0)); }
        .cards-wrapper::after { right: 0; background: linear-gradient(to left, rgba(244,243,237,0.98) 15%, rgba(244,243,237,0)); }
        @media (max-width: 640px) {
          .cards-wrapper::before, .cards-wrapper::after { width: 40px; }
        }
      `}</style>

      <div className="py-6 w-full relative">
        <div id="use-case-header" className="max-w-[900px] mx-auto px-6 md:px-[60px] text-center mb-10 md:mb-[56px] flex flex-col items-center">
          <h2
            className="font-normal text-[30px] sm:text-[42px] md:text-[54px] leading-[1.1] tracking-tight bg-gradient-to-r from-[#0D163F] to-[#DF081A] bg-clip-text text-transparent mb-[16px]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The only video messaging tool you&apos;ll need
          </h2>
          <p className="font-sans font-instrument-sans text-base text-[#666767] leading-[1.6] max-w-[460px] mx-auto font-normal">
            Clone your voice once. Every Velo you create sounds like you&apos;re narrating it - even when you&apos;re not.
          </p>
        </div>

        <div className="cards-wrapper">
          <div
            className="w-full overflow-x-auto overflow-y-visible no-scrollbar cursor-grab active:cursor-grabbing"
            onMouseEnter={() => document.getElementById("marquee-scroller-track")?.classList.add("marquee-paused")}
            onMouseLeave={() => document.getElementById("marquee-scroller-track")?.classList.remove("marquee-paused")}
          >
            <div
              id="marquee-scroller-track"
              className="flex flex-row gap-[30px] py-4 pb-8 w-max px-[60px] marquee-container-scrolling"
            >
              {doubledCards.map((card, i) => (
                <CaseCard key={card.title + "-" + i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
