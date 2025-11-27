import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import komponenData from "../../../assets/data/Komponen.json";

type KomponenRow = {
  "Kod Teras": string;
  "Nama Teras": string;
  "Kod Komponen": string;
  "Nama Komponen": string;
};

type KomponenOverrides = Record<string, string>;

const STORAGE_KEY = "ikka-komponen-teras";

function PenetapanKomponen() {
  const [search, setSearch] = useState("");
  const [terasFilter, setTerasFilter] = useState("");
  const [overrides, setOverrides] = useState<KomponenOverrides>({});

  const komponenList = komponenData as KomponenRow[];

  const allTeras = useMemo(() => {
    const set = new Set<string>();
    komponenList.forEach((row) => set.add(row["Kod Teras"]));
    return Array.from(set).sort();
  }, [komponenList]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setOverrides(parsed as KomponenOverrides);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return komponenList
      .filter((row) => {
        const matchesSearch =
          !term ||
          row["Kod Komponen"].toLowerCase().includes(term) ||
          row["Nama Komponen"].toLowerCase().includes(term);
        const currentTeras = overrides[row["Kod Komponen"]] ?? row["Kod Teras"];
        const matchesTeras = !terasFilter || currentTeras === terasFilter;
        return matchesSearch && matchesTeras;
      })
      .sort((a, b) => a["Kod Komponen"].localeCompare(b["Kod Komponen"]));
  }, [komponenList, overrides, search, terasFilter]);

  const handleChange = (kodKomponen: string, kodTeras: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [kodKomponen]: kodTeras };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const totalOverrides = Object.keys(overrides).length;
  const totalKomponen = komponenList.length;
  const terasSet = new Set(
    komponenList.map((r) => overrides[r["Kod Komponen"]] ?? r["Kod Teras"])
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penetapan Komponen</PageTitle>

            <SectionCard title="Ringkasan">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Jumlah Komponen</p>
                  <p className="text-2xl font-bold text-gray-900">{totalKomponen}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Jumlah Teras Unik</p>
                  <p className="text-2xl font-bold text-gray-900">{terasSet.size}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Tetapan Disimpan</p>
                  <p className="text-2xl font-bold text-blue-900">{totalOverrides}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Nota</p>
                  <p className="text-sm text-gray-700">
                    Pilihan teras disimpan di pelayar untuk digunakan dalam proses kemasukan data
                    dan pengiraan berkaitan komponen.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Tetapan Komponen">
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kod atau nama komponen..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={terasFilter}
                  onChange={(e) => setTerasFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Teras</option>
                  {allTeras.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-gray-600 flex items-center">
                  Petakan setiap komponen kepada teras yang bertanggungjawab.
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                      <th className="px-4 py-2 text-left border border-gray-200">Kod Komponen</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Nama Komponen</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Teras Asal</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Tetapan Teras</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => {
                      const defaultTeras = row["Kod Teras"];
                      const current = overrides[row["Kod Komponen"]] ?? defaultTeras;
                      const isOverride = overrides[row["Kod Komponen"]] !== undefined;

                      return (
                        <tr key={row["Kod Komponen"]} className="hover:bg-gray-50 border border-gray-200">
                          <td className="px-4 py-2 font-semibold text-gray-900">
                            {row["Kod Komponen"]}
                          </td>
                          <td className="px-4 py-2 text-gray-800">{row["Nama Komponen"]}</td>
                          <td className="px-4 py-2 text-gray-700">{defaultTeras}</td>
                          <td className="px-4 py-2">
                            <select
                              value={current}
                              onChange={(e) => handleChange(row["Kod Komponen"], e.target.value)}
                              className="w-36 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              {allTeras.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            {isOverride ? (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                                Disimpan (asal: {defaultTeras})
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded">
                                Menggunakan asal
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="text-sm text-gray-600 text-center py-6">
                    Tiada komponen ditemui untuk carian/pilihan ini.
                  </p>
                )}
              </div>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PenetapanKomponen;
