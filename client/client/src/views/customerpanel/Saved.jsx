import React, { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Heart,
  Eye,
  MessageSquare,
  Trash2,
  Loader,
  Search,
  Building,
  Home,
  Calendar,
  Plus,
  X,
  CheckCircle,
} from "lucide-react";
import API from "../../Api/axiosConfig";

// ==========================
// Reusable Components
// ==========================
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-[1.02] ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const variants = {
    default:
      "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-blue-600",
  };

  const sizes = {
    default: "px-5 py-3 text-sm",
    sm: "px-4 py-2.5 text-xs",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-700",
    secondary: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// ==========================
// Toast Notification
// ==========================
const Toast = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-green-100 border border-green-300 text-green-800 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideIn z-50">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-gray-500 hover:text-gray-700">
        ✕
      </button>
    </div>
  );
};

// ==========================
// Property Details Modal
// ==========================
const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={
            property.images?.[0] ||
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop"
          }
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {property.title}
          </h2>
          <p className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            {property.location}
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {property.description || "No detailed description available."}
          </p>

          <div className="grid grid-cols-3 gap-6 mb-5 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {property.bedrooms || "-"}
              </p>
              <p className="text-xs text-gray-600">Bedrooms</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {property.bathrooms || "-"}
              </p>
              <p className="text-xs text-gray-600">Bathrooms</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {property.area || "-"}
              </p>
              <p className="text-xs text-gray-600">Area (sqft)</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(property.price)}
            </p>
            <Badge>{property.propertyType || "Residential"}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================
// Metric Cards Section (Interactive)
// ==========================
const MetricCardsSection = ({ savedProperties, activeMetric, onMetricClick }) => {
  const now = new Date();
  const metrics = [
    {
      id: "All",
      title: "Total Saved",
      value: savedProperties.length,
      desc: "Properties in your list",
      icon: <Heart className="text-pink-500 w-6 h-6" />,
      bg: "from-pink-100 to-pink-50",
    },
    {
      id: "Residential",
      title: "Residential",
      value: savedProperties.filter((p) => p.propertyType === "Residential").length,
      desc: "Homes & Apartments",
      icon: <Home className="text-orange-500 w-6 h-6" />,
      bg: "from-orange-100 to-orange-50",
    },
    {
      id: "Commercial",
      title: "Commercial",
      value: savedProperties.filter((p) => p.propertyType === "Commercial").length,
      desc: "Office Spaces",
      icon: <Building className="text-green-500 w-6 h-6" />,
      bg: "from-green-100 to-green-50",
    },
    {
      id: "Recently Added",
      title: "Recently Added",
      value: savedProperties.filter(
        (p) => new Date(p.createdAt) > new Date(now - 7 * 24 * 60 * 60 * 1000)
      ).length,
      desc: "Last 7 days",
      icon: <Calendar className="text-purple-500 w-6 h-6" />,
      bg: "from-purple-100 to-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((m) => {
        const isActive = activeMetric === m.id;
        return (
          <div
            key={m.id}
            onClick={() => onMetricClick(m.id)}
            className={`rounded-2xl cursor-pointer transition-all duration-500 transform bg-gradient-to-br ${m.bg}
              hover:-translate-y-2 p-6 shadow-md
              ${isActive ? "ring-2 ring-blue-500 scale-[1.03] shadow-xl" : "hover:shadow-2xl"}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm">{m.icon}</div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">{m.title}</h3>
                  <p className="text-gray-900 font-bold text-2xl">{m.value}</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-gray-500 text-sm font-medium">{m.desc}</p>
          </div>
        );
      })}
    </div>
  );
};

// ==========================
// Utility Functions
// ==========================
const formatCurrency = (amount) => {
  if (!amount) return "₹0";
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==========================
// Main Component
// ==========================
export default function Saved() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeMetric, setActiveMetric] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const response = await API.get("/customer/saved-properties");
      setSavedProperties(response.data.data || []);
    } catch {
      setError("Failed to load saved properties");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      await API.delete(`/customer/save-property/${propertyId}`);
      setSavedProperties((prev) => prev.filter((p) => p._id !== propertyId));
      setToastMessage("Property removed from saved list!");
      setTimeout(() => setToastMessage(""), 4000);
    } catch {
      alert("Failed to remove property.");
    }
  };

  const handleMetricClick = (id) => {
    setActiveMetric(id);
    if (id === "Recently Added" || id === "All") {
      setFilterType("All");
    } else {
      setFilterType(id);
    }
  };

  const now = new Date();
  const filteredProperties = savedProperties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "All" || property.propertyType === filterType;
    const matchesRecent =
      activeMetric === "Recently Added"
        ? new Date(property.createdAt) > new Date(now - 7 * 24 * 60 * 60 * 1000)
        : true;
    return matchesSearch && matchesType && matchesRecent;
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <Card className="max-w-md w-full text-center p-8">
          <Heart className="h-10 w-10 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchSavedProperties}>Try Again</Button>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Saved Properties
      </h1>
      <p className="text-gray-600 mb-10">
        View and manage your favorite properties.
      </p>

      {/* Metric Cards */}
      <MetricCardsSection
        savedProperties={savedProperties}
        activeMetric={activeMetric}
        onMetricClick={handleMetricClick}
      />

      {/* Search + Filter */}
      <div className="mb-10 backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-4 items-center transition-all duration-500 hover:shadow-xl">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
          <input
            type="text"
            placeholder="Search your saved properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-base bg-white/60 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:ring-2 focus:ring-blue-500 bg-white/60"
        >
          <option value="All">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Plot">Plot</option>
        </select>

        <Button size="lg" className="shadow-md">
          <Plus className="h-5 w-5 mr-2" /> Browse Properties
        </Button>
      </div>

      {/* Property Cards */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.map((property) => (
            <Card
              key={property._id}
              className="overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative group">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />

                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 bg-white/80 backdrop-blur-md rounded-lg hover:bg-red-100"
                  >
                    <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                  </Button>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">
                    {property.propertyType || "Residential"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                  {property.bedrooms > 0 && (
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-xs text-gray-600">Beds</p>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-gray-600">Baths</p>
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.area || "-"}
                    </p>
                    <p className="text-xs text-gray-600">Area</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-5">
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(property.price)}
                  </p>
                  <div className="text-xs text-gray-500 text-right">
                    <p>Saved</p>
                    <p className="font-medium text-gray-700">
                      {formatDate(property.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <Eye className="h-4 w-4 mr-2" /> View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveProperty(property._id)}
                    className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-16 text-center">
          <Heart className="h-10 w-10 text-blue-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            No Saved Properties
          </h3>
          <p className="text-gray-600 mb-8">
            You haven’t saved any properties yet. Start browsing and click the
            heart icon to save your favorites.
          </p>
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" /> Browse Properties
          </Button>
        </Card>
      )}

      {/* Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-base">
        {savedProperties.length} properties in your saved list • Updated today
      </div>
    </div>
  );
}
