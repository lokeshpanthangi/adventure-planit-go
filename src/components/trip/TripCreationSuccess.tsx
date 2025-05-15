
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { Check, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
        <div className="rounded-full bg-primary p-3">
          <Check className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">Your trip has been created!</h2>
      <p className="text-muted-foreground">
        Get ready for your adventure to {tripData.destination}. 
        Start planning your activities and invite your friends.
      </p>
      
      <div className="bg-muted p-4 rounded-md flex items-center justify-center gap-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Trip Code</div>
          <div className="text-xl font-bold tracking-wider">{tripData.tripCode}</div>
        </div>
        <Button variant="outline" size="icon" onClick={copyTripCode}>
          <Share className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="pt-6 space-x-4">
        <Button asChild>
          <Link to={`/trips/${tripData.tripCode}`}>Go to Trip Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/trips">View All Trips</Link>
        </Button>
      </div>
    </div>
  );
}
