const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getPropertyEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect, authorize } = require("../middleware/auth");

// Public — submit enquiry
router.post("/", createEnquiry);

// Protected — admin management
router.get("/", protect, authorize("admin", "broker"), getEnquiries);
router.get("/property/:propertyId", protect, authorize("admin", "broker"), getPropertyEnquiries);
router.put("/:id", protect, authorize("admin"), updateEnquiry);
router.delete("/:id", protect, authorize("admin"), deleteEnquiry);

module.exports = router;
