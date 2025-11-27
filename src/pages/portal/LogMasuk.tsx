import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function LogMasuk() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("Pengguna Super");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to PapanUtama after login
    navigate("/papan-utama");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/src/assets/videos/malaysia-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 -z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-6 gap-16 py-12">
        {/* Left Side - Logo and Title */}
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

        {/* Right Side - Login Card */}
        <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Log Masuk
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mel
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="nama@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Kata Laluan
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="********"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Ingat saya
              </label>
            </div>

            {/* User Type Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jenis Pengguna
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="super"
                    name="userType"
                    value="Pengguna Super"
                    checked={userType === "Pengguna Super"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="super" className="ml-3 text-sm text-gray-700 cursor-pointer">
                    Pengguna Super
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="strategik"
                    name="userType"
                    value="Pengguna Strategik"
                    checked={userType === "Pengguna Strategik"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="strategik" className="ml-3 text-sm text-gray-700 cursor-pointer">
                    Pengguna Strategik
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pemilik"
                    name="userType"
                    value="Pemilik Data"
                    checked={userType === "Pemilik Data"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="pemilik" className="ml-3 text-sm text-gray-700 cursor-pointer">
                    Pemilik Data
                  </label>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium mt-8 text-base shadow-md"
            >
              Log Masuk
            </button>
            <p className="text-sm text-gray-700 text-center">
              Belum ada akaun?{" "}
              <button
                type="button"
                onClick={() => navigate("/daftar-pemilik-data")}
                className="text-blue-900 font-semibold hover:underline"
              >
                Daftar sebagai Pemilik Data
              </button>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LogMasuk;