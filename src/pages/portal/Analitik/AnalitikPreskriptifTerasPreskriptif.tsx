import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import terasData from "../../../assets/data/Teras.json";

function AnalitikPreskriptifTerasPreskriptif() {
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
            <PageTitle>Analitik Preskriptif - Preskriptif Teras {teras?.["Kod Teras"]}</PageTitle>
            <PowerBIEmbed 
              title={`Preskriptif Teras ${teras?.["Kod Teras"]}`}
              reportId="3db6c4cc-1d18-4f1e-b1f6-8cbcad6dcf72"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikPreskriptifTerasPreskriptif;
