import React from "react";
import { motion } from "framer-motion";
import { Layout, Zap, Palette, DollarSign, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Space Planning",
    description:
      "Perfecting layout, flow, and ergonomics to maximize utility and create harmonious living spaces.",
    benefits: ["Optimal room flow", "Ergonomic design", "Space optimization"],
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Zap,
    title: "3D Visualization",
    description:
      "See your personalized design concept come to life with realistic 3D renderings before any construction begins.",
    benefits: ["Realistic previews", "Easy modifications", "No surprises"],
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Palette,
    title: "Material Curation",
    description:
      "Selecting quality, budget-friendly materials and stylish finishes that match your aesthetic and lifestyle.",
    benefits: ["Quality materials", "Budget options", "Style matching"],
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: DollarSign,
    title: "Budget Optimization",
    description:
      "Value-driven design ensuring high impact without overspending. We maximize your investment in every detail.",
    benefits: ["Cost tracking", "Value focus", "No hidden costs"],
    gradient: "from-yellow-400 to-orange-500",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background floating circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-24 w-64 h-64 bg-orange-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-5">
            Comprehensive{" "}
            <span className="text-orange-500">Architectural Solutions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore tailored interior design solutions that balance beauty,
            comfort, and function — crafted to elevate your lifestyle.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`group relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg 
                          hover:shadow-2xl border border-gray-100 transition-all duration-500 
                          hover:-translate-y-3 hover:border-transparent hover:bg-gradient-to-br ${feature.gradient}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Inner Card Content */}
              <div className="relative z-10 flex flex-col items-center text-center p-8 sm:p-10 w-full h-full">
                {/* Icon Container */}
                <div
                  className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full 
                             bg-gradient-to-br from-orange-100 to-orange-200 shadow-md mb-5 
                             group-hover:from-white group-hover:to-white transition-all duration-300 transform 
                             group-hover:scale-110"
                >
                  <feature.icon
                    className="h-10 w-10 sm:h-12 sm:w-12 text-orange-600 group-hover:text-orange-500 transition-colors duration-300"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 group-hover:text-white/90 text-sm sm:text-base leading-relaxed mb-5 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-sm sm:text-base">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4 text-orange-400 group-hover:text-white transition-colors duration-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overlay on hover (subtle effect, not hiding icons) */}
              <motion.div
                className="absolute inset-0 bg-black/10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
