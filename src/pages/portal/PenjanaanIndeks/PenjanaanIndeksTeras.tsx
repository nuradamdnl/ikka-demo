import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";

function PenjanaanIndeksTeras() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penjanaan Indeks Teras</PageTitle>

            <SectionCard title="Pilih Teras">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Halaman ini akan memaparkan pengiraan Indeks Teras berdasarkan teras yang dipilih.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Teras
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Sila pilih teras --</option>
                  </select>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Nota">
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                <li>
                  Indeks Teras dikira berdasarkan purata indeks semua komponen dalam teras tersebut.
                </li>
                <li>
                  Pilih Teras untuk melihat pengiraan indeks dan visualisasi data.
                </li>
                <li>
                  Hanya teras yang mempunyai komponen dengan data lengkap akan dipaparkan.
                </li>
              </ul>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PenjanaanIndeksTeras;
