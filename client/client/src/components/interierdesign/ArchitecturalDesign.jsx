import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Users, Lightbulb, Ruler, FileText } from "lucide-react";
import { motion } from "framer-motion";

const ArchitecturalDesign = () => {
  const navigate = useNavigate();

  const process = [
    {
      title: "Consultation & Briefing",
      description:
        "We understand your vision, requirements, and budget to create a comprehensive project brief.",
      Icon: Users,
    },
    {
      title: "Concept Development",
      description:
        "Our architects create initial concepts and spatial layouts tailored to your needs.",
      Icon: Lightbulb,
    },
    {
      title: "Design Development",
      description:
        "Detailed architectural drawings, 3D visualizations, and material selections.",
      Icon: Ruler,
    },
    {
      title: "Construction Documentation",
      description:
        "Comprehensive technical drawings and specifications for construction.",
      Icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100 overflow-hidden">
      {/* ===== Floating Background Effects ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-10 left-10"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 bottom-10 right-10"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ===== INTRODUCTION SECTION ===== */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT TEXT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-light text-gray-800 leading-tight">
              Where <span className="text-blue-600 font-semibold">Architecture</span> Meets{" "}
              <span className="text-indigo-600 font-semibold">Interior Excellence</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At <span className="font-semibold text-blue-700">Edge Expert</span>, we merge design precision and
              creative innovation to craft breathtaking spaces that balance function and form — turning visions into architectural reality.
            </p>

            <div className="space-y-4">
              {[
                "Complete architectural design and planning",
                "Structural engineering coordination",
                "3D modeling and visualization",
                "Sustainable and eco-friendly designs",
                "Seamless interior-architecture integration",
                "Building compliance and regulations",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                    <Check className="w-5 h-5 text-blue-600 group-hover:text-white transition-all duration-300" />
                  </div>
                  <span className="text-base md:text-lg text-gray-700 group-hover:text-blue-600 transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {[
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600",
              ].map((src, i) => (
                <motion.img
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  transition={{ duration: 0.3 }}
                  src={src}
                  alt={`Architecture ${i}`}
                  className={`rounded-3xl shadow-2xl object-cover ${
                    i % 2 === 0 ? "h-72" : "h-60 mt-8"
                  } w-full`}
                />
              ))}
            </div>

            {/* Floating Gradient Circles */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-full opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-300 rounded-full opacity-20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-blue-50 to-white relative overflow-hidden">
        {/* Floating Light Effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl top-20 left-32"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            Our Design Process
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Every masterpiece begins with a method — here’s how we transform your ideas into breathtaking spaces.
          </p>
        </motion.div>

        {/* PROCESS CARDS */}
        <div className="flex flex-wrap justify-center gap-10 px-4">
          {process.map((step, index) => {
            const IconComponent = step.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{
                  scale: 1.07,
                  rotateY: 6,
                  boxShadow: "0px 15px 40px rgba(0,0,0,0.2)",
                }}
                className="relative bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center w-full sm:w-[320px] md:w-[340px] lg:w-[300px] backdrop-blur-md border border-gray-100"
              >
                <motion.div
                  className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: 10,
                    background: "linear-gradient(to bottom right, #3b82f6, #6366f1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className="w-10 h-10 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ArchitecturalDesign;
