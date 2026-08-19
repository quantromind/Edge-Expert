// // src/views/adminpanel/AdminDashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Activity,
//   Building2,
//   Users,
//   Hammer,
//   BarChart3,
//   UserPlus,
//   Pencil,
//   Trash2,
//   AlertCircle,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   Search,
//   ShieldCheck,
//   RefreshCcw,
// } from "lucide-react";
// import API from "../../Api/axiosConfig";
// import AddProperty from "./AddProperty";

// const sections = [
//   {
//     key: "overview",
//     label: "Overview",
//     icon: Activity,
//   },
//   {
//     key: "brokers",
//     label: "Broker Panel",
//     description: "Manage brokers and their portfolios",
//     icon: Building2,
//   },
//   {
//     key: "customers",
//     label: "User Management",
//     description: "Customer insights and lead activity",
//     icon: Users,
//   },
//   {
//     key: "developers",
//     label: "Developer Panel",
//     description: "Developer teams and project oversight",
//     icon: Hammer,
//   },
//   {
//     key: "AddProperty",
//     label: "AddProperty",
//     description : "Add Property",
//     icon: Activity,

//   },
// ];

// const roleLabels = {
//   broker: "Broker",
//   customer: "Customer",
//   developer: "Developer",
//   AddProperty: "AddProperty"
// };

// const roleOptions = [
//   { label: "Broker", value: "broker" },
//   { label: "Customer", value: "customer" },
//   { label: "Developer", value: "developer" },
//   { label: "AddProperty", value: "AddProperty" },

// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// const StatBadge = ({ icon: Icon, label, value, tone = "blue" }) => {
//   const toneClasses = {
//     blue: "bg-blue-50 text-blue-600 border-blue-200",
//     teal: "bg-teal-50 text-teal-600 border-teal-200",
//     purple: "bg-purple-50 text-purple-600 border-purple-200",
//     green: "bg-emerald-50 text-emerald-600 border-emerald-200",
//     amber: "bg-amber-50 text-amber-600 border-amber-200",
//     rose: "bg-rose-50 text-rose-600 border-rose-200",
//   };

//   return (
//     <motion.div
//       variants={itemVariants}
//       className={`flex flex-col gap-3 rounded-2xl border px-5 py-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${toneClasses[tone]}`}
//     >
//       <div className="flex items-center justify-between">
//         <span className="text-sm font-medium uppercase tracking-wide">
//           {label}
//         </span>
//         <Icon className="h-5 w-5" />
//       </div>
//       <span className="text-3xl font-semibold">{value ?? 0}</span>
//     </motion.div>
//   );
// };

// const NotificationBanner = ({ notification, onClose }) => (
//   <AnimatePresence>
//     {notification && (
//       <motion.div
//         initial={{ y: -30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: -30, opacity: 0 }}
//         className={`fixed left-1/2 top-4 z-50 w-full max-w-lg -translate-x-1/2 rounded-lg border px-4 py-3 shadow-lg backdrop-blur ${
//           notification.type === "success"
//             ? "border-emerald-200 bg-emerald-50/90 text-emerald-700"
//             : "border-rose-200 bg-rose-50/90 text-rose-700"
//         }`}
//       >
//         <div className="flex items-start gap-3">
//           {notification.type === "success" ? (
//             <CheckCircle2 className="mt-0.5 h-5 w-5" />
//           ) : (
//             <AlertCircle className="mt-0.5 h-5 w-5" />
//           )}
//           <div className="flex-1 text-sm font-medium">
//             {notification.message}
//           </div>
//           <button
//             onClick={onClose}
//             className="text-sm font-semibold uppercase tracking-wide"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const EmptyState = ({ title, description, action }) => (
//   <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-10 text-center">
//     <ShieldCheck className="h-10 w-10 text-gray-400" />
//     <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//     <p className="text-sm text-gray-500">{description}</p>
//     {action}
//   </div>
// );

// const UserTable = ({ role, users, onCreate, onEdit, onDelete }) => {
//   const [query, setQuery] = useState("");

//   const filteredUsers = useMemo(() => {
//     if (!query.trim()) return users;
//     return users.filter((user) =>
//       [user.name, user.email, user.company, user.phoneNumber]
//         .filter(Boolean)
//         .some((field) => field.toLowerCase().includes(query.toLowerCase()))
//     );
//   }, [query, users]);

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">
//             {roleLabels[role]} Directory
//           </h2>
//           <p className="text-sm text-gray-500">
//             Manage all {roleLabels[role]?.toLowerCase()} accounts and permissions
//           </p>
//         </div>
//         <button
//           onClick={onCreate}
//           className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
//         >
//           <UserPlus className="h-4 w-4" />
//           Add {roleLabels[role]}
//         </button>
//       </div>

//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div className="relative w-full max-w-xs">
//           <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder={`Search ${roleLabels[role]}...`}
//             className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//           />
//         </div>
//         <div className="text-sm text-gray-500">
//           {filteredUsers.length} result{filteredUsers.length === 1 ? "" : "s"}
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
//                 Name
//               </th>
//               <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
//                 Email
//               </th>
//               <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
//                 Company
//               </th>
//               <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
//                 Phone
//               </th>
//               <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
//                 Created
//               </th>
//               <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 bg-white">
//             {filteredUsers.length ? (
//               filteredUsers.map((user) => (
//                 <tr key={user._id} className="group hover:bg-gray-50">
//                   <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800">
//                     <div className="flex flex-col">
//                       <span>{user.name}</span>
//                       <span className="text-xs text-gray-400">
//                         ID: {user._id.slice(-6)}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
//                     {user.email}
//                   </td>
//                   <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
//                     {user.company || "—"}
//                   </td>
//                   <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
//                     {user.phoneNumber || "—"}
//                   </td>
//                   <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="whitespace-nowrap px-5 py-4 text-right text-sm">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() => onEdit(user)}
//                         className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
//                         title="Edit user"
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </button>
//                       <button
//                         onClick={() => onDelete(user)}
//                         className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
//                         title="Delete user"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="px-5 py-10">
//                   <EmptyState
//                     title="No profiles found"
//                     description={`Start by adding a new ${roleLabels[role]?.toLowerCase()} profile.`}
//                     action={
//                       <button
//                         onClick={onCreate}
//                         className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
//                       >
//                         <UserPlus className="h-4 w-4" />
//                         Add {roleLabels[role]}
//                       </button>
//                     }
//                   />
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const UserModal = ({ open, mode, role, initialData, onSubmit, onClose, loading }) => {
//   const [formState, setFormState] = useState({
//     name: "",
//     email: "",
//     role,
//     password: "",
//     phoneNumber: "",
//     company: "",
//     location: "",
//   });

//   useEffect(() => {
//     if (open) {
//       setFormState({
//         name: initialData?.name || "",
//         email: initialData?.email || "",
//         role: initialData?.role || role,
//         password: "",
//         phoneNumber: initialData?.phoneNumber || "",
//         company: initialData?.company || "",
//         location: initialData?.location || "",
//       });
//     }
//   }, [open, initialData, role]);

//   const handleChange = (field, value) => {
//     setFormState((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formState);
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
//           >
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {mode === "create" ? "Create" : "Update"} {roleLabels[formState.role] || "User"}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Configure profile details and access level
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 transition hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <label className="space-y-2 text-sm font-medium text-gray-700">
//                   Full name
//                   <input
//                     required
//                     type="text"
//                     value={formState.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   />
//                 </label>
//                 <label className="space-y-2 text-sm font-medium text-gray-700">
//                   Email address
//                   <input
//                     required
//                     type="email"
//                     value={formState.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   />
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <label className="space-y-2 text-sm font-medium text-gray-700">
//                   Role
//                   <select
//                     required
//                     value={formState.role}
//                     onChange={(e) => handleChange("role", e.target.value)}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   >
//                     {roleOptions.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//                 <label className="space-y-2 text-sm font-medium text-gray-700">
//                   Company
//                   <input
//                     type="text"
//                     value={formState.company}
//                     onChange={(e) => handleChange("company", e.target.value)}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   />
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <label className="space-y-2 text-sm font-medium text-gray-700">
//                   Phone number
//                   <input
//                     type="text"
//                     value={formState.phoneNumber}
//                     onChange={(e) => handleChange("phoneNumber", e.target.value)}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   />
//                 </label>
//                 <label className="space-y-2 text-sm font-medium text-gray-700">
//                   Location
//                   <input
//                     type="text"
//                     value={formState.location}
//                     onChange={(e) => handleChange("location", e.target.value)}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   />
//                 </label>
//               </div>

//               <label className="space-y-2 text-sm font-medium text-gray-700">
//                 {mode === "create" ? "Temporary password" : "Reset password"}
//                 <input
//                   type="password"
//                   value={formState.password}
//                   onChange={(e) => handleChange("password", e.target.value)}
//                   placeholder={
//                     mode === "create"
//                       ? "Minimum 8 characters"
//                       : "Leave blank to keep current password"
//                   }
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                 />
//               </label>

//               <div className="flex items-center justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loading && <RefreshCcw className="h-4 w-4 animate-spin" />}
//                   {mode === "create" ? "Create" : "Save"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// const DeleteDialog = ({ open, user, onConfirm, onCancel, loading }) => (
//   <AnimatePresence>
//     {open && (
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
//         >
//           <div className="mb-4 flex items-center gap-3 text-rose-600">
//             <AlertCircle className="h-6 w-6" />
//             <h3 className="text-lg font-semibold">Delete user</h3>
//           </div>
//           <p className="text-sm text-gray-600">
//             You are about to permanently remove <strong>{user?.name}</strong>. This
//             action cannot be undone.
//           </p>
//           <div className="mt-6 flex items-center justify-end gap-3">
//             <button
//               onClick={onCancel}
//               className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               disabled={loading}
//               className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading && <RefreshCcw className="h-4 w-4 animate-spin" />}
//               Delete permanently
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("overview");
//   const [stats, setStats] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [leads, setLeads] = useState([]);
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalState, setModalState] = useState({
//     open: false,
//     mode: "create",
//     role: "broker",
//     user: null,
//   });
//   const [deleteState, setDeleteState] = useState({ open: false, user: null });
//   const [actionLoading, setActionLoading] = useState(false);
//   const [notification, setNotification] = useState(null);

//   const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

//   const showNotification = (type, message) => {
//     setNotification({ type, message });
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const [statsRes, usersRes, propsRes, leadsRes, meetingsRes] = await Promise.all([
//           API.get("/admin/dashboard"),
//           API.get("/admin/users"),
//           API.get("/admin/properties"),
//           API.get("/admin/leads"),
//           API.get("/admin/meetings"),
//         ]);

//         setStats(statsRes.data.data || {});
//         setUsers(usersRes.data.data || []);
//         setProperties(propsRes.data.data || []);
//         setLeads(leadsRes.data.data || []);
//         setMeetings(meetingsRes.data.data || []);
//       } catch (error) {
//         console.error("Admin dashboard fetch error", error);
//         showNotification(
//           "error",
//           error.response?.data?.message || "Failed to load admin data"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [token, navigate]);

//   useEffect(() => {
//     if (!notification) return;
//     const timer = setTimeout(() => setNotification(null), 4000);
//     return () => clearTimeout(timer);
//   }, [notification]);

//   const filteredUsersByRole = useMemo(
//     () => ({
//       broker: users.filter((user) => user.role === "broker"),
//       customer: users.filter((user) => user.role === "customer"),
//       developer: users.filter((user) => user.role === "developer"),
//     }),
//     [users]
//   );

//   const userRoleChartData = useMemo(
//     () =>
//       Object.entries(filteredUsersByRole).map(([role, list]) => ({
//         role: roleLabels[role],
//         value: list.length,
//       })),
//     [filteredUsersByRole]
//   );

//   const openModal = (mode, role, user = null) => {
//     setModalState({ open: true, mode, role, user });
//   };

//   const closeModal = () => {
//     setModalState({ open: false, mode: "create", role: "broker", user: null });
//   };

//   const refreshUsers = async () => {
//     const response = await API.get("/admin/users");
//     setUsers(response.data.data || []);
//   };

//   const handleModalSubmit = async (formState) => {
//     setActionLoading(true);
//     try {
//       if (modalState.mode === "create") {
//         const payload = {
//           name: formState.name,
//           email: formState.email,
//           role: formState.role,
//           phoneNumber: formState.phoneNumber,
//           company: formState.company,
//           location: formState.location,
//         };
//         // Only include password if provided
//         if (formState.password && formState.password.trim()) {
//           payload.password = formState.password.trim();
//         }
//         await API.post("/admin/users", payload);
//         showNotification(
//           "success",
//           `${roleLabels[formState.role]} created successfully`
//         );
//       } else if (modalState.user?._id) {
//         const payload = {
//           name: formState.name,
//           email: formState.email,
//           role: formState.role,
//           phoneNumber: formState.phoneNumber,
//           company: formState.company,
//           location: formState.location,
//         };
//         if (formState.password && formState.password.trim()) {
//           payload.password = formState.password.trim();
//         }
//         await API.put(`/admin/users/${modalState.user._id}`, payload);
//         showNotification(
//           "success",
//           `${roleLabels[formState.role]} updated successfully`
//         );
//       }
//       await refreshUsers();
//       closeModal();
//     } catch (error) {
//       console.error("Admin user save error", error);
//       showNotification(
//         "error",
//         error.response?.data?.message || "Unable to save user"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!deleteState.user) return;
//     setActionLoading(true);
//     try {
//       await API.delete(`/admin/users/${deleteState.user._id}`);
//       showNotification(
//         "success",
//         `${deleteState.user.name} removed successfully`
//       );
//       await refreshUsers();
//       setDeleteState({ open: false, user: null });
//     } catch (error) {
//       console.error("Admin delete user error", error);
//       showNotification(
//         "error",
//         error.response?.data?.message || "Unable to delete user"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center"
//         >
//           <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
//           <p className="text-lg font-semibold text-gray-700">
//             Preparing admin experience...
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <NotificationBanner
//         notification={notification}
//         onClose={() => setNotification(null)}
//       />

//       <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-gray-200 bg-white/90 px-6 py-8 shadow-xl backdrop-blur lg:flex">
//         <div className="mb-10">
//           <div className="flex items-center gap-3">
//             <div className="rounded-xl bg-blue-600/90 p-3 text-white shadow">
//               <BarChart3 className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm uppercase tracking-widest text-blue-600">
//                 Edge Experts
//               </p>
//               <h1 className="text-xl font-bold text-gray-900">Admin Control</h1>
//             </div>
//           </div>
//         </div>

//         <nav className="space-y-2">
//           {sections.map((section) => {
//             const Icon = section.icon;
//             const isActive = activeSection === section.key;
//             return (
//               <button
//                 key={section.key}
//                 onClick={() => setActiveSection(section.key)}
//                 className={`w-full rounded-xl border px-4 py-3 text-left cursor-pointer transition-all ${
//                   isActive
//                     ? "border-blue-200 bg-blue-50/80 text-blue-600 shadow"
//                     : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`rounded-lg p-2 ${
//                       isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
//                     }`}
//                   >
//                     <Icon className="h-5 w-5" />
//                   </span>
//                   <div className="flex flex-col">
//                     <span className="font-semibold">{section.label}</span>
//                     <span className="text-xs text-gray-400">
//                       {section.description}
//                     </span>
//                   </div>
//                 </div>
//               </button>
//             );
//           })}
//         </nav>

//         {/* <div className="mt-auto rounded-2xl border border-gray-200 bg-gray-50 p-4">
//           <h3 className="text-sm font-semibold text-gray-800">Quick tips</h3>
//           <p className="mt-2 text-xs text-gray-500">
//             Review panel data before approving large changes. You can switch
//             sections anytime from this sidebar.
//           </p>
//         </div> */}

//         <button
//           onClick={logout}
//           className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
//         >
//           Sign out
//         </button>
//       </aside>

//       <main className="flex-1 px-4 py-8 sm:px-10 lg:px-12">
//         <motion.div
//           className="mx-auto flex w-full max-w-6xl flex-col gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <header className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <p className="text-sm uppercase tracking-widest text-blue-600">
//                 Admin Workspace
//               </p>
//               <h2 className="text-3xl font-bold text-gray-900">
//                 {sections.find((section) => section.key === activeSection)?.label}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {sections.find((section) => section.key === activeSection)?.description}
//               </p>
//             </div>
//           </header>

//           {activeSection === "overview" && (
//             <motion.section className="space-y-8" variants={itemVariants}>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
//                 <StatBadge
//                   icon={Building2}
//                   label="Developers"
//                   value={stats?.totalDevelopers}
//                   tone="blue"
//                 />
//                 <StatBadge
//                   icon={Users}
//                   label="Brokers"
//                   value={stats?.totalBrokers}
//                   tone="teal"
//                 />
//                 <StatBadge
//                   icon={Users}
//                   label="Customers"
//                   value={stats?.totalCustomers}
//                   tone="purple"
//                 />
//                 <StatBadge

//                   icon={Activity}
//                   label="Properties"
//                   value={stats?.totalProperties}
//                   tone="green"
//                 />
//                 <StatBadge
//                   icon={ShieldCheck}
//                   label="Leads"
//                   value={stats?.totalLeads}
//                   tone="amber"
//                 />
//                 <StatBadge
//                   icon={Clock}
//                   label="Meetings"
//                   value={stats?.totalMeetings}
//                   tone="rose"
//                 />
//               </div>

//               <motion.div
//                 className="grid grid-cols-1 gap-6 lg:grid-cols-2"
//                 variants={itemVariants}
//               >
//                 <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     User distribution
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Snapshot of roles across the platform
//                   </p>
//                   <div className="mt-6">
//                     {userRoleChartData.length ? (
//                       <ul className="space-y-3 text-sm">
//                         {userRoleChartData.map((entry) => (
//                           <li
//                             key={entry.role}
//                             className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
//                           >
//                             <span className="font-medium text-gray-700">
//                               {entry.role}
//                             </span>
//                             <span className="font-semibold text-gray-900">
//                               {entry.value}
//                             </span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <EmptyState
//                         title="No user data"
//                         description="Create broker, customer, or developer profiles to populate the overview charts."
//                         action={null}
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Recent meetings
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Track upcoming and recently completed meetings
//                   </p>
//                   <div className="mt-6 space-y-4">
//                     {meetings.length ? (
//                       meetings.slice(0, 5).map((meeting) => (
//                         <div
//                           key={meeting._id}
//                           className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
//                         >
//                           <div>
//                             <p className="text-sm font-semibold text-gray-800">
//                               {meeting.title}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(meeting.datetime).toLocaleString()} ·{" "}
//                               {meeting.broker?.name || "Broker"}
//                             </p>
//                           </div>
//                           <span
//                             className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//                               meeting.status === "completed"
//                                 ? "bg-emerald-100 text-emerald-700"
//                                 : meeting.status === "scheduled"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : "bg-gray-100 text-gray-600"
//                             }`}
//                           >
//                             {meeting.status}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <EmptyState
//                         title="No meetings yet"
//                         description="Coordinate with brokers and customers to schedule touchpoints."
//                         action={null}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.section>
//           )}

//           {activeSection === "brokers" && (
//             <motion.section variants={itemVariants}>
//               <UserTable
//                 role="broker"
//                 users={filteredUsersByRole.broker}
//                 onCreate={() => openModal("create", "broker")}
//                 onEdit={(user) => openModal("edit", user.role, user)}
//                 onDelete={(user) => setDeleteState({ open: true, user })}
//               />
//             </motion.section>
//           )}

//           {activeSection === "customers" && (
//             <motion.section variants={itemVariants}>
//               <UserTable
//                 role="customer"
//                 users={filteredUsersByRole.customer}
//                 onCreate={() => openModal("create", "customer")}
//                 onEdit={(user) => openModal("edit", user.role, user)}
//                 onDelete={(user) => setDeleteState({ open: true, user })}
//               />
//             </motion.section>
//           )}

//           {activeSection === "developers" && (
//             <motion.section variants={itemVariants}>
//               <UserTable
//                 role="developer"
//                 users={filteredUsersByRole.developer}
//                 onCreate={() => openModal("create", "developer")}
//                 onEdit={(user) => openModal("edit", user.role, user)}
//                 onDelete={(user) => setDeleteState({ open: true, user })}
//               />
//             </motion.section>
//           )}
//         </motion.div>
//       </main>

//       <UserModal
//         open={modalState.open}
//         mode={modalState.mode}
//         role={modalState.role}
//         initialData={modalState.user}
//         onSubmit={handleModalSubmit}
//         onClose={closeModal}
//         loading={actionLoading}
//       />
//       <DeleteDialog
//         open={deleteState.open}
//         user={deleteState.user}
//         onConfirm={handleDeleteUser}
//         onCancel={() => setDeleteState({ open: false, user: null })}
//         loading={actionLoading}
//       />
//     </div>
//   );
// }





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
} from "lucide-react";
import API from "../../Api/axiosConfig";
import AddProperty from "./AddProperty";

/* ===================== SIDEBAR SECTIONS ===================== */
const sections = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "brokers", label: "Broker Panel", icon: Building2 },
  { key: "customers", label: "User Management", icon: Users },
  { key: "developers", label: "Developer Panel", icon: Hammer },
  { key: "add-property", label: "Add Property", icon: Activity },
];

/* ===================== ROLE LABELS ===================== */
const roleLabels = {
  broker: "Broker",
  customer: "Customer",
  developer: "Developer",
};

const roleOptions = [
  { label: "Broker", value: "broker" },
  { label: "Customer", value: "customer" },
  { label: "Developer", value: "developer" },
];

/* ===================== ANIMATION ===================== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ===================== MAIN COMPONENT ===================== */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  /* ======================   AUTH CHECK   ====================== */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          API.get("/admin/dashboard"),
          API.get("/admin/users"),
        ]);
        setStats(statsRes.data.data || {});
        setUsers(usersRes.data.data || []);
      } catch (err) {
        console.error(err); //this is the life
      } finally {   
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, token]);

  /* ===================== FILTER USERS ===================== */
  const filteredUsers = useMemo(
    () => ({
      broker: users.filter((u) => u.role === "broker"),
      customer: users.filter((u) => u.role === "customer"),
      developer: users.filter((u) => u.role === "developer"),
    }),
    [users]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-72 bg-white border-r px-6 py-8 hidden lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl text-white">
            <BarChart3 />
          </div>
          <h1 className="text-xl font-bold">Edge Expert Admin</h1>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const active = activeSection === section.key;
            return (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {section.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
          className="mt-8 w-full rounded-xl bg-rose-50 text-rose-600 py-2 font-semibold"
        >
          Sign out
        </button>
      </aside>

      {/* ===================== CONTENT ===================== */}
      <main className="flex-1 p-6">
        {/* OVERVIEW */}
        {activeSection === "overview" && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Stat label="Brokers" value={stats.totalBrokers} />
              <Stat label="Customers" value={stats.totalCustomers} />
              <Stat label="Developers" value={stats.totalDevelopers} />
              <Stat label="Properties" value={stats.totalProperties} />
            </div>
          </motion.div>
        )}

        {/* USERS */}
        {["brokers", "customers", "developers"].includes(activeSection) && (
          <UserTable
            role={activeSection.slice(0, -1)}
            users={filteredUsers[activeSection.slice(0, -1)]}
          />
        )}

        {/* ✅ ADD PROPERTY */}
        {activeSection === "add-property" && (
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <AddProperty />
          </motion.div>
        )}
      </main>
    </div>
  );
}

/* ===================== SMALL COMPONENTS ===================== */

const Stat = ({ label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold">{value || 0}</p>
  </div>
);

const UserTable = ({ role, users }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-xl font-bold mb-4">{role} list</h2>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-b">
            <td className="py-2">{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
