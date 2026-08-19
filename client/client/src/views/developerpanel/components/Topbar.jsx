import React, { useEffect, useState } from "react";
import { Menu, LogOut } from "lucide-react";

export default function Topbar({ onMobileMenu, onLogout }) {
  const [developer, setDeveloper] = useState({ name: "Developer", email: "" });

  // Load developer info from localStorage when component mounts
  useEffect(() => {
    const storedDeveloper = localStorage.getItem("developer");
    if (storedDeveloper) {
      try {
        const parsedDeveloper = JSON.parse(storedDeveloper);
        setDeveloper({
          name: parsedDeveloper.name || "Developer",
          email: parsedDeveloper.email || "",
        });
      } catch (error) {
        console.error("❌ Error parsing developer data:", error);
        localStorage.removeItem("developer");
      }
    }
  }, []);

  return (
    <header className="md:pl-64 bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenu}
            className="md:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <Menu size={18} />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            Developer Dashboard
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-800">
              {developer.name}
            </span>
            <span className="text-xs text-gray-500">{developer.email}</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
