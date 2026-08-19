import React, { useState, useRef } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Building,
  Bookmark,
  User,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function Sidebar({ active, setActive, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const hoverTimeout = useRef(null);

  const isMobile = () => window.innerWidth < 768;

  const menus = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "properties", label: "Properties", icon: Building },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "account", label: "Account", icon: User },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setOpen(false), 300);
  };

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <img
                src="/favicon.ico"
                alt="logo"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="font-semibold text-lg">Edge Expert</span>
          </div>

          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP FLOAT BUTTON ================= */}
      <div
        className="hidden md:block fixed top-4 left-4 z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <img
              src="/favicon.ico"
              alt="logo"
              className="w-5 h-5 object-contain"
            />
          </div>

          <div>
            <h1 className="text-sm font-semibold">Edge Expert</h1>
            <p className="text-xs text-gray-500">Customer Portal</p>
          </div>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && isMobile() && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MENU PANEL (FIXED POSITION) ================= */}
      {open && (
        <div
          className="fixed top-0 md:top-20 left-0 md:left-4 z-50 w-full md:w-[360px]"
          onMouseEnter={!isMobile() ? handleMouseEnter : undefined}
          onMouseLeave={!isMobile() ? handleMouseLeave : undefined}
        >
          <div className="bg-sky-100 border border-sky-200 shadow-xl rounded-none md:rounded-lg p-4 h-screen md:h-auto">
            {isMobile() && (
              <div className="flex justify-end mb-3">
                <button onClick={() => setOpen(false)}>
                  <X size={22} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {menus.map((menu) => {
                const Icon = menu.icon;
                return (
                  <button
                    key={menu.id}
                    onClick={() => {
                      setActive(menu.id);
                      if (isMobile()) setOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm
                      ${
                        active === menu.id
                          ? "bg-sky-400 text-sky-900"
                          : "text-sky-800 hover:bg-sky-300"
                      }`}
                  >
                    <Icon size={16} />
                    <span>{menu.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-sky-200 mt-4 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-700 text-sm">
                <Mail size={14} />
                <span className="truncate max-w-[160px]">
                  {user?.email || "user@email.com"}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-sm text-red-600"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
