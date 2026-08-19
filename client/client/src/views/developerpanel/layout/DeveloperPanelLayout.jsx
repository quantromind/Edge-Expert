import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DeveloperPanelLayout({ children }) {
  const [active, setActive] = useState("Dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("developer");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        active={active}
        setActive={setActive}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        onLogout={handleLogout}
      />

      <Topbar onMobileMenu={toggleMobileMenu} onLogout={handleLogout} />

      <main className="p-4 md:ml-64 mt-16">{children}</main>
    </div>
  );
}
