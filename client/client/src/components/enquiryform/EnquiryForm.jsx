// src/pages/EnquiryForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function EnquiryForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyType: "",
    transactionType: "",
    city: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL; // ✅ Production friendly

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      if (!formData.propertyType) {
        setStatus("error_property_type");
        setIsLoading(false);
        return;
      }

      if (!formData.transactionType) {
        setStatus("error_transaction_type");
        setIsLoading(false);
        return;
      }

      const { data } = await axios.post(`${API}/enquiries`, formData);

      console.log("Backend response:", data);

      setStatus("success");
      setFormData({
        name: "",
        email: "",
       phone: "",
        message: "",
        propertyType: "",
        transactionType: "",
        city: "",
      });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credential:", credentialResponse.credential);
      alert("Google Sign-In Successful!");
    } catch (error) {
      console.error("Google error:", error);
      alert("Google login failed.");
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed.");
  };

  const inputClass =
    "w-full border border-gray-200 p-2.5 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm placeholder-gray-400 text-gray-700 hover:border-blue-300";

  const radioClass = (type) =>
    `flex-1 text-center px-2 py-1 border rounded-full cursor-pointer font-medium transition duration-200 ${
      formData.transactionType === type
        ? "bg-indigo-600 text-white border-indigo-600"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center relative p-3 md:p-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Home Background"
          className="w-full h-full object-cover filter brightness-50 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-teal-900/30 to-indigo-900/40"></div>

        <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-blue-400 opacity-20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-teal-400 opacity-20 rounded-full animate-pulse-slow delay-500"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 w-full max-w-xl relative z-10 animate-fade-in-up mt-20">

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition z-20"
            aria-label="Close form"
          >
            ✕
          </button>
        )}

        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Enquire Now 🏡
          </h2>
          <p className="text-sm text-gray-500">
            Connect with us for properties and expert advice.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              name="name"
              placeholder="Full Name"
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email Address"
              type="email"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Mobile Number"
              type="tel"
              className={inputClass}
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              name="city"
              placeholder="City / Location"
              className={inputClass}
              value={formData.city}
              onChange={handleChange}
              required
            />

            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={inputClass + " bg-white"}
              required
            >
              <option value="" disabled>
                Select Property Type
              </option>
              <option value="Row House">Row House</option>
              <option value="PG">PG</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land/Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I want to:
            </label>
            <div className="flex gap-2 text-sm">
              {["Buy", "Rent", "Sell"].map((type) => (
                <label key={type} className={radioClass(type)}>
                  <input
                    type="radio"
                    name="transactionType"
                    value={type}
                    checked={formData.transactionType === type}
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <textarea
            name="message"
            placeholder="Your message or requirements..."
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className={inputClass + " resize-none"}
            required
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2.5 rounded-lg shadow-md transition transform hover:-translate-y-0.5 hover:scale-[1.01] ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-3">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap />
        </div>

        {status && (
          <p
            className={`mt-3 text-center text-sm font-medium p-2 rounded-lg ${
              status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status === "success"
              ? "🎉 Your enquiry has been sent successfully!"
              : status === "error_property_type"
              ? "⚠️ Please select a property type."
              : status === "error_transaction_type"
              ? "⚠️ Please select transaction type."
              : "⚠️ Failed to submit enquiry. Try again."}
          </p>
        )}
      </div>
    </div>
  );
}
