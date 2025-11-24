import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import terasData from "../../../assets/data/Teras.json";

function AnalitikDeskriptifKomponenKeseluruhan() {
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
            <PageTitle>Analitik Deskriptif - Komponen Keseluruhan {teras?.["Kod Teras"]}</PageTitle>
            <PowerBIEmbed 
              title={`Komponen Keseluruhan ${teras?.["Kod Teras"]}`}
              customReportIds={{
                barTahun: "11edfb93-46fb-4ed1-94d5-5c9daf429398",
                lineTahun: "e486a6a5-930d-459c-9045-42fcfebf4ae8"
              }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikDeskriptifKomponenKeseluruhan;
