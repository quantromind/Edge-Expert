// src/components/ServiceData.js

import React from 'react';
import { 
    Home, PaintBrush, Tiler, Wrench, Building, DollarSign, 
    Leaf, Lightbulb, Shield, Ruler, CheckCircle, Award, 
    Headset, ClipboardList, RefreshCcw, Truck, Car 
} from "lucide-react";

// --- SERVICE DATA ---

export const ServiceData = {
    // --- HOME PAINTING DETAILS ---
    'home-painting': {
        title: "Home Painting & Waterproofing",
        subtitle: "Expert painters for interior, exterior, and protective finishes. Guaranteed quality.",
        heroText: "The Hassle-Free Way to Transform Your Home",
        heroColor: "bg-blue-600",
        formTitle: "Get a Free Consultation & Quote",
        primaryServices: [
            { label: "Interior Painting", discount: "Flat 10% Off", icon: <Home className="w-6 h-6 text-blue-500" /> },
            { label: "Exterior Painting", discount: "5-Year Warranty", icon: <Building className="w-6 h-6 text-blue-500" /> },
            { label: "Waterproofing", discount: "Monsoon Ready!", icon: <Shield className="w-6 h-6 text-blue-500" /> },
            { label: "Wood Polishing", discount: "New Look!", icon: <PaintBrush className="w-6 h-6 text-blue-500" /> },
        ],
        priceEstimates: [
            { type: "1 BHK", estimate: "₹ 8,000 - ₹ 15,000", feature: "Basic Interior Paint" },
            { type: "2 BHK", estimate: "₹ 15,000 - ₹ 30,000", feature: "Premium Washable Paint" },
            { type: "3 BHK", estimate: "₹ 25,000 - ₹ 50,000", feature: "Interior + Exterior Package" },
        ],
        detailedServices: [
            { title: "Standard Painting", icon: <PaintBrush />, features: ["Certified Painters", "1-Year Warranty", "Color Consultation"] },
            { title: "Waterproofing Solutions", icon: <Shield />, features: ["Terrace Waterproofing", "Bathroom Leakage Fixes", "5-Year Guarantee"] },
            { title: "Eco-Friendly Options", icon: <Leaf />, features: ["Low VOC Paints", "Dust-Free Sanding", "Quick Drying"] },
            { title: "Touch-ups & Repairs", icon: <Wrench />, features: ["Wall Crack Filling", "Dampness Treatment", "Minor Plaster Work"] },
        ],
        citiesServed: ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"],
        whyChooseUs: [
            { title: "Zero Mess Guarantee", details: "We cover furniture and deep-clean after finishing.", icon: <CheckCircle className="w-5 h-5 text-indigo-500" /> },
            { title: "Branded Materials Only", details: "Use of top brands like Asian Paints, Berger, etc.", icon: <Award className="w-5 h-5 text-indigo-500" /> },
            { title: "Project Manager Supervision", details: "Dedicated manager for on-time and quality completion.", icon: <Headset className="w-5 h-5 text-indigo-500" /> },
        ],
    },

    // --- HOME RENOVATION DETAILS ---
    'home-renovation': {
        title: "Home Renovation & Remodeling",
        subtitle: "Full-service remodeling for kitchens, bathrooms, and complete home makeovers.",
        heroText: "Your Dream Home, Expertly Built",
        heroColor: "bg-orange-600",
        formTitle: "Start Your Renovation Project",
        primaryServices: [
            { label: "Kitchen Remodel", discount: "Upto 20% Off", icon: <Wrench className="w-6 h-6 text-orange-500" /> },
            { label: "Bathroom Renovation", discount: "Fast Turnaround", icon: <Tiler className="w-6 h-6 text-orange-500" /> },
            { label: "Full Flat Renovation", discount: "10-Year Warranty", icon: <Home className="w-6 h-6 text-orange-500" /> },
            { label: "Custom Interiors", discount: "Design Included", icon: <Ruler className="w-6 h-6 text-orange-500" /> },
        ],
        priceEstimates: [
            { type: "Modular Kitchen", estimate: "₹ 1,50,000+", feature: "Standard size, premium finish" },
            { type: "Bathroom Renovation", estimate: "₹ 70,000+", feature: "Full overhaul including plumbing" },
            { type: "1 BHK Renovation", estimate: "₹ 3,00,000+", feature: "Complete floor to ceiling work" },
        ],
        detailedServices: [
            { title: "Design & Planning", icon: <Lightbulb />, features: ["3D Visualization", "Architect Consultation", "Budgeting"] },
            { title: "Structural Works", icon: <Building />, features: ["Wall Demolition/Construction", "Flooring & Tiling", "Electrical Wiring"] },
            { title: "Plumbing & Sanitary", icon: <Tiler />, features: ["Concealed Piping", "Fixture Installation", "Water Testing"] },
        ],
        citiesServed: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai"],
        whyChooseUs: [
            { title: "Single Point of Contact", details: "One Project Manager handles everything from design to handover.", icon: <Headset className="w-5 h-5 text-indigo-500" /> },
            { title: "Timely Delivery", details: "Guaranteed project schedule with weekly updates.", icon: <ClipboardList className="w-5 h-5 text-indigo-500" /> },
            { title: "Quality Checkpoints", details: "100+ quality checks during the renovation process.", icon: <CheckCircle className="w-5 h-5 text-indigo-500" /> },
        ],
    },

    // --- WALL PANELLING DETAILS ---
    'wall-panelling': {
        title: "Wall Panelling & False Ceiling",
        subtitle: "Modern aesthetic solutions including wooden, PVC, and Gypsum work.",
        heroText: "Add Texture and Style to Your Walls",
        heroColor: "bg-gray-700",
        formTitle: "Design Consultation Request",
        primaryServices: [
            { label: "Wooden Panelling", discount: "Premium Material", icon: <Ruler className="w-6 h-6 text-gray-400" /> },
            { label: "PVC Panelling", discount: "Waterproof", icon: <Shield className="w-6 h-6 text-gray-400" /> },
            { label: "False Ceiling", discount: "Custom Lighting", icon: <Lightbulb className="w-6 h-6 text-gray-400" /> },
            { label: "Accent Walls", discount: "Designer Finish", icon: <Home className="w-6 h-6 text-gray-400" /> },
        ],
        priceEstimates: [
            { type: "PVC Panelling", estimate: "₹ 80 - ₹ 150/sq ft", feature: "Includes installation" },
            { type: "Wooden Panelling", estimate: "₹ 400 - ₹ 800/sq ft", feature: "Includes premium polish" },
            { type: "Gypsum False Ceiling", estimate: "₹ 90 - ₹ 130/sq ft", feature: "Perimeter design, basic paint" },
        ],
        detailedServices: [
            { title: "Wooden & Veneer", icon: <Ruler />, features: ["Custom Grain Selection", "Termite Protection", "Seamless Installation"] },
            { title: "PVC & WPC Panels", icon: <Shield />, features: ["Moisture Resistant", "Easy Maintenance", "Variety of Textures"] },
            { title: "False Ceiling", icon: <Lightbulb />, features: ["Gypsum/POP Work", "Acoustic Solutions", "Concealed Lighting Setup"] },
        ],
        citiesServed: ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Ahmedabad", "Pune"],
        whyChooseUs: [
            { title: "Specialized Artisans", details: "Our workers are experts only in finishing and detailing.", icon: <Award className="w-5 h-5 text-indigo-500" /> },
            { title: "Material Warranty", details: "Warranty on materials and installation finishing.", icon: <RefreshCcw className="w-5 h-5 text-indigo-500" /> },
            { title: "Quick Installation", details: "Modular approach minimizes disruption and time.", icon: <Truck className="w-5 h-5 text-indigo-500" /> },
        ],
    },
};

// Exporting utility icons for reuse
export { 
    Home, PaintBrush, Tiler, Wrench, Building, DollarSign, 
    Leaf, Lightbulb, Shield, Ruler, CheckCircle, Award, 
    Headset, ClipboardList, RefreshCcw, Truck, Car 
};