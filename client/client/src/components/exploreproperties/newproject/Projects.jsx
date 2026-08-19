import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ProjectCard from "./ProjectCard";
import ProjectFilterBar from "./ProjectFilterBar";
import projectsData from "./ProjectData";

const Projects = () => {
  const [filters, setFilters] = useState({
    residential: "Residential",
    city: "",
    type: "",
    status: "",
    budget: "",
  });

  const [projects, setProjects] = useState(projectsData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Enquiry & Phone Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState("enquiry"); // "enquiry" | "getPhone"
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);
  const [modalForm, setModalForm] = useState({ name: "", email: "", phone: "" });
  const [modalSubmittedSuccess, setModalSubmittedSuccess] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);

  const openModal = (type, project) => {
    setModalFor(type);
    setSelectedProjectForModal(project);
    setModalSubmittedSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalForm({ name: "", email: "", phone: "" });
    setSelectedProjectForModal(null);
    setModalSubmittedSuccess(false);
  };

  const submitModal = async (e) => {
    e.preventDefault();
    setSubmittingEnquiry(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        name: modalForm.name,
        email: modalForm.email,
        phone: modalForm.phone,
        propertyId: selectedProjectForModal?.id ? (selectedProjectForModal.id.toString().length === 24 ? selectedProjectForModal.id : undefined) : undefined,
        propertyType: selectedProjectForModal?.type || selectedProjectForModal?.category || "Residential",
        transactionType: "Buy",
        city: selectedProjectForModal?.city || selectedProjectForModal?.location || "Mumbai",
        message: modalFor === "getPhone"
          ? `User requested Builder Phone for Project: ${selectedProjectForModal?.title || "Project"} (${selectedProjectForModal?.location || ""}) - Budget: ${selectedProjectForModal?.budget || selectedProjectForModal?.price || ""}`
          : `User submitted Project Enquiry for: ${selectedProjectForModal?.title || "Project"} (${selectedProjectForModal?.location || ""}) - Budget: ${selectedProjectForModal?.budget || selectedProjectForModal?.price || ""}`
      };

      await fetch(`${apiUrl}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setModalSubmittedSuccess(true);
    } catch (err) {
      console.error("Project enquiry submit error:", err);
      setModalSubmittedSuccess(true);
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/newprojects`);
      const data = await response.json();
      if (data.success && data.data && data.data.length > 0) {
        const transformedProjects = data.data.map(project => ({
          id: project._id,
          title: project.title,
          location: project.location,
          price: `₹${(project.startprice / 10000000).toFixed(2)} - ₹${(project.endprice / 10000000).toFixed(2)} Cr`,
          image: project.images[0] || "/no-image.jpg",
          category: project.type === "Commercial" ? "Commercial" : "Residential",
          type: project.type,
          status: project.propertystatus,
          city: project.location.split(',').pop().trim(),
          budget: (() => {
            const price = project.startprice;
            if (price <= 2000000) return "INR 0 - 20L";
            if (price <= 5000000) return "INR 20L - 50L";
            if (price <= 10000000) return "INR 50L - 1Cr";
            if (price <= 50000000) return "INR 1 - 5Cr";
            return "INR 5 - 20Cr";
          })(),
          description: project.description,
          area: project.area,
          owner: project.owner
        }));
        setProjects([...projectsData, ...transformedProjects]);
      }
    } catch (error) {
      // Gracefully use local data
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const filteredProjects = projects.filter((project) => {
    if (filters.residential && project.category !== filters.residential) return false;
    if (filters.city && project.city !== filters.city) return false;
    if (filters.type && project.type !== filters.type) return false;
    if (filters.status && project.status !== filters.status) return false;
    if (filters.budget && project.budget !== filters.budget) return false;
    return true;
  });

  const residentialProjects = filteredProjects.filter(p => p.category === "Residential");
  const commercialProjects = filteredProjects.filter(p => p.category === "Commercial");

  const getSectionTitle = () => {
    if (filters.status.toLowerCase().includes("upcoming")) return "Upcoming Project Properties";
    if (filters.status.toLowerCase().includes("new")) return "New Project Properties";
    return "Featured Properties";
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Enhanced Hero Section (MODIFIED) */}
      <section className="relative h-[100vh] w-full bg-cover bg-center flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>

        <div className="relative text-center px-6 max-w-4xl mx-auto text-white">
          {/* Change font-bold to font-semibold */}
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold mb-6 leading-tight" 
          >
            <span className="text-5xl md:text-6xl font-light mb-6 leading-tight drop-shadow-lg">
              Edge Expert
            </span>
          </motion.h1>

          {/* Change font-light to font-normal */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-normal mb-6 text-blue-100" 
          >
            Discover Your Dream Property
          </motion.p>

          {/* Change font-medium to font-semibold */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-lg font-semibold text-blue-50 max-w-2xl mx-auto leading-relaxed" 
          >
            Explore premium residential and commercial properties across India's top cities. 
            Find your perfect space with curated listings and expert guidance.
          </motion.p>

          {/* Remove icons and keep font-semibold */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >

            
            {/* <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors" // Removed flex items-center gap-3 and FaHome
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Properties
            </motion.button>
             */}
            {/* <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors" // Removed flex items-center gap-3 and FaBuilding
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commercial Spaces
            </motion.button> */}
          </motion.div>
        </div>

        {/* Floating Elements (Kept as they were outside the button modification scope) */}
        {/* <motion.div
          className="absolute bottom-10 left-10 bg-white/20 backdrop-blur-sm p-4 rounded-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaHome className="text-white text-2xl" />
        </motion.div> */}
        
        {/* <motion.div
          className="absolute top-10 right-10 bg-white/20 backdrop-blur-sm p-4 rounded-2xl"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <FaBuilding className="text-white text-2xl" />
        </motion.div> */}
      </section>
      {/* End of Hero Section (MODIFIED) */}

      {/* Projects Section (No Changes) */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* Filter Bar */}
        <ProjectFilterBar filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <>

        {/* Residential Projects */}
        <AnimatePresence>
          {residentialProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <FaHome className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {getSectionTitle()} (Residential)
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Discover your dream home from our curated residential properties
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {residentialProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onViewDetails={() => handleProjectClick(project.id)}
                    onEnquiry={(p) => openModal("enquiry", p)}
                    onGetPhone={(p) => openModal("getPhone", p)}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Commercial Projects */}
        <AnimatePresence>
          {commercialProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <FaBuilding className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {getSectionTitle()} (Commercial)
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Premium commercial spaces for your business growth
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {commercialProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onViewDetails={() => handleProjectClick(project.id)}
                    onEnquiry={(p) => openModal("enquiry", p)}
                    onGetPhone={(p) => openModal("getPhone", p)}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

            {/* No Projects Found */}
            {residentialProjects.length === 0 && commercialProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any properties matching your current filters. 
                    Try adjusting your search criteria to see more options.
                  </p>
                  <button
                    onClick={() => setFilters({
                      residential: "Residential",
                      city: "",
                      type: "",
                      status: "",
                      budget: "",
                    })}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Project Enquiry & Phone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/60" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">
                    {modalFor === "getPhone" ? "Get Contact Details" : "Project Enquiry"}
                  </h3>
                </div>
                <button onClick={closeModal} className="text-white/80 hover:text-white text-xl">✕</button>
              </div>
              {selectedProjectForModal && (
                <div className="bg-black/20 rounded-xl p-2.5 mt-2 text-xs">
                  <p className="font-semibold truncate">🏢 {selectedProjectForModal.title}</p>
                  <p className="text-blue-200 truncate">
                    📍 {selectedProjectForModal.location || selectedProjectForModal.city} • {selectedProjectForModal.budget || selectedProjectForModal.price}
                  </p>
                </div>
              )}
            </div>

            {/* Body: Form or Success Card */}
            {modalSubmittedSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Enquiry Submitted Successfully!</h4>
                  <p className="text-xs text-gray-500 mt-1">Our representative & project desk have received your enquiry.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
                  <div className="text-xs text-gray-500 font-medium">Direct Project Sales Desk:</div>
                  <div className="text-base font-bold text-gray-900 flex items-center justify-between">
                    <span>📞 +91 73853 27808</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("+91 73853 27808");
                        alert("Phone copied to clipboard!");
                      }}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-xs text-gray-600">
                    📧 sales@edgeexpert.com
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href="tel:07385327808"
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/917385327808?text=${encodeURIComponent(`Hello, I am interested in project: ${selectedProjectForModal?.title || 'this project'}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-bold transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitModal} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                  <input
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm((s) => ({ ...s, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={modalForm.email}
                    onChange={(e) => setModalForm((s) => ({ ...s, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                    placeholder="e.g. rahul@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Contact Number *</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700">+91</span>
                    <input
                      required
                      type="tel"
                      value={modalForm.phone}
                      onChange={(e) => setModalForm((s) => ({ ...s, phone: e.target.value }))}
                      className="flex-1 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                      placeholder="10-digit Mobile Number"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" required defaultChecked className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label className="text-xs text-gray-600">
                    I agree to receive project brochures & price sheet on WhatsApp/Phone.
                  </label>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submittingEnquiry ? "Submitting..." : (modalFor === "getPhone" ? "Get Phone Number" : "Submit Enquiry")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;