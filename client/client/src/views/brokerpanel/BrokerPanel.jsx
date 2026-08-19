import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import API from "../../Api/axiosConfig";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import Property from "./Property";
import Leads from "./Leads";
import Meetings from "./Meetings";

const BrokerPanel = () => {
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    API.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProfile(res.data))
      .catch(() => {
        sessionStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 overflow-hidden md:ml-64">
        <Topbar
          profile={profile}
          handleLogout={handleLogout}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="property" element={<Property />} />
            <Route path="leads" element={<Leads />} />
            <Route path="meetings" element={<Meetings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default BrokerPanel;
