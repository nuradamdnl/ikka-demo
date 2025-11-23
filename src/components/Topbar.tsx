import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

function Topbar() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section - Penggal and Tahun */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Penggal:</span>
            <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded">
              Jun
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Tahun:</span>
            <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded">
              2025
            </span>
          </div>
        </div>

        {/* Right Section - Pengguna */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Pengguna:</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">SUPER</span>
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-sm font-medium">
              SU
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
