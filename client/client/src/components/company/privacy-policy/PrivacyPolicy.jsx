import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../privacy-policy/ContactUs";

const PrivacyPolicy = () => {
  const tealColor = "#2e6b72"; // Brand color
  const navigate = useNavigate();

  // --- Reusable Heading Component (Uniform Style) ---
  const PolicyHeading = ({ firstWord, restOfTitle }) => (
    <h2
      className="text-2xl font-semibold mb-6 tracking-wide"
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
    <div className="mb-12">
      <PolicyHeading firstWord={firstWord} restOfTitle={restOfTitle} />
      <div
        style={{
          fontFamily: "Times New Roman, Times, serif",
          color: "#1a1a1a",
          fontSize: "17px",
          lineHeight: "1.8",
          textAlign: "justify",
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Times New Roman, Times, serif" }}
    >
      {/* --- Hero Section with Animated Background --- */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/2e/6a/5a/2e6a5a001180bfbd9e9aa7495ddddc88.jpg')",
            filter: "brightness(0.50)",
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blue-900/30 to-black/70"></div>
{/* 
        🔙 Back Button
        <div className="absolute top-24 left-10 z-20">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div> */}

        {/* Hero Text */}
        <motion.div
          className="relative z-10 max-w-3xl text-center space-y-6 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight text-white">
           
            <span className="text-white block sm:inline-block mt-2 sm:mt-0 ml-0 sm:ml-4">
              Privacy Policy
            </span>
          </h1>

        </motion.div>
      </section>

      {/* --- Main Content --- */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-5xl">
        <h2
          className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Edge Expert Privacy Policy
        </h2>

        <p
          style={{
            fontFamily: "Times New Roman, Times, serif",
            color: "#1a1a1a",
            fontSize: "16px",
            lineHeight: "1.8",
            textAlign: "justify",
            marginBottom: "2rem",
          }}
        >
          At <strong>Edge Expert</strong>, protecting your privacy is our highest
          priority. We collect only the information necessary to provide you
          with quality service, maintain security, and improve your overall
          experience. This policy details the nature of the information we
          collect, how we use and safeguard it, and your rights in relation to
          that information.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-gray-600"
        >
          {/* --- Sections --- */}
          <PolicySection firstWord="Definitions" restOfTitle=" of Terms">
            <p>
              <strong>Personally Identifiable Information (PII)</strong> refers
              to any data that can identify an individual, such as name, address,
              email, phone number, or IP address. This also includes information
              combined with other data that could reasonably identify you.
            </p>
            <p className="mt-4">
              <strong>Non-Personal Data</strong> includes aggregated or
              anonymized information that cannot directly identify you, such as
              browser type, operating system, referral URLs, and general
              geographic location.
            </p>
          </PolicySection>

          <PolicySection firstWord="Information" restOfTitle=" We Collect">
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Information you provide voluntarily:</strong> Data shared
                through registration forms, contact requests, surveys, or
                feedback, including your name, email, and phone number.
              </li>
              <li>
                <strong>Automatically collected information:</strong> Technical
                details such as your IP address, device identifiers, browser
                type, access times, and visited pages.
              </li>
              <li>
                <strong>Cookies and tracking technologies:</strong> We use
                cookies and analytics tools like Google Analytics to monitor
                usage trends and improve performance.
              </li>
            </ul>
          </PolicySection>

          <PolicySection firstWord="Normal" restOfTitle=" Information Usage About You">
            <p>
              We use your data primarily to ensure the smooth operation of our
              website and services. This includes:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Processing your inquiries and service requests.</li>
              <li>
                Improving the design, content, and functionality of our site.
              </li>
              <li>
                Sending notifications, service updates, or promotional content
                (only with your consent).
              </li>
              <li>Complying with legal obligations and internal policies.</li>
            </ul>
          </PolicySection>

          <PolicySection firstWord="Our" restOfTitle=" Information Sharing Policy">
            <p>
              We value your trust and do not sell or trade your data. However,
              information may be shared under limited, secure circumstances:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>
                With service providers for hosting, analytics, or maintenance.
              </li>
              <li>To comply with legal or regulatory requests.</li>
              <li>
                During business transfers such as mergers or acquisitions, with
                equivalent protection guarantees.
              </li>
            </ul>
          </PolicySection>

          <PolicySection firstWord="Your" restOfTitle=" Privacy Rights">
            <p>
              Visitors to our site may have certain rights pertaining to their
              Personally Identifiable Information that are provided under
              applicable law. These rights are:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-3">
              <li>
                The right to request access to your Personally Identifiable
                Information and related processing activities.
              </li>
              <li>
                The right to request rectification of any inaccurate or
                incomplete Personally Identifiable Information.
              </li>
              <li>
                The right to request erasure of your Personally Identifiable
                Information under certain circumstances.
              </li>
              <li>
                The right to request restriction of processing your Personally
                Identifiable Information under certain circumstances.
              </li>
              <li>
                The right to object to your Personally Identifiable Information
                being processed under certain circumstances.
              </li>
              <li>
                The right to data portability — to receive your provided
                Personally Identifiable Information from us (as a controller) in
                a machine-readable, commonly used format under certain
                circumstances.
              </li>
              <li>The right to report a complaint to a supervisory authority.</li>
              <li>The right to withdraw consent at any time by contacting us.</li>
            </ul>
          </PolicySection>

          <PolicySection firstWord="Opt Out and" restOfTitle=" Withdrawal Rights">
            <p>
              You can opt out of promotional emails anytime by clicking the
              "unsubscribe" link or emailing us directly. We respect your choices
              and will process such requests promptly.
            </p>
          </PolicySection>

          <PolicySection firstWord="Authenticity" restOfTitle=" Responsibility">
            <p>
              You are responsible for ensuring that any personal details shared
              are accurate and current. Edge Expert is not liable for damages
              resulting from incorrect or misleading information provided by
              users.
            </p>
          </PolicySection>

          <PolicySection firstWord="Cookies, AI Ethics" restOfTitle=" and Other Technologies">
            <p>
              We use cookies to personalize your experience and analyze traffic.
              You may disable cookies in your browser settings, but some
              features may not function properly.
            </p>
            <p className="mt-4">
              Any Artificial Intelligence tools used by Edge Expert adhere to
              ethical principles — transparency, fairness, and respect for user
              privacy — ensuring that AI decisions do not discriminate or misuse
              your data.
            </p>
          </PolicySection>

          <PolicySection firstWord="Data Storage" restOfTitle=" and Retention Policy">
            <p>
              Your personal data is securely stored using encryption, firewalls,
              and restricted access controls. Data is retained only for as long
              as required to fulfill the purpose for which it was collected or
              as mandated by law.
            </p>
          </PolicySection>

          <PolicySection firstWord="Protection" restOfTitle=" of Minor's Information">
            <p>
              Our services are not intended for children under 18 years of age.
              We do not knowingly collect or store data from minors. If such data
              is found, it will be permanently deleted.
            </p>
          </PolicySection>

          <PolicySection firstWord="Links to Outside /" restOfTitle=" Third Party Websites">
            <p>
              Edge Expert's website may link to external sites for reference or
              convenience. These sites operate independently and are not covered
              by our privacy policy. We recommend reviewing their policies before
              sharing personal information.
            </p>
          </PolicySection>

          <PolicySection firstWord="Our Continued" restOfTitle=" Commitment to Your Security">
            <p>
              We conduct regular audits, implement SSL encryption, and monitor
              systems to protect data against unauthorized access or breaches. In
              case of a security incident, users will be notified promptly in
              accordance with data protection laws.
            </p>
          </PolicySection>

          <PolicySection firstWord="Addressing" restOfTitle=" of Grievances">
            <ul className="list-disc ml-6 space-y-2">
              <li>Email: hello@edgeexpert.in</li>
              <li>
                Office: Miraroad, Mumbai, Maharashtra, India 401107
              </li>
            </ul>
          </PolicySection>

          <PolicySection firstWord="Policy" restOfTitle=" Changes">
            <p>
              We may update this policy periodically to comply with evolving
              legal standards or operational requirements. Any updates will be
              published on our website with a "Last Updated" date.
            </p>
          </PolicySection>
        </motion.div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default PrivacyPolicy;
