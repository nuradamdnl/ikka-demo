import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import Button from "../../../components/Button";
import { useState } from "react";
import pemilikDataJson from "../../../assets/data/PemilikData.json";
import tetapanIndikatorJson from "../../../assets/data/TetapanIndikator.json";
import terasJson from "../../../assets/data/Teras.json";
import komponenJson from "../../../assets/data/Komponen.json";

function BorangData() {
    // Sample data - in real app, this would come from route params or context
    const sampleKodJabatan = "JSPT";
    
    // Get jabatan details
    const jabatanData = pemilikDataJson.find(item => item["Kod Jabatan"] === sampleKodJabatan);
    
    // Get indicators for this jabatan
    const jabatanIndicators = tetapanIndikatorJson.filter(
        item => item["Kod Jabatan"] === sampleKodJabatan
    );
    
    // Group indicators by Teras and Komponen
    const groupedIndicators = jabatanIndicators.reduce((acc, indicator) => {
        const rujukan = indicator["Rujukan Indikator"];
        const parts = rujukan.split("-");
        const kodTeras = parts[1]; // e.g., "T04"
        const kodKomponen = `${parts[1]}-${parts[2]}`; // e.g., "T04-K04"
        
        if (!acc[kodTeras]) {
            acc[kodTeras] = {};
        }
        if (!acc[kodTeras][kodKomponen]) {
            acc[kodTeras][kodKomponen] = [];
        }
        acc[kodTeras][kodKomponen].push(indicator);
        
        return acc;
    }, {} as Record<string, Record<string, typeof jabatanIndicators>>);
    
    // State for input values
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    
    const handleInputChange = (rujukan: string, value: string) => {
        setInputValues(prev => ({ ...prev, [rujukan]: value }));
    };
    
    const handleSubmit = () => {
        console.log("Submitted values:", inputValues);
        alert("Data telah dihantar!");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-6">
                    <div className="container mx-auto">
                        <PageTitle>Borang Data</PageTitle>
                        
                        <SectionCard title="Detail Pemilik Data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kod Agensi
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {jabatanData?.["Kod Agensi"] || "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Agensi
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {jabatanData?.["Nama Agensi"] || "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kod Jabatan
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {jabatanData?.["Kod Jabatan"] || "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Jabatan
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {jabatanData?.["Nama Jabatan"] || "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Penyelia
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        Dr. Siti Nurhaliza
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        PIC Kemasukan Data
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        Puan Mimi Aminah
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tarikh Terakhir Kemasukan Data
                                    </label>
                                    <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        30 Jun 2025
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                        
                        <SectionCard title="Pengisian Data Indikator">
                            {Object.entries(groupedIndicators).map(([kodTeras, komponenGroups]) => {
                                const terasData = terasJson.find(t => t["Kod Teras"] === kodTeras);
                                
                                return (
                                    <div key={kodTeras} className="mb-8 last:mb-0">
                                        {Object.entries(komponenGroups).map(([kodKomponen, indicators]) => {
                                            const komponenData = komponenJson.find(
                                                k => k["Kod Komponen"] === kodKomponen
                                            );
                                            
                                            return (
                                                <div key={kodKomponen} className="mb-6 last:mb-0">
                                                    {/* Teras and Komponen Headers */}
                                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">
                                                                {kodTeras}
                                                            </span>
                                                            <span className="text-base font-semibold text-gray-900">
                                                                {terasData?.["Nama Teras"] || "-"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="inline-block bg-blue-400 text-white px-3 py-1 rounded text-sm font-semibold">
                                                                {kodKomponen}
                                                            </span>
                                                            <span className="text-base font-medium text-gray-800">
                                                                {komponenData?.["Nama Komponen"] || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Indicators Table */}
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                                                                        Rujukan Indikator
                                                                    </th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                                                                        Nama Indikator
                                                                    </th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                                                                        Nilai Indikator
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {indicators.map((indicator) => (
                                                                    <tr key={indicator["Rujukan Indikator"]} className="hover:bg-gray-50">
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                            {indicator["Rujukan Indikator"]}
                                                                        </td>
                                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                                            {indicator["Nama Indikator"]}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <input
                                                                                type="number"
                                                                                value={inputValues[indicator["Rujukan Indikator"]] || ""}
                                                                                onChange={(e) => handleInputChange(
                                                                                    indicator["Rujukan Indikator"],
                                                                                    e.target.value
                                                                                )}
                                                                                placeholder="0"
                                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                            
                            {/* Submit Button */}
                            <div className="flex justify-end mt-6">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleSubmit}
                                >
                                    Hantar Data
                                </Button>
                            </div>
                        </SectionCard>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default BorangData;