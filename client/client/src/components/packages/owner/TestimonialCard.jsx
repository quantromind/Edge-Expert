import React from "react";

const TestimonialCard = ({ quote, date, name, location, plan, rm }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 flex-shrink-0 w-full sm:w-80 md:w-96 relative hover:shadow-xl transition-shadow duration-200">
      {/* Top Section: Stars + Date */}
      <div className="flex justify-between items-start mb-4 relative">
        <div className="flex items-center">
          {/* Star Rating (always 5 stars here) */}
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.862 1.416 8.243L12 18.257l-7.415 3.847 1.416-8.243-6.001-5.862 8.332-1.209L12 .587z"/>
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-3">{date}</span>
        </div>

        {/* Decorative quotation mark */}
        <svg
          className="absolute top-0 right-0 w-24 h-20 text-purple-100 transform translate-x-1/4 -translate-y-1/4"
          fill="currentColor"
          viewBox="0 0 500 500"
        >
          <path
            d="M 0 500 C 0 250 250 0 500 0 L 500 250 C 375 250 375 375 375 500 Z"
            opacity="0.5"
          />
          <path
            d="M 125 500 C 125 375 250 250 375 250 L 375 375 C 312.5 375 312.5 437.5 312.5 500 Z"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 mb-6 relative z-10 italic font-semibold">
        "{quote}"
      </p>

      {/* User Info and Tags */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-yellow-300 mr-3 flex items-center justify-center text-sm font-bold text-gray-800">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">From {location}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col items-end space-y-1">
          <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full whitespace-nowrap">
            Plan: {plan}
          </span>
          {rm && (
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full whitespace-nowrap">
              Assisted RM: {rm}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
