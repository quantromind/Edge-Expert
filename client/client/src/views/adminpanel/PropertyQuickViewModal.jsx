import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Maximize2,
  CheckCircle2,
  Calendar,
  Layers,
  Phone,
  Mail,
  User,
  Star,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function PropertyQuickViewModal({
  isOpen,
  onClose,
  property,
  onEdit,
  enquiries = [],
}) {
  if (!isOpen || !property) return null;

  const connectedEnquiries = enquiries.filter(
    (e) => e.property?._id === property._id || e.property === property._id
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {property.location}, {property.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  onClick={() => {
                    onClose();
                    onEdit(property);
                  }}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Edit Listing
                </button>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Image Gallery */}
            {property.images && property.images.length > 0 && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 h-64 overflow-y-auto">
                    {property.images.slice(1).map((img, idx) => (
                      <div
                        key={idx}
                        className="h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0"
                      >
                        <img
                          src={img}
                          alt={`${property.title} - ${idx + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {property.images.length === 1 && (
                      <div className="h-full rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400 text-center p-3">
                        No additional images uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Metrics & Price */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Pricing
                </span>
                <p className="text-lg font-black text-slate-900 mt-1">
                  {property.price > 0
                    ? `₹ ${property.price.toLocaleString("en-IN")}`
                    : property.rent > 0
                    ? `₹ ${property.rent.toLocaleString("en-IN")}/mo`
                    : "Price on Request"}
                </p>
                {property.pricePerSqFt > 0 && (
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    ₹ {property.pricePerSqFt.toLocaleString("en-IN")} / sq.ft
                  </p>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Category & Type
                </span>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {property.category} • {property.propertyType}
                </p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  For {property.transactionType || "Sale"}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Dimensions
                </span>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {property.bedrooms > 0 ? `${property.bedrooms} BHK • ` : ""}
                  {property.area > 0 ? `${property.area} sq.ft` : "—"}
                </p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  Carpet: {property.carpetArea ? `${property.carpetArea} sq.ft` : "—"}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      property.status === "available"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {property.status}
                  </span>
                  {property.featured && (
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}

            {/* Builder & Project Info */}
            {(property.builderName || property.projectName || property.reraNumber) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.builderName && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Builder / Developer</span>
                    <p className="text-sm font-bold text-slate-800">{property.builderName}</p>
                  </div>
                )}
                {property.projectName && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Project Name</span>
                    <p className="text-sm font-bold text-slate-800">{property.projectName}</p>
                  </div>
                )}
                {property.reraNumber && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">RERA Number</span>
                    <p className="text-sm font-bold text-emerald-700">{property.reraNumber}</p>
                  </div>
                )}
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Amenities & Facilities ({property.amenities.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-blue-50/70 text-blue-800 border border-blue-100 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Leads for this Property */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Direct Leads & Inquiries for this Property ({connectedEnquiries.length})
                </h4>
              </div>

              {connectedEnquiries.length > 0 ? (
                <div className="space-y-2">
                  {connectedEnquiries.map((enq) => (
                    <div
                      key={enq._id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{enq.name}</span>
                        <span className="text-slate-500 ml-2">📞 {enq.phone}</span>
                        {enq.email && <span className="text-slate-500 ml-2">• ✉️ {enq.email}</span>}
                        {enq.message && (
                          <p className="text-slate-600 italic mt-0.5">"{enq.message}"</p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                          enq.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  No leads received for this specific property yet.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
