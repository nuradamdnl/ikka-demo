import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AktivitiKajian() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Navbar />
      <main className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800">
          Aktiviti Kajian
        </h2>
      </main>
      <Footer />
    </div>
  );
}

export default AktivitiKajian;
