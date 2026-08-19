// src/components/housekeeping/RenovationDetails.jsx

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Hammer, Layers, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

export default function RenovationDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* 🔥 HERO SECTION */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white py-20 px-6 shadow-xl overflow-hidden">

        {/* Decorative Background Glow */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/premium-photo/green-abstract-background-design_983396-2857.jpg')] 
                        opacity-25 bg-cover bg-center blur-sm"></div>

        {/* Floating Back Button */}
        <motion.div
          onClick={() => navigate(-1)}
          whileHover={{ x: -6 }}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md hover:bg-white/30 
                     px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-2 
                     text-white shadow-md transition text-sm"
        >
          <ArrowLeft size={16} /> Back
        </motion.div>

        {/* HERO CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl tracking-tight">
            Home Renovation Service
          </h1>

          <p className="mt-4 text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Transform your home with premium renovation, redesign, and luxury finishing.
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* LEFT IMAGE */}
          <motion.div variants={fadeUp} className="relative group">
            <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 rounded-3xl"></div>

            <motion.img
              src="https://i.pinimg.com/1200x/fc/c2/6d/fcc26d313e54cfbba84011fe28f11da0.jpg"
              alt="Home Renovation"
              className="rounded-3xl shadow-2xl w-full object-cover 
                         border border-white/30 group-hover:scale-[1.02] 
                         transition-transform duration-500"
            />
          </motion.div>

          {/* RIGHT DETAILS */}
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Renovation Includes
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: <Hammer className="text-green-600" size={26} />,
                  text: "Complete home renovation with structural modification and layout redesign.",
                },
                {
                  icon: <Layers className="text-green-600" size={26} />,
                  text: "Modular kitchen, wardrobes, interior redesign & modern space planning.",
                },
                {
                  icon: <Home className="text-green-600" size={26} />,
                  text: "High-quality finishing using premium materials for a luxury look.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, x: 6 }}
                  className="flex items-start gap-4 p-4 bg-white border 
                             rounded-2xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="p-3 rounded-full bg-green-100 shadow-inner">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-green-600 hover:bg-green-700 
                         text-white px-8 py-3 rounded-full shadow-lg 
                         transition text-lg font-semibold"
            >
              Book Renovation Service
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
