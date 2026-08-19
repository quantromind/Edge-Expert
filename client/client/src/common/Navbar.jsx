import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Building2,
  Globe2,
  UserCircle,
  Search,
  X,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import spaceswalalogo from "../assets/home/spaceswalalogo.png";
import Sidebar from "./Sidebar";
import ShareMenu from "./ShareMenu";

// --- SEARCHABLE PAGES AND TERMS ---
const PAGES_AND_SEARCH_TERMS = [
  { term: "Home", route: "/" },
  { term: "Mahindra Lifespaces Mumbai", route: "/properties" },
  { term: "Ace Group Mumbai", route: "/properties" },
  { term: "The Sarayu Ayodhya", route: "/properties" },
  { term: "Lodha & Oberoi Woods", route: "/properties" },
  { term: "Properties for Sale", route: "/properties" },
  { term: "Property Details", route: "/properties" },
  { term: "Buy Residential", route: "/buyresidential" },
  { term: "Services", route: "/services" },
  { term: "About Us", route: "/aboutus" },
  { term: "Contact Us", route: "/contact" },
  { term: "Pay Rent", route: "/payrent" },
  { term: "Blog Articles", route: "/blog" },
  { term: "Enquiry Form", route: "/enquiry" },
  { term: "View Projects", route: "/projects" },
  { term: "Login", route: "/login" },
  { term: "Register Account", route: "/register" },
  { term: "Customer Dashboard", route: "/customerpanel" },
  { term: "Broker Panel", route: "/brokerpanel" },
  { term: "Developer Plans", route: "/developer" },
  { term: "Broker Plans", route: "/broker" },
  { term: "Owner Plans", route: "/owner" },
  { term: "Premium Plans", route: "/primium" },
  { term: "Pricing", route: "/pricing" },
  { term: "Company Overview", route: "/companyoverview" },
  { term: "Leadership Team", route: "/leadershipteam" },
  { term: "Sustainability", route: "/sustainability" },
  { term: "Corporate Governance", route: "/corporategovernance" },
  { term: "Career", route: "/career" },
  { term: "ApplyNow", route: "/apply" },
  { term: "Events", route: "/events" },
];

const UNIQUE_SUGGESTION_TERMS = Array.from(
  new Set(PAGES_AND_SEARCH_TERMS.map((p) => p.term))
);

// ✅ Hamburger Icon
const HamburgerIcon = ({ size = 28, color = "white" }) => (
  <div
    style={{
      width: size * 0.7,
      height: size * 0.55,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: "4px",
    }}
  >
    {[1, 2, 3].map((_, i) => (
      <span
        key={i}
        style={{
          width: i === 1 ? "50%" : "100%",
          height: "2px",
          backgroundColor: color,
          borderRadius: "2px",
          transition: "background-color 0.3s",
        }}
      />
    ))}
  </div>
);

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchPopupRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const SCROLL_THRESHOLD = 50;

  // ✅ Filter suggestions
  const filteredSuggestions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return UNIQUE_SUGGESTION_TERMS.slice(0, 8);
    return UNIQUE_SUGGESTION_TERMS.filter((s) =>
      s.toLowerCase().includes(term)
    ).slice(0, 8);
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    const page = PAGES_AND_SEARCH_TERMS.find((p) => p.term === suggestion);
    if (page) {
      if (page.isExternal) {
        window.open(page.route, "_blank", "noopener,noreferrer");
      } else {
        navigate(page.route);
      }
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
    setShowSearchPopup(false);
    setSearchTerm("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    const page = PAGES_AND_SEARCH_TERMS.find(
      (p) => p.term.toLowerCase() === term.toLowerCase()
    );
    if (page) {
      if (page.isExternal) {
        window.open(page.route, "_blank", "noopener,noreferrer");
      } else {
        navigate(page.route);
      }
    } else {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
    setShowSearchPopup(false);
    setSearchTerm("");
  };

  // ✅ Scroll direction detection (Hide on scroll down, show on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

      if (currentScrollY <= 10) {
        // At top: always show
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        // Scrolling down: hide navbar & close open popups
        setIsVisible(false);
        setShowSearchPopup(false);
        setPropertyDropdownOpen(false);
        setServicesDropdownOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up: show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const handleResize = () => setIsMobileView(window.innerWidth < 1024);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSearchPopup &&
        searchPopupRef.current &&
        !searchPopupRef.current.contains(e.target)
      ) {
        setShowSearchPopup(false);
      }
    };
    if (showSearchPopup && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchPopup]);

  const darkBackgroundPaths = [
    "/",
    "/services",
    "/aboutus",
    "/properties",
    "/companyoverview",
    "/corporategovernance",
    "/pgcoliving",
    "/sellproperties",
    "/primium",
    "/projects",
    "/leadershipteam",
    "/sustainability",
    "/register",
    "/premiumplans",
    "/broker",
    "/developer",
    "/rentproperties",
    "/luxuryproperties",
    "/featuredproperties",
    "/affordable",
    "/housekeeping",
    "/interiordesign",
    "/privacypolicy",
    "/termsconditions",
    "/investorrelations",
    "/commercial",
    "/owner",
    "/enquiry",
    "/blog",
    "/career",
    "/apply",
    "/events",
  ];

  const isOverDarkHero =
    !isScrolled && darkBackgroundPaths.includes(location.pathname);

  const iconColor = isOverDarkHero ? "white" : "black";

  const UtilityButton = ({
    icon: Icon,
    onClick,
    label,
    active = false,
    sizeClass = "w-10 h-10",
  }) => {
    const finalIconColor = active ? (isOverDarkHero ? "white" : "black") : iconColor;
    return (
      <button
        onClick={onClick}
        title={label}
        className={`flex items-center justify-center ${sizeClass} rounded-full transition-all ${
          active
            ? isOverDarkHero ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700"
            : isOverDarkHero ? "hover:bg-white/10 hover:scale-110 duration-300" : "hover:scale-110 duration-300"
        }`}
      >
        <Icon color={finalIconColor} size={22} />
      </button>
    );
  };

  const MenuItem = ({ to, label }) => {
    const hoverColor = isOverDarkHero
      ? "hover:text-blue-300"
      : "hover:text-blue-600";
    const underline = isOverDarkHero
      ? "after:bg-blue-300"
      : "after:bg-blue-600";
    const textColor = isOverDarkHero ? "text-white" : "text-black";
    return (
      <button
        onClick={() => navigate(to)}
        className={`relative flex items-center gap-2 px-3 py-1 font-medium text-sm xl:text-lg transition-all group cursor-pointer ${hoverColor} ${textColor}`}
      >
        <span
          className={`after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] ${underline} after:transition-all group-hover:after:w-full`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <>
      <nav
        className={`flex items-center justify-between px-6 sm:px-10 h-20 fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-200/60 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer hover:scale-[1.05] transition"
          onClick={() => navigate("/")}
        >
          <img src={spaceswalalogo} alt="Edge Expert" className="h-20" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-2 font-semibold relative">
          <MenuItem to="/" icon={Home} label="Home" />

          {/* Properties & Top Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPropertyDropdownOpen(true)}
            onMouseLeave={() => setPropertyDropdownOpen(false)}
          >
            <button
              onClick={() => navigate("/properties")}
              className={`px-3.5 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isOverDarkHero ? "text-white hover:text-amber-300" : "text-gray-900 hover:text-blue-600"
              }`}
            >
              <Building2 size={18} />
              <span>Properties & Projects</span>
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {propertyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full flex flex-col bg-white shadow-2xl border border-gray-100 rounded-2xl w-80 py-3 z-50 overflow-hidden"
                >
                  <div className="px-4 py-1.5 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
                      <Sparkles size={12} /> Featured Developers
                    </span>
                    <span className="text-[10px] text-gray-400">Direct Links</span>
                  </div>

                  {/* Developer Links */}
                  {[
                    {
                      name: "Mahindra Lifespaces",
                      desc: "Roots & Vivante • Kandivali & Andheri",
                      route: "/properties",
                      badge: "Mumbai West",
                    },
                    {
                      name: "Ace Group",
                      desc: "The Ace Sky Residences • Goregaon",
                      route: "/properties",
                      badge: "Top Builder",
                    },
                    {
                      name: "The House of Abhinandan Lodha",
                      desc: "The Sarayu • 7-Star Ayodhya Land",
                      route: "/properties",
                      badge: "Ayodhya Flagship",
                    },
                    {
                      name: "Lodha Group",
                      desc: "Lodha Woods • Borivali West",
                      route: "/properties",
                      badge: "Prime Luxury",
                    },
                  ].map((dev) => (
                    <button
                      key={dev.name}
                      onClick={() => {
                        navigate(dev.route);
                        setPropertyDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-amber-50/80 transition-colors group cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 group-hover:text-amber-700">
                          <span>{dev.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium group-hover:bg-amber-100 group-hover:text-amber-800">
                            {dev.badge}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{dev.desc}</span>
                      </div>
                      <ChevronDown size={14} className="text-gray-400 -rotate-90 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}

                  <div className="my-1 border-t border-gray-100" />

                  {/* Internal Navigation */}
                  <button
                    onClick={() => navigate("/properties")}
                    className="px-4 py-2 text-left text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>🏘️ View All Properties</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => navigate("/projects")}
                    className="px-4 py-2 text-left text-xs font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>🏢 View All Builder Projects</span>
                    <span>→</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => navigate("/services")}
              className={`px-3.5 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isOverDarkHero ? "text-white hover:text-teal-300" : "text-gray-900 hover:text-teal-600"
              }`}
            >
              <Globe2 size={18} />
              <span>Our Services</span>
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full flex flex-col bg-white shadow-2xl border border-gray-100 rounded-2xl w-64 py-2 z-50 overflow-hidden"
                >
                  {[
                    { label: "🏢 Direct Builder Projects", path: "/projects" },
                    { label: "🏡 Buy Residential", path: "/buyresidential" },
                    { label: "🏬 Commercial Spaces", path: "/commercial" },
                    { label: "🔑 Rental Properties", path: "/rentproperties" },
                    { label: "💎 Luxury Estates", path: "/luxuryproperties" },
                    { label: "🤝 Builder Consultation", path: "/enquiry" },
                  ].map((item) => (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-teal-50 hover:text-teal-700 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Utility Buttons */}
        <div className="flex items-center space-x-1 relative pr-2 lg:pr-4">
          <ShareMenu iconColor={iconColor} isMobileView={isMobileView} />

          <UtilityButton
            icon={Search}
            onClick={() => setShowSearchPopup(!showSearchPopup)}
            label="Search"
            active={showSearchPopup}
          />

          <AnimatePresence>
            {showSearchPopup && (
              <motion.div
                ref={searchPopupRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50"
              >
                <form onSubmit={handleSearchSubmit} className="relative mb-3">
                  <div className="flex items-center border-b border-gray-200">
                    <Search size={22} className="text-gray-500 mr-3 cursor-pointer" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search Pages, Properties, Services..."
                      className="flex-grow py-2 text-gray-800 outline-none"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="text-gray-500 hover:text-gray-800"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </form>
                <div className="max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((s) => (
                    <div
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center w-12 h-12"
          >
            <HamburgerIcon size={28} color={iconColor} />
          </button>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`hidden lg:flex items-center justify-center w-10 h-10 cursor-pointer rounded-full transition-all duration-200 ${
              isOverDarkHero
                ? "bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20"
                : "bg-white shadow-sm hover:shadow border border-gray-200"
            }`}
          >
            <HamburgerIcon size={24} color={iconColor} />
          </button>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;