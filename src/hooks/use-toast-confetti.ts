
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

type ToastConfettiOptions = {
  title: string;
  description?: string;
  duration?: number;
  confettiDuration?: number;
  confettiParticleCount?: number;
  confettiColors?: string[];
};

export function useToastConfetti() {
  const { toast } = useToast();
  
  const successToast = ({
    title,
    description,
    duration = 5000,
    confettiDuration = 2000,
    confettiParticleCount = 100,
    confettiColors = ['#1E88E5', '#26C6DA', '#FFB300', '#43A047'],
  }: ToastConfettiOptions) => {
    toast({
      title,
      description,
      duration,
    });
    
    // Fire confetti
    const end = Date.now() + confettiDuration;
    
    const frame = () => {
      confetti({
        particleCount: confettiParticleCount / 15,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: confettiColors,
      });
      
      confetti({
        particleCount: confettiParticleCount / 15,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: confettiColors,
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  };
  
  return { toast, successToast };
}
