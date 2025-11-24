import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import StatCard from "../../../components/StatCard";
import { Square3Stack3DIcon, CircleStackIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import TabbedSectionCard from "../../../components/TabbedSectionCard";
import DataMeterChart from "../../../components/DataMeterChart";
import DataMeterPICTable from "../../../components/tables/DataMeterPICTable";

function DataMeter() {
  const handleAlert = (pic: any) => {
    alert(
      `Peringatan akan dihantar kepada:\n\nNama: ${pic["Nama PIC"]}\nJabatan: ${pic["Jabatan PIC"]}\nNo Telefon: ${pic["No Telefon"]}\nIndikator: ${pic["Senarai Indikator"]}\n\nStatus: ${pic["Status Data Meter"]}`
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Kawal & Urus Data Meter</PageTitle>
            <SectionCard title="Data Meter">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  icon={<Square3Stack3DIcon className="w-6 h-6" />}
                  title="Bilangan Bahagian KDN"
                  value={6}
                  subtitle="Bahagian Pentadbiran & Operasi"
                />
                <StatCard
                  icon={<CircleStackIcon className="w-6 h-6" />}
                  title="Bilangan Jabatan Di Bawah KDN"
                  value={21}
                  subtitle="Agensi Berkanun & Jabatan"
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Bilangan Jabatan Perdana Menteri (JPM)"
                  value={7}
                  subtitle="Jabatan & Agensi JPM"
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Bilangan Jabatan Kementerian Kewangan (MOF)"
                  value={2}
                  subtitle="Jabatan & Agensi MOF"
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Bilangan Jabatan Kementrian Pertahanan (MINDEF)"
                  value={1}
                  subtitle="Jabatan & Agensi MINDEF"
                />
                <StatCard
                  icon={<ChartPieIcon className="w-6 h-6" />}
                  title="Bilangan Kementrian Digital (MD)"
                  value={2}
                  subtitle="Jabatan & Agensi MD"
                />
              </div>
            </SectionCard>
            
            <TabbedSectionCard
              tabs={[
                { id: "susun-asal", label: "Susun Asal" },
                { id: "lengkap-belum", label: "Lengkap → Belum Lengkap" },
                { id: "belum-lengkap", label: "Belum Lengkap → Lengkap" },
                { id: "hanya-100", label: "Hanya 100%" },
              ]}
              sections={{
                "susun-asal": (
                  <div className="p-4">
                    <DataMeterChart 
                      data={[
                        { kodJabatan: "JSPT", percentage: 30 },
                        { kodJabatan: "JSJN", percentage: 75 },
                        { kodJabatan: "PJSJ", percentage: 100 },
                        { kodJabatan: "JPJK", percentage: 50 },
                        { kodJabatan: "JIPS", percentage: 15 },
                        { kodJabatan: "CWKH", percentage: 90 },
                        { kodJabatan: "AMLA", percentage: 60 },
                        { kodJabatan: "FRUM", percentage: 45 },
                      ]}
                    />
                  </div>
                ),
                "lengkap-belum": (
                  <div className="p-4">
                    <DataMeterChart 
                      data={[
                        { kodJabatan: "PJSJ", percentage: 100 },
                        { kodJabatan: "CWKH", percentage: 90 },
                        { kodJabatan: "JSJN", percentage: 75 },
                        { kodJabatan: "AMLA", percentage: 60 },
                        { kodJabatan: "JPJK", percentage: 50 },
                        { kodJabatan: "FRUM", percentage: 45 },
                        { kodJabatan: "JSPT", percentage: 30 },
                        { kodJabatan: "JIPS", percentage: 15 },
                      ]}
                    />
                  </div>
                ),
                "belum-lengkap": (
                  <div className="p-4">
                    <DataMeterChart 
                      data={[
                        { kodJabatan: "JIPS", percentage: 15 },
                        { kodJabatan: "JSPT", percentage: 30 },
                        { kodJabatan: "FRUM", percentage: 45 },
                        { kodJabatan: "JPJK", percentage: 50 },
                        { kodJabatan: "AMLA", percentage: 60 },
                        { kodJabatan: "JSJN", percentage: 75 },
                        { kodJabatan: "CWKH", percentage: 90 },
                        { kodJabatan: "PJSJ", percentage: 100 },
                      ]}
                    />
                  </div>
                ),
                "hanya-100": (
                  <div className="p-4">
                    <DataMeterChart 
                      data={[
                        { kodJabatan: "JSPT", percentage: 100 },
                        { kodJabatan: "JSJN", percentage: 100 },
                        { kodJabatan: "PJSJ", percentage: 100 },
                        { kodJabatan: "JPJK", percentage: 100 },
                        { kodJabatan: "JIPS", percentage: 100 },
                        { kodJabatan: "CWKH", percentage: 100 },
                        { kodJabatan: "AMLA", percentage: 100 },
                        { kodJabatan: "FRUM", percentage: 100 },
                      ]}
                    />
                  </div>
                ),
              }}
              defaultTab="susun-asal"
            />

            <SectionCard title="Senarai Indikator & Person-in-Charge">
              <DataMeterPICTable onAlert={handleAlert} />
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DataMeter;
