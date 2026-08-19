import React from "react";
import { Users, Star, Home, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    { icon: Users, step: "", title: "Sign Up", desc: "Create your free account in 2 minutes" },
    { icon: Star, step: "", title: "Choose Plan", desc: "Select membership that fits your needs" },
    { icon: Home, step: "", title: "Get Access", desc: "Unlock exclusive features immediately" },
    { icon: TrendingUp, step: "", title: "Start Exploring", desc: "Find your perfect property match" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          How Membership Works
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Simple steps to unlock your real estate potential
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="text-center relative group"> {/* Added group for hover */}
              {idx < 3 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 -z-10"></div>
              )}
              {/* UPDATED ICON DESIGN */}
              <div className="w-18 h-18 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-9 h-9 text-white" /> {/* Larger and white icon */}
              </div>
              {/* END UPDATED ICON DESIGN */}
              <div className="text-sm font-semibold text-blue-600 mb-2">{item.step}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;