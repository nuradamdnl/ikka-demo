import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";

function PenjanaanIndeksKomponen() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penjanaan Indeks Komponen</PageTitle>

            <SectionCard title="Pilih Komponen">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Halaman ini akan memaparkan pengiraan Indeks Komponen berdasarkan komponen yang dipilih.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Komponen
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    >
                      <option value="">-- Sila pilih komponen --</option>
                    </select>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Nota">
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                <li>
                  Indeks Komponen dikira berdasarkan purata indeks semua indikator dalam komponen tersebut.
                </li>
                <li>
                  Pilih Teras terlebih dahulu, kemudian pilih Komponen untuk melihat pengiraan indeks.
                </li>
                <li>
                  Hanya komponen yang mempunyai indikator dengan data lengkap akan dipaparkan.
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

export default PenjanaanIndeksKomponen;
