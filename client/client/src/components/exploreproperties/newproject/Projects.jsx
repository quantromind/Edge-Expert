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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/newprojects");
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
      console.log("Using local projects data");
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
    </div>
  );
};

export default Projects;