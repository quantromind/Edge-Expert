import React from "react";
import { Bell, User, LogOut, Menu } from "lucide-react";

const Topbar = ({ profile, handleLogout, setSidebarOpen }) => (
  <header className="flex items-center justify-between bg-white shadow-md px-4 sm:px-6 py-3 sticky top-0 z-20 rounded-b-lg">
    <div className="flex items-center space-x-4">
      <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
        <Menu size={20} />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">Broker Dashboard</h1>
    </div>

    <div className="flex items-center space-x-4">
      <div className="relative">
        <Bell className="text-gray-600 cursor-pointer hover:text-teal-600" size={22} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">3</span>
      </div>

      {profile && (
        <div className="relative group">
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
            <User className="text-gray-600" size={22} />
            <span className="hidden sm:block text-gray-800 font-medium">{profile.name}</span>
          </div>
          <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center"
            >
              <LogOut className="inline w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  </header>
);

export default Topbar;
