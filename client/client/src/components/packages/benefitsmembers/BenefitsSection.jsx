import React from "react";
import { 
  Shield, 
  Users, 
  Star, 
  BarChart, 
  Check,
  IndianRupee,
  Building
} from "lucide-react";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  const benefits = [
    { 
      icon: Building, 
      title: "Exclusive Property Access", 
      desc: "Get first access to premium listings and off-market opportunities before public release.",
      features: ["Early bird access", "Off-market deals", "Verified listings", "Priority viewing"],
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      delay: 0.1
    },
    { 
      icon: IndianRupee, 
      title: "Smart Savings", 
      desc: "Maximize your savings with exclusive discounts and member-only pricing.",
      features: ["Zero brokerage fees", "Cashback rewards", "Price protection", "Tax benefits"],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      delay: 0.2
    },
    { 
      icon: BarChart, 
      title: "Market Intelligence", 
      desc: "Leverage data-driven insights for smarter investment decisions.",
      features: ["Price predictions", "Hotspot analysis", "ROI calculator", "Trend reports"],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      delay: 0.3
    },
    { 
      icon: Shield, 
      title: "Secure Transactions", 
      desc: "Experience worry-free deals with legal support and escrow protection.",
      features: ["Legal verification", "Escrow services", "Fraud protection", "Document safety"],
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      delay: 0.4
    },
    { 
      icon: Users, 
      title: "Elite Networking", 
      desc: "Connect with developers, investors, and industry experts.",
      features: ["VIP events", "Investor meets", "Expert sessions", "Community forum"],
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      delay: 0.5
    },
    { 
      icon: Star, 
      title: "Personalized Service", 
      desc: "Enjoy a dedicated relationship manager and AI-powered suggestions.",
      features: ["Personal advisor", "Smart matching", "24/7 support", "Custom alerts"],
      gradient: "from-yellow-500 to-amber-500",
      bgGradient: "from-yellow-50 to-amber-50",
      delay: 0.6
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 text-center">
      {/* Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-600">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Edge Expert?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover exclusive benefits designed to transform your real estate experience — 
            blending innovation, insights, and personalized service.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative w-full max-w-[380px]"
            >
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-transparent group-hover:scale-105 group-hover:-translate-y-2 h-full flex flex-col items-center text-center overflow-hidden">
                
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10`}></div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                  {/* Shine animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent skew-x-[-20deg] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] ease-out"></div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed px-2">
                  {benefit.desc}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6 w-full text-left sm:text-center">
                  {benefit.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center justify-start sm:justify-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + benefit.delay, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-6 h-6 min-w-[24px] bg-gradient-to-r ${benefit.gradient} rounded-full flex items-center justify-center`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom Accent Bar */}
                <div className={`w-full h-1 bg-gradient-to-r ${benefit.gradient} rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
