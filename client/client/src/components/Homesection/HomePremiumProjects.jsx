import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ExternalLink,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Layers,
  CheckCircle2,
  Home,
  Users,
  Compass,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Featured Developer Projects data (matching user requirements)
const featuredDevelopers = [
  {
    id: 101,
    developer: "Godrej Properties (Mumbai)",
    badge: "Mumbai",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Godrej City Panvel Township",
    location: "Panvel, Navi Mumbai",
    type: "2, 3 & 4 BHK Golf Residences",
    status: "New Project Launch",
    budget: "₹85 Lac - 3.5 Cr",
    rating: 4.9,
    description:
      "Sprawling 100+ acre mega golf township with 9-hole golf course, grand clubhouse, and rapid access to the upcoming Navi Mumbai International Airport.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    url: "https://www.godrejs-citypanvel.net/",
    isExternal: true,
    highlights: ["9-Hole Golf Course", "Grand Clubhouse", "Airport Connectivity", "IGBC Certified"],
  },
  {
    id: 102,
    developer: "JP Infra",
    badge: "Top Builder",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "North Garden City • Mira Road",
    location: "Mira Road, Mumbai",
    type: "1, 2 & 3 BHK Grand Homes",
    status: "Ready to Move & Upcoming",
    budget: "₹65 Lac - 1.8 Cr",
    rating: 4.8,
    description:
      "Contemporary high-rise gated community featuring 16 themed gardens, 3 grand clubhouses, Olympic-sized swimming pool, and seamless WEH access.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    url: "https://www.jpinfra.com/",
    isExternal: true,
    highlights: ["16 Themed Gardens", "3 Grand Clubhouses", "Olympic Swimming Pool", "Smart Security"],
  },
  {
    id: 103,
    developer: "Sonam Group",
    badge: "Popular",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Indralok & Beverly Park Towers",
    location: "Mira Bhayandar, Mumbai",
    type: "2 & 3 BHK Luxury Towers",
    status: "New Launch",
    budget: "₹75 Lac - 2.2 Cr",
    rating: 4.7,
    description:
      "Prime residential towers in the heart of Mira-Bhayandar with expansive open green spaces, premium luxury finishes, and vibrant family living.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    url: "https://sonamgroup.com/",
    isExternal: true,
    highlights: ["Landscaped Greens", "Community Hub", "High-Speed Elevators", "24/7 Surveillance"],
  },
  {
    id: 104,
    developer: "Mahindra Lifespaces",
    badge: "Sustainable",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    title: "Roots & Green Eco Homes",
    location: "Kandivali, Mumbai",
    type: "2, 3 & 4 BHK Eco Luxury",
    status: "Upcoming Project",
    budget: "₹1.20 - 4.50 Cr",
    rating: 4.9,
    description:
      "Eco-friendly luxury community featuring IGBC Platinum certified green homes, urban Miyawaki forests, solar energy, and biometric smart security.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    url: "https://www.mahindralifespaces.com/",
    isExternal: true,
    highlights: ["IGBC Platinum Certified", "Miyawaki Forest", "Sky Lounge & Terrace", "EV Charging Hubs"],
  },
];

// Additional Edge Expert Curated Projects
const additionalProjects = [
  {
    id: 1,
    developer: "Edge Expert",
    badge: "Residential",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Skyshore Residences",
    location: "Baner, Pune",
    type: "2 & 3 BHK Skyline Suites",
    status: "Upcoming Project",
    budget: "₹1.10 - 2.80 Cr",
    rating: 4.8,
    description:
      "Ultra-modern high-rise living with infinity edge rooftop pool, panoramic Sahyadri views, and state-of-the-art fitness center.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    url: "/projects",
    isExternal: false,
    highlights: ["Rooftop Infinity Pool", "Sky Lounge", "EV Charging", "Smart Automation"],
  },
  {
    id: 2,
    developer: "Edge Expert",
    badge: "Residential",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Hillcrest Heights",
    location: "Golf Course Ext Rd, Gurugram",
    type: "3 & 4 BHK Luxury Condos",
    status: "New Project Launch",
    budget: "₹1.75 - 3.90 Cr",
    rating: 4.9,
    description:
      "Exquisite living experience surrounded by lush manicured landscapes, tennis courts, temperature-controlled indoor pool, and clubhouse.",
    image:
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
    url: "/projects",
    isExternal: false,
    highlights: ["Private Elevators", "Temperature Pool", "Squash Courts", "Concierge Service"],
  },
  {
    id: 7,
    developer: "Edge Expert Commercial",
    badge: "Commercial",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Zenith Business Park",
    location: "Kharadi IT Hub, Pune",
    type: "Grade A Office Spaces",
    status: "Under Construction",
    budget: "₹95 Lac - 6.5 Cr",
    rating: 4.9,
    description:
      "Next-gen Grade-A corporate towers engineered for tech giants and multinational enterprises with LEED Gold green building certification.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    url: "/commercial",
    isExternal: false,
    highlights: ["LEED Gold Certified", "High Speed Fiber", "Multi-tier Parking", "Cafeteria & Retail"],
  },
  {
    id: 8,
    developer: "Edge Expert Commercial",
    badge: "Commercial",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Horizon Square Corporate Hub",
    location: "Cyber City, Gurugram",
    type: "Premium Retail & Corporate",
    status: "New Launch",
    budget: "₹1.50 - 10.0 Cr",
    rating: 4.8,
    description:
      "Prime retail high-street and corporate office tower with high footfall, expansive glass facades, and direct metro connectivity.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    url: "/commercial",
    isExternal: false,
    highlights: ["Direct Metro Walkway", "Retail High-Street", "24/7 Power Backup", "Double Height Lobby"],
  },
];

// Stats Data
const statsData = [
  { icon: <Building2 className="w-6 h-6 text-amber-400" />, value: "15K+", label: "Verified Properties" },
  { icon: <Users className="w-6 h-6 text-blue-400" />, value: "10K+", label: "Happy Homeowners" },
  { icon: <Compass className="w-6 h-6 text-emerald-400" />, value: "500+", label: "Cities & Localities" },
  { icon: <Briefcase className="w-6 h-6 text-purple-400" />, value: "250+", label: "Mega Projects" },
];

const HomePremiumProjects = () => {
  const [activeTab, setActiveTab] = useState("developers");
  const navigate = useNavigate();

  const getDisplayedProjects = () => {
    if (activeTab === "developers") return featuredDevelopers;
    if (activeTab === "residential")
      return [
        ...featuredDevelopers,
        ...additionalProjects.filter((p) => p.badge === "Residential"),
      ];
    if (activeTab === "commercial")
      return additionalProjects.filter((p) => p.badge === "Commercial");
    return [...featuredDevelopers, ...additionalProjects];
  };

  const handleCardClick = (project) => {
    if (project.isExternal) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-[#0b132b] via-[#1c2541] to-[#0b132b] text-white font-sans overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs md:text-sm font-semibold tracking-wide uppercase mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Top Builder Alliances & Mega Projects
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Featured <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Projects & Top Developers</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Direct access to India’s most trusted real estate developers and landmark township launches with verified pricing, architectural previews, and exclusive developer deals.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {[
              { id: "developers", label: "Featured Developers (Mumbai & Beyond)" },
              { id: "residential", label: "Residential Projects" },
              { id: "commercial", label: "Commercial Towers" },
              { id: "all", label: "All Projects" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-gray-950 font-bold shadow-lg shadow-amber-500/30 scale-105"
                    : "bg-white/10 hover:bg-white/15 text-gray-200 border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Rich Images & Information */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
          >
            {getDisplayedProjects().map((project) => (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className="group relative bg-white/5 hover:bg-white/[0.08] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 shadow-2xl transition-all duration-500 flex flex-col cursor-pointer hover:-translate-y-1.5"
              >
                {/* Image Section */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border ${project.badgeColor}`}
                    >
                      {project.badge}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {project.rating}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {project.developer}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  {/* Location and Configuration */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-300 mb-3">
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{project.location}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-medium text-blue-200 border border-white/10">
                        {project.type}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {project.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 mt-auto">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-medium">
                        Expected Price
                      </span>
                      <span className="text-lg sm:text-xl font-extrabold text-amber-400">
                        {project.budget}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.isExternal ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-amber-500/30"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${project.id}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md"
                        >
                          <span>Explore Project</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects Action Banner */}
        <div className="mb-16 bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-amber-900/60 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Looking for More City-Specific Launches?
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
              Explore 50+ upcoming residential townships and commercial IT parks with complete floor plans, approvals, and developer discounts.
            </p>
          </div>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 rounded-2xl bg-white text-gray-900 hover:bg-amber-400 font-bold text-sm transition-all shadow-lg hover:shadow-white/20 whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <span>Browse All 50+ Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Integrated Key Governance & Statistics Ribbon */}
        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 sm:p-6 text-center backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-white/10 mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePremiumProjects;
