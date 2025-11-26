import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Topbar() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  const handleLogout = () => {
    navigate("/log-masuk");
  };

  const newsItems = [
    "Tarikh akhir kemasukan data: 15 Disember 2025",
    "Mesyuarat IKKA Suku Tahun ke-4 akan diadakan pada 20 Disember 2025",
    "Sistem akan menjalani maintenance pada 10 Disember 2025, 2:00 AM - 4:00 AM",
    "Laporan Tahunan IKKA 2024 kini boleh dimuat turun",
    "Penjanaan Indeks Suku Tahun ke-3 telah selesai",
  ];

  return (
    <>
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left Section - Penggal and Tahun */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Penggal:</span>
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded">
                Jun
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Tahun:</span>
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded">
                2025
              </span>
            </div>
          </div>

          {/* Right Section - Pengguna */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Pengguna:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">SUPER</span>
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-sm font-medium">
                SU
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
              title="Log Keluar"
            >
              <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
              <span>Log Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-blue-50 border-b border-blue-200 py-2 overflow-hidden">
        <div className="flex items-center">
          <div className="px-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
            </svg>
          </div>
          <div className="flex-grow overflow-hidden relative">
            <div
              className="flex gap-8 whitespace-nowrap animate-ticker"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {[...newsItems, ...newsItems].map((news, i) => (
                <span key={i} className="text-sm text-gray-700">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;

