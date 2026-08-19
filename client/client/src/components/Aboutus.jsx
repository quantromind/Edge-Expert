import React from "react";
import { motion } from "framer-motion";
import ComponentWrapper from "../components/ComponentWrapper";
import {
  MapPin,
  Award,
  Users,
  Shield,
  TrendingUp,
  Building2,
  Target,
} from "lucide-react";

const heroBg =
  "https://i.pinimg.com/1200x/7e/c2/89/7ec2892ef5f1e0d7c147d08404c8eccb.jpg";
const teamHero =
  "https://i.pinimg.com/736x/bb/03/f3/bb03f35f3b41bd23cc0e9bd64297cb6f.jpg";

const propertyImages = [
  "https://i.pinimg.com/1200x/2d/41/15/2d411599949e508cdce0c4b5ffda56b7.jpg",
  "https://i.pinimg.com/736x/a6/5d/80/a65d8043b0c11b750bfa884232523c49.jpg",
  "https://i.pinimg.com/736x/3b/1e/d8/3b1ed86047f94e3439ac6769c4ffed77.jpg",
  "https://i.pinimg.com/736x/fd/dd/89/fddd893a8eafa2c1cc9e9bce98141296.jpg",
];

const AboutUs = () => {
  const properties = [
    {
      img: propertyImages[0],
      title: "Modern Luxury Villa",
      location: "Mumbai, India",
      type: "Residential",
    },
    {
      img: propertyImages[1],
      title: "Corporate Tower",
      location: "New Delhi, India",
      type: "Commercial",
    },
    {
      img: propertyImages[2],
      title: "Skyline Apartment",
      location: "Bangalore, India",
      type: "Residential",
    },
    {
      img: propertyImages[3],
      title: "Executive Estate",
      location: "Pune, India",
      type: "Residential",
    },
  ];

  const valueData = [
    {
      icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      title: "Direct With Builders",
      desc: "Connect directly with reputed developers for transparent pricing and prime inventory.",
      color: "bg-indigo-600",
    },
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      title: "Home Buying Simplified",
      desc: "Streamlined search, verified documentation, and seamless end-to-end assistance.",
      color: "bg-teal-600",
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      title: "Your Trusted Partner",
      desc: "Upholding complete transparency, data integrity, and advisory excellence.",
      color: "bg-yellow-500",
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      title: "Helping You For Your Dream Home",
      desc: "Dedicated personal support from site visits to registry and keys handover.",
      color: "bg-blue-600",
    },
  ];

  return (
    <ComponentWrapper route="/aboutus">
      <main className="min-h-screen bg-gray-50 text-gray-900 font-sans tracking-wide leading-relaxed overflow-x-hidden">

        {/* --- HERO --- */}
        <section
          className="relative text-white py-16 sm:py-24 md:py-32 lg:py-48 bg-cover bg-center bg-no-repeat min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-blue-900/70" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ y: [0, -10, 0], opacity: 1 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="max-w-3xl sm:max-w-4xl mx-auto w-full"
            >
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-300 font-medium text-xs sm:text-sm uppercase tracking-widest shadow-md"
              >
                The Edge Expert Story
              </motion.span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 md:mb-6 leading-tight sm:leading-snug tracking-wide drop-shadow-lg break-words">
                Building Trust in Real Estate
                <span className="text-yellow-400 block mt-1 sm:mt-2 font-normal">
                  Through Innovation
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl sm:max-w-3xl mx-auto font-light leading-relaxed tracking-wide px-2 sm:px-0 break-words">
                India's most trusted platform combining cutting-edge technology
                with deep market expertise to deliver unparalleled property
                solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- TEAM STORY --- */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="relative p-2 sm:p-3 md:p-4 bg-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl">
                <img
                  src={teamHero}
                  alt="Edge Expert Team"
                  className="rounded-xl sm:rounded-2xl w-full h-auto object-cover max-h-[400px]"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <span className="text-yellow-600 font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 block">
                Our Journey
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:mb-5 md:mb-6 text-gray-900 tracking-wide">
                Trusted Partnership Since 2018
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 text-gray-700 text-sm sm:text-base font-light tracking-wide leading-relaxed break-words">
                <p>
                  Founded in 2018, <strong>Edge Expert</strong> emerged from a
                  vision to revolutionize India's real estate landscape by
                  prioritizing transparency and technology.
                </p>
                <p>
                  Today, we leverage{" "}
                  <strong>
                    AI-powered analytics, blockchain verification, and
                    predictive market intelligence
                  </strong>{" "}
                  to provide clients with data-driven insights.
                </p>
                <p>
                  Our commitment is proven:{" "}
                  <strong>
                    500+ successful transactions, 300+ satisfied clients, and a
                    98% client satisfaction rate.
                  </strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- MISSION, VISION & VALUES --- */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-indigo-50">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 sm:mb-4 text-indigo-900 tracking-wide">
                Our Foundation: Principles & Values
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-indigo-700 max-w-3xl mx-auto font-light tracking-wide px-2 sm:px-0">
                The core beliefs and objectives that guide every transaction and
                decision.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border-t-4 border-indigo-600"
              >
                <div className="flex items-center mb-3 sm:mb-4 md:mb-5">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-indigo-600 mr-2 sm:mr-3 md:mr-4" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-indigo-900 tracking-wide">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light tracking-wide">
                  To empower every individual with{" "}
                  <strong>tools, insights, and support</strong> needed to make
                  confident, informed property decisions.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border-t-4 border-yellow-500"
              >
                <div className="flex items-center mb-3 sm:mb-4 md:mb-5">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600 mr-2 sm:mr-3 md:mr-4" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-indigo-900 tracking-wide">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light tracking-wide">
                  To become India's{" "}
                  <strong>most trusted and innovative</strong> real estate
                  platform, setting new standards for transparency and client
                  satisfaction.
                </p>
              </motion.div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {valueData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-3 sm:p-6 md:p-8 text-center group hover:scale-[1.02] sm:hover:scale-[1.03] transition-transform duration-300"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-normal mb-1 sm:mb-2 text-indigo-900 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-light tracking-wide break-words">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ACHIEVEMENTS --- */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-8 sm:mb-10 md:mb-12 text-yellow-400 tracking-wide"
            >
              Our Achievements
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: (
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400" />
                  ),
                  value: "Best Startup",
                  sub: "Real Estate India 2022",
                },
                {
                  icon: (
                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400" />
                  ),
                  value: "500+",
                  sub: "Properties Sold",
                },
                {
                  icon: (
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400" />
                  ),
                  value: "98%",
                  sub: "Client Satisfaction Rate",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="bg-gray-800/50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <div className="flex justify-center items-center mb-2 sm:mb-3 md:mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-1 tracking-wider break-words">
                    {item.value}
                  </h3>
                  <p className="text-yellow-300 text-xs sm:text-sm font-light tracking-wide break-words">
                    {item.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURED PROPERTIES --- */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <span className="text-indigo-600 font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 block">
                Our Portfolio
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 md:mb-4 text-gray-900 tracking-wide">
                Featured Premium Properties
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto font-light tracking-wide px-2 sm:px-0">
                Explore our curated selection of top-tier residential and
                commercial properties.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {properties.map((property, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl cursor-pointer shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[3/4] w-full">
                    <img
                      src={property.img}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-b-xl sm:rounded-b-2xl">
                    <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold truncate">
                      {property.title}
                    </h3>
                    <p className="text-gray-200 text-xs sm:text-sm truncate">
                      {property.location} - {property.type}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CALL TO ACTION --- */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-indigo-600 text-white text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 tracking-wide break-words">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-light tracking-wide">
              Connect with our expert advisors today and explore exclusive
              listings tailored to your needs.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-indigo-900 font-medium rounded-lg sm:rounded-xl shadow-lg hover:bg-yellow-300 transition-colors duration-300 text-sm sm:text-base md:text-lg"
            >
              Get in Touch
            </a>
          </motion.div>
        </section>
      </main>
    </ComponentWrapper>
  );
};

export default AboutUs;
