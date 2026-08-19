import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

const NotificationBanner = ({ notification, onClose }) => (
  <AnimatePresence>
    {notification && (
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        className={`fixed left-1/2 top-4 z-50 w-full max-w-lg -translate-x-1/2 rounded-lg border px-4 py-3 shadow-lg backdrop-blur ${
          notification.type === "success"
            ? "border-emerald-200 bg-emerald-50/90 text-emerald-700"
            : "border-rose-200 bg-rose-50/90 text-rose-700"
        }`}
      >
        <div className="flex items-start gap-3">
          {notification.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5" />
          )}
          <div className="flex-1 text-sm font-medium">
            {notification.message}
          </div>
          <button onClick={onClose} className="text-sm font-semibold uppercase tracking-wide">
            Close
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default NotificationBanner;
