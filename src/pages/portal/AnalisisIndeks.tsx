import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import IndeksCard from "../../components/IndeksCard";
import ProgressCard from "../../components/ProgressCard";
import TabbedSectionCard from "../../components/TabbedSectionCard";
import InputCard from "../../components/InputCard";

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
                            <div className="flex flex-col gap-6">
                                <IndeksCard title="Indeks IKKA Terkini" value={82.7} />
                                <ProgressCard title="Teras 1" subtitle="Perlembagaan & Undang-Undang" value={78.5} maxValue={100} />
                                <ProgressCard title="Teras 2" subtitle="Tatakelola & Integriti Agensi Penguatkuasaan" value={45.2} maxValue={100} />
                                <ProgressCard title="Teras 3" subtitle="Pengukuhan Keselamatan Sempadan" value={92.8} maxValue={100} />
                                <ProgressCard title="Teras 4" subtitle="Keselamatan Sosial, Ekonomi & Politik" value={23.6} maxValue={100} />
                                <ProgressCard title="Teras 5" subtitle="Perlindungan Aset Keselamatan Negara" value={67.9} maxValue={100} />
                            </div>
                        </SectionCard>

                        <TabbedSectionCard
                            tabs={[
                                { id: "perincian", label: "Perincian" },
                                { id: "prestasi", label: "Prestasi" },
                            ]}
                            sections={{
                                perincian: (
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputCard
                                                title="Pilih Tahun"
                                                dropdownValues={[
                                                    { value: "2020", label: "2020" },
                                                    { value: "2021", label: "2021" },
                                                    { value: "2022", label: "2022" },
                                                    { value: "2023", label: "2023" },
                                                    { value: "2024", label: "2024" },
                                                    { value: "2025", label: "2025" },
                                                ]}
                                            />
                                            <InputCard
                                                title="Pilih Penggal"
                                                dropdownValues={[
                                                    { value: "jun", label: "Jun" },
                                                    { value: "dis", label: "Dis" },
                                                ]}
                                            />
                                        </div>
                                        <IndeksCard title="Indeks IKKA Terkini" value={82.7} />
                                    </div>
                                ),
                                prestasi: (
                                    <div className="text-gray-600">
                                        <p>Analisis Komponen content will be displayed here.</p>
                                    </div>
                                )
                            }}
                            defaultTab="perincian"
                        />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default AnalisisIndeks;