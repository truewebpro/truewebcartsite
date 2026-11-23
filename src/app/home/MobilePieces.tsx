// src/app/home/MobilePieces.tsx
// Phone, tablet and small laptop layouts built from pieces cut out of the approved mockup,
// so they move and look the same as the desktop sections.
import Image from "next/image";
import type { ReactNode } from "react";
import { SIGNUP_URL } from "../site/links";
import Fit from "./Fit";
import SectionBg from "./SectionBg";
import { Heading } from "./parts";
import { TplTabsDark, TplTabsLight } from "./desktop/pieces/TplTabs";
import { TplInfoDark, TplInfoLight } from "./desktop/pieces/TplInfo";
import { TplButtonsDark, TplButtonsLight } from "./desktop/pieces/TplButtons";
import { TplFramesDark, TplFramesLight } from "./desktop/pieces/TplFrames";
import { IntCardsDark, IntCardsLight } from "./desktop/pieces/IntCards";
import { IntRingDark, IntRingLight } from "./desktop/pieces/IntRing";
import { IntPillsDark, IntPillsLight } from "./desktop/pieces/IntPills";
import { FndTabsDark, FndTabsLight } from "./desktop/pieces/FndTabs";
import { FndPanelDark, FndPanelLight } from "./desktop/pieces/FndPanel";
import { AnaStripDark, AnaStripLight } from "./desktop/pieces/AnaStrip";
import { AppPhoneDark, AppPhoneLight } from "./desktop/pieces/AppPhone";
import { AppChipsDark, AppChipsLight } from "./desktop/pieces/AppChips";

function Both({ light, dark }: { light: ReactNode; dark: ReactNode }) {
  return (
    <>
      <div className="h-tl">{light}</div>
      <div className="h-td">{dark}</div>
    </>
  );
}

function Shell({ bg, children, id }: { bg: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden py-14 sm:py-16 ${bg}`}>
      <SectionBg />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

const GLASS =
  "rounded-[28px] bg-white/50 backdrop-blur-[20px] backdrop-saturate-[1.6] border border-white/80 shadow-[0_24px_60px_rgba(11,47,102,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] dark:bg-[rgba(12,32,74,0.55)] dark:border-white/[0.18] dark:shadow-[0_24px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]";

export function TemplatesMobile() {
  return (
    <Shell bg="bg-[linear-gradient(180deg,#F3F6FC_0%,#FFFFFF_40%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#071633_0%,#0B2350_100%)]">
      <Heading title="Pick the website template you love" />
      <div className="m-tabs mt-2 -mx-4 px-4 overflow-x-auto h-noscroll [&>div>div]:!justify-start sm:[&>div>div]:!justify-center">
        <Both light={<TplTabsLight />} dark={<TplTabsDark />} />
      </div>
      <div className={`${GLASS} mt-8 p-4 sm:p-8 lg:p-10 grid lg:grid-cols-[380px_1fr] gap-6 lg:gap-10 items-center`}>
        <div className="lg:order-2">
          <Fit width={520} height={380}>
            <div className="relative" style={{ width: 520, height: 380, perspective: 1200 }}>
              <Both light={<TplFramesLight />} dark={<TplFramesDark />} />
            </div>
          </Fit>
        </div>
        <div className="lg:order-1">
          <div className="m-info relative h-[300px] min-[420px]:h-[270px]">
            <Both light={<TplInfoLight />} dark={<TplInfoDark />} />
          </div>
          <div className="mt-4 [&_a]:!px-5 [&_a]:!py-3.5 [&_a]:!text-[16px] [&>div>div]:!flex-wrap">
            <Both light={<TplButtonsLight />} dark={<TplButtonsDark />} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function IntegrationsMobile({ appCount }: { appCount: number }) {
  return (
    <Shell bg="bg-[linear-gradient(180deg,#DCE6F7_0%,#F3F6FC_50%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#0B2350_0%,#071633_100%)]">
      <Heading title="Works with the tools you already use" sub="Connect Google, email, reviews, chat and delivery in a few clicks. No code needed." />
      <div className="mt-10 flex justify-center">
        <Both light={<IntRingLight />} dark={<IntRingDark />} />
      </div>
      <div className="mt-10">
        <Both light={<IntCardsLight />} dark={<IntCardsDark />} />
      </div>
      <div className="mt-14 text-center">
        <h3 className="text-[26px] sm:text-[34px] font-extrabold tracking-[-0.8px] text-[var(--h-text)]">Plus {appCount} apps built in</h3>
        <p className="mt-2 text-[16px] sm:text-[18px] text-[var(--h-body)]">Turn on what you need from the App Store. No extra logins, no extra bills from other companies.</p>
      </div>
      <div className="mt-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <Both light={<IntPillsLight />} dark={<IntPillsDark />} />
      </div>
    </Shell>
  );
}

export function FoundationsMobile() {
  return (
    <Shell bg="bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#071633_0%,#0B2350_100%)]">
      <Heading title="Build your online shop on solid foundations" sub="We look after hosting, security and updates, so your online shop stays fast and safe." />
      <div className="mt-10 -mx-4 px-4 overflow-x-auto h-noscroll [&>div>div]:!w-auto [&>div>div]:min-w-[560px] sm:[&>div>div]:!w-full sm:[&>div>div]:min-w-0">
        <Both light={<FndTabsLight />} dark={<FndTabsDark />} />
      </div>
      <div className="mt-6 m-fnd [&>div>div]:!w-full [&>div>div]:!m-0 [&>div>div]:!h-[600px] sm:[&>div>div]:!h-[460px] lg:[&>div>div]:!h-[420px]">
        <Both light={<FndPanelLight />} dark={<FndPanelDark />} />
      </div>
      <p className="mt-8 text-center">
        <a href={SIGNUP_URL} className="inline-flex items-center px-8 py-4 rounded-full bg-[#081F45] text-white text-[17px] font-extrabold dark:bg-white dark:text-[#081F45]">
          Get started
        </a>
      </p>
    </Shell>
  );
}

export function AnalyticsMobile() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 bg-[linear-gradient(180deg,#DCE6F7_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#0B2350_0%,#071633_50%,#0B2350_100%)]">
      <SectionBg />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_460px] gap-6 lg:gap-10 items-start">
        <h2 className="text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.08] font-extrabold tracking-[-1.6px] text-[var(--h-text)]">See what is working in your online shop</h2>
        <div className="lg:pt-2.5">
          <p className="text-[17px] sm:text-[19px] leading-[1.5] text-[var(--h-body)]">Live visitors, sales and simple tips in one place, so you know what to do next.</p>
          <a href={SIGNUP_URL} className="mt-5 inline-flex px-7 py-3.5 rounded-full bg-[#081F45] text-white text-[17px] font-extrabold dark:bg-white dark:text-[#081F45]">
            Get started
          </a>
        </div>
      </div>
      <div className="relative [zoom:0.72] sm:[zoom:0.85] lg:[zoom:0.92]">
        <Both light={<AnaStripLight />} dark={<AnaStripDark />} />
      </div>
    </section>
  );
}

export function MobileAppMobile() {
  return (
    <Shell id="mobile-app" bg="bg-[linear-gradient(180deg,#DCE6F7_0%,#F3F6FC_50%,#DCE6F7_100%)] dark:bg-[linear-gradient(180deg,#0B2350_0%,#071633_50%,#0B2350_100%)]">
      <Heading title="Your online shop, in your pocket" sub="Everything you need on the go, from new order alerts to printing labels." />
      <div className="mt-12 flex justify-center">
        <div className="relative w-[300px] h-[620px] [zoom:0.9] min-[400px]:[zoom:1]">
          <Both light={<AppPhoneLight />} dark={<AppPhoneDark />} />
        </div>
      </div>
      <div className="mt-12 max-w-[720px] mx-auto">
        <Both light={<AppChipsLight />} dark={<AppChipsDark />} />
      </div>
      <div className="mt-10 flex justify-center gap-3">
        <Image src="/home/logos/appstore.png" alt="Download on the App Store" width={362} height={104} className="h-[48px] w-auto" />
        <Image src="/home/logos/googleplay.png" alt="Get it on Google Play" width={363} height={104} className="h-[48px] w-auto" />
      </div>
    </Shell>
  );
}
