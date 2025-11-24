import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import komponenData from "../../../assets/data/Komponen.json";

function AnalitikPrediktifKomponen() {
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
            <PageTitle>Analitik Prediktif - {komponen?.["Nama Komponen"]}</PageTitle>
            <PowerBIEmbed 
              title={`Komponen ${komponen?.["Kod Komponen"]}`}
              reportId="0379a384-6ff3-4f3b-a049-6895e7903cf6"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikPrediktifKomponen;
