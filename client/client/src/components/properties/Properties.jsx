import React, { useEffect, useState, useRef } from "react";
import { FaRulerCombined, FaBuilding, FaLayerGroup, FaFilter, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const THEME_BLUE = "#1E88E5";

const formatRupee = (n) => {
  if (n === undefined || n === null || n === "") return "N/A";
  const num = Number(n);
  if (Number.isNaN(num)) return "N/A";
  return num.toLocaleString("en-IN");
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("BUY");
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [transactionType, setTransactionType] = useState("Buy");
  const [city, setCity] = useState("");
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [sliderMin, setSliderMin] = useState(100000);
  const [sliderMax, setSliderMax] = useState(10000000);
  const [appliedMin, setAppliedMin] = useState(100000);
  const [appliedMax, setAppliedMax] = useState(10000000);
  const [selectedBHK, setSelectedBHK] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);

  const dropdownRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({ name: "", email: "", phone: "" });
  const [modalFor, setModalFor] = useState("");
  const [descExpanded, setDescExpanded] = useState({});
  const [amenViewAll, setAmenViewAll] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sampleCities = ["Pune", "Mumbai", "Bengaluru", "Hyderabad"];
  const sampleTopLocalities = ["Baner", "Aundh", "Kharadi", "Wakad", "Hinjewadi", "Hadapsar"];
  const postedByOptions = ["Owner", "Builder", "Agent"];
  const bhkOptions = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];

  useEffect(() => {
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: "smooth",
      });
    }, 1700);
  }, []);

  const fetchProperties = async (tab = "BUY") => {
    setLoading(true);
    try {
      let apiUrl;
      if (tab === "RENT") {
        apiUrl = `${import.meta.env.VITE_API_URL}/properties`;
      } else {
        apiUrl = `${import.meta.env.VITE_API_URL}/sellproperty`;
      }
      const res = await fetch(apiUrl);
      const result = await res.json();

      if (result?.success && Array.isArray(result.data)) {
        setProperties(result.data);
        const idx = {};
        result.data.forEach((p) => (idx[p._id] = 0));
        setCarouselIndex(idx);
      } else {
        setProperties(result?.data || []);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("[data-filter-button]")
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((id) => {
          const prop = properties.find((p) => p._id === id);
          const imgs = prop?.images?.length ? prop.images : [];
          if (imgs.length > 0) {
            next[id] = (next[id] + 1) % imgs.length;
          }
        });
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [properties]);

  const toggleLocality = (l) =>
    setSelectedLocalities((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));
  const togglePropertyType = (t) =>
    setSelectedPropertyTypes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const toggleBHK = (b) => setSelectedBHK((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]));
  const togglePostedBy = (p) => setSelectedPostedBy((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));

  const tabs = ["BUY", "RENT", "SELL"];


  const handleTabClick = (tab) => {
  if (tab === "BUY") {
    setActiveTab("BUY");
    setTransactionType("Buy");
    clearAll();
    navigate("/buyproperties"); // optional if you want buy page
  } 
  else if (tab === "RENT") {
    setActiveTab("RENT");
    setTransactionType("Rent");
    clearAll();
    navigate("/rentproperties");  // 👈 added navigation
  } 
  else if (tab === "SELL") {
    navigate("/sellproperties");
  }
};

  const clearAll = () => {
    setCity("");
    setSelectedLocalities([]);
    setSelectedPropertyTypes([]);
    setSliderMin(100000);
    setSliderMax(10000000);
    setAppliedMin(100000);
    setAppliedMax(10000000);
    setSelectedBHK([]);
    setSelectedPostedBy([]);
  };

  const applyBudget = () => {
    let a = Number(sliderMin);
    let b = Number(sliderMax);
    if (a > b) [a, b] = [b, a];
    setAppliedMin(a);
    setAppliedMax(b);
    setOpenDropdown(null);
  };

  const prevSlide = (prop) => {
    const imgs = prop.images || [];
    if (!imgs.length) return;
    setCarouselIndex((prev) => ({ ...prev, [prop._id]: ((prev[prop._id] || 0) - 1 + imgs.length) % imgs.length }));
  };

  const nextSlide = (prop) => {
    const imgs = prop.images || [];
    if (!imgs.length) return;
    setCarouselIndex((prev) => ({ ...prev, [prop._id]: ((prev[prop._id] || 0) + 1) % imgs.length }));
  };

  const goTo = (id, i) => setCarouselIndex((p) => ({ ...p, [id]: i }));

  const openModal = (type) => {
    setModalFor(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalForm({ name: "", email: "", phone: "" });
  };
  const submitModal = (e) => {
    e.preventDefault();
    closeModal();
    alert("Form submitted (frontend only).");
  };

  const filtered = properties.filter((p) => {
    const price = Number(p.price || 0);
    if (!Number.isNaN(price) && (appliedMin !== 100000 || appliedMax !== 10000000)) {
      if (appliedMin && price < appliedMin) return false;
      if (appliedMax && price > appliedMax) return false;
    }

    if (city && city.trim() && p.location && !p.location.toLowerCase().includes(city.toLowerCase())) return false;

    if (selectedPropertyTypes.length > 0) {
      const hasMatchingType = selectedPropertyTypes.some(type => {
        if (type === "Flat" && (p.type?.toLowerCase().includes("flat") || p.type?.toLowerCase().includes("apartment") || p.type?.toLowerCase().includes("bhk"))) return true;
        if (type === "House/Villa" && (p.type?.toLowerCase().includes("house") || p.type?.toLowerCase().includes("villa"))) return true;
        if (type === "Plot/Land" && (p.type?.toLowerCase().includes("plot") || p.type?.toLowerCase().includes("land"))) return true;
        if (type === "Office Space" && p.type?.toLowerCase().includes("office")) return true;
        if (type === "Shop/Showroom" && (p.type?.toLowerCase().includes("shop") || p.type?.toLowerCase().includes("showroom"))) return true;
        if (type === "Commercial Land" && p.type?.toLowerCase().includes("commercial")) return true;
        if (type === "Warehouse/Godown" && (p.type?.toLowerCase().includes("warehouse") || p.type?.toLowerCase().includes("godown"))) return true;
        return false;
      });
      if (!hasMatchingType) return false;
    }

    if (selectedBHK.length > 0) {
      const hasMatchingBHK = selectedBHK.some(bhk => {
        const bhkNumber = bhk.replace(/[^0-9]/g, '');
        return p.title?.toLowerCase().includes(bhk.toLowerCase()) ||
          p.type?.toLowerCase().includes(bhk.toLowerCase()) ||
          p.title?.includes(bhkNumber + "bhk") ||
          p.title?.includes(bhkNumber + " bhk");
      });
      if (!hasMatchingBHK) return false;
    }

    if (selectedPostedBy.length > 0) {
      const hasMatchingPostedBy = selectedPostedBy.some(postedBy => {
        return p.owner?.toLowerCase().includes(postedBy.toLowerCase()) ||
          p.postedBy?.toLowerCase().includes(postedBy.toLowerCase());
      });
      if (!hasMatchingPostedBy) return false;
    }

    return true;
  });

  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/2748/2748558.png";

  // Filter component to avoid repetition
  const FilterSection = () => (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6" ref={dropdownRef}>
      <div className="flex flex-wrap gap-3">
        {/* Transaction Type */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "buy" ? null : "buy"))}
            className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium"
            style={{ borderColor: THEME_BLUE }}
          >
            {transactionType}
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "buy" && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border p-4 z-10">
              <div className="text-sm font-semibold mb-2">Transaction</div>
              <div className="flex gap-2">
                <button onClick={() => setTransactionType("Buy")} className="px-3 py-1.5 rounded-full border text-sm bg-white text-black" style={{ borderColor: THEME_BLUE }}>
                  Buy
                </button>
                <button onClick={() => setTransactionType("Rent")} className="px-3 py-1.5 rounded-full border text-sm bg-white text-black" style={{ borderColor: THEME_BLUE }}>
                  Rent
                </button>
              </div>
              <div className="mt-3 text-right">
                <button onClick={() => setOpenDropdown(null)} className="text-sm text-gray-500">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* City */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "city" ? null : "city"))}
            className="flex items-center gap-3 rounded-full px-4 py-2 border bg-white text-black font-medium"
            style={{ borderColor: THEME_BLUE }}
          >
            <span className="text-sm">{city || "All Cities"}</span>
            <span className="text-xs text-gray-400">▾</span>
          </button>
          {openDropdown === "city" && (
            <div className="absolute left-0 mt-3 w-[520px] max-h-[420px] bg-white rounded-lg shadow-lg border overflow-auto p-6 z-10">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-50 text-black">{city} ✕</span>
                <input className="flex-1 border rounded-md px-3 py-2 text-sm" placeholder="Add city" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Top Cities</h4>
                <div className="grid grid-cols-2 gap-2">{sampleCities.map((c) => (
                  <button key={c} onClick={() => setCity(c)} className={`text-left px-3 py-2 rounded-md border ${c === city ? "bg-blue-50 text-black border-blue-200" : "bg-white text-gray-700 border-gray-200"}`}>{c}</button>
                ))}</div>
              </div>
              <div className="mt-6 text-right">
                <button onClick={() => setOpenDropdown(null)} className="text-sm text-gray-500">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Localities */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "localities" ? null : "localities"))}
            className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium"
            style={{ borderColor: THEME_BLUE }}
          >
            Top Localities
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "localities" && (
            <div className="absolute left-0 mt-3 w-[520px] bg-white rounded-lg shadow-lg border p-6 z-10">
              <h4 className="font-semibold mb-3">Top Localities</h4>
              <div className="flex gap-3 flex-wrap">{sampleTopLocalities.map((l) => (
                <button key={l} onClick={() => toggleLocality(l)} className={`px-3 py-1.5 rounded-full border text-sm ${selectedLocalities.includes(l) ? "bg-blue-50 text-black border-blue-200" : "bg-white text-black border-black"}`} style={{ borderColor: THEME_BLUE }}>
                  {selectedLocalities.includes(l) ? "✓ " : "+ "} {l}
                </button>
              ))}</div>
              <div className="mt-6 text-right">
                <button onClick={() => setOpenDropdown(null)} className="text-sm text-gray-500">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Budget */}
        <div className="relative" data-filter-button>
          <button onClick={() => setOpenDropdown((o) => (o === "budget" ? null : "budget"))} className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium" style={{ borderColor: THEME_BLUE }}>
            Budget
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "budget" && (
            <div className="absolute left-0 mt-3 w-[520px] bg-white rounded-lg shadow-lg border p-6 z-10">
              <h4 className="font-semibold mb-3">Budget (₹)</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-sm text-gray-700">Min: <strong>₹ {formatRupee(sliderMin)}</strong></div>
                <div className="text-sm text-gray-700">Max: <strong>₹ {formatRupee(sliderMax)}</strong></div>
              </div>
              <div className="relative mb-4">
                <div className="h-2 rounded-full bg-gray-200"></div>
                <div className="absolute top-0 h-2 rounded-full" style={{
                  backgroundColor: THEME_BLUE,
                  left: `${((Math.min(sliderMin, sliderMax) - 100000) / (10000000 - 100000)) * 100}%`,
                  right: `${100 - ((Math.max(sliderMin, sliderMax) - 100000) / (10000000 - 100000)) * 100}%`
                }} />
                <input type="range" min={100000} max={10000000} step={10000} value={sliderMin} onChange={(e) => setSliderMin(Number(e.target.value) <= sliderMax ? Number(e.target.value) : sliderMax)} className="absolute top-0 left-0 w-full appearance-none" />
                <input type="range" min={100000} max={10000000} step={10000} value={sliderMax} onChange={(e) => setSliderMax(Number(e.target.value) >= sliderMin ? Number(e.target.value) : sliderMin)} className="absolute top-0 left-0 w-full appearance-none" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => { setSliderMin(100000); setSliderMax(10000000); setAppliedMin(100000); setAppliedMax(10000000); }} className="text-red-500 font-medium">Clear All</button>
                <div className="flex items-center gap-3"><button onClick={applyBudget} className="px-4 py-2 rounded-full" style={{ backgroundColor: THEME_BLUE, color: "white" }}>Apply</button></div>
              </div>
            </div>
          )}
        </div>

        {/* Property Type */}
        <div className="relative" data-filter-button>
          <button onClick={() => setOpenDropdown((o) => (o === "flat" ? null : "flat"))} className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium" style={{ borderColor: THEME_BLUE }}>
            Flat +2
            <span className="text-xs bg-blue-50 px-2 rounded-full text-black">✕</span>
          </button>
          {openDropdown === "flat" && (
            <div className="absolute left-0 mt-3 w-[520px] bg-white rounded-lg shadow-lg border p-6 z-10">
              <h4 className="font-semibold mb-3">Residential</h4>
              <div className="flex gap-3 flex-wrap mb-4">{["Flat", "House/Villa", "Plot/Land"].map((t) => (
                <button key={t} onClick={() => togglePropertyType(t)} className={`px-3 py-1.5 rounded-full border text-sm ${selectedPropertyTypes.includes(t) ? "bg-blue-50 text-black border-blue-200" : "bg-white text-black border-black"}`} style={{ borderColor: THEME_BLUE }}>{selectedPropertyTypes.includes(t) ? "✓ " : "+ "} {t}</button>
              ))}</div>
              <h4 className="font-semibold mb-3">Commercial</h4>
              <div className="flex gap-3 flex-wrap mb-4">{["Office Space", "Shop/Showroom", "Commercial Land", "Warehouse/Godown"].map((t) => (
                <button key={t} onClick={() => togglePropertyType(t)} className={`px-3 py-1.5 rounded-full border text-sm ${selectedPropertyTypes.includes(t) ? "bg-blue-50 text-black border-blue-200" : "bg-white text-black border-black"}`} style={{ borderColor: THEME_BLUE }}>{selectedPropertyTypes.includes(t) ? "✓ " : "+ "} {t}</button>
              ))}</div>
              <div className="mt-6 text-right"><button onClick={() => setOpenDropdown(null)} className="text-sm text-gray-500">Done</button></div>
            </div>
          )}
        </div>

        {/* BHK */}
        <div className="relative" data-filter-button>
          <button onClick={() => setOpenDropdown((o) => (o === "bhk" ? null : "bhk"))} className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium" style={{ borderColor: THEME_BLUE }}>
            BHK
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "bhk" && (
            <div className="absolute left-0 mt-3 w-[380px] bg-white rounded-lg shadow-lg border p-6 z-10">
              <h4 className="font-semibold mb-3">BHK</h4>
              <div className="flex gap-3 flex-wrap">{bhkOptions.map((b) => (
                <button key={b} onClick={() => toggleBHK(b)} className={`px-3 py-1.5 rounded-full border text-sm ${selectedBHK.includes(b) ? "bg-blue-50 text-black border-blue-200" : "bg-white text-black border-black"}`} style={{ borderColor: THEME_BLUE }}>{selectedBHK.includes(b) ? "✓ " : "+ "} {b}</button>
              ))}</div>
              <div className="mt-6 text-right"><button onClick={() => setOpenDropdown(null)} className="text-sm text-gray-500">Done</button></div>
            </div>
          )}
        </div>

        {/* Posted By */}
        <div className="relative" data-filter-button>
          <button onClick={() => setOpenDropdown((o) => (o === "postedBy" ? null : "postedBy"))} className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium" style={{ borderColor: THEME_BLUE }}>
            Posted By
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "postedBy" && (
            <div className="absolute left-0 mt-3 w-[320px] bg-white rounded-lg shadow-lg border p-6 z-10">
              <h4 className="font-semibold mb-3">Posted By</h4>
              <div className="flex gap-3 flex-wrap">{postedByOptions.map((p) => (
                <button key={p} onClick={() => togglePostedBy(p)} className={`px-3 py-1.5 rounded-full border text-sm ${selectedPostedBy.includes(p) ? "bg-blue-50 text-black border-blue-200" : "bg-white text-black border-black"}`} style={{ borderColor: THEME_BLUE }}>{selectedPostedBy.includes(p) ? "✓ " : "+ "} {p}</button>
              ))}</div>
              <div className="mt-6 text-right"><button onClick={() => setOpenDropdown(null)} className="text-sm text-gray-500">Done</button></div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        <div className="relative ml-auto">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white text-black font-medium hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute w-full h-screen">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://st.hzcdn.com/simgs/97914f010d78960c_14-5291/_.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply" />
        </div>

        {/* Hero Text */}
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight font-normal">
            {["Find", "Your", "Dream", "Home", "Today"].map((word, index) => (
              <motion.span
                key={word}
                className={`inline-block mr-2 ${word === "Dream" || word === "Home"
                  ? "text-blue-400"
                  : "text-white"
                  }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + index * 0.08, duration: 0.25, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-blue-100 text-base font-normal mb-8 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
          >
            Explore <span className="text-blue-300">verified properties</span> across top
            locations — smart filters, easy search, and trusted listings.
          </motion.p>

          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="flex bg-blue-900/20 backdrop-blur-2xl rounded-full p-3 shadow-[0_0_25px_rgba(30,64,175,0.3)] border border-blue-300/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            >
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59,130,246,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className={`relative px-4 sm:px-8 py-3 mx-1 text-sm font-medium rounded-full transition-all duration-500 overflow-hidden ${activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/30"
                    }`}
                >
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 px-4 md:px-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{filtered.length} results | Property for {activeTab === 'RENT' ? 'Rent' : 'Sale'} {city ? `in ${city}` : ''}</h2>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-blue-500 text-blue-500"
            >
              <FaFilter /> Filters
            </button>
          </div>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2">
                  <FaTimes size={24} />
                </button>
              </div>
              <FilterSection />
              <div className="mt-6">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <FilterSection />
          </div>

          {/* Results Header */}
          <div className="hidden lg:block">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{filtered.length} results | Property for {activeTab === 'RENT' ? 'Rent' : 'Sale'} {city ? `in ${city}` : ''}</h2>
            <p className="text-gray-500 mb-4">Explore premium flats and properties{city ? ` across ${city}` : ' across all locations'}.</p>
          </div>

          {/* Budget Suggestion */}
          {!loading && filtered.length > 0 && (
            <div
              className="bg-blue-50 border border-blue-200 text-[#1E88E5] py-3 px-4 mb-6 rounded-md flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => {
                setOpenDropdown("budget");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span>Add Budget for better results</span>
              <button className="text-[#1E88E5] font-semibold">→</button>
            </div>
          )}

          {/* Properties List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties available.</p>
              <button
                onClick={clearAll}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((property) => {
                const imgs = property.images && property.images.length ? property.images : [fallbackImage];
                const cur = carouselIndex[property._id] ?? 0;
                const amenities = [
                  { label: "Area", value: property.area ? `${property.area} sqft` : "—" },
                  { label: "Status", value: property.propertystatus || "Available" },
                  { label: "Type", value: property.type || "—" }
                ];
                const show5Plus = imgs.length >= 5;
                return (
                  <div
                    key={property._id}
                    className="bg-white shadow-md rounded-2xl overflow-hidden border border-transparent hover:shadow-xl transition-all duration-300 hover:border-[#1E88E5] group cursor-pointer"
                    onClick={() => navigate(`/buyresidential/${property._id}`)}
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Image Section */}
                      <div className="md:w-2/5 p-4 flex flex-col">
                        <div className="relative w-full h-64 md:h-full overflow-hidden rounded-lg">
                          {imgs.map((img, i) => {
                            const isActive = i === cur;
                            return (
                              <img key={i} src={img || fallbackImage} alt={`${property.title} ${i}`} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-600 ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`} style={{ transform: isActive ? "translateX(0%)" : "translateX(100%)" }} />
                            );
                          })}
                          <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-black text-xs px-2 py-1 rounded">{show5Plus ? "5+ Photos" : `${imgs.length} Photo${imgs.length > 1 ? "s" : ""}`}</div>
                          {imgs.length > 1 && (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); prevSlide(property); }} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-1 rounded-full hover:bg-opacity-100">‹</button>
                              <button onClick={(e) => { e.stopPropagation(); nextSlide(property); }} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-1 rounded-full hover:bg-opacity-100">›</button>
                              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                                {imgs.map((_, i) => (
                                  <button key={i} onClick={(e) => { e.stopPropagation(); goTo(property._id, i); }} className={`w-2 h-2 rounded-full ${i === cur ? "bg-white" : "bg-white bg-opacity-50"}`} />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="flex-1 p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:underline">{property.title}</h3>
                        <p className="text-[#1E88E5] font-medium mb-2">{property.location}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800 mb-3">
                          <div className="flex items-center gap-2">
                            <FaRulerCombined className="text-black text-xl" />
                            <div>
                              <div className="text-xs text-gray-500">Area</div>
                              <div className="text-sm text-black">{property.area ? `${property.area} sqft` : "N/A"}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaBuilding className="text-black text-xl" />
                            <div>
                              <div className="text-xs text-gray-500">Type</div>
                              <div className="text-sm text-black">{property.type || "N/A"}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaLayerGroup className="text-black text-xl" />
                            <div>
                              <div className="text-xs text-gray-500">Status</div>
                              <div className="text-sm text-black">{property.propertystatus || "Available"}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-600 text-sm">
                            {descExpanded[property._id] ? property.description || "No description." : (property.description ? property.description.slice(0, 150) + (property.description.length > 150 ? "..." : "") : "No description.")}
                          </p>
                          {property.description && property.description.length > 150 && (
                            <button onClick={(e) => { e.stopPropagation(); setDescExpanded((p) => ({ ...p, [property._id]: !p[property._id] })); }} className="text-sm text-[#1E88E5] mt-1">
                              {descExpanded[property._id] ? "Read less" : "Read more"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col justify-center items-center bg-gray-50 p-6 md:w-1/4 border-t md:border-t-0 md:border-l">
                        <p className="text-[#1E88E5] font-bold text-lg mb-4">₹ {formatRupee(property.price)}</p>
                        <div className="w-full space-y-3">
                          <button onClick={(e) => { e.stopPropagation(); openModal("contact"); }} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full w-full flex items-center justify-center gap-2 transition-all shadow-lg text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                            Contact Owner
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); openModal("getPhone"); }} className="border border-[#1E88E5] text-[#1E88E5] px-4 py-2 rounded-full w-full hover:bg-blue-50 text-sm">Get Phone No.</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/50" onClick={closeModal} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-0 z-50 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Get Contact Details</h3>
                </div>
                <p className="text-blue-100 text-sm">Enter your WhatsApp No. to get Contact Details of the Owner</p>
              </div>

              {/* Form */}
              <form onSubmit={submitModal} className="p-6 space-y-4">
                <div>
                  <input
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm((s) => ({ ...s, name: e.target.value }))}
                    className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none px-0 py-3 text-gray-800 placeholder-gray-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <input
                    required
                    type="email"
                    value={modalForm.email}
                    onChange={(e) => setModalForm((s) => ({ ...s, email: e.target.value }))}
                    className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none px-0 py-3 text-gray-800 placeholder-gray-500"
                    placeholder="Email"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-3 py-3 border-b-2 border-gray-200">
                    <span className="text-gray-600 font-medium">IND</span>
                    <span className="text-gray-800 font-medium">+91</span>
                  </div>
                  <input
                    required
                    type="tel"
                    value={modalForm.phone}
                    onChange={(e) => setModalForm((s) => ({ ...s, phone: e.target.value }))}
                    className="flex-1 border-b-2 border-gray-200 focus:border-blue-500 outline-none px-0 py-3 text-gray-800 placeholder-gray-500"
                    placeholder="Your WhatsApp Number"
                  />
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input type="checkbox" required className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label className="text-sm text-gray-600 leading-relaxed">
                    I Agree to <span className="text-blue-600 underline cursor-pointer">Edge Expert Terms of Use</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                  >
                    Get Contact Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Properties;