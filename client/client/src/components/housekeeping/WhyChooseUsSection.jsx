// src/components/housekeeping/WhyChooseUsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  CheckCircle,
  Recycle,
  Zap,
} from "lucide-react";

// Card entrance animation
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Continuous floating animation
const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Icon pulsing animation
const pulseAnimation = {
  animate: {
    scale: [1, 1.09, 1],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const staggerParent = {
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const WhyChooseUsSection = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 blur-[200px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-300 blur-[240px] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full shadow-md border border-white/40">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">WHY CHOOSE US</span>
          </div>

          {/* Title → Changed as you requested */}
          <h2 className="text-3xl md:text-4xl font-bold mt-4 tracking-tight text-gray-800">
            The Edge Expert Excellence
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience industry-leading quality with trusted professionals,
            modern tools and eco-safe cleaning solutions.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {[
            {
              icon: <ShieldCheck className="h-12 w-12 text-white" />,
              title: "Verified Professionals",
              text: "Certified, background-checked experts with 5+ years of experience.",
              stats: "500+ Experts",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: <CheckCircle className="h-12 w-12 text-white" />,
              title: "100% Satisfaction",
              text: "We ensure perfection—your happiness is our top priority.",
              stats: "99% Happy Clients",
              gradient: "from-green-500 to-emerald-400",
            },
            {
              icon: <Recycle className="h-12 w-12 text-white" />,
              title: "Eco-Friendly Products",
              text: "Safe, non-toxic, biodegradable products for homes & offices.",
              stats: "Eco Safe",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: <Zap className="h-12 w-12 text-white" />,
              title: "Quick Response",
              text: "Get instant confirmation with same-day service availability.",
              stats: "15 Min Response",
              gradient: "from-orange-500 to-yellow-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              {...floatAnimation} // continuous floating
              whileHover={{
                y: -18,
                scale: 1.05,
                rotate: 1,
                boxShadow: "0 30px 80px -10px rgba(0,0,0,0.25)",
                transition: { duration: 0.4 },
              }}
              className="group p-7 rounded-3xl bg-white/80 backdrop-blur-xl 
                         border border-gray-200 shadow-xl hover:shadow-2xl
                         transition-all duration-300"
            >
              {/* Icon with pulse animation */}
              <motion.div
                {...pulseAnimation}
                className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${item.gradient}
                            flex items-center justify-center mx-auto shadow-lg`}
              >
                {item.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4">
                {item.text}
              </p>

              <div className="inline-block px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">
                  {item.stats}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
