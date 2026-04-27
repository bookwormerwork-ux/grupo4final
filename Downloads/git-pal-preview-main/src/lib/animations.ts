/**
 * Reusable animation variants and easing curves
 */

// Easing curves for premium feel
export const EASING = {
  smooth: [0.22, 1, 0.36, 1] as const,
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeIn: [0.4, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  bounce: [0.175, 0.885, 0.32, 1.275] as const,
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
};

// Page transitions
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  duration: 0.5,
  ease: EASING.smooth,
};

// Fade animations
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInTransition = {
  duration: 0.3,
  ease: EASING.easeOut,
};

// Scale + Fade (for cards, modals)
export const scaleInVariants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.92 },
};

export const scaleInTransition = {
  duration: 0.3,
  ease: EASING.smooth,
};

// Slide up animation
export const slideUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const slideUpTransition = {
  duration: 0.4,
  ease: EASING.smooth,
};

// Slide in from left
export const slideInLeftVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// Slide in from right
export const slideInRightVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const slideInTransition = {
  duration: 0.35,
  ease: EASING.smooth,
};

// Stagger container for animating children sequentially
export const staggerContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Child item for stagger effect
export const staggerItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const staggerItemTransition = {
  duration: 0.4,
  ease: EASING.smooth,
};

// Hover lift effect (used for buttons, cards)
export const hoverLiftVariants = {
  initial: { y: 0 },
  hover: { y: -4 },
  tap: { y: 0 },
};

export const hoverLiftTransition = {
  duration: 0.2,
  ease: EASING.smooth,
};

// Button press animation
export const buttonPressVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const buttonPressTransition = {
  duration: 0.15,
  ease: EASING.easeInOut,
};

// Pulse animation (for loading, notifications)
export const pulseVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
  },
};

export const pulseTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut",
};

// Rotate animation (for loading spinners)
export const rotateVariants = {
  animate: {
    rotate: 360,
  },
};

export const rotateTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "linear",
};

// Modal backdrop
export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const backdropTransition = {
  duration: 0.25,
  ease: EASING.easeOut,
};

// Modal content
export const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export const modalTransition = {
  duration: 0.3,
  ease: EASING.smooth,
};

// Tooltip animation
export const tooltipVariants = {
  initial: { opacity: 0, scale: 0.92, y: -4 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.92, y: -4 },
};

export const tooltipTransition = {
  duration: 0.2,
  ease: EASING.smooth,
};

// Notification/Toast
export const toastVariants = {
  initial: { opacity: 0, y: 16, x: 0 },
  animate: { opacity: 1, y: 0, x: 0 },
  exit: { opacity: 0, y: 16, x: 20 },
};

export const toastTransition = {
  duration: 0.35,
  ease: EASING.smooth,
};
