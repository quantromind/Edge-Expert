import React, { useEffect, useState } from "react";
import API from "../../Api/axiosConfig";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fallback image (in case property has no image)
  const fallbackImage =
    "https://via.placeholder.com/400x250.png?text=No+Image+Available";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get("/properties");
        setProperties(res.data || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <p className="text-gray-600 text-lg">Loading properties...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700">
          Available Properties
        </h1>

        {properties.length === 0 ? (
          <div className="text-center text-gray-500 text-lg font-medium">
            No properties found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div
                key={prop._id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={
                    prop.images && prop.images.length > 0
                      ? prop.images[0].startsWith("http")
                        ? prop.images[0]
                        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${prop.images[0]}`
                      : fallbackImage
                  }
                  alt={prop.title}
                  className="w-full h-56 object-cover"
                />

                {/* Property Content */}
                <div className="p-5">
                  {/* Status Badge */}
                  <span
                    className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      prop.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {prop.status?.toUpperCase() || "N/A"}
                  </span>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {prop.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {prop.description || "No description available."}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">{prop.location}</p>
                  <p className="text-blue-700 font-extrabold text-lg">
                    ₹ {prop.price?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm mt-10">
          © {new Date().getFullYear()} Edge Expert Developer Panel
        </div>
      </div>
    </div>
  );
};

export default Property;
