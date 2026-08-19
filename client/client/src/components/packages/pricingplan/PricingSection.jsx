import React, { useState } from "react";
import PricingSection from "./PricingSection";

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");

  // Currency formatter
  const format = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);

  const plans = [
    {
      id: 1,
      name: "Starter",
      tag: "Perfect for freelancers",
      priceMonth: 2999,
      priceYear: 2999 * 12 * 0.83,
      features: [
        "Dedicated desk in shared area",
        "Unlimited high-speed WiFi",
        "Locker and power outlets",
        "Access Mon–Fri (8 AM–8 PM)",
      ],
    },
    {
      id: 2,
      name: "Team",
      tag: "For small growing teams",
      priceMonth: 7499,
      priceYear: 7499 * 12 * 0.83,
      features: [
        "Semi-private zone (up to 5 users)",
        "5 hrs meeting room access/month",
        "Unlimited WiFi & printing credits",
        "Priority support",
      ],
    },
    {
      id: 3,
      name: "Business",
      tag: "Private offices & startups",
      priceMonth: 14999,
      priceYear: 14999 * 12 * 0.83,
      features: [
        "Private cabin for up to 20 people",
        "Dedicated meeting room hours",
        "24/7 access with key card",
        "Reception & branding board",
      ],
    },
    {
      id: 4,
      name: "Enterprise",
      tag: "Custom office for large teams",
      priceMonth: null,
      priceYear: null,
      features: [
        "Custom layout & private floor",
        "Dedicated boardroom",
        "Reception & mail handling",
        "Custom pricing on request",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-20 px-6 lg:px-16">
      <PricingSection
        billing={billing}
        setBilling={setBilling}
        plans={plans}
        format={format}
      />
    </div>
  );
}
