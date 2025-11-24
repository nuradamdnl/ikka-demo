import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import IndeksCard from "../../components/IndeksCard";

function AnalisisIndeks() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Topbar />
        <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow p-6">
            <div className="container mx-auto">
                <PageTitle>Analisis Indeks</PageTitle>
                <SectionCard title="Analisis Indeks">
                <IndeksCard title="Contoh Indeks" value={75} />
                </SectionCard>
            </div>
            </main>
        </div>
        <Footer />
        </div>
    )
}

export default AnalisisIndeks;