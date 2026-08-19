import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaHome, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaParking,
  FaArrowRight
} from "react-icons/fa";

const ProjectCard = ({ project, onViewDetails, onEnquiry, onGetPhone }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle view details button click
  const handleViewDetailsClick = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleViewDetailsClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold shadow-xs ${
          project.status?.includes("New") ? "bg-emerald-600" :
          project.status?.includes("Upcoming") ? "bg-purple-600" :
          "bg-blue-600"
        }`}>
          {project.status}
        </div>

        {/* Rating Badge */}
        {project.rating && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
            <FaStar className="text-amber-500 text-xs" />
            <span className="text-xs font-bold text-gray-800">{project.rating}</span>
          </div>
        )}

        {/* Category Icon */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs p-2 rounded-full shadow-xs">
          {project.category === "Residential" ? (
            <FaHome className="text-blue-600 text-base" />
          ) : (
            <FaBuilding className="text-emerald-600 text-base" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-blue-600 transition">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">{project.description}</p>

          {/* Location */}
          <div className="flex items-center gap-1.5 mb-3 text-gray-500 text-xs font-medium">
            <FaMapMarkerAlt className="text-rose-500 flex-shrink-0" />
            <span className="truncate">{project.location || project.city}</span>
          </div>

          {/* Specifications */}
          {project.specs && (
            <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-50 p-2.5 rounded-xl text-xs text-gray-600">
              {project.specs.bedrooms && (
                <div className="flex items-center gap-1.5 truncate">
                  <FaBed className="text-blue-500 flex-shrink-0" />
                  <span>{project.specs.bedrooms} Beds</span>
                </div>
              )}
              {project.specs.bathrooms && (
                <div className="flex items-center gap-1.5 truncate">
                  <FaBath className="text-emerald-500 flex-shrink-0" />
                  <span>{project.specs.bathrooms} Baths</span>
                </div>
              )}
              {project.specs.area && (
                <div className="flex items-center gap-1.5 truncate">
                  <FaRulerCombined className="text-amber-500 flex-shrink-0" />
                  <span>{project.specs.area}</span>
                </div>
              )}
              {project.specs.parking && (
                <div className="flex items-center gap-1.5 truncate">
                  <FaParking className="text-purple-500 flex-shrink-0" />
                  <span>{project.specs.parking}</span>
                </div>
              )}
            </div>
          )}

          {/* Amenities */}
          {project.amenities && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-[11px] font-medium">
                  {amenity}
                </span>
              ))}
              {project.amenities.length > 3 && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                  +{project.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">Starting from</p>
              <p className="text-base font-bold text-gray-900">{project.budget || project.price}</p>
            </div>
            <button
              onClick={handleViewDetailsClick}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              Details <FaArrowRight className="text-[10px]" />
            </button>
          </div>
          
          {/* Action Buttons: Enquiry & Get Phone No */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onEnquiry) onEnquiry(project);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold shadow-xs hover:shadow-md cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Enquiry
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onGetPhone) onGetPhone(project);
              }}
              className="border-2 border-[#1E88E5] text-[#1E88E5] hover:bg-blue-50 py-1.5 px-3 rounded-full flex items-center justify-center gap-1 transition-all text-xs font-bold cursor-pointer"
            >
              Get Phone No.
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;