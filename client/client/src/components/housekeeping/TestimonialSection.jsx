// src/components/TestimonialSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonialsData = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Resident",
      location: "Mumbai",
      rating: 5,
      content:
        "Professional and punctual team. Loved the eco-friendly cleaning approach! My apartment has never been cleaner. They paid attention to every detail.",
      avatar: "PS",
      color: "from-purple-500 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Rohit Verma",
      role: "Corporate Client",
      location: "Pune",
      rating: 4,
      content:
        "The team transformed our office space in record time. The cleanliness and organization exceeded our expectations. Great service overall!",
      avatar: "RV",
      color: "from-blue-500 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Sneha Patel",
      role: "Interior Designer",
      location: "Ahmedabad",
      rating: 5,
      content:
        "As a designer, I appreciate their attention to detail. They handled our client’s home with utmost care — spotless results every time!",
      avatar: "SP",
      color: "from-green-400 to-teal-500",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Aarohi Mehta",
      role: "Restaurant Owner",
      location: "Delhi",
      rating: 5,
      content:
        "Our restaurant kitchen and dining area have never looked better. The team is reliable, efficient, and always maintains high standards of hygiene.",
      avatar: "AM",
      color: "from-orange-500 to-red-500",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const nextTestimonial = () =>
    setCurrentTestimonial(
      currentTestimonial === testimonialsData.length - 1 ? 0 : currentTestimonial + 1
    );
  const prevTestimonial = () =>
    setCurrentTestimonial(
      currentTestimonial === 0 ? testimonialsData.length - 1 : currentTestimonial - 1
    );

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full mb-4 shadow-sm mx-auto">
            <Quote className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 font-semibold text-sm">TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 mb-4">
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-[450px] overflow-hidden">
              <img
                src={testimonialsData[currentTestimonial].image}
                alt={testimonialsData[currentTestimonial].name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonialsData[currentTestimonial].color} flex items-center justify-center text-white font-bold text-xl mb-2`}
                >
                  {testimonialsData[currentTestimonial].avatar}
                </div>
                <h3 className="text-xl font-bold">{testimonialsData[currentTestimonial].name}</h3>
                <p className="text-blue-200 text-sm">
                  {testimonialsData[currentTestimonial].role} • {testimonialsData[currentTestimonial].location}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center w-full lg:w-1/2">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonialsData[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="h-8 w-8 text-blue-200 mb-4" />
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    "{testimonialsData[currentTestimonial].content}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-blue-600 w-6 h-2 sm:w-8 sm:h-2"
                        : "bg-gray-300 w-2 h-2 sm:w-3 sm:h-3 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors z-10"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors z-10"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </button>
        </div>

        {/* Additional Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
        >
          {testimonialsData.slice(0, 3).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold flex-shrink-0`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                "{testimonial.content.substring(0, 120)}..."
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
