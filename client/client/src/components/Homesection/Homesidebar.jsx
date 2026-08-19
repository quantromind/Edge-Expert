import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const springTransition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
};

const Homesidebar = ({
  sections = [],
  scrollToSection,
  defaultLineColor = "#d9d9d9", // light gray
}) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || null);
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = sections[0]?.id;

      sections.forEach((section) => {
        if (
          section.ref.current &&
          section.ref.current.offsetTop <= scrollPosition
        ) {
          current = section.id;
        }
      });

      setActiveSection(current);

      if (
        [
          "contact",
          "whyus",
          "showcase",
          "properties",
          "features",
          "home",
          "innovative",
        ].includes(current)
      ) {
        setTextColor("black");
      } else {
        setTextColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="hidden md:block fixed top-1/2 -translate-y-1/2 left-6 z-40">
      <nav className="flex flex-col items-center space-y-12">
        {sections.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <div
              key={item.id}
              className="relative flex justify-center cursor-pointer"
              onClick={() => {
                scrollToSection(item.ref);
                setActiveSection(item.id);
              }}
            >
              {/* SHARP HORIZONTAL LINE */}
              <motion.div
                className="h-[4px]"               // bold thickness
                style={{ backgroundColor: defaultLineColor }}
                initial={{ width: 20, opacity: 0.6 }}
                animate={{
                  width: isActive ? 75 : 20,   // expands horizontally
                  opacity: isActive ? 1 : 0.6,
                }}
                whileHover={{
                  width: isActive ? 85 : 40,   // hover expansion
                  opacity: 1,
                }}
                transition={springTransition}
              />

              {/* LABEL */}
              <motion.span
                className="absolute left-1/2 top-[calc(100%+8px)] font-semibold whitespace-nowrap text-xs uppercase tracking-wider"
                style={{ color: textColor }}
                initial={{ opacity: 0, y: -5, x: "-50%" }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : -5,
                  x: "-50%",
                }}
                whileHover={{
                  opacity: 1,
                  y: 0,
                  x: "-50%",
                }}
                transition={{ duration: 0.25 }}
              >
                {item.name}
              </motion.span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Homesidebar;
