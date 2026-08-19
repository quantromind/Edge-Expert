// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, MapPin, DollarSign, Building2 } from "lucide-react"; // Imported MapPin, DollarSign, Building2 for better icons
// // Assuming these image imports are correct in your environment
// import Image1 from '../../assets/servicess/Image_4.avif';
// import Image2 from '../../assets/servicess/Image_5.avif';
// import Image3 from '../../assets/servicess/Image_6.avif';
// import Image4 from '../../assets/servicess/Image_7.avif';
// import Image5 from '../../assets/servicess/Image_8.avif';

// const developers = [
//   {
//     name: "A R Realty",
//     year: 2005,
//     projects: 4,
//     desc: "Welcome to AR Realty, where your real estate dreams become reality. Established in 2005...",
//     projectsList: [
//       {
//         title: "AR Mirador",
//         location: "Wakad, Pimpri Chinchwad, Pune",
//         price: "₹85.0 L - 1.45 Cr",
//         img: Image1,
//       },
//     ],
//   },
//   {
//     name: "Nyati Group",
//     year: 1997,
//     projects: 101,
//     desc: "At Nyati Group, the customer is the central focus of all our ventures...",
//     projectsList: [
//       {
//         title: "Nyati Exuberance",
//         location: "Mohammed Wadi, Pune",
//         price: "₹67.5 L - 67.7 L",
//         img: Image2,
//       },
//     ],
//   },
//   {
//     name: "Ravima Ventures",
//     year: 2023,
//     projects: 10,
//     desc: "The core values of the company are – Innovation, Trust, Customer Satisfaction...",
//     projectsList: [
//       {
//         title: "Newton Homes Handewadi",
//         location: "Hadapsar, Magarpatta Road, Pune",
//         price: "₹67.59 L - 73.75 L",
//         img: Image3,
//       },
//     ],
//   },
//   {
//     name: "Piramal Realty", // Changed data for better visualization
//     year: 2012,
//     projects: 15,
//     desc: "Building a legacy of world-class design, quality and sustainability...",
//     projectsList: [
//       {
//         title: "Piramal Vaikunth",
//         location: "Thane West, Mumbai",
//         price: "₹1.5 Cr - 4.5 Cr",
//         img: Image4,
//       },
//     ],
//   },
//   {
//     name: "Lodha Group", // Changed data for better visualization
//     year: 1980,
//     projects: 70,
//     desc: "Committed to Creating Landmarks that meet global standards...",
//     projectsList: [
//       {
//         title: "Lodha Palava City",
//         location: "Dombivli East, Thane",
//         price: "₹45 L - 1.2 Cr",
//         img: Image5,
//       },
//     ],
//   },
// ];

// export default function DevelopersSlider() {
//   const getVisible = () => {
//     if (typeof window === "undefined") return 1;
//     if (window.innerWidth < 640) return 1;
//     if (window.innerWidth < 1024) return 2;
//     return 3;
//   };

//   const [slides, setSlides] = useState(getVisible());
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const handleResize = () => setSlides(getVisible());
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Reset current index if it goes out of range after slides count changes
//   useEffect(() => {
//     const maxIndex = Math.max(0, developers.length - slides);
//     if (current > maxIndex) setCurrent(maxIndex);
//   }, [slides, current]);

//   const maxIndex = Math.max(0, developers.length - slides);

//   const goPrev = () => setCurrent((prev) => Math.max(0, prev - 1));
//   const goNext = () => setCurrent((prev) => Math.min(maxIndex, prev + 1));

//   const visibleDevelopers = developers.slice(current, current + slides);

//   return (
//     <div className="px-4 sm:px-8 py-10 sm:py-16 w-full bg-gray-50/50"> {/* Subtle light background */}
//       <div className="max-w-7xl mx-auto">

//         {/* Header Section */}
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight relative pb-2 inline-block">
//             Featured Developers
//             {/* Accent Underline */}
//             <span className="block h-1 w-1/3 bg-teal-400 absolute bottom-0 left-0 rounded-full"></span>
//         </h2>
//         <p className="text-gray-600 text-lg mt-1 mb-10">Trusted builders shaping the future of real estate.</p>

//         {/* Slider Container */}
//         <div className="relative">

//           {/* Slider Arrows (Desktop Only) */}
//           <button
//             onClick={goPrev}
//             disabled={current === 0}
//             className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white border border-blue-100 rounded-full shadow-lg p-3 transition hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hidden lg:block text-blue-700"
//             aria-label="Previous developer"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//           <button
//             onClick={goNext}
//             disabled={current >= maxIndex}
//             className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white border border-blue-100 rounded-full shadow-lg p-3 transition hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hidden lg:block text-blue-700"
//             aria-label="Next developer"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Developers Card Container */}
//           <div className="flex gap-4 sm:gap-6 overflow-x-auto lg:overflow-x-hidden scrollbar-hide">
//             {visibleDevelopers.map((dev, i) => (
//               <div
//                 key={current + i}
//                 className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 border border-gray-100 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white cursor-pointer"
//               >
//                 <div className="p-6">

//                     {/* Developer Info */}
//                     <div className="flex items-start gap-4 mb-4 border-b pb-4 border-dashed border-gray-200">
//                         <div className="h-14 w-14 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-2xl ring-2 ring-teal-400 ring-offset-2">
//                             {/* Logo Initial with premium ring accent */}
//                             {dev.name[0]}
//                         </div>
//                         <div>
//                             <h3 className="font-bold text-xl text-gray-900">{dev.name}</h3>
//                             <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
//                                 <span className="flex items-center">
//                                     <Building2 className="w-4 h-4 mr-1 text-teal-500" />
//                                     {dev.projects} Projects
//                                 </span>
//                                 <span>|</span>
//                                 <span>Est. {dev.year}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Description */}
//                     <p className="text-sm text-gray-700 line-clamp-2 mb-4 h-10">{dev.desc}</p>

//                     {/* Featured Project */}
//                     {dev.projectsList.map((p, j) => (
//                         <div key={j} className="mt-3 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-md">
//                             <img
//                                 src={p.img || "/placeholder.svg"}
//                                 alt={p.title}
//                                 className="w-full h-44 object-cover object-center"
//                             />
//                             <div className="p-4">
//                                 <h4 className="text-lg font-bold text-blue-700 mb-1">{p.title}</h4>
//                                 <div className="flex items-center justify-between text-sm mt-1">
//                                     <p className="flex items-center text-gray-500">
//                                         <MapPin className="w-4 h-4 mr-1 text-teal-500 flex-shrink-0" />
//                                         <span className="truncate">{p.location}</span>
//                                     </p>
//                                     <p className="flex items-center font-extrabold text-lg text-teal-600">
//                                         <DollarSign className="w-4 h-4 mr-1" />
//                                         {p.price.split('-')[0].trim()}
//                                     </p>
//                                 </div>
//                                 <button className="w-full mt-4 text-center text-sm font-semibold bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
//                                     Explore Project
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Dots for mobile */}
//           <div className="flex justify-center mt-8 gap-3 sm:hidden">
//             {[...Array(maxIndex + 1)].map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrent(idx)}
//                 className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                   current === idx ? "bg-blue-700" : "bg-gray-300 hover:bg-teal-400"
//                 }`}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign,
  Building2,
} from "lucide-react";

import Image1 from "../../assets/servicess/Image_4.avif";
import Image2 from "../../assets/servicess/Image_5.avif";
import Image3 from "../../assets/servicess/Image_6.avif";
import Image4 from "../../assets/servicess/Image_7.avif";
import Image5 from "../../assets/servicess/Image_8.avif";

const developers = [
  {
    name: "A R Realty",
    year: 2005,
    projects: 4,
    desc: "Welcome to AR Realty, where your real estate dreams become reality. Established in 2005...",
    projectsList: [
      {
        title: "AR Mirador",
        location: "Wakad, Pimpri Chinchwad, Pune",
        price: "₹85.0 L - 1.45 Cr",
        img: Image1,
      },
    ],
  },
  {
    name: "Nyati Group",
    year: 1997,
    projects: 101,
    desc: "At Nyati Group, the customer is the central focus of all our ventures...",
    projectsList: [
      {
        title: "Nyati Exuberance",
        location: "Mohammed Wadi, Pune",
        price: "₹67.5 L - 67.7 L",
        img: Image2,
      },
    ],
  },
  {
    name: "Ravima Ventures",
    year: 2023,
    projects: 10,
    desc: "The core values of the company are – Innovation, Trust, Customer Satisfaction...",
    projectsList: [
      {
        title: "Newton Homes Handewadi",
        location: "Hadapsar, Magarpatta Road, Pune",
        price: "₹67.59 L - 73.75 L",
        img: Image3,
      },
    ],
  },
  {
    name: "Piramal Realty",
    year: 2012,
    projects: 15,
    desc: "Building a legacy of world-class design, quality and sustainability...",
    projectsList: [
      {
        title: "Piramal Vaikunth",
        location: "Thane West, Mumbai",
        price: "₹1.5 Cr - 4.5 Cr",
        img: Image4,
      },
    ],
  },
  {
    name: "Lodha Group",
    year: 1980,
    projects: 70,
    desc: "Committed to Creating Landmarks that meet global standards...",
    projectsList: [
      {
        title: "Lodha Palava City",
        location: "Dombivli East, Thane",
        price: "₹45 L - 1.2 Cr",
        img: Image5,
      },
    ],
  },
];

export default function DevelopersSlider() {
  const getVisible = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [slides, setSlides] = useState(getVisible());
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleResize = () => setSlides(getVisible());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, developers.length - slides);
    if (current > maxIndex) setCurrent(maxIndex);
  }, [slides, current]);

  const maxIndex = Math.max(0, developers.length - slides);

  const goPrev = () => setCurrent((prev) => Math.max(0, prev - 1));
  const goNext = () => setCurrent((prev) => Math.min(maxIndex, prev + 1));

  const visibleDevelopers = developers.slice(current, current + slides);

  return (
    <div className="px-4 sm:px-8 py-10 sm:py-16 w-full bg-gray-50/50 font-inter">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-blue-800 tracking-wide leading-relaxed relative pb-2 inline-block">
          Featured Developers
          <span className="block h-1 w-1/3 bg-teal-400 absolute bottom-0 left-0 rounded-full"></span>
        </h2>
        <p className="text-gray-600 text-lg mt-2 mb-10 tracking-wide leading-relaxed">
          Trusted builders shaping the future of real estate. jhdcvhdsvchvhgss
        </p>

        {/* Slider */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white border border-blue-100 rounded-full shadow-lg p-3 transition hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hidden lg:block text-blue-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goNext}
            disabled={current >= maxIndex}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white border border-blue-100 rounded-full shadow-lg p-3 transition hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hidden lg:block text-blue-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Developer Cards */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto lg:overflow-x-hidden scrollbar-hide">
            {visibleDevelopers.map((dev, i) => (
              <div
                key={current + i}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 border border-gray-100 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white cursor-pointer"
              >
                <div className="p-6">
                  {/* Developer Info */}
                  <div className="flex items-start gap-4 mb-4 border-b pb-4 border-dashed border-gray-200">
                    <div className="h-14 w-14 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium text-2xl tracking-wide ring-2 ring-teal-400 ring-offset-2">
                      {dev.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 tracking-wide leading-relaxed">
                        {dev.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3 tracking-wide">
                        <span className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1 text-teal-500" />
                          {dev.projects} Projects
                        </span>
                        <span>|</span>
                        <span>Est. {dev.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 line-clamp-2 mb-4 h-10 leading-relaxed tracking-wide">
                    {dev.desc}
                  </p>

                  {/* Featured Project */}
                  {dev.projectsList.map((p, j) => (
                    <div
                      key={j}
                      className="mt-3 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={p.img || "/placeholder.svg"}
                        alt={p.title}
                        className="w-full h-44 object-cover object-center"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-medium text-blue-700 mb-1 tracking-wide">
                          {p.title}
                        </h4>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <p className="flex items-center text-gray-500 tracking-wide">
                            <MapPin className="w-4 h-4 mr-1 text-teal-500 flex-shrink-0" />
                            <span className="truncate">{p.location}</span>
                          </p>
                          <p className="flex items-center font-medium text-lg text-teal-600 tracking-wide">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {p.price.split("-")[0].trim()}
                          </p>
                        </div>
                        <button className="w-full mt-4 text-center text-sm font-medium bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition tracking-wide">
                          Explore Project
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dots (mobile) */}
          <div className="flex justify-center mt-8 gap-3 sm:hidden">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  current === idx
                    ? "bg-blue-700"
                    : "bg-gray-300 hover:bg-teal-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


