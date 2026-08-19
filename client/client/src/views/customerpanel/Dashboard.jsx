import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Home,
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Eye,
  Users,
  FileText,
  Building,
  Heart,
  Clock,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API from "../../Api/axiosConfig";

// Custom Components with Professional Styling
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
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
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
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
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// Metric Card Component
const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = "",
}) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <div
              className={`flex items-center mt-2 text-xs ${
                trend.value > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.value > 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}% {trend.period}
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Dashboard Component
const PropertyDashboard = ({ userData, dashboardData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount) => {
    if (!amount) return "₹ 0";
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lac`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Fallback data if dashboardData is not available
  const data = dashboardData || {
    customer: userData,
    stats: {
      savedProperties: 0,
      upcomingViewings: 0,
      pendingApplications: 0,
    },
    recentProperties: [],
    upcomingViewings: [],
    portfolioMetrics: {
      portfolioValue: 0,
      monthlyChange: 0,
      totalProperties: 0,
      activeListings: 0,
      savedProperties: 0,
      viewsThisMonth: 0,
    },
    portfolioData: [],
    propertyTypeData: [],
    recentActivities: [],
  };

  const handleSaveProperty = async (propertyId) => {
    try {
      await API.post(`/customer/save-property/${propertyId}`);
      alert("Property saved to favorites!");
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Error saving property. Please try again.");
    }
  };

  const handleContactBroker = async (propertyId, brokerId) => {
    try {
      await API.post("/customer/contact-broker", {
        propertyId,
        brokerId,
        message: "I'm interested in this property. Please contact me.",
      });
      alert("Broker contacted successfully!");
    } catch (error) {
      console.error("Error contacting broker:", error);
      alert("Error contacting broker. Please try again.");
    }
  };

  // Sample chart data
  const portfolioData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 60 },
    { month: "May", value: 75 },
    { month: "Jun", value: 80 },
  ];

  const propertyTypeData = [
    { name: "Residential", value: 45 },
    { name: "Commercial", value: 30 },
    { name: "Industrial", value: 15 },
    { name: "Land", value: 10 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good morning, {data.customer?.name?.split(" ")[0] || "Customer"}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your property portfolio overview
            </p>
          </div>

          {/* ✅ Modern Search Bar */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-3 w-full sm:w-auto">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 hover:shadow-md">
                <Search className="h-4 w-4 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search for properties, locations, or brokers..."
                  className="flex-1 bg-transparent border-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none px-3 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mr-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 sm:mt-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Portfolio Value"
          value={formatCurrency(data.portfolioMetrics?.portfolioValue)}
          description="Total property valuation"
          icon={DollarSign}
          trend={{
            value: data.portfolioMetrics?.monthlyChange || 0,
            period: "this month",
          }}
        />
        <MetricCard
          title="Saved Properties"
          value={data.stats.savedProperties}
          description="Properties in favorites"
          icon={Heart}
        />
        <MetricCard
          title="Upcoming Viewings"
          value={data.stats.upcomingViewings}
          description="Scheduled property visits"
          icon={Calendar}
        />
        <MetricCard
          title="Applications"
          value={data.stats.pendingApplications}
          description="Pending rental applications"
          icon={FileText}
        />
      </div>

      {/* Portfolio Growth & Property Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Growth</CardTitle>
            <CardDescription>Monthly valuation trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recommended Properties</CardTitle>
                <CardDescription>Based on your preferences</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View all
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentProperties?.slice(0, 4).map((property) => (
                <div
                  key={property._id}
                  className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <img
                    src={
                      property.images?.[0] ||
                      "https://placehold.co/400x300/E5E7EB/4B5563?text=No+Image"
                    }
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 truncate">
                      {property.title}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{property.location}</span>
                    </p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      {formatCurrency(property.price)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveProperty(property._id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleContactBroker(
                          property._id,
                          property.createdBy?._id
                        )
                      }
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
              {(!data.recentProperties ||
                data.recentProperties.length === 0) && (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No properties available</p>
                  <Button className="mt-3">Browse Properties</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Viewings & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Viewings</CardTitle>
                  <CardDescription>Your scheduled visits</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.upcomingViewings?.slice(0, 3).map((viewing) => (
                  <div
                    key={viewing._id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {viewing.property?.title}
                      </h4>
                      <Badge variant="success">Confirmed</Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(viewing.scheduledDate).toLocaleDateString()} at{" "}
                      {viewing.time}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {viewing.notes}
                    </p>
                    {viewing.broker && (
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        {viewing.broker.name}
                      </div>
                    )}
                  </div>
                ))}
                {(!data.upcomingViewings ||
                  data.upcomingViewings.length === 0) && (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      No upcoming viewings
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your property journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex-col h-16">
                  <Home className="h-5 w-5 mb-1" />
                  <span className="text-xs">Browse Properties</span>
                </Button>
                <Button variant="outline" className="flex-col h-16">
                  <Heart className="h-5 w-5 mb-1" />
                  <span className="text-xs">Saved Properties</span>
                </Button>
                <Button variant="outline" className="flex-col h-16">
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs">Contact Broker</span>
                </Button>
                <Button variant="outline" className="flex-col h-16">
                  <BarChart3 className="h-5 w-5 mb-1" />
                  <span className="text-xs">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDashboard;
