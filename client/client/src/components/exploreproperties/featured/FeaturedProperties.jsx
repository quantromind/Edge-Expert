import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  DollarSign,
  Star,
  Home,
  Building2,
  Gem,
  Crown,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuredData = [
  {
    title: "Skyline Residences",
    location: "Bandra West, Mumbai",
    price: "₹7.2 Cr* Onwards",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1200",
    rating: 4.9,
  },
  {
    title: "Emerald Greens",
    location: "Golf Course Road, Gurugram",
    price: "₹6.5 Cr* Onwards",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=1200",
    rating: 4.8,
  },
  {
    title: "Palm Vista Villas",
    location: "Koregaon Park, Pune",
    price: "₹4.9 Cr* Onwards",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80&w=1200",
    rating: 4.7,
  },
  {
    title: "Ocean Crest",
    location: "ECR, Chennai",
    price: "₹5.4 Cr* Onwards",
    image:
      "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&q=80&w=1200",
    rating: 4.9,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

const FeaturedProperties = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-[#faf7f2] via-[#fdfcfb] to-[#f5efe0] text-gray-900 overflow-hidden">
      {/* ===== Subtle Background Overlays ===== */}
      <div className="absolute inset-0 bg-[url('https://i.pinimg.com/originals/5d/0e/eb/5d0eeb6b0e3d73b2e14f3e79daaa2f84.jpg')] bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)]"></div>

      {/* ===============================
          🌆 HERO SECTION (Full Navbar Overlay)
      =============================== */}
      <section className="relative h-[100vh] w-full flex items-center justify-center text-center bg-[url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center">
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blue-900/30 to-black/70 z-0"></div>

        {/* 🔙 Back Button */}
        <div className="absolute top-24 left-10 z-20">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
           
          </button>
        </div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl mx-auto text-white px-4"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 leading-tight">
            Discover Exquisite Homes for the Elite
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light leading-relaxed mb-6 sm:mb-8">
            Where architecture meets artistry — find your sanctuary among India’s
            most luxurious addresses.
          </p>
        </motion.div>
      </section>

      {/* ===============================
          🏙️ FEATURED PROPERTIES HEADER
      =============================== */}
      <section className="relative text-center py-12 sm:py-16 px-4 sm:px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row justify-center items-center mb-3 sm:mb-4"
        >
          <Home className="text-yellow-600 w-8 h-8 mb-2 sm:mb-0 sm:mr-2" />
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-yellow-700">
            Featured Properties
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-700 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed"
        >
          A curated collection of architectural excellence, handpicked for those
          who desire perfection in every detail.
        </motion.p>
      </section>

      {/* ===============================
          🏡 PROPERTY GRID
      =============================== */}
      <section className="relative py-10 sm:py-16 px-4 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {featuredData.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg bg-white/70 backdrop-blur-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              <div className="absolute bottom-5 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center text-xs sm:text-sm text-gray-200">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-400" />
                  {item.location}
                </div>
                <div className="flex items-center justify-between mt-2 text-xs sm:text-sm">
                  <span className="flex items-center text-yellow-300 font-medium">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                    {item.price}
                  </span>
                  <span className="flex items-center text-yellow-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {item.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===============================
          💎 WHY CHOOSE US
      =============================== */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 md:px-20 text-center bg-white/40 backdrop-blur-lg rounded-[2rem] sm:rounded-[3rem] mx-4 sm:mx-8 md:mx-16 my-10 sm:my-20 shadow-lg border border-yellow-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
            <Crown className="text-yellow-600 w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-0 sm:mr-3" />
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-light text-gray-900">
              Why Choose Our Collection
            </h3>
          </div>
          <p className="max-w-3xl mx-auto text-gray-700 font-light leading-relaxed mt-4 text-sm sm:text-base">
            Every home is handpicked by our experts to ensure exceptional design,
            unmatched craftsmanship, and an unparalleled living experience.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-b from-yellow-100/60 to-transparent rounded-2xl shadow-md"
            >
              <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-medium text-lg">Architectural Brilliance</h4>
              <p className="text-gray-600 mt-2 text-sm">
                World-class architecture and design that defines luxury.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-b from-yellow-100/60 to-transparent rounded-2xl shadow-md"
            >
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-medium text-lg">Elite Neighborhoods</h4>
              <p className="text-gray-600 mt-2 text-sm">
                Residences located in the most prestigious city zones.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-b from-yellow-100/60 to-transparent rounded-2xl shadow-md"
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-medium text-lg">Bespoke Interiors</h4>
              <p className="text-gray-600 mt-2 text-sm">
                Crafted with exquisite details and luxury finishes throughout.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===============================
          🌅 CTA
      =============================== */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-16 text-center bg-gradient-to-r from-blue-500/80 to-yellow-700/80 text-white rounded-t-[2rem] sm:rounded-t-[3rem]">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-light mb-4 sm:mb-6"
        >
          Step Into Your Next Masterpiece
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base md:text-lg font-light"
        >
          Find a home that mirrors your aspirations — refined, rare, and
          resplendent.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-white text-yellow-700 font-semibold shadow-lg hover:bg-yellow-50 transition"
        >
          Explore All Luxury Homes
        </motion.button>
      </section>
    </div>
  );
};

export default FeaturedProperties;
