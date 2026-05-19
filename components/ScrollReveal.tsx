"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  const initial = prefersReduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 32 : 0,
        x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
        scale: direction === "none" ? 1 : 0.97,
      };

  const animate = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReduced ? 0.2 : 0.55,
        delay: prefersReduced ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
