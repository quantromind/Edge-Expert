import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";
import Properties from "./Properties";
import HomePage from "./Home";
import Saved from "./Saved";
import Account from "./Account";
import Support from "./Support";
import { Menu } from "lucide-react";
import { getUserInfo } from "../../Api/authService";
import API from ".././../Api/axiosConfig";

export default function CustomerDashboard() {
  const [active, setActive] = useState("HomePage");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Customer",
    email: "customer@example.com",
  });
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
    if (active === "HomePage") {
      fetchDashboardData();
    }
  }, [active]);

  const fetchUserData = async () => {
    try {
      const userInfo = getUserInfo();
      if (userInfo.user) {
        setUserData(userInfo.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await API.get("/customer/dashboard");
      setDashboardData(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading && active === "HomePage") {
      return (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-3 text-gray-600 text-sm">Loading dashboard...</p>
          </div>
        </div>
      );
    }

    switch (active) {
      case "HomePage":
        return <HomePage userData={userData} dashboardData={dashboardData}/>;
      case "dashboard":
        return <Dashboard userData={userData} dashboardData={dashboardData} />;
      case "portfolio":
        return <Portfolio userData={userData} />;
      case "properties":
        return <Properties userData={userData} />;
      case "saved":
        return <Saved userData={userData} />;
      case "account":
        return <Account userData={userData} />;
      case "support":
        return <Support />;
      default:
        return <Dashboard userData={userData} dashboardData={dashboardData} />;
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        active={active}
        setActive={setActive}
        user={userData}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="ml-0 md:ml-64 transition-all duration-300 min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <img
                  src="/favicon.ico"
                  alt="Edge Expert Logo"
                  className="w-4 h-4 object-contain"
                />
              </div>
              <div>
                <h1 className="text-base font-semibold text-gray-900">
                  Edge Expert
                </h1>
                <p className="text-xs text-gray-600">
                  Welcome, {userData.name?.split(" ")[0] || "Customer"}
                </p>
              </div>
            </div>
            <button
              className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors border border-gray-300"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
