import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Bath,
  Bed,
  LandPlot,
  Phone,
  DollarSign,
  ChevronDown,
  SlidersHorizontal,
  Search,
  Home,
  Building2,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

const HeroSection = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[65vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/36/a4/74/36a4743b0404a2bae459a021e2da4d78.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/70"></div>

      <div className="absolute top-24 left-10 z-20">
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center text-white px-6 max-w-4xl w-full"
      >
        <h1 className="text-4xl md:text-6xl font-light mb-4 leading-tight tracking-tight">
          Find Your Perfect Rental Home in Pune
        </h1>
        <p className="text-lg md:text-xl mb-10 text-blue-100 font-light">
          Verified listings. Zero brokerage. Direct owner contact.
        </p>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-2 rounded-xl shadow-2xl flex max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search by Locality, Landmark, or Project"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-3 md:p-4 text-gray-700 rounded-l-lg focus:outline-none text-base md:text-lg font-light"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-blue-900 px-6 md:px-8 py-3 rounded-xl transition flex items-center gap-2 m-1 font-medium"
          >
            <Search size={20} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const clearAll = () => {
    setFilters({
      bhk: "",
      furnishing: "",
      propertyType: "",
      parking: "",
      facing: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-72 bg-white p-6 rounded-2xl shadow-md h-fit sticky top-6 border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h3 className="text-xl text-blue-900 flex items-center gap-2 font-medium">
          <SlidersHorizontal size={20} /> Filters
        </h3>
        <button
          onClick={clearAll}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* BHK */}
      <div className="mb-6">
        <p className="text-gray-700 mb-3 font-medium">Property Type (BHK)</p>
        <div className="flex flex-wrap gap-2">
          {["1", "2", "3", "4"].map((num) => (
            <button
              key={num}
              onClick={() => handleChange("bhk", num)}
              className={`px-4 py-2 text-sm rounded-full border font-light transition ${
                filters.bhk === num
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {num} BHK
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div className="mb-6">
        <p className="text-gray-700 mb-3 font-medium">Furnishing Status</p>
        {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
          <div key={f} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.furnishing === f}
              onChange={() => handleChange("furnishing", f)}
              className="w-4 h-4 text-blue-600 accent-blue-600 rounded"
            />
            <label className="ml-3 text-gray-800 text-sm">{f}</label>
          </div>
        ))}
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <p className="text-gray-700 mb-3 font-medium">Property Type</p>
        {["Apartment", "Flat", "Villa", "Studio"].map((t) => (
          <div key={t} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.propertyType === t}
              onChange={() => handleChange("propertyType", t)}
              className="w-4 h-4 text-blue-600 accent-blue-600 rounded"
            />
            <label className="ml-3 text-gray-800 text-sm">{t}</label>
          </div>
        ))}
      </div>

      {/* Parking */}
      <div className="mb-6">
        <p className="text-gray-700 mb-3 font-medium">Parking Availability</p>
        {["Yes", "No"].map((p) => (
          <div key={p} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.parking === p}
              onChange={() => handleChange("parking", p)}
              className="w-4 h-4 text-blue-600 accent-blue-600 rounded"
            />
            <label className="ml-3 text-gray-800 text-sm">{p}</label>
          </div>
        ))}
      </div>

      {/* Facing */}
      <div>
        <p className="text-gray-700 mb-3 font-medium">Facing Direction</p>
        {["East", "West", "North", "South"].map((d) => (
          <div key={d} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.facing === d}
              onChange={() => handleChange("facing", d)}
              className="w-4 h-4 text-blue-600 accent-blue-600 rounded"
            />
            <label className="ml-3 text-gray-800 text-sm">{d}</label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PropertyCard = ({ p }) => {
  


  const getImageUrl = (images) => {
  if (!images || images.length === 0)
    return "https://placehold.co/1200x800/2563eb/ffffff?text=Image+Unavailable";
  
  const image = images[0]; // Take the first image from array
  if (image.startsWith("http")) return image;
  return `${import.meta.env.VITE_API_URL}${image}`;
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className="relative w-full md:w-80 flex-shrink-0">
        

         <img
  src={getImageUrl(p.images)}
  alt={p.title}
  className="w-full h-56 md:h-full object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src =
      "https://placehold.co/1200x800/2563eb/ffffff?text=Image+Unavailable";
  }}
/>


        <span className="absolute bottom-0 left-0 bg-blue-700/80 text-white text-xs px-3 py-1 rounded-tr-xl font-medium">
          {p.postedBy || "Owner"}
        </span>
      </div>

      <div className="p-5 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-lg text-blue-900 mb-1 font-medium">{p.title}</h3>
          <p className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <MapPin size={14} className="text-blue-500" /> {p.location}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-700 border-y border-gray-100 py-3 mb-3">
          <span className="flex items-center gap-2">
            <Bed size={16} className="text-blue-600" /> {p.bedrooms} Beds
          </span>
          <span className="flex items-center gap-2">
            <Bath size={16} className="text-blue-600" /> {p.bathrooms} Baths
          </span>
          <span className="flex items-center gap-2">
            <LandPlot size={16} className="text-blue-600" /> {p.area}
          </span>
          <span className="flex items-center gap-2">
            <Home size={16} className="text-blue-600" /> {p.propertyType}
          </span>
          <span className="flex items-center gap-2">
            <Building2 size={16} className="text-blue-600" /> {p.furnishing}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-600" />{" "}
            {p.availableFrom || "-"}
          </span>
          <span className="flex items-center gap-2">
            <DollarSign size={16} className="text-blue-600" /> Deposit: ₹
            {p.deposit || 0}
          </span>
          <span className="flex items-center gap-2">
            <Home size={16} className="text-blue-600" /> Facing: {p.facing || "-"}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-blue-700 text-lg font-semibold">
            ₹{p.price}/month
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
            <Phone size={16} /> Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const RentalPropertiesPage = () => {
  const [filters, setFilters] = useState({
    bhk: "",
    furnishing: "",
    propertyType: "",
    parking: "",
    facing: "",
  });
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Fetch all rent properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/rentproperties`
        );
        setProperties(res.data);
        setFilteredProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.propertyType.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const finalFiltered = useMemo(() => {
    return filteredProperties.filter((p) => {
      const matchesBhk = !filters.bhk || p.bedrooms === parseInt(filters.bhk);
      const matchesFurnishing =
        !filters.furnishing || p.furnishing === filters.furnishing;
      const matchesType =
        !filters.propertyType || p.propertyType === filters.propertyType;
      const matchesParking = !filters.parking || p.parking === filters.parking;
      const matchesFacing = !filters.facing || p.facing === filters.facing;

      return (
        matchesBhk &&
        matchesFurnishing &&
        matchesType &&
        matchesParking &&
        matchesFacing
      );
    });
  }, [filters, filteredProperties]);

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto py-10 px-4 md:px-6 lg:px-8">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex justify-center items-center gap-2 p-3 bg-white text-blue-700 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <SlidersHorizontal size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
            <ChevronDown
              size={18}
              className={`transition-transform ${
                showFilters ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div>
            <h2 className="text-lg text-blue-900 font-medium">
              Showing {finalFiltered.length} Results
            </h2>
            <p className="text-sm text-gray-500">Rental homes available in Pune</p>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <p className="text-sm font-medium">
              Sort By: <span className="text-blue-600">Relevance</span>
            </p>
            <ChevronDown size={18} className="cursor-pointer" />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          <div className="lg:w-3/4 space-y-6">
            {finalFiltered.length > 0 ? (
              finalFiltered.map((p) => <PropertyCard key={p._id} p={p} />)
            ) : (
              <p className="text-gray-600 text-center py-10">
                No properties found matching your filters.
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-blue-900 text-white text-center py-14 mt-12">
        <h3 className="text-2xl font-light mb-2">Post Your Rental Requirement</h3>
        <p className="text-blue-200 text-sm mb-5">
          Let owners and agents reach out to you directly with listings.
        </p>
        <button className="bg-amber-400 text-blue-900 px-6 py-3 rounded-lg text-sm font-medium hover:bg-amber-300 transition">
          Post Requirement
        </button>
      </footer>
    </div>
  );
};

export default RentalPropertiesPage;
