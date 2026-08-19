import React, { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, Building, Home, Shield } from "lucide-react";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "500+", label: "Premium Listings", icon: Building },
    { number: "₹50Cr+", label: "Property Value", icon: TrendingUp },
    { number: "98%", label: "Satisfaction Rate", icon: Shield }
  ];

  const features = [
    { icon: Shield, text: "Verified Properties" },
    { icon: Home, text: "Smart Matching" },
    { icon: Building, text: "Premium Support" }
  ];

  const scrollToMembershipPlans = () => {
    const membershipSection = document.getElementById('membership-plans');
    if (membershipSection) {
      membershipSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20">
      {/* Navigation Bar Space */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-transparent z-20"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px),
                           linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Buildings Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 text-center z-10 mt-8">
        {/* Main Heading with Stagger Animation */}
        <div className={`space-y-4 mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-200">
               Edge Expert Smart Real Estate
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Investments
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Join India's premier real estate platform and unlock exclusive member benefits
          </p>
        </div>

        {/* Feature Pills */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-full group hover:bg-white/20 transition-all duration-300"
            >
              <feature.icon className="w-3 h-3 text-cyan-300" />
              <span className="text-xs text-white font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
            onClick={scrollToMembershipPlans}
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/25 flex items-center gap-2 text-base"
          >
            View Plans
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Animated Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className={`text-center p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/30 transition-all duration-500 transform hover:scale-105 ${
                  currentStat === idx ? 'bg-cyan-500/20 border-cyan-400/50' : ''
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20">
                    <IconComponent className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-cyan-100 text-xs font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className={`mt-12 transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div 
            onClick={scrollToMembershipPlans}
            className="flex flex-col items-center gap-2 text-cyan-300/60 cursor-pointer hover:text-cyan-300 transition-colors"
          >
            <span className="text-xs font-light">Explore Membership Plans</span>
            <div className="w-5 h-8 border border-cyan-300/30 rounded-full flex justify-center hover:border-cyan-300 transition-colors">
              <div className="w-1 h-2 bg-cyan-300/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-50"></div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50px, -50px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;