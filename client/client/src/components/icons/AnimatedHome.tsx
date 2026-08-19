"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const pathVariants: Variants = {
  normal: {
    translateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 13,
    },
  },
  animate: {
    translateX: [-6, 0],
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 200,
      damping: 13,
    },
  },
};

interface HomeProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const AnimatedHome = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#0c0101ff",
  ...props
}: HomeProps) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.path
          d="M3 9.5L12 3l9 6.5"
          variants={pathVariants}
          animate={controls}
        />
        <motion.path
          d="M9 22V12h6v10"
          variants={pathVariants}
          animate={controls}
        />
        <motion.path
          d="M3 10v10h6v-6h6v6h6V10"
          variants={pathVariants}
          animate={controls}
        />
      </svg>
    </div>
  );
};

export default AnimatedHome;
