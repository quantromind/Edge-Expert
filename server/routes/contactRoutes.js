const express = require("express");
const router = express.Router();
const { createContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/auth");

// Public — submit contact form
router.post("/", createContact);

// Protected — admin management
router.get("/", protect, authorize("admin"), getContacts);
router.put("/:id", protect, authorize("admin"), updateContact);
router.delete("/:id", protect, authorize("admin"), deleteContact);

module.exports = router;
