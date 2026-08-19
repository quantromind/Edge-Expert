import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { motion } from "framer-motion";

// Imports for other sections
import TestimonialsSection from "./TestimonialsSection";
import ServicesSection from "./ServicesSection";
import GallerySection from "./GallerySection";
import DesignProcessSection from "./DesignProcessSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import ArchitecturalDesign from "./ArchitecturalDesign";

// ========================================
// 1. HERO SLIDES DATA (ADDED ONE NEW IMAGE)
// ========================================
const HERO_SLIDES = [
  {
    id: 1,
    image:
      "https://www.gharjunction.com/img/blog/218.jpg",
    type: "Luxury 3BHK",
    title: "Luxury Penthouse",
    subtitle:
      "Maximizing Every Square Foot with Smart, Value-Driven Interior Design Solutions",
    badges: ["Living Room", "Kitchen", "Bedroom"],
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/44/90/a1/4490a1fbbc960ad9e64c3967c7545fed.jpg",
    type: "Modern Apartment",
    title: "Home Interior Design",
    subtitle:
      "Maximizing Every Square Foot with Smart, Value-Driven Interior Design Solutions",
    badges: ["Workspace", "Dining", "Bathroom"],
  },
  {
    id: 3,
    image:
      "https://cdn.homedit.com/wp-content/uploads/scandinavian-design/Scandinavian-Interior-Design.jpg",
    type: "Elegant Villa",
    title: "Scandinavian Minimal Living",
    subtitle:
      "Maximizing Every Square Foot with Smart, Value-Driven Interior Design Solutions",
    badges: ["Patio", "Master Bedroom", "Kitchen"],
  },

  // ⭐⭐⭐ ADDED NEW SLIDE ⭐⭐⭐
  {
    id: 4,
    image:
      "https://www.decorpot.com/images/287848561Industrial-Style-Interior-Design-Ideas-Main.jpg",
    type: "Industrial Workspace",
    title: "Industrial Interior Design",
    subtitle:
      "A perfect blend of raw materials, open spaces & modern creative work culture.",
    badges: ["Workspace", "Open Office", "Industrial"],
  },
];

// ========================================
// 2. SLIDE COMPONENT (UNCHANGED)
// ========================================
const Slide = ({ slide, index, isActive, setActiveIndex }) => {
  const slideClass = isActive
    ? "flex-[2] md:flex-[2.5]"
    : "flex-[0.6] md:flex-1 grayscale hover:filter-none";

  const handleClick = () => setActiveIndex(isActive ? -1 : index);

  return (
    <motion.div
      className={`relative h-full bg-cover bg-center transition-all duration-700 ease-in-out cursor-pointer overflow-hidden ${slideClass}`}
      style={{ backgroundImage: `url('${slide.image}')` }}
      onClick={handleClick}
      layout
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Plus Button */}
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
      <motion.div
        className={`absolute left-4 right-4 bottom-10 text-white z-20`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-2">
          {slide.title}{" "}
          <span className="text-blue-300 block sm:inline-block mt-1 sm:mt-0 sm:ml-3">
            by Edge Expert
          </span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl mb-4 text-blue-100 max-w-2xl">
          {slide.subtitle}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {slide.badges.map((badge, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/10 text-green-300 text-xs rounded-full"
            >
              • {badge}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ========================================
// 3. ACCORDION HERO SLIDER (UNCHANGED BUT NOW USES 4 SLIDES)
// ========================================
const AccordionHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[90vh] sm:h-screen relative flex overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <Slide
          key={slide.id}
          slide={slide}
          index={index}
          isActive={activeIndex === index}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
  );
};

// ========================================
// 4. MAIN COMPONENT (UNCHANGED)
// ========================================
const InteriorDesign = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white w-full overflow-hidden relative">
      {/* BACK BUTTON */}
      <div className="absolute top-20 left-4 sm:top-20 sm:left-10 z-30">
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Back
        </button>
      </div>

      {/* HERO SLIDER */}
      <AccordionHero />

      {/* SECTIONS */}
      <WhyChooseUsSection />
      <DesignProcessSection />
      <ArchitecturalDesign />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
    </div>
  );
};

export default InteriorDesign;
