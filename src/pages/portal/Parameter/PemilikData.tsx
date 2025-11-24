import { useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import PemilikDataTable from "../../../components/tables/PemilikDataTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

function PemilikData() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    kodAgensi: "",
    namaAgensi: "",
    kodJabatan: "",
    namaJabatan: "",
  });

  const handleAdd = () => {
    setFormData({
      kodAgensi: "",
      namaAgensi: "",
      kodJabatan: "",
      namaJabatan: "",
    });
    setIsAddModalOpen(true);
  };

  const handleView = (data: any) => {
    alert(`Lihat: ${data["Nama Agensi"]} - ${data["Nama Jabatan"]}`);
  };

  const handleEdit = (data: any) => {
    setSelectedData(data);
    setFormData({
      kodAgensi: data["Kod Agensi"],
      namaAgensi: data["Nama Agensi"],
      kodJabatan: data["Kod Jabatan"],
      namaJabatan: data["Nama Jabatan"],
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: any) => {
    if (confirm(`Padam ${data["Nama Agensi"]} - ${data["Nama Jabatan"]}?`)) {
      alert(`Dipadam: ${data["Nama Agensi"]}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tambah Pemilik Data: ${JSON.stringify(formData, null, 2)}`);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sunting Pemilik Data: ${JSON.stringify(formData, null, 2)}`);
    setIsEditModalOpen(false);
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

      {/* Add Pemilik Data Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Pemilik Data Baharu"
        size="md"
      >
        <form onSubmit={handleSubmitAdd}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Agensi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kodAgensi"
                value={formData.kodAgensi}
                onChange={handleInputChange}
                placeholder="Contoh: AADK"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Agensi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaAgensi"
                value={formData.namaAgensi}
                onChange={handleInputChange}
                placeholder="Masukkan nama agensi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kodJabatan"
                value={formData.kodJabatan}
                onChange={handleInputChange}
                placeholder="Contoh: AADK"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaJabatan"
                value={formData.namaJabatan}
                onChange={handleInputChange}
                placeholder="Masukkan nama jabatan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Tambah
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Pemilik Data Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Sunting Pemilik Data"
        size="md"
      >
        <form onSubmit={handleSubmitEdit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Agensi
              </label>
              <input
                type="text"
                name="kodAgensi"
                value={formData.kodAgensi}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Kod Agensi tidak boleh diubah
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Agensi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaAgensi"
                value={formData.namaAgensi}
                onChange={handleInputChange}
                placeholder="Masukkan nama agensi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Jabatan
              </label>
              <input
                type="text"
                name="kodJabatan"
                value={formData.kodJabatan}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Kod Jabatan tidak boleh diubah
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaJabatan"
                value={formData.namaJabatan}
                onChange={handleInputChange}
                placeholder="Masukkan nama jabatan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PemilikData;
