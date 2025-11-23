import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function StrukturIndeks() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">
              Struktur Indeks
            </h2>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default StrukturIndeks;
