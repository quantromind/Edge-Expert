import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Phone,
  Mail,
  Clock,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  Ruler,
  Building,
  Car,
  Wifi,
  Dumbbell,
  Camera,
  Bath,
  Bed,
  Wind,
  Shield,
  Dog,
  Coffee,
  Printer,
  Monitor,
  Eye,
  TrendingUp,
  School,
  ShoppingBag,
  Train,
  Bus,
  Search,
  Filter,
  Menu,
  ChevronRight,
  Home,
  Utensils,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ViewDetailsBuyResidential = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState([]);
  
  // Get the referrer from URL state or determine from current path
  const getBackPath = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    if (from) return `/${from}`;
    
    // Fallback: check document referrer
    const referrer = document.referrer;
    if (referrer.includes('/properties')) return '/properties';
    if (referrer.includes('/buyresidential')) return '/buyresidential';
    
    // Default fallback
    return '/properties';
  };

  // Handle call button click
  const handleCallClick = () => {
    const phoneNumber = property?.agent?.phone || "+91 73853 27808";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile device - open dialer
      window.open(`tel:${phoneNumber.replace(/\s+/g, '')}`);
    } else {
      // Desktop - copy number
      navigator.clipboard.writeText(phoneNumber);
      alert(`Phone number ${phoneNumber} copied to clipboard!`);
    }
  };

  // Handle email button click
  const handleEmailClick = () => {
    const agentEmail = property?.agent?.email || "sales@edgeexpert.com";
    const agentName = property?.agent?.name || "Agent";
    const subject = encodeURIComponent(`Inquiry about ${property?.title || "Property"}`);
    const propertyLink = window.location.href;
    const body = encodeURIComponent(
      `Hello ${agentName},\n\n` +
      `I am interested in: ${property?.title || "this property"}\n` +
      `Location: ${property?.location || "N/A"}\n` +
      `Price: ${property?.price || "N/A"}\n\n` +
      `Property Link: ${propertyLink}\n\n` +
      `Please provide more details.\n\n` +
      `Best regards`
    );
    
    const mailtoLink = `mailto:${agentEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  // Handle share button click
  const handleShareClick = () => {
    const shareUrl = window.location.href;
    const shareText = `Check out this amazing property: ${property.title} in ${property.location} for ${property.price}`;
    
    if (navigator.share) {
      // Use native Web Share API if available
      navigator.share({
        title: property.title,
        text: shareText,
        url: shareUrl
      });
    } else {
      // Fallback to custom share options
      const option = window.prompt(
        `Share this property:\n\n` +
        `1 - WhatsApp\n` +
        `2 - Copy Link\n` +
        `3 - Facebook\n` +
        `4 - Twitter\n\n` +
        `Enter your choice (1-4):`,
        '1'
      );
      
      if (option === '1') {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
      } else if (option === '2') {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      } else if (option === '3') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
      } else if (option === '4') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
      }
    }
  };

  // Fetch property details from API
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        let foundProperty = null;
        let allProperties = [];

        // 1. Try single property API by ID
        try {
          const propResponse = await fetch(`${apiUrl}/properties/${id}`);
          if (propResponse.ok) {
            const propData = await propResponse.json();
            if (propData.success && propData.data) {
              foundProperty = propData.data;
            }
          }
        } catch (e) {
          console.warn("Direct property fetch failed, checking alternatives:", e);
        }

        // 2. Try sellproperty API
        if (!foundProperty) {
          try {
            const sellResponse = await fetch(`${apiUrl}/sellproperty`);
            if (sellResponse.ok) {
              const sellData = await sellResponse.json();
              if (sellData.success && sellData.data) {
                allProperties = sellData.data;
                foundProperty = sellData.data.find(item => item._id === id);
              }
            }
          } catch (e) {
            console.warn("Sell property fetch failed:", e);
          }
        }

        // 3. Try newprojects API
        if (!foundProperty) {
          try {
            const newProjectResponse = await fetch(`${apiUrl}/newprojects`);
            if (newProjectResponse.ok) {
              const newProjectData = await newProjectResponse.json();
              if (newProjectData.success && newProjectData.data) {
                allProperties = newProjectData.data;
                foundProperty = newProjectData.data.find(item => item._id === id);
              }
            }
          } catch (e) {
            console.warn("New projects fetch failed:", e);
          }
        }

        if (foundProperty) {
          // Format price safely
          let formattedPrice = "Price on Request";
          if (foundProperty.price) {
            formattedPrice = foundProperty.price >= 10000000
              ? `₹${(foundProperty.price / 10000000).toFixed(2)} Cr`
              : `₹${(foundProperty.price / 100000).toFixed(2)} L`;
          } else if (foundProperty.startprice && foundProperty.endprice) {
            formattedPrice = `₹${(foundProperty.startprice / 10000000).toFixed(2)} - ₹${(foundProperty.endprice / 10000000).toFixed(2)} Cr`;
          } else if (foundProperty.startprice) {
            formattedPrice = `₹${(foundProperty.startprice / 10000000).toFixed(2)} Cr`;
          }

          // Format amenities safely
          let amenitiesArray = [];
          if (Array.isArray(foundProperty.amenities)) {
            amenitiesArray = foundProperty.amenities.flatMap(item => 
              typeof item === 'string' ? item.split(',').map(s => s.trim()).filter(Boolean) : [item]
            );
          } else if (typeof foundProperty.amenities === 'string') {
            amenitiesArray = foundProperty.amenities.split(',').map(s => s.trim()).filter(Boolean);
          }

          // Safe agent contact information
          const agentName = foundProperty.contactName || 
                            foundProperty.postedBy?.name || 
                            foundProperty.owner || 
                            foundProperty.builderName || 
                            "Edge Expert Agent";

          const agentPhone = foundProperty.contactPhone || 
                             foundProperty.postedBy?.phone || 
                             foundProperty.phone || 
                             "+91 73853 27808";

          const agentEmail = foundProperty.contactEmail || 
                             foundProperty.postedBy?.email || 
                             foundProperty.email || 
                             "contact@edgeexpert.com";

          const specialTag = foundProperty.postedByType || 
                             (foundProperty.postedBy?.role ? `${foundProperty.postedBy.role.charAt(0).toUpperCase() + foundProperty.postedBy.role.slice(1)}` : "Property Owner");

          const transformedProperty = {
            id: foundProperty._id,
            title: foundProperty.title || "Premium Property",
            location: foundProperty.location || foundProperty.city || "Mumbai",
            price: formattedPrice,
            images: foundProperty.images && foundProperty.images.length > 0 ? foundProperty.images : ["/no-image.jpg"],
            tags: [
              foundProperty.propertystatus || foundProperty.status || "Available", 
              foundProperty.type || foundProperty.propertyType || "Residential"
            ],
            purpose: foundProperty.transactionType || "Sale",
            overview: {
              description: foundProperty.description || `Beautiful property located in ${foundProperty.location || 'a prime neighborhood'}. This property offers modern amenities and excellent connectivity.`,
              longDescription: foundProperty.description 
                ? `${foundProperty.description} This property features contemporary design with premium finishes and is situated in a prime location with easy access to major landmarks.` 
                : "This property features contemporary design with premium finishes and is situated in a prime location with easy access to major landmarks.",
              keyPoints: amenitiesArray.length > 0 
                ? amenitiesArray.slice(0, 4)
                : ["Prime Location", "Modern Amenities", "Ready to Move", "Good Connectivity"]
            },
            details: {
              type: foundProperty.type || foundProperty.propertyType || "Residential Property",
              bhk: (() => {
                if (foundProperty.bedrooms) return `${foundProperty.bedrooms} BHK`;
                const title = foundProperty.title || "";
                const type = foundProperty.type || foundProperty.propertyType || "";
                const bhkMatch = (title + " " + type).match(/(\d+)\s*BHK/i);
                return bhkMatch ? `${bhkMatch[1]} BHK` : "N/A";
              })(),
              baths: foundProperty.bathrooms ? `${foundProperty.bathrooms} Baths` : "N/A",
              superArea: foundProperty.area ? `${foundProperty.area} sq.ft` : (foundProperty.carpetArea ? `${foundProperty.carpetArea} sq.ft` : "N/A"),
              floor: foundProperty.floor ? `${foundProperty.floor}${foundProperty.totalFloors ? ` of ${foundProperty.totalFloors}` : ''}` : "Multiple",
              furnishing: foundProperty.furnishing || foundProperty.propertystatus || "N/A"
            },
            agent: {
              name: agentName,
              phone: agentPhone,
              email: agentEmail,
              specialTag: specialTag,
              rating: 4.8,
              reviews: 25
            },
            amenitiesList: amenitiesArray
          };

          setProperty(transformedProperty);

          // Set similar properties
          if (allProperties && allProperties.length > 0) {
            const others = allProperties
              .filter(item => item._id !== id)
              .slice(0, 4)
              .map(item => {
                let itemPrice = "Price on Request";
                if (item.price) {
                  itemPrice = item.price >= 10000000 
                    ? `₹${(item.price / 10000000).toFixed(2)} Cr` 
                    : `₹${(item.price / 100000).toFixed(2)} L`;
                } else if (item.startprice && item.endprice) {
                  itemPrice = `₹${(item.startprice / 10000000).toFixed(2)} - ₹${(item.endprice / 10000000).toFixed(2)} Cr`;
                }

                return {
                  id: item._id,
                  title: item.title,
                  location: item.location,
                  price: itemPrice,
                  images: item.images || ["/no-image.jpg"],
                  details: {
                    bhk: item.bedrooms ? `${item.bedrooms} BHK` : (() => {
                      const title = item.title || "";
                      const type = item.type || "";
                      const bhkMatch = (title + " " + type).match(/(\d+)\s*BHK/i);
                      return bhkMatch ? `${bhkMatch[1]} bed` : "N/A";
                    })(),
                    baths: item.bathrooms ? `${item.bathrooms}` : "N/A"
                  }
                };
              });
            setSimilarProperties(others);
          }
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl text-gray-900 mb-3">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            We couldn't find the property you're looking for.
          </p>
          <button
            onClick={() => navigate("/buyresidential")}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Browse All Properties
          </button>
        </div>
      </div>
    );
  }

  // Enhanced amenities data
  const propertyAmenities = [
    { name: "Air Conditioning", icon: Wind, available: true },
    { name: "Fitness Center", icon: Dumbbell, available: true },
    { name: "Swimming Pool", icon: "🏊", available: true },
    { name: "Parking", icon: Car, available: true },
    { name: "Pet Friendly", icon: Dog, available: true },
    { name: "High-Speed WiFi", icon: Wifi, available: true },
    { name: "Business Center", icon: Printer, available: false },
    { name: "Coffee Bar", icon: Coffee, available: false },
    { name: "24/7 Security", icon: Shield, available: true },
    { name: "Package Service", icon: "📦", available: true },
    { name: "Concierge", icon: "🎩", available: true },
    { name: "Rooftop Terrace", icon: "🏙️", available: true },
  ];

  const unitAmenities = [
    { name: "Hardwood Floors", available: true },
    { name: "Walk-in Closet", available: true },
    { name: "Granite Countertops", available: true },
    { name: "Stainless Steel Appliances", available: true },
    { name: "In-Unit Washer/Dryer", available: true },
    { name: "Balcony/Patio", available: true },
    { name: "Dishwasher", available: true },
    { name: "Central Air", available: true },
    { name: "Smart Home Features", available: true },
    { name: "Energy Efficient", available: true },
  ];

  // Enhanced nearby places data
  // Helper function to get appropriate icon for amenities
  const getAmenityIcon = (amenityName) => {
    const name = amenityName.toLowerCase();
    if (name.includes('wifi') || name.includes('internet')) return Wifi;
    if (name.includes('parking') || name.includes('car')) return Car;
    if (name.includes('gym') || name.includes('fitness')) return Dumbbell;
    if (name.includes('pool') || name.includes('swimming')) return '🏊';
    if (name.includes('security')) return Shield;
    if (name.includes('air') || name.includes('ac')) return Wind;
    if (name.includes('garden') || name.includes('park')) return '🌳';
    if (name.includes('elevator') || name.includes('lift')) return '🛗';
    return CheckCircle; // Default icon
  };

  const nearbyPlaces = [
    {
      name: "Supermarket",
      distance: "0.5 miles",
      icon: ShoppingBag,
      walkTime: "10 min",
    },
    {
      name: "Elementary School",
      distance: "0.8 miles",
      icon: School,
      walkTime: "15 min",
    },
    {
      name: "Metro Station",
      distance: "0.3 miles",
      icon: Train,
      walkTime: "6 min",
    },
    { name: "Bus Stop", distance: "0.1 miles", icon: Bus, walkTime: "2 min" },
    {
      name: "Shopping Center",
      distance: "1.2 miles",
      icon: ShoppingBag,
      walkTime: "25 min",
    },
    {
      name: "Hospital",
      distance: "2.5 miles",
      icon: "🏥",
      walkTime: "8 min drive",
    },
    {
      name: "Restaurants",
      distance: "0.2 miles",
      icon: Utensils,
      walkTime: "4 min",
    },
    { name: "Park", distance: "0.4 miles", icon: "🌳", walkTime: "8 min" },
  ];

  const OverviewContent = () => (
    <div className="space-y-8">
      {/* Property Description */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl text-gray-900 mb-6">
          About This Property
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          {property.overview.description}
        </p>
        {property.overview.longDescription && (
          <p className="text-gray-700 leading-relaxed">
            {property.overview.longDescription}
          </p>
        )}
      </div>



      {/* Property Details Grid */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
        <h4 className="text-2xl mb-8">Property Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Bed className="w-8 h-8" />
            </div>
            <div className="text-3xl">
              {property.details.bhk || "N/A"}
            </div>
            <div className="text-blue-100">Beds</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Bath className="w-8 h-8" />
            </div>
            <div className="text-3xl">
              {property.details.baths || "N/A"}
            </div>
            <div className="text-blue-100">Baths</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Ruler className="w-8 h-8" />
            </div>
            <div className="text-3xl">
              {property.details.superArea}
            </div>
            <div className="text-blue-100">Sq Ft</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Building className="w-8 h-8" />
            </div>
            <div className="text-3xl">{property.details.floor}</div>
            <div className="text-blue-100">Floor</div>
          </div>
        </div>
      </div>
    </div>
  );

  const AmenitiesContent = () => {
    // Create dynamic amenities from API data
    const dynamicAmenities = (property.amenitiesList && property.amenitiesList.length > 0) 
      ? property.amenitiesList.map((amenity, index) => ({
          name: amenity,
          icon: getAmenityIcon(amenity),
          available: true
        }))
      : [];
    
    // Combine with static amenities if needed
    const allAmenities = dynamicAmenities.length > 0 ? dynamicAmenities : propertyAmenities;
    
    return (
    <div className="space-y-8">
      {/* Property Amenities */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl text-gray-900 mb-8">
          Property Amenities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAmenities.map((amenity, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${amenity.available
                  ? "border-green-200 bg-green-50 hover:border-green-300 hover:bg-green-100"
                  : "border-gray-200 bg-gray-50 opacity-60"
                }`}
            >
              {typeof amenity.icon === "string" ? (
                <span className="text-2xl">{amenity.icon}</span>
              ) : (
                <amenity.icon className="w-6 h-6 text-gray-600" />
              )}
              <span
                className={`font-medium flex-1 ${amenity.available ? "text-gray-900" : "text-gray-500"
                  }`}
              >
                {amenity.name}
              </span>
              {!amenity.available && (
                <span className="text-xs font-semibold text-red-500 px-2 py-1 bg-red-100 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Unit Amenities */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl text-gray-900 mb-8">
          Unit Amenities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unitAmenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-green-200 bg-green-50 hover:border-green-300 hover:bg-green-100 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  };

  const LocationContent = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl text-gray-900 mb-8">
          Location & Neighborhood
        </h3>

        {/* Location Header */}
        <div className="flex items-start gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 text-xl mb-2">
              {property.location}
            </h4>
            <p className="text-gray-600">
              Prime location in one of the most sought-after neighborhoods with
              excellent connectivity, amenities, and vibrant community life.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nearby Places */}
          <div>
            <h5 className="text-gray-900 text-lg mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              What's Nearby
            </h5>
            <div className="space-y-3">
              {nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {typeof place.icon === "string" ? (
                      <span className="text-2xl">{place.icon}</span>
                    ) : (
                      <place.icon className="w-5 h-5 text-gray-600" />
                    )}
                    <div>
                      <span className="text-gray-900 block">
                        {place.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {place.walkTime} walk
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-900 bg-white px-3 py-1 rounded-full border">
                    {place.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div>
            <h5 className="font-semibold text-gray-900 text-lg mb-6 flex items-center gap-2">
              <Train className="w-5 h-5 text-red-500" />
              Transportation
            </h5>
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Train className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      Metro Station
                    </span>
                    <span className="text-sm text-gray-500">
                      Blue Line • Downtown Express
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">0.3 miles • 6 min walk</span>
                  <span className="font-medium text-green-600">
                    Every 5-8 min
                  </span>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Bus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      Bus Stop
                    </span>
                    <span className="text-sm text-gray-500">
                      Routes 12, 45, 78
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">0.1 miles • 2 min walk</span>
                  <span className="font-medium text-green-600">
                    Every 10-15 min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />;
      case "amenities":
        return <AmenitiesContent />;
      case "location":
        return <LocationContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-15">
      
    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Breadcrumb and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4 lg:mb-0">
            <button
              onClick={() => navigate(getBackPath())}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {property.location}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleShareClick}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 transition-colors font-medium px-4 py-2 rounded-lg border ${isFavorite
                  ? "text-red-600 border-red-200 bg-red-50"
                  : "text-gray-600 border-gray-200 bg-white hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
              Save
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Main Content - Left Side */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Image Gallery */}
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
                <div className="aspect-w-16 aspect-h-9 h-64 sm:h-80 lg:h-96">
                  <img
                    src={property.images[selectedImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {property.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-24 h-16 rounded-xl border-2 transition-all duration-300 ${selectedImage === index
                              ? "border-white ring-3 ring-red-500 shadow-lg"
                              : "border-white/80 hover:border-white hover:scale-105"
                            }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Counter */}
                <div className="absolute top-6 right-6 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                  <Camera className="w-4 h-4 inline mr-2" />
                  {selectedImage + 1} / {property.images.length}
                </div>
              </div>
            </div>

            {/* Enhanced Property Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 mb-6">
                <div className="flex-1">
                  {/* Property Title Section */}
                  <div className="mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-gray-200">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <span className="text-lg">{property.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {property.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full shadow-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Property Description Preview */}
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {property.overview.description.substring(0, 120)}...
                    </p>
                  </div>
                </div>

                {/* Price Section */}
                <div className="text-left lg:text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2">
                    {property.price}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium inline-block">
                      Available Now
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      Ready to Move In
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-100">
              <nav className="flex space-x-4 lg:space-x-8 px-4 lg:px-8 overflow-x-auto">
                {[
                  { id: "overview", label: "Overview", icon: Home },
                  { id: "amenities", label: "Amenities", icon: Dumbbell },
                  { id: "location", label: "Location", icon: MapPin },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 lg:py-6 px-1 border-b-2 transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Similar Properties
                  </h3>
                  <button 
                    onClick={() => navigate("/projects")}
                    className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-2"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((similar) => (
                    <div
                      key={similar.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      onClick={() => navigate(`/buyresidential/${similar.id}`)}
                    >
                      <div className="relative">
                        <img
                          src={similar.images[0]}
                          alt={similar.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {similar.price}
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">
                          {similar.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {similar.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              <span>{similar.details.bhk} bed</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4" />
                              <span>{similar.details.baths} bath</span>
                            </div>
                          </div>
                          <div className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-1">
                            View <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar - Right Side */}
          <div className="w-full lg:w-96 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-4 lg:space-y-6">
              {/* Enhanced Contact Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {property.agent?.name
                      ? property.agent.name
                          .split(" ")
                          .filter(Boolean)
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "EE"}
                  </div>
                  <div>
                    <h4 className="text-gray-900 text-xl font-bold mb-1">
                      {property.agent?.name || "Property Consultant"}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {property.agent?.specialTag || "Verified Partner"}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(property.agent?.rating || 4.5)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        ({property.agent?.reviews || 25} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleCallClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                      ? `Call ${property.agent?.phone || "+91 98765 43210"}` 
                      : `Copy ${property.agent?.phone || "+91 98765 43210"}`}
                  </button>
                  <button 
                    onClick={handleEmailClick}
                    className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    Email Agent
                  </button>
                </div>
              </div>

              {/* Enhanced Schedule Tour */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  Schedule a Tour
                </h4>
                <div className="space-y-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 appearance-none bg-white">
                      <option>Select Time</option>
                      <option>10:00 AM - 11:00 AM</option>
                      <option>02:00 PM - 03:00 PM</option>
                      <option>05:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    Schedule Tour
                  </button>
                </div>
              </div>

              {/* Enhanced Quick Facts */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 text-xl mb-6">
                  Property Facts
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {property.details.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Furnishing</span>
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {property.details.furnishing}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Floor Level</span>
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {property.details.floor}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Immediate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewDetailsBuyResidential;