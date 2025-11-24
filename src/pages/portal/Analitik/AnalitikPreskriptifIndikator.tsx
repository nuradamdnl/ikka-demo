import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";
import indikatorData from "../../../assets/data/Indikator.json";

function AnalitikPreskriptifIndikator() {
  const { kodTeras, kodKomponen, kodIndikator } = useParams<{ kodTeras: string; kodKomponen: string; kodIndikator: string }>();
  const indikator = indikatorData.find(i => i["Kod Indikator"].toUpperCase() === kodIndikator?.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Analitik Preskriptif - Preskriptif Indikator {indikator?.["Kod Indikator"]}</PageTitle>
            <PowerBIEmbed 
              title={`Preskriptif Indikator ${indikator?.["Kod Indikator"]}`}
              reportId="f6c996cc-b462-4378-bb10-ef47b2c75b09"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikPreskriptifIndikator;
