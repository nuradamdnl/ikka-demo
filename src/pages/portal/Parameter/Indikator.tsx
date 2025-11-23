import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import IndikatorTable from "../../../components/tables/IndikatorTable";

function Indikator() {
  const handleAdd = () => {
    alert("Tambah Indikator");
  };

  const handleView = (indikator: any) => {
    alert(`Lihat: ${indikator["Nama Indikator"]}`);
  };

  const handleEdit = (indikator: any) => {
    alert(`Edit: ${indikator["Nama Indikator"]}`);
  };

  const handleDelete = (indikator: any) => {
    if (confirm(`Padam ${indikator["Nama Indikator"]}?`)) {
      alert(`Dipadam: ${indikator["Nama Indikator"]}`);
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
            <PageTitle>Parameter Indikator</PageTitle>
            <SectionCard title="Senarai Indikator">
              <IndikatorTable
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

export default Indikator;