import React from "react";
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  Building,
  Bell,
  Clipboard,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  active,
  setActive,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "bookings", label: "Bookings", icon: <Clipboard size={18} /> },
    { id: "leads", label: "Leads", icon: <Users size={18} /> },
    { id: "meetings", label: "Meetings", icon: <Calendar size={18} /> },
    { id: "payments", label: "Payments", icon: <DollarSign size={18} /> },
    { id: "properties", label: "Properties", icon: <Building size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  ];

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("developer");
    window.location.href = "/login";
  };

  return (
    <>
      {/* ---------- DESKTOP SIDEBAR ---------- */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-white border-r border-gray-100 z-20 p-4">
        <div className="text-indigo-600 font-semibold text-lg mb-6">
          Developer Panel
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => setActive(it.id)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active === it.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {it.icon}
              </span>
              <span>{it.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 pt-4 mt-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ---------- MOBILE SIDEBAR ---------- */}
      <div
        className={`fixed inset-0 z-30 md:hidden ${
          isMobileSidebarOpen ? "block" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity ${
            isMobileSidebarOpen ? "opacity-40" : "opacity-0"
          }`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white p-4 transform transition-transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="text-indigo-600 font-semibold text-lg mb-6">
            Developer Panel
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => {
                  setActive(it.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  active === it.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
              >
                {it.icon}
                <span>{it.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-gray-200 pt-4 mt-2">
            <button
              onClick={() => {
                handleLogout();
                setIsMobileSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
