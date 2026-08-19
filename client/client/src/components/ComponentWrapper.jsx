// src/components/ComponentWrapper.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import EnhancedSeo from "./EnhancedSeo";
import metadata from "../metadata";


const ComponentWrapper = ({ children }) => {
  const location = useLocation();

  // Extract route name (e.g., "/aboutus" -> "aboutus")
  const route = location.pathname === "/" ? "home" : location.pathname.replace("/", "");
  const meta = metadata[route];

  if (!meta) {
    console.warn(`⚠️ No metadata found for route: ${route}`);
    return <>{children}</>;
  }

  return (
    <>
      <EnhancedSeo {...meta} />
      {children}
    </>
  );
};

export default ComponentWrapper;
