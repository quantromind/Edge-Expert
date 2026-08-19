// client/src/Api/axiosConfig.js

import axios from "axios";

// ✅ Create axios instance with default settings
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10-second timeout for API requests
});

// ======================================================
// ✅ REQUEST INTERCEPTOR — Attach Token Automatically
// ======================================================
API.interceptors.request.use(
  (config) => {
    // Try both storages (for compatibility)
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    // Attach Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ======================================================
// ✅ RESPONSE INTERCEPTOR — Handle 401 Unauthorized
// ======================================================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized! Clearing session and redirecting...");

      // Clear all stored tokens and user data
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      // Redirect user to login page
      window.location.href = "/login";
    }

    // Log other errors for debugging
    if (error.response) {
      console.error("❌ API Response Error:", error.response.data);
    } else {
      console.error("❌ Network or Axios Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;
