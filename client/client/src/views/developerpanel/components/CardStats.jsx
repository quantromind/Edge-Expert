import React from "react";

const CardStats = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold text-indigo-700 mt-2">{value}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
  </div>
);

export default CardStats;
