import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import PemilikDataTable from "../../../components/tables/PemilikDataTable";

function PemilikData() {
  const handleAdd = () => {
    alert("Tambah Pemilik Data");
  };

  const handleView = (data: any) => {
    alert(`Lihat: ${data["Nama Agensi"]} - ${data["Nama Jabatan"]}`);
  };

  const handleEdit = (data: any) => {
    alert(`Edit: ${data["Nama Agensi"]} - ${data["Nama Jabatan"]}`);
  };

  const handleDelete = (data: any) => {
    if (confirm(`Padam ${data["Nama Agensi"]} - ${data["Nama Jabatan"]}?`)) {
      alert(`Dipadam: ${data["Nama Agensi"]}`);
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
            <PageTitle>Pemilik Data</PageTitle>
            <SectionCard title="Senarai Pemilik Data">
              <PemilikDataTable
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

export default PemilikData;
