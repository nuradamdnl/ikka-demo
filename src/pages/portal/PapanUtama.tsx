import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import StatCard from "../../components/StatCard";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import { Square3Stack3DIcon, CircleStackIcon, ChartPieIcon, ScaleIcon, ShareIcon, QueueListIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { getAllTeras, getKomponenByTeras, getIndikatorByTeras } from "../../lib/dataLookup";
import GaugeCard from "../../components/GaugeCard";
import InfoCard from "../../components/InfoCard";
import { Scale } from "chart.js";

function PapanUtama() {
  const totalTeras = getAllTeras().length;
  const totalKomponen = getAllTeras().reduce(
    (sum, teras) => sum + getKomponenByTeras(teras["Kod Teras"]).length,
    0
  );
  const totalIndikator = getAllTeras().reduce(
    (sum, teras) => sum + getIndikatorByTeras(teras["Kod Teras"]).length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Papan Utama</PageTitle>

            {/* Statistics Section */}
            <SectionCard title="Instrumen dan Indeks Terkini">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <StatCard
                  icon={<ScaleIcon className="w-6 h-6" />}
                  title="Jumlah Teras"
                  value={totalTeras}
                  subtitle="Teras IKKA"
                />
                <StatCard
                  icon={<ShareIcon className="w-6 h-6" />}
                  title="Jumlah Komponen"
                  value={totalKomponen}
                  subtitle="Komponen IKKA"
                />
                <StatCard
                  icon={<QueueListIcon className="w-6 h-6" />}
                  title="Jumlah Indikator"
                  value={totalIndikator}
                  subtitle="Indikator IKKA"
                />
                <StatCard
                  icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                  title="Indeks Tahun Terkini"
                  value={104.3}
                  subtitle={<span className="text-green-600">▲ +1.5%</span>}
                />
                <StatCard
                  icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                  title="Indeks Penggal Terkini"
                  value={101.1}
                  subtitle={<span className="text-red-600">▼ -0.8%</span>}
                />
              </div>
            </SectionCard>
            <SectionCard title="Status Kemasukan Data">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <GaugeCard title="Teras 1" value={75} />
                <GaugeCard title="Teras 2" value={85} />
                <GaugeCard title="Teras 3" value={63} />
                <GaugeCard title="Teras 4" value={40} />
                <GaugeCard title="Teras 5" value={95} />
              </div>
            </SectionCard>
            <SectionCard title="Berita Semasa">
              <div className="space-y-4">
                {/* News item 1 */}
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg shadow-sm">
                  <span className="text-yellow-600 text-xl">📰</span>
                  <div>
                    <p className="text-gray-900 font-medium">
                      Kemaskini garis panduan indikator Q3 telah diterbitkan.
                    </p>
                    <span className="text-sm text-gray-500">23 Nov 2025 • 18:11</span>
                  </div>
                </div>

                {/* News item 2 */}
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg shadow-sm">
                  <span className="text-blue-600 text-xl">⚙️</span>
                  <div>
                    <p className="text-gray-900 font-medium">
                      Penambahbaikan borang kemasukan data: validasi medan “Bilangan Kes”.
                    </p>
                    <span className="text-sm text-gray-500">23 Nov 2025 • 18:11</span>
                  </div>
                </div>

                {/* News item 3 */}
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg shadow-sm">
                  <span className="text-green-600 text-xl">📅</span>
                  <div>
                    <p className="text-gray-900 font-medium">
                      Jadual semakan data antara agensi ditetapkan pada 28–30 Aug.
                    </p>
                    <span className="text-sm text-gray-500">23 Nov 2025 • 18:11</span>
                  </div>
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Analitik">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <InfoCard image="src/assets/images/chart-blue.png" title="Deskriptif" subtitle="Melihat paten indeks indikator dan komponen" />
              <InfoCard image="src/assets/images/chart-purple.png" title="Diagnostik" subtitle="Mendiagnostik paten indeks" />
              <InfoCard image="src/assets/images/chart-turqoise.png" title="Prediktif" subtitle="Meramal paten indeks" />
              <InfoCard image="src/assets/images/chart-yellow.png" title="Preskriptif" subtitle="Menyarankan tindakan berdasarkan indeks" />
              </div>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PapanUtama;
