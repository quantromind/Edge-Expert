// src/components/CommercialDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FileDown } from "lucide-react";
import axios from "axios";

const CommercialDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format price
  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString("en-IN")}`;
    }
  };

  // Fetch commercial property by ID
  useEffect(() => {
    const fetchCommercialProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:5000/api/commercialproperties/${id}`);

        if (response.data.success && response.data.data) {
          const propertyData = response.data.data;
          if (typeof propertyData.price === "number") {
            propertyData.price = formatPrice(propertyData.price);
          }
          setProperty(propertyData);
        } else {
          setError(response.data.message || "Property not found");
        }
      } catch (err) {
        console.error("Error fetching commercial property:", err);
        if (err.response) {
          const errorMessage = err.response.data?.message || err.response.data?.error || "Failed to load property details";
          setError(errorMessage);
        } else if (err.request) {
          setError("Unable to connect to server. Please check your connection.");
        } else {
          setError("Failed to load property details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCommercialProperty();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-20 p-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p className="mt-4 text-lg text-gray-600">Loading property details...</p>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="text-center mt-20 p-8">
        <p className="text-xl text-red-600 mb-6">❌ {error || "Property not found."}</p>
        <Link
          to="/commercial"
          className="mt-4 inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg"
        >
          Back to Commercial Properties
        </Link>
      </div>
    );
  }

  // Final Render
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-20">
      <Link
        to="/commercial"
        className="text-blue-600 hover:text-red-600 transition-colors flex items-center gap-1 font-medium mb-8"
      >
        ← Back to Listings
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ===== LEFT CONTENT (Property Details) ===== */}
        <div className="flex-1 space-y-8">
          {/* ===== HEADER INFO & GALLERY ===== */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b">
              <div>
                <h2 className="text-4xl font-extrabold text-red-600">
                  {property.price}
                </h2>
                <div className="flex items-center gap-3 text-base text-gray-600 mt-2">
                  <p>
                    EMI starts at{" "}
                    <span className="font-bold text-gray-800">₹19k/month</span>
                  </p>
                  <span>|</span>
                  <Link
                    to="#"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Calculate Loan
                  </Link>
                </div>
                <p className="text-gray-700 mt-3 text-lg">
                  <strong>{property.title}</strong> in{" "}
                  <span className="font-semibold">{property.complex}</span>,{" "}
                  <span className="font-medium hover:underline cursor-pointer">
                    {property.location}
                  </span>
                </p>
              </div>

              <div className="text-right text-sm text-gray-500 mt-4 md:mt-0">
                <p>Posted on: <span className="font-medium">{property.posted}</span></p>
                <p>Property ID: <span className="font-medium">{property.propertyId}</span></p>
              </div>
            </div>

            {/* ===== IMAGE GALLERY ===== */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {/* Main Large Image */}
              <div className="col-span-3 lg:col-span-2 relative">
                <img
                  src={property.image || property.images?.[0]}
                  alt={property.title}
                  className="w-full h-80 md:h-96 object-cover rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-lg"
                  onError={(e) => (e.target.src = "https://img.freepik.com/free-vector/modern-office-building-flat-style_23-2147502524.jpg")}
                />
                {property.furnishing && (
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
                    {property.furnishing}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="hidden lg:grid grid-rows-3 gap-3 overflow-y-auto max-h-96 pr-1">
                {property.images && property.images.length > 0 ? (
                  property.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-28 object-cover rounded-xl hover:opacity-80 transition-opacity duration-300 shadow-sm cursor-pointer border-2 border-gray-100"
                      onError={(e) => (e.target.src = "https://img.freepik.com/free-vector/modern-office-building-flat-style_23-2147502524.jpg")}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic text-center col-span-full pt-10">
                    No additional images available
                  </p>
                )}
              </div>
            </div>

            {/* ===== PROPERTY HIGHLIGHTS ===== */}
            <div className="bg-red-50 p-5 rounded-xl mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-l-4 border-red-500">
              <div className="text-center">
                <p className="text-gray-600 font-medium">Carpet Area</p>
                <p className="font-extrabold text-lg text-gray-800 mt-1">{property.carpetArea}</p>
                <p className="text-gray-500 text-xs">{property.pricePerSqft}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 font-medium">Washrooms</p>
                <p className="font-extrabold text-lg text-gray-800 mt-1">{property.washroom}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 font-medium">Complex Name</p>
                <p className="font-extrabold text-lg text-blue-700 mt-1">{property.complex}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 font-medium">Status</p>
                <p className="font-extrabold text-lg text-gray-800 mt-1">{property.status || "Available"}</p>
              </div>
            </div>
          </div>

          {/* ===== MORE DETAILS SECTION ===== */}
          {property.moreDetails && (
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Detailed Property Information
              </h3>
              <p className="mb-6 text-gray-600 text-base leading-relaxed">
                <span className="font-semibold text-gray-800">Description:</span>{" "}
                {property.moreDetails.description || property.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-base text-gray-700">
                {property.moreDetails.price && (
                  <p>
                    <span className="font-semibold text-gray-800">Final Price:</span>{" "}
                    {property.moreDetails.price}
                  </p>
                )}
                {property.moreDetails.bookingAmount && (
                  <p>
                    <span className="font-semibold text-gray-800">Booking Amount:</span>{" "}
                    {property.moreDetails.bookingAmount}
                  </p>
                )}
                {property.moreDetails.address && (
                  <p>
                    <span className="font-semibold text-gray-800">Address:</span>{" "}
                    {property.moreDetails.address}
                  </p>
                )}
                {property.moreDetails.floorsAllowed && (
                  <p>
                    <span className="font-semibold text-gray-800">Floors Allowed:</span>{" "}
                    {property.moreDetails.floorsAllowed}
                  </p>
                )}
                {property.moreDetails.landmarks && (
                  <p>
                    <span className="font-semibold text-gray-800">Landmarks:</span>{" "}
                    {property.moreDetails.landmarks}
                  </p>
                )}
                {property.moreDetails.widthOfRoad && (
                  <p>
                    <span className="font-semibold text-gray-800">Road Width:</span>{" "}
                    {property.moreDetails.widthOfRoad}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Description if moreDetails doesn't exist */}
          {!property.moreDetails && property.description && (
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
                Property Description
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {property.description}
              </p>
            </div>
          )}
        </div>

        {/* ===== RIGHT SIDEBAR (Contact/Action) ===== */}
        <div className="lg:w-1/4 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-red-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Connect with Expert
            </h3>
            <p className="text-red-600 font-semibold text-2xl mb-4">
              +91 90000 00000
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg w-full transition-colors shadow-md text-lg">
              Contact Agent
            </button>
            <button className="mt-3 border border-red-600 text-red-600 font-semibold px-5 py-3 rounded-lg w-full hover:bg-red-50 transition-colors text-lg">
              Get Call Back
            </button>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-colors">
            <FileDown size={20} /> Download Brochure (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommercialDetails;
