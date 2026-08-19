// src/components/affordable/AffordableCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Bath, Maximize } from "lucide-react";

const AffordableCard = ({ property }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
    >
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {property.title}
        </h2>
        <p className="text-gray-600 flex items-center gap-2 text-sm mb-2">
          <MapPin size={16} /> {property.location}
        </p>
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span className="flex items-center gap-1">
            <Home size={16} /> {property.bedrooms} BHK
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} /> {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Maximize size={16} /> {property.area} sq.ft
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-green-600">
            ₹{property.price} L
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AffordableCard;