import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import komponenData from "../../../assets/data/Komponen.json";

function AnalitikDeskriptifKomponen() {
  const { kodTeras, kodKomponen } = useParams<{ kodTeras: string; kodKomponen: string }>();
  const komponen = komponenData.find(k => k["Kod Komponen"].toUpperCase() === kodKomponen?.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Analitik Deskriptif - {komponen?.["Nama Komponen"]}</PageTitle>
            <PowerBIEmbed 
              title={`Komponen ${komponen?.["Kod Komponen"]}`}
              customReportIds={{
                barTahun: "60084b0b-47fe-49e2-b197-0ac16de219a3",
                lineTahun: "cec3cda1-c883-4883-b3b2-2523a5a7cc72"
              }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikDeskriptifKomponen;
