import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Building2,
  Users,
  Hammer,
  BarChart3,
  UserPlus,
  Pencil,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  RefreshCcw,
  Plus,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Tag,
  IndianRupee,
  Check,
  X,
  Star,
  ChevronDown,
  ExternalLink,
  SlidersHorizontal,
  Home,
  Layers,
  Sparkles,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import API from "../../Api/axiosConfig";
import PropertyFormModal from "./PropertyFormModal";

/* ===================== SIDEBAR NAVIGATION ===================== */
const navSections = [
  { key: "overview", label: "Dashboard Overview", icon: Activity },
  { key: "properties", label: "Manage Properties", icon: Building2 },
  { key: "enquiries", label: "Property Enquiries & Leads", icon: MessageSquare },
  { key: "users", label: "User Management", icon: Users },
  { key: "contacts", label: "Contact Inquiries", icon: Mail },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Global State
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Property Filters & Modal
  const [propCategoryFilter, setPropCategoryFilter] = useState("ALL");
  const [propCityFilter, setPropCityFilter] = useState("ALL");
  const [propBuilderFilter, setPropBuilderFilter] = useState("ALL");
  const [propSearch, setPropSearch] = useState("");
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Enquiry Filters
  const [selectedEnquiryProperty, setSelectedEnquiryProperty] = useState("ALL");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("ALL");
  const [enquirySearch, setEnquirySearch] = useState("");

  // User Filter
  const [userRoleFilter, setUserRoleFilter] = useState("ALL");
  const [userSearch, setUserSearch] = useState("");

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");

  /* ====================== FETCH ALL DATA ====================== */
  const fetchAllData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [statsRes, propsRes, enqRes, usersRes, contactsRes] =
        await Promise.allSettled([
          API.get("/admin/stats"),
          API.get("/properties?limit=100"),
          API.get("/enquiries?limit=100"),
          API.get("/admin/users?limit=100"),
          API.get("/contact"),
        ]);

      if (statsRes.status === "fulfilled") setStats(statsRes.value.data?.data || {});
      if (propsRes.status === "fulfilled") setProperties(propsRes.value.data?.data || []);
      if (enqRes.status === "fulfilled") setEnquiries(enqRes.value.data?.data || []);
      if (usersRes.status === "fulfilled") setUsers(usersRes.value.data?.data || []);
      if (contactsRes.status === "fulfilled") setContacts(contactsRes.value.data?.data || []);

      if (isRefresh) showToast("Dashboard synced with MongoDB Atlas!", "success");
    } catch (err) {
      console.error("Dashboard load error:", err);
      showToast("Error loading dashboard data.", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchAllData();
  }, [token, navigate]);

  /* ====================== PROPERTY ACTIONS ====================== */
  const handleDeleteProperty = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      await API.delete(`/properties/${id}`);
      showToast(`Property "${title}" deleted successfully.`);
      fetchAllData();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete property.", "error");
    }
  };

  const handleToggleFeatured = async (property) => {
    try {
      await API.put(`/properties/${property._id}`, {
        featured: !property.featured,
      });
      showToast(
        property.featured
          ? "Removed from Featured"
          : "Marked as Featured Property!"
      );
      fetchAllData();
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", "error");
    }
  };

  /* ====================== ENQUIRY ACTIONS ====================== */
  const handleUpdateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      await API.put(`/enquiries/${enquiryId}`, { status: newStatus });
      showToast(`Lead status updated to "${newStatus.toUpperCase()}"`);
      // Update local state
      setEnquiries((prev) =>
        prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error(err);
      showToast("Failed to update lead status.", "error");
    }
  };

  const handleDeleteEnquiry = async (enquiryId) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await API.delete(`/enquiries/${enquiryId}`);
      showToast("Enquiry deleted.");
      setEnquiries((prev) => prev.filter((e) => e._id !== enquiryId));
    } catch (err) {
      console.error(err);
      showToast("Failed to delete enquiry.", "error");
    }
  };

  /* ====================== USER ACTIONS ====================== */
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await API.put(`/admin/users/${userId}`, { role: newRole });
      showToast(`User role changed to ${newRole}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
      showToast("Failed to update user role", "error");
    }
  };

  const handleDeleteUser = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"?`)) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      showToast("User deleted.");
      fetchAllData();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete user.", "error");
    }
  };

  /* ====================== FILTERED DATA ====================== */
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchCat =
        propCategoryFilter === "ALL" || p.category === propCategoryFilter;
      const matchCity =
        propCityFilter === "ALL" ||
        p.city?.toLowerCase() === propCityFilter.toLowerCase();
      const matchBuilder =
        propBuilderFilter === "ALL" ||
        (p.builderName &&
          p.builderName.toLowerCase().includes(propBuilderFilter.toLowerCase()));
      const matchSearch =
        !propSearch.trim() ||
        p.title?.toLowerCase().includes(propSearch.toLowerCase()) ||
        p.location?.toLowerCase().includes(propSearch.toLowerCase()) ||
        p.city?.toLowerCase().includes(propSearch.toLowerCase()) ||
        p.builderName?.toLowerCase().includes(propSearch.toLowerCase());
      return matchCat && matchCity && matchBuilder && matchSearch;
    });
  }, [properties, propCategoryFilter, propCityFilter, propBuilderFilter, propSearch]);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchProp =
        selectedEnquiryProperty === "ALL" ||
        e.property?._id === selectedEnquiryProperty ||
        e.property === selectedEnquiryProperty;
      const matchStatus =
        enquiryStatusFilter === "ALL" || e.status === enquiryStatusFilter;
      const matchSearch =
        !enquirySearch.trim() ||
        e.name?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
        e.phone?.includes(enquirySearch) ||
        e.email?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
        e.message?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
        e.property?.title?.toLowerCase().includes(enquirySearch.toLowerCase());
      return matchProp && matchStatus && matchSearch;
    });
  }, [enquiries, selectedEnquiryProperty, enquiryStatusFilter, enquirySearch]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchRole =
        userRoleFilter === "ALL" || u.role === userRoleFilter;
      const matchSearch =
        !userSearch.trim() ||
        u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.phone?.includes(userSearch);
      return matchRole && matchSearch;
    });
  }, [users, userRoleFilter, userSearch]);

  // Unique list of builders & cities for filters
  const uniqueBuilders = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      if (p.builderName) set.add(p.builderName);
    });
    return Array.from(set);
  }, [properties]);

  const uniqueCities = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      if (p.city) set.add(p.city);
    });
    return Array.from(set);
  }, [properties]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mb-4" />
        <p className="font-semibold text-lg animate-pulse">Connecting to Edge Expert Database...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-500 text-white border-emerald-400"
                : "bg-rose-500 text-white border-rose-400"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 text-white flex flex-col justify-between hidden lg:flex shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Edge Expert
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-4 space-y-1.5">
            {navSections.map((sec) => {
              const Icon = sec.icon;
              const active = activeSection === sec.key;
              const count =
                sec.key === "properties"
                  ? properties.length
                  : sec.key === "enquiries"
                  ? enquiries.length
                  : sec.key === "users"
                  ? users.length
                  : sec.key === "contacts"
                  ? contacts.length
                  : null;

              return (
                <button
                  key={sec.key}
                  onClick={() => setActiveSection(sec.key)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-400"}`} />
                    <span>{sec.label}</span>
                  </div>
                  {count !== null && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Add & Sign Out */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => {
              setEditingProperty(null);
              setIsPropertyModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Property
          </button>
          <button
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Sign out of Admin
          </button>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              {navSections.find((s) => s.key === activeSection)?.label || "Dashboard"}
            </h2>
            <span className="hidden sm:inline-block text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> MongoDB Atlas Live
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAllData(true)}
              disabled={refreshing}
              className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition cursor-pointer border border-slate-200 flex items-center gap-1.5 text-xs font-bold"
              title="Sync latest data from MongoDB"
            >
              <RefreshCcw className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-600" : ""}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              onClick={() => {
                setEditingProperty(null);
                setIsPropertyModalOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Property
            </button>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* ========================================================= */}
          {/* SECTION 1: OVERVIEW */}
          {/* ========================================================= */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                  title="Total Properties"
                  value={properties.length}
                  subtitle={`${stats?.overview?.activeProperties || properties.length} Available`}
                  icon={Building2}
                  tone="blue"
                  onClick={() => setActiveSection("properties")}
                />
                <StatCard
                  title="Total Enquiries"
                  value={enquiries.length}
                  subtitle={`${enquiries.filter((e) => e.status === "new").length} New Leads`}
                  icon={MessageSquare}
                  tone="amber"
                  onClick={() => setActiveSection("enquiries")}
                />
                <StatCard
                  title="Registered Users"
                  value={users.length}
                  subtitle={`${users.filter((u) => u.role === "broker").length} Brokers`}
                  icon={Users}
                  tone="emerald"
                  onClick={() => setActiveSection("users")}
                />
                <StatCard
                  title="Contact Queries"
                  value={contacts.length}
                  subtitle="Website messages"
                  icon={Mail}
                  tone="purple"
                  onClick={() => setActiveSection("contacts")}
                />
              </div>

              {/* Category Breakdown Bar */}
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-base">
                    Property Categories & Builder Inventory
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Live from database
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {[
                    "Residential",
                    "Luxury",
                    "Commercial",
                    "Affordable",
                    "New Project",
                    "Featured",
                    "PG/Co-living",
                  ].map((cat) => {
                    const count = properties.filter((p) => p.category === cat).length;
                    return (
                      <div
                        key={cat}
                        onClick={() => {
                          setPropCategoryFilter(cat);
                          setActiveSection("properties");
                        }}
                        className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition cursor-pointer text-center"
                      >
                        <p className="text-xs font-bold text-slate-600 truncate">{cat}</p>
                        <p className="text-xl font-black text-slate-900 mt-1">{count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Two Column: Recent Leads & Recent Properties */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" /> Recent Property Enquiries
                      </h3>
                      <button
                        onClick={() => setActiveSection("enquiries")}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        View All ({enquiries.length}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div
                          key={enq._id}
                          className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 truncate">
                                {enq.name}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  enq.status === "new"
                                    ? "bg-amber-100 text-amber-800"
                                    : enq.status === "contacted"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {enq.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              📞 {enq.phone} • {enq.property?.title || enq.propertyType || "General Enquiry"}
                            </p>
                          </div>
                          <a
                            href={`https://wa.me/91${enq.phone?.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                      {enquiries.length === 0 && (
                        <p className="text-sm text-slate-400 py-6 text-center italic">
                          No enquiries yet. Leads from the website will appear here.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Properties */}
                <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-indigo-600" /> Recent Properties
                      </h3>
                      <button
                        onClick={() => setActiveSection("properties")}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Manage All ({properties.length}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {properties.slice(0, 4).map((prop) => (
                        <div
                          key={prop._id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={
                                prop.images?.[0] ||
                                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300"
                              }
                              alt={prop.title}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-slate-900 truncate">
                                {prop.title}
                              </p>
                              <p className="text-xs text-slate-500 truncate">
                                📍 {prop.location}, {prop.city} • ₹{" "}
                                {prop.price
                                  ? prop.price.toLocaleString("en-IN")
                                  : prop.rent?.toLocaleString("en-IN") + "/mo"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setEditingProperty(prop);
                              setIsPropertyModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 2: PROPERTIES MANAGEMENT */}
          {/* ========================================================= */}
          {activeSection === "properties" && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={propSearch}
                      onChange={(e) => setPropSearch(e.target.value)}
                      placeholder="Search properties by title, locality, builder (Mahindra, Godrej, Ace), city (Ayodhya, Pune)..."
                      className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Add Property Button */}
                  <button
                    onClick={() => {
                      setEditingProperty(null);
                      setIsPropertyModalOpen(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add New Property
                  </button>
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Filters:</span>

                  {/* Category */}
                  <select
                    value={propCategoryFilter}
                    onChange={(e) => setPropCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="Residential">Residential</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Affordable">Affordable Housing</option>
                    <option value="New Project">New Project</option>
                    <option value="Featured">Featured</option>
                    <option value="PG/Co-living">PG/Co-living</option>
                  </select>

                  {/* City */}
                  <select
                    value={propCityFilter}
                    onChange={(e) => setPropCityFilter(e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none"
                  >
                    <option value="ALL">All Cities</option>
                    {uniqueCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Ayodhya">Ayodhya</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>

                  {/* Builder */}
                  <select
                    value={propBuilderFilter}
                    onChange={(e) => setPropBuilderFilter(e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none"
                  >
                    <option value="ALL">All Builders / Brands</option>
                    {uniqueBuilders.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                    <option value="Mahindra">Mahindra Lifespaces</option>
                    <option value="Godrej">Godrej Properties</option>
                    <option value="Ace">Ace Group</option>
                    <option value="Lodha">Lodha Group</option>
                  </select>

                  {(propCategoryFilter !== "ALL" ||
                    propCityFilter !== "ALL" ||
                    propBuilderFilter !== "ALL" ||
                    propSearch) && (
                    <button
                      onClick={() => {
                        setPropCategoryFilter("ALL");
                        setPropCityFilter("ALL");
                        setPropBuilderFilter("ALL");
                        setPropSearch("");
                      }}
                      className="text-rose-600 font-bold hover:underline ml-auto"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Properties Table */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5">Property</th>
                        <th className="px-4 py-3.5">Category & Builder</th>
                        <th className="px-4 py-3.5">Location</th>
                        <th className="px-4 py-3.5">Price / Rent</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5">Leads</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProperties.map((p) => {
                        const propEnquiriesCount = enquiries.filter(
                          (e) => e.property?._id === p._id || e.property === p._id
                        ).length;

                        return (
                          <tr key={p._id} className="hover:bg-slate-50/80 transition">
                            {/* Property Details */}
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    p.images?.[0] ||
                                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300"
                                  }
                                  alt={p.title}
                                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                  <span className="font-bold text-slate-900 line-clamp-1">
                                    {p.title}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                    <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                      {p.propertyType}
                                    </span>
                                    {p.bedrooms > 0 && <span>• {p.bedrooms} BHK</span>}
                                    {p.area > 0 && <span>• {p.area} sq.ft</span>}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category & Builder */}
                            <td className="px-4 py-3.5">
                              <div>
                                <span className="inline-block text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full border border-slate-200">
                                  {p.category}
                                </span>
                                {p.builderName && (
                                  <p className="text-xs font-semibold text-slate-600 mt-1">
                                    🏢 {p.builderName}
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Location */}
                            <td className="px-4 py-3.5">
                              <div className="text-xs">
                                <p className="font-bold text-slate-800">{p.location}</p>
                                <p className="text-slate-500">{p.city}</p>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="px-4 py-3.5">
                              <div className="text-xs font-bold">
                                {p.price > 0 && (
                                  <p className="text-slate-900">
                                    ₹ {p.price.toLocaleString("en-IN")}
                                  </p>
                                )}
                                {p.rent > 0 && (
                                  <p className="text-emerald-600">
                                    ₹ {p.rent.toLocaleString("en-IN")}/mo
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Status & Badges */}
                            <td className="px-4 py-3.5">
                              <div className="space-y-1">
                                <span
                                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                    p.status === "available"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : p.status === "under_construction"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-rose-100 text-rose-800"
                                  }`}
                                >
                                  {p.status}
                                </span>
                                <div>
                                  <button
                                    onClick={() => handleToggleFeatured(p)}
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer transition ${
                                      p.featured
                                        ? "bg-amber-50 text-amber-600 border border-amber-200"
                                        : "text-slate-400 hover:text-amber-500"
                                    }`}
                                    title="Click to toggle Featured"
                                  >
                                    <Star
                                      className={`w-3 h-3 ${
                                        p.featured ? "fill-amber-400 text-amber-500" : ""
                                      }`}
                                    />
                                    {p.featured ? "Featured" : "+ Feature"}
                                  </button>
                                </div>
                              </div>
                            </td>

                            {/* Leads count & link */}
                            <td className="px-4 py-3.5">
                              <button
                                onClick={() => {
                                  setSelectedEnquiryProperty(p._id);
                                  setActiveSection("enquiries");
                                }}
                                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                                title="View leads for this property"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                {propEnquiriesCount} Leads
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingProperty(p);
                                    setIsPropertyModalOpen(true);
                                  }}
                                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                  title="Edit Property"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProperty(p._id, p.title)}
                                  className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Delete Property"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredProperties.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                            No properties match your filter. Click "+ Add New Property" above to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 3: PROPERTY-WISE ENQUIRIES & LEADS */}
          {/* ========================================================= */}
          {activeSection === "enquiries" && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      placeholder="Search leads by customer name, phone, email, or message..."
                      className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Summary badge */}
                  <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
                    Showing {filteredEnquiries.length} of {enquiries.length} Enquiries
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">
                    Property Filter:
                  </span>

                  {/* Property Dropdown Selector */}
                  <select
                    value={selectedEnquiryProperty}
                    onChange={(e) => setSelectedEnquiryProperty(e.target.value)}
                    className="max-w-xs px-3 py-1.5 border border-blue-200 bg-blue-50 font-bold text-blue-900 rounded-lg outline-none"
                  >
                    <option value="ALL">🏢 All Properties & General Leads</option>
                    {properties.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title} ({p.location})
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 bg-slate-50 font-semibold text-slate-700 rounded-lg outline-none"
                  >
                    <option value="ALL">All Lead Statuses</option>
                    <option value="new">🟡 New Lead</option>
                    <option value="contacted">🟣 Contacted</option>
                    <option value="follow_up">🟠 Follow Up</option>
                    <option value="converted">🟢 Converted / Deal Done</option>
                    <option value="closed">⚪ Closed</option>
                  </select>

                  {(selectedEnquiryProperty !== "ALL" ||
                    enquiryStatusFilter !== "ALL" ||
                    enquirySearch) && (
                    <button
                      onClick={() => {
                        setSelectedEnquiryProperty("ALL");
                        setEnquiryStatusFilter("ALL");
                        setEnquirySearch("");
                      }}
                      className="text-rose-600 font-bold hover:underline ml-auto"
                    >
                      Reset Leads Filter
                    </button>
                  )}
                </div>
              </div>

              {/* Leads Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEnquiries.map((enq) => {
                  const prop = enq.property;
                  const cleanPhone = enq.phone?.replace(/\D/g, "");

                  return (
                    <div
                      key={enq._id}
                      className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div className="space-y-3">
                        {/* Header: Name + Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{enq.name}</h4>
                            <p className="text-xs text-slate-400">
                              {enq.createdAt
                                ? new Date(enq.createdAt).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })
                                : "Recent"}
                            </p>
                          </div>

                          {/* Quick Status Changer */}
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                            className={`text-[11px] font-bold px-2 py-1 rounded-lg uppercase cursor-pointer outline-none border ${
                              enq.status === "new"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : enq.status === "contacted"
                                ? "bg-purple-50 text-purple-800 border-purple-200"
                                : enq.status === "converted"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="follow_up">Follow Up</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                        {/* Associated Property */}
                        {prop ? (
                          <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center gap-2.5">
                            <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-blue-900 truncate">
                                {prop.title}
                              </p>
                              <p className="text-[11px] text-blue-700">
                                📍 {prop.location} • ₹{" "}
                                {prop.price ? prop.price.toLocaleString("en-IN") : prop.rent}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                            <span className="font-semibold">Type:</span>{" "}
                            {enq.propertyType || "General Property"} •{" "}
                            <span className="font-semibold">Looking to:</span>{" "}
                            {enq.transactionType || "Buy"}
                          </div>
                        )}

                        {/* Customer Message */}
                        {enq.message && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                            "{enq.message}"
                          </div>
                        )}

                        {/* Contact Details */}
                        <div className="text-xs space-y-1 text-slate-600 pt-1">
                          <p className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold">{enq.phone}</span>
                          </p>
                          <p className="flex items-center gap-2 truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{enq.email}</span>
                          </p>
                          {enq.city && (
                            <p className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{enq.city}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions: Call, WhatsApp, Delete */}
                      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                        <div className="flex gap-2">
                          <a
                            href={`tel:${enq.phone}`}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                          >
                            <PhoneCall className="w-3.5 h-3.5" /> Call
                          </a>
                          <a
                            href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(
                              enq.name
                            )},%20thank%20you%20for%20your%20enquiry%20on%20Edge%20Expert%20Real%20Estate!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                        </div>
                        <button
                          onClick={() => handleDeleteEnquiry(enq._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredEnquiries.length === 0 && (
                  <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 italic">
                    No enquiries found matching this filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 4: USER MANAGEMENT */}
          {/* ========================================================= */}
          {activeSection === "users" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name, email, phone..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200 bg-slate-50 font-semibold text-slate-700 rounded-xl text-xs outline-none"
                >
                  <option value="ALL">All Roles ({users.length})</option>
                  <option value="customer">Customers</option>
                  <option value="broker">Brokers</option>
                  <option value="developer">Developers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">User Name</th>
                      <th className="px-4 py-3.5">Email</th>
                      <th className="px-4 py-3.5">Phone</th>
                      <th className="px-4 py-3.5">Role</th>
                      <th className="px-4 py-3.5">Joined</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-3.5 font-bold text-slate-900">{u.name}</td>
                        <td className="px-4 py-3.5 text-slate-600">{u.email}</td>
                        <td className="px-4 py-3.5 text-slate-600">{u.phone || "—"}</td>
                        <td className="px-4 py-3.5">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                            className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-none cursor-pointer"
                          >
                            <option value="customer">Customer</option>
                            <option value="broker">Broker</option>
                            <option value="developer">Developer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleDeleteUser(u._id, u.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 5: CONTACT INQUIRIES */}
          {/* ========================================================= */}
          {activeSection === "contacts" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((c) => (
                  <div
                    key={c._id}
                    className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900">{c.name}</h4>
                        <p className="text-xs text-slate-400">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {c.subject || "Contact Form"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{c.message}"
                    </p>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-500">
                        📧 {c.email} {c.phone ? `• 📞 ${c.phone}` : ""}
                      </span>
                      <a
                        href={`mailto:${c.email}`}
                        className="font-bold text-blue-600 hover:underline"
                      >
                        Reply →
                      </a>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 italic">
                    No contact messages yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================== PROPERTY MODAL ===================== */}
      <PropertyFormModal
        isOpen={isPropertyModalOpen}
        onClose={() => {
          setIsPropertyModalOpen(false);
          setEditingProperty(null);
        }}
        propertyToEdit={editingProperty}
        onSuccess={() => {
          showToast(
            editingProperty
              ? "Property updated successfully!"
              : "New property published to live database!"
          );
          fetchAllData();
        }}
      />
    </div>
  );
}

/* ===================== HELPER STAT CARD ===================== */
function StatCard({ title, value, subtitle, icon: Icon, tone = "blue", onClick }) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-100",
    amber: "bg-amber-500/10 text-amber-600 border-amber-100",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-100",
    purple: "bg-purple-500/10 text-purple-600 border-purple-100",
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between"
    >
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-slate-900 mt-1">{value ?? 0}</p>
        {subtitle && <p className="text-xs font-semibold text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3.5 rounded-2xl border ${tones[tone]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
