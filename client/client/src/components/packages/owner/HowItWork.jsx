import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Upload your property",
      description: "Provide your personal details, property details, and pricing information to post your property ad online.",
      color: "text-purple-600",
      imageComponent: (
        <div className="relative flex items-center justify-center w-full h-24 mb-4">
          {/* SVG omitted for brevity */}
        </div>
      ),
    },
    {
      step: 2,
      title: "Choose a package",
      description: "Select a package that best suits your needs. Each package offers different features and benefits to help you reach potential buyers or renters.",
      color: "text-indigo-600",
      imageComponent: (
        <div className="relative flex items-center justify-center w-full h-24 mb-4">
          {/* SVG omitted for brevity */}
        </div>
      ),
    },
    {
      step: 3,
      title: "Property gets promoted to get unlimited enquiries",
      description: "Housing makes it easy to reach the right tenants and buyers, finding you the perfect match through targeted promotion and qualified enquiries.",
      color: "text-green-600",
      imageComponent: (
        <div className="relative flex items-center justify-center w-full h-24 mb-4">
          {/* SVG omitted for brevity */}
        </div>
      ),
    },
    {
      step: 4,
      title: "Dedicated RM filters out only the best suited enquiries for you",
      description: "Our Relationship Manager personally contacts potential tenants or buyers on your behalf. Sit back, relax, and trust them to handle everything smoothly. (For Assisted Packages Only)",
      color: "text-pink-600",
      imageComponent: (
        <div className="relative flex items-center justify-center w-full h-24 mb-4">
          {/* SVG omitted for brevity */}
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 font-sans border-t border-gray-200 tracking-wide">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <h2 className="text-xs font-normal tracking-wide uppercase text-center text-gray-500 mb-2">
          HOW IT WORKS
        </h2>
        <p className="text-4xl font-normal text-center text-gray-900 mb-16 leading-relaxed tracking-wide">
          4 easy steps to list & promote your properties
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.step} className="flex flex-col items-center p-4 text-center">
              {step.imageComponent}
              <h3 className="text-xl font-normal text-gray-800 mb-3 leading-relaxed tracking-wide">
                {step.title}
              </h3>
              <p className="text-gray-600 text-base font-light leading-relaxed tracking-wide">
                {step.description}
              </p>
              {step.step === 4 && (
                <span className="mt-4 inline-block bg-purple-100 text-purple-600 text-xs font-normal px-3 py-1 rounded-full tracking-wide">
                  For Assisted Packages Only
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 font-normal rounded-xl shadow-lg hover:bg-purple-700 transition duration-200 transform hover:scale-[1.02] tracking-wide">
            Start Listing Your Property Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
