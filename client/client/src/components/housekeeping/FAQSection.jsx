import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How can I modify or cancel my booking?",
    answer:
      "You can modify or cancel your booking up to 24 hours before your scheduled time through your account or by contacting our support team.",
  },
  {
    question: "Do I need to be home during the booking?",
    answer:
      "Not necessarily. You can provide instructions for our staff to access your property safely if you won't be present.",
  },
  {
    question: "Are the service providers verified?",
    answer:
      "Yes, all our cleaning professionals go through background checks and training before joining our platform.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We accept online payments, UPI, and major credit/debit cards. You can also pay in cash for certain services.",
  },
  {
    question: "Can I book multiple services together?",
    answer:
      "Yes, you can select multiple services during checkout. We’ll schedule them based on availability and convenience.",
  },
];

const BookingFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start max-w-7xl mx-auto py-16 px-6 gap-10">
      {/* Left Side - FAQs */}
      <div className="flex-1">
        <h2 className="text-4xl font-semibold mb-6">
          Here to <span className="italic text-green-700">help</span>
        </h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 py-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-800">
                {faq.question}
              </p>
              {activeIndex === index ? (
                <Minus className="text-green-700" />
              ) : (
                <Plus className="text-gray-700" />
              )}
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 mt-3 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}

        <button className="mt-8 px-6 py-2 border-2 border-green-700 rounded-full text-green-700 hover:bg-green-700 hover:text-white transition-all">
          ALL FAQs
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1">
        <img
          src="https://i.pinimg.com/1200x/03/28/a4/0328a4e804f50e2bdce6b1017436590b.jpg"
          alt="Booking Help"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </div>
    </div>
  );
};

export default BookingFAQ;
