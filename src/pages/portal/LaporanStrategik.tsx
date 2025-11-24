import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import AnalisisIndeks from "./AnalisisIndeks";

function LaporanStrategik() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Topbar />
        <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow p-6">
            <div className="container mx-auto">
                <PageTitle>Laporan Strategik</PageTitle>
                <SectionCard title="Laporan Strategik">
                {/* Content for Laporan Strategik goes here */}
                <p>Ini adalah halaman laporan strategik.</p>
                </SectionCard>
            </div>
            </main>
        </div>
        <Footer />
        </div>
    )
}

export default LaporanStrategik;