import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  Square3Stack3DIcon,
  CircleStackIcon,
  ChartPieIcon,
  CalculatorIcon,
  NewspaperIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import terasData from "../assets/data/Teras.json";
import komponenData from "../assets/data/Komponen.json";
import indikatorData from "../assets/data/Indikator.json";

type SubMenuItem = {
  name: string;
  path: string;
  subItems?: SubMenuItem[];
};

type MenuItem = {
  name: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubMenuItem[];
};

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Generate Analitik Deskriptif sub-items
  const generateDeskriptifSubItems = () => {
    return terasData.map((teras, terasIndex) => {
      const komponenForTeras = komponenData.filter(
        k => k["Kod Teras"] === teras["Kod Teras"]
      );

      return {
        name: `Teras ${terasIndex + 1}`,
        path: `/analitik-deskriptif/teras/${teras["Kod Teras"].toLowerCase()}`,
        subItems: [
          {
            name: `Komponen Keseluruhan ${teras["Kod Teras"]}`,
            path: `/analitik-deskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen-keseluruhan`,
          },
          ...komponenForTeras.map((komponen, komponenIndex) => ({
            name: `Komponen ${komponenIndex + 1}`,
            path: `/analitik-deskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen/${komponen["Kod Komponen"].toLowerCase()}`,
          })),
        ],
      };
    });
  };

  // Generate Analitik Diagnostik sub-items
  const generateDiagnostikSubItems = () => {
    const terasItems = terasData.map((teras, terasIndex) => {
      const komponenForTeras = komponenData.filter(
        k => k["Kod Teras"] === teras["Kod Teras"]
      );

      return {
        name: `Teras ${terasIndex + 1}`,
        path: `/analitik-diagnostik/teras/${teras["Kod Teras"].toLowerCase()}`,
        subItems: [
          {
            name: "Teras by Komponen",
            path: `/analitik-diagnostik/teras/${teras["Kod Teras"].toLowerCase()}/teras-by-komponen`,
          },
          {
            name: "Komponen by Indikator",
            path: `/analitik-diagnostik/teras/${teras["Kod Teras"].toLowerCase()}/komponen-by-indikator`,
            subItems: komponenForTeras.map((komponen, komponenIndex) => ({
              name: `Komponen ${komponenIndex + 1}`,
              path: `/analitik-diagnostik/teras/${teras["Kod Teras"].toLowerCase()}/komponen-by-indikator/${komponen["Kod Komponen"].toLowerCase()}`,
            })),
          },
        ],
      };
    });

    return [
      ...terasItems,
      {
        name: "Indikator by Indikator",
        path: "/analitik-diagnostik/indikator-by-indikator",
      },
    ];
  };

  // Generate Analitik Prediktif sub-items
  const generatePrediktifSubItems = () => {
    return terasData.map((teras, terasIndex) => {
      const komponenForTeras = komponenData.filter(
        k => k["Kod Teras"] === teras["Kod Teras"]
      );

      return {
        name: `Teras ${terasIndex + 1}`,
        path: `/analitik-prediktif/teras/${teras["Kod Teras"].toLowerCase()}`,
        subItems: komponenForTeras.map((komponen, komponenIndex) => ({
          name: `Komponen ${komponenIndex + 1}`,
          path: `/analitik-prediktif/teras/${teras["Kod Teras"].toLowerCase()}/komponen/${komponen["Kod Komponen"].toLowerCase()}`,
        })),
      };
    });
  };

  // Generate Analitik Preskriptif sub-items
  const generatePreskriptifSubItems = () => {
    return terasData.map((teras, terasIndex) => {
      const komponenForTeras = komponenData.filter(
        k => k["Kod Teras"] === teras["Kod Teras"]
      );

      const komponenItems = komponenForTeras.map((komponen, komponenIndex) => {
        const indikatorForKomponen = indikatorData.filter(
          i => i["Kod Komponen"] === komponen["Kod Komponen"]
        );

        return {
          name: `Komponen ${komponen["Kod Komponen"]}`,
          path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen/${komponen["Kod Komponen"].toLowerCase()}`,
          subItems: [
            {
              name: `Preskriptif Komponen ${komponen["Kod Komponen"]}`,
              path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen/${komponen["Kod Komponen"].toLowerCase()}/preskriptif`,
            },
            {
              name: `Indikator ${komponen["Kod Komponen"]}`,
              path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen/${komponen["Kod Komponen"].toLowerCase()}/indikator`,
              subItems: indikatorForKomponen.map((indikator, indikatorIndex) => ({
                name: `Preskriptif Indikator ${indikator["Kod Indikator"]}`,
                path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen/${komponen["Kod Komponen"].toLowerCase()}/indikator/${indikator["Kod Indikator"].toLowerCase()}`,
              })),
            },
          ],
        };
      });

      return {
        name: `Teras ${terasIndex + 1}`,
        path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}`,
        subItems: [
          {
            name: `Preskriptif Teras ${terasIndex + 1}`,
            path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}/preskriptif`,
          },
          {
            name: "Komponen",
            path: `/analitik-preskriptif/teras/${teras["Kod Teras"].toLowerCase()}/komponen`,
            subItems: komponenItems,
          },
        ],
      };
    });
  };

  const menuItems: MenuItem[] = [
    { name: "Papan Utama", path: "/papan-utama", icon: Square3Stack3DIcon },
    { name: "Struktur Indeks", path: "/struktur-indeks", icon: ChartPieIcon },
    { name: "Pengurusan Parameter", path: "/pengurusan-parameter", icon: CircleStackIcon },
    { name: "Kemasukan Data", path: "/kemasukan-data/pilihan-pemilik-data", icon: NewspaperIcon },
    {
      name: "Penjanaan Indeks",
      icon: CalculatorIcon,
      subItems: [
        { name: "Indeks Indikator", path: "/penjanaan-indeks/penjanaan-indeks-indikator" },
        { name: "Indeks Komponen", path: "/penjanaan-indeks/penjanaan-indeks-komponen" },
        { name: "Indeks Teras", path: "/penjanaan-indeks/penjanaan-indeks-teras" },
      ]
    },
    { name: "Analisis Indeks", path: "/analisis-indeks", icon: ChartBarIcon },
    {
      name: "Analitik Deskriptif",
      icon: ChartBarSquareIcon,
      subItems: generateDeskriptifSubItems()
    },
    {
      name: "Analitik Diagnostik",
      icon: ChartBarSquareIcon,
      subItems: generateDiagnostikSubItems()
    },
    {
      name: "Analitik Prediktif",
      icon: ChartBarSquareIcon,
      subItems: generatePrediktifSubItems()
    },
    {
      name: "Analitik Preskriptif",
      icon: ChartBarSquareIcon,
      subItems: generatePreskriptifSubItems()
    },
    { name: "Laporan Strategik", path: "/laporan-strategik", icon: NewspaperIcon },
    { name: "Selenggara Pengguna", path: "/selenggara-pengguna", icon: AdjustmentsHorizontalIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isSubItemActive = (subItems?: SubMenuItem[]): boolean => {
    if (!subItems) return false;
    return subItems.some(sub => {
      if (location.pathname === sub.path) return true;
      if (sub.subItems) return isSubItemActive(sub.subItems);
      return false;
    });
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  // Recursive component for rendering menu items
  const renderSubItems = (subItems: SubMenuItem[], depth: number = 0) => {
    return subItems.map((subItem) => {
      const hasNestedSubItems = subItem.subItems && subItem.subItems.length > 0;
      const isExpanded = expandedMenus.includes(subItem.path);
      const paddingLeft = depth === 0 ? "pl-14" : "pl-20";

      return (
        <div key={subItem.path}>
          <button
            onClick={() => {
              if (hasNestedSubItems) {
                toggleMenu(subItem.path);
              } else {
                navigate(subItem.path);
              }
            }}
            className={`w-full flex items-center gap-3 ${paddingLeft} pr-4 py-2 text-sm transition-colors ${isActive(subItem.path)
              ? "bg-blue-100 text-blue-900 border-l-4 border-blue-900"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <span className="flex-grow text-left">{subItem.name}</span>
            {hasNestedSubItems && (
              isExpanded ? (
                <ChevronUpIcon className="w-4 h-4 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 flex-shrink-0" />
              )
            )}
          </button>

          {hasNestedSubItems && isExpanded && (
            <div className="bg-gray-100">
              {renderSubItems(subItem.subItems!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
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
          const isExpanded = expandedMenus.includes(item.name);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isParentActive = item.path ? isActive(item.path) : isSubItemActive(item.subItems);

          return (
            <div key={item.name}>
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleMenu(item.name);
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${isParentActive
                  ? "bg-blue-50 text-blue-900 border-l-4 border-blue-900"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                title={isCollapsed ? item.name : ""}
              >
                <IconComponent className="w-6 h-6 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-grow text-left">{item.name}</span>
                    {hasSubItems && (
                      isExpanded ? (
                        <ChevronUpIcon className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 flex-shrink-0" />
                      )
                    )}
                  </>
                )}
              </button>

              {/* Sub-menu items */}
              {hasSubItems && isExpanded && !isCollapsed && (
                <div className="bg-gray-50">
                  {renderSubItems(item.subItems!)}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
