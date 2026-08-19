import React from 'react';

const VerifiedSeekersDashboardImage =
  "https://i.pinimg.com/1200x/19/ce/a2/19cea2abfea05f15a335374bb4cb4037.jpg"; 

const VisibilityIcon = () => (
  <div className="relative w-28 h-20 scale-100">
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="15" y="45" width="60" height="30" rx="6" fill="#7C3AED" opacity="0.2" />
      <rect x="25" y="30" width="60" height="30" rx="6" fill="#7C3AED" opacity="0.5" />
      <rect x="35" y="15" width="60" height="30" rx="6" fill="#7C3AED" />
      <path d="M55 25 L65 25 L65 30 L55 30 Z M60 20 L70 20 L70 25 L60 25 Z M65 15 L75 15 L75 20 L65 20 Z" fill="#ffffff" />
      <rect x="42" y="20" width="16" height="15" rx="3" fill="#ffffff" />
      <path d="M44 28 L50 24 L56 28 L56 32 L44 32 Z" fill="#7C3AED" />
    </svg>
    <span className="absolute -right-5 -top-3 text-xs font-bold text-purple-600 bg-white px-3 py-1 rounded-full border border-purple-200 shadow-md whitespace-nowrap transform rotate-3">
      Upgraded listing
    </span>
  </div>
);

const SmartToolsIcon = () => (
  <div className="relative w-28 h-20">
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="gaugeGradientSmart" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#FBBF24", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#10B981", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M10 70 A40 40 0 1 1 90 70" stroke="#e5e7eb" strokeWidth="8" fill="none" />
      <path d="M10 70 A40 40 0 0 1 70 25" stroke="url(#gaugeGradientSmart)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="70" r="6" fill="#374151" />
      <line x1="50" y1="70" x2="70" y2="40" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      <text x="30" y="75" fontSize="8" fill="#6b7280" className="font-medium">Min</text>
      <text x="70" y="75" fontSize="8" fill="#6b7280" textAnchor="end" className="font-medium">Max</text>
      <text x="50" y="58" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="bold">Rent Score</text>
      <text x="50" y="88" fontSize="10" fill="#6b7280" textAnchor="middle">₹5000 / month</text>
    </svg>
  </div>
);

const OwnerTrustSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Why <span className="text-pink-600 font-bold">2 Million+</span> property owners trust us
          </h2>
          <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto">
            Monthly <span className="font-semibold text-gray-800">17 Million+</span> property seekers
            visit our site in search of their right homes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl shadow-green-400/30 flex flex-col transition-transform duration-300 hover:scale-[1.02] border-4 border-green-500/10">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8 shadow-xl border border-gray-100">
              <img
                src={VerifiedSeekersDashboardImage}
                alt="Housing.com Owner Dashboard showing leads and lead scores"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/90EE90/1E40AF?text=Dashboard+Leads" }}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-gray-800 mb-2">Verified seekers</h3>
              <p className="text-gray-600 text-lg font-medium">We bring serious buyers and renters directly to you, filtered by lead score.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-purple-50 p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-transform duration-300 hover:shadow-2xl hover:bg-purple-100">
              <div className='flex-1 mb-4 sm:mb-0'>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Maximum visibility</h3>
                <p className="text-gray-600 font-medium">Showcase your property to thousands of seekers every day with boosted placements.</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <VisibilityIcon />
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-transform duration-300 hover:shadow-2xl hover:bg-gray-100">
              <div className='flex-1 mb-4 sm:mb-0'>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Smart tools</h3>
                <p className="text-gray-600 font-medium">Easy-to-use tools to create, optimise, and boost your listing for best results.</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <SmartToolsIcon />
              </div>
            </div>

            <div className="bg-blue-50 p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-transform duration-300 hover:shadow-2xl hover:bg-blue-100">
              <div className='flex-1 mb-4 sm:mb-0'>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dedicated Assistance</h3>
                <p className="text-gray-600 font-medium">Get Relationship Manager support and Field Visit Assistance for a smooth transaction.</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <svg className="w-20 h-20 text-blue-600 transform scale-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4m-7-7h2m-6 0h2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerTrustSection;
