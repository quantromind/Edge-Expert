// src/components/projects/ProjectFilterBar.jsx
import React from "react";

const ProjectFilterBar = ({ filters, setFilters }) => {
  const handleReset = () => {
    setFilters({
      residential: "Commercial", // default back to Commercial
      city: "",
      type: "",
      status: "",
      budget: "",
    });
  };

  return (
    <div className="mt-10 mb-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 border border-gray-200 rounded-xl overflow-hidden shadow-lg divide-x divide-gray-200">
        {/* Residential / Commercial */}
        <select
          value={filters.residential || "Commercial"}
          onChange={(e) => setFilters({ ...filters, residential: e.target.value })}
          className="p-3 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
        </select>

        {/* City */}
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="p-3 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <option value="">Select City</option>
          <option value="Pune">Pune</option>
          <option value="Gurugram">Gurugram</option>
          <option value="Noida">Noida</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="p-3 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <option value="">Select Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="4BHK">4BHK</option>
          <option value="Office Space">Office Space</option>
          <option value="Commercial">Commercial</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-3 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <option value="">Select Status</option>
          <option value="New Project Launch">New Project Launch</option>
          <option value="Upcoming Project">Upcoming Project</option>
        </select>

        {/* Budget */}
        <select
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          className="p-3 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <option value="">Select Budget</option>
          <option value="INR 0 - 20L">INR 0 - 20L</option>
          <option value="INR 20L - 50L">INR 20L - 50L</option>
          <option value="INR 50L - 1Cr">INR 50L - 1Cr</option>
          <option value="INR 1 - 5Cr">INR 1 - 5Cr</option>
          <option value="INR 5 - 20Cr">INR 5 - 20Cr</option>
        </select>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="p-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default ProjectFilterBar;