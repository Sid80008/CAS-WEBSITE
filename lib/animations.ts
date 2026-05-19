/**
 * Shared animation variants for Framer Motion.
 * Based on TruCourt motion design system — premium, calm, scroll-triggered.
 *
 * Philosophy: "Elegant motion without distracting the user."
 */

/** The premium easing curve used throughout the site */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard fade-up reveal — used for almost every section element */
export const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Slightly larger travel — hero containers, big section intros */
export const fadeUpBig = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Fade in from the left — statistics text, left-side content */
export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Fade in from the right — images, right-side content */
export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Pure fade — badges, labels, subtle elements */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Container variant for staggered children.
 * Wrap a list of items in a `<motion.div variants={staggerContainer}>`
 * and give each child `<motion.div variants={fadeUp}>`.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/** Tighter stagger for dense card grids */
export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Viewport settings: animate once when 20% of element enters viewport.
 * Use with whileInView on motion elements.
 */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
