import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

// Contact details
const contactInfo = [
  { icon: Phone, text: "073853 27808", href: "tel:07385327808" },
  { icon: Mail, text: "hello@edgeexpert.in", href: "mailto:hello@edgeexpert.in" },
  { icon: MapPin, text: "Miraroad, Mumbai, Maharashtra, India 401107", href: "https://maps.google.com/?q=Miraroad,Mumbai,India,401107" },
  { icon: Clock, text: "Always open", href: "#" },
];

const CONTACT_IMAGE_URL = "https://i.pinimg.com/1200x/ba/2d/1a/ba2d1a5ed51d6995c060c23cf1e46d8b.jpg";

// Animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const HomeContact = () => {
  return (
    <section className="relative py-14 px-6 sm:px-10 bg-gradient-to-b from-blue-50 via-white to-gray-50 overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

      {/* Title */}
      <div className="relative max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-wide">
          Let’s <span className="text-blue-600">Connect</span>
        </h2>
        <p className="text-gray-700 mt-3 text-lg md:text-xl font-normal">
          We’d love to hear from you — reach us directly using the details below.
        </p>
      </div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        
        {/* Image with animation */}
        <motion.div
          className="relative overflow-hidden group w-full md:w-[60%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={CONTACT_IMAGE_URL}
            alt="Edge Expert Contact Office"
            className="w-full h-96 md:h-[480px] object-cover rounded-lg shadow-xl"
            loading="lazy"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Contact Details with horizontal lines */}
        <motion.div
          className="flex flex-col text-center md:text-left w-full md:w-[40%] md:pt-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 hidden md:block mb-4">
            Our Details
          </h3>

          {contactInfo.map(({ icon: Icon, text, href }, idx) => (
            <motion.div
              key={idx}
              className={`flex items-start md:items-center gap-3 text-gray-800 text-lg md:text-xl font-normal py-4 ${
                idx < contactInfo.length - 1 ? "border-b border-gray-300" : ""
              }`}
              variants={itemVariants}
            >
              <Icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1 md:mt-0" />
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="whitespace-pre-line leading-relaxed hover:text-blue-600 transition"
              >
                {text}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeContact;