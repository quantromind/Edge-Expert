
import React from "react";
import { ArrowRight, Shield, Users, Building2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import pick3 from "../../assets/home/pick3.jpg";

import pick5 from "../../assets/home/pick5.jpg";

const pick1 = "https://wallpaperaccess.com/full/1104816.jpg";
const pick2 = "https://tcpdesignstudio.com/wp-content/uploads/2024/05/DSC01808.webp";

const pick4 = "https://media.istockphoto.com/id/1829003668/photo/a-young-woman-in-protective-gloves-washes-the-floor-with-a-brush-and-detergent.jpg?s=612x612&w=0&k=20&c=02F2sZZHnE-60s-AbLmis6z0gx7LVkpXkLwEBNRxSyI=";


// --- Edge Expert Realty Info
const edgeExpertInfo = [
  {
    title: "Verified Real Estate Advisory",
    desc: "Comprehensive property advisory offering verified listings, builder price guarantees, and complete legal documentation support.",
  },
  {
    title: "Key Offerings",
    desc: "Direct builder partnerships, RERA-approved homes, commercial office hubs, luxury villas, and smart investment portfolios.",
  },
  {
    title: "Who is it for?",
    desc: "Homebuyers, investors, NRI clients, and enterprises seeking transparent, high-yield, and hassle-free property purchases across India.",
  },
];

// --- Features (kept as original, displayed elsewhere in UI)
const features = [
  {
    title: "Chosen by Clients: Trusted by Thousands",
    desc: "Over 25,000 satisfied clients rely on Edge Expert for verified and secure property transactions.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Launching Today: Expert Team Ready",
    desc: "A dedicated team of consultants and support staff ready to help you at every step.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Edge Expert Announces Verified Listings",
    desc: "Every property is verified by our in-house team for authenticity and legal clearance.",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    title: "Top-Tier: Consistent High Ratings",
    desc: "Consistent 4.8+ ratings across users for transparency and service quality.",
    icon: <Star className="w-6 h-6" />,
  },
];

// --- Stats section (original)
const stats = [
  { value: "25K+", label: "Happy Clients" },
  { value: "10K+", label: "Verified Properties" },
  { value: "500+", label: "Expert Agents" },
  { value: "4.8/5", label: "Average Rating" },
];

// --- Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.6 },
  },
};

const transitionSettings = { type: "spring", stiffness: 60, damping: 15 };

const itemBounceVariant = {
  hidden: { y: -50, opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    transition: transitionSettings,
  },
};

const hoverScale = { scale: 1.03, transition: { duration: 0.3 } };
const statHoverScale = { scale: 1.06, transition: { duration: 0.3 } };
const listHover = {
  x: 5,
  backgroundColor: "rgba(255,255,255,0.1)",
  transition: { duration: 0.3 },
};

// --- Main Component
const NewsSection = () => {

  const navigate = useNavigate();

  return (
    // 💜 Main background
    <section className="bg-gradient-to-br from-purple-600 via-purple-400 to-white py-16 font-sans min-h-[100vh] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden shadow-2xl rounded-xl border border-purple-800"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* --- Left Section: FinancesBazar content (replaced "In the News") --- */}



          <motion.div
            variants={itemBounceVariant}
            className="lg:col-span-1 p-8 text-white bg-cover bg-center relative min-h-[500px]"
            style={{ backgroundImage: `url(${pick1})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-l-xl lg:rounded-l-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-semibold mb-6 border-b border-purple-400 pb-3">
                Edge Expert Realty
              </h2>

              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {edgeExpertInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                    }}
                    whileHover={listHover}
                    className="group cursor-pointer py-4 px-3 border-b border-purple-600 last:border-b-0 rounded-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{info.title}</h3>
                        <p className="text-xs text-white mt-1 opacity-80">{info.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Visit Link */}
                <div className="mt-4 pt-2">
                  <button
                    onClick={() => navigate("/properties")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-200 transition cursor-pointer"
                  >
                    Explore Verified Properties <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>


          {/* --- Middle Column --- */}
          <div className="lg:col-span-1 grid grid-rows-2">

            {/* Interior Design Section */}
            <motion.div
              variants={itemBounceVariant}
              whileHover={hoverScale}
              className="p-8 text-white bg-cover bg-center relative flex flex-col justify-center items-center cursor-pointer min-h-[250px]"
              style={{ backgroundImage: `url(${pick2})` }}
              onClick={() => navigate("/interiordesign")}
            >
              <div className="absolute inset-0 bg-purple-400 opacity-20"></div>

              <div className="relative z-10 text-center">
                <h3 className="text-sm font-semibold uppercase text-black mb-1 tracking-widest">
                  Interior Excellence
                </h3>

                <h2 className="text-3xl font-semibold leading-tight">
                  Premium Interior Design Services
                </h2>

                <p className="text-xs mt-2 text-black opacity-75">
                  Transforming Spaces • Modern • Luxury • Aesthetic
                </p>

                {/* New Link */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // stops the card click event
                    navigate("/interiordesign");
                  }}
                  className="mt-4 text-black font-semibold underline underline-offset-4 hover:text-purple-800 transition"
                >
                  Visit InteriorDesign →
                </button>
              </div>
            </motion.div>


            {/* Testimonial */}
            <motion.div
              variants={itemBounceVariant}
              whileHover={hoverScale}
              className="p-8 text-white bg-cover bg-center relative flex flex-col justify-center min-h-[250px]"
              style={{ backgroundImage: `url(${pick3})` }}
            >
              <div className="absolute inset-0 bg-purple-950 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-white font-semibold">4.8 / 5 Review</span>
                </div>
                <p className="text-lg text-white italic mb-4 font-normal">
                  “Professional service, fast response, smooth documentation. Highly recommend Edge Expert!”
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/64?img=12"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    alt="client"
                  />
                  <div>
                    <h4 className="text-sm text-white font-semibold">Sneha R.</h4>
                    <p className="text-xs text-purple-200 opacity-80">Homeowner</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- Right Column --- */}
          <div className="lg:col-span-1 grid grid-rows-2">
            {/* CTA */}


            <motion.div
              variants={itemBounceVariant}
              whileHover={hoverScale}
              className="p-8 text-white bg-cover bg-center relative min-h-[250px] rounded-2xl overflow-hidden shadow-xl"
              style={{ backgroundImage: `url(${pick4})` }}
            >
              <div className="absolute inset-0 bg-gray-950/70"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4 leading-snug">
                  Direct With Builders & New Projects
                </h3>

                <p className="text-sm mb-6 text-purple-200">
                  0% Middlemen • Direct Developer Pricing • Verified Inventory • Free Site Visits
                </p>

                <button
                  onClick={() => navigate("/projects")}
                  className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-lg cursor-pointer"
                >
                  Explore Projects
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemBounceVariant}
              className="p-8 bg-cover bg-center relative text-white min-h-[250px] flex flex-col justify-center"
              style={{ backgroundImage: `url(${pick5})` }}
            >
              <div className="absolute inset-0 bg-purple-800 opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 border-b border-purple-700 pb-2">Why choose Edge Expert?</h3>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {stats.map((s, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                      }}
                      whileHover={statHoverScale}
                      className="text-center bg-white p-4 rounded-lg shadow-xl cursor-pointer text-gray-800"
                    >
                      <p className="text-2xl font-semibold text-purple-700 mb-1">{s.value}</p>
                      <p className="text-xs font-normal">{s.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
