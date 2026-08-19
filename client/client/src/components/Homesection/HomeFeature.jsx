import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

// --- Property Data ---
const allProperties = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/d5/26/b0/d526b09b72d750051b32a74675b2358c.jpg",
    title: "Luxury Sea-View Penthouse",
    location: "Bandra, Mumbaii",
    quote: "Experience sky-high living with breathtaking Arabian Sea views.",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/08/a5/b1/08a5b18f03b8004b7cd6f41a4ec23448.jpg",
    title: "Gateway Residence, Colaba",
    location: "Colaba, Mumbai",
    quote: "A blend of heritage charm and contemporary luxury.",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/83/d2/fb/83d2fb6e340805b873c599ce6632d8c6.jpg",
    title: "Smart Villa with Home Automation",
    location: "Whitefield, Bangalore",
    quote: "Redefining comfort with intelligent living spaces.",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/1200x/36/25/32/362532bb87c0d9929703d8dd90ef752b.jpg",
    title: "Prestige Commercial Hub",
    location: "MG Road, Bangalore",
    quote: "Where innovation meets business excellence.",
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/736x/d5/26/b0/d526b09b72d750051b32a74675b2358c.jpg",
    title: "Premium Retail Space",
    location: "Noida, Delhi NCR",
    quote: "Prime retail destination for visionary brands.",
  },
  {
    id: 6,
    image:
      "https://i.pinimg.com/1200x/29/10/db/2910dbb5d794e5fa5301b7919eb55c50.jpg",
    title: "Modern Lakeview Apartment",
    location: "Pune",
    quote: "Tranquil living with stunning waterside views.",
  },
  {
    id: 7,
    image:
      "https://i.pinimg.com/1200x/b7/bb/b7/b7bbb7d9449bd1d62573d780ac0d4467.jpg",
    title: "Skyline Corporate Tower",
    location: "Gurugram",
    quote: "Premium commercial spaces built for enterprise excellence.",
  },
  {
    id: 8,
    image:
      "https://i.pinimg.com/1200x/8b/97/61/8b9761ec081b23e302567585d65393f6.jpg",
    title: "Ultra-Luxury Private Villa",
    location: "Hyderabad",
    quote: "Experience unmatched luxury in expansive private spaces.",
  },
  {
    id: 9,
    image:
      "https://i.pinimg.com/736x/ff/3e/10/ff3e10ecf29dfd86dd3aab4eb18f0e66.jpg",
    title: "Elite Heritage Mansion",
    location: "Chennai",
    quote: "Classic architecture blended with modern sophistication.",
  },
];

const CoverflowPropertyShowcase = () => {
  const [index, setIndex] = useState(0);
  const total = allProperties.length;

  // ✅ Auto rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  // ✅ Navigation
  const nextSlide = () => setIndex((prev) => (prev + 1) % total);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + total) % total);

  // ✅ FIXED — Circular distance calculation (smooth infinite loop)
  const getCardStyle = (i) => {
    // ✅ Circular distance
    let distance = (i - index + total) % total;

    // ✅ Normalize distance (so last → first is smooth)
    if (distance > total / 2) distance -= total;

    let translateX = 0;
    let translateZ = -120;
    let rotate = 0;
    let scale = 0.9;
    let opacity = 0;
    let zIndex = 0;

    // ✅ Center Card
    if (distance === 0) {
      scale = 1;
      translateZ = 0;
      opacity = 1;
      zIndex = 20;
    }

    // ✅ Left 1
    else if (distance === -1) {
      translateX = -35;
      translateZ = -40;
      rotate = 10;
      opacity = 1;
      zIndex = 15;
    }

    // ✅ Right 1
    else if (distance === 1) {
      translateX = 35;
      translateZ = -40;
      rotate = -10;
      opacity = 1;
      zIndex = 15;
    }

    // ✅ Left 2
    else if (distance === -2) {
      translateX = -70;
      translateZ = -80;
      rotate = 10;
      scale = 0.88;
      opacity = 0.9;
      zIndex = 12;
    }

    // ✅ Right 2
    else if (distance === 2) {
      translateX = 70;
      translateZ = -80;
      rotate = -10;
      scale = 0.88;
      opacity = 0.9;
      zIndex = 12;
    }

    // ✅ All remaining cards hidden
    else {
      opacity = 0;
      scale = 0.7;
      translateZ = -200;
    }

    return {
      transform: `translateX(${translateX}%) rotateY(${rotate}deg) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      borderRadius: "20px",
      transition: "700ms ease",
    };
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-10 overflow-hidden">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-10 text-center">
          ICONIC TOWER
        </h2>

        {/* 3D Coverflow Container */}
        <div
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex justify-center items-center"
          style={{ perspective: "1200px" }}
        >
          {allProperties.map((property, i) => {
            const isActive = i === index;
            const style = getCardStyle(i);

            return (
              <div
                key={property.id}
                className="absolute w-3/4 sm:w-2/3 md:w-1/2 h-full overflow-hidden shadow-2xl bg-gray-800 cursor-pointer border border-gray-700"
                style={style}
                onClick={() => setIndex(i)}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover brightness-[0.85]"
                />

                {/* Info only on active card */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-1">
                      {property.title}
                    </h3>

                    <div className="flex items-center text-gray-300 text-sm sm:text-base mb-2 font-medium">
                      <MapPin className="w-4 h-4 mr-2" />
                      {property.location}
                    </div>

                    <p className="text-gray-300 italic text-sm">
                      “{property.quote}”
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={prevSlide}
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {allProperties.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === i ? "bg-blue-500 w-4" : "bg-gray-500 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverflowPropertyShowcase;
