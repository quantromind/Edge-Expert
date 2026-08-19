import React from "react";
import TestimonialCard from "./TestimonialCard"; // Ensure correct path

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Using Housing.com was an absolute delight! Their executives provided continuous, top-notch leads directly, showcasing their dedication to customer satisfaction.",
      date: "December 12, 2023",
      name: "Nabashis Mallick",
      location: "Kolkata",
      plan: "Assist +",
      rm: "Ramanand",
    },
    {
      quote: "I'm incredibly grateful for the support from my Hou manager! With her proactive approach and unwavering dedication, navigating deals has never been easier.",
      date: "March 15, 2024",
      name: "Mohan Bhawkar",
      location: "Pune",
      plan: "Guarantee",
      rm: "Anjali Basu",
    },
    {
      quote: "The listing tools made managing my properties seamless, and the verified leads saved me so much time. Highly recommend the Super Assist plan!",
      date: "Feb 01, 2024",
      name: "Sonia Rao",
      location: "Hyderabad",
      plan: "Super Assist",
      rm: "N/A",
    },
    {
      quote: "Excellent visibility boost! My property was rented out within a week after upgrading to the Premium+ package.",
      date: "Jan 22, 2024",
      name: "Rajesh Kumar",
      location: "Mumbai",
      plan: "Premium +",
      rm: "N/A",
    },
  ];

  const scrollRef = React.useRef(null);
  const scrollAmount = 350;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-gray-50 font-sans border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <h2 className="text-xs font-bold tracking-widest uppercase text-center text-purple-600 mb-2">
          TESTIMONIALS
        </h2>
        <p className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Boost your sales with our incredible packages
        </p>

        {/* Scrollable Cards */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll space-x-6 pb-4 scroll-smooth no-scrollbar"
          >
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition duration-150 z-10 hidden md:flex"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition duration-150 z-10"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hide scrollbars */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
