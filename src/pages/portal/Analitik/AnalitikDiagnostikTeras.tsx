import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import terasData from "../../../assets/data/Teras.json";

function AnalitikDiagnostikTeras() {
    const { kodTeras } = useParams<{ kodTeras: string }>();
    const teras = terasData.find(t => t["Kod Teras"].toLowerCase() === kodTeras?.toUpperCase());

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-6">
                    <div className="container mx-auto">
                        <PageTitle>Analitik Diagnostik - {teras?.["Nama Teras"] || "Teras"}</PageTitle>
                        <SectionCard title={`${teras?.["Kod Teras"]} - ${teras?.["Nama Teras"]}`}>
                            <p className="text-gray-600">Analitik Diagnostik content for this Teras will be implemented here.</p>
                        </SectionCard>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default AnalitikDiagnostikTeras;
