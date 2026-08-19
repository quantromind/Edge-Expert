// src/pages/OwnerPage.jsx
import React, { useState, useRef, useMemo } from "react";
import UpgradeBannerSection from "../owner/UpgradeBannerSection";
import PricingComparisonTableSection from "../owner/PricingSection";
import OwnerTrustSection from "../owner/OwenerTrusTsection";
import BenefitsSection from "../owner/Benifit";
import HowItWorksSection from "../owner/HowItWork";
import TestimonialsSection from "../owner/Testimonials";
import FAQSection from "../owner/Faq";

const OwnerPage = () => {
  const [propertyType, setPropertyType] = useState("For Rent");
  const scrollRef = useRef(null);
  const scrollAmount = 300;

  const scroll = (direction) => {
    if (scrollRef.current) {
      direction === "left"
        ? (scrollRef.current.scrollLeft -= scrollAmount)
        : (scrollRef.current.scrollLeft += scrollAmount);
    }
  };

  const allPlansDetailed = useMemo(
    () => ({
      "For Rent": [
        // your plan data here
      ],
      "For Sell": [
        // your plan data here
      ],
      "For Buy": [
        // your plan data here
      ],
    }),
    []
  );

  const selectedPlansDetailed =
    allPlansDetailed[propertyType] || allPlansDetailed["For Rent"];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen font-sans tracking-wide">
      {/* 🌟 Hero Section */}
      <section
        className="relative text-center py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 text-white rounded-b-xl shadow-xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('https://i.pinimg.com/736x/63/ca/be/63cabe1f5da579c0ac1cd112f2e28af6.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-wide leading-tight sm:leading-relaxed">
            Welcome, Property Owners
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 opacity-90 font-light leading-relaxed tracking-wide">
            Manage your listings, gain visibility insights, and upgrade your plan to
            reach maximum potential buyers or renters.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="bg-white text-indigo-700 px-6 sm:px-8 py-3 sm:py-3.5 font-medium rounded-full shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Manage Listings
            </button>
            <a
              href="#pricing-compare"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-3.5 font-medium rounded-full hover:bg-white hover:text-indigo-700 transition duration-300 transform hover:scale-105"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* 💎 Upgrade Banner Section */}
      <div className="px-4 sm:px-6 md:px-8 mt-10 sm:mt-14">
        <UpgradeBannerSection
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
      </div>

      {/* ⚡ Pricing Comparison Table */}
      <div id="pricing-compare" className="px-4 sm:px-6 md:px-8 mt-10 sm:mt-16">
        <PricingComparisonTableSection plans={selectedPlansDetailed} />
      </div>

      {/* 🏢 Additional Sections */}
      <div className="px-4 sm:px-6 md:px-8 space-y-16 sm:space-y-20 md:space-y-24 mt-12 sm:mt-16">
        <OwnerTrustSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </div>
  );
};

export default OwnerPage;
