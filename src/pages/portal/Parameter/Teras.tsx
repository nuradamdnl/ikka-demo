import { useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import TerasTable from "../../../components/tables/TerasTable";

function Teras() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeras, setSelectedTeras] = useState<any>(null);
  const [formData, setFormData] = useState({
    kodTeras: "",
    namaTeras: "",
  });

  const handleAdd = () => {
    setFormData({
      kodTeras: "",
      namaTeras: "",
    });
    setIsAddModalOpen(true);
  };

  const handleView = (teras: any) => {
    alert(`Lihat: ${teras["Nama Teras"]}`);
  };

  const handleEdit = (teras: any) => {
    setFormData({
      kodTeras: teras["Kod Teras"],
      namaTeras: teras["Nama Teras"],
    });
    setSelectedTeras(teras);
    setIsEditModalOpen(true);
  };

  const handleDelete = (teras: any) => {
    if (confirm(`Padam ${teras["Nama Teras"]}?`)) {
      alert(`Dipadam: ${teras["Nama Teras"]}`);
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tambah Teras: ${formData.kodTeras} - ${formData.namaTeras}`);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Kemaskini Teras: ${formData.kodTeras} - ${formData.namaTeras}`);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

            {/* Add Teras Modal */}
            <Modal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              title="Tambah Teras Baharu"
              size="md"
            >
              <form onSubmit={handleSubmitAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kod Teras
                  </label>
                  <input
                    type="text"
                    name="kodTeras"
                    value={formData.kodTeras}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: T01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Teras
                  </label>
                  <input
                    type="text"
                    name="namaTeras"
                    value={formData.namaTeras}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama teras"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" size="md">
                    Tambah
                  </Button>
                </div>
              </form>
            </Modal>

            {/* Edit Teras Modal */}
            <Modal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              title="Sunting Teras"
              size="md"
            >
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kod Teras
                  </label>
                  <input
                    type="text"
                    name="kodTeras"
                    value={formData.kodTeras}
                    onChange={handleInputChange}
                    required
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kod Teras tidak boleh diubah
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Teras
                  </label>
                  <input
                    type="text"
                    name="namaTeras"
                    value={formData.namaTeras}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama teras"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" size="md">
                    Simpan
                  </Button>
                </div>
              </form>
            </Modal>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Teras;