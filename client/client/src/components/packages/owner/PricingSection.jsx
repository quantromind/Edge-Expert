import React, { useState } from "react";
import {
  Check,
  X,
  Info,
  Calendar,
  Search,
  Users,
  MapPin,
  Camera,
  Zap,
  UserCheck,
  Video,
  Share2,
  FileText,
  Eye,
} from "lucide-react";

// --- Helper Component: Feature Cell ---
const PlanFeatureCell = ({ value, type, isPopular }) => {
  if (type === "boolean") {
    return (
      <td
        className={`py-4 px-6 text-center ${
          isPopular ? "bg-purple-50" : "bg-white"
        }`}
      >
        {value ? (
          <Check className="w-5 h-5 text-green-500 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-400 mx-auto" />
        )}
      </td>
    );
  }

  // For text type
  return (
    <td
      className={`py-4 px-6 text-center text-gray-700 font-semibold ${
        isPopular ? "bg-purple-50" : "bg-white"
      }`}
    >
      {value}
    </td>
  );
};

// --- MAIN COMPONENT ---
const PricingComparisonTableSection = ({ plans, id }) => {
  const [openFeature, setOpenFeature] = useState(null);
  const toggleFeature = (key) =>
    setOpenFeature(openFeature === key ? null : key);

  // Feature labels with optional icons
  const featureLabels = [
    {
      key: "listingVisibility",
      label: "Listing Visibility (Reach)",
      icon: <Eye className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
    },
    {
      key: "validity",
      label: "Plan Validity",
      icon: <Calendar className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
    },
    {
      key: "searchPosition",
      label: "Search Rank Position",
      icon: <Search className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
    },
    {
      key: "rankBoost",
      label: "Rank Boosts Included",
      icon: <Zap className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
    },
    {
      key: "matchingBuyers",
      label: "Matching Leads/Buyers",
      icon: <Users className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      hasInfo: true,
    },
    {
      key: "relationshipManager",
      label: "Dedicated Relationship Manager",
      icon: <UserCheck className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      type: "boolean",
    },
    {
      key: "fieldVisit",
      label: "Field Visit Assistance",
      icon: <MapPin className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      type: "boolean",
    },
    {
      key: "photoshoot",
      label: "Professional Photo/Video Shoot",
      icon: <Camera className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      type: "boolean",
    },
    {
      key: "shorts",
      label: "Short Video Promotion",
      icon: <Video className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      type: "boolean",
    },
    {
      key: "socialMedia",
      label: "Social Media Promotion",
      icon: <Share2 className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      type: "boolean",
    },
    {
      key: "propertyReport",
      label: "AI Property Report",
      icon: <FileText className="w-5 h-5 text-indigo-600 inline-block mr-2" />,
      type: "boolean",
    },
  ];

  if (!plans || plans.length === 0) {
    return (
      <section className="py-12 bg-gray-50 text-center text-gray-500">
        No feature data available for this section.
      </section>
    );
  }

  return (
    <section id={id} className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Comparison Table (Desktop) --- */}
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-white">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-500 w-1/4"></th>
                {plans.map((plan) => (
                  <th
                    key={plan.title}
                    className={`py-6 px-4 text-center border-l-2 ${
                      plan.popular
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-100"
                    }`}
                  >
                    {plan.popular && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 mb-2">
                        MOST POPULAR
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.title}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700 mt-1">
                      ₹{plan.price.toLocaleString("en-IN")}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {featureLabels.map((feature) => (
                <tr
                  key={feature.key}
                  className="hover:bg-gray-50 transition duration-100"
                >
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900 border-r border-gray-200 sticky left-0 bg-white z-20 shadow-sm">
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span className="font-semibold">{feature.label}</span>
                      {feature.hasInfo && (
                        <Info
                          className="w-4 h-4 text-gray-400 cursor-pointer"
                          title="Leads are filtered based on your property type and location"
                        />
                      )}
                    </div>
                  </td>
                  {plans.map((plan) => (
                    <PlanFeatureCell
                      key={plan.title + feature.key}
                      value={plan.features[feature.key]}
                      type={feature.type}
                      isPopular={plan.popular}
                    />
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-500 border-r border-gray-200 sticky left-0 bg-white">
                  &nbsp;
                </th>
                {plans.map((plan) => (
                  <td
                    key={`button-${plan.title}`}
                    className={`py-4 px-4 text-center border-l-2 ${
                      plan.popular
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <button
                      className={`w-full py-2 rounded-lg text-sm font-semibold transition duration-200 ${
                        plan.popular
                          ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                          : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                      }`}
                    >
                      Upgrade
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* --- Mobile View --- */}
        <div className="lg:hidden space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-lg shadow-md border ${
                plan.popular ? "border-purple-600" : "border-gray-200"
              } bg-white hover:shadow-lg transition-shadow`}
            >
              <div
                className={`p-4 ${
                  plan.popular ? "bg-purple-50" : "bg-gray-50"
                } rounded-t-lg`}
              >
                {plan.popular && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 mb-2">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.title}
                </h3>
                <p className="text-lg font-semibold text-gray-700 mt-1">
                  ₹{plan.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="divide-y divide-gray-100 border-t border-gray-200">
                {featureLabels.map((feature) => (
                  <div
                    key={feature.key}
                    className="flex justify-between items-center p-4 text-sm bg-white"
                  >
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span className="font-semibold text-gray-700">
                        {feature.label}
                      </span>
                      {feature.hasInfo && (
                        <Info
                          className="w-4 h-4 text-gray-400 cursor-pointer"
                          title="Leads are filtered based on your property type and location"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 font-semibold">
                      {feature.type === "boolean" ? (
                        plan.features[feature.key] ? (
                          <Check className="w-5 h-5 text-purple-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400" />
                        )
                      ) : (
                        <span className="text-gray-700">
                          {plan.features[feature.key]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <button
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition duration-200 ${
                    plan.popular
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                      : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                  }`}
                >
                  Upgrade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingComparisonTableSection;
