import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import terasData from "../../../assets/data/Teras.json";
import komponenData from "../../../assets/data/Komponen.json";

function AnalitikDiagnostikKomponen() {
    const { kodTeras, kodKomponen } = useParams<{ kodTeras: string; kodKomponen: string }>();
    
    const teras = terasData.find(t => t["Kod Teras"].toLowerCase() === kodTeras?.toUpperCase());
    const komponen = komponenData.find(k => k["Kod Komponen"].toLowerCase() === kodKomponen?.toUpperCase());

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-6">
                    <div className="container mx-auto">
                        <PageTitle>Analitik Diagnostik - {komponen?.["Nama Komponen"] || "Komponen"}</PageTitle>
                        <SectionCard title={`${teras?.["Nama Teras"]} - ${komponen?.["Nama Komponen"]}`}>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600"><strong>Kod Teras:</strong> {teras?.["Kod Teras"]}</p>
                                    <p className="text-sm text-gray-600"><strong>Kod Komponen:</strong> {komponen?.["Kod Komponen"]}</p>
                                </div>
                                <p className="text-gray-600">Analitik Diagnostik content for this Komponen will be implemented here.</p>
                            </div>
                        </SectionCard>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default AnalitikDiagnostikKomponen;
