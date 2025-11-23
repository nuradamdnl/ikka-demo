import Header from "../components/Header";
import Footer from "../components/Footer";

function PapanUtama() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800">
          Papan Utama
        </h2>
      </main>
      <Footer />
    </div>
  );
}

export default PapanUtama;
