import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import pemilikDataJson from "../../../assets/data/PemilikData.json";

function PilihanPemilikData() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

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

    // Filter jabatan based on search query
    const filteredJabatan = uniqueJabatan.filter((jabatan) => {
        const query = searchQuery.toLowerCase();
        return (
            jabatan.kodJabatan.toLowerCase().includes(query) ||
            jabatan.namaJabatan.toLowerCase().includes(query)
        );
    });

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
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari kod jabatan atau nama jabatan..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mb-4 text-sm text-gray-600">
                                Menunjukkan {filteredJabatan.length} daripada {uniqueJabatan.length} pemilik data
                            </div>

                            {/* Info Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredJabatan.map((jabatan) => (
                                    <div key={jabatan.kodJabatan} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="relative h-56 bg-white flex items-center justify-center p-8">
                                            <img 
                                                src={`/src/assets/images/pemilik-data/${jabatan.kodJabatan.toLowerCase()}.png`} 
                                                alt={jabatan.kodJabatan} 
                                                className="max-w-full max-h-full object-contain" 
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{jabatan.kodJabatan}</h3>
                                            <p className="text-sm text-gray-600 mb-4">{jabatan.namaJabatan}</p>
                                            <button
                                                onClick={handleCardClick}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                            >
                                                Lihat
                                            </button>
                                        </div>
                                    </div>
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