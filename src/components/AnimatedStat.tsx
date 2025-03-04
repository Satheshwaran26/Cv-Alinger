
import { useState, useEffect } from "react";

interface AnimatedStatProps {
  value: string | number;
  label: string;
  duration?: number;
  delay?: number;
}

export const AnimatedStat = ({ value, label, duration = 2000, delay = 0 }: AnimatedStatProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const finalValue = typeof value === 'number' ? value : 
                     value.endsWith('+') ? parseInt(value.replace('+', '')) : 
                     value.endsWith('%') ? parseInt(value.replace('%', '')) : 
                     0;
  const suffix = typeof value === 'string' && value.endsWith('+') ? '+' : 
                typeof value === 'string' && value.endsWith('%') ? '%' : 
                '';

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        // Easing function for smoother animation near the end
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        setDisplayValue(Math.floor(easedProgress * finalValue));
        animationFrame = requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(finalValue);
      }
    };
    
    // Delay the start of animation if needed
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateValue);
    }, delay);
    
    return () => {
      clearTimeout(timer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [finalValue, duration, delay]);
  
  return (
    <div className="glass rounded-xl p-6 transition-transform hover:translate-y-[-5px]">
      <div className="font-semibold text-3xl mb-2 text-primary">
        {displayValue}{suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
