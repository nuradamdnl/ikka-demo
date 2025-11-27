import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import SectionCard from "../../components/SectionCard";
import PageTitle from "../../components/PageTitle";
import { useState } from "react";

type ProfileState = {
  nama: string;
  jawatan: string;
  jabatan: string;
  agensi: string;
  alamat: string;
  ic: string;
  tarikhLahir: string;
  umur: number;
  jantina: string;
  telefon: string;
  emel: string;
};

function ProfilPengguna() {
  const [profile, setProfile] = useState<ProfileState>({
    nama: "Insp. Ahmad Faiz",
    jawatan: "Pegawai Kanan",
    jabatan: "Jabatan Siasatan Penguatkuasaan Trafik (JSPT)",
    agensi: "Polis Diraja Malaysia (PDRM)",
    alamat: "JSPT Bukit Aman,\n50560 Kuala Lumpur,\nWilayah Persekutuan Kuala Lumpur",
    ic: "850101-14-5566",
    tarikhLahir: "1985-01-01",
    umur: 39,
    jantina: "Lelaki",
    telefon: "+60 12-345 6789",
    emel: "ahmad.faiz@pdrm.gov.my",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Profil Pengguna</PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <SectionCard title="Maklumat Asas">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-900 to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                    AF
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{profile.nama}</p>
                    <p className="text-sm text-blue-900 font-semibold">{profile.jawatan}</p>
                    <p className="text-sm text-gray-700">{profile.jabatan}</p>
                    <p className="text-sm text-gray-700">{profile.agensi}</p>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-medium text-gray-800">Kontak</p>
                    <p>{profile.emel}</p>
                    <p>{profile.telefon}</p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Biodata Peribadi">
                <div className="space-y-3 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>No. IC</span>
                    <span className="font-semibold">{profile.ic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tarikh Lahir</span>
                    <span className="font-semibold">{profile.tarikhLahir}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Umur</span>
                    <span className="font-semibold">{profile.umur} tahun</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jantina</span>
                    <span className="font-semibold">{profile.jantina}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Alamat</p>
                    <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 border border-gray-200 rounded-lg p-3">
                      {profile.alamat}
                    </p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Maklumat Jabatan">
                <div className="space-y-3 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>Agensi</span>
                    <span className="font-semibold text-right">{profile.agensi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jabatan</span>
                    <span className="font-semibold text-right">{profile.jabatan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jawatan</span>
                    <span className="font-semibold text-right">{profile.jawatan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                      Aktif
                    </span>
                  </div>
                </div>
              </SectionCard>
            </div>

            <SectionCard title="Kemaskini Profil">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      value={profile.nama}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jawatan</label>
                    <input
                      type="text"
                      name="jawatan"
                      value={profile.jawatan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agensi</label>
                    <input
                      type="text"
                      name="agensi"
                      value={profile.agensi}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                      type="text"
                      name="jabatan"
                      value={profile.jabatan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mel</label>
                    <input
                      type="email"
                      name="emel"
                      value={profile.emel}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="text"
                      name="telefon"
                      value={profile.telefon}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarikh Lahir</label>
                    <input
                      type="date"
                      name="tarikhLahir"
                      value={profile.tarikhLahir}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. IC</label>
                    <input
                      type="text"
                      name="ic"
                      value={profile.ic}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <textarea
                    name="alamat"
                    value={profile.alamat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow"
                  >
                    Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilPengguna;
