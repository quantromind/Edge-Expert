// import React, { useState, useRef, useMemo } from "react";
// import UpgradeBannerSection from "../owner/UpgradeBannerSection";
// import PricingComparisonTableSection from "../owner/PricingComparisonTableSection";
// import OwnerTrustSection from "../owner/OwenerTrusTsection";
// import BenefitsSection from "../owner/Benifit";
// import HowItWorksSection from "../owner/HowItWork";
// import TestimonialsSection from "../owner/Testimonials";
// import FAQSection from "../owner/Faq";

// const OwnerPage = () => {
//   const [propertyType, setPropertyType] = useState("For Rent");
//   const scrollRef = useRef(null);
//   const scrollAmount = 300;

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       direction === "left"
//         ? (scrollRef.current.scrollLeft -= scrollAmount)
//         : (scrollRef.current.scrollLeft += scrollAmount);
//     }
//   };

//   // === FULL DETAILED PLAN DATA ===
//   const allPlansDetailed = useMemo(
//     () => ({
//       "For Rent": [
//         {
//           title: "Basic",
//           percentage: 75,
//           price: 3299,
//           popular: false,
//           features: {
//             validity: "30 Days",
//             searchPosition: "Medium Slot",
//             relationshipManager: false,
//             fieldVisit: false,
//             photoshoot: false,
//             rankBoost: "x",
//             socialMedia: false,
//             shorts: false,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "75%",
//           },
//         },
//         {
//           title: "Premium +",
//           percentage: 86,
//           price: 7499,
//           popular: true,
//           features: {
//             validity: "120 Days",
//             searchPosition: "Medium Slot",
//             relationshipManager: false,
//             fieldVisit: false,
//             photoshoot: true,
//             rankBoost: "x",
//             socialMedia: false,
//             shorts: false,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "86%",
//           },
//         },
//         {
//           title: "Assist",
//           percentage: 92,
//           price: 10999,
//           popular: false,
//           features: {
//             validity: "120 Days",
//             searchPosition: "Top Slot",
//             relationshipManager: true,
//             fieldVisit: false,
//             photoshoot: true,
//             rankBoost: "3 Boosts",
//             socialMedia: false,
//             shorts: true,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "92%",
//           },
//         },
//         {
//           title: "Super Assist",
//           percentage: 98,
//           price: 17999,
//           popular: false,
//           features: {
//             validity: "150 Days",
//             searchPosition: "Top Slot",
//             relationshipManager: true,
//             fieldVisit: true,
//             photoshoot: true,
//             rankBoost: "5 Boosts",
//             socialMedia: true,
//             shorts: true,
//             propertyReport: true,
//             matchingBuyers: "Upto 50",
//             listingVisibility: "98%",
//           },
//         },
//       ],

//       "For Sell": [
//         {
//           title: "Starter",
//           percentage: 70,
//           price: 5999,
//           popular: false,
//           features: {
//             validity: "60 Days",
//             searchPosition: "Medium Slot",
//             relationshipManager: false,
//             fieldVisit: false,
//             photoshoot: false,
//             rankBoost: "x",
//             socialMedia: false,
//             shorts: false,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "70%",
//           },
//         },
//         {
//           title: "Pro Seller",
//           percentage: 85,
//           price: 9999,
//           popular: true,
//           features: {
//             validity: "180 Days",
//             searchPosition: "Medium Slot",
//             relationshipManager: false,
//             fieldVisit: true,
//             photoshoot: true,
//             rankBoost: "3 Boosts",
//             socialMedia: false,
//             shorts: false,
//             propertyReport: false,
//             matchingBuyers: "Upto 10",
//             listingVisibility: "85%",
//           },
//         },
//         {
//           title: "Executive",
//           percentage: 95,
//           price: 14999,
//           popular: false,
//           features: {
//             validity: "240 Days",
//             searchPosition: "Top Slot",
//             relationshipManager: true,
//             fieldVisit: true,
//             photoshoot: true,
//             rankBoost: "5 Boosts",
//             socialMedia: true,
//             shorts: true,
//             propertyReport: false,
//             matchingBuyers: "Upto 30",
//             listingVisibility: "95%",
//           },
//         },
//         {
//           title: "Platinum",
//           percentage: 99,
//           price: 21999,
//           popular: false,
//           features: {
//             validity: "365 Days",
//             searchPosition: "Top Slot",
//             relationshipManager: true,
//             fieldVisit: true,
//             photoshoot: true,
//             rankBoost: "Unlimited",
//             socialMedia: true,
//             shorts: true,
//             propertyReport: true,
//             matchingBuyers: "Unlimited",
//             listingVisibility: "99%",
//           },
//         },
//       ],

//       "For Buy": [
//         {
//           title: "Roommate",
//           percentage: 78,
//           price: 1999,
//           popular: false,
//           features: {
//             validity: "30 Days",
//             searchPosition: "Medium Slot",
//             relationshipManager: false,
//             fieldVisit: false,
//             photoshoot: false,
//             rankBoost: "x",
//             socialMedia: false,
//             shorts: false,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "78%",
//           },
//         },
//         {
//           title: "Hostel Pro",
//           percentage: 88,
//           price: 3499,
//           popular: true,
//           features: {
//             validity: "90 Days",
//             searchPosition: "Medium Slot",
//             relationshipManager: false,
//             fieldVisit: false,
//             photoshoot: true,
//             rankBoost: "x",
//             socialMedia: false,
//             shorts: false,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "88%",
//           },
//         },
//         {
//           title: "Community",
//           percentage: 94,
//           price: 5499,
//           popular: false,
//           features: {
//             validity: "120 Days",
//             searchPosition: "Top Slot",
//             relationshipManager: true,
//             fieldVisit: false,
//             photoshoot: true,
//             rankBoost: "3 Boosts",
//             socialMedia: false,
//             shorts: true,
//             propertyReport: false,
//             matchingBuyers: "x",
//             listingVisibility: "94%",
//           },
//         },
//         {
//           title: "Elite PG",
//           percentage: 99,
//           price: 7999,
//           popular: false,
//           features: {
//             validity: "180 Days",
//             searchPosition: "Top Slot",
//             relationshipManager: true,
//             fieldVisit: true,
//             photoshoot: true,
//             rankBoost: "5 Boosts",
//             socialMedia: true,
//             shorts: true,
//             propertyReport: true,
//             matchingBuyers: "Upto 100",
//             listingVisibility: "99%",
//           },
//         },
//       ],
//     }),
//     []
//   );

//   const selectedPlansDetailed =
//     allPlansDetailed[propertyType] || allPlansDetailed["For Rent"];

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen font-sans">
//       {/* 🌟 Hero Section */}
//       <section
//         className="text-center py-28 px-6 rounded-b-xl shadow-xl text-white relative"
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('https://i.pinimg.com/736x/63/ca/be/63cabe1f5da579c0ac1cd112f2e28af6.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
//           Welcome, Property Owners
//         </h1>
//         <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
//           Manage your listings, gain visibility insights, and upgrade your plan to reach
//           maximum potential buyers or renters.
//         </p>
//         <div className="flex justify-center gap-4">
//           <button className="bg-white text-indigo-700 px-8 py-3 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-200 transform hover:scale-105">
//             Manage Listings
//           </button>
//           <a
//             href="#pricing-compare"
//             className="inline-block border-2 border-white text-white px-8 py-3 font-bold rounded-full hover:bg-white hover:text-indigo-700 transition duration-200 transform hover:scale-105"
//           >
//             View Pricing
//           </a>
//         </div>
//       </section>

//       {/* 💎 Upgrade Banner Section */}
//       <UpgradeBannerSection
//         propertyType={propertyType}
//         setPropertyType={setPropertyType}
//       />

//       {/* ⚡ Pricing Comparison Table */}
//       <PricingComparisonTableSection
//         id="pricing-compare"
//         plans={selectedPlansDetailed}
//       />

//       {/* 🏢 Additional Sections */}
//       <OwnerTrustSection />
//       <BenefitsSection />
//       <HowItWorksSection />
//       <TestimonialsSection />
//       <FAQSection />
//     </div>
//   );
// };

// export default OwnerPage;
