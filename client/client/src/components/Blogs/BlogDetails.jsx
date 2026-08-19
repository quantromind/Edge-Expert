import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  // If no article data arrives
  if (!article) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-16 text-center"
      >
        <h2 className="text-2xl font-medium">Article Not Found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl transition-all duration-300"
        >
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-10 sm:py-16"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          mb-6 px-4 py-2 rounded-xl 
          bg-white/80 backdrop-blur-md
          border border-gray-300 
          shadow-sm hover:shadow-md
          transition-all duration-300
        "
      >
        ← Back
      </button>

      {/* Feature Image */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-lg"
        />
      </motion.div>

      {/* Blog Title */}
      <h1 className="text-3xl sm:text-4xl font-medium mt-6 leading-snug">
        {article.title}
      </h1>

      {/* Meta Info */}
      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        {article.author} • {article.date} • {article.readTime}
      </p>

      {/* Blog Body */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-700 text-lg leading-relaxed mt-6"
      >
        {article.description}
      </motion.p>

      {/* Footer Line */}
      <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>
    </motion.main>
  );
}
