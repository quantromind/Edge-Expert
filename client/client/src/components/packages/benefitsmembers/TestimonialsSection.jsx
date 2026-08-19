import React from "react";
import { Star, MapPin } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Anjali Mehta",
      city: "Pune",
      role: "Premium Member",
      quote: "Found my dream apartment within a week of joining! The early access feature helped me secure a great deal before it went public.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Rohit Sharma",
      city: "Mumbai",
      role: "Elite Member",
      quote: "As a real estate agent, I got 3x more qualified leads and closed deals 40% faster with the Elite membership features.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Priya Patel",
      city: "Bangalore",
      role: "Starter Member",
      quote: "The free plan helped me understand the market before upgrading. Now I'm confidently looking for investment properties.",
      avatar: "👩‍🎓",
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Success Stories from Our Members
          </h2>
          <p className="text-xl text-gray-600">
            Discover how our members transformed their real estate journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{t.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.role}</p>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{t.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;