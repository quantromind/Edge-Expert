import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Spacewala didn't just design our home; they optimized every inch. The storage solutions are genius! We gained 30% more usable space.",
    name: "Anjali M.",
    role: "Corporate Client",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "Seamless process and a beautiful result. We saw the 3D model, and the final look was even better! Highly recommend their services.",
    name: "Rohan S.",
    role: "Architect Partner",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
  },
  {
    quote:
      "The Spacewala team understood our vision perfectly. They delivered a design that’s both luxurious and practical!",
    name: "Priya K.",
    role: "Homeowner",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "Working with Spacewala was an absolute pleasure. Their creative approach and timely delivery exceeded our expectations.",
    name: "Vikram D.",
    role: "Restaurant Owner",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "They transformed my workspace into a modern, productive environment. Every corner feels inspiring now!",
    name: "Nisha T.",
    role: "Freelancer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "From concept to completion, Spacewala exceeded expectations. Their professionalism and creativity are unmatched!",
    name: "Amit R.",
    role: "Business Owner",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "Our home renovation journey was smooth and stress-free thanks to Spacewala’s clear communication and stunning designs!",
    name: "Kavita P.",
    role: "Homeowner",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "Their innovative design ideas completely transformed our office into a modern and efficient workspace. Love it!",
    name: "Rahul T.",
    role: "Entrepreneur",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&q=80",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied clients.
          </p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[90%] md:min-w-[45%] snap-start bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* User Info */}
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-yellow-400 text-sm">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-lg leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
