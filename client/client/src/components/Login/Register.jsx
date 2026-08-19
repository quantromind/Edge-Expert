import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoBriefcaseOutline,
  IoLockClosedOutline,
  IoConstructOutline,
} from "react-icons/io5";
import { registerUser, loginWithGoogleToken } from "../../Api/authService.js";
import spaceswalalogo from "../../assets/home/spaceswalalogo.png";
import img2 from "../../assets/login/img2.png";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "customer",
    location: "",
    company: "",
    organization: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!form.name || !form.email || !form.password) {
        setError("Please fill all required fields");
        setLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      if (form.role === "broker" && !form.company) {
        setError("Please enter your Company / Agency Name for broker registration");
        setLoading(false);
        return;
      }

      if (form.role === "developer" && !form.organization) {
        setError("Please enter your Organization / Developer Name");
        setLoading(false);
        return;
      }

      const response = await registerUser(form);

      if (response?.data?.user) {
        alert("Registration successful! Please log in to continue.");
        navigate("/login"); // Redirect to login after registration
      } else {
        setError("Registration failed: Invalid server response");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setError("");

    try {
      const { credential } = credentialResponse;

      if (!credential) {
        setError("No credential received from Google");
        return;
      }

      const response = await loginWithGoogleToken(credential);

      if (response?.data?.token && response.data.user) {
        const { token, user } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("user", JSON.stringify(user));

        alert("Google Sign-In Successful!");

        if (user.role === "broker") navigate("/brokerpanel");
        else if (user.role === "customer") navigate("/customerdashboard");
        else if (user.role === "developer") navigate("/developerpanel");
        else if (user.role === "admin") navigate("/admin/dashboard");
        else navigate("/");
      } else {
        setError("Google login failed: Invalid response from server");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    setError("Google Login failed. Please try again or use email registration.");
  };

  const inputClass =
    "w-full border border-gray-200 p-2 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm placeholder-gray-400 text-gray-700 hover:border-blue-300 disabled:bg-gray-100 disabled:cursor-not-allowed";

  const roleButtonClass = (role) =>
    `flex-1 flex flex-col items-center py-2 px-1 rounded-lg border-2 text-xs transition-all duration-200 cursor-pointer ${
      form.role === role
        ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm transform scale-[1.02]"
        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-blue-200"
    } ${loading || googleLoading ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 md:pt-24 p-3 md:p-6 overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${img2})`,
          filter: "brightness(30%)",
          zIndex: -1,
        }}
      ></div>

      <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-md relative z-10">
        <div className="text-center mb-4">
          <img
            src={spaceswalalogo}
            alt="Edge Expert Logo"
            className="h-10 md:h-12 mx-auto mb-1"
          />
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
            Create Your Edge Expert Account
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Find, list, and manage properties with ease.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            I am registering as:
          </label>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handleRoleChange("customer")}
              className={roleButtonClass("customer")}
              disabled={loading || googleLoading}
            >
              <IoHomeOutline className="text-lg" />
              <span className="hidden sm:inline text-xs">Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("broker")}
              className={roleButtonClass("broker")}
              disabled={loading || googleLoading}
            >
              <IoBriefcaseOutline className="text-lg" />
              <span className="hidden sm:inline text-xs">Broker / Agent</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("developer")}
              className={roleButtonClass("developer")}
              disabled={loading || googleLoading}
            >
              <IoConstructOutline className="text-lg" />
              <span className="hidden sm:inline text-xs">Developer</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={roleButtonClass("admin")}
              disabled={loading || googleLoading}
            >
              <IoLockClosedOutline className="text-lg" />
              <span className="hidden sm:inline text-xs">Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              name="name"
              placeholder="Full Name *"
              className={inputClass}
              onChange={handleChange}
              value={form.name}
              required
              disabled={loading || googleLoading}
            />
            <input
              name="email"
              placeholder="Email Address *"
              type="email"
              className={inputClass}
              onChange={handleChange}
              value={form.email}
              required
              disabled={loading || googleLoading}
            />
            <input
              name="phoneNumber"
              placeholder="Mobile Number"
              type="tel"
              className={inputClass}
              onChange={handleChange}
              value={form.phoneNumber}
              disabled={loading || googleLoading}
            />
            <input
              name="password"
              placeholder="Password *"
              type="password"
              className={inputClass}
              onChange={handleChange}
              value={form.password}
              required
              minLength="6"
              disabled={loading || googleLoading}
            />
            <input
              name="location"
              placeholder="City / Locality"
              className={inputClass}
              onChange={handleChange}
              value={form.location}
              disabled={loading || googleLoading}
            />
          </div>

          {form.role === "broker" && (
            <input
              name="company"
              placeholder="Company / Agency Name *"
              className={inputClass}
              onChange={handleChange}
              value={form.company}
              required
              disabled={loading || googleLoading}
            />
          )}

          {form.role === "developer" && (
            <input
              name="organization"
              placeholder="Organization / Developer Name *"
              className={inputClass}
              onChange={handleChange}
              value={form.organization}
              required
              disabled={loading || googleLoading}
            />
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 rounded-lg mt-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
          >
            {loading ? "Creating Account..." : "Register Account"}
          </button>
        </form>

        <div className="flex items-center my-2">
          <hr className="flex-grow border-gray-200" />
          <span className="px-2 text-gray-400 text-xs font-medium">OR</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        <div className="flex justify-center mb-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signup_with"
            shape="rectangular"
            theme="filled_blue"
            size="large"
            disabled={loading || googleLoading}
          />
        </div>

        {googleLoading && (
          <p className="text-center text-gray-600 text-sm mb-2">
            🔐 Processing Google registration...
          </p>
        )}

        <p className="text-xs text-gray-600 text-center mt-1">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
