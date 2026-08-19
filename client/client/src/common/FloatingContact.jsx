import React from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const FloatingContact = () => {
  const phoneNumber = "+917385327808";
  const whatsappUrl = "https://wa.me/917385327808?text=" + encodeURIComponent("Hello Edge Expert, I have an inquiry.");

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
        {/* Tooltip */}
        <span className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          WhatsApp Us
        </span>
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping -z-10"></span>
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${phoneNumber}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer"
        aria-label="Call Us"
      >
        <Phone size={24} />
        {/* Tooltip */}
        <span className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Call: 73853 27808
        </span>
      </motion.a>
    </div>
  );
};

export default FloatingContact;
