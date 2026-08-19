import React, { useState } from "react";
import affordableData from "./AffordableData";
import { MapPin, Home, Bath, Maximize, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AffordableHousing = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = affordableData.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full font-sans">
      {/* 🏠 Hero Section */}
      <div
        className="relative h-[80vh] md:h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/35/04/2a/35042a4816e3dc44fb8f7a96ce8339b9.jpg')",
          position: "relative",
        }}
      >
        {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 z-10"></div>
        
                {/* 🔙 Back to Services Button */}
                <div className="absolute top-24 left-10 z-20">
                  <button
                    onClick={() => navigate("/services")}
                    className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
                  >
                    <ArrowLeft className="w-4 h-4" />
                   
                  </button>
                </div>

        {/* Text Content */}
        <div className="relative z-10 px-4 sm:px-6 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 leading-snug text-white drop-shadow-lg">
            <span className="text-yellow-400">Find</span> modern, <br />
            affordable homes — <br />
            available anytime.
          </h1>
          <p className="text-base sm:text-lg font-medium mb-6 text-blue-50">
            It’s your home. Take the keys.
          </p>
        </div>
      </div>

      {/* 🏘️ Listings Section */}
      <section className="bg-gray-50 text-gray-800 py-12 sm:py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 sm:mb-10 text-gray-900">
            Explore Affordable Projects
          </h2>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 font-normal">
              No results found for “{search}”
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((item) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 font-sans cursor-pointer"
                  onClick={() => navigate(`/affordable/${item.id}`)}
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-md shadow-md font-semibold">
                      {item.area} sq.ft
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center gap-1 mb-2 font-normal">
                      <MapPin size={15} /> {item.location}
                    </p>

                    <div className="flex flex-wrap justify-between text-gray-700 text-sm mb-1 font-normal gap-y-1">
                      <span className="flex items-center gap-1">
                        <Home size={15} /> {item.bedrooms} BHK
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={15} /> {item.bathrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize size={15} /> {item.area} sq.ft
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="bg-indigo-700 text-white py-12 sm:py-16 font-sans text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10">
            Our Growing Footprint Across India
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-2 sm:p-4">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-yellow-400">
                203
              </h3>
              <p className="text-sm sm:text-lg font-semibold mt-2">
                Branches Across <br /> 18 States of India
              </p>
            </div>

            <div className="p-2 sm:p-4">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-yellow-400">
                85,000+
              </h3>
              <p className="text-sm sm:text-lg font-semibold mt-2">
                Happy Customers
              </p>
            </div>

            <div className="p-2 sm:p-4">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-yellow-400">
                9,374+ Cr
              </h3>
              <p className="text-sm sm:text-lg font-semibold mt-2">
                Asset Under Management (AUM)
              </p>
            </div>

            <div className="p-2 sm:p-4">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-yellow-400">
                4,000+
              </h3>
              <p className="text-sm sm:text-lg font-semibold mt-2">
                Employees
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffordableHousing;
