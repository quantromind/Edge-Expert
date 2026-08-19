import React, { useState } from "react";

const SpacewalaPricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual property listings",
      monthlyPrice: 49,
      yearlyPrice: 490,
      popular: false,
      features: [
        "1 Property Listing",
        "Basic Property Showcase",
        "30 Days Visibility",
        "Standard Support",
        "Basic Analytics",
      ],
      cta: "Get Started",
    },
    {
      name: "Professional",
      description: "Ideal for real estate agents",
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        "5 Property Listings",
        "Professional Photography",
        "Featured Listings",
        "Priority Support",
        "Advanced Analytics",
        "Social Media Promotion",
        "Lead Management",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      description: "For agencies and developers",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      popular: false,
      features: [
        "Unlimited Property Listings",
        "Virtual Tours & 3D Walkthroughs",
        "Premium Featured Listings",
        "24/7 Dedicated Support",
        "Custom Analytics Dashboard",
        "Multi-channel Marketing",
        "API Access",
        "White-label Solutions",
      ],
      cta: "Contact Sales",
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees for any of our plans. You only pay the monthly or yearly subscription.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer:
        "Yes, our annual plans offer approximately 2 months free compared to monthly billing.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
          Choose the perfect plan for your real estate needs. All plans include
          a 14-day free trial.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="relative bg-white rounded-lg p-1 flex border border-gray-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative py-2 px-4 sm:px-6 rounded-md font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative py-2 px-4 sm:px-6 rounded-md font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 ${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Yearly{" "}
              <span className="text-green-500 ml-1 hidden sm:inline">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 sm:mt-16 max-w-7xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
              plan.popular ? "ring-2 ring-blue-500 transform scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 text-xs sm:text-sm font-medium rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-3 sm:mt-4 text-gray-500 text-sm sm:text-base">
                {plan.description}
              </p>

              <div className="mt-6 sm:mt-8">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-sm sm:text-base font-medium text-gray-500 ml-1">
                  {billingCycle === "monthly" ? "/month" : "/year"}
                </span>
              </div>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm sm:text-base">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 sm:ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`mt-6 sm:mt-8 block w-full py-2.5 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md text-center font-medium text-sm sm:text-base ${
                plan.popular
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } transition-all duration-200`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 sm:mt-20 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
            Trusted by Real Estate Professionals
          </h2>
          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Active Agents" },
              { value: "10K+", label: "Properties Listed" },
              { value: "98%", label: "Customer Satisfaction" },
              { value: "24/7", label: "Dedicated Support" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {item.value}
                </div>
                <div className="mt-1 text-sm sm:text-base text-gray-600">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-5 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            Still have questions?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 sm:mt-20 bg-blue-700 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Ready to transform your real estate business?
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-blue-100">
            Join thousands of real estate professionals who trust Spacewala
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
              Start Your Free Trial
            </button>
            <button className="inline-flex justify-center items-center px-6 py-3 border border-white text-sm sm:text-base font-medium rounded-md text-white hover:bg-blue-600">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacewalaPricing;
