const express = require("express");
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getSellProperties,
  getFeaturedProperties,
  getByCategory,
  uploadImages,
} = require("../controllers/propertyController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getProperties);
router.get("/featured", getFeaturedProperties);
router.get("/category/:category", getByCategory);
router.post("/upload-images", upload.array("images", 10), uploadImages);
router.get("/:id", getProperty);

// Protected routes (admin, broker, developer)
router.post(
  "/",
  protect,
  authorize("admin", "broker", "developer"),
  upload.array("images", 10),
  createProperty
);

router.put(
  "/:id",
  protect,
  authorize("admin", "broker", "developer"),
  upload.array("images", 10),
  updateProperty
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProperty
);

module.exports = router;
