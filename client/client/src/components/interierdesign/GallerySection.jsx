import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Transition Settings
const transitionSettings = { duration: 1.2, ease: "easeInOut" };

// --- Gallery Data
const designProjects = [
  {
    id: 1,
    title: "Compact Corner",
    image:
      "https://i.pinimg.com/736x/15/66/e1/1566e16e46a1f4b39b9d677ce2b16563.jpg",
  },
  {
    id: 2,
    title: "Family Flow",
    image:
      "https://i.pinimg.com/1200x/96/81/87/968187be31522522d93bd6dca9080dee.jpg",
  },
  {
    id: 3,
    title: "Productive Hub",
    image:
      "https://i.pinimg.com/1200x/98/d7/29/98d729b99de0faf62a7adbef134823b8.jpg",
  },
  {
    id: 4,
    title: "Scandinavian Retreat",
    image:
      "https://i.pinimg.com/736x/90/73/a4/9073a4df464e8f37ac169aeb3d5424d1.jpg",
  },
  {
    id: 5,
    title: "Luxury Living",
    image:
      "https://i.pinimg.com/1200x/36/37/03/363703f6df41cb22f61e2fec260aa72a.jpg",
  },
  {
    id: 6,
    title: "Eco Haven",
    image:
      "https://i.pinimg.com/1200x/5a/b2/5b/5ab25b7dea707fa35560702217d20595.jpg",
  },
  {
    id: 7,
    title: "Cafe Chic",
    image:
      "https://i.pinimg.com/1200x/55/da/24/55da24d3c8bfaee240610a86dac82199.jpg",
  },
  {
    id: 8,
    title: "Boho Bliss",
    image:
      "https://i.pinimg.com/1200x/8b/d4/1b/8bd41bdc615a406ed7b75bd63214e444.jpg",
  },
  {
    id: 9,
    title: "Corporate Calm",
    image:
      "https://i.pinimg.com/1200x/47/8c/f4/478cf4999828d871a749d365fd8a8614.jpg",
  },
];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-scroll effect every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % designProjects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative py-16 md:py-24 font-sans overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f9fafb 0%, #e0e7ff 30%, #fef3c7 70%, #fde68a 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-12 drop-shadow-sm">
          Our <span className="text-blue-700 font-semibold">Gallery</span>
        </h2>

        {/* --- Auto-Scroll Image Slider --- */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={designProjects[current].id}
              src={designProjects[current].image}
              alt={designProjects[current].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={transitionSettings}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* --- Overlay Title --- */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">
              {designProjects[current].title}
            </h3>
          </div>
        </div>

        {/* --- Thumbnails Navigation --- */}
        <div className="flex justify-center flex-wrap gap-4 mt-10">
          {designProjects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => setCurrent(index)}
              whileHover={{ scale: 1.1 }}
              className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                index === current
                  ? "border-orange-500 shadow-lg"
                  : "border-transparent"
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-24 h-20 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
