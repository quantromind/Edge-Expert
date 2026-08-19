import React, { useRef, useState, useEffect } from "react";
import {
  MapPin,
  TrendingUp,
  Heart,
  ShoppingCart,
  Bed,
  Bath,
  Maximize2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Helper function to format price
const formatPrice = (price) => {
  if (typeof price === "string" && price.startsWith("₹")) return price;
  const num = Number(price);
  if (isNaN(num)) return price || "Price on Request";
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lac`;
  } else {
    return `₹${num.toLocaleString("en-IN")}`;
  }
};

// Rich, curated property dataset with high quality images
const defaultCuratedProperties = [
  {
    id: "prop-1",
    title: "The Grand Horizon Sea-Facing Penthouse",
    location: "Worli Sea Face, Mumbai",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    price: "₹8.50 Cr",
    type: "Luxury",
    tagColor: "bg-amber-600 text-white",
    bhk: "4 BHK",
    baths: "4 Baths",
    area: "3,250 sq.ft",
    category: "Luxury",
    description: "Ultra-luxury waterfront penthouse featuring private sky deck, Italian marble flooring, and uninterrupted views of the Arabian Sea.",
    link: "/luxuryproperties",
  },
  {
    id: "prop-2",
    title: "Sobha Palm Oasis Smart Villa",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    price: "₹4.25 Cr",
    type: "For Sale",
    tagColor: "bg-blue-600 text-white",
    bhk: "4 BHK",
    baths: "4 Baths",
    area: "3,600 sq.ft",
    category: "For Sale",
    description: "Independent luxury villa inside a lush gated community with private heated swimming pool, rooftop solar, and lush gardens.",
    link: "/buyresidential",
  },
  {
    id: "prop-3",
    title: "Lodha World View Luxury Suite",
    location: "Lower Parel, Mumbai",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    price: "₹1.75 Lac /mo",
    type: "For Rent",
    tagColor: "bg-emerald-600 text-white",
    bhk: "3 BHK",
    baths: "3 Baths",
    area: "1,850 sq.ft",
    category: "For Rent",
    description: "Fully furnished designer apartment in high-rise tower with infinity pool access, club lounge, 2 car parking spaces, and 24/7 security.",
    link: "/rentproperties",
  },
  {
    id: "prop-4",
    title: "Prestige Cyber Tech Corporate Hub",
    location: "Kharadi IT Park, Pune",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    price: "₹11.50 Cr",
    type: "Commercial",
    tagColor: "bg-purple-600 text-white",
    bhk: "Furnished Office",
    baths: "Multi Restrooms",
    area: "8,500 sq.ft",
    category: "Commercial",
    description: "Grade-A LEED Gold certified commercial space with plug-and-play workstations, boardrooms, dedicated cafeteria, and 100% DG backup.",
    link: "/commercial",
  },
  {
    id: "prop-5",
    title: "DLF Magnolias Golf View Apartment",
    location: "Golf Course Road, Gurugram",
    city: "Gurugram",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    price: "₹9.20 Cr",
    type: "Luxury",
    tagColor: "bg-amber-600 text-white",
    bhk: "4 BHK",
    baths: "5 Baths",
    area: "4,400 sq.ft",
    category: "Luxury",
    description: "Iconic ultra-luxury residence overlooking championship golf course with private elevator access, Olympic pool, and spa.",
    link: "/luxuryproperties",
  },
  {
    id: "prop-6",
    title: "Godrej Green Cove Modern Apartment",
    location: "Mahalunge, Pune",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    price: "₹78 Lac",
    type: "For Sale",
    tagColor: "bg-blue-600 text-white",
    bhk: "2 BHK",
    baths: "2 Baths",
    area: "765 sq.ft",
    category: "For Sale",
    description: "Vastu-compliant modern apartment with clubhouse access, children’s play park, jogging track, and excellent Hinjewadi connectivity.",
    link: "/buyresidential",
  },
  {
    id: "prop-7",
    title: "Hiranandani Gardens Heritage Apartment",
    location: "Powai, Mumbai",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1200&q=80",
    price: "₹85,000 /mo",
    type: "For Rent",
    tagColor: "bg-emerald-600 text-white",
    bhk: "2 BHK",
    baths: "2 Baths",
    area: "980 sq.ft",
    category: "For Rent",
    description: "Beautiful neoclassical style residence overlooking Powai Lake, close to international schools, malls, restaurants, and business centers.",
    link: "/rentproperties",
  },
  {
    id: "prop-8",
    title: "One Central Avenue Retail Boulevard",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    price: "₹6.80 Cr",
    type: "Commercial",
    tagColor: "bg-purple-600 text-white",
    bhk: "Showroom / Retail",
    baths: "Attached",
    area: "2,400 sq.ft",
    category: "Commercial",
    description: "High-visibility ground floor retail and showroom space in upscale Banjara Hills with wide road frontage and multi-level customer parking.",
    link: "/commercial",
  },
];

// --- Property Card Component ---
const PropertyCard = ({ prop }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return !!(localStorage.getItem("token") || sessionStorage.getItem("token"));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isUserLoggedIn()) {
      alert("Please login to save favorite properties");
      navigate("/loginregister");
      return;
    }
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    if (prop.link) {
      navigate(prop.link);
    } else {
      navigate(`/buyresidential/${prop.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex-shrink-0 w-[290px] sm:w-[330px] md:w-[370px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 flex flex-col cursor-pointer hover:-translate-y-2"
    >
      {/* Property Image Container */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={prop.image}
          alt={prop.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
              prop.tagColor || "bg-blue-600 text-white"
            }`}
          >
            {prop.type || "Featured"}
          </span>

          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-700 hover:bg-white hover:text-red-500"
            }`}
            title="Add to Wishlist"
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Verified Badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/30">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Edge Verified Listing</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="text-xl sm:text-2xl font-extrabold text-blue-700 tracking-tight">
              {prop.price}
            </h4>
            <span className="text-[11px] font-medium text-gray-500 uppercase">
              {prop.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
            {prop.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-xs text-gray-600 mb-4">
            <MapPin size={14} className="text-red-500 mr-1 flex-shrink-0" />
            <span className="truncate">{prop.location}</span>
          </div>

          {/* Specification Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 mb-4 text-gray-700">
            <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase font-medium">Config</span>
              <span className="text-xs font-bold text-gray-800">{prop.bhk || "2/3 BHK"}</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase font-medium">Area</span>
              <span className="text-xs font-bold text-gray-800">{prop.area || "1,200 sq.ft"}</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase font-medium">Status</span>
              <span className="text-xs font-bold text-emerald-600">Available</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
            <CheckCircle size={14} className="text-blue-500" />
            Direct Owner/Agent
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md hover:shadow-blue-500/20"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Featured Properties Section ---
export default function HomeProperties() {
  const scrollRef = useRef(null);
  const [properties, setProperties] = useState(defaultCuratedProperties);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch properties from live APIs with graceful fallback
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // If no backend API URL is configured, use default curated properties cleanly without network errors
    if (!apiUrl) {
      setProperties(defaultCuratedProperties);
      return;
    }

    const fetchAllProperties = async () => {
      try {
        setLoading(true);
        const [commercialRes, sellRes, rentRes] = await Promise.all([
          axios.get(`${apiUrl}/commercialproperties`).catch(() => ({ data: { data: [] } })),
          axios.get(`${apiUrl}/sellproperty/`).catch(() => ({ data: { data: [] } })),
          axios.get(`${apiUrl}/rentproperties`).catch(() => ({ data: { data: [] } })),
        ]);

        const fetchedList = [];

        // Parse Commercial
        if (Array.isArray(commercialRes?.data?.data)) {
          commercialRes.data.data.forEach((p, idx) => {
            if (p) {
              fetchedList.push({
                id: p._id || `comm-${idx}`,
                title: p.title || p.name || p.propertyName || "Grade-A Commercial Space",
                location: p.location || p.address || p.city || "Mumbai",
                city: p.city || "Mumbai",
                image: p.image || p.images?.[0] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                price: formatPrice(p.price || p.amount || 5000000),
                type: "Commercial",
                tagColor: "bg-purple-600 text-white",
                bhk: "Office Space",
                baths: "Restrooms",
                area: p.area || "2,500 sq.ft",
                category: "Commercial",
                description: p.description || "Premium commercial office setup.",
                link: `/commercial/${p._id}`,
              });
            }
          });
        }

        // Parse Sell
        if (Array.isArray(sellRes?.data?.data)) {
          sellRes.data.data.forEach((p, idx) => {
            if (p) {
              fetchedList.push({
                id: p._id || `sell-${idx}`,
                title: p.title || p.name || p.propertyName || "Luxury Residential Apartment",
                location: p.location || p.address || p.city || "Pune",
                city: p.city || "Pune",
                image: p.image || p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                price: formatPrice(p.price || p.amount || 8500000),
                type: "For Sale",
                tagColor: "bg-blue-600 text-white",
                bhk: `${p.bedrooms || 3} BHK`,
                baths: `${p.bathrooms || 2} Baths`,
                area: p.area || "1,450 sq.ft",
                category: "For Sale",
                description: p.description || "Spacious home with prime amenities.",
                link: `/buyresidential/${p._id}`,
              });
            }
          });
        }

        // Parse Rent
        if (Array.isArray(rentRes?.data?.data)) {
          rentRes.data.data.forEach((p, idx) => {
            if (p) {
              fetchedList.push({
                id: p._id || `rent-${idx}`,
                title: p.title || p.name || p.propertyName || "Premium Rental Flat",
                location: p.location || p.address || p.city || "Bangalore",
                city: p.city || "Bangalore",
                image: p.image || p.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                price: `${formatPrice(p.price || p.amount || 45000)} /mo`,
                type: "For Rent",
                tagColor: "bg-emerald-600 text-white",
                bhk: `${p.bedrooms || 2} BHK`,
                baths: `${p.bathrooms || 2} Baths`,
                area: p.area || "1,150 sq.ft",
                category: "For Rent",
                description: p.description || "Ready to move rental residence.",
                link: `/rentproperties`,
              });
            }
          });
        }

        if (fetchedList.length > 0) {
          // Merge API data with default curated properties for maximum visual impact
          setProperties([...fetchedList, ...defaultCuratedProperties]);
        } else {
          setProperties(defaultCuratedProperties);
        }
      } catch (e) {
        setProperties(defaultCuratedProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory || p.type === activeCategory;
  });

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-blue-600" />
              Verified & Handpicked Listings
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Featured <span className="text-blue-600">Properties</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl">
              Browse thousands of verified homes, luxury villas, and prime commercial spaces across India's top metropolitan cities.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "All", label: "All Listings" },
              { id: "For Sale", label: "For Sale" },
              { id: "For Rent", label: "For Rent" },
              { id: "Luxury", label: "Luxury Collection" },
              { id: "Commercial", label: "Commercial" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading properties with images...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
              <p className="text-gray-600 text-lg">No properties found in this category.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
              >
                Show All Properties
              </button>
            </div>
          ) : (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-800 hover:text-blue-600 hover:bg-blue-50 items-center justify-center shadow-xl border border-gray-200 z-30 transition-all cursor-pointer hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-800 hover:text-blue-600 hover:bg-blue-50 items-center justify-center shadow-xl border border-gray-200 z-30 transition-all cursor-pointer hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>

              {/* Scrollable Properties Track */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredProperties.map((p) => (
                  <PropertyCard key={p.id} prop={p} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* View All Properties Bottom Action Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-blue-50/80 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Eye size={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">
                Didn’t find what you’re looking for?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Explore our full catalogue of 10,000+ verified listings with custom price and location filters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/properties")}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All 10,000+ Properties</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
