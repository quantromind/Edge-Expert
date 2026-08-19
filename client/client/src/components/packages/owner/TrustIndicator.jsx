import React, { useRef } from "react";

const TrustIndicatorsSection = () => {
  const trustLogos = [
    {
      name: "Verified Properties",
      icon: (
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Top Banks Tie-up",
      icon: (
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 5h6m-6 0h.01M9 12h6m-6 4h6"
          ></path>
        </svg>
      ),
    },
    {
      name: "Secure Transactions",
      icon: (
        <svg
          className="w-12 h-12 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"
          ></path>
        </svg>
      ),
    },
    {
      name: "24/7 Support",
      icon: (
        <svg
          className="w-12 h-12 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          ></path>
        </svg>
      ),
    },
    {
      name: "RERA Compliant",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
    },
    {
      name: "5 Lakh+ Active Listings",
      icon: (
        <svg
          className="w-12 h-12 text-cyan-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          ></path>
        </svg>
      ),
    },
  ];

  const scrollRef = useRef(null);
  const scrollAmount = 300;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-gray-50 font-sans relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10 tracking-tight">
          Trusted by Thousands of Property Owners
        </h2>

        {/* Scrollable Logos */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition"
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-8 py-4 px-10 snap-x snap-mandatory"
          >
            {trustLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 snap-center min-w-[150px]"
              >
                {logo.icon}
                <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
                  {logo.name}
                </p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
