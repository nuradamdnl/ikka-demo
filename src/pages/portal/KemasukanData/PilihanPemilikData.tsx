import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";

function PilihanPemilikData() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-6">
                    <div className="container mx-auto">
                        <PageTitle>Pilihan Pemilik Data</PageTitle>
                        <SectionCard title="test">
                            <p>hello</p>
                        </SectionCard>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default PilihanPemilikData;