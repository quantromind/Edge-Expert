import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Droplets,
  Sun,
  Building2,
  Recycle,
  Users,
  TreePine,
  Zap,
  Globe,
  Award,
} from "lucide-react";

// --- Stats & Practices ---
const stats = [
  { label: "Trees Planted", value: "5,000+", icon: <TreePine /> },
  { label: "Energy Saved", value: "30%", icon: <Zap /> },
  { label: "Solar Installations", value: "200+", icon: <Sun /> },
  { label: "Green Projects", value: "25+", icon: <Award /> },
];

const practices = [
  {
    icon: <Sun className="w-8 h-8 text-amber-500" />,
    title: "Renewable Energy",
    desc: "All our properties utilize solar panels, energy-efficient lighting, and renewable power sources to reduce carbon footprint.",
  },
  {
    icon: <Droplets className="w-8 h-8 text-blue-500" />,
    title: "Water Conservation",
    desc: "Rainwater harvesting, greywater recycling, and low-flow plumbing fixtures save thousands of litres annually.",
  },
  {
    icon: <Recycle className="w-8 h-8 text-indigo-500" />,
    title: "Sustainable Materials",
    desc: "We use recycled steel, eco-friendly concrete, and locally sourced materials to minimize environmental impact.",
  },
  {
    icon: <Building2 className="w-8 h-8 text-lime-600" />,
    title: "Smart Green Design",
    desc: "Our designs include cross ventilation, green roofs, and natural lighting to enhance efficiency and comfort.",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Sustainability = () => {
  return (
    <div className="bg-gray-50 font-sans min-h-screen text-gray-700">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/16/86/8a/16868acd67b8c45788ef95587626ab67.jpg')",
            opacity: 1,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto py-48 px-6 md:px-12 text-center text-white">
          <motion.h1
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light mb-4 leading-tight tracking-wide"
          >
            Building a <span className="text-emerald-300">Greener</span> Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto font-light mt-6 leading-relaxed"
          >
            At Edge Expert, sustainability isn’t an option — it’s a core
            commitment. We design eco-friendly communities that protect our
            planet for generations.
          </motion.p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Leaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-800">
              The Edge Expert Eco-Pledge
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
              Our goal is to lead the real estate industry by integrating
              eco-conscious design, renewable energy, and responsible community
              development. Every structure we build is a step toward a cleaner,
              greener tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-emerald-700 text-white shadow-inner">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8 px-6 md:px-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-4 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20"
            >
              <div className="flex justify-center mb-2 text-3xl text-emerald-300">
                {s.icon}
              </div>
              <h3 className="text-5xl font-light mb-1">{s.value}</h3>
              <p className="text-sm uppercase tracking-widest opacity-80 font-extralight">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PRACTICES */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-gray-800">
          Core Green Building Practices
        </h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {practices.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white shadow-md rounded-2xl p-8 text-left border border-gray-200 transition duration-300 hover:bg-emerald-50"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-emerald-100 mr-4">
                  {item.icon}
                </div>
                <h3 className="font-light text-xl text-gray-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* COMMUNITY */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Users className="w-14 h-14 text-emerald-600 mx-auto mb-4 p-2 border-2 border-emerald-300 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-800">
              Community & Social Impact
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-loose font-light">
              Sustainability is also about people. We engage in eco-initiatives
              like tree plantations, clean-up drives, and awareness workshops.
              Together, we nurture communities that value the planet.
            </p>
            <Globe className="w-20 h-20 text-emerald-700 mx-auto animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 md:px-12 bg-green-900 text-white text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
            Join Our Green Movement 🌱
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 font-light">
            Looking for an eco-friendly home? Partner with Edge Expert and make
            sustainability your lifestyle without compromising quality.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 opacity-30 md:opacity-50">
          <Recycle
            className="w-40 h-40 text-emerald-400 rotate-45"
            strokeWidth={0.5}
          />
        </div>
        <div className="absolute -bottom-20 -right-20 opacity-30 md:opacity-50">
          <Leaf
            className="w-48 h-48 text-emerald-400 -rotate-45"
            strokeWidth={0.5}
          />
        </div>
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#4ade80 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </section>
    </div>
  );
};

export default Sustainability;
