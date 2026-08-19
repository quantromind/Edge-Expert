import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Home,
} from "lucide-react";


// ========================================
// MENU DATA
// ========================================
const menuData = [
  { title: "Admin Login", subItems: [], link: "/login" },
  {
    title: "About Us",
    subItems: ["Company Overview", "Sustainability", "Corporate Governance", "Contact Us", "aboutus", "blog", "Career", "Events"],
  },
  { title: "Services", subItems: [], link: "/services" },
  { title: "Properties", subItems: [], link: "/properties" },
  { title: "Contact Us", subItems: [], link: "/contact" },
];

// ========================================
// 5. MEGA SIDEBAR
// ========================================
const MegaSidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [wavePlayed, setWavePlayed] = useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 640;

  const getColumns = (items, numCols = 3) => {
    const actualCols = isMobile ? 1 : numCols;
    const cols = Array.from({ length: actualCols }, () => []);
    items.forEach((item, idx) => cols[idx % actualCols].push(item));
    return cols;
  };

  const handleFullScreenClick = () => {
    setActiveItem(null);
    onClose();
  };

  const handleRedirect = (subItem) => {
    const routes = {
      "Godrej Properties (Mumbai)": "https://www.godrejs-citypanvel.net/",
      "JP Infra": "https://www.jpinfra.com/",
      "Sonam Group": "https://sonamgroup.com/",
      "Mahindra Lifespaces": "https://www.mahindralifespaces.com/",
      "Admin Login": "/login",
      "Admin Dashboard": "/admin/dashboard",
      "Owner Membership": "/owner",
      "Broker Membership": "/broker",
      "Developer Membership": "/developer",
      "Benefits for Members": "/benefitsmembers",
      "Pricing & Plans": "/pricing",
      "Premium": "/primium",
      "Company Overview": "/companyoverview",
      "Sustainability": "/sustainability",
      "Corporate Governance": "/corporategovernance",
      "Contact Us": "/contact",
      "Buy Properties": "/buyresidential",
      "Rent Properties": "/rentproperties",
      "Buy Commercial spaces": "/commercial",
      "Commercial Spaces": "/commercial",
      "Sell Properties": "/sellproperties",
      "Luxury Apartments": "/luxuryproperties",
      "Luxury Estates": "/luxuryproperties",
      "Direct Builder Projects": "/projects",
      "Builder Consultation": "/enquiry",
      "Pay Rent": "/payrent",
      "PG/Co-living": "/pgcoliving",
      "Affordable Housing": "/affordable",
      "New Projects": "/projects",
      "Featured Properties": "/featuredproperties",
      "aboutus": "/aboutus",
      "blog": "/blog",
      "Career":"/career",
      "Events":"/events"
    };
    if (routes[subItem]) {
      if (routes[subItem].startsWith("http")) {
        window.open(routes[subItem], "_blank", "noopener,noreferrer");
      } else {
        navigate(routes[subItem]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    handleFullScreenClick();
  };

  useEffect(() => {
    if (isOpen && !wavePlayed) {
      setWavePlayed(true);
    }
  }, [isOpen, wavePlayed]);

  return (
    <>
      {/* White wave animation */}
      <AnimatePresence>
        {isOpen && !wavePlayed && (
          <motion.div
            className="fixed top-0 right-0 z-999 rounded-b-full bg-white"
            initial={{ scale: 0, opacity: 0.6, x: "50%", y: "-50%" }}
            animate={{ scale: 10, opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              width: "100vmax",
              height: "100vmax",
              transformOrigin: "top right",
            }}
          />
        )}
      </AnimatePresence>

      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFullScreenClick}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full shadow-2xl z-50 flex flex-col w-full sm:w-96"
            style={{
              backgroundColor: "#fff",
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0, rgba(0,0,0,0.08) 2px, transparent 1px, transparent 8px)",
              backgroundSize: "10px 10px",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-300">
              <h2 className="text-2xl font-normal text-gray-800 tracking-tighter">
                {activeItem && isMobile && menuData.find(i => i.title === activeItem)?.subItems.length > 0
                  ? activeItem
                  : "Edge Expert"}
              </h2>
              <button
                onClick={() =>
                  activeItem && isMobile
                    ? setActiveItem(null)
                    : handleFullScreenClick()
                }
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-white"
              >
                {activeItem && isMobile &&
                menuData.find(i => i.title === activeItem)?.subItems.length > 0 ? (
                  <ArrowLeft size={20} className="text-gray-800" />
                ) : (
                  <X size={20} className="text-gray-800" />
                )}
              </button>
            </div>

            {/* Menu Content - This is the main scrollable area of the sidebar */}
            <div className="flex-1 flex flex-col w-full overflow-y-auto px-4 sm:px-6 py-6 pb-24">
              {isMobile && !activeItem && (
                <div
                  onClick={() => {
                    navigate("/");
                    onClose();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-3 px-5 py-4 mb-4 bg-blue-100 text-blue-600 font-semibold rounded-lg hover:bg-blue-200 transition-all cursor-pointer"
                >
                  <Home size={20} />
                  Home
                </div>
              )}

              {menuData.map((item) => {
                const isUnbold =
                  item.title === "Services" ||
                  item.title === "Properties" ||
                  item.title === "Contact Us";

                if (
                  isMobile &&
                  activeItem &&
                  item.title !== activeItem &&
                  menuData.find(i => i.title === activeItem)?.subItems.length > 0
                )
                  return null;

                return (
                  <div
                    key={item.title}
                    className={`relative w-full ${
                    item.title === "Services" ||
                    item.title === "Properties" ||
                    item.title === "Contact Us"
                    ? "mb-0 sm:mb-0" // Reduced spacing
                    : "mb-0 sm:mb-0" // Normal spacing for others
               }`}
                    onMouseEnter={() => !isMobile && setActiveItem(item.title)}
                    onMouseLeave={() => !isMobile && setActiveItem(null)}
                  >
                    <div
                      className={`flex items-center justify-between px-5 py-2 font-bold cursor-pointer rounded transition-all 
                        ${activeItem === item.title ? "bg-gray-200/50" : "hover:bg-gray-100"}`}
                      onClick={() => {
                        if (item.link) {
                          navigate(item.link);
                          onClose();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else if (item.subItems.length > 0) {
                          setActiveItem(activeItem === item.title ? null : item.title);
                        }
                      }}
                    >
                      <span
                        className={`text-gray-800 tracking-wide text-base sm:text-lg ${
                          isUnbold ? "font-normal" : "font-extrabold"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Submenu */}
                    <AnimatePresence>
                      {activeItem === item.title &&
                        item.subItems.length > 0 && (
                          <motion.div
                            initial={
                              isMobile
                                ? { opacity: 0, height: 0 }
                                : { opacity: 0, x: -20 }
                            }
                            animate={
                              isMobile
                                ? { opacity: 1, height: "auto" }
                                : { opacity: 1, x: 0 }
                            }
                            exit={
                              isMobile
                                ? { opacity: 0, height: 0 }
                                : { opacity: 0, x: -20 }
                            }
                            transition={{ duration: 0.3 }}
                            className={`${
                              isMobile
                                ? "relative w-full overflow-hidden"
                                : "fixed top-0 left-0 h-full bg-white shadow-2xl z-60" // ✅ Z-INDEX CHANGED TO Z-60 TO APPEAR OVER SIDEBAR
                            }`}
                            style={{
                              width: isMobile ? "100%" : "calc(100vw - 24rem)",
                            }}
                          >
                            <div
                              className={
                                isMobile
                                  ? "px-0 "
                                  : "w-full h-full overflow-y-auto"
                              }
                            >
                              {!isMobile && (
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 p-8 pb-4">
                                  {item.title}
                                </h2>
                              )}

                              <div className="grid sm:grid-cols-3 gap-y-2 sm:gap-y-4 px-4 sm:px-8 py-4 sm:py-0">
                                {getColumns(item.subItems).map((col, i) => (
                                  <div key={i} className="flex flex-col gap-8">
                                    {col.map((sub, j) => (
                                      <a
                                        key={j}
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleRedirect(sub);
                                        }}
                                        className="group py-3 px-4 text-gray-700 text-base hover:text-blue-600 hover:bg-gray-50 rounded flex items-center justify-between transition-all border-b border-gray-200 last:border-b-0"
                                      >
                                        {sub}
                                        <ArrowRight
                                          size={14}
                                          className="text-blue-500 group-hover:text-blue-600"
                                        />
                                      </a>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    navigate("/enquiry");
                    onClose();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-40 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold shadow-md hover:bg-blue-700 transition-all cursor-pointer duration-300 mt-4"
                >
                  Enquire Now
                </button>
              </div>

              {/* Social Icons */}
              <div className="mt-8 border-t border-gray-300 pt-6 pb-8">
                <div className="flex space-x-4 mb-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61592347450730"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={22} />
                  </a>

                  {/* X (Twitter) icon */}
                  <a
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2H21.5l-7.57 8.66L22 22h-6.51l-5.1-6.32L4.6 22H1.333l8.09-9.26L2 2h6.64l4.66 5.79L18.244 2zm-1.1 18h1.82L8.15 4h-1.9l10.89 16z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/edge.expertrealty/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={22} />
                  </a>
                  <a href="#" className="hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                    <Linkedin size={22} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MegaSidebar;