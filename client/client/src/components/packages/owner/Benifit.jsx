import React from "react";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Get the top slot on property listings to stand out from the rest",
      iconComponent: (
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-purple-600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
          <rect x="30" y="45" width="40" height="30" rx="3" fill="#6b46c1" opacity="0.3" />
          <rect x="35" y="40" width="40" height="30" rx="3" fill="#6b46c1" opacity="0.5" />
          <rect x="40" y="35" width="40" height="30" rx="3" fill="#6b46c1" />
          <path d="M40 35 L40 18 L70 23 L70 35 Z" fill="#34d399" />
          <path d="M70 23 L70 35" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Get special property tags to attract more enquiries",
      iconComponent: (
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-purple-600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
          <path
            d="M65 25 L35 25 A5 5 0 0 0 30 30 L30 70 A5 5 0 0 0 35 75 L65 75 L70 50 L65 25 Z"
            fill="#6b46c1"
          />
          <path d="M50 35 L50 55" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="63" r="2" fill="#ffffff" />
        </svg>
      ),
    },
    {
      title: "Get 360 property visual experience with our patented Digitour",
      iconComponent: (
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-purple-600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
          <path
            d="M30 40 L70 40 A10 10 0 0 1 80 50 L80 60 A10 10 0 0 1 70 70 L30 70 A10 10 0 0 1 20 60 L20 50 A10 10 0 0 1 30 40 Z"
            fill="#6b46c1"
          />
          <circle cx="40" cy="55" r="5" fill="#a78bfa" />
          <circle cx="60" cy="55" r="5" fill="#a78bfa" />
          <path d="M30 40 C30 30 70 30 70 40" stroke="#6b46c1" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Dedicated Relationship Manager",
      iconComponent: (
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-purple-600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
          <circle cx="50" cy="40" r="15" fill="#6b46c1" />
          <path d="M30 70 A20 20 0 0 1 70 70" stroke="#6b46c1" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M35 30 C35 20 65 20 65 30" stroke="#805ad5" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="65" cy="30" r="3" fill="#805ad5" />
        </svg>
      ),
    },
    {
      title: "Verified & filtered enquiries with Tenant Profiles",
      iconComponent: (
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-purple-600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
          <rect x="30" y="35" width="40" height="30" rx="3" fill="#6b46c1" />
          <path d="M40 65 L60 65 L50 75 Z" fill="#6b46c1" />
          <path d="M40 50 L45 55 L60 40" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="40" r="8" fill="#fbd38d" stroke="#6b46c1" strokeWidth="1.5" />
          <path d="M50 50 C50 60 70 60 70 50" fill="#fbd38d" stroke="#6b46c1" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-purple-50 font-sans tracking-wide">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-xs font-normal tracking-wide uppercase text-purple-600 mb-2">BENEFITS</h2>
        <p className="text-4xl font-normal text-gray-900 mb-16 leading-relaxed tracking-wide">
          Unlock these benefits with a package purchase
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              {benefit.iconComponent}
              <p className="text-base font-light text-gray-700 max-w-xs leading-relaxed tracking-wide">
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
