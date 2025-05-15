
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { Check, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type TripCreationSuccessProps = {
  tripData: any;
};

export function TripCreationSuccess({ tripData }: TripCreationSuccessProps) {
  useEffect(() => {
    // Launch confetti when the component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const copyTripCode = () => {
    navigator.clipboard.writeText(tripData.tripCode);
    toast({
      title: "Trip code copied!",
      description: "Share this code with your friends to invite them.",
    });
  };

  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ 
          scale: { type: "spring", stiffness: 200, damping: 10 },
          rotate: { delay: 0.3, duration: 0.5 }
        }}
      >
        <div className="rounded-full bg-primary p-3">
          <Check className="h-6 w-6 text-primary-foreground" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold">Your trip has been created!</h2>
        <p className="text-muted-foreground">
          Get ready for your adventure to {tripData.destination}. 
          Start planning your activities and invite your friends.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-muted p-4 rounded-md flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
      >
        <div>
          <div className="text-sm font-medium text-muted-foreground">Trip Code</div>
          <motion.div 
            className="text-xl font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {tripData.tripCode}
          </motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button variant="outline" size="icon" onClick={copyTripCode}>
            <Share className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="pt-6 space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild>
            <Link to={`/trips/${tripData.tripCode}`}>Go to Trip Dashboard</Link>
          </Button>
        </motion.div>
        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" asChild>
            <Link to="/trips">View All Trips</Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
