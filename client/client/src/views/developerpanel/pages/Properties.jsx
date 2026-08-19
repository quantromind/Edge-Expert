import React, { useEffect, useState } from "react";
import API from "../../../Api/axiosConfig";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("http://localhost:5000/api/developerpanel/developerproperties");
      setProperties(res.data.data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 animate-pulse">
        Loading properties...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <h3 className="text-3xl font-bold text-gray-800">
          Developer Properties
        </h3>
        <p className="text-gray-500 text-sm md:text-base">
          Browse and manage your properties
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No properties found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-105 border border-gray-100 overflow-hidden group"
            >
              {/* Property Image */}
              <div className="overflow-hidden relative h-48">
                <img
                  src={
                    p.images && p.images.length > 0
                      ? p.images[0]
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${
                    p.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : p.status === "Under Construction"
                      ? "bg-yellow-100 text-yellow-700"
                      : p.status === "Sold"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {p.status || "N/A"}
                </span>
              </div>

              {/* Property Details */}
              <div className="p-5 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {p.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{p.location}</p>

                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Type: {p.propertyType || "N/A"}</span>
                  <span>Units: {p.totalUnits || 0}</span>
                </div>

                <div className="text-indigo-600 font-semibold mb-3">
                  Price: {p.priceRange || "N/A"}
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {p.description || "No description available"}
                </p>

                {/* View Details Button (appears on hover) */}
                <button className="mt-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-2xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-600">
                  View Details
                </button>
              </div>

              {/* Gradient border glow on hover */}
              <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
