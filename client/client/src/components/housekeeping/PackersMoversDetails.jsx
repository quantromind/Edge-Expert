// src/components/housekeeping/PackersMoversDetails.jsx

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, ChevronDown, MapPin, 
} from "lucide-react";

// --- IMPORT SERVICE DATA (Path corrected to navigate up one directory) ---
import { 
    servicesOffered, 
    detailedServices, 
    citiesServed, 
    priceEstimates, 
    howItWorks, 
    whyChooseUs 
} from "./PackersMoversData";


// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const containerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};


// Reusable Form Component (Adjusted for P&M flow)
const ShiftingForm = () => (
    <div className="p-6 rounded-xl shadow-2xl bg-white border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            Where are you going to relocate?
        </h2>

        <div className="flex gap-2 p-1 bg-gray-200 rounded-lg mb-4">
            <button className="flex-1 bg-indigo-600 text-white text-sm py-2 rounded-lg shadow-md transition">
                Within City
            </button>
            <button className="flex-1 text-gray-700 text-sm py-2 rounded-lg transition">
                Between Cities
            </button>
            <button className="flex-1 text-gray-700 text-sm py-2 rounded-lg transition">
                Rent Truck
            </button>
        </div>

        <div className="space-y-4">
            <div className="relative">
                <label className="text-xs font-medium text-gray-500 block mb-1">Select City</label>
                <div className="relative">
                    <select className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 appearance-none focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="">Select your city</option>
                        <option>Mumbai</option>
                        <option>Delhi</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 mt-1 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 block">Select pickup and drop location</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                    <input type="text" placeholder="Shifting From" className="w-full border border-gray-300 py-2.5 pl-10 pr-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition" />
                </div>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full" />
                    <input type="text" placeholder="Shifting To" className="w-full border border-gray-300 py-2.5 pl-10 pr-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition" />
                </div>
            </div>

            <div className="relative">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-700 h-[44px] flex items-center">
                        <span className="w-5 h-4 inline-block bg-cover bg-center border border-gray-300 rounded-sm" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png')" }}></span>
                        <span className="ml-1 mr-2 text-sm text-gray-600">+91</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                        <span className="ml-2 h-6 border-l border-gray-300"></span>
                    </div>
                    <input type="tel" placeholder="Mobile Number" className="w-full border border-gray-300 py-2.5 pl-[100px] pr-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition" />
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-xl"
            >
                Check Prices
            </motion.button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
            <h3 className="font-bold text-gray-800 mb-2">Recent Successful Movements</h3>
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center text-xs">
                <div>
                    <p className="font-medium text-gray-800">Harsh Gupta</p>
                    <p className="text-gray-500">MUMBAI | Within City Movement</p>
                    <p className="text-gray-500 mt-1">Movement Successful On: <span className="font-medium">05-11-2025</span></p>
                </div>
                <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full">COMPLETED</span>
            </div>
            <div className="mt-4 text-center">
                <button className="text-xs text-indigo-500 hover:text-indigo-700 bg-gray-200 px-3 py-1 rounded-full transition">
                    Click To See What Our Customers Say About Us →
                </button>
            </div>
        </div>
    </div>
);


// --- MAIN PACKERS & MOVERS COMPONENT ---
const PackersMoversDetails = () => {
    const navigate = useNavigate();

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            {/* 📦 HERO SECTION */}
            <section className="bg-purple-800 py-10 md:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center space-y-6 text-white relative z-10">
                    <motion.button
                        onClick={() => navigate("/housekeeping")} // Navigate back to HouseKeeping main page
                        className="self-start flex items-center gap-1 text-white/80 text-sm font-medium hover:text-white transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Services
                    </motion.button>

                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center"
                    >
                        India's Largest <span className="text-yellow-400">Packers and Movers</span>
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg text-gray-200 max-w-lg text-center"
                    >
                        Trusted Packers & Movers with affordable, efficient, and fast house-shifting services.
                    </motion.p>
                </div>
            </section>

            {/* 🚚 SERVICE DETAILS & FORM (TWO-COLUMN LAYOUT) */}
            <section className="py-12 bg-white">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-10"
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* Services Offered Summary */}
                        <div className="pt-4">
                            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-800 mb-8">
                                Services We Offer
                            </motion.h2>
                            <div className="flex flex-wrap gap-6">
                                {servicesOffered.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className="flex flex-col items-center text-center p-4 w-32 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="relative mb-2">
                                            <div className="bg-red-100 p-3 rounded-full border-2 border-red-500/50">{service.icon}</div>
                                            <span className={`absolute -top-3 -right-3 text-[10px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap bg-red-600 text-white shadow-md`}>
                                                {service.discount}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800 mt-2">{service.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Estimated Price Range Table */}
                        <motion.div variants={fadeInUp}>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Estimated Shifting Price Range</h3>
                            <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-inner">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intra-City (Same City)</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inter-City (City to City)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {priceEstimates.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold text-green-600">{item.intraCity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold text-red-600">{item.interCity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-500 mt-3">*Prices are estimates only. Get a confirmed quote using the form.</p>
                            </div>
                        </motion.div>

                        {/* Detailed Service List */}
                        <motion.div
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-gray-800 mb-6 mt-12 border-b pb-2">
                                Comprehensive Moving Services
                            </motion.h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {detailedServices.map((service, index) => (
                                    <motion.div key={index} variants={fadeInUp} className="p-4 bg-white rounded-lg shadow-sm border border-indigo-100">
                                        <div className="flex items-center mb-2">
                                            <div className="p-2 rounded-full bg-indigo-100 mr-3">{service.icon}</div>
                                            <h4 className="font-semibold text-gray-800">{service.title}</h4>
                                        </div>
                                        <ul className="list-disc list-inside text-sm text-gray-600 ml-2 space-y-1">
                                            {service.features.map((feature, i) => (
                                                <li key={i}>{feature}</li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Cities Served */}
                            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-gray-800 mb-6 mt-12 border-b pb-2">
                                Cities We Serve Across India
                            </motion.h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                {citiesServed.map((city, index) => (
                                    <motion.span
                                        key={index}
                                        variants={fadeInUp}
                                        className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200"
                                    >
                                        <MapPin className="w-3 h-3 text-red-500 mr-1" />
                                        {city}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* How It Works */}
                        <div>
                            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-800 mb-10 mt-12">
                                How Edge Expert Packers and Movers Works?
                            </motion.h2>
                            <div className="space-y-8">
                                {howItWorks.map((step, index) => (
                                    <motion.div key={index} variants={fadeInUp} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                        <div className="p-3 rounded-full flex-shrink-0 border-2 border-indigo-200 bg-indigo-50">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{step.details}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Shifting Form (Sticky) */}
                    <motion.div
                        className="lg:col-span-1 w-full lg:sticky lg:top-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ShiftingForm />
                    </motion.div>
                </motion.div>
            </section>

            {/* ⭐ WHY CHOOSE US SECTION */}
            <section className="py-12 bg-gray-50">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6"
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-800 mb-10 text-center">
                        Why Edge Expert's Movers Only?
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {whyChooseUs.map((item, index) => (
                            <motion.div key={index} variants={fadeInUp} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-lg shadow-md">
                                <div className="p-3 rounded-full flex-shrink-0 bg-indigo-50 border border-indigo-200">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default PackersMoversDetails;