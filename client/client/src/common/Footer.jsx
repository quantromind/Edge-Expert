import React, { useState } from "react";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Footer link data
const footerData = {
  "REAL ESTATE": [
    "Flats in Mumbai",
    "Flats in Pune",
    "Flats in Bangalore",
    "Flats in Hyderabad",
    "Flats in Chennai",
    "Flats in Delhi",
    "Flats in Gurgaon",
    "Flats in Noida",
    "Flats in Ahmedabad",
    "Flats in Kolkata",
    "Flats in Indore",
    "Flats in Surat",
    "Flats in Nagpur",
    "Flats in Jaipur",
    "Flats in Lucknow",
    "Flats in Bhopal",
    "Flats in Chandigarh",
    "Flats in Kochi",
  ],
  RENTALS: [
    "Houses for Rent in Mumbai",
    "Houses for Rent in Delhi",
    "PG in Pune",
    "PG in Hyderabad",
    "PG in Noida",
    "Commercial Rentals in Gurgaon",
    "Luxury Rentals in Bangalore",
    "Apartments for Rent in Ahmedabad",
    "PG in Indore",
    "Flats for Rent in Kolkata",
    "PG in Nagpur",
    "Flats for Rent in Kochi",
  ],
  PROJECTS: [
    "Luxury Projects in Mumbai",
    "Affordable Projects in Delhi NCR",
    "Upcoming Projects in Pune",
    "Smart Homes in Hyderabad",
    "Waterfront Projects in Kochi",
    "IT Hub Projects in Bangalore",
    "Greenfield Projects in Chennai",
    "Gated Communities in Ahmedabad",
    "Commercial Hubs in Gurgaon",
    "Premium Villas in Goa",
    "Skyscraper Projects in Kolkata",
    "Budget Apartments in Jaipur",
  ],
  "CITY DATA": [
    "Property Rates in Mumbai",
    "Property Rates in Delhi",
    "Investment Trends in Pune",
    "Top Localities in Hyderabad",
    "Real Estate Growth in Chennai",
    "Property Insights in Kochi",
    "Emerging Markets in Jaipur",
    "Citywise Trends in Ahmedabad",
  ],
  "POPULAR SEARCHES": [
    "Flats in India",
    "Plots for Sale",
    "Commercial Spaces",
    "Luxury Villas in India",
    "Studio Apartments",
    "Independent Houses",
    "Ready to Move Properties",
    "Smart City Properties",
    "Affordable Housing Options",
  ],
};

// Updated city images with HD building photos
const cityImages = [
  {
    name: "Pune",
    image:
      "https://i.pinimg.com/736x/00/20/f4/0020f4e245d76730d68e169947d412b4.jpg",
  },
  {
  name: "Bangalore",
  image: "https://t4.ftcdn.net/jpg/03/75/40/73/360_F_375407347_spt4AF5sxsIt9gBIKVzJl95tiQhEGNXy.jpg"
}
,
  {
    name: "Hyderabad",
    image:
      "https://thumbs.dreamstime.com/b/charminar-6211934.jpg",
  },
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVtYmFpJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
  },
];

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const Footer = () => {
  const [activeSection, setActiveSection] = useState("REAL ESTATE");
  const mainColor = "text-teal-400";

  const Button = ({ children, onClick, className = "" }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`text-sm font-semibold px-3 py-1 rounded-md transition-all ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <footer className="bg-[#121212] text-gray-300 pt-14 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-10 mb-10">
          {/* LEFT SECTION: Image Slider + Contact */}
          <div className="w-full lg:w-2/5 flex flex-col items-start space-y-6">
            {/* Image Slider */}
            <div className="w-full mb-6">
              <Slider {...sliderSettings}>
                {cityImages.map((city, index) => (
                  <div
                    key={index}
                    className="relative h-72 w-full overflow-hidden shadow-2xl rounded-2xl bg-gradient-to-br from-gray-900 to-black"
                  >
                    <img
                      src={city.image}
                      alt={city.name}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-white font-serif text-3xl font-bold tracking-wide mb-2">
                        {city.name}
                      </h3>
                      <p className="text-gray-300 text-base">
                        Explore premium properties in {city.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Contact Info */}
            <div className="space-y-5 w-full max-w-[400px]">
              <h3 className="text-xl font-bold text-white mb-3">Get In Touch</h3>
              <div className="space-y-3">
                <p className="flex items-start text-sm text-gray-400">
                  <MapPin size={20} className={`${mainColor} mr-3 mt-0.5 flex-shrink-0`} />
                  Miraroad, Mumbai, Maharashtra, India 401107
                </p>
                <p className="flex items-center text-sm text-gray-400">
                  <Mail size={20} className={`${mainColor} mr-3 flex-shrink-0`} />
                  <a href="mailto:hello@edgeexpert.in" className="hover:text-teal-400 transition">hello@edgeexpert.in</a>
                </p>
                <p className="flex items-center text-sm text-gray-400">
                  <Phone size={20} className={`${mainColor} mr-3 flex-shrink-0`} />
                  <a href="tel:07385327808" className="hover:text-teal-400 transition">073853 27808</a>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Navigation & Links */}
          <div className="w-full lg:w-3/5">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-700 pb-3 flex flex-wrap gap-x-4 gap-y-2">
              {Object.keys(footerData).map((section) => (
                <Button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`${
                    activeSection === section
                      ? "text-teal-400 border-b-2 border-teal-400"
                      : "text-gray-400 border-b-2 border-transparent hover:text-white hover:border-gray-500"
                  }`}
                >
                  {section}
                </Button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {footerData[activeSection]?.map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ x: 4, color: "#2DD4BF" }}
                  className="text-gray-400 text-sm hover:underline transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Additional Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-800">
              {/* Quick Links */}
              <div>
                <h2 className="text-lg font-bold mb-3 text-white">Quick Links</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/aboutus" className="hover:text-teal-400 transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    {/* <a href="#careers" className="hover:text-teal-400 transition-colors">
                      Careers
                    </a> */}
                  </li>
                  <li>
                    <a href="/investorrelations" className="hover:text-teal-400 transition-colors">
                      Investor Relations
                    </a>
                  </li>
                  <li>
                    <a href="/privacypolicy" className="hover:text-teal-400 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/termsconditions" className="hover:text-teal-400 transition-colors">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Partner Sites & App */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold mb-3 text-white">Partner Sites</h2>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="https://quantromind.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-teal-400 transition-colors"
                      >
                        Quantromind Private Limited
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col items-start">
                  <h2 className="text-lg font-bold mb-2 text-white">Get the App</h2>
                  <p className="text-gray-300 text-sm mb-2">
                    Download our app for the best experience
                  </p>
                  <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play"
                      className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform"
                    />
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="App Store"
                      className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media & Newsletter */}
              <div>
                <h2 className="text-lg font-bold mb-3 text-white">Follow Us</h2>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    <Facebook size={22} />
                  </a>

                  {/* X (Twitter) icon */}
                  <a
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2H21.5l-7.57 8.66L22 22h-6.51l-5.1-6.32L4.6 22H1.333l8.09-9.26L2 2h6.64l4.66 5.79L18.244 2zm-1.1 18h1.82L8.15 4h-1.9l10.89 16z" />
                    </svg>
                  </a>

                  <a href="#" className="hover:text-teal-400 transition-colors">
                    <Instagram size={22} />
                  </a>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    <Linkedin size={22} />
                  </a>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Newsletter</h3>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="px-3 py-2 bg-gray-800 text-white text-sm rounded-l focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                    />
                    <button className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-r text-sm font-semibold transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 text-center text-xs text-gray-600 border-t border-gray-800 pt-5">
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-300 font-semibold">
            Umbharkar Technologies Pvt. Ltd.
          </span>{" "}
          All Rights Reserved. | Site Map | Disclaimer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
