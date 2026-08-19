import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Image,
  Upload,
  Building,
  MapPin,
  IndianRupee,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Link,
  UploadCloud,
  FileImage,
} from "lucide-react";
import API from "../../Api/axiosConfig";

const CATEGORIES = [
  "Residential",
  "Commercial",
  "Luxury",
  "Affordable",
  "New Project",
  "Featured",
  "PG/Co-living",
];

const PROPERTY_TYPES = [
  "Flat",
  "Villa",
  "Penthouse",
  "Plot",
  "Office",
  "Commercial",
  "PG",
  "Land",
  "Row House",
  "Studio",
  "Farmhouse",
];

const TRANSACTION_TYPES = ["Buy", "Rent", "Sell"];

const POPULAR_BUILDERS = [
  "Mahindra Lifespaces",
  "Godrej Properties",
  "Lodha Group",
  "Ace Group",
  "Panchshil Realty",
  "Prestige Group",
  "VTP Realty",
  "Kolte Patil",
  "Sobha Limited",
  "Hiranandani",
  "DLF",
  "Sonam Group",
  "JP Infra",
];

const POPULAR_CITIES = [
  "Pune",
  "Mumbai",
  "Ayodhya",
  "Bengaluru",
  "Hyderabad",
  "Delhi NCR",
  "Thane",
  "Navi Mumbai",
  "Nagpur",
  "Nashik",
];

const COMMON_AMENITIES = [
  "Swimming Pool",
  "Gymnasium",
  "Clubhouse",
  "24/7 Security",
  "Power Backup",
  "High Speed Lift",
  "Children's Play Area",
  "Jogging Track",
  "Landscaped Garden",
  "EV Charging Station",
  "Covered Car Parking",
  "Smart Home Automation",
  "Infinity Pool",
  "Private Terrace",
  "Tennis / Badminton Court",
  "CCTV Surveillance",
  "Rainwater Harvesting",
  "Vastu Compliant",
];

export default function PropertyFormModal({
  isOpen,
  onClose,
  propertyToEdit = null,
  onSuccess,
}) {
  const isEdit = Boolean(propertyToEdit);

  const initialForm = {
    title: "",
    description: "",
    builderName: "",
    projectName: "",
    reraNumber: "",
    possessionDate: "",
    propertyType: "Flat",
    transactionType: "Buy",
    category: "Residential",
    price: "",
    rent: "",
    maintenance: "",
    pricePerSqFt: "",
    location: "",
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pincode: "",
    landmark: "",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    area: "",
    carpetArea: "",
    floor: 1,
    totalFloors: 10,
    facing: "East",
    furnishing: "Semi-Furnished",
    parking: 1,
    ageOfProperty: "New Construction",
    amenities: ["24/7 Security", "Power Backup", "High Speed Lift"],
    images: [],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    postedByType: "Builder",
    status: "available",
    featured: false,
    verified: true,
  };

  const [form, setForm] = useState(initialForm);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageInputMode, setImageInputMode] = useState("upload"); // "upload" | "url"
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (propertyToEdit) {
      setForm({
        ...initialForm,
        ...propertyToEdit,
        price: propertyToEdit.price || "",
        rent: propertyToEdit.rent || "",
        maintenance: propertyToEdit.maintenance || "",
        pricePerSqFt: propertyToEdit.pricePerSqFt || "",
        area: propertyToEdit.area || "",
        carpetArea: propertyToEdit.carpetArea || "",
        amenities: propertyToEdit.amenities || [],
        images: propertyToEdit.images || [],
      });
    } else {
      setForm(initialForm);
    }
    setError("");
    setActiveTab("basic");
  }, [propertyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput("");
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadingImages(true);
    setError("");

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const res = await API.post("/properties/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success && res.data?.urls) {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, ...res.data.urls],
        }));
      }
    } catch (err) {
      console.warn("Upload API failed, falling back to local Base64 previews:", err);
      // Fallback: Read as Base64 Data URLs so upload still works without interruption
      const readPromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });

      const base64Images = await Promise.all(readPromises);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    } finally {
      setUploadingImages(false);
      e.target.value = ""; // Reset input
    }
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.location.trim()) {
      setError("Please provide Property Title and Location.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : 0,
        rent: form.rent ? Number(form.rent) : 0,
        maintenance: form.maintenance ? Number(form.maintenance) : 0,
        pricePerSqFt: form.pricePerSqFt ? Number(form.pricePerSqFt) : 0,
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        balconies: Number(form.balconies) || 0,
        area: form.area ? Number(form.area) : 0,
        carpetArea: form.carpetArea ? Number(form.carpetArea) : 0,
        floor: Number(form.floor) || 0,
        totalFloors: Number(form.totalFloors) || 0,
        parking: Number(form.parking) || 0,
      };

      if (isEdit) {
        await API.put(`/properties/${propertyToEdit._id}`, payload);
      } else {
        await API.post("/properties", payload);
      }

      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to save property. Please check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <Building className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {isEdit ? "Edit Property Details" : "Add New Real Estate Property"}
              </h2>
              <p className="text-xs text-blue-200">
                {isEdit
                  ? `Updating #${propertyToEdit._id}`
                  : "Publish to website and explore live listings"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-6 gap-2 overflow-x-auto text-sm font-medium">
          {[
            { id: "basic", label: "1. Basic Info & Brand" },
            { id: "pricing", label: "2. Pricing & Dimensions" },
            { id: "location", label: "3. Location & Specs" },
            { id: "amenities", label: "4. Amenities & Media" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 border-b-2 font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* TAB 1: BASIC INFO & BRAND */}
          {activeTab === "basic" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxurious 3 BHK Apartment by Mahindra Lifespaces"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Builder / Brand Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="builderName"
                      value={form.builderName}
                      onChange={handleChange}
                      placeholder="e.g. Mahindra Lifespaces / Godrej / Ace"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      list="builderList"
                    />
                    <datalist id="builderList">
                      {POPULAR_BUILDERS.map((b) => (
                        <option key={b} value={b} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Project / Society Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    placeholder="e.g. Mahindra Roots / Godrej Infinity"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Transaction Type
                  </label>
                  <select
                    name="transactionType"
                    value={form.transactionType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    {TRANSACTION_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    RERA Registration Number
                  </label>
                  <input
                    type="text"
                    name="reraNumber"
                    value={form.reraNumber}
                    onChange={handleChange}
                    placeholder="e.g. P52100012345"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Description & Highlights <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the property, premium features, surroundings, connectivity, nearby schools/IT parks..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & DIMENSIONS */}
          {activeTab === "pricing" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Total Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="e.g. 12500000 (1.25 Cr)"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  {form.price > 0 && (
                    <p className="text-xs text-blue-600 font-semibold mt-1">
                      ₹ {Number(form.price).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Monthly Rent (₹) [If Rental/PG]
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold">₹</span>
                    <input
                      type="number"
                      name="rent"
                      value={form.rent}
                      onChange={handleChange}
                      placeholder="e.g. 25000"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  {form.rent > 0 && (
                    <p className="text-xs text-emerald-600 font-semibold mt-1">
                      ₹ {Number(form.rent).toLocaleString("en-IN")}/month
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Super Built-up Area (Sq. Ft.)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="e.g. 1450"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Carpet Area (Sq. Ft.)
                  </label>
                  <input
                    type="number"
                    name="carpetArea"
                    value={form.carpetArea}
                    onChange={handleChange}
                    placeholder="e.g. 1150"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Rate per Sq. Ft. (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerSqFt"
                    value={form.pricePerSqFt}
                    onChange={handleChange}
                    placeholder="e.g. 8500"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Monthly Maintenance (₹)
                  </label>
                  <input
                    type="number"
                    name="maintenance"
                    value={form.maintenance}
                    onChange={handleChange}
                    placeholder="e.g. 3500"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Possession / Ready Date
                  </label>
                  <input
                    type="text"
                    name="possessionDate"
                    value={form.possessionDate}
                    onChange={handleChange}
                    placeholder="e.g. Ready to Move / Dec 2026"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Age of Property
                  </label>
                  <select
                    name="ageOfProperty"
                    value={form.ageOfProperty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option value="New Construction">New Construction / Under Construction</option>
                    <option value="0-1 years">0-1 years (Brand New)</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOCATION & SPECS */}
          {activeTab === "location" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Location / Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Baner / Kharadi / Ram Mandir Road, Ayodhya"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Pune, Mumbai, Ayodhya"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    list="cityList"
                    required
                  />
                  <datalist id="cityList">
                    {POPULAR_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Address & Landmark
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="e.g. Near EON IT Park, Nagar Road, Kharadi"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Bedrooms (BHK)
                  </label>
                  <select
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option value="0">0 / Studio / Commercial</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={form.bathrooms}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Balconies
                  </label>
                  <input
                    type="number"
                    name="balconies"
                    value={form.balconies}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Floor / Total Floors
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="floor"
                      value={form.floor}
                      onChange={handleChange}
                      placeholder="Floor (e.g. 5)"
                      className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="number"
                      name="totalFloors"
                      value={form.totalFloors}
                      onChange={handleChange}
                      placeholder="Total (e.g. 20)"
                      className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Furnishing Status
                  </label>
                  <select
                    name="furnishing"
                    value={form.furnishing}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Furnished">Fully Furnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Facing Direction
                  </label>
                  <select
                    name="facing"
                    value={form.facing}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option value="East">East</option>
                    <option value="North">North</option>
                    <option value="North-East">North-East (Most Auspicious)</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                    <option value="South-East">South-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-West">South-West</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AMENITIES & MEDIA & STATUS */}
          {activeTab === "amenities" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Amenities chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Select Amenities & Features ({form.amenities.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_AMENITIES.map((item) => {
                    const selected = form.amenities.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleAmenityToggle(item)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                          selected
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Images Section with Dual Upload & URL Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Property Images ({form.images.length} added)
                  </label>
                  {/* Mode Selector Tabs */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageInputMode("upload")}
                      className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        imageInputMode === "upload"
                          ? "bg-white text-blue-600 shadow-xs"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" /> Upload from Computer
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode("url")}
                      className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        imageInputMode === "url"
                          ? "bg-white text-blue-600 shadow-xs"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Link className="w-3.5 h-3.5" /> Paste Image URL
                    </button>
                  </div>
                </div>

                {/* Mode 1: File Upload */}
                {imageInputMode === "upload" && (
                  <div className="relative border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-6 text-center transition-all cursor-pointer group">
                    <input
                      type="file"
                      id="property-file-upload"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                        {uploadingImages ? (
                          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <UploadCloud className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {uploadingImages
                            ? "Processing & Uploading Images..."
                            : "Click to browse or drag & drop property photos"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Supports PNG, JPG, JPEG, WEBP (Select multiple files at once)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 2: Paste Image URL */}
                {imageInputMode === "url" && (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddImageUrl();
                        }
                      }}
                      placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add URL
                    </button>
                  </div>
                )}

                {/* Preview Grid with Badge */}
                {form.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {form.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-100 shadow-xs"
                      >
                        <img
                          src={img}
                          alt={`Property ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500";
                          }}
                        />
                        {/* First image cover badge */}
                        {idx === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                            Cover Photo
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1.5 right-1.5 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-full opacity-90 group-hover:opacity-100 transition shadow-md cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic pt-1">
                    No images added yet. You can upload photos from your device or paste online image URLs above.
                  </p>
                )}
              </div>

              {/* Status & Flags */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Listing Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm outline-none font-medium"
                  >
                    <option value="available">🟢 Available for Sale/Rent</option>
                    <option value="under_construction">🟡 Under Construction</option>
                    <option value="sold">🔴 Sold Out</option>
                    <option value="rented">🔵 Already Rented</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold text-gray-800 cursor-pointer">
                    ⭐ Mark as Featured Property
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="verified"
                    name="verified"
                    checked={form.verified}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="verified" className="text-sm font-semibold text-gray-800 cursor-pointer">
                    ✅ Verified Listing Badge
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              {activeTab !== "basic" && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs = ["basic", "pricing", "location", "amenities"];
                    const idx = tabs.indexOf(activeTab);
                    if (idx > 0) setActiveTab(tabs[idx - 1]);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
                >
                  ← Previous Step
                </button>
              )}
              {activeTab !== "amenities" && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs = ["basic", "pricing", "location", "amenities"];
                    const idx = tabs.indexOf(activeTab);
                    if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1]);
                  }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition cursor-pointer"
                >
                  Next Step →
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {loading ? "Saving to Database..." : isEdit ? "Update Property" : "Publish Property"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
