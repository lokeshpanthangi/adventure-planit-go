
import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { createRippleEffect } from "@/lib/animation";

interface ButtonWithAnimationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  animationType?: "ripple" | "scale" | "bounce" | "none";
}

const ButtonWithAnimation = React.forwardRef<HTMLButtonElement, ButtonWithAnimationProps>(
  ({ className, variant, size, asChild = false, animationType = "scale", ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [isActive, setIsActive] = React.useState(false);

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onMouseDown) {
        props.onMouseDown(event);
      }

      setIsActive(true);
      
      if (animationType === "ripple" && buttonRef.current) {
        createRippleEffect(event);
      }
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onMouseUp) {
        props.onMouseUp(event);
      }

      setIsActive(false);
    };

    const animationClass = React.useMemo(() => {
      switch (animationType) {
        case "scale":
          return "transition-transform active:scale-95";
        case "bounce":
          return isActive ? "animate-bounce" : "";
        case "ripple":
          return "relative overflow-hidden";
        case "none":
        default:
          return "";
      }
    }, [animationType, isActive]);

    const combinedClassName = cn(animationClass, className);
    
    if (asChild) {
      return (
        <Slot
          ref={buttonRef || ref}
          className={combinedClassName}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          {...props}
        />
      );
    }

    return (
      <Button
        ref={buttonRef || ref}
        className={combinedClassName}
        variant={variant}
        size={size}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      />
    );
  }
);

ButtonWithAnimation.displayName = "ButtonWithAnimation";

export { ButtonWithAnimation };
