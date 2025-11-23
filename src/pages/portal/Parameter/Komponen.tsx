import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import KomponenTable from "../../../components/tables/KomponenTable";

function Komponen() {
  const handleAdd = () => {
    alert("Tambah Komponen");
  };

  const handleView = (komponen: any) => {
    alert(`Lihat: ${komponen["Nama Komponen"]}`);
  };

  const handleEdit = (komponen: any) => {
    alert(`Edit: ${komponen["Nama Komponen"]}`);
  };

  const handleDelete = (komponen: any) => {
    if (confirm(`Padam ${komponen["Nama Komponen"]}?`)) {
      alert(`Dipadam: ${komponen["Nama Komponen"]}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Parameter Komponen</PageTitle>
            <SectionCard title="Senarai Komponen">
              <KomponenTable
                onAdd={handleAdd}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Komponen;