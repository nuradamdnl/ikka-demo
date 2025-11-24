import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import StrukturIndeksSunburst from "../../components/StrukturIndeksSunburst";
import StrukturTerasSunburst from "../../components/StrukturTerasSunburst";

function StrukturIndeks() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Struktur Indeks</PageTitle>
            <SectionCard title="Struktur Instrumen IKKA">
              <StrukturIndeksSunburst tahun={2025} />
            </SectionCard>
            <SectionCard title="Struktur Teras">
              <div className="flex flex-col gap-6">
                <StrukturTerasSunburst kodTeras="T01" tahun={2025} />
                <StrukturTerasSunburst kodTeras="T02" tahun={2025} />
                <StrukturTerasSunburst kodTeras="T03" tahun={2025} />
                <StrukturTerasSunburst kodTeras="T04" tahun={2025} />
                <StrukturTerasSunburst kodTeras="T05" tahun={2025} />
              </div>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default StrukturIndeks;
