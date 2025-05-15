
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type ConfettiProps = {
  active?: boolean;
  duration?: number;
  particleCount?: number;
  spread?: number;
  colors?: string[];
};

export function Confetti({ 
  active = true, 
  duration = 3000, 
  particleCount = 100, 
  spread = 70, 
  colors = ['#1E88E5', '#26C6DA', '#FFB300', '#43A047']
}: ConfettiProps) {
  const [isActive, setIsActive] = useState(active);
  
  useEffect(() => {
    let timer: number;
    
    if (isActive) {
      const end = Date.now() + duration;
      
      const frame = () => {
        confetti({
          particleCount: particleCount / 15,
          angle: 60,
          spread,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        
        confetti({
          particleCount: particleCount / 15,
          angle: 120,
          spread,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        
        if (Date.now() < end) {
          timer = requestAnimationFrame(frame);
        }
      };
      
      frame();
      
      // Auto disable after duration
      setTimeout(() => setIsActive(false), duration);
    }
    
    return () => {
      cancelAnimationFrame(timer);
    };
  }, [isActive, duration, particleCount, spread, colors]);
  
  return null; // This component doesn't render anything
}
