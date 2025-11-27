import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

type FormState = {
  nama: string;
  email: string;
  telefon: string;
  agensi: string;
  peranan: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

function DaftarPemilikData() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    nama: "",
    email: "",
    telefon: "",
    agensi: "",
    peranan: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.nama || !form.email || !form.telefon || !form.agensi || !form.password || !form.confirmPassword) {
      return "Sila isi semua maklumat wajib.";
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      return "Format e-mel tidak sah.";
    }
    if (!/^[0-9+()\s-]{7,}$/.test(form.telefon)) {
      return "Sila masukkan nombor telefon yang sah.";
    }
    if (form.password !== form.confirmPassword) {
      return "Kata laluan tidak sepadan.";
    }
    if (!form.agree) {
      return "Anda perlu bersetuju dengan Terma & Syarat.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => {
      navigate("/log-masuk");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/src/assets/videos/malaysia-hero.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black bg-opacity-50 -z-10"></div>

      <div className="relative z-10 flex-grow flex items-center justify-center px-6 gap-16 py-12">
        <div className="flex flex-col items-start space-y-6">
          <img
            src="/src/assets/logo/jata-negara.png"
            alt="Jata Negara"
            className="h-48 w-auto drop-shadow-2xl"
          />
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg tracking-wider">
              IKKA
            </h2>
            <h1 className="text-2xl font-bold text-yellow-400 drop-shadow-lg tracking-wide max-w-md">
              SISTEM INDEKS KESELAMATAN DAN KETENTERAMAN AWAM
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-xl">
          <div className="mb-6 text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Daftar Pemilik Data</h2>
            <p className="text-gray-600 text-sm">Isi maklumat di bawah untuk memohon akses sebagai pemilik data.</p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
              Pendaftaran diterima. Mengalihkan ke halaman log masuk...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Penuh</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Nama pegawai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mel</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="nama@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. Telefon</label>
                  <input
                    type="tel"
                    name="telefon"
                    value={form.telefon}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="+60 12 345 6789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agensi / Jabatan</label>
                  <input
                    type="text"
                    name="agensi"
                    value={form.agensi}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Contoh: PDRM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peranan</label>
                  <select
                    name="peranan"
                    value={form.peranan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
                  >
                    <option value="">Pilih peranan</option>
                    <option value="Pemilik Data">Pemilik Data</option>
                    <option value="Pentadbir Agensi">Pentadbir Agensi</option>
                    <option value="Pegawai Data">Pegawai Data</option>
                  </select>
                </div>
                <div className="hidden md:block"></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kata Laluan</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="********"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sahkan Kata Laluan</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="********"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded cursor-pointer"
                />
                <p className="text-sm text-gray-700">
                  Saya mengesahkan maklumat yang diberikan adalah tepat dan bersetuju dengan Terma & Syarat penggunaan IKKA.
                </p>
              </div>

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium mt-4 shadow-md"
              >
                Hantar Permohonan
              </button>
            </form>
          )}

          {!success && (
            <p className="text-sm text-gray-700 text-center mt-6">
              Sudah ada akaun?{" "}
              <button
                type="button"
                onClick={() => navigate("/log-masuk")}
                className="text-blue-900 font-semibold hover:underline"
              >
                Log Masuk
              </button>
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DaftarPemilikData;
