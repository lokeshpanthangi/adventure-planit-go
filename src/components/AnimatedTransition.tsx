
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTransitionProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "slide" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedTransition({
  children,
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 0.4,
  className,
}: AnimatedTransitionProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, ...directions[direction] },
      animate: { opacity: 1, y: 0, x: 0 },
      exit: { opacity: 0, ...directions[direction] },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  };

  return (
    <motion.div
      initial={animations[type].initial}
      animate={animations[type].animate}
      exit={animations[type].exit}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
