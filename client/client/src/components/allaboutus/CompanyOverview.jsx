import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Diamond,
  Handshake,
  Briefcase,
  TrendingUp,
  ArrowRight,
} from "lucide-react";


const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-4 h-4 transition-colors ${
          i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
        }`}
        fill={i < rating ? "currentColor" : "none"}
      />
    );
  }
  return <div className="flex justify-center space-x-0.5 mb-3">{stars}</div>;
};

const FeatureIconMap = [
  <Diamond className="w-10 h-10 text-teal-500" />,
  <Handshake className="w-10 h-10 text-blue-500" />,
  <Briefcase className="w-10 h-10 text-indigo-500" />,
  <TrendingUp className="w-10 h-10 text-green-500" />,
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 12 },
  },
};

const ModernGeometricOverview = () => {
  const features = [
    {
      title: "Market Integrity",
      desc: "Over 25,000 satisfied clients rely on us for secure, ethical property transactions.",
    },
    {
      title: "Dedicated Experts",
      desc: "Our experienced agents guide you through buying, selling, or renting properties with personalized care.",
    },
    {
      title: "Global Portfolio",
      desc: "Explore prime residential, commercial, and rental properties across major global markets.",
    },
    {
      title: "Outcome-Driven Success",
      desc: "We prioritize a smooth, transparent experience, resulting in high client retention rates.",
    },
  ];

  const testimonials = [
    {
      name: "Anya Sharma",
      feedback:
        "The agent was incredibly knowledgeable and helped us find our dream home faster than expected. Truly professional service and great communication.",
      rating: 5,
    },
    {
      name: "Ravi Kumar, CEO",
      feedback:
        "Edge Expert handled the sale of our commercial property portfolio flawlessly. Their secure, transparent transaction process is truly unmatched.",
      rating: 5,
    },
    {
      name: "Priya Singh",
      feedback:
        "Excellent support throughout the entire rental process. Highly recommend them for their wide property selection and commitment to customer satisfaction.",
      rating: 4,
    },
  ];

  const partners = [
    {
      name: "Quantromind Private Limited",
      url: "https://quantromind.com/",
      logoUrl: "https://quantromind.com/logo.png",
      illustrationUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      description:
        "Quantromind Private Limited provides advanced technology, AI-driven digital ecosystems, and enterprise software solutions.",
    },
  ];

  const milestones = [
    { value: "25k+", label: "Happy Clients", color: "text-teal-400" },
    { value: "500+", label: "Properties Sold", color: "text-blue-400" },
    { value: "10+", label: "Years Experience", color: "text-indigo-400" },
    { value: "15+", label: "Industry Awards", color: "text-green-400" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gray-900 text-white">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/29/0a/da/290ada4189c45639090d22966b25379f.jpg')`,
          }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-light leading-tight tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-300">
              Company Overview
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light"
          >
            We deliver data-driven insights and a seamless, secure platform for
            buying, selling, and leasing prime properties globally.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.5)",
            }}
            className="mt-10 px-8 py-3 bg-teal-500 text-white font-light rounded-lg shadow-xl hover:bg-teal-600 transition-all text-lg"
          >
            Explore Our Solutions
          </motion.button>
        </div>
      </section>

      {/* Milestones (Smaller Cards) */}
      <section className="bg-white shadow-2xl relative -mt-16 mx-6 md:mx-20 rounded-2xl p-6 md:p-10 border-b-8 border-teal-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center justify-center p-2"
            >
              <h3 className={`text-3xl md:text-4xl font-light ${m.color}`}>
                {m.value}
              </h3>
              <p className="text-gray-600 mt-1 text-sm font-light uppercase tracking-wide">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="pt-20 pb-16 px-6 md:px-12 text-center max-w-5xl mx-auto">
        <motion.h2
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-light text-gray-800 mb-4"
        >
          Company Philosophy
        </motion.h2>
        <div className="h-1 w-24 bg-teal-500 mx-auto rounded-full mb-10"></div>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
          Edge Expert was founded with the mission to revolutionize real estate
          by making property transactions seamless, secure, and transparent.
        </p>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-12 bg-gray-100">
        <h2 className="text-4xl font-light text-center text-gray-800 mb-6">
          Our Core Pillars
        </h2>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-16 font-light">
          The foundation of our service is built on integrity, expertise, and
          client-centric solutions.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start text-left border-t-4 border-teal-500 hover:border-blue-500 group"
            >
              <div className="mb-4 p-3 bg-gray-100 rounded-full group-hover:bg-teal-100 transition-colors">
                {FeatureIconMap[i]}
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-600 text-base font-light">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-4xl font-light text-center text-gray-800 mb-6">
          Client Success Stories
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center h-full hover:shadow-2xl transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-amber-500 mb-6" />
              <p className="italic text-gray-700 text-base mb-6 flex-grow font-light leading-relaxed">
                "{t.feedback}"
              </p>
              <StarRating rating={t.rating} />
              <p className="font-light text-lg text-gray-900 mt-auto">
                - {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners (Centered) */}
      <section className="py-20 px-6 md:px-12 bg-gray-100">
        <h2 className="text-4xl font-light text-center text-gray-800 mb-6">
          Industry Partnerships
        </h2>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12 font-light">
          We collaborate with leading technology and financial firms to enhance
          your real estate experience.
        </p>

        <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden w-full sm:w-[22rem] flex flex-col hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              <div className="h-44 overflow-hidden bg-gray-200">
                <img
                  src={p.illustrationUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-light text-gray-900 mb-2">
                  {p.name}
                </h3>
                <p className="text-gray-600 text-base mb-4 flex-grow font-light leading-relaxed">
                  {p.description}
                </p>
                <motion.a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 text-teal-600 font-light border-2 border-teal-500 rounded-lg flex items-center justify-center transition-colors hover:bg-teal-500 hover:text-white"
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-6 md:px-12 bg-teal-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-light mb-4"
        >
          Ready for a Smarter Real Estate Journey?
        </motion.h2>
        <p className="text-xl text-teal-100 mb-8 font-light">
          Partner with Edge Expert and redefine your property experience.
        </p>
      </section>
    </div>
  );
};

export default ModernGeometricOverview;
