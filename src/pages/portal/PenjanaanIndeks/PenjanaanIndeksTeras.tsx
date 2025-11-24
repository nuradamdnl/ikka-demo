import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import Button from "../../../components/Button";
import { BoltIcon } from "@heroicons/react/24/outline";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import terasData from "../../../assets/data/Teras.json";
import indeksTerasData from "../../../assets/data/IndeksTeras.json";

type TerasIndeksData = {
  "Kod Teras": string;
  "Nama Teras": string;
  Tahun: number;
  Indeks: string;
};

function PenjanaanIndeksTeras() {
  const [selectedTerasKod, setSelectedTerasKod] = useState("");
  const [showCalculations, setShowCalculations] = useState(false);

  const selectedTeras = useMemo(
    () => terasData.find((t) => t["Kod Teras"] === selectedTerasKod),
    [selectedTerasKod]
  );

  const terasIndeksHistory = useMemo(() => {
    if (!selectedTerasKod) return [];
    return (indeksTerasData as TerasIndeksData[])
      .filter((it) => it["Kod Teras"] === selectedTerasKod)
      .sort((a, b) => a.Tahun - b.Tahun);
  }, [selectedTerasKod]);

  const handleJanaIndeks = () => {
    setShowCalculations(true);
  };

  const handleTerasChange = (kodTeras: string) => {
    setSelectedTerasKod(kodTeras);
    setShowCalculations(false);
  };

  const chartOptions: Highcharts.Options | null = useMemo(() => {
    if (terasIndeksHistory.length === 0) return null;

    return {
      chart: {
        type: "column",
        backgroundColor: "#ffffff",
        height: 400,
      },
      title: {
        text: "Indeks Teras (Asas 100)",
        style: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#1f2937",
        },
      },
      credits: { enabled: false },
      xAxis: {
        categories: terasIndeksHistory.map((h) => h.Tahun.toString()),
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
          name: "Indeks Teras",
          data: terasIndeksHistory.map((h) => {
            const nilai = parseFloat(h.Indeks);
            return {
              y: nilai,
              color:
                nilai > 100
                  ? "#16a34a"
                  : nilai < 100
                  ? "#dc2626"
                  : "#3b82f6",
            };
          }),
          showInLegend: false,
        },
      ],
    };
  }, [terasIndeksHistory]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penjanaan Indeks Teras</PageTitle>

            <SectionCard title="Pilih Teras">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Teras
                  </label>
                  <select
                    value={selectedTerasKod}
                    onChange={(e) => handleTerasChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Sila pilih teras --</option>
                    {terasData.map((teras) => (
                      <option
                        key={teras["Kod Teras"]}
                        value={teras["Kod Teras"]}
                      >
                        {teras["Kod Teras"]} – {teras["Nama Teras"]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </SectionCard>

            {selectedTeras && terasIndeksHistory.length > 0 && (
              <SectionCard title="Hasil Carian Teras">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Kod Teras</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedTeras["Kod Teras"]}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Nama Teras</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedTeras["Nama Teras"]}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 border-l border-gray-200 pl-6">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Julat Tahun:
                        </span>
                        <span className="text-xs font-semibold">
                          {terasIndeksHistory[0].Tahun} -{" "}
                          {
                            terasIndeksHistory[terasIndeksHistory.length - 1]
                              .Tahun
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Bilangan Tahun:
                        </span>
                        <span className="text-xs font-semibold">
                          {terasIndeksHistory.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Indeks Terkini ({terasIndeksHistory[terasIndeksHistory.length - 1].Tahun}):
                        </span>
                        <span className="text-xs font-semibold">
                          {parseFloat(
                            terasIndeksHistory[terasIndeksHistory.length - 1]
                              .Indeks
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleJanaIndeks}
                      className="w-full"
                    >
                      <BoltIcon className="h-5 w-5 mr-2" />
                      Jana Indeks
                    </Button>
                  </div>
                </div>
              </SectionCard>
            )}

            {showCalculations && terasIndeksHistory.length > 0 && (
              <>
                <SectionCard title="Indeks Teras Mengikut Tahun">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-blue-900 text-white">
                          <th className="border border-gray-300 px-4 py-2 text-left">
                            Tahun
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-right">
                            Indeks Teras
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {terasIndeksHistory.map((h) => (
                          <tr key={h.Tahun} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                              {h.Tahun}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                              {parseFloat(h.Indeks).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>

                {chartOptions && (
                  <SectionCard title="Visualisasi Data">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                    <p className="text-xs text-gray-600 mt-4">
                      Carta bar menunjukkan trend Indeks Teras mengikut tahun.
                      Hover pada bar untuk melihat nilai tepat.
                    </p>
                  </SectionCard>
                )}

                <SectionCard title="Nota">
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                      Indeks Teras dikira berdasarkan purata indeks semua
                      komponen dalam teras tersebut.
                    </li>
                    <li>
                      Nilai indeks di atas 100 menunjukkan prestasi lebih baik
                      berbanding tahun asas.
                    </li>
                    <li>
                      Nilai indeks di bawah 100 menunjukkan prestasi lebih
                      rendah berbanding tahun asas.
                    </li>
                  </ul>
                </SectionCard>
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PenjanaanIndeksTeras;
