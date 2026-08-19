import React, { useRef } from "react";
import Homesidebar from "./Homesidebar";
import ComponentWrapper from "../ComponentWrapper";

// Import sections
import HomeHero from "../Homesection/HomeHero";
import HomePremiumProjects from "./HomePremiumProjects";
import HomeProperties from "../Homesection/HomeProperties";
import HomeFeaturesInnovative from "../Homesection/HomeFeaturesInnovative";
import HomeShowcase from "../Homesection/homeShowcase";
import HomeContact from "../Homesection/HomeContact";
import HomeFeature from "../Homesection/HomeFeature";

const HomePage = () => {
  const HEADER_HEIGHT = 80;

  // Section refs
  const heroRef = useRef(null);
  const PremiumProjectsRef = useRef(null);
  const featuresRef = useRef(null);
  const propertiesRef = useRef(null);
  const innovativeRef = useRef(null);
  const contactRef = useRef(null);
  const showcaseRef = useRef(null);

  const sections = [
    { id: "hero", name: "Home", ref: heroRef },
    { id: "PremiumProjects", name: "Projects", ref: PremiumProjectsRef },
    { id: "features", name: "Iconic Tower", ref: featuresRef },
    { id: "properties", name: "Properties", ref: propertiesRef },
    { id: "innovative", name: "Why Us", ref: innovativeRef },
    { id: "showcase", name: "Showcase", ref: showcaseRef },
    { id: "contact", name: "Contact", ref: contactRef },
  ];

  const scrollToSection = (ref) => {
    if (ref?.current) {
      const topOffset = ref.current.offsetTop;
      window.scrollTo({
        top: topOffset - HEADER_HEIGHT,
        behavior: "smooth",
      });
    }
  };

  return (
    <ComponentWrapper route="/">
      <div className="flex">
        {/* Sidebar */}
        <Homesidebar sections={sections} scrollToSection={scrollToSection} />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="min-h-screen scroll-mt-20">
          <HomeHero />
        </section>

        {/* PremiumProjects*/}
        <section ref={PremiumProjectsRef} id="PremiumProjects" className="scroll-mt-20">
          <HomePremiumProjects />
        </section>

        {/* Features Section */}
        <section ref={featuresRef} id="features" className="scroll-mt-20">
          <HomeFeature />
        </section>

        {/* Properties Section */}
        <section ref={propertiesRef} id="properties" className="scroll-mt-20">
          <HomeProperties />
        </section>

        {/* Why Us / Innovative Section */}
        <section ref={innovativeRef} id="innovative" className="scroll-mt-20">
          <HomeFeaturesInnovative />
        </section>

        {/* Showcase Section */}
        <section ref={showcaseRef} id="showcase" className="scroll-mt-20">
          <HomeShowcase />
        </section>  

        {/* Contact Section */}
        <section
          ref={contactRef}
          id="contact"
          className="min-h-[90vh] scroll-mt-20"
        >
          <HomeContact />
        </section>
      </main>
      </div>
    </ComponentWrapper>
  );
};

export default HomePage;