import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {
  getAllTeras,
  getKomponenByTeras,
  getIndikatorByKomponen,
} from "../lib/dataLookup";

function PieChart() {
  const teras = getAllTeras();

  // Palette for Teras layers
  const colors = ["#1e3a8a", "#dc2626", "#16a34a", "#eab308", "#9333ea"];

  // Build 3-level hierarchy (Teras → Komponen → Indikator)
  const hierarchyData = teras.slice(0, 5).map((t, index) => ({
    teras: t,
    komponen: getKomponenByTeras(t["Kod Teras"]).map((k) => ({
      komponen: k,
      indikator: getIndikatorByKomponen(k["Kod Komponen"]),
    })),
    color: colors[index],
  }));

  // ----------------------------------------------------
  // Chart Configuration
  // ----------------------------------------------------
  const chartOptions = useMemo(() => {
    // --- Inner Ring: Teras ---
    const terasData = hierarchyData.map((td) => ({
      name: td.teras["Nama Teras"],
      y: td.komponen.length,
      color: td.color,
    }));

    // --- Middle Ring: Komponen ---
    const komponenData: Highcharts.PointOptionsObject[] = [];
    hierarchyData.forEach((td) => {
      td.komponen.forEach((kd) => {
        komponenData.push({
          name: kd.komponen["Nama Komponen"],
          y: kd.indikator.length,
          color: Highcharts.color(td.color).brighten(0.1).get(),
        });
      });
    });

    // --- Outer Ring: Indikator ---
    const indikatorData: Highcharts.PointOptionsObject[] = [];
    hierarchyData.forEach((td) => {
      td.komponen.forEach((kd) => {
        kd.indikator.forEach((ind) => {
          indikatorData.push({
            name: ind["Nama Indikator"],
            y: 1,
            color: Highcharts.color(td.color).brighten(0.2).get(),
          });
        });
      });
    });

    // Final chart config
    return {
      chart: {
        type: "pie",
        backgroundColor: "#ffffff",
        height: 600,
      },
      title: {
        text: "Struktur Hierarki IKKA",
        style: {
          fontSize: "18px",
          fontWeight: "600",
          color: "#1f2937",
        },
      },
      credits: { enabled: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        style: { color: "#ffffff" },
        borderWidth: 0,
        shadow: true,
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ["50%", "50%"],
          dataLabels: { enabled: false },
          showInLegend: false,
        },
      },

      series: [
        {
          name: "Teras",
          data: terasData,
          size: "40%",
          innerSize: "0%",
          dataLabels: {
            enabled: true,
            distance: -30,
            format: "{point.name}",
            style: {
              fontSize: "11px",
              fontWeight: "bold",
              color: "#ffffff",
              textOutline: "none",
            },
          },
        },
        {
          name: "Komponen",
          data: komponenData,
          size: "70%",
          innerSize: "45%",
          dataLabels: { enabled: false },
        },
        {
          name: "Indikator",
          data: indikatorData,
          size: "100%",
          innerSize: "75%",
          dataLabels: { enabled: false },
        },
      ],
    };
  }, [hierarchyData]);

  // ----------------------------------------------------
  // JSX Layout
  // ----------------------------------------------------
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Chart */}
        <div className="flex-grow min-w-0">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>

        {/* Side Legend */}
        <aside className="lg:w-80 flex flex-col">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Butiran Teras
          </h4>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {hierarchyData.map((item, index) => {
              const totalIndikator = item.komponen.reduce(
                (sum, k) => sum + k.indikator.length,
                0
              );

              return (
                <div
                  key={index}
                  className="p-3 rounded-lg border-l-4 bg-gray-50 hover:bg-gray-100 transition"
                  style={{ borderLeftColor: item.color }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-sm font-semibold text-gray-900">
                      Teras {index + 1}
                    </p>
                  </div>

                  <p className="text-xs text-gray-700 mb-2 ml-6">
                    {item.teras["Nama Teras"]}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-600 ml-6">
                    <span>
                      <strong className="text-gray-900">
                        {item.komponen.length}
                      </strong>{" "}
                      Komponen
                    </span>
                    <span>
                      <strong className="text-gray-900">
                        {totalIndikator}
                      </strong>{" "}
                      Indikator
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Layer Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Struktur Lapisan
            </h4>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-900" />
                <span>Lapisan Dalam: Teras</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-700" />
                <span>Lapisan Tengah: Komponen</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Lapisan Luar: Indikator</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PieChart;
