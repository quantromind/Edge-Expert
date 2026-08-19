import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Can I post my property as an owner for free?",
      answer:
        "Yes, you can list your property for free. Basic listings are always complimentary, but they may have fewer features compared to our paid packages.",
    },
    {
      question: "Will I receive enquiries even with free listing?",
      answer:
        "Absolutely. Free listings are fully functional and will receive enquiries from interested users. Paid listings, however, typically receive more visibility and prioritized leads.",
    },
    {
      question: "Why should I buy a paid owner package?",
      answer:
        "Paid packages offer enhanced visibility (e.g., featured listings), more direct leads, access to advanced analytics, and tools to help you sell or rent your property faster.",
    },
    {
      question: "How to upgrade my free listing to a paid listing?",
      answer:
        "You can easily upgrade your listing from your owner dashboard. Look for the 'Upgrade' or 'Premium' option next to your property details and follow the steps.",
    },
    {
      question: "Can I link multiple properties with a single paid package?",
      answer:
        "This depends on the specific package you choose. Our premium and enterprise packages generally allow linking multiple properties, but the basic paid packages are usually limited to one property.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 font-sans bg-white tracking-wide">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8 md:mb-12 text-center">
          <p className="text-sm font-normal uppercase text-purple-600 mb-2 tracking-wide">
            FAQs
          </p>
          <h4 className="text-3xl md:text-4xl font-normal text-gray-900 leading-relaxed tracking-wide">
            Kindly find answers to some common doubts
          </h4>
        </div>

        {/* FAQ List */}
        <div className="border-t border-gray-200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-4 md:py-5 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-normal text-gray-900 leading-relaxed tracking-wide">
                  {faq.question}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  className="text-2xl text-gray-500 transition-transform duration-300 ml-4"
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-600 text-sm md:text-base font-light leading-relaxed tracking-wide pr-8"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
