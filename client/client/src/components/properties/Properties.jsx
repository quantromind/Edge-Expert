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

const formatRupeeShort = (n) => {
  if (n === undefined || n === null || n === "") return "N/A";
  const num = Number(n);
  if (Number.isNaN(num)) return "N/A";
  if (num >= 10000000) return `${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 2)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 2)} L`;
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
  const [sliderMin, setSliderMin] = useState(500000);
  const [sliderMax, setSliderMax] = useState(150000000);
  const [appliedMin, setAppliedMin] = useState(500000);
  const [appliedMax, setAppliedMax] = useState(150000000);
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

  const sampleCities = ["Mumbai", "Ayodhya", "Thane", "Navi Mumbai"];
  const sampleTopLocalities = [
    "Andheri West",
    "Bandra West",
    "Goregaon West",
    "Kandivali West",
    "Borivali West",
    "Malad West",
    "Dahisar West",
    "BKC",
    "Chandivali",
    "Sarayu Riverfront, Ayodhya",
    "Ram Mandir Corridor, Ayodhya",
  ];
  const postedByOptions = ["Builder", "Owner", "Agent"];
  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK", "Plots / Land"];

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
      const apiUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/sellproperty`;
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
      navigate("/properties");
    } else if (tab === "RENT") {
      setActiveTab("RENT");
      setTransactionType("Rent");
      clearAll();
      navigate("/rentproperties");
    } else if (tab === "SELL") {
      navigate("/sellproperties");
    }
  };

  const clearAll = () => {
    setCity("");
    setSelectedLocalities([]);
    setSelectedPropertyTypes([]);
    setSliderMin(500000);
    setSliderMax(150000000);
    setAppliedMin(500000);
    setAppliedMax(150000000);
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

  const setBudgetPreset = (min, max) => {
    setSliderMin(min);
    setSliderMax(max);
    setAppliedMin(min);
    setAppliedMax(max);
    setOpenDropdown(null);
  };

  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState(null);
  const [modalSubmittedSuccess, setModalSubmittedSuccess] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);

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

  const openModal = (type, prop = null) => {
    setModalFor(type);
    setSelectedPropertyForModal(prop);
    setModalSubmittedSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalForm({ name: "", email: "", phone: "" });
    setSelectedPropertyForModal(null);
    setModalSubmittedSuccess(false);
  };

  const submitModal = async (e) => {
    e.preventDefault();
    setSubmittingEnquiry(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        name: modalForm.name,
        email: modalForm.email,
        phone: modalForm.phone,
        propertyId: selectedPropertyForModal?._id || undefined,
        propertyType: selectedPropertyForModal?.propertyType || selectedPropertyForModal?.type || "Residential",
        transactionType: selectedPropertyForModal?.transactionType || "Buy",
        city: selectedPropertyForModal?.city || selectedPropertyForModal?.location || "Mumbai",
        message: modalFor === "getPhone"
          ? `User requested contact number for: ${selectedPropertyForModal?.title || "Property"} (${selectedPropertyForModal?.location || "Mumbai West"}) - Budget: ₹ ${formatRupee(selectedPropertyForModal?.price)}`
          : `User clicked Contact Owner for: ${selectedPropertyForModal?.title || "Property"} (${selectedPropertyForModal?.location || "Mumbai West"}) - Budget: ₹ ${formatRupee(selectedPropertyForModal?.price)}`
      };

      const res = await fetch(`${apiUrl}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setModalSubmittedSuccess(true);
      } else {
        setModalSubmittedSuccess(true); // Still allow user to view contact
      }
    } catch (err) {
      console.error("Enquiry submit error:", err);
      setModalSubmittedSuccess(true);
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  const filtered = properties.filter((p) => {
    const price = Number(p.price || 0);
    if (!Number.isNaN(price) && (appliedMin !== 500000 || appliedMax !== 150000000)) {
      if (appliedMin && price < appliedMin) return false;
      if (appliedMax && price > appliedMax) return false;
    }

    if (city && city.trim() && p.city && !p.city.toLowerCase().includes(city.toLowerCase()) && !p.location?.toLowerCase().includes(city.toLowerCase())) return false;

    if (selectedLocalities.length > 0) {
      const matchLoc = selectedLocalities.some(loc => 
        (p.location && p.location.toLowerCase().includes(loc.toLowerCase())) ||
        (p.address && p.address.toLowerCase().includes(loc.toLowerCase())) ||
        (p.title && p.title.toLowerCase().includes(loc.toLowerCase()))
      );
      if (!matchLoc) return false;
    }

    if (selectedPropertyTypes.length > 0) {
      const propType = (p.propertyType || p.type || "").toLowerCase();
      const hasMatchingType = selectedPropertyTypes.some(type => {
        const t = type.toLowerCase();
        if (t === "flat" || t.includes("apartment")) return propType.includes("flat") || propType.includes("apartment");
        if (t === "penthouse") return propType.includes("penthouse") || p.title?.toLowerCase().includes("penthouse");
        if (t.includes("villa") || t.includes("house")) return propType.includes("villa") || propType.includes("house");
        if (t.includes("plot") || t.includes("land")) return propType.includes("plot") || propType.includes("land");
        if (t.includes("office")) return propType.includes("office");
        if (t.includes("shop")) return propType.includes("shop") || propType.includes("showroom");
        if (t.includes("commercial")) return propType.includes("commercial") || propType.includes("office");
        return propType.includes(t);
      });
      if (!hasMatchingType) return false;
    }

    if (selectedBHK.length > 0) {
      const hasMatchingBHK = selectedBHK.some(bhk => {
        if (bhk === "Plots / Land") return p.propertyType?.toLowerCase().includes("plot") || p.propertyType?.toLowerCase().includes("land");
        const bhkNumber = bhk.replace(/[^0-9]/g, '');
        if (p.bedrooms && p.bedrooms.toString() === bhkNumber) return true;
        return p.title?.toLowerCase().includes(bhk.toLowerCase()) ||
          p.type?.toLowerCase().includes(bhk.toLowerCase()) ||
          p.title?.includes(bhkNumber + "bhk") ||
          p.title?.includes(bhkNumber + " bhk");
      });
      if (!hasMatchingBHK) return false;
    }

    if (selectedPostedBy.length > 0) {
      const hasMatchingPostedBy = selectedPostedBy.some(postedBy => {
        const pbType = (p.postedByType || p.postedBy?.role || p.owner || "").toLowerCase();
        return pbType.includes(postedBy.toLowerCase());
      });
      if (!hasMatchingPostedBy) return false;
    }

    return true;
  });

  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/2748/2748558.png";

  // Filter component with dynamic titles & active indicators
  const FilterSection = () => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-6" ref={dropdownRef}>
      <div className="flex flex-wrap items-center gap-3">
        {/* Transaction Type */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "buy" ? null : "buy"))}
            className="flex items-center gap-2 rounded-full px-4 py-2 border bg-blue-50 text-blue-700 font-semibold shadow-sm transition-all"
            style={{ borderColor: THEME_BLUE }}
          >
            {transactionType}
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "buy" && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border p-4 z-20">
              <div className="text-sm font-semibold mb-2 text-gray-700">Transaction Type</div>
              <div className="flex gap-2">
                <button onClick={() => { setTransactionType("Buy"); setOpenDropdown(null); }} className="flex-1 px-3 py-1.5 rounded-full border text-sm font-medium bg-blue-500 text-white shadow-sm">
                  Buy
                </button>
                <button onClick={() => { setTransactionType("Rent"); navigate("/rentproperties"); }} className="flex-1 px-3 py-1.5 rounded-full border text-sm text-gray-700 hover:bg-gray-100">
                  Rent
                </button>
              </div>
            </div>
          )}
        </div>

        {/* City */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "city" ? null : "city"))}
            className={`flex items-center gap-2 rounded-full px-4 py-2 border font-medium transition-all ${
              city ? "bg-blue-50 text-blue-700 border-blue-500 font-semibold" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>{city || "All Cities"}</span>
            <span className="text-xs">▾</span>
          </button>
          {openDropdown === "city" && (
            <div className="absolute left-0 mt-3 w-80 bg-white rounded-xl shadow-xl border p-5 z-20">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-sm text-gray-800">Select City</h4>
                {city && <button onClick={() => setCity("")} className="text-xs text-red-500 font-medium">Reset</button>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setCity(""); setOpenDropdown(null); }}
                  className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    !city ? "bg-blue-500 text-white border-blue-500" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  All Cities
                </button>
                {sampleCities.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setOpenDropdown(null); }}
                    className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      c === city ? "bg-blue-500 text-white border-blue-500" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Localities */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "localities" ? null : "localities"))}
            className={`flex items-center gap-2 rounded-full px-4 py-2 border font-medium transition-all ${
              selectedLocalities.length > 0 ? "bg-blue-50 text-blue-700 border-blue-500 font-semibold" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>
              {selectedLocalities.length === 0
                ? "Top Localities"
                : selectedLocalities.length === 1
                ? selectedLocalities[0]
                : `${selectedLocalities[0]} +${selectedLocalities.length - 1}`}
            </span>
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "localities" && (
            <div className="absolute left-0 mt-3 w-[460px] bg-white rounded-xl shadow-xl border p-5 z-20">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-900 text-sm">Mumbai West & Ayodhya Localities</h4>
                {selectedLocalities.length > 0 && (
                  <button onClick={() => setSelectedLocalities([])} className="text-xs text-red-500 font-medium">Clear</button>
                )}
              </div>
              <div className="flex gap-2 flex-wrap max-h-60 overflow-y-auto pr-1">
                {sampleTopLocalities.map((l) => {
                  const isSelected = selectedLocalities.includes(l);
                  return (
                    <button
                      key={l}
                      onClick={() => toggleLocality(l)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "} {l}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t flex justify-end">
                <button onClick={() => setOpenDropdown(null)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Budget */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "budget" ? null : "budget"))}
            className={`flex items-center gap-2 rounded-full px-4 py-2 border font-medium transition-all ${
              (appliedMin !== 500000 || appliedMax !== 150000000)
                ? "bg-blue-50 text-blue-700 border-blue-500 font-semibold"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>
              {(appliedMin !== 500000 || appliedMax !== 150000000)
                ? `₹${formatRupeeShort(appliedMin)} - ₹${formatRupeeShort(appliedMax)}`
                : "Budget"}
            </span>
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "budget" && (
            <div className="absolute left-0 mt-3 w-[440px] bg-white rounded-xl shadow-xl border p-5 z-20">
              <h4 className="font-bold text-gray-900 text-sm mb-3">Filter by Budget (₹)</h4>
              
              {/* Quick Presets */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button onClick={() => setBudgetPreset(500000, 10000000)} className="px-2 py-1.5 border rounded-lg text-xs font-medium hover:bg-blue-50 text-gray-700">
                  &lt; ₹1 Cr
                </button>
                <button onClick={() => setBudgetPreset(10000000, 25000000)} className="px-2 py-1.5 border rounded-lg text-xs font-medium hover:bg-blue-50 text-gray-700">
                  ₹1 Cr - ₹2.5 Cr
                </button>
                <button onClick={() => setBudgetPreset(25000000, 50000000)} className="px-2 py-1.5 border rounded-lg text-xs font-medium hover:bg-blue-50 text-gray-700">
                  ₹2.5 Cr - ₹5 Cr
                </button>
                <button onClick={() => setBudgetPreset(50000000, 150000000)} className="px-2 py-1.5 border rounded-lg text-xs font-medium hover:bg-blue-50 text-gray-700">
                  ₹5 Cr+
                </button>
                <button onClick={() => setBudgetPreset(500000, 150000000)} className="col-span-2 px-2 py-1.5 border rounded-lg text-xs font-medium bg-gray-50 text-gray-700">
                  All Budgets
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mb-2 font-medium">
                <div>Min: <strong className="text-blue-600 font-bold">₹{formatRupeeShort(sliderMin)}</strong></div>
                <div>Max: <strong className="text-blue-600 font-bold">₹{formatRupeeShort(sliderMax)}</strong></div>
              </div>

              <div className="space-y-2 mb-4">
                <input
                  type="range"
                  min={500000}
                  max={150000000}
                  step={500000}
                  value={sliderMin}
                  onChange={(e) => setSliderMin(Math.min(Number(e.target.value), sliderMax - 500000))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="range"
                  min={500000}
                  max={150000000}
                  step={500000}
                  value={sliderMax}
                  onChange={(e) => setSliderMax(Math.max(Number(e.target.value), sliderMin + 500000))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <button
                  onClick={() => { setSliderMin(500000); setSliderMax(150000000); setAppliedMin(500000); setAppliedMax(150000000); setOpenDropdown(null); }}
                  className="text-xs text-red-500 font-semibold"
                >
                  Reset
                </button>
                <button onClick={applyBudget} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                  Apply Budget
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Property Type */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "type" ? null : "type"))}
            className={`flex items-center gap-2 rounded-full px-4 py-2 border font-medium transition-all ${
              selectedPropertyTypes.length > 0 ? "bg-blue-50 text-blue-700 border-blue-500 font-semibold" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>
              {selectedPropertyTypes.length === 0
                ? "Property Type"
                : selectedPropertyTypes.length === 1
                ? selectedPropertyTypes[0]
                : `${selectedPropertyTypes[0]} +${selectedPropertyTypes.length - 1}`}
            </span>
            {selectedPropertyTypes.length > 0 ? (
              <span
                onClick={(e) => { e.stopPropagation(); setSelectedPropertyTypes([]); }}
                className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full hover:bg-blue-300 ml-1"
              >
                ✕
              </span>
            ) : (
              <span className="text-sm">▾</span>
            )}
          </button>
          {openDropdown === "type" && (
            <div className="absolute left-0 mt-3 w-[460px] bg-white rounded-xl shadow-xl border p-5 z-20">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-900 text-sm">Residential</h4>
                {selectedPropertyTypes.length > 0 && (
                  <button onClick={() => setSelectedPropertyTypes([])} className="text-xs text-red-500 font-medium">Clear</button>
                )}
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {["Flat", "Penthouse", "House/Villa", "Plot/Land"].map((t) => {
                  const isSelected = selectedPropertyTypes.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => togglePropertyType(t)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "} {t}
                    </button>
                  );
                })}
              </div>

              <h4 className="font-bold text-gray-900 text-sm mb-3">Commercial</h4>
              <div className="flex gap-2 flex-wrap mb-4">
                {["Office Space", "Shop/Showroom", "Commercial Land"].map((t) => {
                  const isSelected = selectedPropertyTypes.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => togglePropertyType(t)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "} {t}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t flex justify-end">
                <button onClick={() => setOpenDropdown(null)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* BHK */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "bhk" ? null : "bhk"))}
            className={`flex items-center gap-2 rounded-full px-4 py-2 border font-medium transition-all ${
              selectedBHK.length > 0 ? "bg-blue-50 text-blue-700 border-blue-500 font-semibold" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>
              {selectedBHK.length === 0
                ? "BHK"
                : selectedBHK.length === 1
                ? selectedBHK[0]
                : `${selectedBHK[0]} +${selectedBHK.length - 1}`}
            </span>
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "bhk" && (
            <div className="absolute left-0 mt-3 w-80 bg-white rounded-xl shadow-xl border p-5 z-20">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-900 text-sm">Bedrooms (BHK)</h4>
                {selectedBHK.length > 0 && <button onClick={() => setSelectedBHK([])} className="text-xs text-red-500 font-medium">Clear</button>}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {bhkOptions.map((b) => {
                  const isSelected = selectedBHK.includes(b);
                  return (
                    <button
                      key={b}
                      onClick={() => toggleBHK(b)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium text-center transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t flex justify-end">
                <button onClick={() => setOpenDropdown(null)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Posted By */}
        <div className="relative" data-filter-button>
          <button
            onClick={() => setOpenDropdown((o) => (o === "postedBy" ? null : "postedBy"))}
            className={`flex items-center gap-2 rounded-full px-4 py-2 border font-medium transition-all ${
              selectedPostedBy.length > 0 ? "bg-blue-50 text-blue-700 border-blue-500 font-semibold" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>
              {selectedPostedBy.length === 0
                ? "Posted By"
                : selectedPostedBy.length === 1
                ? selectedPostedBy[0]
                : `${selectedPostedBy[0]} +${selectedPostedBy.length - 1}`}
            </span>
            <span className="text-sm">▾</span>
          </button>
          {openDropdown === "postedBy" && (
            <div className="absolute left-0 mt-3 w-72 bg-white rounded-xl shadow-xl border p-5 z-20">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-900 text-sm">Listed By</h4>
                {selectedPostedBy.length > 0 && <button onClick={() => setSelectedPostedBy([])} className="text-xs text-red-500 font-medium">Clear</button>}
              </div>
              <div className="flex flex-col gap-2">
                {postedByOptions.map((p) => {
                  const isSelected = selectedPostedBy.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => togglePostedBy(p)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium text-left transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {isSelected ? "✓ " : ""} {p}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t flex justify-end">
                <button onClick={() => setOpenDropdown(null)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        <div className="relative ml-auto">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-full px-4 py-2 border border-gray-300 bg-white text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-200 cursor-pointer shadow-sm text-sm"
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
                          <button onClick={(e) => { e.stopPropagation(); openModal("contact", property); }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-full w-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm cursor-pointer font-bold">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                            </svg>
                            Enquiry
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); openModal("getPhone", property); }} className="border-2 border-[#1E88E5] text-[#1E88E5] hover:bg-blue-50 px-4 py-2 rounded-full w-full text-sm font-semibold transition-all cursor-pointer">
                            Get Phone No.
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact / Lead Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/60" onClick={closeModal} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold">
                      {modalFor === "getPhone" ? "Get Contact Details" : "Property Enquiry"}
                    </h3>
                  </div>
                  <button onClick={closeModal} className="text-white/80 hover:text-white text-xl">✕</button>
                </div>
                {selectedPropertyForModal && (
                  <div className="bg-black/20 rounded-xl p-2.5 mt-2 text-xs">
                    <p className="font-semibold truncate">🏢 {selectedPropertyForModal.title}</p>
                    <p className="text-blue-200 truncate">📍 {selectedPropertyForModal.location} • ₹ {formatRupee(selectedPropertyForModal.price)}</p>
                  </div>
                )}
              </div>

              {/* Body: Form or Success Card */}
              {modalSubmittedSuccess ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Enquiry Submitted Successfully!</h4>
                    <p className="text-xs text-gray-500 mt-1">Our representative & property desk have received your enquiry.</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
                    <div className="text-xs text-gray-500 font-medium">Direct Contact & WhatsApp:</div>
                    <div className="text-base font-bold text-gray-900 flex items-center justify-between">
                      <span>📞 {selectedPropertyForModal?.contactPhone || "+91 73853 27808"}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedPropertyForModal?.contactPhone || "+91 73853 27808");
                          alert("Phone copied to clipboard!");
                        }}
                        className="text-xs text-blue-600 hover:underline font-semibold"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="text-xs text-gray-600">
                      📧 {selectedPropertyForModal?.contactEmail || "sales@edgeexpert.com"}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={`tel:${(selectedPropertyForModal?.contactPhone || "+91 73853 27808").replace(/\s+/g, '')}`}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/917385327808?text=${encodeURIComponent(`Hello, I am interested in ${selectedPropertyForModal?.title || 'this property'}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                    >
                      WhatsApp
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-bold transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitModal} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      required
                      value={modalForm.name}
                      onChange={(e) => setModalForm((s) => ({ ...s, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={modalForm.email}
                      onChange={(e) => setModalForm((s) => ({ ...s, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                      placeholder="e.g. rahul@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Contact Number *</label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700">+91</span>
                      <input
                        required
                        type="tel"
                        value={modalForm.phone}
                        onChange={(e) => setModalForm((s) => ({ ...s, phone: e.target.value }))}
                        className="flex-1 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                        placeholder="10-digit Mobile Number"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" required defaultChecked className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="text-xs text-gray-600">
                      I agree to receive property updates & verify contact details on WhatsApp/Phone.
                    </label>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingEnquiry}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submittingEnquiry ? "Submitting..." : (modalFor === "getPhone" ? "Get Phone Number" : "Submit Enquiry")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Properties;