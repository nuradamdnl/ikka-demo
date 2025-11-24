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
import komponenData from "../../../assets/data/Komponen.json";
import indeksKomponenData from "../../../assets/data/IndeksKomponen.json";

type KomponenIndeksData = {
  "Kod Teras": string;
  "Nama Teras": string;
  "Kod Komponen": string;
  "Nama Komponen": string;
  Tahun: number;
  Indeks: string;
};

function PenjanaanIndeksKomponen() {
  const [selectedTerasKod, setSelectedTerasKod] = useState("");
  const [selectedKomponenKod, setSelectedKomponenKod] = useState("");
  const [showCalculations, setShowCalculations] = useState(false);

  const filteredKomponen = useMemo(() => {
    if (!selectedTerasKod) return [];
    return komponenData.filter((k) => k["Kod Teras"] === selectedTerasKod);
  }, [selectedTerasKod]);

  const selectedKomponen = useMemo(
    () =>
      komponenData.find((k) => k["Kod Komponen"] === selectedKomponenKod),
    [selectedKomponenKod]
  );

  const komponenIndeksHistory = useMemo(() => {
    if (!selectedKomponenKod) return [];
    return (indeksKomponenData as KomponenIndeksData[])
      .filter((ik) => ik["Kod Komponen"] === selectedKomponenKod)
      .sort((a, b) => a.Tahun - b.Tahun);
  }, [selectedKomponenKod]);

  const handleJanaIndeks = () => {
    setShowCalculations(true);
  };

  const handleTerasChange = (kodTeras: string) => {
    setSelectedTerasKod(kodTeras);
    setSelectedKomponenKod("");
    setShowCalculations(false);
  };

  const handleKomponenChange = (kodKomponen: string) => {
    setSelectedKomponenKod(kodKomponen);
    setShowCalculations(false);
  };

  const chartOptions: Highcharts.Options | null = useMemo(() => {
    if (komponenIndeksHistory.length === 0) return null;

    return {
      chart: {
        type: "column",
        backgroundColor: "#ffffff",
        height: 400,
      },
      title: {
        text: "Indeks Komponen (Asas 100)",
        style: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#1f2937",
        },
      },
      credits: { enabled: false },
      xAxis: {
        categories: komponenIndeksHistory.map((h) => h.Tahun.toString()),
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
          name: "Indeks Komponen",
          data: komponenIndeksHistory.map((h) => {
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
  }, [komponenIndeksHistory]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Penjanaan Indeks Komponen</PageTitle>

            <SectionCard title="Pilih Komponen">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Komponen
                    </label>
                    <select
                      value={selectedKomponenKod}
                      onChange={(e) => handleKomponenChange(e.target.value)}
                      disabled={!selectedTerasKod}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">-- Sila pilih komponen --</option>
                      {filteredKomponen.map((komponen) => (
                        <option
                          key={komponen["Kod Komponen"]}
                          value={komponen["Kod Komponen"]}
                        >
                          {komponen["Kod Komponen"]} –{" "}
                          {komponen["Nama Komponen"]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </SectionCard>

            {selectedKomponen && komponenIndeksHistory.length > 0 && (
              <SectionCard title="Hasil Carian Komponen">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Kod Komponen</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedKomponen["Kod Komponen"]}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Nama Komponen</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedKomponen["Nama Komponen"]}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Teras</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedKomponen["Kod Teras"]} –{" "}
                          {selectedKomponen["Nama Teras"]}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 border-l border-gray-200 pl-6">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Julat Tahun:
                        </span>
                        <span className="text-xs font-semibold">
                          {komponenIndeksHistory[0].Tahun} -{" "}
                          {
                            komponenIndeksHistory[
                              komponenIndeksHistory.length - 1
                            ].Tahun
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Bilangan Tahun:
                        </span>
                        <span className="text-xs font-semibold">
                          {komponenIndeksHistory.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Indeks Terkini (
                          {
                            komponenIndeksHistory[
                              komponenIndeksHistory.length - 1
                            ].Tahun
                          }
                          ):
                        </span>
                        <span className="text-xs font-semibold">
                          {parseFloat(
                            komponenIndeksHistory[
                              komponenIndeksHistory.length - 1
                            ].Indeks
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

            {showCalculations && komponenIndeksHistory.length > 0 && (
              <>
                <SectionCard title="Indeks Komponen Mengikut Tahun">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-blue-900 text-white">
                          <th className="border border-gray-300 px-4 py-2 text-left">
                            Tahun
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-right">
                            Indeks Komponen
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {komponenIndeksHistory.map((h) => (
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
                      Carta bar menunjukkan trend Indeks Komponen mengikut
                      tahun. Hover pada bar untuk melihat nilai tepat.
                    </p>
                  </SectionCard>
                )}

                <SectionCard title="Nota">
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                      Indeks Komponen dikira berdasarkan purata indeks semua
                      indikator dalam komponen tersebut.
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

export default PenjanaanIndeksKomponen;
