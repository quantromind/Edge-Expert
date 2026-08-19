import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Added useNavigate hook
import { motion } from "framer-motion";
import { MapPin, Star, Wifi, AirVent, WashingMachine, Home, Shield, Users, DollarSign, Search, ListPlus, Compass, MessageCircle, ArrowLeft } from "lucide-react"; 

// --- Data & Helpers ---

// Helper function to map amenity strings to icons
const getAmenityIcon = (amenity) => {
  switch (amenity.toLowerCase()) {
    case 'wifi':
      return <Wifi size={16} className="text-teal-500" />;
    case 'ac':
    case 'air conditioning': // Added for robustness
      return <AirVent size={16} className="text-teal-500" />;
    case 'laundry':
      return <WashingMachine size={16} className="text-teal-500" />;
    case 'gym':
      return <Home size={16} className="text-teal-500" />;
    case 'security':
      return <Shield size={16} className="text-teal-500" />;
    default:
      return null;
  }
};

// Sample PG / Co-living Data (Enhanced with priceValue for filtering)
const pgList = [
  {
    id: 1,
    name: "Urban Nest PG",
    location: "Koregaon Park, Pune",
    startingPrice: "₹9,500", 
    priceValue: 9500, // New field for filtering
    rating: 4.5,
    image: "https://i.pinimg.com/1200x/11/bb/93/11bb933e73706ea996f1ae545c935b78.jpg",
    type: "Co-living",
    occupancy: "Double/Triple", 
    amenities: ["WiFi", "AC", "Laundry"],
    available: true,
  },
  {
    id: 2,
    name: "CosyStay for Girls",
    location: "Baner, Pune",
    startingPrice: "₹8,000",
    priceValue: 8000,
    rating: 4.8,
    image: "https://i.pinimg.com/1200x/f0/bb/c8/f0bbc8c5b2cc34c61e65ae93cdfce53e.jpg",
    type: "PG - Female",
    occupancy: "Single/Double",
    amenities: ["WiFi", "Laundry", "Security"],
    available: true,
  },
  {
    id: 3,
    name: "The Hive Co-Living",
    location: "Wakad, Pune",
    startingPrice: "₹10,500",
    priceValue: 10500,
    rating: 4.6,
    image: "https://i.pinimg.com/1200x/b6/ea/04/b6ea040b7a0e1a30a7adf01e0e85ff67.jpg",
    type: "Co-living",
    occupancy: "Single/Double",
    amenities: ["WiFi", "AC", "Gym"],
    available: true,
  },
  {
    id: 4,
    name: "Elite Men's PG",
    location: "Hinjewadi, Pune",
    startingPrice: "₹7,500",
    priceValue: 7500,
    rating: 4.3,
    image: "https://i.pinimg.com/1200x/0b/fd/a4/0bfda43164d342b08d8ef2814cccabe5.jpg",
    type: "PG - Male",
    occupancy: "Triple/Quad",
    amenities: ["WiFi", "Security", "Laundry"],
    available: true,
  },
  {
    id: 5,
    name: "Silicon Stay Co-living",
    location: "Koramangala, Bangalore",
    startingPrice: "₹12,000",
    priceValue: 12000,
    rating: 4.7,
    image: "https://i.pinimg.com/1200x/8c/9c/d6/8c9cd63e3c713ef66885a55acfb510b3.jpg", 
    type: "Co-living",
    occupancy: "Single/Double",
    amenities: ["WiFi", "AC", "Gym", "Security"],
    available: true,
  },
  {
    id: 6,
    name: "Capital Heights PG",
    location: "Sector 44, Gurgaon (NCR)",
    startingPrice: "₹10,000",
    priceValue: 10000,
    rating: 4.5,
    image: "https://i.pinimg.com/1200x/18/11/4b/18114b75b33ce42bcebc9303a4387b00.jpg", 
    type: "PG - Male",
    occupancy: "Single/Double",
    amenities: ["WiFi", "Laundry", "Security"],
    available: true,
  },
  {
    id: 7,
    name: "Bhoomi Residences",
    location: "Indiranagar, Bangalore",
    startingPrice: "₹13,500",
    priceValue: 13500,
    rating: 4.8,
    image: "https://i.pinimg.com/1200x/3f/b3/13/3fb3133d8ce3f88121a344ae103adb83.jpg", 
    type: "PG - Female",
    occupancy: "Single",
    amenities: ["WiFi", "AC", "Laundry", "Gym"],
    available: true,
  },
  {
    id: 8,
    name: "Tech-Hub Residences",
    location: "Balewadi, Pune",
    startingPrice: "₹11,000",
    priceValue: 11000,
    rating: 4.7,
    image: "https://i.pinimg.com/1200x/b3/46/6a/b3466a1f9685929473d77b515dd71d9a.jpg",
    type: "Co-living",
    occupancy: "Single",
    amenities: ["WiFi", "AC", "Laundry", "Gym"],
    available: true,
  },
  {
    id: 9, 
    name: "Green View Homes",
    location: "Gachibowli, Hyderabad", 
    startingPrice: "₹14,000",
    priceValue: 14000,
    rating: 4.6,
    image: "https://i.pinimg.com/1200x/b7/3a/19/b73a1971a88b371981f1275111f860ef.jpg",
    type: "Co-living",
    occupancy: "Single/Double",
    amenities: ["WiFi", "AC", "Gym", "Security", "Laundry"],
    available: true,
  },
  {
    id: 10, 
    name: "Phoenix Residences",
    location: "Andheri West, Mumbai", 
    startingPrice: "₹15,000",
    priceValue: 15000,
    rating: 4.9,
    image: "https://i.pinimg.com/1200x/ff/f5/fe/fff5fef34a804ec268fdaac5d90447f5.jpg",
    type: "PG - Male",
    occupancy: "Single/Double",
    amenities: ["WiFi", "AC", "Laundry", "Security"],
    available: true,
  },
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, 
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 150, damping: 18 },
  },
};

// Variants for Hero Section Text (Title slides left, Subtitle slides right)
const heroTextLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 } 
  },
};

const heroTextRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 } 
  },
};

const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Small delay between title and subtitle
            delayChildren: 0.5 // Delay before the whole block starts
        }
    }
};

// --- Sub-Components ---

const SearchFilterBar = ({ 
  searchText, setSearchText,
  occupancyFilter, setOccupancyFilter,
  priceMaxFilter, setPriceMaxFilter,
  onSearch,
}) => (
    // Changed sticky top-0 to top-4 (or similar) if you want it to scroll past the top of the screen before sticking
    <div className="sticky top-4 z-20 bg-white/95 backdrop-blur-sm shadow-md rounded-xl p-4 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            
            <div className="relative flex-grow w-full md:w-auto">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                <input 
                    type="text" 
                    placeholder="Search Location (e.g., Koramangala, Gurgaon, Baner)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
                />
            </div>

            <select 
              className="w-full md:w-48 py-3 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
              value={occupancyFilter}
              onChange={(e) => setOccupancyFilter(e.target.value)}
            >
                <option value="">Occupancy Type (Any)</option>
                <option value="Single">Single</option>
                <option value="Double/Triple">Double/Triple</option>
                <option value="Triple/Quad">Triple/Quad</option>
                <option value="Single/Double">Single/Double</option>
            </select>
            
            <select 
              className="w-full md:w-48 py-3 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
              value={priceMaxFilter}
              onChange={(e) => setPriceMaxFilter(Number(e.target.value))}
            >
                <option value={0}>Price Max (Any)</option>
                <option value={8000}>₹8,000</option>
                <option value={10000}>₹10,000</option>
                <option value={13000}>₹13,000</option>
                <option value={15000}>₹15,000</option>
                <option value={Infinity}>₹15,000+</option>
            </select>
            
            <motion.button 
                className="w-full md:w-32 py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSearch}
            >
                <Search size={18} />
                Search
            </motion.button>

        </div>
    </div>
);

// Reusable PG Card Component
const PGCard = ({ pg }) => (
    <motion.div
        key={pg.id}
        variants={itemVariants}
        whileHover={{ 
            scale: 1.05, 
            y: -10, 
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.08)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 cursor-pointer transition duration-300 ${
            !pg.available ? 'opacity-50 grayscale pointer-events-none' : 'hover:shadow-3xl'
        }`}
    >
        
        {/* Image Section */}
        <div className="relative h-56 md:h-64">
            <img
                src={pg.image} 
                alt={pg.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://placehold.co/600x400/d1d5db/4b5563?text=Image+Unavailable`; 
                }}
            />
            
            {/* Status Badge */}
            <span 
                className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full shadow-lg transition duration-300 ${
                    pg.available ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'
                }`}
            >
                {pg.available ? 'AVAILABLE' : 'BOOKED'}
            </span>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
            
            {/* Title and Type */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900 leading-snug truncate pr-2">
                    {pg.name}
                </h3>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200 whitespace-nowrap">
                    {pg.type}
                </span>
            </div>
            
            {/* Location & Occupancy */}
            <div className="space-y-2 mb-4 text-sm">
                <p className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-indigo-500 flex-shrink-0" />
                    <span className="truncate">{pg.location}</span>
                </p>
                <p className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2 text-indigo-500 flex-shrink-0" />
                    <span className="font-semibold">{pg.occupancy}</span>
                </p>
            </div>

            
            {/* Price and Rating */}
            <div className="flex justify-between items-center border-t pt-4 border-gray-100">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Starting From</p>
                    <p className="text-2xl font-semibold text-indigo-600">
                        {pg.startingPrice}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                            / month
                        </span>
                    </p>
                </div>
              
              <div className="flex items-center bg-yellow-500/10 text-yellow-700 px-3 py-1 rounded-full">
                <Star className="mr-1 fill-yellow-500 stroke-yellow-500" size={16} />
                <span className="text-base font-semibold">{pg.rating}</span>
              </div>
            </div>

            {/* Amenities with subtle animation */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Top Amenities:</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {pg.amenities.map((amenity, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center text-sm font-normal text-gray-700"
                    whileHover={{ scale: 1.1, color: '#000000' }} 
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
    </motion.div>
);

// Resource & Action Banner Component
const FooterPromotionBanner = () => (
    <motion.div 
        className="mt-16 mb-20 p-8 bg-gray-800 rounded-2xl shadow-2xl text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
    >
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-teal-400 mb-2">
                Need More Than Listings?
            </h2>
            <p className="text-gray-400">
                Check out our essential resources or list your own property.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Action Card 1: List Property */}
            <motion.div
                className="flex flex-col items-center bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-600 transition duration-300"
                whileHover={{ scale: 1.03 }}
            >
                <ListPlus size={36} className="text-indigo-400 mb-3" />
                <p className="text-lg font-semibold mb-1">List Your Property</p>
                <p className="text-sm text-gray-400 text-center">Get verified tenants quickly and easily.</p>
            </motion.div>
            
            {/* Action Card 2: Explore Cities */}
            <motion.div
                className="flex flex-col items-center bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-600 transition duration-300"
                whileHover={{ scale: 1.03 }}
            >
                <Compass size={36} className="text-indigo-400 mb-3" />
                <p className="text-lg font-semibold mb-1">City Guides</p>
                <p className="text-sm text-gray-400 text-center">Read up on neighborhoods and rent trends.</p>
            </motion.div>
            
            {/* Action Card 3: Support */}
            <motion.div
                className="flex flex-col items-center bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-600 transition duration-300"
                whileHover={{ scale: 1.03 }}
            >
                <MessageCircle size={36} className="text-indigo-400 mb-3" />
                <p className="text-lg font-semibold mb-1">Contact Support</p>
                <p className="text-sm text-gray-400 text-center">Chat with our team for personalized help.</p>
            </motion.div>
        </div>
    </motion.div>
);


// --- Main App Component ---

const App = () => {
  // ✅ FIXED: Use React Router's useNavigate hook for proper navigation
  const navigate = useNavigate();

  // Function to reset all search/filter states
  const resetFiltersAndSearch = () => {
    setSearchText("");
    setOccupancyFilter("");
    setPriceMaxFilter(0);
    setActiveSearchText("");
    setActiveOccupancyFilter("");
    setActivePriceMaxFilter(0);
  };
  
  // State for search and filters
  const [searchText, setSearchText] = useState("");
  const [occupancyFilter, setOccupancyFilter] = useState("");
  const [priceMaxFilter, setPriceMaxFilter] = useState(0); 

  // State to hold the final applied filters (to trigger filtering on button click only)
  const [activeSearchText, setActiveSearchText] = useState("");
  const [activeOccupancyFilter, setActiveOccupancyFilter] = useState("");
  const [activePriceMaxFilter, setActivePriceMaxFilter] = useState(0);

  // Function to apply filters on button click
  const handleSearch = () => {
    setActiveSearchText(searchText.trim().toLowerCase());
    setActiveOccupancyFilter(occupancyFilter);
    setActivePriceMaxFilter(priceMaxFilter);
  };

  // Memoized list of properties filtered based on active state
  const filteredPgList = useMemo(() => {
    return pgList.filter(pg => {
      let matches = true;
      const lowerCaseLocation = pg.location.toLowerCase();

      // 1. Location Search Filter
      if (activeSearchText) {
        if (!lowerCaseLocation.includes(activeSearchText)) {
          matches = false;
        }
      }

      // 2. Occupancy Filter
      if (matches && activeOccupancyFilter) {
        // Updated logic to check for flexible occupancy options like Single/Double
        // We use 'includes' on the lower-cased occupancy type in the data.
        if (!pg.occupancy.toLowerCase().includes(activeOccupancyFilter.toLowerCase().replace('/', ' or '))) {
            matches = false;
        }
      }

      // 3. Price Max Filter
      if (matches && activePriceMaxFilter > 0) {
        if (pg.priceValue > activePriceMaxFilter) {
          matches = false;
        }
      }

      return matches;
    });
  }, [activeSearchText, activeOccupancyFilter, activePriceMaxFilter]);

  // Determine if there are search results
  const hasResults = filteredPgList.length > 0;


  return (
    // Add a style block to import and set the Poppins font and define custom utilities
    <>
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        /* Override Tailwind's default sans-serif font to Poppins */
        .font-sans {
          font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        
        /* Custom class for strong text shadow over image backgrounds */
        .text-shadow-strong {
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.7); 
        }
      `}
    </style>
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Header/Hero Section - Hero section size increased to pt-40 pb-40 */}
     <motion.header
  className="relative text-white pt-40 pb-40 shadow-2xl overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(0, 0, 0, 0.55),
        rgba(0, 0, 0, 0.35)
      ),
      url('https://i.pinimg.com/736x/25/76/c2/2576c2bb822de040ccb97119da04eb81.jpg')
    `, // UPDATED BACKGROUND IMAGE
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
      
      {/* Overlay to darken image */}
      <div className="absolute inset-0 bg-blue-900/70"></div>
      
      {/* ✅ FIXED Back Button with proper navigation */}
      <div className="absolute top-24 left-10 z-20">
        <motion.button
          onClick={() => navigate("/services")} // ✅ Now actually navigates to services page
          className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back 
        </motion.button>
      </div>


  {/* Animated Text Container */}
  <motion.div 
    className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
    variants={heroContainerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1 
      className="text-4xl md:text-6xl text-white font-extralight text-center mb-4 leading-tight tracking-wide"
      variants={heroTextLeftVariants}
    >
      Premium <span className="text-teal-400 font-light">PG</span> & Co-living Homes
    </motion.h1>

    <motion.p 
      className="text-center text-gray-200 text-lg md:text-xl font-light max-w-3xl mx-auto"
      variants={heroTextRightVariants}
    >
      Discover verified, professionally managed residences tailored for students and professionals.
    </motion.p>
  </motion.div>
</motion.header>


      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        
        {/* Filter Bar */}
        <SearchFilterBar 
          searchText={searchText}
          setSearchText={setSearchText}
          occupancyFilter={occupancyFilter}
          setOccupancyFilter={setOccupancyFilter}
          priceMaxFilter={priceMaxFilter}
          setPriceMaxFilter={setPriceMaxFilter}
          onSearch={handleSearch}
        />
        
        {/* Conditional Content: Results or No Results Message */}
        {!hasResults ? (
            <motion.div 
                className="text-center py-16 bg-white rounded-xl shadow-lg mb-20 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Shield size={48} className="mx-auto text-red-500 mb-4"/>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Matching Properties Found</h2>
                <p className="text-gray-600">Please try adjusting your search filters or clear them to see all listings.</p>
                <motion.button
                    className="mt-6 bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    onClick={resetFiltersAndSearch} // Calls the new, reusable reset function
                >
                    Clear Filters
                </motion.button>
            </motion.div>
        ) : (
            // Property Cards Grid
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPgList.map((pg) => (
                <PGCard key={pg.id} pg={pg} />
              ))}
            </motion.div>
        )}
        
        {/* RESOURCE & ACTION BAR (Footer-like element) */}
        <FooterPromotionBanner />

        {/* Final Footer Call to Action */}
        <motion.div 
            className="pt-10 pb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">Still exploring your options?</h2>
            <motion.button
                className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-indigo-700 transition duration-300"
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                Explore More Filtered Properties
            </motion.button>
        </motion.div>

      </div>
      
    </div>
    </>
  );
};

export default App;