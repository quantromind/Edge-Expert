const express = require("express");
const router = express.Router();
const { getStats, getUsers, updateUser, deleteUser } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

// All admin routes require authentication + admin role
router.use(protect, authorize("admin"));

router.get("/stats", getStats);
router.get("/dashboard", getStats);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
