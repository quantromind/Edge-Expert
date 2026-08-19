import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // for smooth animations
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Bookings from "./pages/Bookings";
import Leads from "./pages/Leads";
import Meetings from "./pages/Meetings";
import Payments from "./pages/Payments";
import Properties from "./pages/Properties";
import Notifications from "./pages/Notifications";
import API from "../../Api/axiosConfig";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function DeveloperDashboard() {
  const [active, setActive] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [developer, setDeveloper] = useState(null);

  const revenueData = [
    { name: "Mon", current: 4000, previous: 2400 },
    { name: "Tue", current: 3000, previous: 1398 },
    { name: "Wed", current: 5000, previous: 2400 },
    { name: "Thu", current: 4000, previous: 1800 },
    { name: "Fri", current: 4600, previous: 2200 },
    { name: "Sat", current: 3500, previous: 2000 },
    { name: "Sun", current: 5200, previous: 2800 },
  ];

  const visitorData = [
    { name: "Mar", visits: 1200, leads: 800, bookings: 500 },
    { name: "Apr", visits: 1350, leads: 900, bookings: 600 },
    { name: "May", visits: 1500, leads: 1100, bookings: 700 },
  ];

  useEffect(() => {
    const storedDev = localStorage.getItem("developer");
    if (storedDev) setDeveloper(JSON.parse(storedDev));
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [propRes, bookRes, payRes, meetRes] = await Promise.all([
        API.get("http://localhost:5000/api/developerpanel/developerproperties"),
        API.get("http://localhost:5000/api/developerpanel/developerbookings"),
        API.get("http://localhost:5000/api/developerpanel/developerpayments"),
        API.get("http://localhost:5000/api/developerpanel/developermeetings"),
      ]);

      const totalProperties = Array.isArray(propRes.data?.data)
        ? propRes.data.data.length
        : 0;
      const totalBookings = Array.isArray(bookRes.data?.data)
        ? bookRes.data.data.length
        : 0;
      const totalRevenue = Array.isArray(payRes.data?.data)
        ? payRes.data.data.reduce((sum, p) => sum + (p.amount || 0), 0)
        : 0;
      const activeLeads = Array.isArray(meetRes.data?.data)
        ? meetRes.data.data.filter((m) => m.status === "Scheduled").length
        : 0;

      setDashboardData({
        totalProperties,
        totalBookings,
        totalRevenue,
        activeLeads,
      });
    } catch (err) {
      console.error("❌ Dashboard fetch error:", err);
      setError("Failed to fetch dashboard data. Please check API connections.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("developer");
    window.location.href = "/login";
  };

  const renderDashboard = () => {
    if (loading)
      return (
        <p className="text-gray-500 text-center mt-6 animate-pulse">
          Loading dashboard...
        </p>
      );
    if (error)
      return (
        <p className="text-red-500 text-center mt-6 font-semibold">{error}</p>
      );

    return (
      <div className="p-6 space-y-6 bg-gradient-to-b from-green-50 via-white to-white min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Developer Dashboard
        </h1>

        {/* === Stat Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SoftStatCard
            title="Total Properties"
            value={dashboardData.totalProperties}
            icon="🏢"
            color="from-pink-100 to-pink-200"
            trend="+5%"
          />
          <SoftStatCard
            title="Total Bookings"
            value={dashboardData.totalBookings}
            icon="📘"
            color="from-orange-100 to-orange-200"
            trend="+8%"
          />
          <SoftStatCard
            title="Total Revenue"
            value={`₹${dashboardData.totalRevenue.toLocaleString()}`}
            icon="💰"
            color="from-green-100 to-green-200"
            trend="+12%"
          />
          <SoftStatCard
            title="Active Leads"
            value={dashboardData.activeLeads}
            icon="📞"
            color="from-purple-100 to-purple-200"
            trend="+3%"
          />
        </div>

        {/* === Charts Section === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white backdrop-blur-sm bg-opacity-60 rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Total Revenue
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none" }}
                />
                <Bar
                  dataKey="current"
                  fill="url(#currentGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="previous"
                  fill="url(#previousGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="currentGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient
                    id="previousGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Visitor Chart */}
          <div className="bg-white backdrop-blur-sm bg-opacity-60 rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Visitor Insights
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="url(#visitsGradient)"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="url(#leadsGradient)"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="url(#bookingsGradient)"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
                <defs>
                  <linearGradient id="visitsGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="leadsGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="bookingsGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    switch (active) {
      case "dashboard":
        return renderDashboard();
      case "bookings":
        return <Bookings />;
      case "leads":
        return <Leads />;
      case "meetings":
        return <Meetings />;
      case "payments":
        return <Payments />;
      case "properties":
        return <Properties />;
      case "notifications":
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-100 to-white">
      <Sidebar
        active={active}
        setActive={setActive}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <Topbar
          onMobileMenu={() => setIsMobileSidebarOpen(true)}
          onLogout={handleLogout}
          developer={developer}
        />
        <main className="flex-1 overflow-y-auto">{renderMain()}</main>
      </div>
    </div>
  );
};

/* === Soft UI Stat Card with Stable Icon Animation === */
const SoftStatCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    whileHover={{ scale: 1.05 }} // card scales independently
    className={`relative p-5 rounded-2xl shadow-lg bg-gradient-to-br ${color} cursor-pointer`}
  >
    <div className="flex flex-col items-center justify-center text-center space-y-3">
      {/* Icon stays stable even when card hovers */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white/30 p-4 rounded-full flex items-center justify-center shadow-md"
      >
        <span className="text-4xl">{icon}</span>
      </motion.div>

      <p className="text-sm text-gray-700 font-medium">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>

      {trend && (
        <motion.p
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-green-600 text-sm font-medium"
        >
          {trend} since last week
        </motion.p>
      )}
    </div>
  </motion.div>
);
