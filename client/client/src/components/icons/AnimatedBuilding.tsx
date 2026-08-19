"use client";

import { motion, useAnimation } from "motion/react";

const AnimatedBuilding = () => {
  const controls = useAnimation();

  return (
    <motion.svg
      onMouseEnter={() => controls.start({ scale: [1, 1.2, 1] })}
      onMouseLeave={() => controls.start({ scale: 1 })}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#080a0eff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={controls}
      initial={{ scale: 1 }}
    >
      <path d="M3 21h18" />
      <path d="M6 21V5l6-2v18" />
      <path d="M18 21V9l-6-4" />
      <path d="M9 9h1" />
      <path d="M9 12h1" />
      <path d="M9 15h1" />
    </motion.svg>
  );
};

export default AnimatedBuilding;
