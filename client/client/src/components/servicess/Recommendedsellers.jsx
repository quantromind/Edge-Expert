
import { Heart, MapPin, ChevronRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

// Images
import img1 from "../../assets/servicess/vm-logo.png";
import img2 from "../../assets/servicess/ms-initials-yellow.jpg";
import img3 from "../../assets/servicess/empire-logo-black.jpg";
import img4 from "../../assets/servicess/dj-initials.jpg";
import img5 from "../../assets/servicess/m-initial-yellow.jpg";
import img6 from "../../assets/servicess/ab.jpg";

const sellers = [
  {
    id: 1,
    name: "VM Prosperity Group",
    avatar: img1,
    badge: "HOUSING EXPERT PRO",
    locations: ["Nanded", "Hinjewadi"],
    experience: "16 years",
    properties: "17",
  },
  {
    id: 2,
    name: "Mandar Shantaram Marne",
    avatar: img2,
    badge: "HOUSING EXPERT PRO",
    locations: ["Anand Nagar", "Vadgaon Budruk"],
    experience: "10 years",
    properties: "30",
  },
  {
    id: 3,
    name: "The Empire Realty",
    avatar: img3,
    badge: "HOUSING EXPERT PRO",
    locations: ["Ambegaon Budruk", "Dhayari"],
    experience: "12 years",
    properties: "38",
  },
  {
    id: 4,
    name: "Deepak Jagasia",
    avatar: img4,
    badge: "HOUSING EXPERT",
    locations: ["Worli", "Lower Parel", "Bandra"],
    experience: "22 years",
    properties: "121",
  },
  {
    id: 5,
    name: "Mahesh Chugh",
    avatar: img5,
    badge: "HOUSING EXPERT",
    locations: ["Mundhwa", "Bavdhan"],
    experience: "0.5 years",
    properties: "39",
  },
  {
    id: 6,
    name: "Akash Bhore",
    avatar: img6,
    badge: "HOUSING EXPERT",
    locations: ["Magarpatta City", "Viman Nagar"],
    experience: "0.5 years",
    properties: "8",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.9, rotateX: -10 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 70, damping: 12 },
  },
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: "0 25px 50px rgba(0,255,200,0.15)",
    transition: { duration: 0.3 },
  },
};

export default function RecommendedSellers() {
  return (
    <section className="w-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 py-14 px-6 sm:px-10 relative overflow-hidden font-inter">
      {/* Header */}
      <motion.div
        className="mb-10 border-b border-teal-500/30 pb-5"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'spring', damping: 12 }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight text-center">
          Meet the Expert Tier 🌟
        </h2>
        <p className="text-lg text-teal-300 text-center font-medium">
          The top 1% of certified brokers, vetted for excellence and results.
        </p>
        <div className="flex justify-center mt-3">
          <a
            href="#"
            className="flex items-center text-teal-400 hover:text-teal-200 transition"
          >
            View All Vetted Agents <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </motion.div>

      {/* Grid Section */}
      <motion.div
        className="max-w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {sellers.map((seller) => (
          <motion.div
            key={seller.id}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between border border-white/20 shadow-lg relative overflow-hidden group"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            <div className="relative z-10">
              {/* Avatar + Info */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-0.5 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-md">
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-gray-900"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {seller.name}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 text-[10px] font-semibold uppercase rounded-full mt-1 ${
                        seller.badge.includes("PRO")
                          ? "bg-teal-500 text-gray-900 shadow-md"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {seller.badge}
                    </span>
                  </div>
                </div>
                <motion.button
                  className="text-white/50 hover:text-red-400 transition self-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </motion.button>
              </div>

              {/* Locations */}
              <div className="mb-5 border-t border-white/20 pt-3">
                <div className="flex items-center text-sm text-teal-400 font-semibold mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  Service Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {seller.locations.slice(0, 2).map((loc, i) => (
                    <span
                      key={i}
                      className="bg-white/10 text-teal-300 px-3 py-1 rounded-full text-xs border border-teal-500/40 hover:bg-white/20 transition"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-around items-center border-t border-white/20 pt-3">
                <div className="text-center">
                  <span className="block text-2xl font-extrabold text-teal-400">
                    {seller.experience.replace(" years", "")}
                  </span>
                  <span className="block text-xs text-gray-400 uppercase tracking-wide">
                    Years Exp
                  </span>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="text-center">
                  <span className="block text-2xl font-extrabold text-teal-400">
                    {seller.properties}
                  </span>
                  <span className="block text-xs text-gray-400 uppercase tracking-wide">
                    Listings
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <motion.button
              className="mt-6 w-full bg-transparent border-2 border-teal-500 text-teal-400 font-semibold py-2.5 rounded-lg transition duration-300 text-sm hover:bg-teal-500 hover:text-gray-900 hover:shadow-lg hover:shadow-teal-500/40"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

