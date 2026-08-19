import React from "react";
import { ShieldCheck } from "lucide-react";

const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-10 text-center">
    <ShieldCheck className="h-10 w-10 text-gray-400" />
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
    {action}
  </div>
);

export default EmptyState;
