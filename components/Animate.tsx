"use client";

/**
 * Reusable scroll-triggered animation wrapper.
 *
 * Usage:
 *   <Animate>
 *     <div>...any content...</div>
 *   </Animate>
 *
 * With stagger (wrap items inside a stagger container):
 *   <Animate variants={staggerContainer}>
 *     <Animate tag="li" variants={fadeUp}>Item 1</Animate>
 *     <Animate tag="li" variants={fadeUp}>Item 2</Animate>
 *   </Animate>
 */

import React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/animations";

type Tag =
  | "div"
  | "section"
  | "article"
  | "ul"
  | "li"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

interface AnimateProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: React.ReactNode;
  variants?: Variants;
  tag?: Tag;
  delay?: number;
  className?: string;
}

const MotionTag: Record<Tag, React.ElementType> = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
};

export default function Animate({
  children,
  variants = fadeUp,
  tag = "div",
  delay,
  className,
  ...rest
}: AnimateProps) {
  const Tag = MotionTag[tag];

  const variantsWithDelay =
    delay !== undefined
      ? {
          ...variants,
          visible: {
            ...variants.visible,
            transition: {
              ...(variants.visible as any)?.transition,
              delay,
            },
          },
        }
      : variants;

  return (
    <Tag
      className={className}
      variants={variantsWithDelay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}
