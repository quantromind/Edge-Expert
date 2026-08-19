// client/src/views/customerpanel/Properties.jsx
import React, { useState, useEffect } from "react";
import API from "../../Api/axiosConfig";
import {
  MapPin,
  DollarSign,
  TrendingUp,
  Key,
  Building,
  Heart,
  Search,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Home,
  FileText,
  Layers,
  Calendar,
  Loader,
} from "lucide-react";

/* small UI primitives (kept similar to your original) */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 ease-in-out overflow-hidden ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }) => <div className={`p-5 pb-3 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = "" }) => <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>;
const CardContent = ({ children, className = "" }) => <div className={`p-5 pt-0 ${className}`}>{children}</div>;

const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border",
    outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };
  const sizes = { default: "px-4 py-2 text-sm", sm: "px-3 py-1.5 text-xs", lg: "px-6 py-3 text-base" };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-700",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>;
};

const MetricCard = ({ title, value, description, icon: Icon, className = "" }) => (
  <Card className={`transform hover:scale-[1.03] transition-all duration-300 ${className}`}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-100">✕</button>
    </div>
  );
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || amount === "") return "₹0";
  const n = Number(amount) || 0;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} Lac`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const placeholderImg = "https://images.unsplash.com/photo-1560184897-e20f8c6f46f2?w=1200&q=60&auto=format&fit=crop";

const PropertyCard = ({ property, onViewDetails, onSave, isSaved, saving }) => {
  const isOwned = property.postedBy === "Owner";
  const imgSrc = property.images?.[0] || property.image || placeholderImg;

  return (
    <Card className="overflow-hidden">
      <div className="relative" onClick={() => onViewDetails(property)}>
        <img src={imgSrc} alt={property.title} className="w-full h-44 object-cover" />
        <div className="absolute top-3 left-3">
          <Badge variant={isOwned ? "success" : "default"}>{isOwned ? "Owned" : "Available"}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => { e.stopPropagation(); onSave(property._id); }}
            className="p-1 rounded-full bg-white/70 hover:bg-white disabled:opacity-60"
            disabled={!!saving}
            aria-label={isSaved ? "Remove saved" : "Save property"}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-3">
            <h3 className="font-semibold text-gray-900 text-lg">{property.title}</h3>
            <p className="text-gray-600 text-sm flex items-center mt-1"><MapPin className="h-4 w-4 mr-1" /> {property.location}</p>
            <div className="mt-3 text-lg font-bold text-gray-900">{formatCurrency(property.price)}</div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button className="flex-1" size="sm" onClick={() => onViewDetails(property)}><Eye className="h-4 w-4 mr-2" /> View Details</Button>
          <Button variant="outline" size="sm" className="p-2"><MoreHorizontal className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SectionHeader = ({ title, subtitle, icon }) => (
  <div className="mb-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="bg-white/80 p-2 rounded-lg shadow-sm">{icon}</div>
      <div>
        <h3 className="text-2xl font-semibold  text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  </div>
);

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(true);

  const [commercial, setCommercial] = useState([]);
  const [sell, setSell] = useState([]);
  const [rent, setRent] = useState([]);
  const [loadingCommercial, setLoadingCommercial] = useState(true);
  const [loadingSell, setLoadingSell] = useState(true);
  const [loadingRent, setLoadingRent] = useState(true);

  // track per-item saving state
  const [savingMap, setSavingMap] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await API.get("/properties");
        setProperties(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setToast({ message: "Failed to load properties", type: "error" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    // fetch saved
    const fetchSaved = async () => {
      try {
        const res = await API.get("/customer/saved-properties");
        const ids = (res.data?.data || []).map((i) => i._id);
        setSavedIds(ids);
      } catch (err) {
        console.error("Error fetching saved properties:", err);
      }
    };
    fetchSaved();
  }, []);

  useEffect(() => {
    fetchCommercial();
    fetchSell();
    fetchRent();
    // eslint-disable-next-line
  }, []);

  const fetchCommercial = async () => {
    setLoadingCommercial(true);
    try {
      const res = await API.get("/commercialproperties");
      setCommercial(res.data?.data || res.data || []);
    } catch (err) {
      console.error("❌ Commercial Fetch Error:", err);
    } finally {
      setLoadingCommercial(false);
    }
  };

  const fetchSell = async () => {
    setLoadingSell(true);
    try {
      const res = await API.get("/sellproperty");
      setSell(res.data?.data || res.data || []);
    } catch (err) {
      console.error("❌ Sell Fetch Error:", err);
    } finally {
      setLoadingSell(false);
    }
  };

  const fetchRent = async () => {
    setLoadingRent(true);
    try {
      const res = await API.get("/rentproperties");
      setRent(res.data?.data || res.data || []);
    } catch (err) {
      console.error("❌ Rent Fetch Error:", err);
    } finally {
      setLoadingRent(false);
    }
  };

  // universal toggle using old endpoints (Option B)
  const toggleSave = async (propertyId) => {
    if (!propertyId) return;
    if (savingMap[propertyId]) return;

    setSavingMap((m) => ({ ...m, [propertyId]: true }));
    try {
      if (savedIds.includes(propertyId)) {
        // remove
        await API.delete(`/customer/save-property/${propertyId}`);
        setSavedIds((prev) => prev.filter((id) => id !== propertyId));
        setToast({ message: "Removed from saved", type: "success" });
      } else {
        // save
        await API.post(`/customer/save-property/${propertyId}`);
        setSavedIds((prev) => [...prev, propertyId]);
        setToast({ message: "Saved successfully", type: "success" });
      }
    } catch (err) {
      console.error("Error saving/removing property:", err);
      const msg = err?.response?.data?.message || "Something went wrong";
      setToast({ message: msg, type: "error" });
    } finally {
      setSavingMap((m) => {
        const copy = { ...m };
        delete copy[propertyId];
        return copy;
      });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setSelectedProperty(null); };

  const applyFilters = (list = []) => {
    return list
      .filter((property) => {
        const matchesStatus =
          filterStatus === "All" ||
          (filterStatus === "Owned" && property.postedBy === "Owner") ||
          (filterStatus === "Available" && property.postedBy !== "Owner");

        const matchesSearch =
          !searchTerm ||
          property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price") return Number(b.price || 0) - Number(a.price || 0);
        if (sortBy === "date") return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
        return 0;
      });
  };

  const filteredProperties = applyFilters(properties);
  const filteredCommercial = applyFilters(commercial);
  const filteredSell = applyFilters(sell);
  const filteredRent = applyFilters(rent);

  const ownedProperties = properties.filter((p) => p.postedBy === "Owner");
  const totalCurrentValue = ownedProperties.reduce((sum, p) => sum + Number(p.price || 0), 0);

  const anyLoading = loading || loadingCommercial || loadingSell || loadingRent;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Portfolio</h1>
          <p className="text-gray-600 mt-1">Manage and track your real estate investments</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search properties, locations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="All">All</option>
            <option value="Owned">Owned</option>
            <option value="Available">Available</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Portfolio Value" value={formatCurrency(totalCurrentValue)} description="Current market value" icon={DollarSign} />
        <MetricCard title="Total Properties" value={properties.length} description="Across all categories" icon={Building} />
        <MetricCard title="Net Gain" value="₹0" description="Since acquisition" icon={TrendingUp} />
        <MetricCard title="Owned Properties" value={ownedProperties.length} description="In your portfolio" icon={Key} />
      </div>

      <div className="space-y-12">
        {/* Properties */}
        <section>
          <SectionHeader title="Properties" subtitle="All listed properties" icon={<Home className="h-7 w-7 text-green-600" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anyLoading && loading ? (
              Array(6).fill().map((_, i) => <div key={i} className="h-56 rounded-xl bg-gray-200 animate-pulse" />)
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} onViewDetails={handleViewDetails} onSave={toggleSave} isSaved={savedIds.includes(property._id)} saving={!!savingMap[property._id]} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No properties found matching filters.</p>
            )}
          </div>
        </section>

        {/* Commercial */}
        <section>
          <SectionHeader title="Commercial Properties" subtitle="Office, shops and commercial listings" icon={<FileText className="h-7 w-7 text-blue-600" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingCommercial ? (
              Array(4).fill().map((_, i) => <div key={i} className="h-56 rounded-xl bg-gray-200 animate-pulse" />)
            ) : filteredCommercial.length > 0 ? (
              filteredCommercial.map((property) => (
                <PropertyCard key={property._id} property={property} onViewDetails={handleViewDetails} onSave={toggleSave} isSaved={savedIds.includes(property._id)} saving={!!savingMap[property._id]} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No commercial properties found.</p>
            )}
          </div>
        </section>

        {/* Sell */}
        <section>
          <SectionHeader title="Properties for Sale" subtitle="Listings available to purchase" icon={<Layers className="h-7 w-7 text-purple-600" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingSell ? (
              Array(4).fill().map((_, i) => <div key={i} className="h-56 rounded-xl bg-gray-200 animate-pulse" />)
            ) : filteredSell.length > 0 ? (
              filteredSell.map((property) => (
                <PropertyCard key={property._id} property={property} onViewDetails={handleViewDetails} onSave={toggleSave} isSaved={savedIds.includes(property._id)} saving={!!savingMap[property._id]} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No sale properties found.</p>
            )}
          </div>
        </section>

        {/* Rent */}
        <section>
          <SectionHeader title="Properties for Rent" subtitle="Short/long-term rental listings" icon={<Calendar className="h-7 w-7 text-red-600" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingRent ? (
              Array(4).fill().map((_, i) => <div key={i} className="h-56 rounded-xl bg-gray-200 animate-pulse" />)
            ) : filteredRent.length > 0 ? (
              filteredRent.map((property) => (
                <PropertyCard key={property._id} property={property} onViewDetails={handleViewDetails} onSave={toggleSave} isSaved={savedIds.includes(property._id)} saving={!!savingMap[property._id]} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No rental properties found.</p>
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedProperty.title}</CardTitle>
                  <CardDescription>{selectedProperty.location}</CardDescription>
                </div>
                <Button variant="ghost" onClick={closeModal} className="p-1">✕</Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <img src={selectedProperty.image || selectedProperty.images?.[0] || placeholderImg} alt={selectedProperty.title} className="w-full h-64 object-cover rounded-lg" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Property Type</label>
                    <p className="text-gray-900">{selectedProperty.propertyType || selectedProperty.type || "—"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Price</label>
                    <p className="text-gray-900 font-semibold">{formatCurrency(Number(selectedProperty.price))}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Posted By</label>
                    <p className="text-gray-900">{selectedProperty.postedBy || "—"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bedrooms / Baths</label>
                    <p className="text-gray-900">{selectedProperty.bedrooms || "-"} / {selectedProperty.bathrooms || "-"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Area</label>
                    <p className="text-gray-900">{selectedProperty.area || "-"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-gray-900">{selectedProperty.description || "No description provided."}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Contact Agent</Button>
                <Button variant="outline" className="flex-1">Schedule Visit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
    </div>
  );
}
