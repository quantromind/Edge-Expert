import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";

// ========================================
// 1. PROPERTY DATA
// ========================================
const PROPERTY_DATA = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/b9/b2/1f/b9b21f27dd6bc357c2143713b9b0093b.jpg",
    type: "Oceanfront Estate",
    address: "The Azure Estate",
    subtitle: "Architectural design with stunning infinity pool",
    specs: [
      { label: "Beds", value: "2" },
      { label: "Baths", value: "2" },
      { label: "Area", value: "1,500 SqFt" },
      { label: "Price", value: "₹ 5 Cr" },
    ],
    badges: ["Infinity Pool", "Gated Access", "Smart Home"],
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/14/e9/58/14e9589228777056baf1d4a72ca1cb3e.jpg",
    type: "Suburban Haven",
    address: "Willow Creek Manor",
    subtitle: "Warm traditional home with large family garden",
    specs: [
      { label: "Beds", value: "4" },
      { label: "Baths", value: "3" },
      { label: "Area", value: "3,500 SqFt" },
      { label: "Price", value: "₹ 7.4 Cr" },
    ],
    badges: ["Quiet Street", "Top School District", "Two-Car Garage"],
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/42/a8/bb/42a8bb16d1babbdfc7491adb51dcef38.jpg",
    type: "Sky Tower Residence",
    address: "Skyline Apex Loft",
    subtitle: "Sleek Urban Loft with Panoramic Cityscape",
    specs: [
      { label: "Beds", value: "1" },
      { label: "Baths", value: "1" },
      { label: "Area", value: "950 SqFt" },
      { label: "Price", value: "₹ 75 Lakh" },
    ],
    badges: ["Concierge", "City View", "Private Balcony"],
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/1200x/99/51/43/99514316becb49ed7b2ea57724c17536.jpg",
    type: "Alpine Chalet",
    address: "Whisperwind Lodge",
    subtitle: "Secluded Log Cabin by the forest edge",
    specs: [
      { label: "Beds", value: "3" },
      { label: "Baths", value: "2" },
      { label: "Area", value: "2,100 SqFt" },
      { label: "Price", value: "₹ 5.2 Cr" },
    ],
    badges: ["Secluded", "Forest Views", "Fireplace"],
  },
];

// ========================================
// 2. SLIDE COMPONENT
// ========================================
const Slide = ({ property, index, isActive, setActiveIndex }) => {
  const { image, type, address, subtitle, specs, badges } = property;

  const slideClass = isActive
    ? "flex-[2] md:flex-[2.5]"
    : "flex-[0.6] md:flex-1 grayscale hover:filter-none";

  // FIX: NUMBER ALWAYS VISIBLE ON MOBILE
  const numberPosition = isActive
    ? "top-2 left-2 text-lg sm:text-2xl md:text-4xl"
    : "top-2 left-2 text-xl sm:text-5xl md:text-7xl";

  const handleClick = () => {
    setActiveIndex(isActive ? -1 : index);
  };

  return (
    <div
      className={`relative h-full bg-cover bg-center transition-all duration-700 ease-in-out cursor-pointer overflow-hidden ${slideClass}`}
      style={{ backgroundImage: `url('${image}')` }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* NUMBER FIXED FOR MOBILE */}
      <div
        className={`absolute font-light text-white/70 z-30 transition-all duration-700 ${numberPosition}`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* SIDE LABEL */}
      <div
        className={`absolute bottom-24 left-2 text-[10px] sm:text-sm text-white/70 transition-all duration-700 ${
          isActive ? "opacity-0" : "rotate-[-90deg] opacity-100"
        }`}
      >
        {type}
      </div>

      {/* ADD / MINUS BUTTON */}
      <div
        className={`absolute bottom-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-green-400 flex items-center justify-center z-30 transition-all ${
          isActive
            ? "bg-green-400/20 hover:bg-green-400/30"
            : "hover:bg-green-400/20"
        }`}
      >
        <Plus
          className={`w-4 h-4 text-green-400 absolute transition-all ${
            isActive ? "opacity-0 scale-0 rotate-180" : "opacity-100 rotate-0"
          }`}
        />

        <div
          className={`absolute w-4 h-[2px] bg-green-400 transition-all ${
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </div>

      {/* CONTENT */}
      <div
        className={`absolute left-4 right-4 bottom-6 sm:bottom-10 md:bottom-20 text-white z-20 transition-all duration-700 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs sm:text-sm font-light mb-1">{type}</p>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-light mb-1">
          {address}
        </h2>

        <p className="text-xs sm:text-sm text-white/80 mb-4">{subtitle}</p>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-b border-white/20 py-3 text-xs sm:text-sm md:text-lg">
          {specs.map((spec, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-white/70">{spec.label}</span>
              <span className="text-white">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="px-2 py-1 bg-white/10 text-green-300 text-xs rounded-full"
            >
              • {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========================================
// 3. MAIN SLIDER
// ========================================
const AccordionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div
      className="
      w-full 
      max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl
      h-[65vh] sm:h-[75vh] md:h-[90vh]
      relative overflow-hidden shadow-xl
    "
    >
      {/* <div className="absolute top-3 left-3 text-[10px] sm:text-xs font-semibold flex items-center gap-1 bg-white/40 px-2 py-1 rounded-full backdrop-blur-sm border z-20">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Featured Listings
      </div> */}

      <div className="flex h-full">
        {PROPERTY_DATA.map((property, index) => (
          <Slide
            key={property.id}
            property={property}
            index={index}
            isActive={activeIndex === index}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
};

// ========================================
// 4. APP
// ========================================
export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
        MODERN  LISTINGS
      </h1>

      <AccordionSlider />
    </div>
  );
}
