import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Crown, MapPin, IndianRupee, ArrowLeft, Sparkles, Gem } from "lucide-react";

const LuxuryPropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(backendUrl + `/luxuryproperty/getLuxuryPropertyDetails/${id}`);
        setProperty(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-blue-400 text-lg">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-red-400 text-lg">
        Property not found
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#111827] text-gray-100 overflow-hidden">
      {/* DETAILS SECTION */}
      <div className="relative bg-gradient-to-b from-white via-blue-50 to-white py-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <div className="flex items-center justify-center mb-5">
            <Gem className="text-blue-700 w-10 h-10 mr-3 drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-sky-500 leading-tight">
              Property Overview
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-xl border border-blue-200 p-8"
        >
          {/* LOCATION & PRICE */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{property.location}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <IndianRupee className="w-4 h-4" />
              <span>{(property.price / 10000000).toFixed(2)} Cr* onwards</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {property.description}
          </p>

          {/* FEATURES */}
          {property.features && property.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                Key Highlights
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                {property.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* BACK BUTTON */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-10 flex items-center gap-3 px-8 py-3 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white text-base font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:from-blue-400 hover:to-blue-500 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Luxury Properties
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryPropertyDetails;
