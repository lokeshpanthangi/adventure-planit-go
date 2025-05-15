
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface TripCardAnimationProps {
  children: React.ReactNode;
  tripId: string;
  delay?: number;
}

export function TripCardAnimation({ 
  children, 
  tripId, 
  delay = 0 
}: TripCardAnimationProps) {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);

  const handleNavigate = () => {
    setIsExpanding(true);
    // Small delay before actual navigation to allow animation to start
    setTimeout(() => {
      navigate(`/trips/${tripId}`);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay * 0.1, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      exit={
        isExpanding 
          ? { 
              scale: 1.05, 
              opacity: 0,
              transition: { duration: 0.3 } 
            } 
          : { 
              opacity: 0, 
              y: -20,
              transition: { duration: 0.2 } 
            }
      }
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ 
        scale: 0.98, 
        transition: { duration: 0.1 } 
      }}
      className="trip-card-wrapper"
      onClick={handleNavigate}
    >
      {children}
    </motion.div>
  );
}
