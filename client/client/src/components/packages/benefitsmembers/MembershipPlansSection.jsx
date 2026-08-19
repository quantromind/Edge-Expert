import React, { useState } from "react";
import { Check, Star, Zap, Crown, Rocket, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MembershipPlansSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: billingPeriod === "monthly" ? "Free" : "Free",
      period: "Forever",
      bestFor: "First-time Buyers & Explorers",
      features: [
        "Access to public listings",
        "Basic property alerts",
        "Market newsletter",
        "Limited property views (10/month)",
        "Standard customer support"
      ],
      buttonText: "Get Started Free",
      popular: false,
      gradient: "from-gray-500 to-slate-600",
      bgGradient: "from-gray-800 to-slate-900",
      glow: "hover:shadow-gray-500/20",
      delay: 0.1
    },
    {
      name: "Premium",
      icon: Star,
      price: billingPeriod === "monthly" ? "₹999" : "₹799",
      period: billingPeriod === "monthly" ? "per month" : "per month",
      bestFor: "Serious Investors & Buyers",
      features: [
        "Early access to new listings",
        "Unlimited property views",
        "Personal property advisor",
        "Member-only discounts (up to 1%)",
        "Priority customer support",
        "Investment analysis reports",
        "Virtual tour access"
      ],
      buttonText: "Start 7-Day Trial",
      popular: true,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900 to-cyan-900",
      glow: "hover:shadow-blue-500/30",
      delay: 0.2
    },
    {
      name: "Elite",
      icon: Crown,
      price: billingPeriod === "monthly" ? "₹2,499" : "₹1,999",
      period: billingPeriod === "monthly" ? "per month" : "per month",
      bestFor: "Developers & Professional Agents",
      features: [
        "All Premium features",
        "Featured listing placement",
        "Advanced analytics dashboard",
        "Dedicated relationship manager",
        "Maximum discounts (up to 2%)",
        "Exclusive networking events",
        "Legal documentation support",
        "24/7 priority support"
      ],
      buttonText: "Go Elite",
      popular: false,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-900 to-pink-900",
      glow: "hover:shadow-purple-500/30",
      delay: 0.3
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-900 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-900 rounded-full blur-3xl opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-white">Choose Your Success Path</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-4xl font-semibold mb-6 text-white">
            Membership{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Plans
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan that matches your real estate ambitions and unlock exclusive benefits
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <button 
              onClick={() => setBillingPeriod("monthly")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === "monthly" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setBillingPeriod("yearly")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative ${
                billingPeriod === "yearly" 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Yearly Billing
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, idx) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                custom={plan.delay}
                className="relative group"
                onMouseEnter={() => setHoveredPlan(idx)}
                onMouseLeave={() => setHoveredPlan(null)}
                whileHover="hover"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0, y: 20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    transition={{ delay: plan.delay + 0.3, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-bold">MOST POPULAR</span>
                    </div>
                  </motion.div>
                )}

                {/* Main Card */}
                <div className={`relative bg-gray-800/80 backdrop-blur-sm border-2 rounded-3xl p-8 transition-all duration-500 h-full flex flex-col ${
                  plan.popular 
                    ? 'border-yellow-400 shadow-2xl' 
                    : 'border-gray-700 shadow-lg'
                } ${plan.glow} group-hover:shadow-2xl`}>
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10`}></div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    {/* Icon - No animation */}
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      variants={iconVariants}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-gray-400 text-lg">{plan.period}</span>}
                    </div>
                    
                    <p className="text-gray-400 text-sm">{plan.bestFor}</p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center gap-3"
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={i}
                      >
                        <motion.div
                          className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group/btn ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-xl`
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{plan.buttonText}</span>
                  </motion.button>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20`}></div>
                  <div className="absolute inset-[3px] rounded-3xl bg-gray-800 -z-10"></div>
                </div>

                {/* Floating Elements on Hover */}
                <AnimatePresence>
                  {hoveredPlan === idx && (
                    <>
                      <motion.div
                        className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${plan.gradient} rounded-full`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      />
                      <motion.div
                        className={`absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r ${plan.gradient} rounded-full`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-gray-300 text-sm">
              All plans include a <span className="font-semibold text-green-400">7-day money-back guarantee</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipPlansSection;