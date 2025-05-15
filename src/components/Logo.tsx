
import { Compass } from "lucide-react";

export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-4xl",
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Compass className="text-primary-light dark:text-primary-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-1 w-1 rounded-full bg-accent-light dark:bg-accent-dark" />
        </div>
        <div 
          className="absolute -right-1 -top-1 h-2 w-2 rotate-45 transform" 
          style={{ 
            borderRight: "2px solid #FFB300",
            borderBottom: "2px solid #FFB300" 
          }}
        />
      </div>
      <span className={`font-poppins font-bold ${sizeClasses[size]} text-foreground`}>
        Plan<span className="text-primary-light dark:text-primary-dark">it</span>
      </span>
    </div>
  );
}
