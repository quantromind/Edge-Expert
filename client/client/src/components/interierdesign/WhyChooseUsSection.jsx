import React from "react";
import { Users, FileText, Diamond } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Users,
      title_bold: "Verified Designers",
      title_light: "Handpicked, Experienced &",
      sub_text: "",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      iconColor: "text-pink-500",
    },
    {
      icon: FileText,
      title_bold: "Compare Quotes & Pay Right Price",
      title_light: "Assistance in understanding Quotations,",
      sub_text: "",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-500",
    },
    {
      icon: Diamond,
      title_bold: "Rewards worth ₹90K",
      title_light: "Exclusive discounts + Additional",
      sub_text: "Know More",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Soft Gradient Accents */}
      <div className="absolute top-10 left-20 w-60 h-60 bg-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Why choose us?
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            Discover why thousands of customers trust us to bring their dream spaces to life.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className={`relative ${benefit.bgColor} border ${benefit.borderColor} 
                            rounded-2xl shadow-md p-8 min-h-[180px] flex flex-col justify-between 
                            hover:shadow-xl transition-all duration-500 ease-out`}
              >
                {/* Floating Animated Icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-6 left-6 bg-white shadow-md rounded-xl p-3"
                >
                  <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </motion.div>

                <div className="mt-16">
                  {/* Top line (light text) */}
                  {benefit.title_light && (
                    <p className="text-gray-700 font-light text-base mb-1">
                      {benefit.title_light}
                    </p>
                  )}

                  {/* Bold main line */}
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    {benefit.title_bold}
                  </h3>

                  {/* Optional link */}
                  {benefit.sub_text && (
                    <a
                      href="#"
                      className="text-sm text-blue-600 font-semibold inline-flex items-center mt-2 hover:underline"
                    >
                      {benefit.sub_text}
                      <span className="ml-1">→</span>
                    </a>
                  )}
                </div>

                {/* Subtle glowing edge animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-transparent"
                  whileHover={{
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    transition: { duration: 0.3 },
                  }}
                ></motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
