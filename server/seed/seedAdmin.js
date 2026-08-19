const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: "admin@edgeexpert.com" });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin
    const admin = await User.create({
      name: "Edge Expert Admin",
      email: "admin@edgeexpert.com",
      password: "Admin@123",
      phone: "7385327808",
      role: "admin",
      isActive: true,
      isVerified: true,
    });

    console.log("🎉 Admin created successfully!");
    console.log(`   📧 Email: ${admin.email}`);
    console.log(`   🔑 Password: Admin@123`);
    console.log(`   👤 Role: ${admin.role}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
