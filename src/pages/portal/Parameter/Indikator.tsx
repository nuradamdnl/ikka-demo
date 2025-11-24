import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import IndikatorTable from "../../../components/tables/IndikatorTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import terasData from "../../../assets/data/Teras.json";
import komponenData from "../../../assets/data/Komponen.json";

function Indikator() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIndikator, setSelectedIndikator] = useState<any>(null);
  const [formData, setFormData] = useState({
    kodIndikator: "",
    namaIndikator: "",
    kodTeras: "",
    kodKomponen: "",
  });

  const filteredKomponen = useMemo(() => {
    if (!formData.kodTeras) return [];
    return komponenData.filter((k) => k["Kod Teras"] === formData.kodTeras);
  }, [formData.kodTeras]);

  const handleAdd = () => {
    setFormData({
      kodIndikator: "",
      namaIndikator: "",
      kodTeras: "",
      kodKomponen: "",
    });
    setIsAddModalOpen(true);
  };

  const handleView = (indikator: any) => {
    alert(`Lihat: ${indikator["Nama Indikator"]}`);
  };

  const handleEdit = (indikator: any) => {
    setSelectedIndikator(indikator);
    setFormData({
      kodIndikator: indikator["Kod Indikator"],
      namaIndikator: indikator["Nama Indikator"],
      kodTeras: indikator["Kod Teras"],
      kodKomponen: indikator["Kod Komponen"],
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (indikator: any) => {
    if (confirm(`Padam ${indikator["Nama Indikator"]}?`)) {
      alert(`Dipadam: ${indikator["Nama Indikator"]}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Reset Komponen when Teras changes
      if (name === "kodTeras") {
        return { ...prev, [name]: value, kodKomponen: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tambah Indikator: ${JSON.stringify(formData, null, 2)}`);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sunting Indikator: ${JSON.stringify(formData, null, 2)}`);
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

      {/* Add Indikator Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Indikator Baharu"
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
              <select
                name="kodKomponen"
                value={formData.kodKomponen}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.kodTeras}
              >
                <option value="">
                  {formData.kodTeras
                    ? "Pilih Komponen"
                    : "Pilih Teras dahulu"}
                </option>
                {filteredKomponen.map((komponen) => (
                  <option
                    key={komponen["Kod Komponen"]}
                    value={komponen["Kod Komponen"]}
                  >
                    {komponen["Kod Komponen"]} - {komponen["Nama Komponen"]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Indikator <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kodIndikator"
                value={formData.kodIndikator}
                onChange={handleInputChange}
                placeholder="Contoh: T01-K01-I01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Indikator <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaIndikator"
                value={formData.namaIndikator}
                onChange={handleInputChange}
                placeholder="Masukkan nama indikator"
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

      {/* Edit Indikator Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Sunting Indikator"
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
                Kod Komponen <span className="text-red-500">*</span>
              </label>
              <select
                name="kodKomponen"
                value={formData.kodKomponen}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.kodTeras}
              >
                <option value="">
                  {formData.kodTeras
                    ? "Pilih Komponen"
                    : "Pilih Teras dahulu"}
                </option>
                {filteredKomponen.map((komponen) => (
                  <option
                    key={komponen["Kod Komponen"]}
                    value={komponen["Kod Komponen"]}
                  >
                    {komponen["Kod Komponen"]} - {komponen["Nama Komponen"]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kod Indikator
              </label>
              <input
                type="text"
                name="kodIndikator"
                value={formData.kodIndikator}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Kod Indikator tidak boleh diubah
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Indikator <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaIndikator"
                value={formData.namaIndikator}
                onChange={handleInputChange}
                placeholder="Masukkan nama indikator"
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

export default Indikator;