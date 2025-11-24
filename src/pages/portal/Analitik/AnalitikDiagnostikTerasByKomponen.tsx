import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import terasData from "../../../assets/data/Teras.json";

function AnalitikDiagnostikTerasByKomponen() {
  const { kodTeras } = useParams<{ kodTeras: string }>();
  const teras = terasData.find(t => t["Kod Teras"].toUpperCase() === kodTeras?.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Analitik Diagnostik - Teras by Komponen</PageTitle>
            <PowerBIEmbed 
              title={`${teras?.["Nama Teras"]} - Teras by Komponen`}
              reportId="22bebd50-a5c9-453c-b9a2-9ca673c39ba6"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikDiagnostikTerasByKomponen;
