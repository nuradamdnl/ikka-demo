import { useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import KomponenTable from "../../../components/tables/KomponenTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import terasData from "../../../assets/data/Teras.json";

function Komponen() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKomponen, setSelectedKomponen] = useState<any>(null);
  const [formData, setFormData] = useState({
    kodKomponen: "",
    namaKomponen: "",
    kodTeras: "",
  });

  const handleAdd = () => {
    setFormData({ kodKomponen: "", namaKomponen: "", kodTeras: "" });
    setIsAddModalOpen(true);
  };

  const handleView = (komponen: any) => {
    alert(`Lihat: ${komponen["Nama Komponen"]}`);
  };

  const handleEdit = (komponen: any) => {
    setSelectedKomponen(komponen);
    setFormData({
      kodKomponen: komponen["Kod Komponen"],
      namaKomponen: komponen["Nama Komponen"],
      kodTeras: komponen["Kod Teras"],
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (komponen: any) => {
    if (confirm(`Padam ${komponen["Nama Komponen"]}?`)) {
      alert(`Dipadam: ${komponen["Nama Komponen"]}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tambah Komponen: ${JSON.stringify(formData, null, 2)}`);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sunting Komponen: ${JSON.stringify(formData, null, 2)}`);
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

      {/* Add Komponen Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Komponen Baharu"
        size="md"
      >
        <form onSubmit={handleSubmitAdd}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Teras <span className="text-red-500">*</span>
              </label>
              <select
                name="kodTeras"
                value={formData.kodTeras}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih Teras</option>
                {terasData.map((teras) => (
                  <option key={teras["Kod Teras"]} value={teras["Kod Teras"]}>
                    {teras["Kod Teras"]} - {teras["Nama Teras"]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Komponen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kodKomponen"
                value={formData.kodKomponen}
                onChange={handleInputChange}
                placeholder="Contoh: T01-K01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Komponen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaKomponen"
                value={formData.namaKomponen}
                onChange={handleInputChange}
                placeholder="Masukkan nama komponen"
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

      {/* Edit Komponen Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Sunting Komponen"
        size="md"
      >
        <form onSubmit={handleSubmitEdit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Teras <span className="text-red-500">*</span>
              </label>
              <select
                name="kodTeras"
                value={formData.kodTeras}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih Teras</option>
                {terasData.map((teras) => (
                  <option key={teras["Kod Teras"]} value={teras["Kod Teras"]}>
                    {teras["Kod Teras"]} - {teras["Nama Teras"]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Komponen
              </label>
              <input
                type="text"
                name="kodKomponen"
                value={formData.kodKomponen}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Kod Komponen tidak boleh diubah
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Komponen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaKomponen"
                value={formData.namaKomponen}
                onChange={handleInputChange}
                placeholder="Masukkan nama komponen"
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

export default Komponen;