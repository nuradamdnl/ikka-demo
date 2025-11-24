import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import Button from "../../components/Button";
import { useState } from "react";
import { EyeIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function LaporanStrategik() {
    // Sample data for reports
    const reports = [
        {
            id: 1,
            kategori: "Deskriptif",
            tajuk: "Analisis Prestasi IKKA 2025",
            tarikhDicipta: "15 Nov 2025",
        },
        {
            id: 2,
            kategori: "Diagnostik",
            tajuk: "Punca Penurunan Skor Teras Keselamatan",
            tarikhDicipta: "10 Nov 2025",
        },
        {
            id: 3,
            kategori: "Prediktif",
            tajuk: "Ramalan Trend IKKA 2026",
            tarikhDicipta: "08 Nov 2025",
        },
        {
            id: 4,
            kategori: "Preskriptif",
            tajuk: "Cadangan Peningkatan Indikator Kritikal",
            tarikhDicipta: "05 Nov 2025",
        },
        {
            id: 5,
            kategori: "Deskriptif",
            tajuk: "Laporan Tahunan IKKA 2024",
            tarikhDicipta: "01 Nov 2025",
        },
        {
            id: 6,
            kategori: "Diagnostik",
            tajuk: "Analisis Jurang Data Meter",
            tarikhDicipta: "28 Okt 2025",
        },
        {
            id: 7,
            kategori: "Prediktif",
            tajuk: "Projeksi Keselamatan Sempadan Q1 2026",
            tarikhDicipta: "25 Okt 2025",
        },
        {
            id: 8,
            kategori: "Preskriptif",
            tajuk: "Strategi Optimisasi Komponen Tatakelola",
            tarikhDicipta: "20 Okt 2025",
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [filterKategori, setFilterKategori] = useState("Semua");

    // Filter reports
    const filteredReports = reports.filter((report) => {
        const matchesSearch = 
            report.tajuk.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.tarikhDicipta.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = filterKategori === "Semua" || report.kategori === filterKategori;
        
        return matchesSearch && matchesFilter;
    });

    const getCategoryBadgeColor = (kategori: string) => {
        switch (kategori) {
            case "Deskriptif":
                return "bg-blue-100 text-blue-800";
            case "Diagnostik":
                return "bg-yellow-100 text-yellow-800";
            case "Prediktif":
                return "bg-purple-100 text-purple-800";
            case "Preskriptif":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleView = (id: number) => {
        console.log("View report:", id);
        alert(`Melihat laporan ID: ${id}`);
    };

    const handleDownload = (id: number) => {
        console.log("Download report:", id);
        alert(`Memuat turun laporan ID: ${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Topbar />
        <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow p-6">
            <div className="container mx-auto">
                <PageTitle>Laporan Strategik</PageTitle>
                <SectionCard title="Senarai Laporan">
                    {/* Search and Filter Bar */}
                    <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari tajuk laporan atau tarikh..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <select
                                value={filterKategori}
                                onChange={(e) => setFilterKategori(e.target.value)}
                                className="block w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="Semua">Semua Kategori</option>
                                <option value="Deskriptif">Deskriptif</option>
                                <option value="Diagnostik">Diagnostik</option>
                                <option value="Prediktif">Prediktif</option>
                                <option value="Preskriptif">Preskriptif</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-gray-600">
                        Menunjukkan {filteredReports.length} daripada {reports.length} laporan
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                        Bil.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tajuk Laporan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                                        Tarikh Dicipta
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                                        Tindakan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredReports.map((report, index) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeColor(report.kategori)}`}>
                                                {report.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {report.tajuk}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {report.tarikhDicipta}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleView(report.id)}
                                                >
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    Lihat
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleDownload(report.id)}
                                                >
                                                    <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                                                    Muat Turun
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredReports.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-sm">
                                Tiada laporan dijumpai. Cuba ubah carian atau tapis anda.
                            </p>
                        </div>
                    )}
                </SectionCard>
            </div>
            </main>
        </div>
        <Footer />
        </div>
    )
}

export default LaporanStrategik;