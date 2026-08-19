import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Briefcase, FileText, BookOpen, Globe, ArrowRight } from "lucide-react";

// --- Utility Function ---
const getInitials = (name) => {
  if (!name) return '';
  // Split the name, filter out empty strings, and take the first letter of the first two parts.
  const parts = name.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return '';
  
  const firstInitial = parts[0][0];
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
  
  return (firstInitial + lastInitial).toUpperCase();
};

// --- Data Definitions ---

const boardMembers = [
  {
    name: "Rohit Mehta",
    role: "Chairman & Managing Director",
    bio: "Rohit brings over 25 years of experience in real estate, governance, and corporate leadership, ensuring transparency and sustainable growth.",
    image: "https://i.pinimg.com/1200x/d5/26/b0/d526b09b72d750051b32a74675b2358c.jpg", // Image is no longer used for display
  },
  {
    name: "Neha Patel",
    role: "Independent Director",
    bio: "Neha has a strong background in corporate law and risk management, providing strategic oversight for ethical business practices.",
    image: "https://i.pinimg.com/1200x/b9/d2/43/b9d243c0426ef088a5e57c22a11a10ba.jpg", // Image is no longer used for display
  },
  {
    name: "Vikram Rao",
    role: "Chief Financial Officer",
    bio: "Vikram specializes in finance, audit compliance, and corporate strategy, ensuring fiscal integrity and operational efficiency.",
    image: "https://i.pinimg.com/1200x/69/91/a0/6991a06d2c0dfea1f6efa46286d65a81.jpg", // Image is no longer used for display
  },
];

const governancePolicies = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
    title: "Code of Conduct",
    desc: "Upholding integrity, fairness, and transparency to maintain stakeholder trust.",
  },
  {
    icon: <Users className="w-8 h-8 text-teal-500" />,
    title: "Board Diversity",
    desc: "Fostering inclusive decision-making through diverse experience and background.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-amber-500" />,
    title: "Risk Management",
    desc: "Proactively identifying, evaluating, and mitigating strategic and operational risks.",
  },
  {
    icon: <FileText className="w-8 h-8 text-purple-500" />,
    title: "Whistleblower Policy",
    desc: "Ensuring secure and confidential reporting of unethical practices.",
  },
  {
    icon: <Globe className="w-8 h-8 text-green-500" />,
    title: "ESG Commitment",
    desc: "Focusing on environmental, social, and governance goals for long-term sustainability.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-pink-500" />,
    title: "Statutory Compliance",
    desc: "Rigorous adherence to all regulatory and legal frameworks.",
  },
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// --- Main Component ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Hero Section - Elevated and Modern */}
      <section 
        className="relative bg-cover bg-center overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32" 
        style={{ backgroundImage: 'url(https://i.pinimg.com/1200x/b4/6e/d3/b46ed3f3ff6258944069a5d75f7905bb.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay for readability */}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
        >
          {/* Using font-semibold */}
          <h1 className="text-4xl sm:text-6xl font-light text-white mb-4 leading-tight">
            Upholding Integrity in <span className="text-teal-400">Corporate Governance</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-4xl mx-auto text-gray-300 font-normal">
            Our foundation is built on ethical leadership, full accountability, and radical transparency, ensuring trust and sustainable value creation for all stakeholders.
          </p>
        </motion.div>
      </section>

      {/* Governance Principles - Staggered Grid */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Using font-semibold */}
          <h2 className="text-3xl font-semibold text-center mb-16 text-indigo-700">Core Pillars of Accountability</h2>
          
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {governancePolicies.map((policy, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-xl p-6 transition duration-300 ease-in-out border border-gray-100 hover:shadow-2xl hover:border-teal-400"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    {policy.icon}
                  </div>
                  {/* Using font-semibold */}
                  <h3 className="text-xl font-semibold text-indigo-700">{policy.title}</h3>
                </div>
                <p className="text-gray-600 text-base font-normal">{policy.desc}</p>
                <button className="mt-4 text-sm font-semibold text-teal-600 flex items-center group">
                    View Policy
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Board of Directors - Clean Card Design with Initials */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Using font-semibold */}
          <h2 className="text-3xl font-semibold text-center mb-16 text-gray-900">Meet Our Leadership Board</h2>
          
          <motion.div
            className="grid md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                className="flex flex-col items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-lg text-center transition duration-300"
              >
                {/* Initial Placeholder */}
                <div className="relative w-24 h-24 mb-6 flex items-center justify-center bg-indigo-500 rounded-full shadow-lg border-4 border-teal-400">
                    {/* Using font-semibold */}
                    <span className="text-3xl font-semibold text-white">
                        {getInitials(member.name)}
                    </span>
                    <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full ring-4 ring-white"></span>
                </div>

                {/* Using font-semibold */}
                <h3 className="text-2xl font-semibold text-indigo-700 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-teal-600 uppercase mb-4 tracking-wider">{member.role}</p>
                <p className="text-gray-600 text-base italic font-normal">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Section - Contrast Band */}
      <section className="py-16 px-6 lg:px-8 bg-indigo-700 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <ShieldCheck className="w-10 h-10 text-teal-400" />
          </div>
          {/* Using font-semibold */}
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">A Culture of Trust and Ethics</h2>
          <p className="text-lg text-indigo-200 font-normal">
            Our unwavering commitment to the highest standards of corporate governance is the blueprint for our operations, ensuring fairness, transparency, and accountability are integral to every decision.
          </p>
          {/* Removed the Download Annual Report button */}
        </motion.div>
      </section>
    </div>
  );
}
