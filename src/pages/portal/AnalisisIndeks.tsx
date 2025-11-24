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
import Table from "../../components/Table";
import IndeksTerasLineChart from "../../components/IndeksTerasLineChart";
import terasData from "../../assets/data/Teras.json";
import komponenData from "../../assets/data/Komponen.json";
import indeksKomponenData from "../../assets/data/IndeksKomponen.json";

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

                        <SectionCard title="Analisis Teras">
                            <IndeksTerasLineChart />
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
                                        <Table
                                            columns={[
                                                { header: "Bil", accessor: "bil", width: "60px" },
                                                { header: "Teras", accessor: "teras" },
                                                { header: "Jun", accessor: "jun" },
                                                { header: "Dis", accessor: "dis" },
                                            ]}
                                            data={[
                                                { bil: 1, teras: "Perlembagaan & Undang-Undang", jun: "78.5", dis: "82.3" },
                                                { bil: 2, teras: "Tatakelola & Integriti Agensi Penguatkuasaan", jun: "45.2", dis: "52.8" },
                                                { bil: 3, teras: "Pengukuhan Keselamatan Sempadan", jun: "92.8", dis: "88.7" },
                                                { bil: 4, teras: "Keselamatan Sosial, Ekonomi & Politik", jun: "23.6", dis: "18.4" },
                                                { bil: 5, teras: "Perlindungan Aset Keselamatan Negara", jun: "67.9", dis: "71.2" },
                                            ]}
                                            searchable={true}
                                            searchPlaceholder="Cari teras..."
                                        />
                                    </div>
                                ),
                                prestasi: (
                                    <div className="flex flex-col gap-6">
                                        {terasData.map((teras) => {
                                            // Get komponens for this teras
                                            const komponens = komponenData.filter(k => k["Kod Teras"] === teras["Kod Teras"]);
                                            
                                            // Get latest indeks values for each komponen (2025 data)
                                            const tableData = komponens.map((komponen, index) => {
                                                const indeksRecord = indeksKomponenData.find(
                                                    i => i["Kod Komponen"] === komponen["Kod Komponen"] && i.Tahun === 2025
                                                );
                                                
                                                return {
                                                    bil: index + 1,
                                                    komponen: komponen["Nama Komponen"],
                                                    indeks: indeksRecord ? parseFloat(indeksRecord.Indeks).toFixed(2) : "N/A"
                                                };
                                            });

                                            return (
                                                <div key={teras["Kod Teras"]}>
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                                        {teras["Kod Teras"]}: {teras["Nama Teras"]}
                                                    </h3>
                                                    <Table
                                                        columns={[
                                                            { header: "Bil", accessor: "bil", width: "60px" },
                                                            { header: "Komponen", accessor: "komponen" },
                                                            { header: "Indeks", accessor: "indeks", width: "120px" },
                                                        ]}
                                                        data={tableData}
                                                        searchable={false}
                                                    />
                                                </div>
                                            );
                                        })}
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