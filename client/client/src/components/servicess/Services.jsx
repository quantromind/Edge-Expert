import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, ChevronDown, Phone, Layers3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

import ServicessEdge from "./ServicessEdge";
import FeatureDevelopers from "./FeatureDevelopers";
import RecommendedSellers from "./Recommendedsellers";

import Image1 from "../../assets/servicess/Image_1.avif";
import Image2 from "../../assets/servicess/Image_2.avif";
import Image3 from "../../assets/servicess/Image_3.avif";

export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState("BUY");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const navigate = useNavigate();

  const tabs = ["BUY", "RENT", "COMMERCIAL", "PG/CO-LIVING"];

  const cityLocalities = {
    Pune: ["Ravet", "Baner", "Wakad", "Wagholi", "Punawale"],
    Mumbai: ["Andheri", "Bandra", "Juhu", "Powai", "Borivali"],
    Bangalore: ["Whitefield", "Indiranagar", "Koramangala", "HSR Layout", "Jayanagar"],
    Delhi: ["Dwarka", "Saket", "Rohini", "Vasant Kunj", "Karol Bagh"],
  };

  const localities = cityLocalities[selectedCity];

  const recommendations = [
    {
      price: "₹1.12 Cr - 1.64 Cr",
      name: "Sapphire Residences",
      developer: "Property One Developers",
      bhk: "2, 3 BHK Apartments",
      location: "Kharadi, Pune",
      image: Image1,
      phone: "+91 9876543210",
    },
    {
      price: "₹1.54 Cr - 3.14 Cr",
      name: "The Grand Utopia",
      developer: "Visionary Group",
      bhk: "3, 3.5, 4, 4.5 BHK Apartments",
      location: "Akurdi, Pune",
      image: Image2,
      phone: "+91 9123456780",
    },
    {
      price: "₹2.23 Cr - 4.07 Cr",
      name: "Skylight Towers",
      developer: "Luxurious Builders",
      bhk: "3, 4, 4.5 BHK Apartments",
      location: "Viman Nagar, Pune",
      image: Image3,
      phone: "+91 9988776655",
    },
  ];

  const backgroundMap = {
    BUY: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
    RENT: "https://i.pinimg.com/1200x/03/49/33/0349339106685f7023fc1c28403e27d2.jpg",
    COMMERCIAL: "https://i.pinimg.com/736x/b3/11/99/b31199ee68ccf26ceee7c9893c686c58.jpg",
    "PG/CO-LIVING": "https://i.pinimg.com/736x/f6/4f/41/f64f414d6e78cb4c8d836e2e9d43f0ca.jpg",
  };

  const handleSearch = useCallback(() => {
    if (searchQuery.trim())
      navigate(`/search?city=${selectedCity}&query=${encodeURIComponent(searchQuery)}`);
    else if (selectedCity) navigate(`/search?city=${selectedCity}`);
  }, [navigate, searchQuery, selectedCity]);

  const openModal = (builder) => {
    setSelectedBuilder(builder);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBuilder(null);
    document.body.style.overflow = "unset";
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "BUY":
        navigate("/buyresidential");
        break;
      case "RENT":
        navigate("/rentproperties");
        break;
      case "COMMERCIAL":
        navigate("/commercial");
        break;
      case "PG/CO-LIVING":
        navigate("/pgcoliving");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="font-sans tracking-wide text-gray-900 overflow-x-hidden">
      <Helmet>
  {/* Dynamic SEO title + description */}
  <title>{`${activeTab} Services in ${selectedCity} | Edge Expert`}</title>
  <meta
    name="description"
    content={`Explore top ${activeTab.toLowerCase()} services in ${selectedCity}. Verified listings with top developers on Edge Expert.`}
  />

  {/* ✅ Open Graph Meta Tags (for social sharing) */}
  <meta property="og:title" content={`${activeTab} services in ${selectedCity} | Edge Expert`} />
  <meta
    property="og:description"
    content={`Explore top ${activeTab.toLowerCase()} services in ${selectedCity}. Verified listings with top developers on Edge Expert.`}
  />
  <meta
    property="og:image"
    content="https://edgeexpert.com/og/services-thumbnail.png" // <-- your thumbnail image
  />
  <meta property="og:url" content="https://edgeexpert.com/services" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Edge Expert" />

  {/* ✅ Twitter Card (for Twitter/X previews) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${activeTab} services in ${selectedCity} | Edge Expert`} />
  <meta
    name="twitter:description"
    content={`Explore top ${activeTab.toLowerCase()} services in ${selectedCity}. Verified listings with top developers on Edge Expert.`}
  />
  <meta
    name="twitter:image"
    content="https://edgeexpert.com/og/services-thumbnail.png"
  />
</Helmet>


      {/* HERO SECTION */}
      <section className="relative w-full min-h-[550px] sm:min-h-[650px] flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundMap[activeTab]})`,
              filter: "brightness(0.5)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="z-10 w-full flex flex-col items-center px-4 sm:px-8">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white mb-3">
              Discover Your <span className="text-purple-300">Perfect Property</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 mb-6">
              64,000+ verified listings. Top developers. A seamless search experience.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2 sm:mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/projects")}
              className="bg-white text-indigo-700 font-semibold px-6 py-2.5 rounded-full shadow-lg hover:bg-indigo-50 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              🏢 Direct Builder Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/enquiry")}
              className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:bg-indigo-700 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              🤝 Free Builder Consultation
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto whitespace-nowrap mt-6 bg-white rounded-full p-1 shadow-lg w-fit max-w-full scrollbar-hide gap-1 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <motion.div
            className="w-full max-w-5xl mt-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 z-20"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              {/* City Select */}
              <div className="relative flex items-center w-full sm:w-1/4 px-3 py-2 border rounded-xl">
                <MapPin className="w-4 h-4 text-indigo-600 mr-2" />
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSearchQuery("");
                  }}
                  className="w-full text-sm sm:text-base bg-transparent outline-none"
                >
                  {Object.keys(cityLocalities).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500" />
              </div>

              {/* Search Input */}
              <div className="relative flex-1 flex items-center px-3 py-2 border rounded-xl">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder={`Search in ${selectedCity}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full text-sm sm:text-base bg-transparent outline-none"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base rounded-xl px-5 py-2 shadow-md"
              >
                Search
              </button>
            </div>

            {/* Localities */}
            <div className="flex overflow-x-auto gap-2 mt-3 pt-3 border-t text-xs sm:text-sm scrollbar-hide">
              <Layers3 className="w-4 h-4 text-gray-500 flex-shrink-0" />
              {localities.map((loc) => (
                <button
                  key={loc}
                  onClick={() => navigate(`/search?city=${selectedCity}&query=${loc}`)}
                  className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 flex-shrink-0"
                >
                  {loc}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="w-full py-10 sm:py-16 bg-gray-50 px-4 sm:px-8">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-xl sm:text-3xl font-semibold text-indigo-800">
              Exclusive New Projects
            </h2>
            <button className="text-indigo-600 font-medium border border-indigo-600 px-4 py-1.5 rounded-full hover:bg-indigo-100 text-sm sm:text-base">
              View All Projects &gt;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-52 md:h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-indigo-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                  <p className="text-indigo-700 font-medium text-sm sm:text-lg mt-2">
                    {item.price.split("-")[0].trim()}
                  </p>
                  <button
                    className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-xl py-2 transition"
                    onClick={() => openModal(item)}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBuilder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md p-6 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 text-2xl"
              >
                &times;
              </button>
              <h2 className="text-lg sm:text-xl font-medium text-indigo-700 mb-2">
                Connect with the Seller
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Get property details and a direct callback.
              </p>

              <div className="flex items-center gap-3 mb-6 p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 flex items-center justify-center rounded-full text-white text-lg font-medium">
                  {selectedBuilder.developer.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-lg text-gray-800">
                    {selectedBuilder.developer}
                  </p>
                  <p className="text-indigo-600 text-xs sm:text-sm flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {selectedBuilder.phone}
                  </p>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-b py-2 mb-3 text-sm focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="tel"
                  placeholder="+91 Your Phone Number"
                  className="w-full border-b py-2 mb-3 text-sm focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Your Email (Optional)"
                  className="w-full border-b py-2 mb-4 text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm"
                >
                  Get Contact Details
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Sections */}
      <ServicessEdge />
      <FeatureDevelopers />
      <RecommendedSellers />
    </div>
  );
}
