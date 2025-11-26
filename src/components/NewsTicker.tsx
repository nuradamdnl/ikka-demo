import { useState } from "react";
import { SpeakerphoneIcon } from "@heroicons/react/24/outline";

function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);

  const newsItems = [
    "Tarikh akhir kemasukan data: 15 Disember 2025",
    "Mesyuarat IKKA Suku Tahun ke-4 akan diadakan pada 20 Disember 2025",
    "Sistem akan menjalani maintenance pada 10 Disember 2025, 2:00 AM - 4:00 AM",
    "Laporan Tahunan IKKA 2024 kini boleh dimuat turun",
    "Penjanaan Indeks Suku Tahun ke-3 telah selesai",
  ];

  return (
    <div className="bg-blue-50 border-b border-blue-200 py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="px-4 flex-shrink-0">
          <SpeakerphoneIcon className="w-5 h-5 text-blue-900" />
        </div>
        <div className="flex-grow overflow-hidden relative">
          <div
            className={`flex gap-8 whitespace-nowrap ${
              isPaused ? "" : "animate-ticker"
            }`}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Duplicate news items for seamless loop */}
            {[...newsItems, ...newsItems].map((news, i) => (
              <span key={i} className="text-sm text-gray-700">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsTicker;
