import React, { useState } from "react";
import {
  CheckCircle,
  Briefcase,
  Users,
  Zap,
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  Coffee,
  ParkingSquare,
  Star,
  MapPin,
  Clock,
  Wifi,
  Shield,
} from "lucide-react";

export default function App() {
  const [billing, setBilling] = useState("monthly");
  const [selectedAddons, setSelectedAddons] = useState(new Set());

  const toggleAddon = (addonId) => {
    const newSelected = new Set(selectedAddons);
    newSelected.has(addonId)
      ? newSelected.delete(addonId)
      : newSelected.add(addonId);
    setSelectedAddons(newSelected);
  };

  const plans = [
    {
      id: "starter",
      icon: Briefcase,
      name: "Starter",
      priceMonth: 4999,
      priceYear: 41999,
      tag: "Best for freelancers & individuals",
      features: [
        "Dedicated desk (shared zone)",
        "Unlimited high-speed Wi-Fi",
        "Fixed secure locker",
        "Access: Mon–Fri 08:00–20:00",
        "Complimentary coffee & tea",
        "Printing credits: 50 pages/month",
      ],
      isRecommended: false,
      popular: false,
    },
    {
      id: "team",
      icon: Users,
      name: "Team",
      priceMonth: 17999,
      priceYear: 151999,
      tag: "Perfect for small teams (2–5)",
      features: [
        "Semi-private collaborative zone",
        "8 hrs meeting room / month",
        "Premium desks & printing allowance",
        "Flexible scaling and add-ons",
        "24/7 building access",
        "Dedicated community manager",
      ],
      isRecommended: true,
      popular: true,
    },
    {
      id: "business",
      icon: Building2,
      name: "Business",
      priceMonth: 49999,
      priceYear: 419999,
      tag: "Ideal for growing teams (6–20)",
      features: [
        "Fully private, lockable office",
        "Unlimited dedicated meeting hours",
        "Branding board & professional mail handling",
        "24/7 building access",
        "VIP event invitations",
        "Custom furniture options",
      ],
      isRecommended: false,
      popular: false,
    },
    {
      id: "enterprise",
      icon: Zap,
      name: "Enterprise",
      priceMonth: null,
      priceYear: null,
      tag: "Custom for large organizations",
      features: [
        "Custom layout & personalized pricing",
        "On-site dedicated support staff",
        "Dedicated account management",
        "Global access to all Edge Expert locations",
        "Premium IT infrastructure",
        "White-glove onboarding",
      ],
      isRecommended: false,
      popular: false,
    },
  ];

  const addons = [
    {
      id: "meeting_extra",
      icon: Calendar,
      label: "Extra Meeting Room Hrs",
      price: 500,
      description:
        "Additional meeting room hours beyond your plan limit",
    },
    {
      id: "virtual_office",
      icon: TrendingUp,
      label: "Virtual Office & Phone",
      price: 1999,
      description:
        "Professional business address and phone handling",
    },
    {
      id: "premium_coffee",
      icon: Coffee,
      label: "Premium Coffee Service",
      price: 999,
      description:
        "Artisanal coffee and specialty beverages",
    },
    {
      id: "parking",
      icon: ParkingSquare,
      label: "Dedicated Parking Slot",
      price: 2499,
      description:
        "Reserved parking space with easy access",
    },
    {
      id: "it_support",
      icon: Shield,
      label: "Premium IT Support",
      price: 3499,
      description:
        "Dedicated technical support and IT services",
    },
    {
      id: "event_space",
      icon: Users,
      label: "Event Space Access",
      price: 8999,
      description:
        "Access to premium event and conference spaces",
    },
  ];

  const features = [
    { icon: Wifi, text: "High-speed fiber internet" },
    { icon: Shield, text: "24/7 security & CCTV" },
    { icon: Coffee, text: "Complimentary beverages" },
    { icon: MapPin, text: "Prime locations" },
    { icon: Clock, text: "Flexible access hours" },
    { icon: Users, text: "Vibrant community" },
  ];

  const format = (n) => (n ? `₹${n.toLocaleString("en-IN")}` : "Contact us");

  const calculateTotal = () => {
    const plan = plans.find((p) => p.isRecommended);
    let total = plan
      ? billing === "monthly"
        ? plan.priceMonth
        : plan.priceYear
      : 0;

    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon)
        total += addon.price * (billing === "yearly" ? 12 : 1);
    });
    return total;
  };

  const PlanCard = ({ plan }) => {
    const Icon = plan.icon;
    const price =
      billing === "monthly" ? plan.priceMonth : plan.priceYear;
    const isRecommended = plan.isRecommended;

    return (
      <div
        className={`bg-white border-2 rounded-2xl p-6 flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.02]
        ${isRecommended ? "border-indigo-600 ring-2 ring-indigo-200" : "border-gray-200"}`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`p-3 rounded-xl ${
              isRecommended
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-light">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-500 font-light">{plan.tag}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-3xl sm:text-4xl font-light">
            {format(price)}
          </p>
          {billing === "yearly" && plan.priceMonth && (
            <p className="text-green-600 text-sm font-light">
              Save ₹
              {(
                plan.priceMonth * 12 -
                plan.priceYear
              ).toLocaleString("en-IN")}{" "}
              yearly
            </p>
          )}
        </div>

        <ul className="text-sm space-y-2 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start font-light">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              {f}
            </li>
          ))}
        </ul>

        <button
          className={`mt-6 py-3 rounded-xl font-light shadow-md transition-all duration-300
          ${
            plan.priceMonth
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {plan.priceMonth ? "Get Started" : "Schedule Call"}
        </button>
      </div>
    );
  };

  const AddOnCard = ({ addon }) => {
    const Icon = addon.icon;
    const isSelected = selectedAddons.has(addon.id);

    return (
      <div
        onClick={() => toggleAddon(addon.id)}
        className={`border-2 rounded-xl p-5 cursor-pointer flex flex-col justify-between transition-all
          ${
            isSelected
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 bg-white hover:shadow-md"
          }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${
              isSelected
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-light">{addon.label}</h4>
            <p className="text-sm text-gray-600 mt-1 font-light">
              {addon.description}
            </p>
            <p className="font-light text-indigo-700 mt-2">
              {format(addon.price)} /mo
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <section
        className="relative h-[65vh] sm:h-[75vh] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2969&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4">
            Elevate Your Work Experience
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 font-light">
            Premium workspaces designed for productivity and growth
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <button className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-light hover:bg-gray-100">
              Book a Tour
            </button> */}
            {/* <button className="px-6 py-3 border-2 border-white rounded-xl text-white hover:bg-white/10 font-light">
              View Virtual Tour
            </button> */}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 bg-white text-center px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-light mb-6">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i}>
                <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-sm font-light">{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-light mb-3">
            Flexible Plans for Every Team
          </h2>
          <div className="inline-flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-light ${
                billing === "monthly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-light ${
                billing === "yearly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600"
              }`}
            >
              Yearly (Save 16%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 sm:p-10 text-white">
          <h3 className="text-2xl sm:text-3xl font-light mb-4 text-center">
            Customize Your Workspace
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addons.map((addon) => (
              <AddOnCard key={addon.id} addon={addon} />
            ))}
          </div>

          {selectedAddons.size > 0 && (
            <div className="mt-8 bg-white/10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-light text-lg">
                  {selectedAddons.size} Add-on
                  {selectedAddons.size > 1 ? "s" : ""} selected
                </h4>
              </div>
              <div className="text-right">
                <p className="text-xl font-light">
                  {format(calculateTotal())}
                </p>
                <p className="text-sm font-light">
                  {billing === "monthly"
                    ? "per month"
                    : "per year"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}