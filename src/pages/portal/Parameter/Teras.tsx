import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import TerasTable from "../../../components/tables/TerasTable";

function Teras() {
  const handleAdd = () => {
    alert("Tambah Teras");
  };

  const handleView = (teras: any) => {
    alert(`Lihat: ${teras["Nama Teras"]}`);
  };

  const handleEdit = (teras: any) => {
    alert(`Edit: ${teras["Nama Teras"]}`);
  };

  const handleDelete = (teras: any) => {
    if (confirm(`Padam ${teras["Nama Teras"]}?`)) {
      alert(`Dipadam: ${teras["Nama Teras"]}`);
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
            <PageTitle>Parameter Teras</PageTitle>
            <SectionCard title="Senarai Teras">
              <TerasTable
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

export default Teras;