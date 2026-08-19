import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Career() {
  const sliderImages = [
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  ];

  const stats = [
    { value: "10+", label: "Cities Covered" },
    { value: "500+", label: "Happy Employees" },
    { value: "1000+", label: "Properties Sold" },
    { value: "8+", label: "Years Experience" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="h-screen relative">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sliderImages[index]})` }}
          />
        </AnimatePresence>

        {/* 🔽 DARKNESS KAMI KELI */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold leading-snug"
          >
            Build Your Career <br />
            <span className="block mt-1">in Real Estate</span>
          </motion.h1>

          <p className="mt-5 max-w-2xl text-base md:text-lg text-gray-200">
            Join Edge Expert — where ambition meets opportunity in India’s
            fastest-growing real estate platform.
          </p>

          <Link to="/apply">
            <button className="mt-8 px-10 py-4 bg-blue-600 rounded-2xl text-base font-semibold hover:bg-blue-700 transition shadow-xl hover:scale-105">
              Apply Now 🚀
            </button>
          </Link>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <h3 className="text-4xl font-extrabold text-blue-600">
                {s.value}
              </h3>
              <p className="mt-2 text-gray-600 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
