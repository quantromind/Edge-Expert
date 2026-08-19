const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    // Enquirer details
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    message: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    // Property context
    propertyType: {
      type: String,
      default: "",
    },
    transactionType: {
      type: String,
      enum: ["Buy", "Rent", "Sell", ""],
      default: "",
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },

    // Link to specific property (for property-wise enquiry)
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },

    // Tracking
    status: {
      type: String,
      enum: ["new", "contacted", "follow_up", "converted", "closed"],
      default: "new",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      enum: ["website", "phone", "walk_in", "referral", "other"],
      default: "website",
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ status: 1 });
enquirySchema.index({ property: 1 });
enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Enquiry", enquirySchema);
