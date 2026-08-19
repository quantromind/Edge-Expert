import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  IoHomeOutline,
  IoBriefcaseOutline,
  IoConstructOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

import {
  loginUser,
  registerUser,
  loginWithGoogleToken,
} from "../../Api/authService.js";

import spaceswalalogo from "../../assets/home/spaceswalalogo.png";

const ArrowRight = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowLeft = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 6l-6 6 6 6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function AuthFlip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const initialLoginForm = { email: "", password: "" };
  const initialRegisterForm = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "customer",
    location: "",
    company: "",
    organization: "",
  };

  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

  useEffect(() => {
    setLoginError("");
    setRegisterError("");
    setGoogleError("");

    setLoginForm(initialLoginForm);
    setRegisterForm(initialRegisterForm);
  }, [isFlipped]);

  const redirectByRole = (role) => {
    switch (role) {
      case "broker":
        navigate("/brokerpanel");
        break;
      case "customer":
        navigate("/customerdashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "developer":
        navigate("/developerpanel");
        break;
      default:
        navigate("/");
    }
  };

  const saveUserSession = (token, user) => {
    sessionStorage.clear();
    localStorage.clear();
    const sessionData = { token, role: user.role, user: JSON.stringify(user) };
    Object.keys(sessionData).forEach((key) => {
      sessionStorage.setItem(key, sessionData[key]);
      localStorage.setItem(key, sessionData[key]);
    });
  };

  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (googleLoading) return;
    setLoginLoading(true);
    setLoginError("");
    try {
      const response = await loginUser(loginForm);
      if (response?.data?.token && response.data.user) {
        saveUserSession(response.data.token, response.data.user);
        redirectByRole(response.data.user.role);
      } else {
        setLoginError("Login failed: Invalid server response.");
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  const handleRoleChange = (role) =>
    setRegisterForm({ ...registerForm, role });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (googleLoading) return;
    setRegisterLoading(true);
    setRegisterError("");
    try {
      if (!registerForm.name || !registerForm.email || !registerForm.password) {
        setRegisterError("Please fill all required fields (*).");
        return;
      }
      if (registerForm.password.length < 6) {
        setRegisterError("Password must be at least 6 characters long.");
        return;
      }
      if (registerForm.role === "broker" && !registerForm.company) {
        setRegisterError("Please enter your Company / Agency Name.");
        return;
      }
      if (registerForm.role === "developer" && !registerForm.organization) {
        setRegisterError("Please enter your Organization / Developer Name.");
        return;
      }
      await registerUser(registerForm);
      alert("Registration successful! Please log in to continue.");
      setIsFlipped(false);
    } catch (err) {
      setRegisterError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setGoogleError("");
    try {
      const { credential } = credentialResponse;
      if (!credential) {
        setGoogleError("No credential received from Google.");
        return;
      }
      const response = await loginWithGoogleToken(credential);
      if (response?.data?.token && response.data.user) {
        saveUserSession(response.data.token, response.data.user);
        redirectByRole(response.data.user.role);
      } else {
        setGoogleError("Google login failed: Invalid server response.");
      }
    } catch (err) {
      setGoogleError(
        err.response?.data?.message || "Google login failed. Try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setGoogleError("Google authentication failed. Please try again.");
  };

  const roleButtonClass = (role) =>
    `flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-lg border-2 text-xs transition-all duration-200 cursor-pointer ${
      registerForm.role === role
        ? "bg-sky-50 text-sky-700 border-sky-500 shadow-sm"
        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
    }`;

  return (
    <>
      <style>{`
        .flip-container { perspective: 1500px; }
        .flip-card { transform-style: preserve-3d; transition: transform 0.8s ease; }
        .flip-card.flipped { transform: rotateY(180deg); }
        .flip-face { backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); }
      `}</style>
      {/* Added 'mt-16' for mobile to create space below a potential fixed navbar */}
      <div className="min-h-screen flex items-start md:items-center justify-center bg-gray-100 p-4 pt-8 pb-8 md:p-16 font-sans mt-16 md:mt-0">
        <div className="flip-container w-full max-w-4xl">
          <div
            className={`flip-card relative w-full h-auto min-h-[580px] md:h-[600px] rounded-2xl shadow-2xl ${
              isFlipped ? "flipped" : ""
            }`}
          >
            {/* LOGIN FACE */}
            <div className="flip-face absolute inset-0 bg-white flex flex-col md:flex-row rounded-2xl overflow-hidden">
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="text-center mb-4 md:mb-6">
                  <img src={spaceswalalogo} alt="Logo" className="h-14 md:h-16 mx-auto" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-800 text-center">
                  Log In
                </h1>
                {loginError && (
                  <p className="text-red-500 text-xs md:text-sm mb-2 md:mb-3 text-center">
                    {loginError}
                  </p>
                )}
                {googleError && !isFlipped && (
                  <p className="text-red-500 text-xs md:text-sm mb-2 md:mb-3 text-center">
                    {googleError}
                  </p>
                )}
                <form onSubmit={handleLoginSubmit} className="space-y-3 md:space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    className="bg-gray-100 rounded-lg p-2.5 md:p-3 w-full text-sm md:text-base focus:ring-2 focus:ring-sky-500 transition"
                    required
                    disabled={googleLoading}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    className="bg-gray-100 rounded-lg p-2.5 md:p-3 w-full text-sm md:text-base focus:ring-2 focus:ring-sky-500 transition"
                    required
                    disabled={googleLoading}
                  />
                  <button
                    type="submit"
                    disabled={loginLoading || googleLoading}
                    className="w-full bg-sky-500 text-white py-2 md:py-2.5 rounded-full font-semibold hover:bg-sky-600 transition disabled:bg-sky-300 text-sm md:text-base"
                  >
                    {loginLoading ? "Logging in..." : "Log In"}
                  </button>
                </form>
                <div className="flex items-center my-3 md:my-4">
                  <hr className="flex-grow" />
                  <span className="px-3 text-gray-400 text-xs">OR</span>
                  <hr className="flex-grow" />
                </div>
                <div className="flex justify-center">
                  {googleLoading ? (
                    <p className="text-sm text-gray-600">Processing...</p>
                  ) : (
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="outline"
                      size="large"
                    />
                  )}
                </div>
                 {/* Mobile only flip button for Register */}
                <div className="md:hidden text-center mt-4">
                  <p className="text-sm text-gray-600">
                    New here?{" "}
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="text-sky-500 font-bold flex items-center justify-center mx-auto mt-2 py-2 px-4 border-2 border-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition text-sm"
                    >
                      Register <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </p>
                </div>
              </div>
              <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sky-300 to-cyan-300 text-white rounded-r-2xl flex-col items-center justify-center p-10 text-center">
                <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-lg mb-6">
                  New here? Register to find your next perfect space.
                </p>
                <button
                  onClick={() => setIsFlipped(true)}
                  className="border-2 border-white py-2 px-8 rounded-full font-semibold hover:bg-white hover:text-sky-500 transition flex items-center"
                >
                  Register
                  <ArrowRight className="w-6 h-6 ml-2" />
                </button>
              </div>
            </div>

            {/* REGISTER FACE */}
            <div className="flip-face flip-back absolute inset-0 bg-white flex flex-col md:flex-row rounded-2xl overflow-hidden">
              <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-300 to-sky-300 text-white rounded-l-2xl flex-col items-center justify-center p-10 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-lg mb-6">
                  Already have an account? Log in to manage your properties.
                </p>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="border-2 border-white py-2 px-8 rounded-full font-semibold hover:bg-white hover:text-cyan-500 transition flex items-center"
                >
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  Login
                </button>
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center overflow-y-auto md:overflow-y-visible">
                <div className="text-center mb-2 md:mb-2">
                  <img src={spaceswalalogo} alt="Logo" className="h-14 md:h-16 mx-auto" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-2 text-gray-800 text-center">
                  Create Account
                </h1>
                {registerError && (
                  <p className="text-red-500 text-xs mb-2 text-center">
                    {registerError}
                  </p>
                )}
                {googleError && isFlipped && (
                  <p className="text-red-500 text-xs mb-2 text-center">
                    {googleError}
                  </p>
                )}
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    I am registering as:
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleRoleChange("customer")}
                      className={roleButtonClass("customer")}
                      disabled={googleLoading}
                    >
                      <IoHomeOutline className="text-lg" /> Customer
                    </button>
                    <button
                      onClick={() => handleRoleChange("broker")}
                      className={roleButtonClass("broker")}
                      disabled={googleLoading}
                    >
                      <IoBriefcaseOutline className="text-lg" /> Broker
                    </button>
                    <button
                      onClick={() => handleRoleChange("developer")}
                      className={roleButtonClass("developer")}
                      disabled={googleLoading}
                    >
                      <IoConstructOutline className="text-lg" /> Developer
                    </button>
                    <button
                      onClick={() => handleRoleChange("admin")}
                      className={roleButtonClass("admin")}
                      disabled={googleLoading}
                    >
                      <IoLockClosedOutline className="text-lg" /> Admin
                    </button>
                  </div>
                </div>
                <form onSubmit={handleRegisterSubmit} className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      name="name"
                      placeholder="Full Name *"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-sky-500"
                      required
                      disabled={googleLoading}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-sky-500"
                      required
                      disabled={googleLoading}
                    />
                    <input
                      name="phoneNumber"
                      placeholder="Mobile Number"
                      value={registerForm.phoneNumber}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-sky-500"
                      disabled={googleLoading}
                    />
                    <input
                      name="password"
                      type="password"
                      placeholder="Password *"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-sky-500"
                      required
                      disabled={googleLoading}
                    />
                    <input
                      name="location"
                      placeholder="City / Locality"
                      value={registerForm.location}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm md:col-span-2 focus:ring-2 focus:ring-sky-500"
                      disabled={googleLoading}
                    />
                  </div>
                  {registerForm.role === "broker" && (
                    <input
                      name="company"
                      placeholder="Company / Agency Name *"
                      value={registerForm.company}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-sky-500"
                      required
                      disabled={googleLoading}
                    />
                  )}
                  {registerForm.role === "developer" && (
                    <input
                      name="organization"
                      placeholder="Organization Name *"
                      value={registerForm.organization}
                      onChange={handleRegisterChange}
                      className="bg-gray-100 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-sky-500"
                      required
                      disabled={googleLoading}
                    />
                  )}
                  <button
                    type="submit"
                    disabled={registerLoading || googleLoading}
                    className="w-full bg-sky-500 text-white py-2 rounded-full mt-2 font-semibold hover:bg-sky-600 transition disabled:bg-sky-300 text-sm"
                  >
                    {registerLoading ? "Creating Account..." : "Register"}
                  </button>
                </form>
                <div className="flex items-center my-3">
                  <hr className="flex-grow" />
                  <span className="px-3 text-gray-400 text-xs">OR</span>
                  <hr className="flex-grow" />
                </div>
                <div className="flex justify-center">
                  {googleLoading ? (
                    <p className="text-sm text-gray-600">Processing...</p>
                  ) : (
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="outline"
                      size="large"
                    />
                  )}
                </div>
                {/* Mobile only flip button for Login */}
                <div className="md:hidden text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="text-sky-500 font-bold flex items-center justify-center mx-auto mt-2 py-2 px-4 border-2 border-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}