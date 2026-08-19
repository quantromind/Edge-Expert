import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios"
import { Crown, MapPin, ArrowRight, Gem, Sparkles, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Luxury = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_API_URL
    let [ properties, setProperties ] = useState([])
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? properties : properties.slice(0, 3);
    /* References for scrolling */
    const firstCardRef = useRef(null);
    const fourthCardRef = useRef(null);
    
    useEffect(() => {
        const fetchLuxuryProperties = async () => {
            try {
                const {data} = await axios.get(backendUrl + "/sellproperty")
                setProperties(data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchLuxuryProperties()
    }, []);
    
    const handleSmoothScroll = (ref) => {
        if (!ref?.current) return;

        const element = ref.current;
        const yOffset = -160; // stops a bit above
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        // Smooth easing scroll
        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    const handleToggle = () => {
        const nextState = !showAll;
        setShowAll(nextState);
        setTimeout(() => {            
            if (nextState && fourthCardRef.current) {
                handleSmoothScroll(fourthCardRef)
            }
            else if (!nextState && firstCardRef.current) {
                handleSmoothScroll(firstCardRef)
            }
        }, 500)
    };

    return (
        <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#111827] text-gray-100 overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <img
            src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=1200"
            alt="Luxury Villas"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
            />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,transparent_70%)]"></div>

                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8, 1], y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute inset-0 flex justify-center items-center"
                >
                    <Sparkles className="text-yellow-400 w-12 h-12 opacity-50" />
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative z-10 text-center text-white px-6"
                >
                    <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="flex justify-center items-center mb-6"
                    >
                        <Crown className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] mr-3" />
                        <h1 className="text-5xl md:text-7xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600">
                            Luxury Redefined
                        </h1>
                    </motion.div>
                    <p className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl font-light leading-relaxed">
                        Where architectural artistry meets timeless sophistication — experience a new era of living.
                    </p>
                </motion.div>
            </section>

            {/* SIGNATURE COLLECTION SECTION */}
            <div className="relative bg-gradient-to-b from-white via-blue-50 to-white py-32 px-6 md:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30"></div>

                {/* HEADER */}
                <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mb-20 relative z-10 max-w-5xl mx-auto"
                >
                    <div className="flex items-center justify-center mb-5">
                        <Gem className="text-blue-700 w-10 h-10 mr-3 drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]" />
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-sky-500 leading-tight">
                            The Signature Collection
                        </h1>
                    </div>
                    <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg font-light mt-4 leading-relaxed">
                        Discover{" "}
                        <span className="font-medium text-blue-700">Edge Expert’s</span>{" "}
                        most exquisite homes — where luxury, comfort, and innovation coexist beautifully.
                    </p>
                </motion.div>

                {/* CARDS */}
                <motion.div layout className="relative z-10 grid gap-12 md:grid-cols-3">
                    {displayedProjects.map((project, index) => (
                        <motion.div
                        key={index}
                        ref={index === 0 ? firstCardRef : index === 3 ? fourthCardRef : null}
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index % 3 * 0.1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-200 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all duration-500"
                        >
                            <div className="overflow-hidden relative">
                                <img
                                src={project.images}
                                alt={project.name}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>

                            <div className="p-6 text-center transition-transform duration-300 group-hover:scale-105">
                                <h3 className="text-2xl font-semibold text-blue-800 mb-2">{project.name}</h3>
                                <p className="flex items-center justify-center text-gray-700 text-sm mb-3">
                                    <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                                    {project.location}
                                </p>
                                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                <div className="flex items-center justify-center text-blue-700 font-semibold">
                                    <IndianRupee className="w-4 h-4 mr-1" />
                                    {(project.price / 10000000).toFixed(2)} Cr* onwards
                                </div>
                            </div>
                            <motion.button
                            onClick={() => navigate(`/luxuryproperties/${project._id}`)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 flex items-center gap-3 px-8 py-3 mb-10 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white text-base font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:from-blue-400 hover:to-blue-500 transition-all duration-300 cursor-pointer"
                            >
                                View Details <ArrowRight className="w-5 h-5"/>
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* BUTTON */}
                <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mt-20 relative z-10 max-w-5xl mx-auto"
                >
                    {properties.length === 0 ? (
                    <motion.button
                    disabled
                    className="mt-8 flex items-center gap-3 px-8 py-3 mx-auto rounded-full bg-gray-200 text-gray-600 text-base font-semibold cursor-not-allowed"
                    >
                        <Crown className="w-5 h-5" /> No properties to show
                    </motion.button>
                    ) : properties.length <= 3 ? (
                    <motion.button
                    disabled
                    className="mt-8 flex items-center gap-3 px-8 py-3 mx-auto rounded-full bg-gray-200 text-gray-600 text-base font-semibold cursor-not-allowed"
                    >
                        <Crown className="w-5 h-5" /> End of list
                    </motion.button>
                    ) : (
                    <motion.button
                    onClick={handleToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 flex items-center gap-3 px-8 py-3 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white text-base font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:from-blue-400 hover:to-blue-500 transition-all duration-300 cursor-pointer"
                    >
                        <Crown className="w-5 h-5" />
                        {showAll ? "Show Less" : "View All Elite Homes"}{" "}
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default Luxury;
