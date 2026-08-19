const express = require("express");
const router = express.Router();
const { signup, login, googleLogin, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", protect, getProfile);

module.exports = router;
