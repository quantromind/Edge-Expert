import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search as SearchIcon, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

// Images
import img1 from "../../assets/blog/img1.png";
import img2 from "../../assets/blog/img2.png";
import img3 from "../../assets/blog/img3.png";
import img4 from "../../assets/blog/img4.png";
import img5 from "../../assets/blog/img5.png";
import img6 from "../../assets/blog/img6.png";
import img7 from "../../assets/blog/img7.png";
import img8 from "../../assets/blog/img8.png";
import img9 from "../../assets/blog/img9.png";
import heroBg from "../../assets/blog/hero-bg.png";

const SidebarCategoryList = ({ activeCategory, setActiveCategory }) => {
  const sidebarCategories = [
    { display: "Home Buying & Loan Tips", data: "Buying" },
    { display: "Real Estate Investment", data: "Finance & Legal" },
    { display: "Home & Lifestyle Trends", data: "Home Improvement" },
    { display: "Sustainability & Green Homes", data: "Market Trends" },
    { display: "Design & Architecture", data: "Technology" },
  ];

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-blue-900 p-4 pb-2 border-b">
          CATEGORIES
        </h3>
        <ul>
          <li>
            <button
              onClick={() => setActiveCategory("All")}
              className={`flex items-center w-full py-2 px-4 font-light ${
                activeCategory === "All"
                  ? "text-blue-600 bg-blue-50/50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <ArrowRight size={14} className={`mr-2 ${activeCategory === "All" ? "opacity-100" : "opacity-0"}`} />
              All Articles
            </button>
          </li>

          {sidebarCategories.map((cat) => (
            <li key={cat.data}>
              <button
                onClick={() => setActiveCategory(cat.data)}
                className={`flex items-center w-full py-2 px-4 font-light ${
                  activeCategory === cat.data
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <ArrowRight size={14} className={`mr-2 ${activeCategory === cat.data ? "opacity-100" : "opacity-0"}`} />
                {cat.display}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Card */}
      <div className="rounded-lg overflow-hidden shadow-md group">
        <img src={img7} alt="Featured" className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-500" />
        <div className="p-4 bg-gradient-to-br from-blue-700 to-blue-900 text-white font-light">
          <h4 className="text-xl font-medium">Featured Listing</h4>
          <p className="text-sm opacity-90 font-light">
            Exclusive new luxury property available now.
          </p>
          <button className="mt-3 inline-flex items-center bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-full text-sm font-normal">
            View Listing <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const articles = [
    {
      title: "New Home Sales Surge",
      img: heroBg,
      category: "Buying",
      description:
        "The housing market is experiencing a surge in new home sales driven by builder incentives...",
      date: "Sep 23, 2025",
      author: "Market Analyst",
      readTime: "7 min read",
    },
    {
      title: "How to Create a Cozy Living Room",
      img: img1,
      category: "Home Improvement",
      description:
        "Transforming your living room into a cozy haven improves comfort and ambiance...",
      date: "Oct 1, 2025",
      author: "Jane Doe",
      readTime: "5 min read",
    },
    {
      title: "Understanding Home Insurance",
      img: img2,
      category: "Finance & Legal",
      description:
        "Home insurance protects homeowners from financial loss due to damage or theft...",
      date: "Sep 28, 2025",
      author: "Mark Chen",
      readTime: "7 min read",
    },
    {
      title: "Benefits of Buying a New Home",
      img: img3,
      category: "Buying",
      description:
        "Purchasing a new home offers energy-efficient appliances and fewer maintenance concerns...",
      date: "Sep 25, 2025",
      author: "Priya Sharma",
      readTime: "6 min read",
    },
    {
      title: "Top Financial Mistakes",
      img: img4,
      category: "Finance & Legal",
      description:
        "Many buyers make financial mistakes like poor budgeting and overlooking hidden fees...",
      date: "Sep 22, 2025",
      author: "David Lee",
      readTime: "8 min read",
    },
    {
      title: "Can Foreigners Buy Property?",
      img: img5,
      category: "Finance & Legal",
      description:
        "Foreigners can buy property in many countries but must know the legal requirements...",
      date: "Sep 20, 2025",
      author: "Elena Rodriguez",
      readTime: "4 min read",
    },
    {
      title: "Importance of a Pre-approved Mortgage",
      img: img6,
      category: "Buying",
      description:
        "A pre-approved mortgage strengthens negotiation power and clarifies budget...",
      date: "Sep 18, 2025",
      author: "Mark Chen",
      readTime: "6 min read",
    },
    {
      title: "Eco-Friendly Homes",
      img: img8,
      category: "Market Trends",
      description:
        "Eco-friendly homes with solar panels and smart systems reduce energy consumption...",
      date: "Sep 20, 2025",
      author: "David Lee",
      readTime: "6 min read",
    },
    {
      title: "Smart Home Technologies",
      img: img9,
      category: "Technology",
      description:
        "Smart home devices like thermostats and cameras increase convenience and security...",
      date: "Oct 5, 2025",
      author: "Alex Johnson",
      readTime: "5 min read",
    },
  ];

  const filteredArticles = articles
    .filter((a) => activeCategory === "All" || a.category === activeCategory)
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ArticleCard = ({ article }) => {
    const handleClick = () => {
      navigate(`/blog/${encodeURIComponent(article.title)}`, { state: { article } });
    };

    return (
      <motion.div
        variants={itemVariants}
        onClick={handleClick}
        className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer font-light"
        whileHover={{ translateY: -5 }}
      >
        <img src={article.img} className="w-full h-52 object-cover" />
        <div className="p-5">
          <p className="text-blue-600 text-xs uppercase mb-1 font-normal">
            {article.category}
          </p>
          <h3 className="text-xl mb-2 font-medium">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-light">
            {article.description}
          </p>
          <div className="flex items-center justify-between text-gray-500 text-xs font-light">
            <span>{article.author}</span>
            <span>{article.date} • {article.readTime}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="bg-gray-50 text-gray-800 font-light">

      {/* HERO SECTION */}
      <motion.section
        className="relative bg-cover bg-center h-[100vh] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mt-10">
          <motion.h1
            className="text-5xl md:text-7xl font-medium mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Insights for Your Home Journey
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl font-light leading-relaxed mb-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore expert advice, market trends, and lifestyle tips for buying,
            selling, and living in your dream home.
          </motion.p>

          <motion.button
            onClick={() =>
              window.scrollTo({
                top: document.querySelector(".blog-content-section").offsetTop - 100,
                behavior: "smooth",
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-10 rounded-full text-xl shadow-lg font-normal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
          >
            Read Our Latest Posts
          </motion.button>
        </div>
      </motion.section>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 blog-content-section">
        <div className="lg:col-span-9">
          <div className="flex w-full shadow-md rounded-lg overflow-hidden mb-8">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 bg-white text-base text-gray-700 outline-none font-light"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 flex items-center justify-center">
              <SearchIcon size={20} />
            </button>
          </div>

          {filteredArticles.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-light"
            >
              {filteredArticles.map((article) => (
                <ArticleCard key={article.title} article={article} />
              ))}
            </motion.div>
          ) : (
            <p className="text-center p-16 text-gray-600 font-light">No articles found.</p>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-3">
          <SidebarCategoryList
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </aside>
      </div>

      {/* FOOTER SECTION */}
      <motion.footer
        className="bg-gray-900 text-gray-300 py-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-full md:col-span-1">
            <motion.h4
              className="text-2xl font-bold text-white mb-4"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              DreamHome Blog
            </motion.h4>
            <motion.p
              className="text-sm leading-relaxed"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Your ultimate resource for real estate insights, home living tips, and market trends.
            </motion.p>
            <div className="flex space-x-4 mt-6">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61592347450730"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/edge.expertrealty/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>

          <div>
            <motion.h4
              className="text-lg font-semibold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-2">
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">About Us</a>
              </motion.li>
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Contact</a>
              </motion.li>
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Privacy Policy</a>
              </motion.li>
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Terms of Service</a>
              </motion.li>
            </ul>
          </div>

          <div>
            <motion.h4
              className="text-lg font-semibold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Categories
            </motion.h4>
            <ul className="space-y-2">
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Home Buying</a>
              </motion.li>
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Investments</a>
              </motion.li>
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Home Improvement</a>
              </motion.li>
              <motion.li
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Market Trends</a>
              </motion.li>
            </ul>
          </div>

          <div>
            <motion.h4
              className="text-lg font-semibold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Subscribe for Updates
            </motion.h4>
            <motion.p
              className="text-sm mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Get the latest articles and insights directly to your inbox.
            </motion.p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
              />
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-md text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          className="text-center text-gray-500 text-sm mt-10 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          &copy; {new Date().getFullYear()} DreamHome Blog. All rights reserved.
        </motion.div>
      </motion.footer>
    </main>
  );
}