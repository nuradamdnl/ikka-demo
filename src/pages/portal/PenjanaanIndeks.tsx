import { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import {
  buildIndicatorMap,
  computeStats,
  getAvailableYears,
  getDefaultBaselineYear,
  IndicatorStats,
} from "../../lib/indeksCalculator";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PenjanaanIndeks() {
  const [indicatorCode, setIndicatorCode] = useState("");
  const [baselineYear, setBaselineYear] = useState<number>(2021);
  const [searchTerm, setSearchTerm] = useState("");

  const indicatorMap = useMemo(() => buildIndicatorMap(), []);

  const filteredIndicators = useMemo(() => {
    const indicators = Array.from(indicatorMap.values()).sort((a, b) =>
      a.code.localeCompare(b.code)
    );

    if (!searchTerm) return indicators;

    const term = searchTerm.toLowerCase();
    return indicators.filter(
      (ind) =>
        ind.code.toLowerCase().includes(term) ||
        ind.name.toLowerCase().includes(term)
    );
  }, [indicatorMap, searchTerm]);

  const selectedIndicator = useMemo(
    () => (indicatorCode ? indicatorMap.get(indicatorCode) : null),
    [indicatorCode, indicatorMap]
  );

  const availableYears = useMemo(
    () => (selectedIndicator ? getAvailableYears(selectedIndicator) : []),
    [selectedIndicator]
  );

  const stats: IndicatorStats | null = useMemo(
    () =>
      selectedIndicator ? computeStats(selectedIndicator, baselineYear) : null,
    [selectedIndicator, baselineYear]
  );

  useEffect(() => {
    if (selectedIndicator) {
      const defaultYear = getDefaultBaselineYear(selectedIndicator);
      setBaselineYear(defaultYear);
    }
  }, [selectedIndicator]);

  const chartOptions: Highcharts.Options | null = useMemo(() => {
    if (!stats) return null;

    const chartData = stats.years.filter((y) => y.index100 != null);
    if (chartData.length === 0) return null;

    return {
      chart: {
        type: "column",
        backgroundColor: "#ffffff",
        height: 400,
      },
      title: {
        text: "Indeks Indikator Asas 100",
        style: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#1f2937",
        },
      },
      credits: { enabled: false },
      xAxis: {
        categories: chartData.map((y) => y.year.toString()),
        title: { text: "Tahun" },
      },
      yAxis: {
        title: { text: "Indeks (Asas 100)" },
        plotLines: [
          {
            value: 100,
            color: "#dc2626",
            width: 2,
            dashStyle: "Dash",
            label: {
              text: "Asas 100",
              style: { color: "#dc2626" },
            },
          },
        ],
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        style: { color: "#ffffff" },
        borderWidth: 0,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            format: "{point.y:.2f}",
            style: {
              fontSize: "11px",
              fontWeight: "600",
            },
          },
        },
      },
      series: [
        {
          type: "column",
          name: "Indeks Asas 100",
          data: chartData.map((y) => ({
            y: y.index100,
            color:
              y.index100! > 100
                ? "#16a34a"
                : y.index100! < 100
                ? "#dc2626"
                : "#3b82f6",
          })),
          showInLegend: false,
        },
      ],
    };
  }, [stats]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penjanaan Indeks</PageTitle>

            {/* Input Section */}
            <SectionCard title="Input">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cari Indikator
                    </label>
                    <input
                      type="text"
                      placeholder="Taip kod atau nama indikator..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Kod Indikator
                    </label>
                    <select
                      value={indicatorCode}
                      onChange={(e) => setIndicatorCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Sila pilih indikator --</option>
                      {filteredIndicators.map((ind) => (
                        <option key={ind.code} value={ind.code}>
                          {ind.code} – {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Tahun Asas (Asas 100)
                    </label>
                    <select
                      value={baselineYear}
                      onChange={(e) => setBaselineYear(Number(e.target.value))}
                      disabled={!indicatorCode}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-xs text-gray-600">
                  Kod Guna Pakai A1/A2/A4: data digunakan dalam pengiraan
                  indeks. Kod Guna Pakai A3: data dijumlahkan tetapi{" "}
                  <strong>tidak</strong> dimasukkan dalam pengiraan indeks.
                </p>
              </div>
            </SectionCard>

            {/* Metadata Section */}
            {selectedIndicator && stats && (
              <SectionCard title="Maklumat Indikator">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600">Kod Indikator</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {stats.code}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Nama Indikator</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {stats.name}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Kod Guna Pakai</p>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                            stats.guna === "A3"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {stats.guna}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Impak</p>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                            stats.isPositive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {stats.impak}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-l border-gray-200 pl-6">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">
                        Julat Tahun:
                      </span>
                      <span className="text-xs font-semibold">
                        {Math.min(...stats.years.map((y) => y.year))} -{" "}
                        {Math.max(...stats.years.map((y) => y.year))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">
                        Bilangan Tahun:
                      </span>
                      <span className="text-xs font-semibold">{stats.n}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Tahun Asas:</span>
                      <span className="text-xs font-semibold">
                        {stats.baseYear}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">
                        Indeks pada Tahun Asas:
                      </span>
                      <span className="text-xs font-semibold">
                        {stats.baseIndex?.toFixed(2) || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* Aggregation Section */}
            {stats && (
              <SectionCard title="Langkah 1–3: Jumlah, Min & Sisihan Piawai">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">
                      Jumlah Data Agregat
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.sum.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">Bilangan Tahun (n)</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.n}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">Min (∑ / n)</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.mean.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">
                      Sisihan Piawai (σ)
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.stdDev.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Tahun
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Jumlah Jun
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Jumlah Dis
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Jumlah Setahun
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.years.map((y) => {
                        const junKey = Object.keys(y.penggalTotals).find((k) =>
                          k.toLowerCase().startsWith("jun")
                        );
                        const disKey = Object.keys(y.penggalTotals).find((k) =>
                          k.toLowerCase().startsWith("dis")
                        );

                        return (
                          <tr key={y.year} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                              {y.year}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                              {junKey
                                ? y.penggalTotals[junKey].toFixed(2)
                                : "-"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                              {disKey
                                ? y.penggalTotals[disKey].toFixed(2)
                                : "-"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                              {y.yearTotal.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            )}

            {/* Index Calculation Section */}
            {stats && (
              <SectionCard title="Langkah 4–6: Skor-z, Indeks & Asas 100">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Tahun
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Jumlah Setahun
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Skor-z
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Indeks Indikator
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Indeks Asas 100
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.years.map((y) => (
                        <tr key={y.year} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            {y.year}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {y.yearTotal.toFixed(2)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {y.z.toFixed(2)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {y.index != null ? y.index.toFixed(2) : "-"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                            {y.index100 != null ? y.index100.toFixed(2) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-gray-600 mt-4">
                  {stats.guna === "A3"
                    ? "Kod Guna Pakai = A3 → mengikut modul, indikator ini tidak digunakan dalam pengiraan indeks. Aplikasi hanya memaparkan jumlah dan skor-z asas (indeks dibiar kosong)."
                    : "Indeks Indikator dikira daripada skor-z, kemudian dinormalisasikan kepada Asas 100 menggunakan tahun asas yang dipilih."}
                </p>
              </SectionCard>
            )}

            {/* Chart Section */}
            {stats && chartOptions && (
              <SectionCard title="Visualisasi Data">
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                <p className="text-xs text-gray-600 mt-4">
                  Carta bar menunjukkan trend Indeks Indikator Asas 100 mengikut
                  tahun. Hover pada bar untuk melihat nilai tepat.
                </p>
              </SectionCard>
            )}

            {/* Info Section */}
            <SectionCard title="Nota">
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                <li>
                  Jika semua nilai setahun adalah 0, sisihan piawai = 0 dan
                  semua skor-z dianggap 0 (indeks = 100).
                </li>
                <li>
                  Jika Kod Guna Pakai = A3, aplikasi hanya memaparkan jumlah
                  data; indeks tidak dikira.
                </li>
                <li>
                  Menambah tahun baharu untuk mana-mana indikator akan mengubah
                  min, sisihan piawai dan semua indeks untuk indikator tersebut
                  secara automatik.
                </li>
              </ul>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PenjanaanIndeks;