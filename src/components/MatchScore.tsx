
import { useState, useEffect } from "react";

interface MatchScoreProps {
  score: number;
  showPercentage?: boolean;
}

export const MatchScore = ({ score, showPercentage = true }: MatchScoreProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    // Animate the score from 0 to the actual value
    const duration = 1500; // milliseconds
    const interval = 10;
    const steps = duration / interval;
    const increment = score / steps;
    let currentScore = 0;
    
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        clearInterval(timer);
        setDisplayScore(score);
      } else {
        setDisplayScore(Math.floor(currentScore));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [score]);
  
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getScoreBackground = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const circleCircumference = 2 * Math.PI * 45; // r = 45
  const dashOffset = circleCircumference - (displayScore / 100) * circleCircumference;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background circle */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="6"
          />
        </svg>
        
        {/* Progress circle */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getScoreBackground()}
            strokeWidth="6"
            strokeDasharray={circleCircumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor()}`}>
            {displayScore}
            {showPercentage && "%"}
          </div>
          <div className="text-sm text-muted-foreground">Match Score</div>
        </div>
      </div>
    </div>
  );
};
