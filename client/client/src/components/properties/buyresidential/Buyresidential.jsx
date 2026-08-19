import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, MapPin, ArrowLeft } from "lucide-react";

const BuyResidential = () => {
  const navigate = useNavigate();
  const staticCities = ["All", "Noida", "Delhi", "Gurgaon", "Mumbai", "Bangalore", "Chennai", "Pune", "Hyderabad"];
  const [selectedCity, setSelectedCity] = useState("All");
  const [apiProperties, setApiProperties] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch properties from API
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    const fetchProperties = async () => {
      try {
        const response = await fetch(`${apiUrl}/sellproperty`);
        const data = await response.json();
        if (data.success && data.data) {
          // Transform API data to match UI structure
          const transformedProperties = data.data.map((item, index) => ({
            id: item._id || index,
            name: item.title,
            location: item.location,
            type: item.type || "Residential Property",
            price: `₹${(item.price / 10000000).toFixed(2)} Cr`,
            image: item.images && item.images.length > 0 ? item.images[0] : "/no-image.jpg",
            status: item.propertystatus || "Available",
            owner: item.owner || "Edge Expert Partner",
            phone: item.phone || "+91 73853 27808",
            details: [
              `Owner: ${item.owner || 'Edge Expert Partner'}`,
              `Phone: ${item.phone || '+91 73853 27808'}`,
              "Premium Location",
              "Modern Amenities",
              "Ready to Move"
            ]
          }));
          setApiProperties(transformedProperties);
        }
      } catch (error) {
        // Silently fallback if backend is offline
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties by selected city - show all if "All" is selected
  const properties = loading ? [] : selectedCity === "All"
    ? apiProperties
    : apiProperties.filter(property =>
      property.location.toLowerCase().includes(selectedCity.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-black font-sans pt-16">
      {/* Header */}
      <header className="flex flex-col items-center justify-center py-6 lg:py-10 border-b border-gray-700 px-4">
        {/* 🔙 Back Button (Top-Left Corner) */}
<div className="fixed top-20 left-6 z-30">
  <button
    onClick={() => navigate("/services")}
    className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
  >
    <ArrowLeft className="w-4 h-4" />
    
  </button>
</div>

        <h1 className="text-3xl md:text-4xl font-semibold text-center mt-6">
          Buy{" "}
          <span className="text-blue-400">Edge Expert Properties</span> In{" "}
          <span className="text-blue-400">{selectedCity}</span>
        </h1>
        <div className="mt-4 w-4/5 border-t border-gray-600"></div>
      </header>

      {/* City Buttons */}
      <section className="flex flex-wrap justify-center gap-2 lg:gap-3 py-6 lg:py-8 px-4">
        {staticCities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-3 lg:px-5 py-2 rounded-md text-xs lg:text-sm transition-all ${city === selectedCity
              ? "bg-blue-500 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-900 hover:bg-blue-400 hover:text-white hover:scale-105"
              }`}
          >
            {city}
          </button>
        ))}
      </section>

      {/* Property List */}
      <section className="max-w-6xl mx-auto px-6 pb-20 space-y-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No properties found in {selectedCity}</p>
          </div>
        ) : (
          properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col md:flex-row border border-blue-500 bg-[#263547] rounded-lg overflow-hidden shadow-lg hover:shadow-blue-400/40 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative md:w-1/2">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-[320px] md:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-sm shadow">
                  {property.status}
                </span>
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-400">
                    {property.name}
                  </h2>
                  <p className="flex items-center text-gray-300 mt-1">
                    <MapPin size={16} className="text-blue-400 mr-2" />
                    {property.location}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm bg-[#33445a] p-4 rounded-md">
                    <div>
                      <p className="text-gray-400">Type:</p>
                      <p className="font-semibold text-white">{property.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Starting Price:</p>
                      <p className="font-semibold text-blue-400">
                        {property.price + "* Onwards"}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    {property.details.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check size={14} className="text-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate(`/buyresidential/${property.id}?from=buyresidential`)}
                  className="mt-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-2 rounded-md shadow-md hover:opacity-90 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default BuyResidential;
