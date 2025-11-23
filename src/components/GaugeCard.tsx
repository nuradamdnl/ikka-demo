import { useState, useEffect } from "react";

type GaugeCardProps = {
  title: string;
  value: number; // percentage 0-100
};

function GaugeCard({ title, value }: GaugeCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(Math.max(value, 0), 100); // clamp between 0-100
    const duration = 1000;
    const increment = end / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedValue(end);
        clearInterval(timer);
      } else {
        setAnimatedValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  // Determine color based on percentage
  const getTextColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    if (percentage >= 25) return "text-orange-600";
    return "text-red-600";
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-gray-600 mb-4">{title}</p>
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-300 ${
                animatedValue >= 75 ? "text-green-500" :
                animatedValue >= 50 ? "text-yellow-500" :
                animatedValue >= 25 ? "text-orange-500" :
                "text-red-500"
              }`}
              strokeLinecap="round"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className={`text-3xl font-bold ${getTextColor(animatedValue)}`}>
              {animatedValue.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GaugeCard;
