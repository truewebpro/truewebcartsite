import CommissionCalculatorHeader from "./CommissionCalculatorHeader";
import Features03ZeroDrift from "./Features03ZeroDrift";
import Integration01Finsyc from "./Integration01Finsyc";
import Pricing05Solra from "./Pricing05Solra";
import TestimonialCommission from "./TestimonialCommission";
import ContactUs02Orbit from "./ContactUs02Orbit";
import FooterBenjamen from "./FooterBenjamen";
import ParticleNetworkBackground from "./ParticleNetworkBackground";

export default function Home() {
  return (
    <>
      <ParticleNetworkBackground />

      <div className="relative z-10">
        <CommissionCalculatorHeader />
        <Features03ZeroDrift />
        <Integration01Finsyc />
        <Pricing05Solra />
        <TestimonialCommission />
        <ContactUs02Orbit />

        <FooterBenjamen />
      </div>
    </>
  );
}

