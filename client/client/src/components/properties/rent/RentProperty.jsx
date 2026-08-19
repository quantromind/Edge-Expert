import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, CloudUpload, Loader2 } from "lucide-react";

/**
 * RentPropertyForm.jsx
 *
 * This component is updated to explicitly handle 'value' and 'onChange'
 * within the custom 'AnimatedInput' component to prevent common 'one-character-bug'
 * issues associated with prop spreading in controlled input environments.
 * The submission endpoint is a mock URL.
 */

// --- CONFIGURATION ---
const HERO_IMAGE_URL = "https://i.pinimg.com/1200x/7b/e6/a5/7be6a53e725918bd67c6de20d878516b.jpg";
const MOCK_API_BASE = "http://localhost:5000"; // IMPORTANT: Change this to your actual API base URL!
// ---------------------

const initialState = {
  title: "",
  price: "",
  location: "",
  bedrooms: "",
  furnishing: "",
  propertyType: "",
  parking: "",
  facing: "",
  area: "",
  description: "",
};

// Framer Motion variants for input fields
const inputVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Framer Motion variants for the main form container
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

// Custom Input Component for animation and styling consistency
// NOTE: Explicitly destructuring value and onChange here for robust controlled component behavior.
const AnimatedInput = React.forwardRef(({ label, required, name, value, onChange, children, ...props }, ref) => (
  <motion.div variants={inputVariants}>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {props.type === "textarea" ? (
      <textarea
        ref={ref}
        name={name}
        value={value} // Explicitly set value
        onChange={onChange} // Explicitly set onChange
        {...props}
        className="mt-1 block w-full rounded-xl border-gray-200 shadow-inner p-3 transition duration-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 hover:border-blue-400 resize-y min-h-[100px]"
        required={required}
      />
    ) : props.type === "select" ? (
      <div className="relative">
        <select
          ref={ref}
          name={name}
          value={value} // Explicitly set value
          onChange={onChange} // Explicitly set onChange
          {...props}
          className="mt-1 block w-full rounded-xl border-gray-200 shadow-inner p-3 transition duration-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 hover:border-blue-400 appearance-none pr-8 cursor-pointer"
          required={required}
        >
          {children}
        </select>
        {/* Custom arrow for select */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    ) : (
      <input
        ref={ref}
        name={name}
        value={value} // Explicitly set value
        onChange={onChange} // Explicitly set onChange
        {...props}
        className="mt-1 block w-full rounded-xl border-gray-200 shadow-inner p-3 transition duration-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 hover:border-blue-400"
        required={required}
      />
    )}
  </motion.div>
));

export default function RentPropertyForm() {
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]); // { file, url }
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const apiBase = MOCK_API_BASE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Property Title is required";
    if (!form.location.trim()) return "Location is required";
    // Check if price is provided and is a valid positive number
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) return "Valid Price required";
    if (!form.bedrooms) return "Bedrooms (BHK) required";
    return null;
  };

  const onFiles = (filesList) => {
    const files = Array.from(filesList);
    // Filter to accept only image files
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const mapped = imageFiles.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setImages((p) => [...p, ...mapped].slice(0, 8)); // limit 8 images
  };

  const handleFileChange = (e) => {
    onFiles(e.target.files);
    // Reset file input value to allow selecting the same file(s) again
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files?.length) onFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    setImages((p) => {
      // revoke object URL to free memory
      const removed = p[index];
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return p.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const fd = new FormData();
      // Append form fields
      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value);
      });

      // Append images (field name must match backend expectation, e.g., "images")
      images.forEach((img, idx) => {
        // Renaming the file if it doesn't have a name is good practice for FormData
        const filename = img.file.name || `image-${idx}-${Date.now()}.jpg`;
        fd.append("images", img.file, filename);
      });

      const url = (`${import.meta.env.VITE_API_URL}/rentproperties`);
      const res = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          if (p.total) {
            setProgress(Math.round((p.loaded * 100) / p.total));
          }
        },
        timeout: 60000,
      });

      setMessage({ type: "success", text: "Property submitted successfully! 🎉 " });
      setForm(initialState);

      // Cleanup Object URLs and reset image state
      images.forEach((i) => i.url && URL.revokeObjectURL(i.url));
      setImages([]);
      setProgress(0);

    } catch (error) {
      console.error(error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit property. Check console for details. (Mock Submission Failed)";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
      // Clear message after success/error
      setTimeout(() => setMessage(null), message?.type === 'success' ? 4000 : 6000);
    }
  };

  // Main Component Render
  return (
    // Removed pt-10 to let the hero start from the top edge
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans relative overflow-hidden">
      {/* Optional: Add a subtle background pattern for texture */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a7a9be\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '20px 20px' }}></div>

      {/* HERO SECTION - Modern and visually striking */}
      <div className="relative h-[400px] overflow-hidden">
        
        {/* Background Image with Parallax-like effect */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: `url(${HERO_IMAGE_URL})`,
            backgroundAttachment: 'fixed', 
            transform: 'scale(1.05)', 
            // Ensure background position is responsive
            backgroundPosition: 'center 40%' 
          }}
          // Fallback image in case the URL fails to load
          onError={(e) => {
            e.target.style.backgroundImage = 'url(https://placehold.co/1200x400/1e3a8a/ffffff?text=Property+Listing)';
            e.target.style.backgroundAttachment = 'scroll';
          }}
        ></div>

        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {/* Hero Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center p-4">
          <motion.h1
            // Use light font weight for slim modern feel
            className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-4 drop-shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            List Your Rental Property
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-200 max-w-3xl drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Showcase your apartment, villa, or independent house to a broad audience. Complete the form below to start listing your property today.
          </motion.p>
        </div>
      </div>
      {/* END HERO SECTION */}

      {/* MAIN FORM CONTAINER - Now positioned correctly below the hero section */}
      <motion.div
        className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-300/60 p-4 lg:p-5 -mt-24 mb-12 relative border border-white/50 z-10" 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          // Using font-light for the form title as well for a consistent, modern feel
          className="text-3xl font-light text-gray-900 mb-6 border-b pb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="text-blue-600">Property Details</span> & Images 🏡
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4"> {/* space-y-4 for tighter vertical packing */}
          {/* Title */}
          <AnimatedInput
            label="Property Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Modern 2BHK Apartment in Kothrud with Balcony"
            required
          />

          {/* Price & Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* gap-4 for tighter vertical packing */}
            <AnimatedInput
              label="Price (₹/month)"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="25000"
              required
            />

            <AnimatedInput
              label="Area (sqft)"
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="1200"
            />
          </div>

          {/* Location */}
          <AnimatedInput
            label="Location (City and Locality)"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Pune, Kothrud"
            required
          />

          {/* BHK, Furnishing & Property Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* gap-4 for tighter vertical packing */}
            <AnimatedInput
              label="Bedrooms"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              type="select"
              required
            >
              <option value="">Select BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </AnimatedInput>

            <AnimatedInput
              label="Furnishing"
              name="furnishing"
              value={form.furnishing}
              onChange={handleChange}
              type="select"
            >
              <option value="">Select Furnishing</option>
              <option value="Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </AnimatedInput>

            <AnimatedInput
              label="Property Type"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              type="select"
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
              <option value="Independent House">Independent House</option>
            </AnimatedInput>
          </div>

          {/* Parking & Facing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* gap-4 for tighter vertical packing */}
            <AnimatedInput
              label="Parking"
              name="parking"
              value={form.parking}
              onChange={handleChange}
              type="select"
            >
              <option value="">Select Parking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </AnimatedInput>

            <AnimatedInput
              label="Facing"
              name="facing"
              value={form.facing}
              onChange={handleChange}
              type="select"
            >
              <option value="">Select Facing</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </AnimatedInput>
          </div>

          {/* Description */}
          <AnimatedInput
            label="Detailed Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            type="textarea"
            placeholder="Add any additional details (amenities, nearby landmarks, lease terms)..."
          />

          {/* Image uploader */}
          <motion.div variants={inputVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Photos (max 8)
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              // Enhanced dropzone styling for better interactivity
              className="border-4 border-dashed border-blue-300 bg-blue-50 rounded-xl p-6 text-center transition duration-300 hover:border-blue-600/70 hover:bg-blue-100 cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
                <CloudUpload size={32} />
                <div className="font-semibold text-xl transition-colors duration-300 group-hover:text-blue-700">Drag & drop images here, or click to browse</div>
                <div className="text-sm text-gray-500">JPEG / PNG — up to 8 files are allowed</div>
              </div>

              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>

            {/* previews */}
            <AnimatePresence>
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="relative border border-gray-200 rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition duration-300 aspect-video"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout
                    >
                      <img
                        src={img.url}
                        alt={`Property image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <motion.button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-white/80 text-gray-800 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500 hover:text-white"
                        title="Remove image"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/10 text-xs text-white p-1 text-center font-medium truncate backdrop-blur-sm">
                        {img.file.name}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* upload progress */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-2 rounded-full overflow-hidden">
                  <div className="text-sm text-blue-600 font-medium mb-1 flex justify-between">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* message */}
          <AnimatePresence>
            {message && (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`p-4 rounded-xl text-base font-medium shadow-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* submit */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <motion.button
              disabled={loading}
              type="submit"
              // Modern button styling: gradient, elevated shadow
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/50 hover:from-blue-700 hover:to-blue-800 transition duration-300 disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed min-w-[200px]"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.7), 0 4px 6px -2px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Property Listing"
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => {
                setForm(initialState);
                images.forEach((i) => i.url && URL.revokeObjectURL(i.url));
                setImages([]);
                setMessage(null);
                setProgress(0);
              }}
              // Enhanced clear button interaction
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition duration-300 disabled:opacity-60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              Clear Form
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}