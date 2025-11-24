import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { 
  ScaleIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  UserGroupIcon, 
  LockClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import terasData from "../../assets/data/Teras.json";

function LamanUtama() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const newsItems = [
    {
      image: "/src/assets/images/berita-1.png",
      title: "Kemaskini Garis Panduan Indikator Q3 2025",
      description: "Garis panduan terbaru untuk pengukuran indikator Q3 telah diterbitkan. Semua agensi diminta untuk mengikuti panduan yang dikemaskini.",
    },
    {
      image: "/src/assets/images/berita-2.png",
      title: "Penambahbaikan Sistem Kemasukan Data",
      description: "Sistem kemasukan data telah dinaik taraf dengan validasi medan baharu untuk meningkatkan ketepatan data.",
    },
    {
      image: "/src/assets/images/berita-3.png",
      title: "Jadual Semakan Data Antara Agensi",
      description: "Sesi semakan data bersama agensi-agensi berkaitan akan diadakan pada 28-30 Ogos 2025.",
    },
    {
      image: "/src/assets/images/berita-1.png",
      title: "Laporan IKKA Tahunan 2024",
      description: "Laporan tahunan IKKA 2024 kini boleh dimuat turun. Skor keseluruhan menunjukkan peningkatan sebanyak 1.3%.",
    },
  ];

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const skorData: { [key: number]: { skor: number; change: number } } = {
    2020: { skor: 98.45, change: 0 },
    2021: { skor: 100.12, change: 1.7 },
    2022: { skor: 101.85, change: 1.73 },
    2023: { skor: 103.42, change: 1.54 },
    2024: { skor: 104.76, change: 1.3 },
    2025: { skor: 103.98, change: -0.8 },
  };

  const years = Object.keys(skorData).map(Number);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      height: 300,
    },
    title: {
      text: "Indeks IKKA Sepanjang Tahun",
    },
    xAxis: {
      categories: years.map(String),
      title: {
        text: "Tahun",
      },
    },
    yAxis: {
      title: {
        text: "Indeks IKKA",
      },
      min: 95,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Skor IKKA",
        type: "column",
        data: years.map((year) => skorData[year].skor),
        color: "#1e3a8a",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Video Background */}
        <div className="relative h-screen overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/src/assets/videos/malaysia-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                Indeks Kualiti Kehidupan Malaysia
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-light drop-shadow-md">
                Mengukur Kesejahteraan Rakyat Malaysia
              </p>
            </div>
          </div>
        </div>

        {/* Instrument IKKA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Instrument IKKA</h2>
              <p className="text-xl text-gray-600">
                Instrumen untuk mengukur Indeks Keselamatan dan Ketenteraman Awam Negara
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* First Column - Big Blue Card */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-900 rounded-2xl shadow-xl p-8 text-white flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold mb-6">Skor IKKA untuk {selectedYear}</h3>
                <div className="text-center">
                  <div className="text-7xl font-bold mb-4">{skorData[selectedYear].skor}</div>
                  <div className="text-xl flex items-center justify-center gap-2">
                    <span className={skorData[selectedYear].change >= 0 ? "text-green-300" : "text-red-300"}>
                      {skorData[selectedYear].change >= 0 ? "▲" : "▼"} {Math.abs(skorData[selectedYear].change)}%
                    </span>
                    <span className="text-blue-200">berbanding tahun lepas</span>
                  </div>
                </div>
              </div>

              {/* Second Column - Year Selection & Chart */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pilih Tahun</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        selectedYear === year
                          ? "bg-blue-900 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>

                {/* Mini Bar Chart */}
                <div className="mt-6">
                  <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apa itu IKKA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Apa itu IKKA?</h2>
              <p className="text-xl text-gray-600">
                Lima Teras Utama Indeks Keselamatan dan Ketenteraman Awam
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Teras 1 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <ScaleIcon className="w-8 h-8 text-blue-900" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {terasData[0]["Kod Teras"]}
                </h3>
                <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">
                  {terasData[0]["Nama Teras"]}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Memastikan sistem perundangan yang kukuh dan adil untuk menjaga keamanan rakyat.
                </p>
              </div>

              {/* Teras 2 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="w-8 h-8 text-green-700" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {terasData[1]["Kod Teras"]}
                </h3>
                <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">
                  {terasData[1]["Nama Teras"]}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Memperkukuh integriti dan keberkesanan agensi penguatkuasaan negara.
                </p>
              </div>

              {/* Teras 3 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <GlobeAltIcon className="w-8 h-8 text-yellow-700" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {terasData[2]["Kod Teras"]}
                </h3>
                <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">
                  {terasData[2]["Nama Teras"]}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Melindungi kedaulatan negara melalui kawalan sempadan yang ketat dan berkesan.
                </p>
              </div>

              {/* Teras 4 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="w-8 h-8 text-purple-700" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {terasData[3]["Kod Teras"]}
                </h3>
                <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">
                  {terasData[3]["Nama Teras"]}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Memelihara kestabilan sosial, ekonomi, dan politik untuk kesejahteraan rakyat.
                </p>
              </div>

              {/* Teras 5 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <LockClosedIcon className="w-8 h-8 text-red-700" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {terasData[4]["Kod Teras"]}
                </h3>
                <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">
                  {terasData[4]["Nama Teras"]}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Menjaga aset kritikal dan infrastruktur penting negara daripada ancaman.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Berita Semasa Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Berita Semasa</h2>
              <p className="text-xl text-gray-600">
                Berita dan Kemaskini Terkini IKKA
              </p>
            </div>

            {/* Carousel */}
            <div className="relative">
              {/* News Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((offset) => {
                  const index = (currentNewsIndex + offset) % newsItems.length;
                  return (
                    <div key={offset} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      <img
                        src={newsItems[index].image}
                        alt={newsItems[index].title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {newsItems[index].title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                          {newsItems[index].description}
                        </p>
                        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm">
                          Lihat
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevNews}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Previous news"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextNews}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Next news"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-900" />
              </button>

              {/* Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentNewsIndex === index ? "bg-blue-900" : "bg-gray-300"
                    }`}
                    aria-label={`Go to news ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LamanUtama;
