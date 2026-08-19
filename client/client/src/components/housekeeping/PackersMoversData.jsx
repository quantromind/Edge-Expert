// src/components/packersMoversData.js

import React from "react";
import { 
    Truck, Building, DollarSign, Package,
    CheckCircle, Award, ClipboardList, 
    Home, Headset, RefreshCcw, MapPin, Car,
} from "lucide-react";

// --- PLACEHOLDER DATA (Specific to Packers & Movers) ---

export const servicesOffered = [
    { label: "Within City", discount: "Upto 25% Off", icon: <Building className="w-6 h-6 text-red-500" /> },
    { label: "Between Cities", discount: "Upto 35% Off", icon: <Truck className="w-6 h-6 text-red-500" /> },
    { label: "City Tempo", discount: "Upto 30% Off", icon: <Package className="w-6 h-6 text-red-500" /> },
    { label: "Vehicle Shifting", discount: "Just launched!", icon: <Car className="w-6 h-6 text-red-500" /> },
];

export const detailedServices = [
    { title: "Home Shifting (Within City)", icon: <Home className="w-5 h-5 text-indigo-600" />, features: ["Verified Labour", "Damage Insurance", "24/7 Support"] },
    { title: "Intercity Relocation", icon: <Truck className="w-5 h-5 text-indigo-600" />, features: ["Pan-India Network", "GPS Tracking", "Customized Packing"] },
    { title: "Office Shifting", icon: <Building className="w-5 h-5 text-indigo-600" />, features: ["IT Equipment Handling", "Weekend Moves", "Floor Planning"] },
    { title: "Vehicle Transport", icon: <Car className="w-5 h-5 text-indigo-600" />, features: ["Car & Bike Shipping", "Door-to-Door Delivery", "Transit Insurance"] },
    { title: "Packing & Unpacking", icon: <Package className="w-5 h-5 text-indigo-600" />, features: ["High-Quality Material", "Fragile Item Care", "Labeling Service"] },
];

export const citiesServed = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Surat"];

export const priceEstimates = [
    { type: "1 BHK", intraCity: "₹ 3,500 - ₹ 8,000", interCity: "₹ 10,000 - ₹ 20,000" },
    { type: "2 BHK", intraCity: "₹ 5,000 - ₹ 12,000", interCity: "₹ 15,000 - ₹ 35,000" },
    { type: "3 BHK", intraCity: "₹ 7,000 - ₹ 18,000", interCity: "₹ 20,000 - ₹ 50,000" },
    { type: "4+ BHK/Villa", intraCity: "₹ 9,000 - ₹ 25,000", interCity: "₹ 30,000 - ₹ 75,000" },
];

export const howItWorks = [
    { title: "Share your Shifting Requirement", details: "Help us by providing when and where you want to move.", icon: <ClipboardList className="w-6 h-6 text-indigo-500" /> },
    { title: "Receive Free Instant Quote", details: "Get guaranteed lowest price quote for your shifting instantly.", icon: <DollarSign className="w-6 h-6 text-indigo-500" /> },
    { title: "Assign Quality Service Expert", details: "To ensure safe relocation, quality service experts will be allotted for your movement.", icon: <Award className="w-6 h-6 text-indigo-500" /> },
    { title: "Leave the Heavy Lifting to Us", details: "Enjoy hassle-free, on-time movement of your household goods.", icon: <Package className="w-6 h-6 text-indigo-500" /> },
];

export const whyChooseUs = [
    { title: "Lowest Price Guarantee", details: "If you get an offer we'll match it any competitor quote.", icon: <DollarSign className="w-5 h-5 text-indigo-500" /> },
    { title: "Best Quality Service", details: "Defined Packing, Hauling and Moving Services.", icon: <Home className="w-5 h-5 text-indigo-500" /> },
    { title: "Reschedule your shifting anytime", details: "Change your shifting date as per your convenience.", icon: <RefreshCcw className="w-5 h-5 text-indigo-500" /> },
    { title: "Support Assistance", details: "Dedicated support assistance for property resolution.", icon: <Headset className="w-5 h-5 text-indigo-500" /> },
    { title: "Professional Labour", details: "Expert packing and moving using strong bindings.", icon: <CheckCircle className="w-5 h-5 text-indigo-500" /> },
];