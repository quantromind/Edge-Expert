const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 5000,
    },
    // Location
    location: { type: String, required: true, trim: true },
    address: { type: String, default: "", trim: true },
    city: { type: String, default: "Pune", trim: true },
    state: { type: String, default: "Maharashtra", trim: true },
    pincode: { type: String, default: "", trim: true },
    landmark: { type: String, default: "", trim: true },

    // Pricing
    price: { type: Number, default: 0 },
    rent: { type: Number, default: 0 },
    maintenance: { type: Number, default: 0 },
    pricePerSqFt: { type: Number, default: 0 },

    // Property details
    propertyType: {
      type: String,
      enum: ["Flat", "Villa", "Plot", "Office", "Commercial", "PG", "Land", "Row House", "Penthouse", "Studio", "Farmhouse"],
      default: "Flat",
    },
    transactionType: {
      type: String,
      enum: ["Buy", "Rent", "Sell"],
      default: "Buy",
    },
    category: {
      type: String,
      enum: ["Residential", "Commercial", "Luxury", "Affordable", "Featured", "New Project", "PG/Co-living"],
      default: "Residential",
    },

    // Specifications
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    balconies: { type: Number, default: 0 },
    area: { type: Number, default: 0 }, // in sq ft
    carpetArea: { type: Number, default: 0 },
    builtUpArea: { type: Number, default: 0 },
    floor: { type: Number, default: 0 },
    totalFloors: { type: Number, default: 0 },
    facing: {
      type: String,
      enum: ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West", ""],
      default: "",
    },
    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished", ""],
      default: "",
    },
    parking: { type: Number, default: 0 },
    ageOfProperty: { type: String, default: "" }, // e.g., "0-1 years", "1-5 years"

    // Builder / Project
    builderName: { type: String, default: "", trim: true },
    projectName: { type: String, default: "", trim: true },
    reraNumber: { type: String, default: "", trim: true },
    possessionDate: { type: String, default: "" },

    // Amenities
    amenities: [{ type: String }],

    // Images
    images: [{ type: String }], // paths or URLs

    // Contact & posting info
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contactName: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    postedByType: {
      type: String,
      enum: ["Owner", "Builder", "Agent", "Admin", ""],
      default: "",
    },

    // Status & flags
    status: {
      type: String,
      enum: ["available", "sold", "rented", "under_construction"],
      default: "available",
    },
    featured: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // Coordinates for map
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },

    // Engagement tracking
    views: { type: Number, default: 0 },
    enquiryCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Text index for search
propertySchema.index({ title: "text", description: "text", location: "text", city: "text" });

// Regular indexes for filtering
propertySchema.index({ city: 1, propertyType: 1, transactionType: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ category: 1 });
propertySchema.index({ featured: 1 });

module.exports = mongoose.model("Property", propertySchema);
