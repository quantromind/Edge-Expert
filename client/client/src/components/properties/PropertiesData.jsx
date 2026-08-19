const properties = [
  // 1. 4BHK Luxury Apartment (Buy/Featured)
  {
    id: 1,
    title: "The Grandeur - 4BHK Apartment",
    location: "Koregaon Park, Pune",
    images: [
      "https://i.pinimg.com/1200x/3f/94/fe/3f94fef456745db8384611f5f865cbce.jpg",
      "https://i.pinimg.com/1200x/fe/f0/1b/fef01be457e6d78f7df4b49d9f71c242.jpg",
      "https://images.unsplash.com/photo-1556912176-ed1678f14227?w=800&auto=format&fit=crop",
    ],
    overview: {
      description:
        "An opulent 4BHK residence in Pune's most exclusive locality. Features smart home technology, private elevator access, and a terrace garden.",
    },
    details: {
      type: "Apartment",
      floor: "7 of 12",
      furnishing: "Semi-Furnished",
      facing: "East",
      overlooking: "Garden, City Skyline",
      superArea: "3800 sq.ft",
      carpetArea: "3200 sq.ft",
      status: "Ready to Move",
      possession: "Immediate",
      transactionType: "Resale",
      bhk: 4,
      baths: 4.5,
      size: "3800 sq.ft",
      loanAmount: 25000000,
      interestRate: 8.7,
      loanTenure: 15,
      monthlyEMI: 247650, // Calculated value (approx)
      totalInterestPayable: 19577000, // Calculated value (approx)
    },
    agent: {
      name: "Ravi Kumar",
      email: "ravi.k@edgeexpert.com",
      phone: "9876543210",
      rating: 4.5,
      reviews: 22,
      specialTag: "Certified Agent",
    },
    price: "₹3.5 Cr",
    purpose: "Buy",
    tags: ["Featured", "For Sale"],
  },

  // 2. 3BHK Apartment (Buy - Matches Screenshot Styling)
  {
    id: 9, // Using 9 for continuity with the previous example
    title: "Sea View Luxury 3BHK",
    location: "Bandra West, Mumbai",
    images: [
      "https://i.pinimg.com/1200x/94/b4/2e/94b42eacdbd88297ca59199e3b6772c5.jpg", // Main exterior (Card view)
      "https://i.imgur.com/K72G27C.png", // Interior image 1
      "https://i.imgur.com/vHqJ92C.png", // Interior image 2
    ],
    overview: {
      description:
        "An exquisite 3BHK luxury apartment offering unparalleled city and sea views. Located on Carter Road, it provides high-end finishes and world-class amenities.",
    },
    details: {
      type: "Apartment",
      floor: "15 of 20",
      furnishing: "Semi-Furnished",
      facing: "West",
      overlooking: "Sea View, Bandra Worli Sealink",
      superArea: "2800 sq.ft",
      carpetArea: "2200 sq.ft",
      status: "Ready to Move",
      possession: "Immediate",
      transactionType: "Resale",
      bhk: 3,
      baths: 3,
      size: "2800 sq.ft",
      loanAmount: 95000000,
      interestRate: 8.5,
      loanTenure: 20,
      monthlyEMI: 827284,
      totalInterestPayable: 103548175,
    },
    agent: {
      name: "Amit Kapoor",
      email: "amit@edgeexpert.com",
      phone: "9876543210",
      rating: 4.9,
      reviews: 42,
      specialTag: "edgeexpert.com Agent",
    },
    price: "₹9.5L",
    purpose: "Buy",
    tags: ["Featured", "For Sale"],
  },

  // 3. Residential Plot (Buy)
  {
    id: 2,
    title: "Prime Corner Plot",
    location: "Hinjewadi Phase 3, Pune",
    images: [
      "https://i.pinimg.com/736x/6d/0c/68/6d0c6858e5a735ebabcb0fc1b6842c82.jpg",
    ],
    overview: {
      description:
        "A premium, corner-facing residential plot in the rapidly developing area of Hinjewadi Phase 3. Ready for construction with all clearances.",
    },
    details: {
      type: "Plot (Residential)",
      floor: "N/A",
      furnishing: "N/A",
      facing: "North-East",
      overlooking: "Park, Main Road",
      superArea: "2500 sq.ft",
      carpetArea: "2500 sq.ft (Built-up area possible)",
      status: "New Property",
      possession: "Immediate",
      transactionType: "New Booking",
      bhk: null,
      baths: null,
      size: "2500 sq.ft",
      // Plot/Land typically doesn't use the same calculator
      loanAmount: null,
    },
    agent: {
      name: "Sunita Deshmukh",
      email: "sunita@edgeexpert.com",
      phone: "9876501234",
      rating: 4.7,
      reviews: 30,
      specialTag: "Certified Agent",
    },
    price: "₹ 75L",
    purpose: "Buy",
    tags: ["New"],
  },

  // 4. PG Accommodation (Rent/Featured)
  {
    id: 3,
    title: "The Urban Nest - Luxury PG",
    location: "Viman Nagar, Pune",
    images: [
      "https://i.pinimg.com/1200x/12/0e/23/120e23ed63a1967da43a2a6a97b33306.jpg",
      "https://content.jdmagicbox.com/v2/comp/pune/r2/020pxx20.xx20.250129153024.t5r2/catalogue/go17wb63qzc7ftr-ccpjp5wb1e.jpg",
    ],
    overview: {
      description:
        "High-end PG accommodation for students and professionals. Includes food, laundry, fast WiFi, and private/shared room options.",
    },
    details: {
      type: "PG / Co-living",
      floor: "2 of 4",
      furnishing: "Fully Furnished",
      facing: "West",
      overlooking: "Street",
      superArea: "150 sq.ft (Per bed/room)",
      carpetArea: "150 sq.ft",
      status: "Available",
      possession: "Immediate",
      transactionType: "Rent (Monthly)",
      bhk: 1, // Represents one bed/room space
      baths: 1, // Shared/Attached
      size: "Shared Room",
      loanAmount: null,
    },
    agent: {
      name: "Rahul Mehta",
      email: "rahul@edgeexpert.com",
      phone: "9876512345",
      rating: 4.6,
      reviews: 18,
      specialTag: "PG Specialist",
    },
    price: "₹12K /month",
    purpose: "Rent",
    tags: ["Featured", "For Rent"],
  },

  // 5. 2BHK Apartment (Rent)
  {
    id: 10,
    title: "Modern 2BHK for Rent",
    location: "Whitefield, Bengaluru",
    images: [
      "https://i.pinimg.com/1200x/ac/36/e8/ac36e88489a013801f2b0a464a73513c.jpg",
      "https://website-data-pluckwalk.s3-ap-south-1.amazonaws.com/test/9ufezN4BkyR5cTy4bmo3EP.jpeg",
      "https://website-data-pluckwalk.s3-ap-south-1.amazonaws.com/test/9ufezN4BkyR5cTy4bmo3EP.jpeg",
    ],
    overview: {
      description:
        "A spacious and modern 2BHK apartment in a gated community in Whitefield. Excellent amenities, ideal for families or working professionals.",
    },
    details: {
      type: "Apartment",
      floor: "5 of 8",
      furnishing: "Semi-Furnished",
      facing: "North",
      overlooking: "Pool, Garden",
      superArea: "1250 sq.ft",
      carpetArea: "1050 sq.ft",
      status: "Available",
      possession: "From Dec 2024",
      transactionType: "Rent (Yearly Lease)",
      bhk: 2,
      baths: 2,
      size: "1250 sq.ft",
      loanAmount: null,
    },
    agent: {
      name: "Neha Sharma",
      email: "neha@edgeexpert.com",
      phone: "9876523456",
      rating: 4.8,
      reviews: 25,
      specialTag: "Certified Agent",
    },
    price: "₹35K /month",
    purpose: "Rent",
    tags: ["New", "For Rent"],
  },

  // 6. 3BHK Rowhouse (Buy)
  {
    id: 5,
    title: "Premium 3BHK Rowhouse",
    location: "Sholinganallur, Chennai",
    images: [
      "https://i.pinimg.com/1200x/30/73/b7/3073b730fa375d95d22a69e30460e493.jpg",
    ],
    overview: {
      description:
        "A stylish 3BHK independent rowhouse with a private terrace and two dedicated parking spaces. Located near IT corridors.",
    },
    details: {
      type: "Rowhouse / Villa",
      floor: "G+1",
      furnishing: "Semi-Furnished",
      facing: "South",
      overlooking: "Street",
      superArea: "1900 sq.ft",
      carpetArea: "1750 sq.ft",
      status: "Ready to Move",
      possession: "Immediate",
      transactionType: "Resale",
      bhk: 3,
      baths: 2,
      size: "1900 sq.ft",
      loanAmount: 12000000,
      interestRate: 8.9,
      loanTenure: 25,
      monthlyEMI: 100418,
      totalInterestPayable: 18125435,
    },
    agent: {
      name: "Suresh Menon",
      email: "suresh@edgeexpert.com",
      phone: "9876534567",
      rating: 4.5,
      reviews: 20,
      specialTag: "Certified Agent",
    },
    price: "₹1.8 Cr",
    purpose: "Buy",
    tags: ["Discount"],
  },

  // 7. PG Accommodation (Rent - Budget-friendly)
  {
    id: 8,
    title: "Budget PG for Professionals",
    location: "Andheri East, Mumbai",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: {
      description:
        "A budget-friendly PG near the Andheri metro station. Suitable for working professionals. Shared rooms with basic amenities.",
    },
    details: {
      type: "PG / Co-living",
      floor: "3 of 6",
      furnishing: "Fully Furnished (Basic)",
      facing: "East",
      overlooking: "City",
      superArea: "200 sq.ft (Per bed)",
      carpetArea: "200 sq.ft",
      status: "Available",
      possession: "Immediate",
      transactionType: "Rent (Monthly)",
      bhk: 1, // Represents one bed/room space
      baths: 1, // Shared/Common
      size: "Triple Sharing",
      loanAmount: null,
    },
    agent: {
      name: "Anjali Nair",
      email: "anjali@edgeexpert.com",
      phone: "9876567890",
      rating: 4.8,
      reviews: 22,
      specialTag: "PG Manager",
    },
    price: "₹8K /month",
    purpose: "Rent",
    tags: ["Discount", "For Rent"],
  },

  // 8. 2BHK Apartment (Buy - Mid-range)
  {
    id: 7,
    title: "Spacious 2BHK Near Tech Park",
    location: "Gachibowli, Hyderabad",
    images: [
      "https://i.pinimg.com/736x/69/91/a0/6991a06d2c0dfea1f6efa46286d65a81.jpg",
    ],
    overview: {
      description:
        "A spacious, well-maintained 2BHK apartment ideal for families working in the nearby IT hubs. Excellent community and security.",
    },
    details: {
      type: "Apartment",
      floor: "4 of 10",
      furnishing: "Unfurnished",
      facing: "North",
      overlooking: "Park",
      superArea: "1400 sq.ft",
      carpetArea: "1150 sq.ft",
      status: "Ready to Move",
      possession: "Immediate",
      transactionType: "Resale",
      bhk: 2,
      baths: 2,
      size: "1400 sq.ft",
      loanAmount: 8500000,
      interestRate: 8.8,
      loanTenure: 20,
      monthlyEMI: 74640,
      totalInterestPayable: 9387490,
    },
    agent: {
      name: "Vikas Patil",
      email: "vikas@edgeexpert.com",
      phone: "9876556789",
      rating: 4.7,
      reviews: 28,
      specialTag: "Certified Agent",
    },
    price: "₹85 L",
    purpose: "Buy",
    tags: ["Featured", "For Sale"],
  },

  // NEWLY ADDED PROPERTIES FOR ENHANCED DATA

  // 9. Luxury Penthouse (Buy)
  {
    id: 11,
    title: "Skyline Penthouse with Private Pool",
    location: "Worli, Mumbai",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    overview: {
      description:
        "An exquisite penthouse offering breathtaking sea views, private infinity pool, and premium amenities. Perfect for luxury living with state-of-the-art facilities.",
      longDescription:
        "This magnificent penthouse redefines luxury living with its expansive spaces, high ceilings, and panoramic views of the Arabian Sea. The property features a private infinity pool, dedicated home theater, wine cellar, and smart home automation. Located in one of Mumbai's most prestigious neighborhoods, it offers unparalleled privacy and exclusivity.",
      keyPoints: [
        "Private infinity pool with sea view",
        "Smart home automation system",
        "Dedicated home theater and wine cellar",
        "360-degree panoramic views",
        "Premium imported finishes",
      ],
    },
    details: {
      type: "Penthouse",
      floor: "28 of 30",
      furnishing: "Fully Furnished",
      facing: "West",
      overlooking: "Sea View, City Skyline",
      superArea: "5500 sq.ft",
      carpetArea: "4800 sq.ft",
      status: "Ready to Move",
      possession: "Immediate",
      transactionType: "Resale",
      bhk: 4,
      baths: 5,
      size: "5500 sq.ft",
      loanAmount: 150000000,
      interestRate: 8.2,
      loanTenure: 25,
      monthlyEMI: 1185000,
      totalInterestPayable: 205500000,
    },
    agent: {
      name: "Priya Shah",
      email: "priya@edgeexpert.com",
      phone: "9876543211",
      rating: 4.9,
      reviews: 67,
      specialTag: "Luxury Specialist",
    },
    price: "₹15 Cr",
    purpose: "Buy",
    tags: ["Featured", "For Sale", "Luxury"],
  },

  // 10. Commercial Office Space (Commercial)
  {
    id: 12,
    title: "Premium Office Space in Business District",
    location: "BKC, Mumbai",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    overview: {
      description:
        "Grade A office space in Mumbai's premier business district. Ideal for corporate headquarters with premium amenities and excellent connectivity.",
      longDescription:
        "This prestigious office space offers modern infrastructure, high-speed elevators, 24/7 power backup, and advanced security systems. Located in Bandra Kurla Complex, it provides excellent connectivity and is surrounded by top businesses, hotels, and restaurants.",
      keyPoints: [
        "Grade A commercial building",
        "24/7 power backup and security",
        "High-speed internet connectivity",
        "Multiple conference rooms",
        "Dedicated parking spaces",
      ],
    },
    details: {
      type: "Commercial",
      floor: "12 of 20",
      furnishing: "Semi-Furnished",
      facing: "North",
      overlooking: "Business District",
      superArea: "3500 sq.ft",
      carpetArea: "3000 sq.ft",
      status: "Ready to Move",
      possession: "Immediate",
      transactionType: "Lease",
      bhk: null,
      baths: 4,
      size: "3500 sq.ft",
      loanAmount: null,
    },
    agent: {
      name: "Rajesh Iyer",
      email: "rajesh@edgeexpert.com",
      phone: "9876543212",
      rating: 4.7,
      reviews: 45,
      specialTag: "Commercial Expert",
    },
    price: "₹2.5 Lakh /month",
    purpose: "Commercial",
    tags: ["For Rent", "Commercial"],
  },

  // 11. Studio Apartment (Rent)
  {
    id: 13,
    title: "Fully Furnished Studio Apartment",
    location: "Indiranagar, Bengaluru",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    overview: {
      description:
        "Compact and stylish studio apartment perfect for singles or couples. Fully furnished with modern amenities in a prime location.",
      longDescription:
        "This beautifully designed studio apartment maximizes space with smart storage solutions and modern furnishings. Located in the heart of Indiranagar, it offers easy access to restaurants, cafes, shopping centers, and public transportation.",
      keyPoints: [
        "Smart space utilization",
        "Fully equipped kitchenette",
        "High-speed WiFi included",
        "Weekly housekeeping",
        "Walking distance to metro",
      ],
    },
    details: {
      type: "Apartment",
      floor: "3 of 8",
      furnishing: "Fully Furnished",
      facing: "East",
      overlooking: "Park",
      superArea: "450 sq.ft",
      carpetArea: "380 sq.ft",
      status: "Available",
      possession: "Immediate",
      transactionType: "Rent (Monthly)",
      bhk: 1,
      baths: 1,
      size: "450 sq.ft",
      loanAmount: null,
    },
    agent: {
      name: "Ananya Reddy",
      email: "ananya@edgeexpert.com",
      phone: "9876543213",
      rating: 4.8,
      reviews: 32,
      specialTag: "Rental Specialist",
    },
    price: "₹25K /month",
    purpose: "Rent",
    tags: ["For Rent", "Furnished"],
  },

  // 12. Farmhouse Plot (Plots)
  {
    id: 14,
    title: "Serene Farmhouse Plot",
    location: "Lonavala, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    overview: {
      description:
        "Peaceful farmhouse plot surrounded by nature, perfect for building your weekend retreat. Clear titles and all necessary approvals.",
      longDescription:
        "Escape to this tranquil plot nestled in the hills of Lonavala. The property offers stunning valley views, clean air, and complete privacy. Ideal for constructing a vacation home with potential for organic farming and landscaping.",
      keyPoints: [
        "Panoramic valley views",
        "Clear titles and approvals",
        "Water connection available",
        "Road access till plot",
        "Potential for organic farming",
      ],
    },
    details: {
      type: "Plot (Farmhouse)",
      floor: "N/A",
      furnishing: "N/A",
      facing: "West",
      overlooking: "Valley, Hills",
      superArea: "2 acres",
      carpetArea: "2 acres",
      status: "New Property",
      possession: "Immediate",
      transactionType: "New Booking",
      bhk: null,
      baths: null,
      size: "2 acres",
      loanAmount: null,
    },
    agent: {
      name: "Sameer Joshi",
      email: "sameer@edgeexpert.com",
      phone: "9876543214",
      rating: 4.6,
      reviews: 28,
      specialTag: "Plot Specialist",
    },
    price: "₹1.2 Cr",
    purpose: "Buy",
    tags: ["New", "Farmhouse"],
  },

  // 13. Premium Co-living Space (PG/CO-LIVING)
  // {
  //   id: 15,
  //   title: "Elite Co-living for Professionals",
  //   location: "Hitech City, Hyderabad",
  //   images: [
  //     "https://images.unsplash.com/photo-1555854871-d4c6e5c67cbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //   ],
  //   overview: {
  //     description:
  //       "Premium co-living space designed for working professionals. Includes all utilities, high-speed internet, housekeeping, and community events.",
  //     longDescription:
  //       "Experience modern community living with private rooms, shared common spaces, and premium amenities. Perfect for IT professionals working in Hitech City with shuttle services to major tech parks and regular community events.",
  //     keyPoints: [
  //       "All utilities included",
  //       "High-speed fiber internet",
  //       "Daily housekeeping",
  //       "Community events and networking",
  //       "Shuttle service to tech parks",
  //     ],
  //   },
  //   details: {
  //     type: "PG / Co-living",
  //     floor: "5 of 12",
  //     furnishing: "Fully Furnished",
  //     facing: "South",
  //     overlooking: "City View",
  //     superArea: "180 sq.ft (Private Room)",
  //     carpetArea: "180 sq.ft",
  //     status: "Available",
  //     possession: "Immediate",
  //     transactionType: "Rent (Monthly)",
  //     bhk: 1,
  //     baths: 1,
  //     size: "Private Room",
  //     loanAmount: null,
  //   },
  //   agent: {
  //     name: "Karthik Nair",
  //     email: "karthik@edgeexpert.com",
  //     phone: "9876543215",
  //     rating: 4.9,
  //     reviews: 51,
  //     specialTag: "Co-living Expert",
  //   },
  //   price: "₹18k /month",
  //   purpose: "Rent",
  //   tags: ["For Rent", "Co-living", "Featured"],
  // },
];

export default properties;