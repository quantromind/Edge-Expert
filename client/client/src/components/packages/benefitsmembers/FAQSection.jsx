import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default first item open

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle."
    },
    {
      question: "Is there a commitment period?",
      answer: "No, all plans are month-to-month. You can cancel anytime without any long-term commitment."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day money-back guarantee for Premium and Elite plans if you're not satisfied with the service."
    },
    {
      question: "How quickly do I get access after signing up?",
      answer: "Instant access! You'll get full membership benefits immediately after completing your registration."
    },
    {
      question: "Can I cancel my membership anytime?",
      answer: "Yes, you can cancel your membership at any time. There are no cancellation fees or penalties."
    },
    {
      question: "Do you offer corporate or group discounts?",
      answer: "Yes, we offer special pricing for corporate accounts and group memberships. Contact our sales team for custom pricing."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use bank-level encryption and follow strict data protection protocols to keep your information safe."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our membership plans and services
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="font-bold text-lg text-gray-900 flex-1">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {openIndex === idx ? (
                    <Minus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;