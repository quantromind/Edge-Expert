// client/src/components/housekeeping/HouseKeepingHero.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Hero Images */
const HERO_IMAGES = {
  small1:
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/bd1025af-e29c-4fcf-b409-16446a83f607-dubai1-sothebys.jpg",
  small2:
    "https://88designbox.com/upload/2016/05/11/white-luxury-penthouse-01.jpg",
  large:
    "https://i.pinimg.com/1200x/44/90/a1/4490a1fbbc960ad9e64c3967c7545fed.jpg",
};

export default function HouseKeepingHero() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 10,
      y: (e.clientY / window.innerHeight - 0.5) * 10,
    });
  };

  return (
    <section
      className="relative overflow-hidden pb-10 text-white bg-[#030716]"
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @keyframes gentleFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes slowSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        .hero-anim {
          animation: gentleFloat 4.5s ease-in-out infinite,
                     slowSpin 18s linear infinite;
          transition: transform 0.5s ease;
          transform-style: preserve-3d;
        }

        .hero-hover:hover {
          transform: scale(1.07) rotateX(4deg) rotateY(-4deg);
          transition: 0.6s ease;
        }
      `}</style>

      {/* Background overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 700px at 10% 5%, rgba(8,50,80,0.35), transparent 70%), linear-gradient(180deg,#041625 0%, #02030a 85%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Section */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/80 border border-white/10 px-3 py-1 rounded-full hover:bg-white/10 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <h1 className="text-5xl sm:text-6xl font-light leading-tight">
            Professional Home & <br />
            <span className="font-semibold text-blue-300">
              Office Cleaning Services
            </span>
          </h1>

          <p className="mt-5 text-gray-300 max-w-xl leading-relaxed text-lg">
            Experience spotless perfection with Edge Expert Housekeeping — deep
            cleaning, sanitization, and complete home care.
          </p>
        </div>

        {/* Right Section (Images) */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="hero-anim hero-hover rounded-2xl overflow-hidden"
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              }}
            >
              <img
                src={HERO_IMAGES.small1}
                className="w-full h-48 md:h-52 object-cover"
              />
            </div>

            <div
              className="hero-anim hero-hover rounded-2xl overflow-hidden"
              style={{
                transform: `rotateY(${mousePos.x / 1.5}deg) rotateX(${
                  mousePos.y / 1.5
                }deg)`,
              }}
            >
              <img
                src={HERO_IMAGES.small2}
                className="w-full h-48 md:h-52 object-cover"
              />
            </div>
          </div>

          <div
            className="hero-anim hero-hover mt-5 rounded-3xl overflow-hidden"
            style={{
              transform: `rotateY(${mousePos.x / 2}deg) rotateX(${
                mousePos.y / 2
              }deg)`,
            }}
          >
            <img
              src={HERO_IMAGES.large}
              className="w-full h-64 md:h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
