import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Building2, Users, Calendar, LogOut, X } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  const menu = [
    { name: "Dashboard", path: "/brokerpanel", icon: <Home size={20} /> },
    { name: "Properties", path: "/brokerpanel/property", icon: <Building2 size={20} /> },
    { name: "Leads", path: "/brokerpanel/leads", icon: <Users size={20} /> },
    { name: "Meetings", path: "/brokerpanel/meetings", icon: <Calendar size={20} /> },
  ];

  return (
    <aside
      className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Broker Panel</h2>
        <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md font-semibold"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`
            }
          >
            <div className="bg-gray-200 rounded-full p-2">{item.icon}</div>
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center space-x-2 text-gray-600 hover:text-red-500 transition rounded-lg px-3 py-2 hover:bg-red-50"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
