// import React from "react";

// /* ---------- Simple Reusable Components ---------- */
// const Card = ({ children }) => (
//   <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
//     {children}
//   </div>
// );

// const CardContent = ({ children }) => (
//   <div className="p-4">{children}</div>
// );

// const Button = ({ children, className = "" }) => (
//   <button
//     className={`bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${className}`}
//   >
//     {children}
//   </button>
// );

// /* ---------- Dummy Property Data (Later replace with API) ---------- */
// const properties = [
//   {
//     id: 1,
//     title: "Luxury 3 BHK Apartment",
//     location: "Andheri West, Mumbaii",
//     image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
//     rent: "₹45,000 / month",
//     price: "₹1.85 Cr",
//   },
//   {
//     id: 2,
//     title: "Modern Villa with Garden",
//     location: "Whitefield, Bangalore",
//     image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
//     rent: "₹65,000 / month",
//     price: "₹2.75 Cr",
//   },
//   {
//     id: 3,
//     title: "Affordable 2 BHK Flat",
//     location: "Wakad, Pune",
//     image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
//     rent: "₹22,000 / month",
//     price: "₹72 Lakh",
//   },
//   {
//     id: 4,
//     title: "Premium Sea View Apartment",
//     location: "Juhu, Mumbai",
//     image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
//     rent: "₹1,10,000 / month",
//     price: "₹5.2 Cr",
//   },
// ];

// export default function HomePage({ userData, dashboardData }) {
//   const customerName = userData?.name?.split(" ")[0] || "Customer";

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <div className="mb-8 px-6 pt-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Good morning, {customerName}
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Find your next dream property today
//         </p>
//       </div>

//       {/* HERO */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//         <div className="max-w-7xl mx-auto px-6 py-20 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Find Your Perfect Home
//           </h2>
//           <p className="text-lg md:text-xl mb-8 opacity-90">
//             Buy or Rent properties across India at the best price
//           </p>

//           <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4 flex gap-3 shadow-lg">
//             <input
//               type="text"
//               placeholder="Search by city, locality or project"
//               className="flex-1 outline-none text-gray-700 px-2"
//             />
//             <Button>Search</Button>
//           </div>
//         </div>
//       </section>

//       {/* PROPERTIES */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <h3 className="text-3xl font-bold mb-10">Featured Properties</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {properties.map((property) => (
//             <div key={property.id} className="hover:scale-105 transition">
//               <Card>
//                 <img
//                   src={property.image}
//                   alt={property.title}
//                   className="h-48 w-full object-cover"
//                 />
//                 <CardContent>
//                   <h4 className="font-semibold text-lg mb-1">
//                     {property.title}
//                   </h4>
//                   <p className="text-sm text-gray-500 mb-3">
//                     {property.location}
//                   </p>

//                   <div className="flex justify-between mb-3">
//                     <div>
//                       <p className="text-xs text-gray-400">Rent</p>
//                       <p className="font-semibold text-green-600">
//                         {property.rent}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-400">Buy</p>
//                       <p className="font-semibold text-blue-600">
//                         {property.price}
//                       </p>
//                     </div>
//                   </div>

//                   <Button className="w-full">View Details</Button>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-gray-300">
//         <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h4 className="text-xl font-bold text-white mb-3">Edge Expert</h4>
//             <p className="text-sm">
//               India’s trusted property marketplace for buying and renting homes.
//             </p>
//           </div>
//           <div>
//             <h5 className="font-semibold text-white mb-3">Quick Links</h5>
//             <ul className="space-y-2 text-sm">
//               <li>Buy Property</li>
//               <li>Rent Property</li>
//               <li>Sell Property</li>
//               <li>Contact Us</li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="font-semibold text-white mb-3">Contact</h5>
//             <p className="text-sm">Email: support@edgeexpert.com</p>
//             <p className="text-sm">Phone: +91 90000 00000</p>
//           </div>
//         </div>

//         <div className="text-center text-sm border-t border-gray-700 py-4">
//           © {new Date().getFullYear()} Edge Expert. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";

/* ---------- Simple Reusable Components ---------- */
const Card = ({ children }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

const Button = ({ children, className = "" }) => (
  <button
    className={`bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);

/* ---------- Default Static Data (Fallback) ---------- */
const defaultProperties = [
  {
    id: 1,
    title: "Luxury 3 BHK Apartment",
    location: "Andheri West, Mumbai",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    rent: "₹45,000 / month",
    price: "₹1.85 Cr",
  },
  {
    id: 2,
    title: "Modern Villa with Garden",
    location: "Whitefield, Bangalore",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    rent: "₹65,000 / month",
    price: "₹2.75 Cr",
  },
  {
    id: 3,
    title: "Affordable 2 BHK Flat",
    location: "Wakad, Pune",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    rent: "₹22,000 / month",
    price: "₹72 Lakh",
  },
  {
    id: 4,
    title: "Premium Sea View Apartment",
    location: "Juhu, Mumbai",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    rent: "₹1,10,000 / month",
    price: "₹5.2 Cr",
  },
];

export default function HomePage({ userData }) {
  const customerName = userData?.name?.split(" ")[0] || "Customer";

  const [properties, setProperties] = useState(defaultProperties);
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch from Backend ---------- */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/properties"
        );

        if (res.data && res.data.length > 0) {
          setProperties(res.data);
        }
      } catch (error) {
        console.warn(
          "Backend not available, using static data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="mb-8 px-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, {customerName}
        </h1>
        <p className="text-gray-600 mt-1">
          Find your next dream property today
        </p>
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Home
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Buy or Rent properties across India at the best price
          </p>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4 flex gap-3 shadow-lg">
            <input
              type="text"
              placeholder="Search by city, locality or project"
              className="flex-1 outline-none text-gray-700 px-2"
            />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-10">
          Featured Properties
        </h3>

        {loading ? (
          <p className="text-gray-500">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property) => (
              <div
                key={property._id || property.id}
                className="hover:scale-105 transition"
              >
                <Card>
                 <img
                src={
               Array.isArray(property.images) && property.images.length > 0
               ? `http://localhost:5000${property.images[0]}`
                : property.image || "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={property.title}
                className="h-48 w-full object-cover"
                 />

                  <CardContent>
                    <h4 className="font-semibold text-lg mb-1">
                      {property.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {property.location}
                    </p>

                    <div className="flex justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-400">Rent</p>
                        <p className="font-semibold text-green-600">
                          {property.rent}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Buy</p>
                        <p className="font-semibold text-blue-600">
                          {property.price}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
          ))}
          </div>
          )}
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-3">
              Edge Expert
            </h4>
            <p className="text-sm">
              India’s trusted property marketplace for buying and renting homes.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              <li>Buy Property</li>
              <li>Rent Property</li>
              <li>Sell Property</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">
              Contact
            </h5>
            <p className="text-sm">
              Email: support@edgeexpert.com
            </p>
            <p className="text-sm">
              Phone: +91 90000 00000
            </p>
          </div>
        </div>

        <div className="text-center text-sm border-t border-gray-700 py-4">
          © {new Date().getFullYear()} Edge Expert. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
