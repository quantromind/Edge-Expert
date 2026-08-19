import React from "react";
import {
  CheckCircle,
  Crown,
  Zap,
  Rocket,
  Briefcase,
  Handshake,
  Target,
  TrendingUp,
  LayoutGrid,
  FileText,
} from "lucide-react";
import paymentService from "../../../Api/paymentService.js";
import axiosConfig from "../../../Api/axiosConfig.js";

// --- Plan Data ---
const plans = [
  {
    title: "Starter",
    price: "Free",
    highlight: "For new developers exploring Edge Expert",
    features: [
      "List up to 3 projects",
      "Basic property visibility",
      "Access to verified broker network",
      "Email support",
      "Basic lead tracking",
    ],
    icon: <LayoutGrid className="w-6 h-6 text-white" />,
    btnColor: "bg-cyan-600 hover:bg-cyan-700",
    isRecommended: false,
    headerBg: "bg-cyan-700",
  },
  {
    title: "Premium",
    price: "₹2,999/month",
    highlight: "Boost your project’s visibility & reach buyers faster",
    features: [
      "Unlimited project listings",
      "Featured on homepage & search results (Priority)",
      "Priority broker connections",
      "Dedicated lead dashboard & CRM integration",
      "Phone + Email support (24h SLA)",
    ],
    icon: <Rocket className="w-6 h-6 text-orange-400 fill-current" />,
    btnColor:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/50",
    priceColor: "text-orange-400",
    checkIconColor: "text-orange-500",
    isRecommended: true,
    headerBg: "bg-cyan-700",
  },
  {
    title: "Elite",
    price: "₹6,999/month",
    highlight: "Expand your presence with targeted promotions",
    features: [
      "Unlimited listings with priority placement",
      "Exclusive promotion through verified brokers",
      "Hot verified buyer leads (Guaranteed volume)",
      "Performance & analytics reports (Quarterly deep dive)",
      "Dedicated relationship manager",
    ],
    icon: <Crown className="w-6 h-6 text-white" />,
    btnColor: "bg-cyan-600 hover:bg-cyan-700",
    isRecommended: false,
    headerBg: "bg-cyan-700",
  },
  {
    title: "Enterprise",
    price: "Custom Pricing",
    highlight: "For large developers and enterprise partnerships",
    features: [
      "Bulk project onboarding via API integration",
      "Advanced lead & broker analytics (Custom reporting)",
      "Custom marketing campaigns & brand integration",
      "Broker coordination + site visit management",
      "24/7 premium support & dedicated channel",
    ],
    icon: <Briefcase className="w-6 h-6 text-white" />,
    btnColor: "bg-cyan-600 hover:bg-cyan-700",
    isRecommended: false,
    headerBg: "bg-cyan-700",
  },
];

// --- Pulse Animation ---
const pulseKeyframes = `
@keyframes shadow-pulse {
  0%, 100% { box-shadow: 0 25px 50px -12px rgba(6,182,212,0.4), 0 0 0 0 rgba(6,182,212,0); }
  50% { box-shadow: 0 25px 50px -12px rgba(6,182,212,0.6), 0 0 0 5px rgba(6,182,212,0.2); }
}
`;

const FeatureBox = ({ title, desc, icon }) => (
  <div className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-md border border-gray-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-200/50">
    <div className="flex justify-center mb-3">
      <div className="p-3 rounded-full bg-cyan-100/70">{icon}</div>
    </div>
    <h4 className="text-base sm:text-lg font-normal text-gray-800 mb-1 tracking-wide">
      {title}
    </h4>
    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{desc}</p>
  </div>
);

const PricingCard = ({ plan }) => {
  const isRecommended = plan.isRecommended;

  const handlePayment = async () => {
    if (plan.price === "Free" || plan.price === "Custom Pricing") {
      alert(
        plan.price === "Free"
          ? "Free plan activated!"
          : "Please contact us for custom pricing"
      );
      return;
    }

    try {
      const amount = plan.title === "Premium" ? 2999 : 6999;
      const orderResponse = await axiosConfig.post("/payment/create-order", {
        amount,
        packageName: `${plan.title} Developer Plan`,
        customerInfo: {},
      });

      if (orderResponse.data.success) {
        await paymentService.initiatePayment({
          amount,
          orderId: orderResponse.data.order.id,
          description: `Payment for ${plan.title} Developer Plan`,
          onSuccess: async (response) => {
            try {
              await axiosConfig.post("/payment/verify-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: "user123",
                userName: "John Doe",
                userEmail: "user@example.com",
                userPhone: "7385327808",
                userType: "developer",
                planName: plan.title,
                planType: "developer_plan",
                amount: amount,
              });
              alert("Payment successful! Your plan is now active.");
            } catch {
              alert("Payment verification failed!");
            }
          },
          onCancel: () => {
            alert("Payment cancelled!");
          },
        });
      }
    } catch {
      alert("Payment initiation failed!");
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-md hover:scale-[1.02] transition-all relative overflow-hidden flex flex-col h-full ${
        isRecommended ? "ring-4 ring-orange-400/70" : "border border-gray-200"
      }`}
    >
      {/* Header */}
      <div className={`p-5 sm:p-6 text-white ${plan.headerBg}`}>
        {isRecommended && (
          <div className="absolute top-3 right-3 px-2 sm:px-3 py-0.5 bg-orange-500 text-white text-[10px] sm:text-xs font-medium uppercase tracking-widest rounded-full shadow-md">
            Recommended
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-full bg-white/10">{plan.icon}</div>
          <h3 className="text-base sm:text-lg font-normal tracking-wide">
            {plan.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm opacity-80 mb-3 leading-relaxed">
          {plan.highlight}
        </p>
        <div className="border-t border-white/20 pt-3">
          <p
            className={`text-xl sm:text-2xl md:text-3xl font-light ${
              isRecommended ? "text-orange-400" : "text-orange-300"
            } tracking-wide`}
          >
            {plan.price}
          </p>
          <p className="text-[11px] sm:text-xs text-white/80 mt-1 leading-relaxed">
            (All features included)
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 pt-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <ul className="space-y-3 text-sm sm:text-base mb-6 text-gray-700 leading-relaxed">
            {plan.features.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle
                  className={`w-4 h-4 mt-0.5 ${
                    isRecommended ? plan.checkIconColor : "text-cyan-500"
                  }`}
                />
                <span className="tracking-wide">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handlePayment}
          className={`${plan.btnColor} text-white py-2 sm:py-2.5 rounded-xl font-medium text-sm sm:text-base tracking-wide transition hover:-translate-y-0.5`}
        >
          {plan.price === "Free"
            ? "Get Started"
            : plan.price === "Custom Pricing"
            ? "Inquire Now"
            : `Pay ${plan.price}`}
        </button>
      </div>
    </div>
  );
};

const ComplianceSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
    <div className="flex flex-col md:flex-row items-start bg-cyan-50 p-5 sm:p-6 rounded-2xl shadow-md border border-cyan-200/50 gap-4">
      <div className="flex-shrink-0 p-3 bg-cyan-600 rounded-xl shadow-md">
        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-normal text-gray-900 mb-1 tracking-wide">
          Developer Onboarding & Compliance Checklist
        </h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          To ensure smooth onboarding and compliance with RERA guidelines, all
          developer partners must submit essential KYC documentation including
          PAN Card, Aadhaar Card, and RERA Certificate during final agreement.
        </p>
      </div>
    </div>
  </div>
);

const DeveloperPlans = () => {
  return (
    <section className="bg-gray-100 min-h-screen py-12 sm:py-16 font-['Poppins',sans-serif] tracking-wide leading-relaxed">
      <style>{pulseKeyframes}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 mb-12 sm:mb-16">
        <p className="text-cyan-600 text-sm sm:text-base font-light uppercase tracking-widest mb-2 flex items-center justify-center">
          <Zap className="w-4 h-4 mr-2" />
          Scale Your Real Estate Business
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-3 sm:mb-4 leading-tight tracking-wide">
          Premium Developer Partnerships
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto font-light leading-relaxed">
          Showcase your projects to thousands of active buyers and partner with
          our verified broker network to secure faster sales.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-6">
        {[
          {
            title: "Managed Broker Network",
            desc: "Partner with verified brokers who actively promote your listings.",
            icon: <Handshake className="w-6 h-6 text-cyan-600" />,
          },
          {
            title: "High-Intent Lead Flow",
            desc: "Receive verified buyer leads filtered through AI to maximize conversion.",
            icon: <Target className="w-6 h-6 text-orange-500" />,
          },
          {
            title: "Brand Elevation",
            desc: "Position your firm as a leader with digital promotions across our platform.",
            icon: <TrendingUp className="w-6 h-6 text-pink-600" />,
          },
        ].map((item, i) => (
          <FeatureBox key={i} {...item} />
        ))}
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 px-4 sm:px-6 mb-12 sm:mb-16 items-stretch">
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} />
        ))}
      </div>

      {/* Compliance */}
      <ComplianceSection />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-cyan-700 text-white rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl text-center lg:text-left">
          <div className="lg:max-w-lg">
            <h3 className="text-xl sm:text-2xl font-normal mb-2 leading-snug tracking-wide">
              Ready to Transform Your Sales Strategy?
            </h3>
            <p className="text-cyan-200 text-sm sm:text-base font-light leading-relaxed">
              Schedule a free consultation with our partnership team to find
              the right plan for your project pipeline.
            </p>
          </div>
          <button className="bg-orange-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-md hover:bg-orange-600 transition tracking-wide w-full sm:w-auto">
            Book a Demo Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeveloperPlans;
