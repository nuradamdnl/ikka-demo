import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import NavigationCard from "../../components/NavigationCard";
import { Square3Stack3DIcon, CircleStackIcon, ChartPieIcon } from "@heroicons/react/24/outline";

function PengurusanParameter() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Pengurusan Parameter</PageTitle>
            <SectionCard title="Parameter Sistem">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NavigationCard
                  icon={<Square3Stack3DIcon className="w-6 h-6" />}
                  title="Teras"
                  subtitle="Urus teras"
                  route="/pengurusan-parameter/teras"
                />
                <NavigationCard
                  icon={<CircleStackIcon className="w-6 h-6" />}
                  title="Komponen"
                  subtitle="Urus komponen"
                  route="/pengurusan-parameter/komponen"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Indikator"
                  subtitle="Urus indikator"
                  route="/pengurusan-parameter/indikator"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Pemilik Data"
                  subtitle="Agensi dan jabatan"
                  route="/pengurusan-parameter/pemilik-data"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Kod Guna Pakai"
                  subtitle="Senarai kod guna pakai"
                  route="/pengurusan-parameter/kod-guna-pakai"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Rubrik"
                  subtitle="Senarai rubrik"
                  route="/pengurusan-parameter/rubrik"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Penetapan Tahun Asas"
                  subtitle="Tetap tahun asas"
                  route="/pengurusan-parameter/penetapan-tahun-asas"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Penetapan Indikator"
                  subtitle="Tetap indikator"
                  route="/pengurusan-parameter/penetapan-indikator"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Penetapan Komponen"
                  subtitle="Tetap komponen"
                  route="/pengurusan-parameter/penetapan-komponen"
                />
                <NavigationCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Kawal & Urus Data Meter"
                  subtitle="Urus dan semak data meter yang digunakan dalam analisis sistem."
                  route="/pengurusan-parameter/penetapan-teras"
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

export default PengurusanParameter;
