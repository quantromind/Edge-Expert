import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import {
  User,
  Mail,
  Phone,
  Lock,
  Edit2,
  CheckCircle,
  XCircle,
  Camera,
  Shield,
  Bell,
  ChevronRight,
  Key,
  Smartphone,
  ShieldCheck,
  LogOut,
  Building,
  BadgeCheck,
} from "lucide-react";
import { Switch } from "@headlessui/react";
import API from "../../Api/axiosConfig";

// ==========================
// Detail Item Component
// ==========================
const DetailItem = ({
  label,
  value,
  icon: Icon,
  isEditable = false,
  onEdit,
  isEditing,
  onSave,
  onCancel,
  fieldName,
  type = "text",
}) => {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(fieldName, editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
    onCancel();
  };

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
        <div className="flex items-start sm:items-center space-x-4 flex-1">
          <div className="p-3 bg-gray-100 rounded-lg">
            <Icon className="text-gray-600" size={20} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0"
              >
                <input
                  type={type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 w-full"
                  autoFocus
                />
                <div className="flex space-x-2 justify-end sm:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="p-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    <XCircle size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium text-base break-words">
                  {value}
                </span>
                {isEditable && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onEdit}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================
// Profile Header
// ==========================
const ProfileHeader = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">
        <motion.div
          className="relative self-center sm:self-auto"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={
              user?.profilePic ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt="Profile"
            className="w-20 h-20 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-300 mx-auto sm:mx-0"
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center"
              >
                <Camera className="text-white" size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 justify-center sm:justify-start">
            <motion.h1
              className="text-xl sm:text-2xl font-semibold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {user?.name}
            </motion.h1>
            <div className="flex items-center justify-center space-x-1 px-2 py-1 bg-green-100 rounded-full mt-1 sm:mt-0">
              <BadgeCheck size={14} className="text-green-600" />
              <span className="text-xs font-medium text-green-700">
                Verified
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-gray-600 text-xs sm:text-sm">
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>{user?.email}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>{user?.phoneNumber}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Building size={14} />
              <span>Customer</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-200 border border-gray-300 flex items-center justify-center space-x-2 text-sm font-medium"
        >
          <LogOut size={14} />
          <span>Sign out</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ==========================
// Security Card Component
// ==========================
const SecurityCard = ({ enabled, onChange, label, description, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-all duration-200"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div
          className={`p-2 rounded-lg ${
            enabled ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          <Icon size={18} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
            {label}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">{description}</p>
        </div>
      </div>
      <div className="self-end sm:self-auto">
        <Switch
          checked={enabled}
          onChange={onChange}
          className={clsx(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            enabled ? "bg-blue-600" : "bg-gray-300"
          )}
        >
          <span
            className={clsx(
              "inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform",
              enabled ? "translate-x-4" : "translate-x-1"
            )}
          />
        </Switch>
      </div>
    </div>
  </motion.div>
);

// ==========================
// Quick Action Component
// ==========================
const QuickAction = ({ icon: Icon, title, description, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className="w-full p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
        <Icon
          className="text-gray-600 group-hover:text-blue-600 transition-colors"
          size={18}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 text-sm sm:text-base">
          {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">{description}</p>
      </div>
      <ChevronRight
        className="text-gray-400 group-hover:text-blue-600 transition-colors hidden sm:block"
        size={14}
      />
    </div>
  </motion.button>
);

// ==========================
// Main Component
// ==========================
export default function Account({ userData }) {
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [isLoginAlertsEnabled, setIsLoginAlertsEnabled] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("/auth/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser({
        name: "Rohit Kashid",
        email: "pranav@gmail.com",
        phoneNumber: "7385327808",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (field, value) => {
    try {
      const response = await API.put("/customer/profile", { [field]: value });
      setUser(response.data.data);
      setEditingField(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleEditField = (field) => {
    setEditingField(field);
  };

  const handleSaveField = (field, value) => {
    if (value && value !== user[field]) {
      updateUserProfile(field, value);
    } else {
      setEditingField(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleChangePassword = () => {
    alert("Password change functionality would be implemented here");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-3 text-gray-600 text-sm">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="text-gray-700" size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Manage your account details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <DetailItem
                  label="Full Name"
                  value={user?.name}
                  icon={User}
                  isEditable={true}
                  onEdit={() => handleEditField("name")}
                  isEditing={editingField === "name"}
                  onSave={handleSaveField}
                  onCancel={handleCancelEdit}
                  fieldName="name"
                />
                <DetailItem
                  label="Email Address"
                  value={user?.email}
                  icon={Mail}
                  isEditable={true}
                  onEdit={() => handleEditField("email")}
                  isEditing={editingField === "email"}
                  onSave={handleSaveField}
                  onCancel={handleCancelEdit}
                  fieldName="email"
                />
                <DetailItem
                  label="Phone Number"
                  value={user?.phoneNumber}
                  icon={Phone}
                  isEditable={true}
                  onEdit={() => handleEditField("phoneNumber")}
                  isEditing={editingField === "phoneNumber"}
                  onSave={handleSaveField}
                  onCancel={handleCancelEdit}
                  fieldName="phoneNumber"
                />
                <DetailItem
                  label="Password"
                  value="••••••••"
                  icon={Lock}
                  isEditable={true}
                  onEdit={handleChangePassword}
                  type="password"
                />
              </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ShieldCheck className="text-gray-700" size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Security
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Protect your account
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <SecurityCard
                  enabled={is2faEnabled}
                  onChange={setIs2faEnabled}
                  label="Two-factor authentication"
                  description="Add an extra layer of security to your account"
                  icon={Smartphone}
                />
                <SecurityCard
                  enabled={isLoginAlertsEnabled}
                  onChange={setIsLoginAlertsEnabled}
                  label="Login alerts"
                  description="Get notified when someone logs into your account"
                  icon={Bell}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5"
            >
              <h3 className="font-semibold text-gray-900 text-base mb-4">
                Quick actions
              </h3>
              <div className="space-y-3">
                <QuickAction
                  icon={Key}
                  title="Change password"
                  description="Update your account password"
                  onClick={handleChangePassword}
                />
                <QuickAction
                  icon={Smartphone}
                  title="Connected devices"
                  description="Manage your signed-in devices"
                  onClick={() => alert("Device management")}
                />
                <QuickAction
                  icon={Shield}
                  title="Privacy settings"
                  description="Control your privacy preferences"
                  onClick={() => alert("Privacy settings")}
                />
              </div>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg border border-blue-200 p-4 sm:p-5"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="text-blue-600" size={18} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                  Account secure
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Your account security is up to date
                </p>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="text-gray-600" size={16} />
                </div>
                <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                  Member since
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">January 2024</p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Last updated: Today
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
