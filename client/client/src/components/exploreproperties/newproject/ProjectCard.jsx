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

const ProjectCard = ({ project, onViewDetails }) => { // ✅ Add onViewDetails prop
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Handle view details button click
  const handleViewDetailsClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${
          project.status.includes("New") ? "bg-green-500" :
          project.status.includes("Upcoming") ? "bg-purple-500" :
          "bg-blue-500"
        }`}>
          {project.status}
        </div>

        {/* Rating Badge */}
        {project.rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-sm font-bold text-gray-800">{project.rating}</span>
          </div>
        )}

        {/* Category Icon */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
          {project.category === "Residential" ? (
            <FaHome className="text-blue-600 text-lg" />
          ) : (
            <FaBuilding className="text-green-600 text-lg" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
          <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
        </div>

        <p className="text-gray-600 text-sm mb-4">{project.description}</p>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-gray-500">
          <FaMapMarkerAlt className="text-red-500" />
          <span className="text-sm">{project.city}</span>
        </div>

        {/* Specifications */}
        {project.specs && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {project.specs.bedrooms && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaBed className="text-blue-500" />
                <span>{project.specs.bedrooms} Beds</span>
              </div>
            )}
            {project.specs.bathrooms && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaBath className="text-green-500" />
                <span>{project.specs.bathrooms} Baths</span>
              </div>
            )}
            {project.specs.area && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaRulerCombined className="text-orange-500" />
                <span>{project.specs.area}</span>
              </div>
            )}
            {project.specs.parking && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaParking className="text-purple-500" />
                <span>{project.specs.parking} Parking</span>
              </div>
            )}
          </div>
        )}

        {/* Amenities */}
        {project.amenities && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {amenity}
              </span>
            ))}
            {project.amenities.length > 3 && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                +{project.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-gray-800">{project.budget}</p>
          </div>
          
          {/* ✅ View Details / Visit Project Button */}
          {project.link ? (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition-all text-sm font-semibold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              Visit Project
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.a>
          ) : (
            <motion.button
              className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewDetailsClick}
            >
              View Details
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;