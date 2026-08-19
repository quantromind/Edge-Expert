import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Example product images
import drone1 from "../../../assets/developer/drone1.png";
import drone2 from "../../../assets/developer/drone2.png";
import drone3 from "../../../assets/developer/drone3.png";

const contentproduct = [
  {
    title: "Digi Tour",
    img: drone1,
    description: [
      "Interactive virtual tour of the property",
      "Showcase interiors and amenities",
      "Accessible on all devices",
    ],
  },
  {
    title: "Digislate",
    img: drone2,
    description: [
      "Highlight project key points in slides",
      "Engaging visuals for buyers",
      "Perfect for marketing campaigns",
    ],
  },
  {
    title: "Slice View",
    img: drone3,
    description: [
      "360-degree project view from all angles",
      "Focus on individual units",
      "Easy navigation for desktop & mobile",
    ],
  },
  {
    title: "Drone Interactive",
    img: drone1,
    description: [
      "Interactive VR product to give panoramic view of the project locality",
      "Showcase project location from nearby landmarks",
      "Ease of accessibility on all mobile/desktop devices",
    ],
  },
  {
    title: "Digiplot",
    img: drone2,
    description: [
      "Visualize project plots and layouts",
      "Detailed measurement & positioning",
      "Perfect for investors and buyers",
    ],
  },
];

const Contentproduct = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(3); // Drone Interactive by default

  const prevProduct = () => {
    setSelectedProductIndex((prev) =>
      prev === 0 ? contentproduct.length - 1 : prev - 1
    );
  };

  const nextProduct = () => {
    setSelectedProductIndex((prev) =>
      prev === contentproduct.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">CONTENT PRODUCTS</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Digitally sophisticated and patented in-house technology products
        </p>
      </div>

      {/* Product Thumbnails */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-10 sm:mb-12">
        {contentproduct.map((product, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 cursor-pointer p-1 rounded-md border transition ${
              idx === selectedProductIndex
                ? "border-indigo-600 scale-105"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedProductIndex(idx)}
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md"
            />
            <p
              className={`text-xs sm:text-sm mt-1 text-center font-medium ${
                idx === selectedProductIndex ? "text-black" : "text-gray-400"
              }`}
            >
              {product.title}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10">
        {/* Left: Description */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            {contentproduct[selectedProductIndex].title}
          </h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            {contentproduct[selectedProductIndex].description.map((desc, i) => (
              <li key={i} className="flex items-start justify-center md:justify-start gap-2 text-sm sm:text-base">
                <span className="text-indigo-600 mt-1">•</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
          <button className="px-5 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
            I'm interested
          </button>
        </div>

        {/* Right: Main Image with Arrows */}
        <div className="w-full md:w-2/3 relative flex justify-center">
          <img
            src={contentproduct[selectedProductIndex].img}
            alt={contentproduct[selectedProductIndex].title}
            className="w-full max-w-[400px] sm:max-w-[500px] h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-xl shadow-lg"
          />
          {/* Arrows */}
          <button
            onClick={prevProduct}
            className="absolute top-1/2 left-2 sm:left-0 -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          <button
            onClick={nextProduct}
            className="absolute top-1/2 right-2 sm:right-0 -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contentproduct;
