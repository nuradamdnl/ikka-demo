import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import StatCard from "../../components/StatCard";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import { Square3Stack3DIcon, CircleStackIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { getAllTeras, getKomponenByTeras, getIndikatorByTeras } from "../../lib/dataLookup";

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
            <SectionCard title="Statistik Keseluruhan">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <StatCard
                  icon={<Square3Stack3DIcon className="w-6 h-6" />}
                  title="Jumlah Teras"
                  value={totalTeras}
                  subtitle="Teras IKKA"
                />
                <StatCard
                  icon={<CircleStackIcon className="w-6 h-6" />}
                  title="Jumlah Komponen"
                  value={totalKomponen}
                  subtitle="Komponen IKKA"
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Jumlah Indikator"
                  value={totalIndikator}
                  subtitle="Indikator IKKA"
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Indeks Tahun Terkini"
                  value={104.3}
                  subtitle={<span className="text-green-600">▲ +1.5%</span>}
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Indeks Penggal Terkini"
                  value={101.1}
                  subtitle={<span className="text-red-600">▼ -0.8%</span>}
                />
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
