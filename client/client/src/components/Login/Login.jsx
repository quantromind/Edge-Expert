import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import spaceswalalogo from "../../assets/home/spaceswalalogo.png";
import img1 from "../../assets/login/img1.png";
import { loginUser, loginWithGoogleToken } from "../../Api/authService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setGoogleError("");
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Redirect user based on their role
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

  // ✅ Helper: Save token & user info in both storages
  const saveUserSession = (token, user) => {
    // Clear any existing session/local data first
    sessionStorage.clear();
    localStorage.clear();

    // Save in sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", user.role);
    sessionStorage.setItem("user", JSON.stringify(user));

    // Save in localStorage for persistence
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // ✅ Manual login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(form);
      if (response?.data?.token && response.data.user) {
        const { token, user } = response.data;
        saveUserSession(token, user);
        redirectByRole(user.role);
      } else {
        alert("Login failed: Invalid server response");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setGoogleError("");

    try {
      const { credential } = credentialResponse;

      if (!credential) {
        setGoogleError("No credential received from Google");
        return;
      }

      console.log("Sending Google token to backend...");
      const response = await loginWithGoogleToken(credential);

      if (response?.data?.token && response.data.user) {
        const { token, user } = response.data;
        saveUserSession(token, user);
        console.log("Google login successful, redirecting to:", user.role);
        redirectByRole(user.role);
      } else {
        setGoogleError("Google login failed: Invalid response from server");
      }
    } catch (err) {
      console.error("Google login error:", err);
      const errorMessage =
        err.response?.data?.message || "Google login failed. Try again.";
      setGoogleError(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  // ✅ Handle Google login errors
  const handleGoogleError = () => {
    const errorMsg =
      "Google login failed. Please make sure:\n• You're using http://localhost:5173\n• This domain is authorized in Google Cloud Console\n• Your Google OAuth client ID is properly configured";
    setGoogleError(errorMsg);
    console.error("Google OAuth configuration error");
  };

  const retryGoogleLogin = () => {
    setGoogleError("");
  };

  // ✅ UI
  return (
    <div className="min-h-screen flex items-center justify-center p-3 bg-gradient-to-br from-blue-50 to-blue-300">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
        {/* Left Image Section */}
        <div
          className="w-full md:w-1/2 h-48 md:h-auto relative flex items-center justify-center bg-gray-900"
          style={{ minHeight: "400px" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img1})`,
              filter: "grayscale(50%) brightness(60%)",
            }}
          />
          <div className="relative z-10 text-center w-full px-6 py-8">
            <h3 className="text-white text-2xl font-extrabold mb-1 drop-shadow-lg">
              Find Your Next Perfect Space
            </h3>
            <p className="text-gray-100 text-sm drop-shadow-md">
              Log in quickly to view saved properties and manage your profile.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-3">
            <img src={spaceswalalogo} alt="Logo" className="h-10" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 text-center">
            Welcome Back!
          </h2>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={loading || googleLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={loading || googleLoading}
            />
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 disabled:bg-teal-400 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Registration Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-200" />
            <span className="px-3 text-gray-500 text-xs">OR</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {/* Google Login Section */}
          <div className="space-y-3">
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="continue_with"
                shape="rectangular"
                theme="filled_blue"
                size="large"
                locale="en"
              />
            </div>

            {googleLoading && (
              <p className="text-center text-gray-600 text-sm">
                🔐 Processing Google login...
              </p>
            )}

            {googleError && (
              <div className="space-y-2">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-800 text-center whitespace-pre-line">
                    {googleError}
                  </p>
                </div>
                <button
                  onClick={retryGoogleLogin}
                  className="w-full text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Try Google Login Again
                </button>

                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800 text-center">
                    <strong>Note:</strong> Make sure localhost:5173 is authorized
                    in Google Cloud Console
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
