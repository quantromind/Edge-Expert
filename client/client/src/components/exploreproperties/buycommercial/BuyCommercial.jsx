// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // Import ArrowLeft for the back button icon
// import { ArrowLeft } from "lucide-react"; 
// // import API from "../../../Api/axiosConfig";

// const BuyCommercial = () => {
//   const defaultImageUrl =
//     "https://img.freepik.com/free-vector/modern-office-building-flat-style_23-2147502524.jpg";

//   const [commercialData, setCommercialData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Helper function to format price
//   const formatPrice = (price) => {
//     if (typeof price === "string") return price;
//     if (price >= 10000000) {
//       return `₹${(price / 10000000).toFixed(2)} Cr`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000).toFixed(2)} Lac`;
//     } else {
//       return `₹${price.toLocaleString("en-IN")}`;
//     }
//   };

//   // Function to handle going back
//   const handleGoBack = () => {
//     window.history.back();
//   };

//   // Fetch commercial properties from API
//   useEffect(() => {
//     const fetchCommercialProperties = async () => {
//       try {
//         setLoading(true);
//         const response = await API.get("/commercial-properties");

//         if (response.data.success) {
//           // Transform the data to include formatted price
//           const transformedData = response.data.data.map((property) => ({
//             ...property,
//             price: formatPrice(property.price),
//             id: property._id || property.id, // Use MongoDB _id as id
//           }));
//           setCommercialData(transformedData);
//         } else {
//           setError("Failed to fetch commercial properties");
//         }
//       } catch (err) {
//         console.error("Error fetching commercial properties:", err);
//         setError("Failed to load commercial properties. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommercialProperties();
//   }, []);

//   return (
//     <div className="font-sans text-gray-800 bg-white">
//       {/* Hero Section */}
//       <section
//         className="relative h-[100vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
//         style={{
//           backgroundImage:
//             "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60"></div>

//         {/* Back to Services Button - NEW */}
//         <div className="absolute top-24 left-10 z-20">
//           <button
//             onClick={handleGoBack}
//             className="flex cursor-pointer items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </button>
//         </div>

//         <div className="relative text-center px-6 max-w-3xl mx-auto text-white">
//           <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight drop-shadow-lg">
//             <span className="text-yellow-400">Edge Expert</span> Commercial <br />
//             Properties
//           </h1>

//           <p className="text-lg font-semibold text-blue-50 drop-shadow-md">
//             Explore premium offices, shops, and showrooms in top business hubs. <br />
//             Discover your next business address with Edge Expert.
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto mt-16 px-4 md:px-6">
//         {/* Title Section */}
//         <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
//           Commercial Properties for Sale in Pimpri Chinchwad
//         </h2>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//             <p className="mt-4 text-gray-600">Loading commercial properties...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && !loading && (
//           <div className="text-center py-12">
//             <p className="text-red-600 text-lg">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && commercialData.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">No commercial properties available at the moment.</p>
//           </div>
//         )}

//         {/* Property Cards */}
//         {!loading && !error && commercialData.length > 0 && (
//           <div className="space-y-8">
//             {commercialData.map((property) => {
//             const imageUrl =
//               property.image || property.images?.[0] || defaultImageUrl;

//             return (
//               <div
//                 key={property._id || property.id}
//                 className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col md:flex-row"
//               >
//                 {/* Left - Image Section */}
//                 <div className="relative w-full md:w-1/3 group">
//                   <div className="relative w-full h-52 sm:h-56 overflow-hidden">
//                     <img
//                       src={imageUrl}
//                       alt={property.title}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = defaultImageUrl;
//                       }}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     />

//                     {/* Tag Badge */}
//                     {property.tags?.length > 0 && (
//                       <div className="absolute top-3 left-3">
//                         <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
//                           {property.tags[0]}
//                         </span>
//                       </div>
//                     )}

//                     {/* Posted Date Badge */}
//                     <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
//                       Posted: {property.posted}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Middle - Property Details */}
//                 <div className="flex-1 p-6 flex flex-col justify-between">
//                   <div>
//                     <Link
//                       to={`/commercial/${property._id || property.id}`}
//                       className="text-lg md:text-xl font-semibold text-blue-700 hover:underline"
//                     >
//                       {property.title}
//                     </Link>

//                     <p className="text-sm text-gray-600 mt-1">
//                       Complex:{" "}
//                       <span className="underline font-medium">
//                         {property.complex}
//                       </span>
//                     </p>

//                     {/* Property Info */}
//                     <div className="flex flex-wrap gap-8 mt-4 text-sm text-gray-700">
//                       <div>
//                         <p className="font-semibold">CARPET AREA</p>
//                         <p>{property.carpetArea}</p>
//                       </div>
//                       <div>
//                         <p className="font-semibold">STATUS</p>
//                         <p>{property.status}</p>
//                       </div>
//                       <div>
//                         <p className="font-semibold">WASHROOM</p>
//                         <p>{property.washroom}</p>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     <p className="mt-4 text-gray-600 text-sm leading-relaxed">
//                       {property.description}
//                     </p>
//                   </div>

//                   {/* View Details Button */}
//                   <div className="mt-6">
//                     <Link
//                       to={`/commercial/${property._id || property.id}`}
//                       className="text-red-600 font-semibold hover:underline text-sm"
//                     >
//                       ➜ View Property Details
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Right - Price & Contact */}
//                 <div className="md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col items-center justify-center p-6 bg-gray-50">
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     {property.price}
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {property.pricePerSqft}
//                   </p>

//                   <div className="flex flex-col gap-3 mt-6 w-full">
//                     <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full w-full transition-all duration-200">
//                       Contact Agent
//                     </button>
//                     <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-6 py-2 rounded-full w-full transition-all duration-200">
//                       Get Phone No.
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyCommercial;






import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const BuyCommercial = () => {
  const defaultImageUrl =
    "https://img.freepik.com/free-vector/modern-office-building-flat-style_23-2147502524.jpg";

  const [commercialData, setCommercialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format price
  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString("en-IN")}`;
    }
  };

  // Function to handle going back
  const handleGoBack = () => {
    window.history.back();
  };

  // Fetch commercial properties from API
  useEffect(() => {
    const fetchCommercialProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/commercialproperties");

        if (response.data.success) {
          // Transform the data to include formatted price
          const transformedData = response.data.data.map((property) => ({
            ...property,
            price: formatPrice(property.price),
            id: property._id || property.id,
          }));
          setCommercialData(transformedData);
        } else {
          setError("Failed to fetch commercial properties");
        }
      } catch (err) {
        console.error("Error fetching commercial properties:", err);
        setError("Failed to load commercial properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommercialProperties();
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] md:h-[70vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Back to Services Button */}
        <div className="absolute top-8 left-8 z-20">
          <button
            onClick={handleGoBack}
            className="flex cursor-pointer items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="relative text-center px-6 max-w-3xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-light mb-4 leading-tight drop-shadow-lg">
            <span className="text-yellow-400">Edge Expert</span> Commercial <br />
            Properties
          </h1>

          <p className="text-md font-semibold text-blue-50 drop-shadow-md">
            Explore premium offices, shops, and showrooms in top business hubs. <br />
            Discover your next business address with Edge Expert.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-16 px-4 md:px-6 mb-16">
        {/* Title Section */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 border-b pb-3">
          Commercial Properties for Sale in Pimpri Chinchwad ({commercialData.length})
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading commercial properties...</p>
          </div>
        )}

        {/* Error State (Will not show with successful mock data) */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State (Will not show with successful mock data) */}
        {!loading && !error && commercialData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No commercial properties available at the moment.</p>
          </div>
        )}

        {/* Property Cards */}
        {!loading && !error && commercialData.length > 0 && (
          <div className="space-y-10">
            {commercialData.map((property) => {
              const imageUrl =
                property.images?.[0] || property.image || defaultImageUrl;

              return (
                <div
                  key={property.id}
                  className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
                >
                  {/* Left - Image Section */}
                  <div className="relative w-full md:w-1/3 group">
                    <div className="relative w-full h-56 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={property.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultImageUrl;
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Tag Badge */}
                      {property.tags?.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                            {property.tags[0]}
                          </span>
                        </div>
                      )}

                      {/* Posted Date Badge */}
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                        Posted: {property.posted}
                      </span>
                    </div>
                  </div>

                  {/* Middle - Property Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/commercial/${property.id}`}
                        className="text-xl md:text-2xl font-bold text-blue-700 hover:text-red-600 transition-colors"
                      >
                        {property.title}
                      </Link>

                      <p className="text-sm text-gray-600 mt-2">
                        Complex:{" "}
                        <span className="underline font-medium text-gray-800">
                          {property.complex}
                        </span>
                      </p>

                      {/* Property Info */}
                      <div className="grid grid-cols-3 gap-4 mt-5 text-sm text-gray-700">
                        <div className="border-r border-gray-200 pr-4">
                          <p className="font-bold text-gray-500">CARPET AREA</p>
                          <p className="text-base font-semibold">{property.carpetArea}</p>
                        </div>
                        <div className="border-r border-gray-200 pr-4">
                          <p className="font-bold text-gray-500">STATUS</p>
                          <p className="text-base font-semibold">{property.status}</p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-500">WASHROOM</p>
                          <p className="text-base font-semibold">{property.washroom}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-5 text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {property.description}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-5 pt-3 border-t border-gray-100">
                      <Link
                        to={`/commercial/${property.id}`}
                        className="text-red-600 font-bold hover:text-blue-700 transition-colors text-base flex items-center gap-1"
                      >
                        {/* View Property Details  */}
                        {/* <ArrowLeft className="w-4 h-4 transform rotate-180" /> */}
                      </Link>
                    </div>
                  </div>

                  {/* Right - Price & Contact */}
                  <div className="md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col items-center justify-center p-6 bg-gray-50/70">
                    <h3 className="text-3xl font-extrabold text-red-600">
                      {property.price}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      {property.pricePerSqft}
                    </p>

                    <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg w-full transition-all duration-200 shadow-md">
                        Contact Agent
                      </button>
                      <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-6 py-2.5 rounded-lg w-full transition-all duration-200">
                        Get Phone No.
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCommercial;