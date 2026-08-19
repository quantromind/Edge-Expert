import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Import metadata config
import ComponentWrapper from "./components/ComponentWrapper";

// Common Components
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import VideoLoader from "./common/VideoLoader";

// Core Pages
import HomePage from "./components/Homesection/HomePage";
import Contactus from "./components/Contactus";
import Properties from "./components/properties/Properties";
import PropertyDetails from "./components/properties/PropertyDetails";
import Buyresidential from "./components/properties/buyresidential/Buyresidential";
import AboutUs from "./components/Aboutus";
import PayRent from "./components/Payrent";
import Servicess from "./components/servicess/Services";
import Blog from "./components/Blogs/Blog";
import BlogDetails from "./components/Blogs/BlogDetails";
import NotFound from "./components/NotFound";

// Authentication
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import LoginRegister from "./components/Login/LoginRegister";

//customer homepage
// import HomePage from "./views/customerpanel/HomePage/Home";

// Dashboards & Forms
import CustomerDashboard from "./views/customerpanel/CustomerDashboard";
import EnquiryForm from "./components/enquiryform/EnquiryForm";
import BrokerPanel from "./views/brokerpanel/BrokerPanel";
import DeveloperDashboard from "./views/developerpanel/DeveloperDashboard";

// Packages
import Developer from "./components/packages/developer/Developer";
import BrokerPage from "./components/packages/broker/Broker";
import OwnerPage from "./components/packages/owner/Owner";
import PremiumPlans from "./components/packages/primium/Primiumplans";

import HouseKeeping from "./components/housekeeping/HouseKeeping";
import HouseKeepingDetails from "./components/housekeeping/HouseKeepingDetails";
import PackagesSection from "./components/interierdesign/PackagesSection";

// All About Us
import CompanyOverview from "./components/allaboutus/CompanyOverview";
import Sustainability from "./components/allaboutus/Sustainability";
import CorporateGovernance from "./components/allaboutus/CorporateGovernance";
import Career from "./components/allaboutus/Career";
import ApplyNow from "./components/allaboutus/ApplyNow";
import Events from "./components/allaboutus/Events";

// Explore Properties
import FeaturedProperties from "./components/exploreproperties/featured/FeaturedProperties";
import RentProperty from "./components/properties/rent/RentProperty";
import LuxuryProperties from "./components/exploreproperties/luxury/LuxuryProperties";
import LuxuryPropertiesDetails from "./components/exploreproperties/luxury/LuxuryPropertiesDetails";
import PGColiving from "./components/exploreproperties/pgcoliving/PGColiving";
import SellProperties from "./components/exploreproperties/sellproperties/SellProperties";
import RentProperties from "./components/exploreproperties/rentproperties/RentProperties";
import AffordableHousing from "./components/exploreproperties/affordablehousing/AffordableHousing";
import AffordableDetail from "./components/exploreproperties/affordablehousing/HousingDetails";
import BuyCommercial from "./components/exploreproperties/buycommercial/BuyCommercial";
import CommercialDetails from "./components/exploreproperties/buycommercial/CommercialDetails";
import Projects from "./components/exploreproperties/newproject/Projects";
import ProjectDetails from "./components/exploreproperties/newproject/ProjectDetails";
import InteriorDesign from "./components/interierdesign/InteriorDesign";
import Bookings from "./views/developerpanel/pages/Bookings";
import ViewDetailsBuyResidential from "./components/properties/buyresidential/ViewDetailsBuyResidential";
import PrivacyPolicy from "./components/company/privacy-policy/PrivacyPolicy";
import TermsConditions from "./components/company/terms-conditions/TermsConditions";

import AdminDashboard from "./views/adminpanel/AdminDashboard";
import InvestorRelations from "./components/company/investorrelations/InvestorRelations";
import PackersMoversDetails from "./components/housekeeping/PackersMoversDetails";
import BenefitsMember from "./components/packages/benefitsmembers/BenefitsMembers";
import Pricing from "./components/packages/pricingplan/pricing";

// import PackersMoversDetails from "./components/housekeeping/PackersMoversDetails";
import PaintingDetails from "./components/housekeeping/PaintingDetails";
import RenovationDetails from "./components/housekeeping/RenovationDetails";
import PanellingDetails from "./components/housekeeping/PanellingDetails";







// ✅ Protected Route Component
const ProtectedRoute = ({ role, children }) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (role && userRole !== role) {
    if (userRole === "broker") return <Navigate to="/brokerpanel" replace />;
    if (userRole === "customer") return <Navigate to="/customerdashboard" replace />;
    if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

// ✅ ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();

  // Hide Navbar & Footer on specific dashboard paths
  const NO_NAV_FOOTER_PATHS = [
    "/brokerpanel",
    "/customerdashboard",
    "/adminpanel",
    "/developerpanel",
    "/admin/dashboard"
  ];

  const shouldHideNavAndFooter = NO_NAV_FOOTER_PATHS.some((path) =>
    location.pathname.startsWith(path)
  );

  // ✅ Base Meta Info
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
  const defaultMeta = {
    title: "Edge Expert | Real Estate Platform",
    description:
      "Edge Expert is your trusted real estate platform to buy, sell, rent, or lease properties with ease. Explore verified listings today!",
    url: baseUrl,
    image: `${baseUrl}/thumbnail.png`,
    favicon: `${baseUrl}/favicon.ico`,
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <HelmetProvider>
        <div className="font-sans">
          <Helmet>
            <title>{defaultMeta.title}</title>
            <meta name="description" content={defaultMeta.description} />
            <meta
              name="keywords"
              content="real estate, buy, sell, rent, lease, properties, broker, developer, owner, homes, apartments"
            />
            <meta name="author" content="Edge Expert Team" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/png" href={defaultMeta.image} />
            <link rel="icon" type="image/x-icon" href={defaultMeta.favicon} />
            <link rel="apple-touch-icon" href={defaultMeta.image} />
            <meta name="theme-color" content="#ffffff" />

            <meta property="og:title" content={defaultMeta.title} />
            <meta property="og:description" content={defaultMeta.description} />
            <meta property="og:image" content={defaultMeta.image} />
            <meta property="og:url" content={defaultMeta.url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Edge Expert" />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={defaultMeta.title} />
            <meta name="twitter:description" content={defaultMeta.description} />
            <meta name="twitter:image" content={defaultMeta.image} />
            <meta name="twitter:site" content="@edgeexperts" />
          </Helmet>

          {/* ✅ Initial Video Loader */}
          <VideoLoader />

          {/* ✅ ScrollToTop added here */}
          <ScrollToTop />

          {!shouldHideNavAndFooter && <Navbar />}

          {/* ✅ Application Routes */}
          <Routes>
            {/* Core & Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginregister" element={<LoginRegister />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/payrent" element={<PayRent />} />
            <Route path="/services" element={<Servicess />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:title" element={<BlogDetails />} />
            <Route path="/enquiry" element={<EnquiryForm />} />

            {/* Properties Core Routes & Aliases */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/buyproperties" element={<Properties />} />
            <Route path="/buy" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/propertydetails" element={<Properties />} />

            {/* Buy Residential */}
            <Route path="/buyresidential" element={<Buyresidential />} />
            <Route path="/buyresidential/:id" element={<ViewDetailsBuyResidential />} />

            {/* Rent & Sell Properties */}
            <Route path="/rentproperties" element={<RentProperties />} />
            <Route path="/rentproperty" element={<RentProperty />} />
            <Route path="/rent" element={<RentProperties />} />
            <Route path="/sellproperties" element={<SellProperties />} />
            <Route path="/sell" element={<SellProperties />} />

            {/* Explore Properties: Projects & Estates */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/newprojects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/project-details/:id" element={<ProjectDetails />} />

            {/* Commercial */}
            <Route path="/commercial" element={<BuyCommercial />} />
            <Route path="/commercial/:id" element={<CommercialDetails />} />

            {/* Luxury, Affordable & PG */}
            <Route path="/luxuryproperties" element={<LuxuryProperties />} />
            <Route path="/luxuryproperties/:id" element={<LuxuryPropertiesDetails />} />
            <Route path="/featuredproperties" element={<FeaturedProperties />} />
            <Route path="/affordable" element={<AffordableHousing />} />
            <Route path="/affordable/:id" element={<AffordableDetail />} />
            <Route path="/pgcoliving" element={<PGColiving />} />

            {/* Housekeeping, Interior & Moving Services */}
            <Route path="/housekeeping" element={<HouseKeeping />} />
            <Route path="/housekeeping/:id" element={<HouseKeepingDetails />} />
            <Route path="/packersmovers" element={<PackersMoversDetails />} />
            <Route path="/packers-movers" element={<PackersMoversDetails />} />
            <Route path="/interiordesign" element={<InteriorDesign />} />
            <Route path="/interior-design" element={<InteriorDesign />} />
            <Route path="/packages" element={<PackagesSection />} />
            <Route path="/services/painting" element={<PaintingDetails />} />
            <Route path="/services/renovation" element={<RenovationDetails />} />
            <Route path="/services/panelling" element={<PanellingDetails />} />
            <Route path="/services/packersmovers" element={<PackersMoversDetails />} />

            {/* Membership Packages & Pricing */}
            <Route path="/developer" element={<Developer />} />
            <Route path="/broker" element={<BrokerPage />} />
            <Route path="/owner" element={<OwnerPage />} />
            <Route path="/primium" element={<PremiumPlans />} />
            <Route path="/premiumplans" element={<PremiumPlans />} />
            <Route path="/premium" element={<PremiumPlans />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/benefitsmembers" element={<BenefitsMember />} />

            {/* About Us & Corporate Pages */}
            <Route path="/companyoverview" element={<CompanyOverview />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/corporategovernance" element={<CorporateGovernance />} />
            <Route path="/career" element={<Career />} />
            <Route path="/apply" element={<ApplyNow />} />
            <Route path="/events" element={<Events />} />
            <Route path="/investorrelations" element={<InvestorRelations />} />

            {/* Legal & Policies */}
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/terms" element={<TermsConditions />} />

            {/* Dashboards & Protected Routes */}
            <Route
              path="/brokerpanel/*"
              element={
                <ProtectedRoute role="broker">
                  <BrokerPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customerdashboard"
              element={
                <ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customerpanel"
              element={
                <ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminpanel/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/developerpanel/*" element={<DeveloperDashboard />} />
            <Route path="/developer/bookings" element={<Bookings />} />

            {/* SEO Component Wrapper */}
            <Route path="/componentwrapper/:route" element={<ComponentWrapper />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {!shouldHideNavAndFooter && <Footer />}
        </div>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
