import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import {
  buildIndicatorMap,
  getAvailableYears,
  getDefaultBaselineYear,
  loadBaselineOverrides,
  saveBaselineOverrides,
  IndicatorMapItem,
} from "../../../lib/indeksCalculator";

type BaselineOverrides = Record<string, number>;

function PenetapanTahunAsas() {
  const indicatorMap = useMemo(() => buildIndicatorMap(), []);
  const [overrides, setOverrides] = useState<BaselineOverrides>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOverrides(loadBaselineOverrides());
  }, []);

  const indicators = useMemo(() => {
    const list = Array.from(indicatorMap.values()).sort((a, b) =>
      a.code.localeCompare(b.code)
    );
    if (!search) return list;
    const term = search.toLowerCase();
    return list.filter(
      (i) =>
        i.code.toLowerCase().includes(term) ||
        i.name.toLowerCase().includes(term)
    );
  }, [indicatorMap, search]);

  const handleBaselineChange = (code: string, year: number) => {
    setOverrides((prev) => {
      const next = { ...prev, [code]: year };
      saveBaselineOverrides(next);
      return next;
    });
  };

  const totalOverrides = Object.keys(overrides).length;

  const resolvedBaseline = (ind: IndicatorMapItem) =>
    overrides[ind.code] ?? getDefaultBaselineYear(ind, overrides);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penetapan Tahun Asas</PageTitle>

            <SectionCard title="Ringkasan">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Jumlah Indikator</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {indicatorMap.size}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Tahun Asas Disimpan</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {totalOverrides}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Tahun Asas Terkini</p>
                  <p className="text-2xl font-bold text-gray-900">2021</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-600">Nota</p>
                  <p className="text-sm text-gray-700">
                    Tetapan tahun asas di sini akan digunakan dalam Penjanaan
                    Indeks (Asas 100).
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Senarai Indikator & Tahun Asas">
              <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-700">
                    Cari dan tetapkan tahun asas untuk setiap indikator. Pilihan
                    disimpan di pelayar dan digunakan semasa pengiraan indeks.
                  </p>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kod atau nama indikator..."
                  className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                      <th className="px-4 py-2 text-left border border-gray-200">
                        Kod Indikator
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-200">
                        Nama Indikator
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-200">
                        Tahun Tersedia
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-200">
                        Tahun Asas
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-200">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {indicators.map((ind) => {
                      const years = getAvailableYears(ind);
                      const selectedYear = resolvedBaseline(ind);
                      const defaultYear = getDefaultBaselineYear(ind, {});
                      const hasOverride = overrides[ind.code] !== undefined;

                      return (
                        <tr
                          key={ind.code}
                          className="hover:bg-gray-50 border border-gray-200"
                        >
                          <td className="px-4 py-2 font-semibold text-gray-900">
                            {ind.code}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {ind.name}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {years.join(", ")}
                          </td>
                          <td className="px-4 py-2">
                            <select
                              value={selectedYear}
                              onChange={(e) =>
                                handleBaselineChange(
                                  ind.code,
                                  Number(e.target.value)
                                )
                              }
                              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              {years.map((y) => (
                                <option key={y} value={y}>
                                  {y}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            {hasOverride ? (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                                Disimpan (lalai: {defaultYear})
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded">
                                Menggunakan lalai ({defaultYear})
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {indicators.length === 0 && (
                  <p className="text-sm text-gray-600 text-center py-6">
                    Tiada indikator ditemui untuk carian ini.
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

export default PenetapanTahunAsas;
