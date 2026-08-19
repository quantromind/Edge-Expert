import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Building,
  Shield,
  HeartHandshake,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  Gem,
  Building2,
  Home as HomeIcon,
  Compass
} from "lucide-react";

// Local Images
import slide1 from "../../assets/home/slide1.jpg";
import slide2 from "../../assets/home/slide2.jpg";
import slide3 from "../../assets/home/slide3.jpg";

// Curated High-Definition Property & Skyline Images
const SLIDE_DATA = [
  {
    id: 0,
    bgImage: slide1,
    tag: "India's #1 Real Estate Platform",
    tagIcon: <Sparkles className="w-4 h-4 text-amber-400" />,
    titlePrimary: "Find Your",
    titleHighlight: "Dream Property",
    titleSuffix: "with Edge Expert",
    subtitle: "Discover verified residential homes, luxury villas, and top builder projects with complete legal transparency and direct builder pricing.",
    showSearch: false,
    showPillars: true,
    primaryBtn: { text: "Explore Properties", link: "/properties" },
    secondaryBtn: { text: "View Builder Projects", link: "/projects" },
  },
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85",
    tag: "Top Builder Partnerships",
    tagIcon: <Building2 className="w-4 h-4 text-amber-400" />,
    titlePrimary: "Direct With Top",
    titleHighlight: "Builders & Developers",
    titleSuffix: "Godrej • JP Infra • Sonam • Mahindra",
    subtitle: "Access premier golf townships, high-rise luxury towers, and exclusive pre-launch deals across Mumbai, Pune, Gurugram & Bangalore.",
    showSearch: false,
    showPillars: false,
    features: [
      "Zero Brokerage on New Projects",
      "Guaranteed Lowest Developer Pricing",
      "RERA Approved & Verified Listings",
      "Dedicated Site Visit Assistance"
    ],
    primaryBtn: { text: "View Featured Projects", link: "/projects" },
    secondaryBtn: { text: "Developer Alliances", link: "/developer" },
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    tag: "Commercial & Corporate Real Estate",
    tagIcon: <Building className="w-4 h-4 text-blue-400" />,
    titlePrimary: "Unlock High-Yield",
    titleHighlight: "Commercial Spaces",
    titleSuffix: "Offices, Retail & IT Parks",
    subtitle: "Secure high-performing commercial assets from Grade-A office towers to prime high-street retail spaces engineered for long-term passive rental yield.",
    showSearch: false,
    showPillars: false,
    features: [
      "Grade-A LEED Certified Tech Parks",
      "Prime High-Street Retail Showrooms",
      "High ROI & Assured Rental Returns",
      "Fully Furnished Plug-and-Play Hubs"
    ],
    primaryBtn: { text: "Browse Commercial Spaces", link: "/commercial" },
    secondaryBtn: { text: "Investor Relations", link: "/investorrelations" },
  },
  {
    id: 3,
    bgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
    tag: "The Ultra-Luxury Collection",
    tagIcon: <Gem className="w-4 h-4 text-purple-400" />,
    titlePrimary: "Experience Sky-High",
    titleHighlight: "Luxury Residences",
    titleSuffix: "Penthouses & Designer Villas",
    subtitle: "Step into an elite realm of private infinity pools, panoramic skyline balconies, private elevators, and bespoke architectural craftsmanship.",
    showSearch: false,
    showPillars: false,
    features: [
      "Sea-Facing Penthouse Suites",
      "Gated Smart Home Villas",
      "Private Elevators & Concierge",
      "World-Class Private Clubhouses"
    ],
    primaryBtn: { text: "Explore Luxury Properties", link: "/luxuryproperties" },
    secondaryBtn: { text: "Buy Residential", link: "/buyresidential" },
  },
  {
    id: 4,
    bgImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85",
    tag: "Eco-Friendly & Smart Communities",
    tagIcon: <Compass className="w-4 h-4 text-emerald-400" />,
    titlePrimary: "Modern & Sustainable",
    titleHighlight: "Gated Townships",
    titleSuffix: "Built for Family Living",
    subtitle: "Choose from 10,000+ verified homes with Olympic pools, themed gardens, EV charging infrastructure, and excellent metro connectivity.",
    showSearch: false,
    showPillars: false,
    features: [
      "1, 2, 3 & 4 BHK Family Apartments",
      "70%+ Open Landscaped Green Spaces",
      "24/7 Multi-Tier Biometric Security",
      "Close to Top Schools & Metro Lines"
    ],
    primaryBtn: { text: "Find Your Home", link: "/properties" },
    secondaryBtn: { text: "Affordable Housing", link: "/affordable" },
  },
];

// --- Reusable Button ---
const Button = ({ children, onClick, variant = "default", size = "md", className = "" }) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none rounded-xl font-sans cursor-pointer";
  const variants = {
    default: "bg-[#3BAFDA] text-white hover:bg-[#2E9CC8] shadow-lg shadow-blue-500/20",
    hero: "bg-gradient-to-r from-blue-600 to-[#3BAFDA] text-white hover:brightness-110 shadow-xl shadow-blue-600/30",
    outline: "bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md",
  };
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- Main Hero Carousel Component ---
export default function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const totalSlides = SLIDE_DATA.length;

  // Auto-slide every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/properties");
    }
  };

  const current = SLIDE_DATA[activeSlide];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden font-sans bg-gray-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Helmet>
        <title>Edge Expert | Home Buying Simplified - Direct With Builders</title>
        <meta
          name="description"
          content="Home buying simplified with Edge Expert. Direct with builders, your trusted partner helping you find your dream home across India."
        />
      </Helmet>

      {/* Background Slides with Ken Burns Smooth Transition */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${current.bgImage})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {/* Dual Vignette & Dark Overlay for Rich Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto flex flex-col items-center gap-5"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg">
              {current.tagIcon}
              <span>{current.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
              {current.titlePrimary}{" "}
              <span className="bg-gradient-to-r from-[#3BAFDA] via-blue-300 to-cyan-200 bg-clip-text text-transparent">
                {current.titleHighlight}
              </span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-medium text-blue-100">
                {current.titleSuffix}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed drop-shadow-md">
              {current.subtitle}
            </p>

            {/* Search Bar for Slide 1 */}
            {current.showSearch && (
              <motion.form
                onSubmit={handleSearch}
                className="w-full max-w-2xl flex items-center bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/30 mt-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 px-3 text-gray-400">
                  <Search size={20} className="text-blue-600" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by locality, project, builder (e.g. Godrej, JP Infra, Worli, Pune)..."
                  className="flex-1 py-2.5 px-2 text-sm sm:text-base text-gray-800 placeholder-gray-500 bg-transparent outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                >
                  Search
                </button>
              </motion.form>
            )}

            {/* Features Bullet List for Slides 2, 3, 4, 5 */}
            {current.features && (
              <motion.div
                className="grid grid-cols-2 gap-3 max-w-2xl w-full my-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {current.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-100 border border-white/10"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span className="truncate font-medium">{feat}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate(current.primaryBtn.link)}
                className="flex items-center gap-2 shadow-2xl"
              >
                <span>{current.primaryBtn.text}</span>
                <ArrowRight size={18} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(current.secondaryBtn.link)}
              >
                {current.secondaryBtn.text}
              </Button>
            </div>

            {/* 4 Value Pillars for Slide 1 */}
            {current.showPillars && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-4xl mt-6 pt-4 border-t border-white/15"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/15 shadow-lg">
                  <Sparkles size={16} className="text-[#3BAFDA] flex-shrink-0" />
                  <span>Home buying simplified</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/15 shadow-lg">
                  <Building size={16} className="text-[#3BAFDA] flex-shrink-0" />
                  <span>Direct with builders</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/15 shadow-lg">
                  <Shield size={16} className="text-[#3BAFDA] flex-shrink-0" />
                  <span>Your trusted partner</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/15 shadow-lg">
                  <HeartHandshake size={16} className="text-[#3BAFDA] flex-shrink-0" />
                  <span>Dream home guidance</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Arrow Controls (Left / Right) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-30 transition-all cursor-pointer hover:scale-110 shadow-xl"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-30 transition-all cursor-pointer hover:scale-110 shadow-xl"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Slide Indicators with Titles on Hover */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
        {SLIDE_DATA.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              activeSlide === index
                ? "w-8 h-2.5 bg-[#3BAFDA] shadow-md shadow-cyan-400/50"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
