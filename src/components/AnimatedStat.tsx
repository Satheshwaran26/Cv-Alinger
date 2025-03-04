
import { useState, useEffect } from "react";

interface AnimatedStatProps {
  value: string | number;
  label: string;
  duration?: number;
  delay?: number;
}

export const AnimatedStat = ({ value, label, duration = 2000, delay = 0 }: AnimatedStatProps) => {
  const [displayValue, setDisplayValue] = useState<string | number>("0");
  
  // Determine if the value can be animated (is a number or can be parsed as one)
  const canBeAnimated = () => {
    if (typeof value === 'number') return true;
    
    // Check if it's a number with a suffix
    const numericPart = value.replace(/[^0-9]/g, '');
    return numericPart.length > 0;
  };
  
  // Parse the numeric part of the value
  const getNumericValue = (): number => {
    if (typeof value === 'number') return value;
    
    const numericPart = value.replace(/[^0-9]/g, '');
    return numericPart.length > 0 ? parseInt(numericPart, 10) : 0;
  };
  
  // Get the suffix part of the value (%, +, etc.)
  const getSuffix = (): string => {
    if (typeof value === 'string') {
      const match = value.match(/[^0-9]+$/);
      return match ? match[0] : '';
    }
    return '';
  };
  
  useEffect(() => {
    // If the value can't be animated, just display it directly
    if (!canBeAnimated()) {
      setDisplayValue(value);
      return;
    }
    
    const finalValue = getNumericValue();
    const suffix = getSuffix();
    
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
        
        const currentValue = Math.floor(easedProgress * finalValue);
        setDisplayValue(`${currentValue}${suffix}`);
        animationFrame = requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(`${finalValue}${suffix}`);
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
  }, [value, duration, delay]);
  
  return (
    <div className="glass rounded-xl p-6 transition-transform hover:translate-y-[-5px]">
      <div className="font-semibold text-3xl mb-2 text-primary">
        {displayValue}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
