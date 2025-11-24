import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import terasData from "../../../assets/data/Teras.json";

function AnalitikPreskriptifTeras() {
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
            <PageTitle>Analitik Preskriptif - {teras?.["Nama Teras"]}</PageTitle>
            <PowerBIEmbed title={`Teras ${teras?.["Kod Teras"]}`} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikPreskriptifTeras;
