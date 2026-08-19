
import React, { useState } from "react";
import { CheckCircle, Zap, Shield, Briefcase, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ------------------------------------------
// Background Floating Blobs
// ------------------------------------------
const AmbientBlob = ({ delay, color }) => (
  <motion.div
    className="absolute w-[450px] h-[450px] rounded-full blur-[170px] opacity-30"
    style={{ background: color }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: [0.1, 0.25, 0.18], scale: [1, 1.05, 1] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

// ------------------------------------------
// PLANS DATA
// ------------------------------------------
const corporateServicePlans = [
  {
    name: "Essential Hygiene & Soft Services",
    tagline: "Perfect for daily office hygiene and soft operations.",
    price: "₹35,000/month (Est.)",
    description:
      "Soft-services focused: cleaning, pantry, pest management & routine upkeep.",
    features: [
      { text: "Daily Housekeeping & Cleaning", icon: CheckCircle },
      { text: "Pantry & Office Support Staff", icon: Briefcase },
      { text: "Routine Pest Control", icon: Shield },
      { text: "Daily Restroom Sanitization", icon: CheckCircle },
    ],
    extras: [
      "Monthly hygiene audit reports",
      "Eco-friendly certified chemicals",
      "Part-time supervisor available",
    ],
    button: "Get Quote",
    gradient: "from-green-400 to-teal-400",
    iconColor: "text-teal-500",
  },
  {
    name: "Integrated Facility Management (IFM)",
    tagline: "Complete end-to-end facility management with automation.",
    price: "Custom Pricing",
    description:
      "Soft services + technical + security + maintenance under one roof.",
    features: [
      { text: "24/7 Security & Access Control", icon: Shield },
      { text: "Pantry, Cleaning, Deep Cleaning", icon: CheckCircle },
      { text: "Electrical, HVAC & Plumbing O&M", icon: Zap },
      { text: "Dedicated Facility Manager", icon: Briefcase },
    ],
    extras: [
      "Predictive maintenance scheduling",
      "Multi-site manpower scaling",
      "Advanced reporting dashboard",
    ],
    button: "Request Proposal",
    gradient: "from-cyan-500 to-blue-500",
    iconColor: "text-blue-600",
  },
  {
    name: "Advanced Security & Technical Services",
    tagline: "Ideal for high-security environments & technical infra.",
    price: "₹65,000/month (Est.)",
    description:
      "Security personnel + CCTV mgmt + technical O&M for large offices.",
    features: [
      { text: "Trained Guarding & Patrol", icon: Shield },
      { text: "CCTV Monitoring & Visitor Mgmt", icon: Shield },
      { text: "Fire Safety & Emergency Response", icon: Zap },
      { text: "Technical O&M Support", icon: Zap },
    ],
    extras: [
      "Quarterly security audits",
      "Emergency on-call engineering team",
      "AMC coordination included",
    ],
    button: "Inquire Now",
    gradient: "from-purple-500 to-pink-500",
    iconColor: "text-purple-600",
  },
  {
    name: "Enterprise Custom Solution",
    tagline: "For large corporate campuses & multi-site operations.",
    price: "Custom Contract",
    description:
      "Full customization across soft, hard, security & tech services.",
    features: [
      { text: "Dedicated Key Account Manager", icon: CheckCircle },
      { text: "Fully Customizable Services", icon: Briefcase },
      { text: "Flexible Contracts & Billing", icon: CheckCircle },
      { text: "Enterprise-grade Facility Dashboard", icon: Zap },
    ],
    extras: ["SLA-backed performance", "Volume discounts", "Multi-region integration"],
    button: "Schedule Consultation",
    gradient: "from-orange-400 to-yellow-400",
    iconColor: "text-orange-500",
  },
];

// ------------------------------------------
// MAIN COMPONENT
// ------------------------------------------
const HousekeepingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="relative py-20 px-4 bg-white text-black overflow-hidden min-h-screen">

      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <AmbientBlob delay={0} color="#00c9a7" />
        <AmbientBlob delay={2} color="#4f46e5" />
        <AmbientBlob delay={4} color="#ff7f50" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 drop-shadow-lg">
          Corporate Housekeeping & Facility Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-lg">
          Powerful, scalable & enterprise-ready service frameworks.
        </p>
      </motion.div>

      {/* Responsive Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {corporateServicePlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -18,
              scale: 1.03,
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
            }}
            className="relative flex flex-col justify-between p-7 rounded-3xl bg-white/70 
                       backdrop-blur-xl border border-gray-200 shadow-lg hover:shadow-2xl 
                       transition-all duration-300 min-h-[520px]"
            onClick={() => setSelectedPlan(plan)}
          >
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${plan.iconColor}`}>
                {plan.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">{plan.tagline}</p>

              <h4 className="text-xl font-bold mb-3">{plan.price}</h4>

              <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-700">
                    <f.icon className={`${plan.iconColor} w-4 h-4 mr-2`} />
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Button always at bottom */}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-8 w-full py-3 rounded-xl text-sm font-bold 
                         text-white bg-gradient-to-r ${plan.gradient}`}
            >
              {plan.button}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: -40 }}
              className="relative bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl border border-gray-200"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
              >
                <X size={26} />
              </button>

              <h3 className="text-2xl font-bold mb-1">{selectedPlan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{selectedPlan.tagline}</p>

              <h4 className="text-xl font-bold text-teal-600 mb-3">{selectedPlan.price}</h4>

              <p className="text-gray-600 text-sm mb-6">{selectedPlan.description}</p>

              <h5 className="text-sm font-bold mb-2">Included Services:</h5>
              <ul className="space-y-2 mb-6 text-sm">
                {selectedPlan.features.map((f, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="text-green-500 w-4 h-4 mr-2" />
                    {f.text}
                  </li>
                ))}
              </ul>

              <h5 className="text-sm font-bold mb-2">Contract Benefits:</h5>
              <ul className="list-disc ml-5 text-sm text-gray-600 mb-6">
                {selectedPlan.extras.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedPlan(null)}
                className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-teal-500 to-blue-500"
              >
                {selectedPlan.button}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HousekeepingPlans;
