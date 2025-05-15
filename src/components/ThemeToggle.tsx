
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);

  const toggleTheme = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = { x, y, id: nextId.current };
      nextId.current += 1;
      
      setRipples([...ripples, ripple]);
      
      // Clean up ripples
      setTimeout(() => {
        setRipples(current => current.filter(r => r.id !== ripple.id));
      }, 1000);
    }
    
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
      aria-label="Toggle theme"
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
