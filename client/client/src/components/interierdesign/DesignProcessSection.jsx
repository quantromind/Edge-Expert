import React, { useRef, useState } from "react";
import {
  Star,
  MapPin,
  ArrowLeftCircle,
  ArrowRightCircle,
  Phone,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

// =====================
// Designer Data
// =====================
const designerData = [
  {
    id: 1,
    name: "Modern Minimalist",
    rating: 4.7,
    experience: 5,
    location: "JP Nagar, Pune",
    image:
      "https://i.pinimg.com/originals/89/d9/b9/89d9b938281abeddc1449f97b331f17b.jpg",
    description:
      "Specialized in modern contemporary designs with space optimization.",
    projects: 120,
    responseTime: "2 hours",
    languages: ["English", "Hindi", "Kannada"],
  },
  {
    id: 2,
    name: "Contemporary Luxury",
    rating: 4.8,
    experience: 6,
    location: "Wakad, Pune",
    image:
      "https://i.pinimg.com/originals/87/a0/5b/87a05b03cf0aa5a7a258994d05158b6c.jpg",
    description:
      "Luxury and comfort blended into seamless design experiences.",
    projects: 180,
    responseTime: "1 hour",
    languages: ["English", "Hindi"],
  },
  {
    id: 3,
    name: "Scandinavian Studio",
    rating: 4.9,
    experience: 4,
    location: "Baner, Pune",
    image:
      "https://i.pinimg.com/originals/67/7b/f2/677bf2ea551a4f27fd645744c1d709da.jpg",
    description:
      "Clean lines, minimalism, and functionality define every creation.",
    projects: 140,
    responseTime: "3 hours",
    languages: ["English", "Hindi"],
  },
  {
    id: 4,
    name: "Decotales",
    rating: 4.6,
    experience: 7,
    location: "Bangalore",
    image:
      "https://i.pinimg.com/originals/ef/99/cd/ef99cdb78697823a66fda2177d2623ab.jpg",
    description: "Infusing stories into every corner of your living space.",
    projects: 160,
    responseTime: "2 hours",
    languages: ["English", "Hindi", "Kannada"],
  },
  {
    id: 5,
    name: "Urban Chic Interiors",
    rating: 4.8,
    experience: 5,
    location: "Mumbai",
    image:
      "https://i.pinimg.com/originals/89/d9/b9/89d9b938281abeddc1449f97b331f17b.jpg",
    description: "Urban style interiors with a luxurious, modern edge.",
    projects: 100,
    responseTime: "2 hours",
    languages: ["English", "Hindi"],
  },
  {
    id: 6,
    name: "Classic Revival",
    rating: 4.5,
    experience: 8,
    location: "Hyderabad",
    image:
      "https://i.pinimg.com/originals/87/a0/5b/87a05b03cf0aa5a7a258994d05158b6c.jpg",
    description:
      "Specializes in classic, timeless designs with premium finishes.",
    projects: 220,
    responseTime: "1 hour",
    languages: ["English", "Telugu"],
  },
  {
    id: 7,
    name: "Boho Aesthetic Studio",
    rating: 4.9,
    experience: 6,
    location: "Goa",
    image:
      "https://i.pinimg.com/originals/67/7b/f2/677bf2ea551a4f27fd645744c1d709da.jpg ",
    description:
      "Vibrant, earthy, and nature-inspired interiors for free-spirited souls.",
    projects: 175,
    responseTime: "2 hours",
    languages: ["English", "Hindi"],
  },
];

// =====================
// Main Component
// =====================
const DesignProcessSection = () => {
  const [selectedDesigner, setSelectedDesigner] = useState(designerData[0]);
  const scrollRef = useRef(null);

  const CARD_WIDTH = 320;
  const CARD_MARGIN = 16;
  const SCROLL_AMOUNT = CARD_WIDTH + CARD_MARGIN;

  const manualScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-900 via-cyan-700 to-teal-600 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl top-10 left-10"
          animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-teal-300/10 rounded-full blur-3xl bottom-0 right-0"
          animate={{ x: [0, -60, 60, 0], y: [0, -40, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
            Meet Our{" "}
            <span className="font-semibold text-cyan-300">Design Experts</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our curated list of expert designers — creating timeless and functional interiors.
          </p>
        </motion.div>

        {/* Selected Designer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Designer Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src={selectedDesigner.image}
              alt={selectedDesigner.name}
              className="w-full h-[480px] object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-3xl sm:text-4xl font-semibold mb-2">
                {selectedDesigner.name}
              </h3>
              <div className="flex items-center gap-2 mb-2 text-lg">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{selectedDesigner.rating} / 5</span>
                <span>• {selectedDesigner.experience} yrs exp.</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                {selectedDesigner.location}
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <h3 className="text-2xl font-semibold mb-3 text-cyan-200">
                About {selectedDesigner.name}
              </h3>
              <p className="text-blue-100 leading-relaxed mb-6 text-base sm:text-lg">
                {selectedDesigner.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-xl text-center border border-white/10">
                  <div className="text-2xl font-bold text-cyan-300">
                    {selectedDesigner.projects}+
                  </div>
                  <div className="text-sm text-blue-100">Projects</div>
                </div>
                <div className="p-4 bg-white/20 rounded-xl text-center border border-white/10">
                  <div className="text-2xl font-bold text-cyan-300">
                    {selectedDesigner.responseTime}
                  </div>
                  <div className="text-sm text-blue-100">Response Time</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-cyan-200 mb-2 text-sm uppercase tracking-wider">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDesigner.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white border border-white/10"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{ label: "Call Now", Icon: Phone }, { label: "WhatsApp", Icon: MessageCircle }, { label: "Book Meeting", Icon: Calendar }].map(
                (btn, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                  >
                    <btn.Icon className="h-5 w-5" />
                    {btn.label}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-16"
        >
          <h4 className="text-3xl font-semibold mb-8 text-center text-cyan-200">
            Explore More Designers
          </h4>

          <div className="relative">
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            >
              {designerData.map((designer) => (
                <motion.div
                  key={designer.id}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className={`flex-shrink-0 w-72 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300 snap-center ${
                    selectedDesigner.id === designer.id
                      ? "scale-105 border-cyan-400"
                      : "hover:border-cyan-300"
                  }`}
                  onClick={() => setSelectedDesigner(designer)}
                >
                  <img
                    src={designer.image}
                    alt={designer.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4 text-white">
                    <h5 className="font-semibold text-lg">{designer.name}</h5>
                    <div className="flex items-center text-sm text-blue-100">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {designer.rating} • {designer.experience} yrs
                    </div>
                    <div className="flex items-center text-xs text-blue-200 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {designer.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Buttons (spaced farther away) */}
            <button
              onClick={() => manualScroll("left")}
              className="hidden sm:flex absolute -left-17 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white shadow-lg z-10 transition-all duration-300"
            >
              <ArrowLeftCircle className="h-7 w-7" />
            </button>
            <button
              onClick={() => manualScroll("right")}
              className="hidden sm:flex absolute -right-17 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white shadow-lg z-10 transition-all duration-300"
            >
              <ArrowRightCircle className="h-7 w-7" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignProcessSection;
