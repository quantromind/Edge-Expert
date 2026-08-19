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

// Featured Developer Projects data (matching user requirements - Mumbai West & Ayodhya)
const featuredDevelopers = [
  {
    id: 101,
    developer: "Mahindra Lifespaces",
    badge: "Mumbai West",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Mahindra Roots & Vivante",
    location: "Kandivali West & Andheri West, Mumbai",
    type: "2, 3 & 4 BHK Eco Luxury",
    status: "Ready to Move & New Launch",
    budget: "₹2.45 Cr - 3.85 Cr",
    rating: 4.9,
    description:
      "Signature green-certified luxury residences featuring 35+ lifestyle amenities, national park & sunset views, EV charging hubs, and smart home automation.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    url: "/properties",
    isExternal: false,
    highlights: ["35+ Lifestyle Amenities", "Miyawaki Forest", "Sky Lounge & Terrace", "EV Charging Hubs"],
  },
  {
    id: 102,
    developer: "Ace Group",
    badge: "Top Builder",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "The Ace Sky Residences",
    location: "Goregaon West & Malad West, Mumbai",
    type: "2, 3 & 4 BHK Sky Condos",
    status: "Under Construction & Ready",
    budget: "₹1.85 Cr - 3.10 Cr",
    rating: 4.8,
    description:
      "Contemporary 40-storey high-rise marvel with rooftop sky observatory, infinity pool, Italian marble flooring, and rapid Link Road metro connectivity.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    url: "/properties",
    isExternal: false,
    highlights: ["40-Storey Tower", "Sky Observatory", "Automated Valet Parking", "Olympic Pool"],
  },
  {
    id: 103,
    developer: "The House of Abhinandan Lodha",
    badge: "7-Star Luxury",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "The Sarayu by HoABL",
    location: "Sarayu Riverfront, Ayodhya",
    type: "7-Star Gated NA Villa Plots",
    status: "Exclusive New Launch",
    budget: "₹1.75 Cr Onwards",
    rating: 5.0,
    description:
      "Palatial riverfront gated enclave managed by 5-star The Leela. Features private helipad, ayurvedic wellness center, and Ram Mandir heritage promenade.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    url: "/properties",
    isExternal: false,
    highlights: ["The Leela Hospitality", "Helipad Access", "Private River Promenade", "Clear NA Title"],
  },
  {
    id: 104,
    developer: "Lodha Group",
    badge: "Prime Luxury",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Lodha Woods & World Towers",
    location: "Borivali West & Worli, Mumbai",
    type: "2, 3 & 4 BHK Luxury Residences",
    status: "Ready to Move",
    budget: "₹2.95 Cr - 8.50 Cr",
    rating: 4.9,
    description:
      "World-class residential towers with heated Olympic pools, private sea/forest views, international concierge, and expansive landscaped courtyards.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    url: "/properties",
    isExternal: false,
    highlights: ["Olympic Heated Pool", "Forest & Sea Views", "Concierge Service", "Clubhouse"],
  },
];

// Additional Edge Expert Curated Projects
const additionalProjects = [
  {
    id: 1,
    developer: "Oberoi Realty",
    badge: "Residential",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Oberoi Sky City Residences",
    location: "Borivali West Link, Mumbai",
    type: "3 & 4 BHK Luxury Condos",
    status: "Ready to Move",
    budget: "₹3.65 Cr - 5.50 Cr",
    rating: 4.9,
    description:
      "25-acre integrated mega development with attached lifestyle mall, Olympic swimming pool, bowling alley, and direct metro connectivity.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    url: "/properties",
    isExternal: false,
    highlights: ["Attached Luxury Mall", "Olympic Pool", "Bowling Alley", "Direct Metro Access"],
  },
  {
    id: 2,
    developer: "Rustomjee Group",
    badge: "Residential",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Rustomjee Seasons Elite Penthouse",
    location: "Carter Road, Bandra West, Mumbai",
    type: "4 BHK Sea View Penthouse",
    status: "Ready to Move",
    budget: "₹8.50 Cr",
    rating: 5.0,
    description:
      "Iconic sea-facing penthouse on Carter Road with private rooftop terrace garden, Italian marble, private elevator landing, and smart automation.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    url: "/properties",
    isExternal: false,
    highlights: ["Arabian Sea View", "Private Terrace", "Private Lift", "Smart Automation"],
  },
  {
    id: 7,
    developer: "Insignia Commercial",
    badge: "Commercial",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "BKC Capital Corporate Tower",
    location: "BKC / Bandra, Mumbai",
    type: "Grade A Office Spaces",
    status: "Ready to Move",
    budget: "₹4.50 Cr - 15.0 Cr",
    rating: 4.9,
    description:
      "LEED Platinum certified corporate headquarters in Mumbai's financial nerve center with VRV central cooling, destination lifts, and food court.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    url: "/commercial",
    isExternal: false,
    highlights: ["LEED Platinum", "VRV Central AC", "10+ Parking Slots", "Food Court & Conference"],
  },
  {
    id: 8,
    developer: "Lotus Group",
    badge: "Commercial",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Lotus Grandeur Commercial Hub",
    location: "Veera Desai Road, Andheri West, Mumbai",
    type: "Prime Retail & Corporate Office",
    status: "Ready to Move",
    budget: "₹2.20 Cr - 6.50 Cr",
    rating: 4.8,
    description:
      "High footfall commercial tower in Andheri West entertainment hub with double-height lobby, modern glass facade, and high-speed elevators.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    url: "/commercial",
    isExternal: false,
    highlights: ["Veera Desai Hub", "High Footfall", "24/7 Power Backup", "Double Height Lobby"],
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
