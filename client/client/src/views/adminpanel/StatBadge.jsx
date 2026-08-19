import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const StatBadge = ({ icon: Icon, label, value, tone = "blue" }) => {
  const toneClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    teal: "bg-teal-50 text-teal-600 border-teal-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    rose: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col gap-3 rounded-2xl border px-5 py-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${toneClasses[tone]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium uppercase tracking-wide">
          {label}
        </span>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-3xl font-semibold">{value ?? 0}</span>
    </motion.div>
  );
};

export default StatBadge;



