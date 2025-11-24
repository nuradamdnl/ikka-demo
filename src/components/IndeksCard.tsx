import { useState, useEffect } from "react";

type IndeksCardProps = {
  title: string;
  value: number;
  animateDuration?: number;
};

function IndeksCard({ title, value, animateDuration = 1000 }: IndeksCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = animateDuration;
    const increment = end / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, animateDuration]);

  // Determine color based on value ranges
  const getValueColor = (val: number): string => {
    if (val >= 75) return "text-green-600"; // High
    if (val >= 50) return "text-blue-600";  // Medium-High
    if (val >= 25) return "text-yellow-600"; // Medium-Low
    return "text-red-600"; // Low
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-gray-600 text-center mb-2">
        {title}
      </h3>
      <p className={`text-4xl font-bold ${getValueColor(value)}`}>
        {displayValue.toFixed(2)}
      </p>
    </div>
  );
}

export default IndeksCard;
