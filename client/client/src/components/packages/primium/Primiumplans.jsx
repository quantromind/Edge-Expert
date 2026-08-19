// import React, { useState } from "react";
// import { Check, X } from "lucide-react";
// import paymentService from "../../../Api/paymentService.js";
// import axiosConfig from "../../../Api/axiosConfig.js";

// // Plans Data
// const plansData = [
//   { 
//     name: "Sachet", 
//     contacts: { 45: 5, 90: 10 }, 
//     price: { 45: 659, 90: 1199 }, 
//     originalPrice: { 45: 1198, 90: 2198 }, 
//     badge: "", 
//     isFeatured: false, 
//     discount: { 45: "10%", 90: "15%" } 
//   },
//   { 
//     name: "Connect", 
//     contacts: { 45: 15, 90: 30 }, 
//     price: { 45: 1209, 90: 2199 }, 
//     originalPrice: { 45: 2198, 90: 3998 }, 
//     badge: "", 
//     isFeatured: false, 
//     discount: { 45: "30%", 90: "35%" } 
//   },
//   { 
//     name: "Connect+", 
//     contacts: { 45: 25, 90: 50 }, 
//     price: { 45: 1539, 90: 2799 }, 
//     originalPrice: { 45: 2798, 90: 4998 }, 
//     badge: "Most Popular", 
//     isFeatured: true, 
//     discount: { 45: "45%", 90: "50%" } 
//   },
//   { 
//     name: "Relax", 
//     contacts: { 45: 50, 90: 100 }, 
//     price: { 45: 2309, 90: 4199 }, 
//     originalPrice: { 45: 4198, 90: 7998 }, 
//     badge: "", 
//     isFeatured: false, 
//     discount: { 45: "", 90: "10%" } 
//   },
// ];

// // Features Data
// const features = [
//   { label: "Zero Brokerage owners contacts", key: "contacts", isValue: true },
//   { label: "Priority Customer support", key: "prioritySupport", sachet: false, connect: true, connectPlus: true, relax: true, icon: "headphones" },
//   { label: "Instant alerts on new properties", key: "instantAlerts", sachet: false, connect: true, connectPlus: true, relax: true, icon: "bell" },
//   { label: "Dedicated relationship manager", key: "dedicatedManager", sachet: false, connect: false, connectPlus: false, relax: true, icon: "users" },
// ];

// // Testimonials Data
// const testimonials = [
//   { name: "Ravi P.", feedback: "Amazing platform! Found the perfect property in days." },
//   { name: "Sneha K.", feedback: "Zero brokerage is a game changer for buyers." },
//   { name: "Amit S.", feedback: "Customer support is very responsive and helpful." },
//   { name: "Priya M.", feedback: "Loved the AI recommended properties, very accurate." },
// ];

// // Feature Icon Component
// const FeatureIcon = ({ icon }) => {
//   const IconComponent = {
//     "contacts": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect width="18" height="18" x="3" y="2" rx="2"></rect><circle cx="12" cy="7" r="4"></circle></svg>,
//     "headphones": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M12 19h.01"></path><path d="M10.22 3.86L4.44 19h15.12L13.78 3.86C13.24 2.89 11.76 2.89 11.22 3.86z"></path></svg>,
//     "bell": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M12 21a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path><path d="M18 10c0-3.31-2.69-6-6-6s-6 2.69-6 6v3.5a2.5 2.5 0 0 0 5 0V10"></path></svg>,
//     "users": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
//   }[icon];
//   return IconComponent;
// };

// // Check/X Status Component
// const IncludedStatus = ({ included, isFeatured }) => {
//   if (included) {
//     return (
//       <div className={`flex items-center justify-center p-1 rounded-full ${isFeatured ? 'bg-[#c70f69]' : 'bg-gray-700'}`}>
//         <Check className="w-4 h-4 text-white font-bold" strokeWidth={3} />
//       </div>
//     );
//   }
//   return (
//     <div className="flex items-center justify-center">
//       <X className="w-3 h-3 text-gray-400" strokeWidth={3} />
//     </div>
//   );
// };

// export default function PremiumPlans() {
//   const [days, setDays] = useState(45);
//   const [deadlineText] = useState("09 hrs : 31 mins : 19 secs");
//   const ACCENT_COLOR = "#e83e89";

//   const handlePayment = async (plan) => {
//     try {
//       const amount = plan.price[days];
      
//       const orderResponse = await axiosConfig.post('/payment/create-order', {
//         amount,
//         packageName: `${plan.name} Premium Plan - ${days} days`,
//         customerInfo: {}
//       });

//       if (orderResponse.data.success) {
//         await paymentService.initiatePayment({
//           amount,
//           orderId: orderResponse.data.order.id,
//           description: `Payment for ${plan.name} Premium Plan (${days} days)`,
//           onSuccess: async (response) => {
//             try {
//               await axiosConfig.post('/payment/verify-payment', {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 userId: 'user123',
//                 userName: 'John Doe',
//                 userEmail: 'user@example.com',
//                 userPhone: '9876543210',
//                 userType: 'premium',
//                 planName: plan.name,
//                 planType: 'premium_plan',
//                 amount: plan.price[days]
//               });
//               alert('Payment successful! Your premium plan is now active.');
//             } catch (error) {
//               alert('Payment verification failed!');
//             }
//           },
//           onCancel: () => {
//             alert('Payment cancelled!');
//           }
//         });
//       }
//     } catch (error) {
//       alert('Payment initiation failed!');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#350b4a] py-10 px-4">
//       {/* Main Container */}
//       <div className="max-w-[1200px] mx-auto space-y-16">

//         {/* Navbar */}
//         <div className="flex justify-center space-x-12 text-white font-semibold text-lg">
//           <a href="#plans" className="hover:text-[#e83e89] transition"></a>
//           <a href="#features" className="hover:text-[#e83e89] transition"></a>
//           <a href="#testimonials" className="hover:text-[#e83e89] transition"></a>
//         </div>
//         <hr className="border-gray-700 my-4" />

//      {/* Days Selector / Header Info */}
// <div className="bg-[#2b083a] rounded-2xl p-6 md:p-8 relative space-y-6">
//   {/* Days Selector */}
//   <div className="flex flex-wrap justify-center md:justify-end md:absolute md:top-4 md:right-4 space-x-2 md:space-x-2 space-y-2 md:space-y-0 mt-2 md:mt-0">
//     {[45, 90].map((d) => (
//       <button
//         key={d}
//         onClick={() => setDays(d)}
//         className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
//           days === d
//             ? "bg-white text-gray-900 shadow-md"
//             : "bg-gray-700 text-gray-300 hover:text-white"
//         }`}
//       >
//         {d} days
//       </button>
//     ))}
//   </div>

//   {/* Header Info */}
//   <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap text-center sm:text-left justify-center sm:justify-start">
//     <div className="p-2 rounded-full border" style={{ borderColor: ACCENT_COLOR }}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="none"
//         stroke={ACCENT_COLOR}
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="10"></circle>
//         <path d="M12 16v-4"></path>
//         <path d="M12 8h.01"></path>
//       </svg>
//     </div>
//     <div>
//       <h2 className="text-lg sm:text-xl font-bold text-white">Hey there!</h2>
//       <p className="text-gray-300 text-sm mt-1">
//         Get access to 64 Zero Brokerage owner properties in{" "}
//         <span className="font-semibold">Ravet, Pune</span>
//       </p>
//     </div>
//   </div>

//   {/* Discount Info */}
//   <div className="flex flex-col sm:flex-row items-center bg-[#1a0628] rounded-lg py-3 px-4 mt-4 space-y-2 sm:space-y-0">
//     <Check className="w-4 h-4 mr-2 text-[#e83e89]" />
//     <span className="text-gray-300 text-sm text-center sm:text-left">
//       Hurry, Purchase a plan before your exclusive discount expires!
//     </span>
//     <span className="font-bold text-yellow-400 sm:ml-auto">{deadlineText}</span>
//   </div>

//   {/* Discount Badges */}
//   <div className="flex flex-wrap justify-center gap-2 mt-4">
//     {plansData.map(
//       (plan, index) =>
//         plan.discount[days] && (
//           <span
//             key={index}
//             className="px-4 py-1 rounded-full text-xs font-bold text-white"
//             style={{ backgroundColor: ACCENT_COLOR }}
//           >
//             {plan.discount[days]} OFF
//           </span>
//         )
//     )}
//   </div>
// </div>

//        {/* Pricing Table */}
// <section id="plans" className="w-full">
//   <div
//     className="
//       grid 
//       grid-cols-1 
//       md:grid-cols-5 
//       rounded-xl 
//       overflow-hidden 
//       shadow-2xl 
//       divide-y md:divide-y-0 md:divide-x divide-[#4a1c5d]
//     "
//   >
//     {/* Features Column */}
//     <div className="bg-[#2b083a] p-6 flex flex-col justify-between space-y-4">
//       <div className="space-y-4 mt-4 md:mt-6">
//         {features.map((feature, idx) => (
//           <div
//             key={idx}
//             className="flex items-center space-x-2 py-3 border-t border-gray-700 first:border-none"
//           >
//             <FeatureIcon icon={feature.icon} />
//             <span className="text-gray-300 text-sm">{feature.label}</span>
//           </div>
//         ))}
//       </div>

//       <button className="mt-6 text-sm font-semibold text-[#e83e89]">
//         See additional benefits &gt;
//       </button>

//       <div className="mt-6 pt-4 border-t border-gray-700">
//         <button className="w-full py-2 rounded-md font-semibold text-white bg-[#21072f] hover:brightness-110 transition">
//           Apply Coupon
//         </button>
//       </div>
//     </div>

//     {/* Plan Columns */}
//     {plansData.map((plan, idx) => {
//       const planKey = plan.name.toLowerCase().replace("+", "plus");

//       return (
//         <div
//           key={idx}
//           className={`
//             flex flex-col p-6 text-center 
//             ${plan.isFeatured ? "bg-[#3b0a4f] shadow-lg" : "bg-[#21072f]"} 
//             transition
//           `}
//         >
//           {/* Header */}
//           <div className="flex flex-col items-center justify-center mb-4 relative space-y-1">
//             {plan.badge && (
//               <span className="bg-pink-600 text-xs font-bold px-3 py-1 rounded-full mb-2 text-white">
//                 {plan.badge}
//               </span>
//             )}
//             {plan.name === "Sachet" && (
//               <span className="absolute -top-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-yellow-500">
//                 Instant Trial Plan
//               </span>
//             )}
//             <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
//               {plan.name}
//             </h3>
//             <div className="text-2xl sm:text-3xl font-extrabold text-white">
//               {plan.contacts[days]}
//             </div>
//             <span className="text-gray-400 text-sm">contacts</span>
//           </div>

//           {/* Feature Rows */}
//           <div className="divide-y divide-gray-700">
//             {features.map((feature, fIdx) => {
//               const isValue = feature.isValue;
//               const included = feature[planKey];
//               return (
//                 <div
//                   key={fIdx}
//                   className="py-3 flex items-center justify-center"
//                 >
//                   {isValue ? (
//                     <span className="text-lg font-bold text-white">
//                       {plan.contacts[days]}
//                     </span>
//                   ) : (
//                     <IncludedStatus
//                       included={included}
//                       isFeatured={plan.isFeatured}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Footer */}
//           <div className="mt-auto pt-4 border-t border-gray-700 space-y-2">
//             <div className="text-2xl font-bold text-white">
//               ₹{plan.price[days]}{" "}
//               <span className="text-gray-400 text-sm line-through ml-2">
//                 ₹{plan.originalPrice[days]}
//               </span>
//             </div>
//             <div className="text-gray-400 text-sm mt-1">+ 18% GST</div>
//             <button
//               onClick={() => handlePayment(plan)}
//               className={`mt-4 w-full py-2.5 rounded-md font-semibold text-white hover:brightness-110 transition ${
//                 plan.isFeatured ? "bg-pink-600" : "bg-gray-700"
//               }`}
//             >
//               Pay ₹{plan.price[days]}
//             </button>
//             {plan.isFeatured && (
//               <button className="mt-2 w-full text-xs py-1 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition">
//                 Get AI Recommended Properties at just ₹199
//               </button>
//             )}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </section>


//        {/* Testimonials */}
// <section id="testimonials" className="space-y-6 mt-8">
//   <h2 className="text-white text-2xl font-bold mb-6 text-center">
//     What Our Users Say
//   </h2>

//   <div
//     className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 px-2 sm:px-4 scrollbar-hide"
//   >
//     {testimonials.map((t, idx) => (
//       <div
//         key={idx}
//         className="flex-shrink-0 w-64 sm:w-72 p-4 rounded-xl bg-[#2b083a] border border-gray-700 shadow-md"
//       >
//         <p className="text-gray-300 text-sm sm:text-base mb-2 leading-relaxed">
//           "{t.feedback}"
//         </p>
//         <p className="text-white font-semibold text-sm sm:text-base text-right">
//           - {t.name}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>


//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { Check, X } from "lucide-react";
// import paymentService from "../../../Api/paymentService.js";
// import axiosConfig from "../../../Api/axiosConfig.js";

// // Plans Data
// const plansData = [
//   { 
//     name: "Sachet", 
//     contacts: { 45: 5, 90: 10 }, 
//     price: { 45: 659, 90: 1199 }, 
//     originalPrice: { 45: 1198, 90: 2198 }, 
//     badge: "", 
//     isFeatured: false, 
//     discount: { 45: "10%", 90: "15%" } 
//   },
//   { 
//     name: "Connect", 
//     contacts: { 45: 15, 90: 30 }, 
//     price: { 45: 1209, 90: 2199 }, 
//     originalPrice: { 45: 2198, 90: 3998 }, 
//     badge: "", 
//     isFeatured: false, 
//     discount: { 45: "30%", 90: "35%" } 
//   },
//   { 
//     name: "Connect+", 
//     contacts: { 45: 25, 90: 50 }, 
//     price: { 45: 1539, 90: 2799 }, 
//     originalPrice: { 45: 2798, 90: 4998 }, 
//     badge: "Most Popular", 
//     isFeatured: true, 
//     discount: { 45: "45%", 90: "50%" } 
//   },
//   { 
//     name: "Relax", 
//     contacts: { 45: 50, 90: 100 }, 
//     price: { 45: 2309, 90: 4199 }, 
//     originalPrice: { 45: 4198, 90: 7998 }, 
//     badge: "", 
//     isFeatured: false, 
//     discount: { 45: "", 90: "10%" } 
//   },
// ];

// // Features Data
// const features = [
//   { label: "Zero Brokerage owners contacts", key: "contacts", isValue: true },
//   { label: "Priority Customer support", key: "prioritySupport", sachet: false, connect: true, connectPlus: true, relax: true, icon: "headphones" },
//   { label: "Instant alerts on new properties", key: "instantAlerts", sachet: false, connect: true, connectPlus: true, relax: true, icon: "bell" },
//   { label: "Dedicated relationship manager", key: "dedicatedManager", sachet: false, connect: false, connectPlus: false, relax: true, icon: "users" },
// ];

// // Testimonials Data
// const testimonials = [
//   { name: "Ravi P.", feedback: "Amazing platform! Found the perfect property in days." },
//   { name: "Sneha K.", feedback: "Zero brokerage is a game changer for buyers." },
//   { name: "Amit S.", feedback: "Customer support is very responsive and helpful." },
//   { name: "Priya M.", feedback: "Loved the AI recommended properties, very accurate." },
// ];

// // Feature Icon Component
// const FeatureIcon = ({ icon }) => {
//   const IconComponent = {
//     "contacts": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect width="18" height="18" x="3" y="2" rx="2"></rect><circle cx="12" cy="7" r="4"></circle></svg>,
//     "headphones": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M12 19h.01"></path><path d="M10.22 3.86L4.44 19h15.12L13.78 3.86C13.24 2.89 11.76 2.89 11.22 3.86z"></path></svg>,
//     "bell": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M12 21a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path><path d="M18 10c0-3.31-2.69-6-6-6s-6 2.69-6 6v3.5a2.5 2.5 0 0 0 5 0V10"></path></svg>,
//     "users": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e83e89]"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
//   }[icon];
//   return IconComponent;
// };

// // Check/X Status Component
// const IncludedStatus = ({ included, isFeatured }) => {
//   if (included) {
//     return (
//       <div className={`flex items-center justify-center p-1 rounded-full ${isFeatured ? 'bg-[#c70f69]' : 'bg-gray-700'}`}>
//         <Check className="w-4 h-4 text-white font-bold" strokeWidth={3} />
//       </div>
//     );
//   }
//   return (
//     <div className="flex items-center justify-center">
//       <X className="w-3 h-3 text-gray-400" strokeWidth={3} />
//     </div>
//   );
// };

// export default function PremiumPlans() {
//   const [days, setDays] = useState(45);
//   const [deadlineText] = useState("09 hrs : 31 mins : 19 secs");
//   const ACCENT_COLOR = "#e83e89";

//   const handlePayment = async (plan) => {
//     try {
//       const amount = plan.price[days];
      
//       const orderResponse = await axiosConfig.post('/payment/create-order', {
//         amount,
//         packageName: `${plan.name} Premium Plan - ${days} days`,
//         customerInfo: {}
//       });

//       if (orderResponse.data.success) {
//         await paymentService.initiatePayment({
//           amount,
//           orderId: orderResponse.data.order.id,
//           description: `Payment for ${plan.name} Premium Plan (${days} days)`,
//           onSuccess: async (response) => {
//             try {
//               await axiosConfig.post('/payment/verify-payment', {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 userId: 'user123',
//                 userName: 'John Doe',
//                 userEmail: 'user@example.com',
//                 userPhone: '9876543210',
//                 userType: 'premium',
//                 planName: plan.name,
//                 planType: 'premium_plan',
//                 amount: plan.price[days]
//               });
//               alert('Payment successful! Your premium plan is now active.');
//             } catch (error) {
//               alert('Payment verification failed!');
//             }
//           },
//           onCancel: () => {
//             alert('Payment cancelled!');
//           }
//         });
//       }
//     } catch (error) {
//       alert('Payment initiation failed!');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#350b4a] py-10 px-4">
//       {/* Main Container */}
//       <div className="max-w-[1200px] mx-auto space-y-16">

//         {/* Navbar */}
//         <div className="flex justify-center space-x-12 text-white font-semibold text-lg">
//           <a href="#plans" className="hover:text-[#e83e89] transition"></a>
//           <a href="#features" className="hover:text-[#e83e89] transition"></a>
//           <a href="#testimonials" className="hover:text-[#e83e89] transition"></a>
//         </div>
//         <hr className="border-gray-700 my-4" />

//      {/* Days Selector / Header Info */}
// <div className="bg-[#2b083a] rounded-2xl p-6 md:p-8 relative space-y-6">
//   {/* Days Selector */}
//   <div className="flex flex-wrap justify-center md:justify-end md:absolute md:top-4 md:right-4 space-x-2 md:space-x-2 space-y-2 md:space-y-0 mt-2 md:mt-0">
//     {[45, 90].map((d) => (
//       <button
//         key={d}
//         onClick={() => setDays(d)}
//         className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
//           days === d
//             ? "bg-white text-gray-900 shadow-md"
//             : "bg-gray-700 text-gray-300 hover:text-white"
//         }`}
//       >
//         {d} days
//       </button>
//     ))}
//   </div>

//   {/* Header Info */}
//   <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap text-center sm:text-left justify-center sm:justify-start">
//     <div className="p-2 rounded-full border" style={{ borderColor: ACCENT_COLOR }}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="none"
//         stroke={ACCENT_COLOR}
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="10"></circle>
//         <path d="M12 16v-4"></path>
//         <path d="M12 8h.01"></path>
//       </svg>
//     </div>
//     <div>
//       <h2 className="text-lg sm:text-xl font-bold text-white">Hey there!</h2>
//       <p className="text-gray-300 text-sm mt-1">
//         Get access to 64 Zero Brokerage owner properties in{" "}
//         <span className="font-semibold">Ravet, Pune</span>
//       </p>
//     </div>
//   </div>

//   {/* Discount Info */}
//   <div className="flex flex-col sm:flex-row items-center bg-[#1a0628] rounded-lg py-3 px-4 mt-4 space-y-2 sm:space-y-0">
//     <Check className="w-4 h-4 mr-2 text-[#e83e89]" />
//     <span className="text-gray-300 text-sm text-center sm:text-left">
//       Hurry, Purchase a plan before your exclusive discount expires!
//     </span>
//     <span className="font-bold text-yellow-400 sm:ml-auto">{deadlineText}</span>
//   </div>

//   {/* Discount Badges */}
//   <div className="flex flex-wrap justify-center gap-2 mt-4">
//     {plansData.map(
//       (plan, index) =>
//         plan.discount[days] && (
//           <span
//             key={index}
//             className="px-4 py-1 rounded-full text-xs font-bold text-white"
//             style={{ backgroundColor: ACCENT_COLOR }}
//           >
//             {plan.discount[days]} OFF
//           </span>
//         )
//     )}
//   </div>
// </div>

//        {/* Pricing Table */}
// <section id="plans" className="w-full">
//   <div
//     className="
//       grid 
//       grid-cols-1 
//       md:grid-cols-5 
//       rounded-xl 
//       overflow-hidden 
//       shadow-2xl 
//       divide-y md:divide-y-0 md:divide-x divide-[#4a1c5d]
//     "
//   >
//     {/* Features Column */}
//     <div className="bg-[#2b083a] p-6 flex flex-col justify-between space-y-4">
//       <div className="space-y-4 mt-4 md:mt-6">
//         {features.map((feature, idx) => (
//           <div
//             key={idx}
//             className="flex items-center space-x-2 py-3 border-t border-gray-700 first:border-none"
//           >
//             <FeatureIcon icon={feature.icon} />
//             <span className="text-gray-300 text-sm">{feature.label}</span>
//           </div>
//         ))}
//       </div>

//       <button className="mt-6 text-sm font-semibold text-[#e83e89]">
//         See additional benefits &gt;
//       </button>

//       <div className="mt-6 pt-4 border-t border-gray-700">
//         <button className="w-full py-2 rounded-md font-semibold text-white bg-[#21072f] hover:brightness-110 transition">
//           Apply Coupon
//         </button>
//       </div>
//     </div>

//     {/* Plan Columns */}
//     {plansData.map((plan, idx) => {
//       const planKey = plan.name.toLowerCase().replace("+", "plus");

//       return (
//         <div
//           key={idx}
//           className={`
//             flex flex-col p-6 text-center 
//             ${plan.isFeatured ? "bg-[#3b0a4f] shadow-lg" : "bg-[#21072f]"} 
//             transition
//           `}
//         >
//           {/* Header */}
//           <div className="flex flex-col items-center justify-center mb-4 relative space-y-1">
//             {plan.badge && (
//               <span className="bg-pink-600 text-xs font-bold px-3 py-1 rounded-full mb-2 text-white">
//                 {plan.badge}
//               </span>
//             )}
//             {plan.name === "Sachet" && (
//               <span className="absolute -top-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-yellow-500">
//                 Instant Trial Plan
//               </span>
//             )}
//             <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
//               {plan.name}
//             </h3>
//             <div className="text-2xl sm:text-3xl font-extrabold text-white">
//               {plan.contacts[days]}
//             </div>
//             <span className="text-gray-400 text-sm">contacts</span>
//           </div>

//           {/* Feature Rows */}
//           <div className="divide-y divide-gray-700">
//             {features.map((feature, fIdx) => {
//               const isValue = feature.isValue;
//               const included = feature[planKey];
//               return (
//                 <div
//                   key={fIdx}
//                   className="py-3 flex items-center justify-center"
//                 >
//                   {isValue ? (
//                     <span className="text-lg font-bold text-white">
//                       {plan.contacts[days]}
//                     </span>
//                   ) : (
//                     <IncludedStatus
//                       included={included}
//                       isFeatured={plan.isFeatured}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Footer */}
//           <div className="mt-auto pt-4 border-t border-gray-700 space-y-2">
//             <div className="text-2xl font-bold text-white">
//               ₹{plan.price[days]}{" "}
//               <span className="text-gray-400 text-sm line-through ml-2">
//                 ₹{plan.originalPrice[days]}
//               </span>
//             </div>
//             <div className="text-gray-400 text-sm mt-1">+ 18% GST</div>
//             <button
//               onClick={() => handlePayment(plan)}
//               className={`mt-4 w-full py-2.5 rounded-md font-semibold text-white hover:brightness-110 transition ${
//                 plan.isFeatured ? "bg-pink-600" : "bg-gray-700"
//               }`}
//             >
//               Pay ₹{plan.price[days]}
//             </button>
//             {plan.isFeatured && (
//               <button className="mt-2 w-full text-xs py-1 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition">
//                 Get AI Recommended Properties at just ₹199
//               </button>
//             )}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </section>


//        {/* Testimonials */}
// <section id="testimonials" className="space-y-6 mt-8">
//   <h2 className="text-white text-2xl font-bold mb-6 text-center">
//     What Our Users Say
//   </h2>

//   <div
//     className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 px-2 sm:px-4 scrollbar-hide"
//   >
//     {testimonials.map((t, idx) => (
//       <div
//         key={idx}
//         className="flex-shrink-0 w-64 sm:w-72 p-4 rounded-xl bg-[#2b083a] border border-gray-700 shadow-md"
//       >
//         <p className="text-gray-300 text-sm sm:text-base mb-2 leading-relaxed">
//           "{t.feedback}"
//         </p>
//         <p className="text-white font-semibold text-sm sm:text-base text-right">
//           - {t.name}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>


//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { Check, X, Bell, Headset, Users, Info, Clock } from "lucide-react"; // Added Clock for the timer
import paymentService from "../../../Api/paymentService.js";
import axiosConfig from "../../../Api/axiosConfig.js";

// Plans Data
const plansData = [
  {
    name: "Sachet",
    contacts: { 45: 5, 90: 10 },
    price: { 45: 659, 90: 1199 },
    originalPrice: { 45: 1198, 90: 2198 },
    badge: "",
    isFeatured: false,
    discount: { 45: "10%", 90: "15%" }
  },
  {
    name: "Connect",
    contacts: { 45: 15, 90: 30 },
    price: { 45: 1209, 90: 2199 },
    originalPrice: { 45: 2198, 90: 3998 },
    badge: "",
    isFeatured: false,
    discount: { 45: "30%", 90: "35%" }
  },
  {
    name: "Connect+",
    contacts: { 45: 25, 90: 50 },
    price: { 45: 1539, 90: 2799 },
    originalPrice: { 45: 2798, 90: 4998 },
    badge: "Most Popular",
    isFeatured: true,
    discount: { 45: "45%", 90: "50%" }
  },
  {
    name: "Relax",
    contacts: { 45: 50, 90: 100 },
    price: { 45: 2309, 90: 4199 },
    originalPrice: { 45: 4198, 90: 7998 },
    badge: "",
    isFeatured: false,
    discount: { 45: "", 90: "10%" }
  },
];

// Features Data
const features = [
  { label: "Zero Brokerage owners contacts", key: "contacts", isValue: true, icon: Info }, // Changed to Info icon for contact number
  { label: "Priority Customer support", key: "prioritySupport", sachet: false, connect: true, connectPlus: true, relax: true, icon: Headset },
  { label: "Instant alerts on new properties", key: "instantAlerts", sachet: false, connect: true, connectPlus: true, relax: true, icon: Bell },
  { label: "Dedicated relationship manager", key: "dedicatedManager", sachet: false, connect: false, connectPlus: false, relax: true, icon: Users },
];

// Testimonials Data
const testimonials = [
  { name: "Ravi P.", feedback: "Amazing platform! Found the perfect property in days." },
  { name: "Sneha K.", feedback: "Zero brokerage is a game changer for buyers." },
  { name: "Amit S.", feedback: "Customer support is very responsive and helpful." },
  { name: "Priya M.", feedback: "Loved the AI recommended properties, very accurate." },
];

// Feature Icon Component
const FeatureIcon = ({ Icon }) => {
  return <Icon className="w-4 h-4" style={{ color: "#e83e89" }} />;
};

// Check/X Status Component
const IncludedStatus = ({ included, isFeatured }) => {
  // Adjusted colors for the dark theme
  const ICON_COLOR = included ? (isFeatured ? '#FFFFFF' : '#e83e89') : '#525252'; 
  const BG_COLOR = included ? (isFeatured ? 'bg-pink-600' : 'bg-transparent') : 'bg-transparent';
  const BORDER_COLOR = isFeatured && included ? 'border border-pink-600' : '';

  if (included) {
    return (
      <div className={`flex items-center justify-center p-1 rounded-full ${BG_COLOR} ${BORDER_COLOR}`}>
        <Check className="w-4 h-4 font-bold" style={{ color: ICON_COLOR }} strokeWidth={3} />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <X className="w-3 h-3 text-gray-700" strokeWidth={2} />
    </div>
  );
};

export default function PremiumPlans() {
  const [days, setDays] = useState(45);
  const [deadlineText] = useState("09 hrs : 31 mins : 19 secs");
  const ACCENT_COLOR = "#e83e89"; // Pink
  const ACCENT_HOVER = "#ff56a0"; // Lighter Pink for hover

  const handlePayment = async (plan) => {
    // Payment logic remains the same
    try {
      const amount = plan.price[days];

      const orderResponse = await axiosConfig.post('/payment/create-order', {
        amount,
        packageName: `${plan.name} Premium Plan - ${days} days`,
        customerInfo: {}
      });

      if (orderResponse.data.success) {
        await paymentService.initiatePayment({
          amount,
          orderId: orderResponse.data.order.id,
          description: `Payment for ${plan.name} Premium Plan (${days} days)`,
          onSuccess: async (response) => {
            try {
              await axiosConfig.post('/payment/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: 'user123',
                userName: 'John Doe',
                userEmail: 'user@example.com',
                userPhone: '9876543210',
                userType: 'premium',
                planName: plan.name,
                planType: 'premium_plan',
                amount: plan.price[days]
              });
              alert('Payment successful! Your premium plan is now active.');
            } catch (error) {
              alert('Payment verification failed!');
            }
          },
          onCancel: () => {
            alert('Payment cancelled!');
          }
        });
      }
    } catch (error) {
      alert('Payment initiation failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      Main Container
      <div className="max-w-[1200px] mx-auto space-y-16">

{/*         Enhanced Header Section
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Unlock <span style={{ color: ACCENT_COLOR }}>Premium Contacts</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get direct access to zero-brokerage owner properties. Choose a plan that fits your search duration and contact needs.
          </p>
        </div> */}

       
        ---------------------------

        {/* Days Selector / Header Info Card */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 md:p-8 relative space-y-6 shadow-2xl border border-gray-800">
          {/* Days Selector - Sleeker Toggle Design */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-gray-800 p-1 rounded-full inline-flex space-x-1 shadow-inner">
              {[45, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    days === d
                      ? "bg-white text-gray-900 shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>
          </div>

          {/* Header Info */}
          <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap text-center sm:text-left justify-center sm:justify-start">
            <div className="p-3 rounded-full border-2" style={{ borderColor: ACCENT_COLOR }}>
              <Info className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Exclusive Access Unlocked!</h2>
              <p className="text-gray-400 text-sm mt-1">
                You're viewing **64 Zero Brokerage owner properties** in <span className="font-semibold text-white">Ravet, Pune</span>.
              </p>
            </div>
          </div>

          {/* Discount Info - Prominent Callout */}
          <div className="bg-[#2a0c3d] rounded-xl py-4 px-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 shadow-inner border border-[#3d1354]">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-yellow-400" />
              <span className="text-gray-300 font-medium">
                Hurry, your exclusive discount expires in:
              </span>
              
            </div>
            <span className="font-extrabold text-xl text-yellow-400 bg-[#351a4a] px-3 py-1 rounded-md shadow-lg">
              {deadlineText}
            </span>
          </div>

          {/* Discount Badges - Cleaned up display */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {plansData.map(
              (plan, index) =>
                plan.discount[days] && (
                  <span
                    key={index}
                    className="px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    Save {plan.discount[days]}
                  </span>
                )
            )}
          </div>
        </div>

        {/* Pricing Table - Cleaned, Professional Look */}
        <section id="plans" className="w-full">
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-5 
              rounded-2xl 
              overflow-hidden 
              shadow-2xl 
              border border-gray-800
            "
          >
            {/* Features Column */}
            <div className="bg-[#1e1e1e] p-6 flex flex-col justify-between space-y-6 border-r border-gray-800">
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Plan Features</h3>
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 py-3"
                  >
                    {feature.icon && <FeatureIcon Icon={feature.icon} />}
                    <span className="text-gray-300 text-sm font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              <a href="#benefits" className="mt-6 text-sm font-semibold hover:underline" style={{ color: ACCENT_COLOR }}>
                See all 15 additional benefits &gt;
              </a>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <button className="w-full py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition shadow-md">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Plan Columns */}
            {plansData.map((plan, idx) => {
              const planKey = plan.name.toLowerCase().replace("+", "plus");

              return (
                <div
                  key={idx}
                  className={`
                    flex flex-col p-6 text-center 
                    ${plan.isFeatured ? "bg-[#250937] border-t-4 border-pink-600 shadow-xl" : "bg-[#1e1e1e]"} 
                    transition duration-300 md:border-l border-gray-800
                  `}
                >
                  {/* Header */}
                  <div className="flex flex-col items-center justify-center mb-6 relative space-y-2">
                    {plan.badge && (
                      <span className="bg-pink-600 text-xs font-bold px-3 py-1 rounded-full mb-2 text-white shadow-md">
                        {plan.badge}
                      </span>
                    )}
                    {plan.name === "Sachet" && (
                      <span className="absolute -top-6 px-3 py-1 rounded-full text-xs font-bold text-white bg-yellow-600 shadow-lg">
                        Instant Trial Plan
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
                      {plan.name}
                    </h3>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                      {plan.contacts[days]}
                    </div>
                    <span className="text-gray-400 text-sm uppercase tracking-widest">contacts</span>
                  </div>

                  {/* Feature Rows */}
                  <div className="divide-y divide-gray-800 flex-1">
                    {features.map((feature, fIdx) => {
                      const isValue = feature.isValue;
                      const included = feature[planKey];
                      return (
                        <div
                          key={fIdx}
                          className="py-3.5 flex items-center justify-center"
                        >
                          {isValue ? (
                            <span className="text-lg font-bold text-white">
                              {plan.contacts[days]}
                            </span>
                          ) : (
                            <IncludedStatus
                              included={included}
                              isFeatured={plan.isFeatured}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
                    <div className="text-2xl font-bold text-white">
                      ₹{plan.price[days]}{" "}
                      <span className="text-gray-500 text-sm line-through ml-2 font-normal">
                        ₹{plan.originalPrice[days]}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs mt-1">+ 18% GST applicable</div>
                    <button
                      onClick={() => handlePayment(plan)}
                      className={`mt-4 w-full py-3 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 ${
                        plan.isFeatured 
                          ? `bg-pink-600 hover:bg-pink-700 ring-2 ring-pink-600 ring-offset-2 ring-offset-[#1e1e1e]` 
                          : "bg-gray-800"
                      }`}
                      style={!plan.isFeatured ? {backgroundColor: ACCENT_COLOR, boxShadow: `0 4px 6px -1px rgba(232, 62, 137, 0.5), 0 2px 4px -2px rgba(232, 62, 137, 0.5)`} : {}}
                      onMouseOver={e => !plan.isFeatured && (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
                      onMouseOut={e => !plan.isFeatured && (e.currentTarget.style.backgroundColor = ACCENT_COLOR)}
                    >
                      Pay ₹{plan.price[days]}
                    </button>
                    {plan.isFeatured && (
                      <button className="mt-2 w-full text-xs py-2 rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 transition font-semibold">
                        Add AI Recommended Properties at just ₹199
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* Testimonials - Improved visual style */}
        <section id="testimonials" className="space-y-8 pt-8">
          <h2 className="text-white text-3xl font-bold text-center">
            Trusted by Property Seekers
          </h2>

          <div
            className="flex overflow-x-auto space-x-6 pb-4 px-2 sm:px-4"
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-72 p-6 rounded-xl bg-[#1e1e1e] border border-gray-800 shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-3 text-2xl" style={{ color: ACCENT_COLOR }}>
                  &ldquo;
                </div>
                <p className="text-gray-300 text-base mb-4 leading-relaxed italic">
                  {t.feedback}
                </p>
                <p className="text-white font-semibold text-sm text-right border-t border-gray-700 pt-2">
                  - {t.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center pt-8">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                *The 'Sachet' plan acts as an instant trial. Contact counts are for the selected duration ({days} days). Discounts are subject to change and available for a limited time only.
            </p>
        </div>


      </div>
    </div>
  );
}