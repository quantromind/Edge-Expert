const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Also import sell property controller for separate route
const { getSellProperties } = require("./controllers/propertyController");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// CORS — allow frontend
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Compression
app.use(compression());

// Request logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Serve uploaded files as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================================
// API ROUTES
// ========================================

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Sell property route (separate endpoint for frontend compatibility)
app.get("/api/sellproperty", getSellProperties);

// ========================================
// HEALTH CHECK
// ========================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Edge Expert API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Edge Expert Real Estate API",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global error handler
app.use(errorHandler);

// ========================================
// START SERVER
// ========================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Edge Expert Server running on port ${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
