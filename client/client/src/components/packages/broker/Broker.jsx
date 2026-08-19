import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import BrokerInfo from "./Brokerinfo";
import paymentService from "../../../Api/paymentService.js";
import axiosConfig from "../../../Api/axiosConfig.js";

const brokerPackages = [
  {
    title: "Expert Pro",
    subTitle: "Tier-I Verification & Account Management",
    price: 2999,
    features: [
      "Access to on-ground property verification in Tier-I cities",
      "Unlimited self-verification of properties",
      "Unique feature to showcase 3 properties in one listing",
      "Dedicated account manager for personalized support",
    ],
    tag: { label: "Recommended", bgColor: "bg-purple-600", isPrimary: true },
    borderColor: "border-purple-600",
  },
  {
    title: "Premier Value",
    subTitle: "Branding, Micro-Site, and Reusable Slots",
    price: 4999,
    features: [
      "Dedicated Agent Micro-Site",
      'Highlight your brand with "Housing Prime Agent" tag',
      "Reusable slots - allowing you to post multiple listings",
      "Unlimited self-verification of properties",
      "Access to on-ground property verification in Tier-I cities",
    ],
    tag: { label: "Premium", bgColor: "bg-indigo-600", isPrimary: false },
    borderColor: "border-indigo-600",
  },
  {
    title: "Audience Maximiser",
    subTitle: "Geo-Targeted Promotions & Partner Listings",
    price: 3999,
    features: [
      "Increase reach to potential buyers and tenants",
      "Showcase listings on partner platforms for higher engagement",
      "Geo-targeted promotions to local audience segments",
      "Boost brand awareness with display ads on high-traffic pages",
    ],
    tag: { label: "High Reach", bgColor: "bg-yellow-600", isPrimary: false },
    borderColor: "border-yellow-600",
  },
  {
    title: "Featured Agent",
    subTitle: "Platform-Backed Endorsement & Visibility",
    price: 1999,
    features: [
      "Get a dedicated ‘Featured Agent’ badge on all listings",
      "Appear in the top section of the ‘Find an Agent’ page",
      "Increased visibility for verified and active agents",
      "Enhanced credibility with platform-backed endorsement",
    ],
    tag: { label: "Featured", bgColor: "bg-pink-600", isPrimary: false },
    borderColor: "border-pink-600",
  },
  {
    title: "Edge Expert Select Starter",
    subTitle: "Essential Tools for New Brokers",
    price: 999,
    features: [
      "Showcase your properties to attract more buyers and tenants",
      "Reusable slots - allowing you to post multiple listings",
      "Unlimited self-verification of properties",
      "Easily manage listings with a simple, user-friendly dashboard",
    ],
    tag: { label: "Starter", bgColor: "bg-gray-500", isPrimary: false },
    borderColor: "border-gray-500",
  },
  {
    title: "Edge Expert Shorts",
    subTitle: "Interactive Property Tour Videos",
    price: 2499,
    features: [
      "Interactive Property tour videos with AI-guided narration",
      "Custom scripts highlight key property features",
      "Engaging virtual experience for buyers",
      "Ideal for showcasing large or unique properties",
    ],
    tag: { label: "Video Tour", bgColor: "bg-purple-500", isPrimary: false },
    borderColor: "border-purple-500",
  },
  {
    title: "DigiLite",
    subTitle: "360-Degree Property Panorama",
    price: 1499,
    features: [
      "360 Degree panorama of the property (Content product)",
      "Platform integration with ad products driving user engagement",
      "Easy distribution and can be accessed anywhere and anytime",
    ],
    tag: { label: "360° View", bgColor: "bg-indigo-700", isPrimary: false },
    borderColor: "border-indigo-700",
  },
];

const PackageCard = ({ pkg }) => {
  const handlePayment = async () => {
    try {
      const amount = pkg.price;

      // Create order on backend
      const orderResponse = await axiosConfig.post("/payment/create-order", {
        amount,
        packageName: pkg.title,
        customerInfo: {},
      });

      if (!orderResponse.data.success) {
        alert(`Order creation failed: ${orderResponse.data.message || 'Unknown error'}`);
        return;
      }

      // Initiate Razorpay payment
      await paymentService.initiatePayment({
        amount,
        orderId: orderResponse.data.order.id,
        description: `Payment for ${pkg.title} package`,
        onSuccess: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await axiosConfig.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: "user123",
              userName: "John Doe",
              userEmail: "user@example.com",
              userPhone: "9876543210",
              userType: "broker",
              planName: pkg.title,
              planType: "broker_plan",
              amount: pkg.price,
            });

            if (verifyResponse.data.success) {
              alert("✅ Payment successful! Your package has been activated.");
            } else {
              alert("⚠️ Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("⚠️ Payment verification failed. Please contact support with your payment ID.");
          }
        },
        onCancel: () => {
          alert("❌ Payment cancelled by user.");
        },
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';

      if (errorMessage.includes('key_id') || errorMessage.includes('oauthToken')) {
        alert("⚠️ Payment system is currently unavailable. The server configuration needs to be updated. Please contact support or try again later.");
      } else {
        alert(`❌ Payment initiation failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md sm:shadow-lg p-5 sm:p-6 border-t-8 ${pkg.borderColor} flex flex-col h-full transition duration-300 hover:shadow-2xl hover:scale-[1.02]`}
    >
      <div className="flex-grow">
        <span
          className={`text-[10px] sm:text-[11px] text-white px-2 sm:px-3 py-1 rounded-full tracking-wider uppercase ${pkg.tag.bgColor}`}
        >
          {pkg.tag.label}
        </span>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-3 leading-snug">
          {pkg.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 sm:mb-5 leading-relaxed">
          {pkg.subTitle}
        </p>

        <div className="space-y-2 sm:space-y-3 text-sm sm:text-[15px] leading-relaxed text-gray-700">
          {pkg.features.map((feature, i) => (
            <div key={i} className="flex items-start space-x-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
        <button
          onClick={handlePayment}
          className="w-full py-2.5 sm:py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 shadow-md text-sm sm:text-base"
        >
          Pay Now ₹{pkg.price}
        </button>
        <button className="w-full text-indigo-600 text-xs sm:text-sm font-medium hover:text-indigo-800 transition duration-150">
          View Product Details
        </button>
        <button className="w-full text-gray-600 text-xs sm:text-sm pt-2 border-t border-gray-200">
          Call Customer Support
        </button>
      </div>
    </div>
  );
};

const PackageCarousel = ({ packages, tabName }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative px-3 sm:px-6 py-10 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-8 sm:mb-10">
          {tabName} Packages & Features
        </h3>

        <div className="relative">
          {/* Scroll Buttons for large screens */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:block absolute left-[-25px] top-1/2 transform -translate-y-1/2 p-3 bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden lg:block absolute right-[-25px] top-1/2 transform -translate-y-1/2 p-3 bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Horizontal Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex space-x-4 sm:space-x-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85%] sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
              >
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function BrokerPage() {
  const [activeTab, setActiveTab] = useState("broker");

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      {/* --- Hero Section --- */}
      <section
        className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/63/89/88/638988c0e5e3b641fe107281301ef3b1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-3 md:mb-4 leading-snug md:leading-relaxed">
            Elevate Your Real Estate Business with Edge Expert
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto md:mx-0 leading-relaxed font-light">
            Access exclusive tools, high-visibility ad products, and priority
            features designed for top-tier brokers and developers.
          </p>
        </div>
      </section>

      {/* --- Sticky Tabs --- */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex justify-center md:justify-start space-x-6 sm:space-x-10 text-base sm:text-lg font-medium text-gray-700 py-4 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab("broker")}
              className={`pb-2 border-b-2 ${activeTab === "broker"
                ? "text-indigo-600 border-indigo-600"
                : "border-transparent hover:text-gray-900"
                }`}
            >
              Broker Plans
            </button>
            <button
              onClick={() => setActiveTab("developer")}
              className={`pb-2 border-b-2 ${activeTab === "developer"
                ? "text-indigo-600 border-indigo-600"
                : "border-transparent hover:text-gray-900"
                }`}
            >
              Developer & Content
            </button>
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="bg-gray-50 py-8 sm:py-10">
        {activeTab === "broker" ? (
          <PackageCarousel packages={brokerPackages} tabName="Broker" />
        ) : (
          <BrokerInfo />
        )}
      </div>

      {/* --- Hide Scrollbar CSS --- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}












































