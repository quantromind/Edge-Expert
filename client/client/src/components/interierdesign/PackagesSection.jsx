import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Crown,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Zap,
  ArrowLeft,
} from "lucide-react";

const packages = [
  {
    id: 1,
    title: "Essential Tier",
    price: "₹1.5L – ₹3L",
    icon: ShieldCheck,
    features: [
      "2BHK Standard Interior",
      "Basic Material Selection",
      "2 Layout Options",
      "Wardrobe + TV Unit",
      "LED Panel Ceiling (Living)",
      "Standard Fixtures & Fittings",
    ],
  },
  {
    id: 2,
    title: "Signature System",
    price: "₹3L – ₹6L",
    icon: TrendingUp,
    features: [
      "Premium Laminates & Finishes",
      "5+ 3D Concepts & Revisions",
      "Modular Kitchen (Custom)",
      "Premium Lighting Setup",
      "False Ceiling (Full Home)",
      "Dedicated Project Designer",
    ],
    popular: true,
  },
  {
    id: 4,
    title: "Executive Pro",
    price: "₹4L – ₹8L",
    icon: Zap,
    features: [
      "Dedicated Senior Designer",
      "Priority Project Scheduling",
      "Full Automation Integration Ready",
      "Imported Hardware Upgrades",
      "Advanced Lighting Controls",
      "White Glove Installation Service",
    ],
  },
  {
    id: 3,
    title: "Elysian Luxury",
    price: "₹6L – ₹12L+",
    icon: Crown,
    features: [
      "High-End Veneers & Imported Finishes",
      "Personalized Material Sourcing",
      "Luxury Modular Kitchen",
      "Walk-in Wardrobe Design",
      "Smart Home Automation Options",
      "Full Premium 3D + VR Tour",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative pt-40 pb-52 overflow-hidden border-b border-gray-200"
  >
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/b4/14/a6/b414a6a24b1d6a857803f51b279fda59.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 text-center relative z-10 text-white">
      <motion.p
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-lg font-light uppercase tracking-widest text-gray-400 mb-4"
      >
        PROFESSIONAL DESIGN SOLUTIONS
      </motion.p>

      <motion.h1
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="text-7xl md:text-8xl font-light leading-tight mb-8"
      >
        <span className="text-white">
          The <span className="font-medium text-gray-300">Premium</span> Standard
        </span>
        <br />
        <span className="text-gray-300">for Interior Systems</span>
      </motion.h1>
    </div>
  </motion.div>
);

const PricingPackagesSection = () => {
  const unifiedButtonClass =
    "bg-black hover:bg-gray-800 text-white shadow-lg shadow-gray-600/50 transition-all duration-300 ease-in-out";

  return (
    <div className="py-20 md:py-28 font-sans">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;

            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  boxShadow: "0 15px 40px -5px rgba(0,0,0,0.25)",
                }}
                className="relative bg-white rounded-xl shadow-2xl 
                  flex flex-col p-6 h-full border border-gray-300 
                  transition duration-300 w-full max-w-[280px] mx-auto"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 
                    bg-black text-white text-sm font-medium 
                    px-5 py-2 rounded-full shadow-xl ring-4 ring-white z-20 whitespace-nowrap">
                    <TrendingUp className="inline w-4 h-4 mr-2 mb-0.5" />
                    EDITOR'S CHOICE
                  </div>
                )}

                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 text-center">
                    {pkg.title}
                  </h3>
                </div>

                <ul className="space-y-3 flex-grow mb-4">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                      <span className="text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-200 mb-4 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Estimated Cost Range (INR)
                  </p>
                  <p className="text-3xl font-normal text-black">{pkg.price}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-lg font-medium text-lg 
                    ${unifiedButtonClass} flex items-center justify-center`}
                >
                  Start Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 via-gray-50 to-white font-sans min-h-screen relative">

      {/* ✅ BACK BUTTON LOWERED */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-20 left-4 sm:top-20 sm:left-10
          bg-white/90 backdrop-blur-md border border-gray-300 
          text-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg 
          flex items-center gap-1 text-[10px] sm:text-sm shadow-md z-50"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      <HeroSection />
      <PricingPackagesSection />
    </div>
  );
};

export default App;
