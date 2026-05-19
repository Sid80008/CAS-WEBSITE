/**
 * Shared animation variants for Framer Motion.
 * Speeds set to 0.65× of original (durations = original ÷ 0.65 ≈ 1.54×).
 * Philosophy: "Elegant motion without distracting the user."
 */

/** The premium easing curve used throughout the site */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard fade-up reveal — 0.8s ÷ 0.65 ≈ 1.23s */
export const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.23, ease: EASE },
  },
};

/** Slightly larger travel — hero containers */
export const fadeUpBig = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.38, ease: EASE },
  },
};

/** Fade in from the left — 0.8s ÷ 0.65 ≈ 1.23s */
export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.23, ease: EASE },
  },
};

/** Fade in from the right — 0.8s ÷ 0.65 ≈ 1.23s */
export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.23, ease: EASE },
  },
};

/** Pure fade — badges, labels — 0.6s ÷ 0.65 ≈ 0.92s */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.92, ease: EASE },
  },
};

/** Container variant for staggered children — 0.15s ÷ 0.65 ≈ 0.23s stagger */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.23,
      delayChildren: 0.15,
    },
  },
};

/** Tighter stagger for dense card grids — 0.1s ÷ 0.65 ≈ 0.15s */
export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.08,
    },
  },
};

/** Viewport settings: animate once when 20% of element enters viewport */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
