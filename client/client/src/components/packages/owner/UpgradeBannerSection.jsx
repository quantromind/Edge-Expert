import React from "react";
import { Zap } from "lucide-react";

const UpgradeBannerSection = ({ propertyType, setPropertyType }) => {
  const propertyTypes = ["For Rent", "For Sell", "For Buy"];

  const messages = {
    "For Rent": {
      title: "Maximize Your Rental Income",
      subtitle:
        "Boost your property visibility by 5X and attract the perfect tenant faster.",
    },
    "For Sell": {
      title: "Achieve the Best Sale Price",
      subtitle:
        "Access premium marketing tools, expert support, and verified buyers to close your deal efficiently.",
    },
    "For Buy": {
      title: "Find the Best Paying Roommates",
      subtitle:
        "Connect with verified tenants and manage your PG/Hostel community effortlessly.",
    },
  };

  const currentMessage = messages[propertyType] || messages["For Rent"];

  return (
    <section className="bg-white pt-10 pb-14 px-4 sm:px-6 border-b border-gray-100 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* === Tagline Section === */}
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:space-x-6 mb-8">
          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 mb-3 md:mb-0 leading-snug">
            Get{" "}
            <span className="text-indigo-600 font-semibold">10x more leads</span>{" "}
            by upgrading to an{" "}
            <span className="text-indigo-600 font-semibold">Owner Plan</span>
          </p>
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm sm:text-base flex items-center transition duration-200"
          >
            Explore Commercial Packages →
          </a>
        </div>

        {/* === Main Upgrade Card === */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              {currentMessage.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-1 sm:px-6">
              {currentMessage.subtitle}
            </p>
          </div>

          {/* === Property Type Tabs === */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex flex-wrap justify-center gap-2 bg-gray-100 p-1 rounded-full shadow-inner">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`px-4 sm:px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    propertyType === type
                      ? "bg-indigo-600 text-white shadow-md scale-105"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* === Visibility Info + CTA === */}
          <div className="bg-indigo-50 p-4 sm:p-6 rounded-xl border border-indigo-200 flex flex-col md:flex-row items-center justify-between shadow-inner gap-4 md:gap-0">
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="p-2 bg-white rounded-full shadow-md flex justify-center items-center">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                Your current plan visibility:{" "}
                <span className="text-indigo-700 font-bold">45%</span>
              </p>
            </div>

            <a
              href="#pricing-compare"
              className="bg-indigo-600 text-white text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.03]"
            >
              Upgrade Now to Boost Visibility
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpgradeBannerSection;
