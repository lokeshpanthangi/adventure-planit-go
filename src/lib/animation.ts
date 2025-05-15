
/**
 * Animation utilities and constants for consistent animations across the app
 */

// Common animation durations (in ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Common animation ease curves
export const ANIMATION_EASE = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design standard curve
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// Animation variants for Framer Motion
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: ANIMATION_EASE.out }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: ANIMATION_EASE.in }
  }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: ANIMATION_EASE.out }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { duration: 0.3, ease: ANIMATION_EASE.in }
  }
};

export const slideDown = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: ANIMATION_EASE.out }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { duration: 0.3, ease: ANIMATION_EASE.in }
  }
};

export const slideInLeft = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: ANIMATION_EASE.out }
  },
  exit: { 
    x: -20, 
    opacity: 0,
    transition: { duration: 0.3, ease: ANIMATION_EASE.in }
  }
};

export const slideInRight = {
  hidden: { x: 20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: ANIMATION_EASE.out }
  },
  exit: { 
    x: 20, 
    opacity: 0,
    transition: { duration: 0.3, ease: ANIMATION_EASE.in }
  }
};

export const scale = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.4, ease: ANIMATION_EASE.bounce }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { duration: 0.3, ease: ANIMATION_EASE.in }
  }
};

export const staggerChildren = (staggerTime = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: 0.1,
    }
  }
});

// Helper function to generate a ripple effect on elements
export const createRippleEffect = (event: React.MouseEvent<HTMLElement>) => {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');
  
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }
  
  button.appendChild(ripple);
  
  // Remove ripple after animation completes
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
};
