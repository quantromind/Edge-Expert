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
  Plus, // 👈 New import for the slider animation
} from "lucide-react";


// ========================================
// 1. PROPERTY DATA
// ========================================
const PROPERTY_DATA = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/b9/b2/1f/b9b21f27dd6bc357c2143713b9b0093b.jpg",
    type: "Oceanfront Estate",
    address: "The Azure Estate",
    subtitle: "Architectural design with stunning infinity pool",
    specs: [
      { label: "Beds", value: "2" },
      { label: "Baths", value: "2" },
      { label: "Area", value: "1,500 SqFt" },
      { label: "Price", value: "₹ 5 Cr" },
    ],
    badges: ["Infinity Pool", "Gated Access", "Smart Home"],
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/14/e9/58/14e9589228777056baf1d4a72ca1cb3e.jpg",
    type: "Suburban Haven",
    address: "Willow Creek Manor",
    subtitle: "Warm traditional home with large family garden",
    specs: [
      { label: "Beds", value: "4" },
      { label: "Baths", value: "3" },
      { label: "Area", value: "3,500 SqFt" },
      { label: "Price", value: "₹ 7.4 Cr" },
    ],
    badges: ["Quiet Street", "Top School District", "Two-Car Garage"],
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/42/a8/bb/42a8bb16d1babbdfc7491adb51dcef38.jpg",
    type: "Sky Tower Residence",
    address: "Skyline Apex Loft",
    subtitle: "Sleek Urban Loft with Panoramic Cityscape",
    specs: [
      { label: "Beds", value: "1" },
      { label: "Baths", value: "1" },
      { label: "Area", value: "950 SqFt" },
      { label: "Price", value: "₹ 75 Lakh" },
    ],
    badges: ["Concierge", "City View", "Private Balcony"],
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/1200x/99/51/43/99514316becb49ed7b2ea57724c17536.jpg",
    type: "Alpine Chalet",
    address: "Whisperwind Lodge",
    subtitle: "Secluded Log Cabin by the forest edge",
    specs: [
      { label: "Beds", value: "3" },
      { label: "Baths", value: "2" },
      { label: "Area", value: "2,100 SqFt" },
      { label: "Price", value: "₹ 5.2 Cr" },
    ],
    badges: ["Secluded", "Forest Views", "Fireplace"],
  },
];

// ========================================
// 2. SLIDE COMPONENT
// ========================================
const Slide = ({ property, index, isActive, setActiveIndex }) => {
  const { image, type, address, subtitle, specs, badges } = property;

  const slideClass = isActive
    ? "flex-[2] md:flex-[2.5]"
    : "flex-[0.6] md:flex-1 grayscale hover:filter-none";

  const numberPosition = isActive
    ? "top-2 left-2 text-lg sm:text-2xl md:text-4xl"
    : "top-2 left-2 text-xl sm:text-5xl md:text-7xl";

  const handleClick = () => {
    setActiveIndex(isActive ? -1 : index);
  };

  return (
    <div
      className={`relative h-full bg-cover bg-center transition-all duration-700 ease-in-out cursor-pointer overflow-hidden ${slideClass}`}
      style={{ backgroundImage: `url('${image}')` }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div
        className={`absolute font-light text-white/70 z-30 transition-all duration-700 ${numberPosition}`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`absolute bottom-24 left-2 text-[10px] sm:text-sm text-white/70 transition-all duration-700 ${
          isActive ? "opacity-0" : "rotate-[-90deg] opacity-100"
        }`}
      >
        {type}
      </div>

      <div
        className={`absolute bottom-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-green-400 flex items-center justify-center z-30 transition-all ${
          isActive
            ? "bg-green-400/20 hover:bg-green-400/30"
            : "hover:bg-green-400/20"
        }`}
      >
        <Plus
          className={`w-4 h-4 text-green-400 absolute transition-all ${
            isActive ? "opacity-0 scale-0 rotate-180" : "opacity-100 rotate-0"
          }`}
        />
        <div
          className={`absolute w-4 h-[2px] bg-green-400 transition-all ${
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </div>

      <div
        className={`absolute left-4 right-4 bottom-6 sm:bottom-10 md:bottom-20 text-white z-20 transition-all duration-700 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs sm:text-sm font-light mb-1">{type}</p>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-light mb-1">
          {address}
        </h2>

        <p className="text-xs sm:text-sm text-white/80 mb-4">{subtitle}</p>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-b border-white/20 py-3 text-xs sm:text-sm md:text-lg">
          {specs.map((spec, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-white/70">{spec.label}</span>
              <span className="text-white">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="px-2 py-1 bg-white/10 text-green-300 text-xs rounded-full"
            >
              • {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========================================
// 3. MAIN SLIDER
// ========================================
const AccordionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div
      className="
      w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl
      h-[55vh] sm:h-[65vh] md:h-[75vh]    /* ✅ Reduced height for better fit */
      relative overflow-hidden shadow-xl
    "
    >
      <div className="flex h-full">
        {PROPERTY_DATA.map((property, index) => (
          <Slide
            key={property.id}
            property={property}
            index={index}
            isActive={activeIndex === index}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
};

// ========================================
// 4. WRAPPER COMPONENT (FINAL PERFECTED)
// ========================================
const NavigateNextContent = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-start overflow-hidden bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* TOP SECTION */}
          <motion.div
            className="relative w-full flex flex-col items-center justify-center py-16 px-6 shadow-xl overflow-hidden"
            variants={fadeInUp}
          >
            {/* --- BACKGROUND IMAGE (Geometric Grid) --- */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-110 opacity-70" 
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/abstract-geometric-wireframe-background_52683-59421.jpg')",
                backgroundAttachment: "fixed",
              }}
            ></div>

            {/* DARK RICH OVERLAY (Reduced opacity for brighter look) */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* CONTENT ABOVE BACKGROUND */}
            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Top title */}
              <motion.h1
                className="text-4xl sm:text-5xl font-sans font-extralight text-white tracking-wider 
                pb-2 mb-8 sm:mb-12 self-start ml-6 sm:ml-10" 
                variants={fadeInLeft}
              >
                ACCESS EXCLUSIVE SERVICES
              </motion.h1>

              {/* LEFT BUTTONS | RIGHT DISCOUNT TEXT */}
              <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-10 px-4 sm:px-10">
                {/* LEFT SIDE BUTTONS (Electric Blue Hover) */}
                <motion.div
                  className="flex flex-col items-start justify-start gap-6"
                  variants={fadeInLeft}
                >



  {/* Direct Builder Projects */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => navigate("/projects")}
    className="px-8 py-3 
               bg-white/20 
               backdrop-blur-xl 
               border border-white/30
               text-white 
               font-bold uppercase tracking-wide 
               rounded-xl shadow-xl 
               hover:bg-white/30 
               transition-all duration-300 cursor-pointer"
  >
    🏢 Direct Builder Projects
  </motion.button>

  {/* Builder Consultation */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => navigate("/enquiry")}
    className="px-8 py-3 
               bg-white/20 
               backdrop-blur-xl 
               border border-white/30
               text-white 
               font-bold uppercase tracking-wide 
               rounded-xl shadow-xl 
               hover:bg-white/30 
               transition-all duration-300 cursor-pointer"
  >
    🤝 Builder Consultation
  </motion.button>

</motion.div>

           {/* RIGHT SIDE DISCOUNT TEXT (Prominent Black-Gray Text) */}
                <motion.div
                  className="flex flex-col items-center justify-center text-center p-4 sm:p-0"
                  variants={fadeInRight}
                >
                  <p className="text-white/80 text-sm uppercase tracking-widest mb-1">
                    Exclusive Offer
                  </p>
                  <p 
                    // White text with subtle black-gray shadow/glow
                    className="text-white text-6xl sm:text-7xl font-extrabold tracking-tight font-mono mb-2 promo-text"
                  >
                    70% OFF 
                  </p>
                  <p 
                    className="text-white font-semibold text-base sm:text-xl"
                    style={{ textShadow: '0 0 5px rgba(255,255,255,0.4)' }}
                  >
                    Your First Service Booking
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

      {/* ACCORDION SLIDER */}
      <motion.div className="w-full">
        <AccordionSlider />
      </motion.div>
    </motion.div>
  );
};






// ========================================
// 4. MENU DATA
// ========================================
const menuData = [
  {
    title: "Navigate your next",
    subItems: [
      "Buy Properties",
      "Rent Properties",
      "Buy Commercial Properties",
      "Sell Properties",
      "Luxury Apartments",
    ],
  },
  { title: "Signup/Login", subItems: ["Owner Signup", "Broker Signup", "Developer Signup", "Owner Login", "Broker Login", "Developer Login"] },
  // { title: "Login", subItems: ["Owner Login", "Broker Login", "Developer Login"] },
  {
    title: "Get Memberships",
    subItems: [
      "Owner Membership",
      "Broker Membership",
      "Developer Membership",
      "Benefits for Members",
      "Pricing & Plans",
      "Premium",
    ],
  },
  {
    title: "Explore Properties",
    subItems: [
      "Buy Properties",
      "Rent Properties",
      "Buy Commercial spaces",
      "New Projects",
      "Luxury Apartments",
      "Affordable Housing",
      "Featured Properties",
      "PG/Co-living",
      "Sell Properties",
    ],
  },
  { 
    title: "Featured Developers", 
    subItems: ["Godrej Properties (Mumbai)", "JP Infra", "Sonam Group", "Mahindra Lifespaces"] 
  },
  { title: "Our Services", subItems: ["Direct Builder Projects", "Buy Properties", "Rent Properties", "Commercial Spaces", "Luxury Estates", "Builder Consultation", "Pay Rent"] },
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
      "Owner Signup": "/loginregister",
      "Broker Signup": "/loginregister",
      "Developer Signup": "/loginregister",
      "Owner Login": "/loginregister",
      "Broker Login": "/loginregister",
      "Developer Login": "/loginregister",
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
                              {!isMobile && item.title !== "Navigate your next" && (
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 p-8 pb-4">
                                  {item.title}
                                </h2>
                              )}

                              {/* NEW: ACCORDION SLIDER (for 'Navigate your next') */}
                              {item.title === "Navigate your next" ? (
                                <NavigateNextContent 
                                    onClose={onClose} 
                                    handleRedirect={handleRedirect} 
                                />
                              ) : (
                                // NORMAL SUBMENU LAYOUT
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
                                          className="group py-3 px-4 text-gray-700 text-base hover:text-blue-600 hover:bg-gray-50 rounded flex items-center justify-between transition-all border-b border-gray-200 last:border-b-0" // ✅ ADDED BORDER FOR LINE BELOW ITEM
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
                              )}
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
                                  <a href="#" className="hover:text-teal-400 transition-colors">
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
                
                                  <a href="#" className="hover:text-teal-400 transition-colors">
                                    <Instagram size={22} />
                                  </a>
                                  <a href="#" className="hover:text-teal-400 transition-colors">
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