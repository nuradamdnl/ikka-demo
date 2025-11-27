import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
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
            <SectionCard title={`Komponen ${komponen?.["Kod Komponen"]}`} fullHeight={true}>
              <iframe 
                title="Prediktif_Teras 1" 
                width="100%" 
                height="800" 
                src="https://app.powerbi.com/view?r=eyJrIjoiMDM3OWEzODQtNmZmMy00ZjNiLWEwNDktNjg5NWU3OTAzY2Y2IiwidCI6ImNkY2JiMGUyLTlmZWEtNGY1NC04NjcwLTY3MjcwNzc5N2FkYSIsImMiOjEwfQ%3D%3D" 
                frameBorder="0" 
                allowFullScreen={true}
              />
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikPrediktifKomponen;
