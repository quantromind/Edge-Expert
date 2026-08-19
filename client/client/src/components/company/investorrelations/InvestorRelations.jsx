import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Download,
  Mail,
  Phone,
  Globe,
  Home,
  Building,
  MapPin,
  Users,
} from "lucide-react";

// 🏢 Real Estate Financial Data
const aumData = [
  { year: "2020", aum: 320, properties: 12 },
  { year: "2021", aum: 580, properties: 24 },
  { year: "2022", aum: 890, properties: 38 },
  { year: "2023", aum: 1250, properties: 52 },
  { year: "2024", aum: 1820, properties: 68 },
  { year: "2025", aum: 2450, properties: 85 },
];

const portfolioData = [
  { type: "Commercial", value: 45, fill: "#06b6d4" },
  { type: "Residential", value: 35, fill: "#10b981" },
  { type: "Industrial", value: 12, fill: "#8b5cf6" },
  { type: "Mixed-Use", value: 8, fill: "#f59e0b" },
];
const performanceMetrics = [
  {
    id: 1,
    title: "Total AUM",
    value: "₹2.45B",
    description: "Assets Under Management",
  },
  { id: 2, title: "Portfolio IRR", value: "21.3%", description: "Internal Rate of Return" },
  { id: 3, title: "Properties Managed", value: "85+", description: "Across 12 Cities" },
  { id: 4, title: "Capital Partners", value: "28", description: "Institutional Investors" },
  { id: 5, title: "Occupancy Rate", value: "96.5%", description: "Portfolio Average" },
  { id: 6, title: "NOI Growth", value: "18.7%", description: "Year-over-Year" },
];

const geographicData = [
  { city: "Mumbai", properties: 22, aum: 680 },
  { city: "Bangalore", properties: 18, aum: 520 },
  { city: "Delhi NCR", properties: 15, aum: 480 },
  { city: "Pune", properties: 12, aum: 350 },
  { city: "Hyderabad", properties: 10, aum: 280 },
  { city: "Chennai", properties: 8, aum: 140 },
];

const InvestorRelations = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    message: "",
    investorType: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data here
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  // Correcting formatters to use 'Crores' for consistency with the YAxis
  // AUM data is in 'millions' (320, 580, etc.), so to get Crores: value / 10 (since 1 Crore = 10 Million)
  const formatAumTooltip = (value) => [`₹${(value / 10).toFixed(1)} Cr`, "AUM"];
  const formatYAxisTick = (tick) => `₹${(tick / 10).toFixed(0)} Cr`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 py-10 px-6 md:px-12">
      {/* HERO SECTION - MOBILE TWEAK: pt-20 is smaller than pt-28/pt-32 for mobile */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative pt-20 md:pt-32 pb-16 mb-12 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center rounded-2xl overflow-hidden"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="md:flex md:items-center md:justify-between gap-8">
            <div className="md:flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Building className="text-teal-300" size={24} /> {/* Smaller icon on mobile */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                 
            <span className="text-white block sm:inline-block mt-2 sm:mt-0 ml-0 sm:ml-4">
               SpaceWala Real Estate
            </span>{" "}
                  {/* Smaller text on mobile */}
                
                </h1>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl text-teal-400 font-semibold mb-4">
                Premium Real Estate Investment & Development
              </h2>
              <p className="mt-4 text-slate-300 max-w-2xl text-base sm:text-lg">
                Leading the transformation of India's urban landscape through
                strategic investments in high-growth commercial, residential, and
                mixed-use properties.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 border border-teal-400 text-teal-400 px-5 py-2.5 rounded-lg hover:bg-teal-400 hover:text-slate-900 transition-all duration-200 text-sm sm:text-base"
                >
                  <Mail size={18} /> Contact Investor Relations
                </a>
              </div>
            </div>

            {/* Performance Box (same as before, the grid-cols-2 is fine for mobile) */}
            <div className="mt-10 md:mt-0 md:w-96">
              <div className="bg-gradient-to-tr from-slate-800 to-slate-700 rounded-xl p-2.5 border border-slate-600">
                <h3 className="text-lg font-semibold text-teal-400 mb-3">
                  Portfolio Performance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {performanceMetrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="bg-[rgba(255,255,255,0.05)] p-2.5 rounded-lg border border-slate-600"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium text-teal-400 mt-1">
                        {metric.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {metric.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* MAIN CONTENT - The lg:grid-cols-3 handles the stacking on mobile */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          {/* INVESTMENT STRATEGY - Use two columns on small screens if possible, or stack on very small screens (default behavior is stacking unless md:grid-cols-2 is set) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 sm:p-8 border border-slate-700"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-teal-400 mb-6">
              Investment Strategy
            </h2>

            {/* Force stacking on small mobile, use 2 columns on medium screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Core Investment Focus</h3>
                <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Grade A Office Spaces in Tier 1 Cities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Premium Residential Developments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Industrial & Logistics Parks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Mixed-Use Commercial Hubs</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Geographic Presence</h3>
                <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-3 sm:p-4">
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      {/* Reduced BarChart margin for smaller screens */}
                      <BarChart data={geographicData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        {/* Smaller font size for XAxis labels */}
                        <XAxis dataKey="city" stroke="#94a3b8" style={{ fontSize: '10px' }} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          formatter={(value) => [`${value}`, ""]}
                          contentStyle={{ fontSize: '12px', padding: '4px' }}
                        />
                        <Bar dataKey="properties" fill="#06b6d4" name="Properties" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FINANCIAL PERFORMANCE - Uses two columns on medium screens and stacks on mobile (default) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 sm:p-8 border border-slate-700"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-teal-400 mb-6">
              Financial Performance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  AUM Growth (₹ Crores)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={aumData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis
                        stroke="#94a3b8"
                        // Using the corrected formatter for 'Crores'
                        tickFormatter={formatYAxisTick}
                        style={{ fontSize: '10px' }}
                      />
                      <Tooltip
                        // Using the corrected formatter for 'Crores'
                        formatter={formatAumTooltip}
                        contentStyle={{ fontSize: '12px', padding: '4px' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="aum"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ fill: "#06b6d4", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Portfolio Composition
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={portfolioData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="type" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Allocation"]}
                        contentStyle={{ fontSize: '12px', padding: '4px' }}
                      />
                      {/* Bar fill colors are now defined in portfolioData */}
                      <Bar dataKey="value" fill="#8884d8">
                        {portfolioData.map((entry, index) => (
                          <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MILESTONES - Force stacking on small mobile, use 2 columns on medium screens */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 sm:p-8 border border-slate-700"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-teal-400 mb-6">
              Corporate Milestones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeline content is already responsive, just using smaller padding/text for general consistency */}
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <div className="w-0.5 h-full bg-teal-400 mt-2"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-teal-400">
                        2015 — Company Founded
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Established with focus on commercial real estate in
                        Mumbai Metropolitan Region
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <div className="w-0.5 h-full bg-teal-400 mt-2"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-teal-400">
                        2018 — Fund I Launch
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Successfully closed ₹1,250 crore inaugural fund for
                        office acquisitions
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <div className="w-0.5 h-full bg-teal-400 mt-2"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-teal-400">
                        2021 — National Expansion
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Expanded operations to Bangalore, Delhi NCR, and
                        Hyderabad markets
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <div className="w-0.5 h-full bg-teal-400 mt-2"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-teal-400">
                        2023 — ESG Initiative
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Launched sustainable building mandate across portfolio
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <div className="w-0.5 h-full bg-teal-400 mt-2"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-teal-400">
                        2024 — REIT Platform
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Established India's first focused commercial REIT
                        platform
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-teal-400">
                        2025 — Portfolio Milestone
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Surpassed ₹24,000 crore AUM with 85+ properties under
                        management
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="space-y-8">
          {/* ESG COMMITMENT */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-xl font-bold text-teal-400 mb-4">
              ESG Commitment
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">♻</span>
                </div>
                <div>
                  <div className="font-semibold">Sustainable Portfolio</div>
                  <div className="text-sm text-slate-300">
                    65% of portfolio LEED Certified, targeting 85% by 2026
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Community Impact</div>
                  <div className="text-sm text-slate-300">
                    $15M committed to community development initiatives
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">⚖</span>
                </div>
                <div>
                  <div className="font-semibold">Governance Excellence</div>
                  <div className="text-sm text-slate-300">
                    Independent advisory board with 40% gender diversity
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-xl font-bold text-teal-400 mb-4">
              Contact Investor Relations
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields are already responsive - just use consistent mobile friendly padding/text */}
              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                />
              </div>
              <div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                />
              </div>
              <div>
                <input
                  name="org"
                  value={form.org}
                  onChange={handleChange}
                  placeholder="Organization"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                />
              </div>
              <div>
                <select
                  name="investorType"
                  value={form.investorType}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                >
                  <option value="">Investor Type</option>
                  <option value="institutional">Institutional Investor</option>
                  <option value="private_equity">Private Equity</option>
                  <option value="family_office">Family Office</option>
                  <option value="hnwi">HNWI</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3} // Reduced rows for smaller screens
                  placeholder="Investment interests or questions"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
              >
                Send Inquiry
              </button>
              {sent && (
                <div className="text-sm text-green-400 text-center mt-2">
                  Message sent successfully - Our team will contact you within 24
                  hours
                </div>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={14} className="text-teal-400" />
                <a href="mailto:hello@edgeexpert.in" className="hover:text-teal-400 transition">hello@edgeexpert.in</a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={14} className="text-teal-400" />
                <a href="tel:07385327808" className="hover:text-teal-400 transition">073853 27808</a>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin size={14} className="text-teal-400 mt-1 flex-shrink-0" />
                <span>
                  Miraroad, Mumbai, Maharashtra, India 401107
                </span>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default InvestorRelations;