import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import InfoCard from "../../../components/InfoCard";
import { useNavigate } from "react-router-dom";
import pemilikDataJson from "../../../assets/data/PemilikData.json";

function PilihanPemilikData() {
    const navigate = useNavigate();

    // Get unique jabatan entries
    const uniqueJabatan = Array.from(
        new Map(
            pemilikDataJson.map(item => [
                item["Kod Jabatan"],
                {
                    kodJabatan: item["Kod Jabatan"],
                    namaJabatan: item["Nama Jabatan"]
                }
            ])
        ).values()
    );

    const handleCardClick = () => {
        navigate("/kemasukan-data/borang-data");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-6">
                    <div className="container mx-auto">
                        <PageTitle>Pilihan Pemilik Data</PageTitle>
                        <SectionCard title="Pilih Pemilik Data">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {uniqueJabatan.map((jabatan) => (
                                    <InfoCard
                                        key={jabatan.kodJabatan}
                                        image={`/src/assets/images/pemilik-data/${jabatan.kodJabatan.toLowerCase()}.jpeg`}
                                        title={jabatan.kodJabatan}
                                        subtitle={jabatan.namaJabatan}
                                        onButtonClick={handleCardClick}
                                        buttonText="Lihat"
                                    />
                                ))}
                            </div>
                        </SectionCard>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default PilihanPemilikData;