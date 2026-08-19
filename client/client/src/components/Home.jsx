// import React, { useState } from "react";
// import SearchBar from "./SearchBar";
// import Homefeature from "./Homesection/HomeFeature";
// import { TypographyP, TypographyH4, TypographyMuted } from "./custom/Typography";
// import { Dice6, User, Grid, Box } from "lucide-react";

// // Hero background images
// const heroBackgrounds = {
//   buy: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//   rent: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//   sell: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
// };

// // Statistics data
// const statsData = [
//   { icon: <Dice6 size={28} />, value: "15K+", label: "Properties Listed" },
//   { icon: <User size={28} />, value: "10K+", label: "Happy Customers" },
//   { icon: <Grid size={28} />, value: "500+", label: "Cities Covered" },
//   { icon: <Box size={28} />, value: "250+", label: "Home Work" },
// ];

// // Innovative Feature Section Data
// const features = [
//   {
//     title: "Verified Listings",
//     description: "All properties are verified by our team for complete transparency.",
//     color: "bg-blue-600",
//     icon: "🏠",
//   },
//   {
//     title: "Instant Support",
//     description: "Get 24/7 assistance for queries and property guidance.",
//     color: "bg-green-600",
//     icon: "💬",
//   },
//   {
//     title: "Easy Documentation",
//     description: "Hassle-free property documentation and registration support.",
//     color: "bg-purple-600",
//     icon: "📄",
//   },
//   {
//     title: "Trusted Agents",
//     description: "Work with certified and trusted real estate agents.",
//     color: "bg-yellow-500",
//     icon: "👨‍💼",
//   },
// ];

// const Hero = () => {
//   const [selectedType, setSelectedType] = useState("buy");

//   return (
//     <div className="flex flex-col w-full">
//       {/* ============== Hero Section ============== */}
//       <div
//         className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-cover bg-center transition-all duration-700"
//         style={{ backgroundImage: `url(${heroBackgrounds[selectedType]})` }}
//       >
//         <div className="absolute inset-0 bg-black/50 transition-all duration-700" />
//         <div className="relative z-10 px-6 sm:px-12 flex flex-col items-center">
//           <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
//             Find Your <span className="text-blue-500">Perfect Home</span>
//           </h1>
//           <TypographyP className="text-white text-lg sm:text-xl max-w-2xl mb-8">
//             Discover properties for buying, renting, or selling across India. Your dream home is just a search away.
//           </TypographyP>

//           <div className="flex gap-4 mb-8">
//             {["buy", "rent", "sell"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setSelectedType(type)}
//                 className={`px-6 py-3 rounded-2xl font-semibold transition ${
//                   selectedType === type
//                     ? "bg-blue-600 text-white"
//                     : "bg-white/20 text-white hover:bg-white/40"
//                 }`}
//               >
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="w-full max-w-2xl">
//             <SearchBar placeholder="Find your properties..." />
//           </div>
//         </div>
//       </div>

//       {/* ============== Statistics Section ============== */}
//       <div className="w-full bg-gray-50 py-16 flex flex-col items-center">
//         <div className="max-w-7xl w-full grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {statsData.map((item, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl p-5 flex flex-col items-center text-gray-800 shadow hover:shadow-lg transition-transform hover:scale-105"
//             >
//               <div className="mb-2 text-blue-600">{item.icon}</div>
//               <TypographyH4 className="text-xl font-semibold">{item.value}</TypographyH4>
//               <TypographyMuted className="text-sm">{item.label}</TypographyMuted>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ============== Home Feature Section ============== */}
//       <div className="w-full">
//         <Homefeature />
//       </div>

//       {/* ============== Innovative Feature Section ============== */}
//       <div className="w-full bg-gray-100 py-16">
//         <div className="max-w-7xl mx-auto px-6 sm:px-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
//             Why Choose Edge Expert
//           </h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer"
//               >
//                 <div
//                   className={`text-5xl mb-4 rounded-full w-16 h-16 flex items-center justify-center text-white ${feature.color}`}
//                 >
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <TypographyP className="text-gray-600">{feature.description}</TypographyP>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
