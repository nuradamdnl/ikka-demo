import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Laman Utama", path: "/" },
    { name: "Tentang Kajian", path: "/tentang-kajian" },
    { name: "Aktiviti Kajian", path: "/aktiviti-kajian" },
  ];

  const handleLogin = () => {
    navigate("/log-masuk");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-900 border-b-2 border-blue-900"
                    : "text-gray-600 hover:text-blue-900"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Log Masuk Button */}
          <button
            onClick={handleLogin}
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            Log Masuk
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
