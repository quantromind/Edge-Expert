import React from "react";
import {
  HelpCircle,
  MessageCircle,
  Mail,
  BookOpen,
  CheckCircle,
} from "lucide-react";

// --- Reusable Component for Support Links ---
const SupportCard = ({ title, description, icon: Icon, href, colorClass }) => (
  <a
    href={href}
    className={`
      flex items-start p-6 border-2 rounded-xl transition duration-300 ease-in-out 
      shadow-lg hover:shadow-xl transform hover:-translate-y-1 
      ${
        colorClass === "blue"
          ? "border-blue-100 hover:border-blue-500"
          : "border-gray-200 hover:border-gray-500"
      }
    `}
  >
    <Icon
      className={`w-8 h-8 mr-4 ${
        colorClass === "blue" ? "text-blue-600" : "text-gray-600"
      }`}
    />
    <div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </a>
);

export default function Support() {
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          How can we help you today?
        </h1>
        <p className="text-xl text-gray-600">
          Find answers quickly or connect with our dedicated support team.
        </p>
      </header>

      {/* Support Options Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* L1: Self-Service (Primary Action) */}
        <SupportCard
          title="Browse Knowledge Base"
          description="Search our comprehensive articles and FAQs for immediate solutions."
          icon={BookOpen}
          href="/support/faq"
          colorClass="blue"
        />

        {/* R1: Direct Contact */}
        <SupportCard
          title="Live Chat Support"
          description="Speak directly with a support agent for real-time assistance (Mon-Fri, 9am-5pm)."
          icon={MessageCircle}
          href="/support/chat"
          colorClass="gray"
        />

        {/* L2: Direct Contact */}
        <SupportCard
          title="Email Us"
          description="Send a detailed request. We aim to respond to all inquiries within 24 hours."
          icon={Mail}
          href="mailto:support@yourcompany.com"
          colorClass="gray"
        />

        {/* R2: Additional Resource */}
        <SupportCard
          title="System Status"
          description="Check the current operational status of all our services and API endpoints."
          icon={CheckCircle}
          href="/status"
          colorClass="gray"
        />
      </div>

      {/* Footer/Disclaimer */}
      <footer className="max-w-4xl mx-auto text-center mt-16 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          For urgent security issues, please refer to our dedicated security
          contact page.
        </p>
      </footer>
    </div>
  );
}
