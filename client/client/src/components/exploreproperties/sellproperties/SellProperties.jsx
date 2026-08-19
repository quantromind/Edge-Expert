import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Home,
    Upload,
    User,
    Mail,
    Phone,
    MapPin,
    IndianRupee,
    CheckCircle,
    Loader,
    Maximize
} from "lucide-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_API_URL;

const SellProperty = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        propertyTitle: "",
        location: "",
        expectedPrice: "",
        ownerName: "",
        email: "",
        phoneNumber: "",
        amenities: "",
        description: "",
        propertystatus: "available",
        type: "",
        area: "",
        latitude: "",
        longitude: ""
    });

    const [images, setImages] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detecting, setDetecting] = useState(false);
    const [locationSuccess, setLocationSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        const datatosubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            datatosubmit.append(key, value);
        });

        images.forEach((img) => datatosubmit.append("images", img));
        setLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/sellproperty/createproperty`, datatosubmit, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (data.success) {
                setFormData({
                    propertyTitle: "",
                    location: "",
                    expectedPrice: "",
                    ownerName: "",
                    email: "",
                    phoneNumber: "",
                    amenities: "",
                    description: "",
                    propertystatus: "available",
                    type: "",
                    area: "",
                    latitude: "",
                    longitude: ""
                });
                setImages([]);
                navigate('/sellproperties');
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 2000);
                alert("Property submitted successfully");
            } else {
                alert("Upload failed");
                setSubmitted(false);
            }
        } catch (err) {
            console.log(err);
            alert("Upload failed");
            setSubmitted(false);
        } finally {
            setLoading(false);
        }
    };

    const detectLocation = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setDetecting(false);
            return;
        }

        setDetecting(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await response.json();
                    const fullLocation = data.display_name || "Unknown";

                    setFormData((prev) => ({
                        ...prev,
                        location: fullLocation,
                        latitude: latitude,
                        longitude: longitude
                    }));

                    setLocationSuccess(true);
                } catch (error) {
                    console.error(error);
                    alert("Failed to fetch address");
                } finally {
                    setDetecting(false);
                }
            },
            (error) => {
                console.error(error);
                alert("Unable to access location. Please allow GPS permission.");
                setDetecting(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-sky-50 to-white font-sans relative">
            {/* Hero Section */}
            <section
                className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://i.pinimg.com/1200x/a6/f6/d0/a6f6d078f27076881eeb09e922307d62.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-sky-900/50 backdrop-blur-sm"></div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center text-white max-w-xl md:max-w-3xl px-4"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 leading-tight">
                        Sell or List Your Property with Ease 🏡
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-sky-100 font-normal">
                        Reach verified buyers and get the best deal for your space.
                    </p>
                </motion.div>
            </section>

            {/* Sell Property Form */}
            <section className="flex justify-center px-4 py-10 sm:py-16 -mt-32 sm:-mt-40 relative z-20">
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-xl md:max-w-2xl"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-black text-center mb-8">
                        Property Information
                    </h2>

                    {/* Input Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        {/* Inputs remain same, just responsive paddings and sizes */}
                        {[
                            { icon: <Home />, name: "propertyTitle", placeholder: "Property Title", type: "text" },
                            { icon: <MapPin />, name: "location", placeholder: "Address", type: "text" },
                            { icon: <IndianRupee />, name: "expectedPrice", placeholder: "Expected Price", type: "number" },
                            { icon: <User />, name: "ownerName", placeholder: "Owner Name", type: "text" },
                            { icon: <Mail />, name: "email", placeholder: "Email Address", type: "email" },
                            { icon: <Phone />, name: "phoneNumber", placeholder: "Phone Number", type: "tel" },
                        ].map((field, i) => (
                            <div
                                key={i}
                                className="flex items-center bg-white/60 rounded-2xl p-3 sm:p-4 shadow-sm border border-sky-100"
                            >
                                <div
                                    className={field.name === "location" ? "hover:cursor-pointer text-sky-600 mr-2 shrink-0" : "text-sky-600 mr-2 shrink-0"}
                                    onClick={field.name === "location" ? detectLocation : undefined}
                                >
                                    {field.icon}
                                </div>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full bg-transparent outline-none placeholder-gray-500 font-normal text-sm sm:text-base"
                                    required
                                />
                            </div>
                        ))}

                        {/* Dropdown, Type, Area */}
                        <div className="flex items-center bg-white/60 rounded-2xl p-3 sm:p-4 shadow-sm border border-sky-100">
                            <Loader className="text-sky-600 mr-2" />
                            <select
                                name="propertystatus"
                                value={formData.propertystatus}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none font-normal text-sm sm:text-base"
                                required
                            >
                                <option value="available">Available</option>
                                <option value="ready to move">Ready to Move</option>
                                <option value="under construction">Under Construction</option>
                            </select>
                        </div>

                        <div className="flex items-center bg-white/60 rounded-2xl p-3 sm:p-4 shadow-sm border border-sky-100">
                            <Home className="text-sky-600 mr-2" />
                            <input
                                name="type"
                                type="text"
                                placeholder="Type (e.g. 1BHK, 2BHK)"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none placeholder-gray-500 font-normal text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div className="flex items-center bg-white/60 rounded-2xl p-3 sm:p-4 shadow-sm border border-sky-100">
                            <Maximize className="text-sky-600 mr-2" />
                            <input
                                name="area"
                                type="text"
                                placeholder="Area (in Sq Ft)"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none placeholder-gray-500 font-normal text-sm sm:text-base"
                                required
                            />
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-5 sm:mt-6">
                        <textarea
                            name="amenities"
                            placeholder="Enter amenities separated by commas (e.g. WiFi, Parking, Furnished)"
                            value={formData.amenities}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 sm:p-4 rounded-2xl bg-white/60 border border-sky-100 outline-none placeholder-gray-500 shadow-sm font-normal text-sm sm:text-base"
                            required
                        ></textarea>
                    </div>

                    {/* Description */}
                    <div className="mt-5 sm:mt-6">
                        <textarea
                            name="description"
                            placeholder="Enter description about your property"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 sm:p-4 rounded-2xl bg-white/60 border border-sky-100 outline-none placeholder-gray-500 shadow-sm font-normal text-sm sm:text-base"
                            required
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center border-2 border-dashed border-sky-300 rounded-2xl p-5 sm:p-6 bg-white/40 hover:bg-white/60 transition text-center">
                        <label className="cursor-pointer flex flex-col items-center text-sky-700 w-full">
                            <Upload className="mb-2" />
                            <span className="font-normal text-sm sm:text-base">Click to Upload Property Images</span>
                            <input
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                            {images.length > 0 && (
                                <ul className="text-sm mt-2 text-gray-700 font-normal max-h-24 overflow-y-auto">
                                    {images.slice(0, 5).map((file, index) => (
                                        <li key={index}>Uploaded: {file.name}</li>
                                    ))}
                                    {images.length > 5 && (
                                        <li className="text-gray-700">
                                            and {images.length - 5} more...
                                        </li>
                                    )}
                                </ul>
                            )}
                        </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className={`mt-8 w-full py-3 sm:py-4 rounded-2xl font-semibold text-white text-sm sm:text-base transition ${
                            loading
                                ? "bg-sky-300 cursor-not-allowed"
                                : "bg-linear-to-r from-sky-500 to-sky-600 hover:shadow-sky-300"
                        }`}
                    >
                        {loading ? "Uploading..." : "Submit Property"}
                    </motion.button>

                    {/* Success Message */}
                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-6 flex flex-col items-center text-sky-700"
                        >
                            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 mb-2" />
                            <p className="text-base sm:text-lg font-semibold">
                                Property submitted successfully 🎉
                            </p>
                        </motion.div>
                    )}
                </motion.form>
            </section>
        </div>
    );
};

export default SellProperty;