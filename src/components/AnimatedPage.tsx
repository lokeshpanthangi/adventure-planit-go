
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion, fadeIn } from "@/lib/animation";

type AnimatedPageProps = {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale";
};

export function AnimatedPage({ children, animation = "fade" }: AnimatedPageProps) {
  const { pathname } = useLocation();
  const reducedMotion = prefersReducedMotion();
  
  // Skip animation if user prefers reduced motion
  if (reducedMotion) {
    return <>{children}</>;
  }
  
  let variants;
  
  switch (animation) {
    case "slide":
      // Determine slide direction based on the pathname
      const direction = pathname.includes('/trips/') ? "right" : "left";
      variants = direction === "right" ? {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
        exit: { x: -20, opacity: 0, transition: { duration: 0.2 } }
      } : {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
        exit: { x: 20, opacity: 0, transition: { duration: 0.2 } }
      };
      break;
    case "scale":
      variants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
        exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } }
      };
      break;
    case "fade":
    default:
      variants = fadeIn;
      break;
  }
  
  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
