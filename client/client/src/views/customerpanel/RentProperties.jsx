// // client/src/views/customerpanel/RentProperties.jsx
// import React, { useEffect, useState } from "react";
// import {
//   MapPin,
//   Eye,
//   Heart,
//   Loader,
//   Search,
//   MoreHorizontal,
//   CheckCircle,
//   Trash2,
// } from "lucide-react";
// import API from "../../Api/axiosConfig";

// const Card = ({ children, className = "" }) => (
//   <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
// );
// const CardContent = ({ children, className = "" }) => <div className={`p-5 ${className}`}>{children}</div>;
// const Button = ({ children, onClick, className = "", variant = "default", size = "default" }) => {
//   const base = "inline-flex items-center justify-center rounded-md font-medium transition";
//   const variants = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     outline: "border border-gray-300 bg-white text-gray-700",
//     ghost: "bg-transparent text-gray-600",
//   };
//   const sizes = { default: "px-4 py-2 text-sm", sm: "px-3 py-1.5 text-xs" };
//   return <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</button>;
// };

// const formatCurrency = (amount) => {
//   if (!amount && amount !== 0) return "₹0";
//   if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
//   if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
//   return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
// };

// export default function RentProperties() {
//   const [rent, setRent] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [savedIds, setSavedIds] = useState([]);
//   const [toast, setToast] = useState("");

//   useEffect(() => {
//     fetchRent();
//     fetchSaved();
//   }, []);

//   const fetchRent = async () => {
//     try {
//       const res = await API.get("/rentproperties");
//       setRent(res.data.data || res.data || []);
//     } catch (err) {
//       console.error("Rent fetch error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSaved = async () => {
//     try {
//       const res = await API.get("/customer/saved-properties");
//       const ids = (res.data.data || []).map((i) => i._id);
//       setSavedIds(ids);
//     } catch (err) {
//       console.error("Saved fetch error", err);
//     }
//   };

//   const handleSave = async (id) => {
//     try {
//       if (savedIds.includes(id)) {
//         await API.delete(`/customer/save-property/${id}`);
//         setSavedIds((prev) => prev.filter((x) => x !== id));
//         setToast("Removed from saved");
//       } else {
//         await API.post(`/customer/save-property/${id}`);
//         setSavedIds((prev) => [...prev, id]);
//         setToast("Saved");
//       }
//       setTimeout(() => setToast(""), 2500);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin h-8 w-8 text-blue-600" /></div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-2xl font-semibold">Properties for Rent</h2>
//         <div className="w-72 relative">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//           <input placeholder="Search rent properties..." className="pl-10 pr-3 py-2 border rounded-md w-full" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {rent.map((p) => (
//           <Card key={p._id} className="overflow-hidden">
//             <img src={p.image || p.images?.[0]} alt={p.title} className="w-full h-44 object-cover" />
//             <CardContent>
//               <h3 className="font-semibold text-lg">{p.title}</h3>
//               <p className="text-sm text-gray-600 flex items-center"><MapPin className="mr-2 h-4 w-4" />{p.location}</p>
//               <div className="mt-3 flex items-center justify-between">
//                 <div className="text-lg font-bold">{formatCurrency(p.price)}</div>
//                 <div className="flex gap-2">
//                   <Button variant="ghost" size="sm" onClick={() => handleSave(p._id)}>{savedIds.includes(p._id) ? "Saved" : "Save"}</Button>
//                   <Button onClick={() => window.alert("Open details")} variant="default" size="sm"><Eye className="h-4 w-4 mr-2" />View</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {toast && <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded">{toast}</div>}
//     </div>
//   );
// }


// client/src/views/customerpanel/RentProperties.jsx
import React, { useEffect, useState } from "react";
import { MapPin, Eye, Heart, Loader, Search, CheckCircle } from "lucide-react";
import API from "../../Api/axiosConfig";

const placeholder = "https://images.unsplash.com/photo-1560184897-e20f8c6f46f2?w=1200&q=60&auto=format&fit=crop";

const Card = ({ children, className = "" }) => <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`p-5 ${className}`}>{children}</div>;
const Button = ({ children, onClick, className = "", variant = "default", size = "default" }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition";
  const variants = { default: "bg-blue-600 text-white hover:bg-blue-700", outline: "border border-gray-300 bg-white text-gray-700", ghost: "bg-transparent text-gray-600 hover:bg-gray-100" };
  const sizes = { default: "px-4 py-2 text-sm", sm: "px-3 py-1.5 text-xs" };
  return (<button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</button>);
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₹0";
  const n = Number(amount) || 0;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export default function RentProperties() {
  const [rent, setRent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [savingMap, setSavingMap] = useState({});

  useEffect(() => {
    fetchRent();
    fetchSaved();
    // eslint-disable-next-line
  }, []);

  const fetchRent = async () => {
    setLoading(true);
    try {
      const res = await API.get("/rentproperties");
      setRent(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Rent fetch error", err);
      setToast("Failed to load rent properties");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const fetchSaved = async () => {
    try {
      const res = await API.get("/customer/saved-properties");
      const ids = (res.data?.data || []).map((i) => i._id);
      setSavedIds(ids);
    } catch (err) {
      console.error("Saved fetch error", err);
    }
  };

  const toggleSave = async (id) => {
    if (!id) return;
    if (savingMap[id]) return;
    setSavingMap((m) => ({ ...m, [id]: true }));
    try {
      if (savedIds.includes(id)) {
        await API.delete(`/customer/save-property/${id}`);
        setSavedIds((prev) => prev.filter((x) => x !== id));
        setToast("Removed from saved");
      } else {
        await API.post(`/customer/save-property/${id}`);
        setSavedIds((prev) => [...prev, id]);
        setToast("Saved");
      }
    } catch (err) {
      console.error(err);
      setToast(err?.response?.data?.message || "Unable to update saved list");
    } finally {
      setTimeout(() => setToast(""), 2500);
      setSavingMap((m) => { const c = { ...m }; delete c[id]; return c; });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin h-8 w-8 text-blue-600" /></div>;

  const list = rent.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (p.title || "").toLowerCase().includes(q) || (p.location || "").toLowerCase().includes(q);
  });

  const imgFor = (p) => p?.images?.[0] || p?.image || placeholder;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Properties for Rent</h2>
        <div className="w-72 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search rent properties..." className="pl-10 pr-3 py-2 border rounded-md w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <Card key={p._id} className="overflow-hidden">
            <img src={imgFor(p)} alt={p.title} className="w-full h-44 object-cover" />
            <CardContent>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 flex items-center"><MapPin className="mr-2 h-4 w-4" />{p.location}</p>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-lg font-bold">{formatCurrency(p.price)}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleSave(p._id)}>
                    {savedIds.includes(p._id) ? <span className="text-red-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" />Saved</span> : <span>Save</span>}
                  </Button>

                  <Button onClick={() => window.alert("Open details")} variant="default" size="sm"><Eye className="h-4 w-4 mr-2" />View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {toast && <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded">{toast}</div>}
    </div>
  );
}
