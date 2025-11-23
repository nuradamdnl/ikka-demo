import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  Square3Stack3DIcon,
  CircleStackIcon,
  ChartPieIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Papan Utama", path: "/papan-utama", icon: Square3Stack3DIcon },
    { name: "Struktur Indeks", path: "/struktur-indeks", icon: ChartPieIcon },
    { name: "Pengurusan Parameter", path: "/pengurusan-parameter", icon: CircleStackIcon },
    { name: "Penjanaan Indeks", path: "/penjanaan-indeks", icon: CalculatorIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded transition-colors"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="py-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-900 border-l-4 border-blue-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <IconComponent className="w-6 h-6 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
