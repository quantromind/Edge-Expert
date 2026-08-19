// src/components/housekeeping/PaintingDetails.jsx

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Brush, Droplet, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function PaintingDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans bg-gray-50">

      {/* 🌈 HERO SECTION */}
      <section className="relative bg-gradient-to-br from-purple-700 to-purple-900 text-white py-20 px-6 shadow-xl overflow-hidden">
        
        {/* Soft Background Glow */}
        <div className="absolute inset-0 bg-[url('https://png.pngtree.com/thumb_back/fw800/background/20231003/pngtree-lavender-fantasy-the-celestial-majesty-of-a-purple-cosmic-sky-image_13597726.png')] 
                        opacity-20 bg-cover bg-center blur-sm"></div>

        {/* Floating Back Button */}
        <motion.div
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md hover:bg-white/30 
                     px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-2 
                     text-white text-sm shadow-md transition"
        >
          <ArrowLeft size={16} /> Back
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Home Painting Service
          </h1>

          <p className="mt-4 text-lg md:text-xl text-purple-200 max-w-xl mx-auto leading-relaxed">
            Professional wall painting with high-quality materials & premium finishes.
          </p>
        </motion.div>

      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="max-w-6xl mx-auto py-14 px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* LEFT: IMAGE */}
          <motion.div
            variants={fadeInUp}
            className="relative group"
          >
            <div className="absolute inset-0 bg-purple-300 blur-3xl opacity-20 rounded-3xl"></div>

            <motion.img
              src="https://i.pinimg.com/1200x/bf/60/4f/bf604fa0b003445472ab8bf9388980d5.jpg"
              className="rounded-3xl shadow-2xl w-full object-cover 
                       border border-white/40 group-hover:scale-[1.02] 
                       transition-transform duration-500"
            />
          </motion.div>

          {/* RIGHT: DETAILS */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Professional Painting Services
            </h2>

            <div className="space-y-6">

              {[
                {
                  icon: <Brush className="text-purple-600" size={26} />,
                  text: "Interior & exterior wall painting with professional craftsmanship."
                },
                {
                  icon: <Palette className="text-purple-600" size={26} />,
                  text: "Premium textures, stencils, and luxury paint designs."
                },
                {
                  icon: <Droplet className="text-purple-600" size={26} />,
                  text: "Branded, long-lasting, weather-resistant paint materials."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, x: 6 }}
                  className="flex items-start gap-4 p-4 bg-white border 
                             rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="p-3 rounded-full bg-purple-100 shadow-inner">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">{item.text}</p>
                </motion.div>
              ))}

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 bg-purple-600 hover:bg-purple-700 
                         text-white px-8 py-3 rounded-full shadow-lg 
                         transition text-lg font-semibold"
            >
              Book Painting Service
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
