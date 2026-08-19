import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Image imports ---
import sitetakeImg from "../../../assets/images/sitetech.jpg";
import property1 from "../../../assets/images/cityslot.jpg";
import property2 from "../../../assets/images/topproject.jpg";
import property3 from "../../../assets/images/featured-dev1.jpg";

import DeveloperPlans from "./Developerplans";
import Contentproduct from "./Contentproduct";

// --- Slider Arrow Components ---
const ArrowButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 ${
      direction === "next" ? "right-2 sm:right-4" : "left-2 sm:left-4"
    } transform -translate-y-1/2 bg-white text-indigo-600 p-2 sm:p-3 rounded-full shadow-lg hover:bg-indigo-50 transition z-20`}
  >
    {direction === "next" ? (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    )}
  </button>
);

export default function Developer() {
  const [activeTab, setActiveTab] = useState("content"); // "content" or "developer"

  const creativeProperties = [
    {
      title: "Luxury Apartment in Mumbai",
      img: property1,
      location: "Mumbai, India",
    },
    {
      title: "Premium Villas in Bangalore",
      img: property2,
      location: "Bangalore, India",
    },
    {
      title: "Top Commercial Space in Chennai",
      img: property3,
      location: "Chennai, India",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
  };

  return (
    <div className="bg-white text-gray-900 font-sans tracking-wide leading-relaxed">

      {/* Hero Section */}
      <section
        className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${sitetakeImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/0 z-10"></div>
        <div className="relative z-20 text-center px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-white mb-3 sm:mb-4 drop-shadow-lg tracking-wide leading-snug">
            Showcase Your Properties. Reach Genuine Buyers.
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed">
            Partner with Edge Expert to present your real estate projects with stunning visual appeal.
          </p>
          <button className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition tracking-wide text-sm sm:text-base">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Hero Buttons to switch tabs */}
      <div className="max-w-6xl mx-auto text-center py-8 sm:py-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4">
        <button
          className={`w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-light transition tracking-wide ${
            activeTab === "content"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Content Products
        </button>
        <button
          className={`w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-light transition tracking-wide ${
            activeTab === "developer"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("developer")}
        >
          Developer Plans
        </button>
      </div>

      {/* Tabbed Section */}
      <section className="px-3 sm:px-6 md:px-10">
        {activeTab === "content" && <Contentproduct />}
        {activeTab === "developer" && <DeveloperPlans />}
      </section>

      {/* Property Slider Section */}
      <section className="max-w-6xl mx-auto py-10 sm:py-12 px-3 sm:px-6">
        <Slider {...sliderSettings}>
          {creativeProperties.map((property, index) => (
            <div key={index} className="px-2 sm:px-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={property.img}
                  alt={property.title}
                  className="w-full h-52 sm:h-64 md:h-72 object-cover"
                />
                <div className="p-3 sm:p-4 bg-white text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {property.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
