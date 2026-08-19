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
  LayoutGrid,
  ListFilter,
  ArrowUpRight,
  Send,
  Calendar,
  LogOut,
  Bell,
  CheckCheck,
} from "lucide-react";
import API from "../../Api/axiosConfig";
import PropertyFormModal from "./PropertyFormModal";
import PropertyQuickViewModal from "./PropertyQuickViewModal";

/* ===================== SIDEBAR NAVIGATION ITEMS ===================== */
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
  const [propStatusFilter, setPropStatusFilter] = useState("ALL");
  const [propSearch, setPropSearch] = useState("");
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [quickViewProperty, setQuickViewProperty] = useState(null);

  // Enquiry Filters
  const [selectedEnquiryProperty, setSelectedEnquiryProperty] = useState("ALL");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("ALL");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryViewMode, setEnquiryViewMode] = useState("table"); // 'table' | 'cards'

  // User Filter
  const [userRoleFilter, setUserRoleFilter] = useState("ALL");
  const [userSearch, setUserSearch] = useState("");

  // Contact Filter
  const [contactSearch, setContactSearch] = useState("");

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

  /* ====================== CONTACT ACTIONS ====================== */
  const handleDeleteContact = async (contactId) => {
    if (!window.confirm("Delete this contact message?")) return;
    try {
      await API.delete(`/contact/${contactId}`);
      showToast("Contact query deleted.");
      setContacts((prev) => prev.filter((c) => c._id !== contactId));
    } catch (err) {
      console.error(err);
      showToast("Failed to delete contact query.", "error");
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
      const matchStatus =
        propStatusFilter === "ALL" || p.status === propStatusFilter;
      const matchSearch =
        !propSearch.trim() ||
        p.title?.toLowerCase().includes(propSearch.toLowerCase()) ||
        p.location?.toLowerCase().includes(propSearch.toLowerCase()) ||
        p.city?.toLowerCase().includes(propSearch.toLowerCase()) ||
        p.builderName?.toLowerCase().includes(propSearch.toLowerCase());
      return matchCat && matchCity && matchBuilder && matchStatus && matchSearch;
    });
  }, [
    properties,
    propCategoryFilter,
    propCityFilter,
    propBuilderFilter,
    propStatusFilter,
    propSearch,
  ]);

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

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        !contactSearch.trim() ||
        c.name?.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.email?.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.subject?.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.message?.toLowerCase().includes(contactSearch.toLowerCase());
      return matchSearch;
    });
  }, [contacts, contactSearch]);

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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-400 border-t-transparent mb-4" />
        <p className="font-semibold text-lg animate-pulse tracking-wide">Connecting to Edge Expert Database...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
                : "bg-rose-600 text-white border-rose-500 shadow-rose-500/20"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-68 bg-[#0F172A] border-r border-slate-800/80 text-white flex flex-col justify-between hidden lg:flex shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Building2 className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                Edge Expert
              </h1>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-md border border-teal-400/20 mt-0.5">
                ADMIN PANEL
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                    active
                      ? "bg-teal-500/15 text-teal-300 font-semibold border border-teal-500/30 shadow-xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-teal-400" : "text-slate-400"}`} />
                    <span>{sec.label}</span>
                  </div>
                  {count !== null && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        active
                          ? "bg-teal-400/20 text-teal-300 border border-teal-400/30"
                          : "bg-slate-800 text-slate-400"
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
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => {
              setEditingProperty(null);
              setIsPropertyModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Property
          </button>
          <button
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl text-xs font-semibold transition cursor-pointer border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT AREA ===================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/90 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          {/* Title & Live Status */}
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {navSections.find((s) => s.key === activeSection)?.label || "Dashboard Overview"}
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live DB
            </span>
          </div>

          {/* Quick Header Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Global Search shortcut in header */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={
                  activeSection === "properties"
                    ? propSearch
                    : activeSection === "enquiries"
                    ? enquirySearch
                    : activeSection === "users"
                    ? userSearch
                    : contactSearch
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (activeSection === "properties") setPropSearch(val);
                  else if (activeSection === "enquiries") setEnquirySearch(val);
                  else if (activeSection === "users") setUserSearch(val);
                  else setContactSearch(val);
                }}
                placeholder="Quick search records..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>

            {/* Sync DB Button */}
            <button
              onClick={() => fetchAllData(true)}
              disabled={refreshing}
              className="px-3 py-1.5 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-xl transition cursor-pointer border border-slate-200 flex items-center gap-1.5 text-xs font-semibold"
              title="Sync latest data from MongoDB"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-teal-600" : ""}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            {/* Role Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Role: Admin</span>
            </div>

            {/* Add Property Button */}
            <button
              onClick={() => {
                setEditingProperty(null);
                setIsPropertyModalOpen(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </button>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-5 sm:p-7 max-w-[1400px] w-full mx-auto space-y-6">
          {/* ========================================================= */}
          {/* SECTION 1: OVERVIEW */}
          {/* ========================================================= */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Header Title Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-teal-600" /> Edge Expert Real Estate Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Central lead, inventory & user management connected to MongoDB Atlas Live.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSection("properties")}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer shadow-2xs flex items-center gap-1"
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> View Inventory
                  </button>
                  <button
                    onClick={() => setActiveSection("enquiries")}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer shadow-2xs flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600" /> View Leads
                  </button>
                </div>
              </div>

              {/* 4 Hero KPI Cards (Inspired by Reference UI) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroKpiCard
                  title="TOTAL PROPERTIES"
                  count={properties.length}
                  subtitle={`${properties.filter((p) => p.status === "available").length} Available`}
                  icon={Building2}
                  badgeTone="teal"
                  onClick={() => setActiveSection("properties")}
                />
                <HeroKpiCard
                  title="TOTAL LEADS & ENQUIRIES"
                  count={enquiries.length}
                  subtitle={`${enquiries.filter((e) => e.status === "new").length} New Leads`}
                  icon={MessageSquare}
                  badgeTone="blue"
                  onClick={() => setActiveSection("enquiries")}
                />
                <HeroKpiCard
                  title="REGISTERED USERS"
                  count={users.length}
                  subtitle={`${users.filter((u) => u.role === "broker").length} Brokers`}
                  icon={Users}
                  badgeTone="amber"
                  onClick={() => setActiveSection("users")}
                />
                <HeroKpiCard
                  title="CONTACT QUERIES"
                  count={contacts.length}
                  subtitle="Website messages"
                  icon={Mail}
                  badgeTone="purple"
                  onClick={() => setActiveSection("contacts")}
                />
              </div>

              {/* 4 Summary / Metric Breakdown Cards (By Category, By City, By Status, Top Builders) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. By Category */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-600" /> By Category
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {properties.length} Total
                    </span>
                  </div>
                  <div className="space-y-2">
                    {["Residential", "Luxury", "Commercial", "Affordable", "New Project", "PG/Co-living"].map((cat) => {
                      const count = properties.filter((p) => p.category === cat).length;
                      return (
                        <div
                          key={cat}
                          onClick={() => {
                            setPropCategoryFilter(cat);
                            setActiveSection("properties");
                          }}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        >
                          <span className="text-slate-600 font-medium">{cat}</span>
                          <span className="px-2 py-0.5 bg-teal-50 text-teal-700 font-bold rounded-md border border-teal-100/80">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. By City / Location */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> By Location
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">Top Hubs</span>
                  </div>
                  <div className="space-y-2">
                    {(uniqueCities.length > 0 ? uniqueCities.slice(0, 6) : ["Pune", "Mumbai", "Ayodhya", "Thane"]).map((city) => {
                      const count = properties.filter(
                        (p) => p.city?.toLowerCase() === city.toLowerCase()
                      ).length;
                      return (
                        <div
                          key={city}
                          onClick={() => {
                            setPropCityFilter(city);
                            setActiveSection("properties");
                          }}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        >
                          <span className="text-slate-600 font-medium truncate">{city}</span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-md border border-blue-100/80">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. By Lead Status */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" /> By Lead Status
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {enquiries.length} Leads
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { status: "new", label: "New Leads", bg: "bg-blue-50 text-blue-700 border-blue-100" },
                      { status: "contacted", label: "Contacted", bg: "bg-purple-50 text-purple-700 border-purple-100" },
                      { status: "follow_up", label: "Follow Up", bg: "bg-amber-50 text-amber-700 border-amber-100" },
                      { status: "converted", label: "Converted", bg: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                      { status: "closed", label: "Closed", bg: "bg-slate-100 text-slate-600 border-slate-200" },
                    ].map((st) => {
                      const count = enquiries.filter((e) => e.status === st.status).length;
                      return (
                        <div
                          key={st.status}
                          onClick={() => {
                            setEnquiryStatusFilter(st.status);
                            setActiveSection("enquiries");
                          }}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        >
                          <span className="text-slate-600 font-medium">{st.label}</span>
                          <span className={`px-2 py-0.5 font-bold rounded-md border ${st.bg}`}>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Top Builders & Inventory */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Top Builders
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">Inventory</span>
                  </div>
                  <div className="space-y-2">
                    {(uniqueBuilders.length > 0
                      ? uniqueBuilders.slice(0, 6)
                      : ["Mahindra Lifespaces", "Godrej", "Ace Group", "Lodha"]
                    ).map((b) => {
                      const count = properties.filter((p) => p.builderName === b).length;
                      return (
                        <div
                          key={b}
                          onClick={() => {
                            setPropBuilderFilter(b);
                            setActiveSection("properties");
                          }}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        >
                          <span className="text-slate-600 font-medium truncate">{b}</span>
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 font-bold rounded-md border border-purple-100/80">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Two Column: Recent Leads & Recent Properties */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-teal-600" /> Recent Property Enquiries
                      </h3>
                      <button
                        onClick={() => setActiveSection("enquiries")}
                        className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                      >
                        View All ({enquiries.length}) <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div
                          key={enq._id}
                          className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900 truncate">
                                {enq.name}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                                  enq.status === "new"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : enq.status === "contacted"
                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                              >
                                {enq.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              📞 {enq.phone} • {enq.property?.title || enq.propertyType || "General Enquiry"}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <a
                              href={`https://wa.me/91${enq.phone?.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition"
                              title="WhatsApp Lead"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:${enq.phone}`}
                              className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition"
                              title="Call Lead"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                      {enquiries.length === 0 && (
                        <p className="text-xs text-slate-400 py-6 text-center italic">
                          No enquiries yet. Leads from the website will appear here.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Properties */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-600" /> Recent Properties
                      </h3>
                      <button
                        onClick={() => setActiveSection("properties")}
                        className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                      >
                        Manage All ({properties.length}) <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {properties.slice(0, 4).map((prop) => (
                        <div
                          key={prop._id}
                          className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={
                                prop.images?.[0] ||
                                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300"
                              }
                              alt={prop.title}
                              className="w-11 h-11 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-xs text-slate-900 truncate">
                                {prop.title}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                📍 {prop.location}, {prop.city} • ₹{" "}
                                {prop.price
                                  ? prop.price.toLocaleString("en-IN")
                                  : prop.rent?.toLocaleString("en-IN") + "/mo"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setQuickViewProperty(prop)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingProperty(prop);
                                setIsPropertyModalOpen(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition"
                              title="Edit Property"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
              {/* Filter Bar Toolbar */}
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/90 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[260px]">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={propSearch}
                      onChange={(e) => setPropSearch(e.target.value)}
                      placeholder="Search by title, location, builder (Mahindra, Godrej), city (Ayodhya, Pune)..."
                      className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  {/* Add Property Button */}
                  <button
                    onClick={() => {
                      setEditingProperty(null);
                      setIsPropertyModalOpen(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add New Property
                  </button>
                </div>

                {/* Filter Dropdowns Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Filters:
                  </span>

                  {/* Category */}
                  <select
                    value={propCategoryFilter}
                    onChange={(e) => setPropCategoryFilter(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none cursor-pointer"
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
                    className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none cursor-pointer"
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
                    className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="ALL">All Builders</option>
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

                  {/* Status */}
                  <select
                    value={propStatusFilter}
                    onChange={(e) => setPropStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="available">Available</option>
                    <option value="under_construction">Under Construction</option>
                    <option value="sold">Sold Out</option>
                  </select>

                  {(propCategoryFilter !== "ALL" ||
                    propCityFilter !== "ALL" ||
                    propBuilderFilter !== "ALL" ||
                    propStatusFilter !== "ALL" ||
                    propSearch) && (
                    <button
                      onClick={() => {
                        setPropCategoryFilter("ALL");
                        setPropCityFilter("ALL");
                        setPropBuilderFilter("ALL");
                        setPropStatusFilter("ALL");
                        setPropSearch("");
                      }}
                      className="text-rose-600 font-bold hover:underline ml-auto text-xs"
                    >
                      Clear Filters
                    </button>
                  )}

                  <span className="ml-auto text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {filteredProperties.length} Properties
                  </span>
                </div>
              </div>

              {/* Properties Table Container */}
              <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/90 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Property</th>
                        <th className="px-3 py-3">Category & Builder</th>
                        <th className="px-3 py-3">Location</th>
                        <th className="px-3 py-3">Price / Rent</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Leads</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProperties.map((p) => {
                        const propEnquiriesCount = enquiries.filter(
                          (e) => e.property?._id === p._id || e.property === p._id
                        ).length;

                        return (
                          <tr key={p._id} className="hover:bg-slate-50/70 transition">
                            {/* Property Details */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    p.images?.[0] ||
                                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300"
                                  }
                                  alt={p.title}
                                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div className="min-w-0">
                                  <span className="font-bold text-slate-900 line-clamp-1 text-xs">
                                    {p.title}
                                  </span>
                                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                                    <span className="font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-100">
                                      {p.propertyType}
                                    </span>
                                    {p.bedrooms > 0 && <span>• {p.bedrooms} BHK</span>}
                                    {p.area > 0 && <span>• {p.area} sq.ft</span>}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category & Builder */}
                            <td className="px-3 py-3">
                              <div>
                                <span
                                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    p.category === "Residential"
                                      ? "bg-teal-50 text-teal-700 border-teal-200"
                                      : p.category === "Luxury"
                                      ? "bg-purple-50 text-purple-700 border-purple-200"
                                      : p.category === "Commercial"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  {p.category}
                                </span>
                                {p.builderName && (
                                  <p className="text-[11px] font-semibold text-slate-600 mt-0.5 truncate">
                                    🏢 {p.builderName}
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Location */}
                            <td className="px-3 py-3">
                              <div className="text-xs">
                                <p className="font-bold text-slate-800 truncate">{p.location}</p>
                                <p className="text-slate-500 text-[11px]">{p.city}</p>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-bold">
                                {p.price > 0 && (
                                  <p className="text-slate-900">
                                    ₹ {p.price.toLocaleString("en-IN")}
                                  </p>
                                )}
                                {p.rent > 0 && (
                                  <p className="text-emerald-700">
                                    ₹ {p.rent.toLocaleString("en-IN")}/mo
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Status & Badges */}
                            <td className="px-3 py-3">
                              <div className="space-y-1">
                                <span
                                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                    p.status === "available"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : p.status === "under_construction"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-rose-50 text-rose-700 border-rose-200"
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
                            <td className="px-3 py-3">
                              <button
                                onClick={() => {
                                  setSelectedEnquiryProperty(p._id);
                                  setActiveSection("enquiries");
                                }}
                                className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                title="Filter leads for this property"
                              >
                                <MessageSquare className="w-3 h-3" />
                                {propEnquiriesCount} Leads
                              </button>
                            </td>

                            {/* Actions (Circular outline icon buttons) */}
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Preview */}
                                <button
                                  onClick={() => setQuickViewProperty(p)}
                                  className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 flex items-center justify-center text-slate-500 transition cursor-pointer"
                                  title="View Property Preview"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                {/* Edit */}
                                <button
                                  onClick={() => {
                                    setEditingProperty(p);
                                    setIsPropertyModalOpen(true);
                                  }}
                                  className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-teal-500 hover:text-teal-600 flex items-center justify-center text-slate-500 transition cursor-pointer"
                                  title="Edit Property"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                {/* Delete */}
                                <button
                                  onClick={() => handleDeleteProperty(p._id, p.title)}
                                  className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-rose-500 hover:text-rose-600 flex items-center justify-center text-slate-500 transition cursor-pointer"
                                  title="Delete Property"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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
              {/* Filter Bar Toolbar */}
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/90 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[260px]">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      placeholder="Search leads by customer name, phone, email, message, property..."
                      className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  {/* View Mode Toggle (Table / Cards) */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setEnquiryViewMode("table")}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer ${
                        enquiryViewMode === "table"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <ListFilter className="w-3.5 h-3.5" /> Table View
                    </button>
                    <button
                      onClick={() => setEnquiryViewMode("cards")}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer ${
                        enquiryViewMode === "cards"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" /> Card Grid
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Filters:
                  </span>

                  {/* Property Dropdown Selector */}
                  <select
                    value={selectedEnquiryProperty}
                    onChange={(e) => setSelectedEnquiryProperty(e.target.value)}
                    className="max-w-xs px-2.5 py-1.5 border border-teal-200 bg-teal-50 font-bold text-teal-900 rounded-lg outline-none cursor-pointer"
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
                    className="px-2.5 py-1.5 border border-slate-200 bg-slate-50 font-semibold text-slate-700 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="ALL">All Lead Statuses</option>
                    <option value="new">🟡 New Lead</option>
                    <option value="contacted">🟣 Contacted</option>
                    <option value="follow_up">🟠 Follow Up</option>
                    <option value="converted">🟢 Converted / Won</option>
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
                      className="text-rose-600 font-bold hover:underline ml-auto text-xs"
                    >
                      Reset Filter
                    </button>
                  )}

                  <span className="ml-auto text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    Showing {filteredEnquiries.length} of {enquiries.length} Leads
                  </span>
                </div>
              </div>

              {/* TABLE VIEW: Matching the Reference Screenshot Style */}
              {enquiryViewMode === "table" ? (
                <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/90 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-3 py-3">Contact</th>
                          <th className="px-3 py-3">Channel / Source</th>
                          <th className="px-3 py-3">Property / Requirement</th>
                          <th className="px-3 py-3">Message</th>
                          <th className="px-3 py-3">Status</th>
                          <th className="px-3 py-3">Date</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEnquiries.map((enq) => {
                          const cleanPhone = enq.phone?.replace(/\D/g, "");
                          const prop = enq.property;

                          return (
                            <tr key={enq._id} className="hover:bg-slate-50/70 transition">
                              {/* Name with initials avatar */}
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                                    {enq.name?.charAt(0)?.toUpperCase() || "L"}
                                  </div>
                                  <span className="font-bold text-slate-900">{enq.name}</span>
                                </div>
                              </td>

                              {/* Contact */}
                              <td className="px-3 py-3">
                                <div className="text-xs space-y-0.5">
                                  <p className="font-semibold text-slate-800">{enq.phone}</p>
                                  {enq.email && (
                                    <p className="text-[11px] text-slate-500 truncate max-w-[160px]">
                                      {enq.email}
                                    </p>
                                  )}
                                </div>
                              </td>

                              {/* Channel / Source */}
                              <td className="px-3 py-3">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                                  🌐 Website
                                </span>
                              </td>

                              {/* Property / Requirement */}
                              <td className="px-3 py-3">
                                {prop ? (
                                  <div className="max-w-[180px]">
                                    <p className="font-bold text-slate-900 truncate">
                                      {prop.title}
                                    </p>
                                    <p className="text-[11px] text-slate-500 truncate">
                                      📍 {prop.location} • ₹{" "}
                                      {prop.price ? prop.price.toLocaleString("en-IN") : prop.rent}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                    {enq.propertyType || "General Enquiry"}
                                  </span>
                                )}
                              </td>

                              {/* Message */}
                              <td className="px-3 py-3">
                                <p className="text-xs text-slate-600 italic max-w-[200px] truncate" title={enq.message}>
                                  {enq.message ? `"${enq.message}"` : "—"}
                                </p>
                              </td>

                              {/* Interactive Status Selector */}
                              <td className="px-3 py-3">
                                <select
                                  value={enq.status}
                                  onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                                  className={`text-[11px] font-bold px-2 py-1 rounded-lg uppercase cursor-pointer outline-none border ${
                                    enq.status === "new"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : enq.status === "contacted"
                                      ? "bg-purple-50 text-purple-700 border-purple-200"
                                      : enq.status === "converted"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="follow_up">Follow Up</option>
                                  <option value="converted">Converted</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>

                              {/* Date */}
                              <td className="px-3 py-3 text-slate-500 text-[11px] whitespace-nowrap">
                                {enq.createdAt
                                  ? new Date(enq.createdAt).toLocaleDateString("en-IN", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "2-digit",
                                    })
                                  : "Recent"}
                              </td>

                              {/* Circular Action Icons */}
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* WhatsApp */}
                                  <a
                                    href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(
                                      enq.name
                                    )},%20thank%20you%20for%20your%20enquiry%20on%20Edge%20Expert%20Real%20Estate!`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center text-slate-500 transition"
                                    title="WhatsApp Lead"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                  {/* Call */}
                                  <a
                                    href={`tel:${enq.phone}`}
                                    className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 flex items-center justify-center text-slate-500 transition"
                                    title="Call Lead"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                  {/* Delete */}
                                  <button
                                    onClick={() => handleDeleteEnquiry(enq._id)}
                                    className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-rose-500 hover:text-rose-600 flex items-center justify-center text-slate-500 transition cursor-pointer"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredEnquiries.length === 0 && (
                          <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-slate-400 italic">
                              No enquiries found matching this filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* CARDS GRID VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEnquiries.map((enq) => {
                    const prop = enq.property;
                    const cleanPhone = enq.phone?.replace(/\D/g, "");

                    return (
                      <div
                        key={enq._id}
                        className="bg-white p-5 rounded-2xl shadow-2xs border border-slate-200/90 flex flex-col justify-between hover:shadow-xs transition"
                      >
                        <div className="space-y-3">
                          {/* Header: Name + Status */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{enq.name}</h4>
                              <p className="text-[11px] text-slate-400">
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
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : enq.status === "contacted"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : enq.status === "converted"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
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
                            <div className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100 flex items-center gap-2.5">
                              <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-teal-950 truncate">
                                  {prop.title}
                                </p>
                                <p className="text-[11px] text-teal-700">
                                  📍 {prop.location} • ₹{" "}
                                  {prop.price ? prop.price.toLocaleString("en-IN") : prop.rent}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                              <span className="font-semibold">Type:</span>{" "}
                              {enq.propertyType || "General Property"} •{" "}
                              <span className="font-semibold">Looking to:</span>{" "}
                              {enq.transactionType || "Buy"}
                            </div>
                          )}

                          {/* Customer Message */}
                          {enq.message && (
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
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
                          </div>
                        </div>

                        {/* Card Footer Actions: Call, WhatsApp, Delete */}
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                          <div className="flex gap-2">
                            <a
                              href={`tel:${enq.phone}`}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                            >
                              <PhoneCall className="w-3.5 h-3.5" /> Call
                            </a>
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(
                                enq.name
                              )},%20thank%20you%20for%20your%20enquiry%20on%20Edge%20Expert%20Real%20Estate!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
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
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 4: USER MANAGEMENT */}
          {/* ========================================================= */}
          {activeSection === "users" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[260px]">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name, email, phone..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200 bg-slate-50 font-semibold text-slate-700 rounded-xl text-xs outline-none cursor-pointer"
                >
                  <option value="ALL">All Roles ({users.length})</option>
                  <option value="customer">Customers</option>
                  <option value="broker">Brokers</option>
                  <option value="developer">Developers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/90 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">User Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Joined</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                              {u.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{u.email}</td>
                        <td className="px-4 py-3 text-slate-600">{u.phone || "—"}</td>
                        <td className="px-4 py-3">
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
                        <td className="px-4 py-3 text-xs text-slate-400">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => handleDeleteUser(u._id, u.name)}
                            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-rose-500 hover:text-rose-600 inline-flex items-center justify-center text-slate-400 transition cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[260px]">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    placeholder="Search contact queries by name, email, subject, message..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
                  {filteredContacts.length} Inquiries
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.map((c) => (
                  <div
                    key={c._id}
                    className="bg-white p-5 rounded-2xl shadow-2xs border border-slate-200/90 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                          <p className="text-[11px] text-slate-400">
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })
                              : ""}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {c.subject || "Contact Form"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic leading-relaxed">
                        "{c.message}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                      <span className="text-slate-500 text-[11px]">
                        ✉️ {c.email} {c.phone ? `• 📞 ${c.phone}` : ""}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${c.email}?subject=Response%20from%20Edge%20Expert`}
                          className="font-bold text-teal-700 hover:underline flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Reply
                        </a>
                        <button
                          onClick={() => handleDeleteContact(c._id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition"
                          title="Delete Contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredContacts.length === 0 && (
                  <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 italic">
                    No contact messages found.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================== PROPERTY CREATE/EDIT MODAL ===================== */}
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

      {/* ===================== PROPERTY QUICK VIEW MODAL ===================== */}
      <PropertyQuickViewModal
        isOpen={Boolean(quickViewProperty)}
        onClose={() => setQuickViewProperty(null)}
        property={quickViewProperty}
        onEdit={(prop) => {
          setEditingProperty(prop);
          setIsPropertyModalOpen(true);
        }}
        enquiries={enquiries}
      />
    </div>
  );
}

/* ===================== HERO KPI CARD COMPONENT ===================== */
function HeroKpiCard({ title, count, subtitle, icon: Icon, badgeTone = "teal", onClick }) {
  const tones = {
    teal: {
      bg: "bg-teal-50 text-teal-600 border-teal-100",
      pill: "bg-teal-50 text-teal-700",
    },
    blue: {
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      pill: "bg-blue-50 text-blue-700",
    },
    amber: {
      bg: "bg-amber-50 text-amber-600 border-amber-100",
      pill: "bg-amber-50 text-amber-700",
    },
    purple: {
      bg: "bg-purple-50 text-purple-600 border-purple-100",
      pill: "bg-purple-50 text-purple-700",
    },
  };

  const currentTone = tones[badgeTone] || tones.teal;

  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-2xl shadow-2xs border border-slate-200/90 hover:shadow-xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between"
    >
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-slate-900 mt-1">{count ?? 0}</p>
        {subtitle && (
          <p className="text-[11px] font-semibold text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-2xl border ${currentTone.bg}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
