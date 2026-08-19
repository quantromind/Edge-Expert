import React from "react";
import { motion } from "framer-motion";
import { ThumbsUp, Smile, Heart, User } from "lucide-react";

const ContactSection = () => {
  // Define colors based on the image's palette
  const darkTeal = "#134e56"; // Used for columns 1 and 3, and the main background
  const mediumTeal = "#27666d"; // Used for columns 2 and 4, and the main section in the provided code
  const mainBackground = "#367d84"; // A slightly lighter teal for the top section

  // Updated stats to match the image content and icons
  const stats = [
    { id: 1, icon: <ThumbsUp size={30} />, number: "200+", label: "APPS BUILT", bgColor: darkTeal },
    { id: 2, icon: <Smile size={30} />, number: "50+", label: "HAPPY CUSTOMERS", bgColor: mediumTeal },
    { id: 3, icon: <Heart size={30} />, number: "47%", label: "REPEAT AND REFERRAL BUSINESS", bgColor: darkTeal },
    { id: 4, icon: <User size={30} />, number: "11+", label: "CONSULTATION", bgColor: mediumTeal },
  ];

  return (
    <section className="text-white" style={{ fontFamily: "inherit" }}>
      
      {/* --- Header & CTA Section (Single background color like the image) --- */}
      <div className="py-10 text-center" style={{ backgroundColor: mainBackground }}>
        <h2 className="text-3xl font-bold mb-4 tracking-wide uppercase">CONTACT US</h2>
         <h2
          className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
        </h2>
        <p className="text-lg text-gray-100 px-4 max-w-2xl mx-auto mb-8">
          Drop us a line or give us a ring. We love to hear from you and are happy to answer any questions.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="border-2 border-white text-white px-4 py-3 rounded-full hover:bg-white hover:text-black transition-all font-medium tracking-wider"
          style={{ borderColor: "#ffa700" }} // Using an orange shade similar to the button border in the image
        >
         GET A CONSULTATION
        </motion.button>
      </div>

      {/* --- Statistics Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
        {stats.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center justify-center py-16 px-4 h-full"
            style={{ backgroundColor: item.bgColor }} // Apply alternating colors
          >
            {/* Icon (White) */}
            <div className="mb-4 text-white">
                {/* Replaced 'lucide-react' icons with 'lucide' icons for better visual matching */}
                {item.icon} 
            </div>
            
            {/* Number */}
            <h3 className="text-5xl font-extrabold text-white mb-2">{item.number}</h3>
            
            {/* Label (Uppercase, slightly dimmer text color) */}
            <p className="text-sm tracking-widest uppercase text-gray-200 text-center">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;