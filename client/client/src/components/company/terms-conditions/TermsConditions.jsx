import React from "react";
import { motion } from "framer-motion";
import ContactSection from "../privacy-policy/ContactUs"; // Adjust path if needed

const TermsAndConditions = () => {
  const tealColor = "#2e6b72";

  // --- Reusable Heading Component ---
  const PolicyHeading = ({ firstWord, restOfTitle }) => (
    <h2
      className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 tracking-wide"
      style={{
        color: tealColor,
        fontFamily: "Times New Roman, Times, serif",
        letterSpacing: "0.5px",
      }}
    >
      <span
        style={{
          borderBottom: `2px solid ${tealColor}`,
          paddingBottom: "3px",
          display: "inline-block",
          marginRight: "4px",
        }}
      >
        {firstWord}
      </span>
      {restOfTitle}
    </h2>
  );

  // --- Reusable Section Wrapper ---
  const PolicySection = ({ firstWord, restOfTitle, children }) => (
    <div className="mb-10 sm:mb-12">
      <PolicyHeading firstWord={firstWord} restOfTitle={restOfTitle} />
      <div
        style={{
          fontFamily: "Times New Roman, Times, serif",
          color: "#1a1a1a",
          fontSize: "16px",
          lineHeight: "1.8",
          textAlign: "justify",
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Times New Roman, Times, serif" }}>
      {/* --- Hero Section --- */}
      <section
        className="py-24 sm:py-60 md:py-80 flex items-center justify-center relative px-4"
        style={{
          backgroundColor: tealColor,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-7xl font-light text-white z-10 text-center leading-tight"
          style={{ fontFamily: "Times New Roman, Times, serif" }}
        >
          Terms & Conditions
        </motion.h1>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </section>

      {/* --- Main Content --- */}
      <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 max-w-5xl">
        <h2
          className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Edge Expert Terms & Conditions
        </h2>

        <p
          style={{
            fontFamily: "Times New Roman, Times, serif",
            color: "#1a1a1a",
            fontSize: "16px",
            lineHeight: "1.8",
            textAlign: "justify",
            marginBottom: "1.5rem",
          }}
        >
          Welcome to <strong>Edge Expert</strong>. These Terms and Conditions
          govern your use of our website and services. By accessing or using our
          site, you agree to comply with and be bound by these terms.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-gray-600"
        >
          {/* Sections */}
          <PolicySection firstWord="Website" restOfTitle=" Ownership & Agreement">
            <p>
              The Edge Expert website is owned and operated by Edge Expert Pvt.
              Ltd. These Terms and Conditions constitute a legally binding
              agreement between you and Edge Expert. Accessing, browsing, or
              otherwise using the website constitutes your express acceptance of
              all the terms and conditions laid out herein. If you disagree with
              any part of these terms, you must immediately cease use of the
              website and services.
            </p>
          </PolicySection>

          <PolicySection firstWord="Copyright" restOfTitle=" & Intellectual Property">
            <p>
              All materials and content available on this site, including, but
              not limited to, text, graphics, logos, images, design layouts,
              software, and video material, are the exclusive property of
              Edge Expert Pvt. Ltd. or its content suppliers and are protected by
              applicable copyright and intellectual property laws.
            </p>
          </PolicySection>

          <PolicySection firstWord="Business" restOfTitle=" Relationships">
            <p>
              Reference to third-party companies, services, or products on our
              website (e.g., through partnerships or embedded links) does not
              constitute or imply an endorsement by Edge Expert unless explicitly
              stated otherwise.
            </p>
          </PolicySection>

          {/* (Rest of sections remain unchanged) */}
        </motion.div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default TermsAndConditions;
