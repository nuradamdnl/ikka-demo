import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import tetapanIndikator from "../../../assets/data/TetapanIndikator.json";

type TetapanRow = {
  "Rujukan Indikator": string;
  "Kod Jabatan": string;
  "Nama Indikator": string;
};

type AssignmentOverrides = Record<string, string>;

const STORAGE_KEY = "ikka-indikator-jabatan";

function PenetapanIndikator() {
  const [search, setSearch] = useState("");
  const [jabatanFilter, setJabatanFilter] = useState("");
  const [overrides, setOverrides] = useState<AssignmentOverrides>({});

  const assignments = tetapanIndikator as TetapanRow[];

  const allJabatan = useMemo(() => {
    const set = new Set<string>();
    assignments.forEach((row) => set.add(row["Kod Jabatan"]));
    return Array.from(set).sort();
  }, [assignments]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setOverrides(parsed as AssignmentOverrides);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return assignments
      .filter((row) => {
        const matchesSearch =
          !term ||
          row["Rujukan Indikator"].toLowerCase().includes(term) ||
          row["Nama Indikator"].toLowerCase().includes(term);
        const matchesJabatan =
          !jabatanFilter ||
          (overrides[row["Rujukan Indikator"]] ?? row["Kod Jabatan"]) === jabatanFilter;
        return matchesSearch && matchesJabatan;
      })
      .sort((a, b) => a["Rujukan Indikator"].localeCompare(b["Rujukan Indikator"]));
  }, [assignments, jabatanFilter, overrides, search]);

  const handleChange = (rujukan: string, jabatan: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [rujukan]: jabatan };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const totalOverrides = Object.keys(overrides).length;
  const totalIndikator = assignments.length;
  const jabatanSet = new Set(
    assignments.map((r) => overrides[r["Rujukan Indikator"]] ?? r["Kod Jabatan"])
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penetapan Indikator</PageTitle>

            <SectionCard title="Ringkasan">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Jumlah Indikator</p>
                  <p className="text-2xl font-bold text-gray-900">{totalIndikator}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Jumlah Jabatan Unik</p>
                  <p className="text-2xl font-bold text-gray-900">{jabatanSet.size}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Tetapan Disimpan</p>
                  <p className="text-2xl font-bold text-blue-900">{totalOverrides}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Nota</p>
                  <p className="text-sm text-gray-700">
                    Pilihan jabatan disimpan di pelayar dan digunakan untuk kemasukan data
                    serta pengiraan indeks.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Tetapan Indikator">
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kod atau nama indikator..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={jabatanFilter}
                  onChange={(e) => setJabatanFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Jabatan</option>
                  {allJabatan.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-gray-600 flex items-center">
                  Petakan setiap indikator kepada jabatan bertanggungjawab.
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                      <th className="px-4 py-2 text-left border border-gray-200">Rujukan</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Nama Indikator</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Jabatan Asal</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Tetapan Jabatan</th>
                      <th className="px-4 py-2 text-left border border-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => {
                      const defaultJabatan = row["Kod Jabatan"];
                      const current = overrides[row["Rujukan Indikator"]] ?? defaultJabatan;
                      const isOverride = overrides[row["Rujukan Indikator"]] !== undefined;

                      return (
                        <tr key={row["Rujukan Indikator"]} className="hover:bg-gray-50 border border-gray-200">
                          <td className="px-4 py-2 font-semibold text-gray-900">
                            {row["Rujukan Indikator"]}
                          </td>
                          <td className="px-4 py-2 text-gray-800">{row["Nama Indikator"]}</td>
                          <td className="px-4 py-2 text-gray-700">{defaultJabatan}</td>
                          <td className="px-4 py-2">
                            <select
                              value={current}
                              onChange={(e) => handleChange(row["Rujukan Indikator"], e.target.value)}
                              className="w-44 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              {allJabatan.map((j) => (
                                <option key={j} value={j}>
                                  {j}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            {isOverride ? (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                                Disimpan (asal: {defaultJabatan})
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
                    Tiada indikator ditemui untuk carian/pilihan ini.
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

export default PenetapanIndikator;
