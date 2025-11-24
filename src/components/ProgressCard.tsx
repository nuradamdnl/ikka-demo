import { useState, useEffect } from "react";

type ProgressCardProps = {
  title: string;
  subtitle?: string;
  value: number;
  maxValue?: number;
  animateDuration?: number;
};

function ProgressCard({ title, subtitle, value, maxValue = 100, animateDuration = 1000 }: ProgressCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = animateDuration;
    const increment = end / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        setDisplayProgress((end / maxValue) * 100);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
        setDisplayProgress((start / maxValue) * 100);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, maxValue, animateDuration]);

  // Determine color based on value ranges
  const getColor = (val: number): { text: string; bg: string } => {
    const percentage = (val / maxValue) * 100;
    if (percentage >= 75) return { text: "text-green-600", bg: "bg-green-600" }; // High
    if (percentage >= 50) return { text: "text-blue-600", bg: "bg-blue-600" };   // Medium-High
    if (percentage >= 25) return { text: "text-yellow-600", bg: "bg-yellow-600" }; // Medium-Low
    return { text: "text-red-600", bg: "bg-red-600" }; // Low
  };

  const colors = getColor(value);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-gray-500 mb-3">
          {subtitle}
        </p>
      )}
      <p className={`text-3xl font-bold ${colors.text} mb-4`}>
        {displayValue.toFixed(2)}
      </p>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colors.bg} transition-all duration-300 rounded-full`}
          style={{ width: `${Math.min(displayProgress, 100)}%` }}
        />
      </div>
      
      {/* Progress Percentage */}
      <p className="text-xs text-gray-500 mt-2 text-right">
        {displayProgress.toFixed(1)}%
      </p>
    </div>
  );
}

export default ProgressCard;