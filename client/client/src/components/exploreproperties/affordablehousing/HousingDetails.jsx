// src/components/affordable/AffordableDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Home,
  Bath,
  Maximize,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import affordableData from "../affordablehousing/AffordableData";

const AffordableDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = affordableData.find((p) => p.id.toString() === id);

  if (!property) {
    return <div className="text-center text-red-600 py-20">Property not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-['Inter']">
      {/* 🏠 Hero Section */}
      <div className="relative mt-20">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-[8vh] object-cover rounded-b-3xl shadow-lg"
        />

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/affordable")}
          className="absolute top-6 left-6 bg-white/80 hover:bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* 🏗️ Main Section */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Property Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Header */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">{property.title}</h1>
                <p className="flex items-center text-gray-500 mt-1">
                  <MapPin size={16} className="text-red-500 mr-1" />
                  {property.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">₹{property.price} L</p>
                <span className="text-sm text-gray-500">For Sale</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b mt-6 text-gray-600 font-medium">
              <button className="pb-2 border-b-2 border-red-500 text-blue-500">Overview</button>
              <button className="pb-2 hover:text-blue-500">Amenities</button>
              <button className="pb-2 hover:text-blue-500">Location</button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">About This Property</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Property Details */}
          <div className="bg-blue-500 text-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Home className="mx-auto mb-1" size={22} />
                <p className="font-semibold text-lg">{property.bedrooms}</p>
                <p className="text-sm">Beds</p>
              </div>
              <div>
                <Bath className="mx-auto mb-1" size={22} />
                <p className="font-semibold text-lg">{property.bathrooms}</p>
                <p className="text-sm">Baths</p>
              </div>
              <div>
                <Maximize className="mx-auto mb-1" size={22} />
                <p className="font-semibold text-lg">{property.area} sqft</p>
                <p className="text-sm">Area</p>
              </div>
              <div>
                <p className="font-semibold text-lg">7 of 12</p>
                <p className="text-sm">Floor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Agent / Tour */}
        <div className="space-y-6">
          {/* Agent Info */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                RK
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Amol kabmle</h3>
                <p className="text-sm text-gray-500">Certified Agent</p>
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2">
              <Phone size={16} /> Call Agent
            </button>

            {/* <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Mail size={16} /> Email Agent
            </button> */}
          </div>

          {/* Schedule Tour */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-gray-800">Schedule a Tour</h3>
            <div className="flex flex-col gap-3">
              <input
                type="date"
                className="border rounded-lg px-3 py-2 w-full text-gray-700"
              />
              <input
                type="time"
                className="border rounded-lg px-3 py-2 w-full text-gray-700"
              />
              <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                <Calendar size={16} /> Schedule Tour
              </button>
            </div>
          </div>

          {/* Property Facts */}
         <div className="bg-blue-500 p-6 rounded-2xl shadow space-y-3 text-white">
  <h3 className="font-semibold">Property Facts</h3>
  <p className="flex justify-between">
    <span>Type:</span> <span>Apartment</span>
  </p>
  <p className="flex justify-between">
    <span>Furnishing:</span> <span>Semi Furnished</span>
  </p>
  <p className="flex justify-between">
    <span>Floor Level:</span> <span>7 of 12</span>
  </p>
  <p className="flex justify-between">
    <span>Availability:</span> <span className="text-green-200 font-medium">Immediate</span>
  </p>
</div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {affordableData.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.location}</p>
                <p className="text-red-600 font-bold mt-1">₹{p.price} L</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffordableDetail;