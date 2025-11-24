import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import komponenData from "../../../assets/data/Komponen.json";

function AnalitikPreskriptifKomponenPreskriptif() {
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
            <PageTitle>Analitik Preskriptif - Preskriptif Komponen {komponen?.["Kod Komponen"]}</PageTitle>
            <PowerBIEmbed 
              title={`Preskriptif Komponen ${komponen?.["Kod Komponen"]}`}
              reportId="75e73b24-9b90-4bb8-9216-9ffe0e5a9388"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikPreskriptifKomponenPreskriptif;
