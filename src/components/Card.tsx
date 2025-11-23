import { useState, useEffect } from "react";

type CardProps = {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  animateDuration?: number;
};

function Card({ icon, title, value, subtitle, animateDuration = 1000 }: CardProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const isNumber = typeof value === "number";

  useEffect(() => {
    if (!isNumber) {
      setDisplayValue(value);
      return;
    }

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
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isNumber, animateDuration]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{displayValue}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
