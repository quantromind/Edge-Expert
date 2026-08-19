import React from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import HowItWorksSection from "./HowItWorksSection";
import MembershipPlansSection from "./MembershipPlansSection";
import TestimonialsSection from "./TestimonialsSection";
// import FAQSection from "./FAQSection";
import CallToActionSection from "./CallToActionSection";

const BenefitsMembers = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <MembershipPlansSection />
      <TestimonialsSection />
      {/* <FAQSection /> */}
      <CallToActionSection />
    </div>
  );
};

export default BenefitsMembers;