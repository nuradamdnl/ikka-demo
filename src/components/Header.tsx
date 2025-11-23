import { useEffect, useState } from "react";

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ms-MY", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ms-MY", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <header className="bg-blue-900 text-white py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/logo/jata-negara.png"
            alt="Jata Negara"
            className="h-16 w-auto"
          />
          <h1 className="text-yellow-400 text-xl font-bold uppercase">
            SISTEM INDEKS KESELAMATAN DAN KETENTERAMAN AWAM
          </h1>
        </div>

        {/* Date, Time, Duration */}
        <div className="flex gap-6 text-sm">
          <div>
            <div className="text-gray-300 text-xs">Tarikh</div>
            <div className="font-semibold">{formatDate(currentTime)}</div>
          </div>
          <div>
            <div className="text-gray-300 text-xs">Masa</div>
            <div className="font-semibold">{formatTime(currentTime)}</div>
          </div>
          <div>
            <div className="text-gray-300 text-xs">Tempoh</div>
            <div className="font-semibold">{formatDuration(duration)}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
