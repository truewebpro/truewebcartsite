// src/app/home/ViewPricing.tsx
// "View pricing" under the plan cards on the home page. Takes the place of the "For large businesses" row,
// which now lives only on the pricing page.
import Link from "next/link";

export default function ViewPricing() {
  return (
    <section className="relative pb-16 sm:pb-20 pt-2 bg-[#DCE6F7] dark:bg-[#0B2350]">
      <div className="flex justify-center px-4">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#081F45] text-[#081F45] dark:border-white dark:text-white text-[16px] font-extrabold transition-colors hover:bg-[#081F45] hover:text-white dark:hover:bg-white dark:hover:text-[#081F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92A04]"
        >
          View pricing
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
