import React from "react";
import { ArrowRight, Check } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-4xl font-semibold mb-6">
          Ready to Transform Your Real Estate Journey?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join 10,000+ successful members who are making smarter real estate decisions every day
        </p>
        
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
            Schedule a Demo
          </button>
        </div> */}
        
        <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            7-day free trial
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;