import React from "react";
import {
  CreditCardIcon,
  SparklesIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

// --- Animation Variants ---

// Variants for the overall container (staggering children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child's animation
      delayChildren: 0.2, // Delay before the first child starts
    },
  },
};

// Variants for individual service cards: Slide, Rotate, and Scale up
const cardVariants = {
  hidden: { y: 100, opacity: 0, scale: 0.85, rotate: 2 }, // Added subtle rotation and scale
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
    },
  },
  hover: {
    y: -10, // More pronounced lift
    scale: 1.02,
    boxShadow: "0 30px 60px -15px rgba(29, 78, 216, 0.4)", // Darker blue shadow
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Variants for the icon within the card on hover (3D Tilt)
const iconBoxVariants = {
  initial: { perspective: 1000 },
  hover: {
    rotateY: [0, 10, -10, 0], // Quick 3D tilt effect on the Y-axis
    transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 10 },
  },
};

// Variants for header text to animate from sides
const headerTextVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const headerTextVariantsRight = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
};

// --- Service Data (using a consistent accent) ---
const services = [
  {
    title: "Pay on Credit",
    description: "Pay your rent using Credit Card securely, earn rewards.",
    icon: CreditCardIcon,
  },
  {
    title: "Housing Premium",
    description: "Instant access to zero brokerage properties, exclusively.",
    icon: SparklesIcon,
  },
  {
    title: "Home Loans",
    description: "Lowest interest rate offers from top banks, hassle-free.",
    icon: HomeIcon,
  },
  {
    title: "Housing Protect",
    description: "Protection against cyber frauds and scams for peace of mind.",
    icon: ShieldCheckIcon,
  },
];

// The main component must be named App and exported as default
function App() {
  return (
    // FULL WIDTH BACKGROUND: Applied to the section itself
    <section className="bg-gray-100 py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 overflow-hidden font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header with Animations */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 md:gap-4 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Decorative Gradient Line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{ originX: 0 }}
          />

          <div className="mt-6">
            <motion.h2
              className="text-3xl sm:text-4xl font-light text-gray-600 leading-snug font-inter" // reduced size, softer tone
              variants={headerTextVariants}
            >
              Elevate Your Home Journey
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 font-light font-inter" // lighter gradient text
                variants={headerTextVariantsRight}
              >
                with SpaceWala Edge
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-500 mt-3 max-w-2xl font-light font-inter" // smaller & lighter paragraph
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.5 }}
            >
              Discover exclusive services designed to simplify every aspect of your
              property experience.
            </motion.p>
          </div>

          <motion.button
            className="group relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-base font-inter whitespace-nowrap self-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(37, 99, 235, 0.5)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Explore All Services{" "}
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
              &rarr;
            </span>
          </motion.button>
        </motion.div>

        {/* Cards Grid with Staggered Slide, Rotate, and Scale Animations */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-5 border border-gray-200 relative overflow-hidden cursor-pointer font-inter transform hover:border-blue-300 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Icon Section - Animated 3D Tilt on Hover */}
                <motion.div
                  className="bg-gradient-to-r from-teal-50 to-blue-100 rounded-2xl p-4 w-fit relative z-10"
                  variants={iconBoxVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Icon className="h-9 w-9 text-blue-600 group-hover:text-teal-700 transition-colors duration-300" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300 font-inter">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-600 font-inter">
                    {service.description}
                  </p>
                </div>

                {/* Animated "Learn More" */}
                <motion.div
                  className="pt-3"
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-blue-600 font-semibold text-base flex items-center font-inter">
                    Learn More
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default App;