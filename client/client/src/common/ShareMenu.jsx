// src/components/ShareMenu.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Linkedin, Facebook, Copy } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import metadata from "../metadata";

const ShareMenu = ({ iconColor = "black", isMobileView = false }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentMeta, setCurrentMeta] = useState(metadata.home);
  const location = useLocation();

  // 🧠 Automatically update meta info based on current route
  useEffect(() => {
    const path = location.pathname.replace("/", "").toLowerCase();
    if (path === "") {
      setCurrentMeta(metadata.home);
    } else if (metadata[path]) {
      setCurrentMeta(metadata[path]);
    } else {
      setCurrentMeta(metadata.home);
    }
  }, [location]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentMeta.url);
    alert("✅ Link Copied!");
    setShowShareMenu(false);
  };

  const handleShareClick = async () => {
    if (isMobileView && navigator.share) {
      try {
        await navigator.share({
          title: currentMeta.title,
          text: currentMeta.description,
          url: currentMeta.url,
        });
      } catch (e) {
        console.log("Share failed:", e);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareOnSocialMedia = (platform) => {
    const url = encodeURIComponent(currentMeta.url);
    const title = encodeURIComponent(currentMeta.title);
    const desc = encodeURIComponent(currentMeta.description);

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}+-+${desc}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%0A${desc}%0A${url}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleShareClick}
        title="Share"
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
          showShareMenu
            ? "bg-gray-100 dark:bg-gray-700"
            : "hover:scale-110 duration-300"
        }`}
      >
        <Share2 color={iconColor} size={22} />
      </button>

      <AnimatePresence>
        {showShareMenu && !isMobileView && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className="absolute right-12 bg-white border rounded-xl px-3 py-2 flex space-x-3 shadow-2xl z-50"
          >
            <Linkedin
              size={20}
              className="cursor-pointer text-blue-700"
              onClick={() => shareOnSocialMedia("linkedin")}
            />
            <Facebook
              size={20}
              className="cursor-pointer text-blue-600"
              onClick={() => shareOnSocialMedia("facebook")}
            />
            <FaWhatsapp
              size={20}
              className="cursor-pointer text-green-500"
              onClick={() => shareOnSocialMedia("whatsapp")}
            />
            <Copy
              size={20}
              className="cursor-pointer text-gray-500"
              onClick={handleCopyLink}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareMenu;
