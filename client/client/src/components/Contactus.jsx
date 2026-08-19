import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ComponentWrapper from "./ComponentWrapper";

const Contactus = () => {
  return (
    <ComponentWrapper route="/contact">
      <section
        id="contact"
        className="relative bg-gradient-to-br from-[#F5F7FA] to-[#E4E9F0] text-gray-900 py-20 px-6 lg:px-20 min-h-[90vh] overflow-hidden"
      >
      {/* Background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Info */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get in <span className="text-teal-400">Touch</span>
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Have questions about our properties, services, or investment
            opportunities? Our team at <span className="font-semibold text-gray-900">Edge Expert</span> is here to assist you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-white/30 p-5 rounded-2xl hover:bg-white/40 transition duration-300">
              <Phone className="w-6 h-6 text-teal-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Call Us</p>
                <a href="tel:07385327808" className="text-lg font-medium hover:text-teal-600 transition">073853 27808</a>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white/30 p-5 rounded-2xl hover:bg-white/40 transition duration-300">
              <Mail className="w-6 h-6 text-teal-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Email Us</p>
                <a href="mailto:hello@edgeexpert.in" className="text-lg font-medium hover:text-teal-600 transition">hello@edgeexpert.in</a>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white/30 p-5 rounded-2xl hover:bg-white/40 transition duration-300">
              <MapPin className="w-6 h-6 text-teal-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Visit Us</p>
                <p className="text-lg font-medium">Miraroad, Mumbai, Maharashtra, India - 401107</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send us a Message</h3>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-xl bg-white/40 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-xl bg-white/40 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 border border-gray-300 rounded-xl bg-white/40 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-400 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <Send className="w-5 h-5 mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
    </ComponentWrapper>
  );
};

export default Contactus;
