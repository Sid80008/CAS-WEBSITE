/**
 * Shared animation variants for Framer Motion.
 * All durations halved in speed (doubled in time) for a calmer, more premium feel.
 */

/** The premium easing curve used throughout the site */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard fade-up reveal */
export const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.6, ease: EASE },
  },
};

/** Slightly larger travel — hero containers, big section intros */
export const fadeUpBig = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.8, ease: EASE },
  },
};

/** Fade in from the left */
export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, ease: EASE },
  },
};

/** Fade in from the right */
export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, ease: EASE },
  },
};

/** Pure fade — badges, labels, subtle elements */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

/**
 * Container variant for staggered children.
 * Stagger and delay doubled for calmer feel.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

/** Tighter stagger for dense card grids */
export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/**
 * Viewport settings: animate once when 20% of element enters viewport.
 */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
