import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import terasData from "../assets/data/Teras.json";
import indeksTerasData from "../assets/data/IndeksTeras.json";

function IndeksTerasLineChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedTerasKod, setSelectedTerasKod] = useState<string>("T01");

  useEffect(() => {
    if (chartRef.current && selectedTerasKod) {
      const filteredData = indeksTerasData.filter(
        (item) => item["Kod Teras"] === selectedTerasKod
      );

      const years = filteredData.map((item) => item["Tahun"]);
      const values = filteredData.map((item) => parseFloat(item["Indeks"]));

      const selectedTeras = terasData.find(
        (t) => t["Kod Teras"] === selectedTerasKod
      );

      Highcharts.chart(chartRef.current, {
        chart: {
          type: "line",
          height: 400,
        },
        title: {
          text: `Trend ${selectedTeras?.["Nama Teras"] || "Indeks Teras"}`,
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "600",
          },
        },
        xAxis: {
          categories: years.map(String),
          title: {
            text: "Tahun",
          },
        },
        yAxis: {
          title: {
            text: "Indeks",
          },
          min: 0,
          max: 120,
        },
        tooltip: {
          shared: true,
          valueDecimals: 2,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: false,
            },
            enableMouseTracking: true,
            marker: {
              enabled: true,
              radius: 4,
            },
          },
        },
        series: [
          {
            name: "Indeks Teras",
            data: values,
            color: "#1e40af",
            type: "line" as const,
          },
        ],
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
      } as any);
    }
  }, [selectedTerasKod]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pilih Teras
        </label>
        <select
          value={selectedTerasKod}
          onChange={(e) => setSelectedTerasKod(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {terasData.map((teras) => (
            <option key={teras["Kod Teras"]} value={teras["Kod Teras"]}>
              {teras["Kod Teras"]} - {teras["Nama Teras"]}
            </option>
          ))}
        </select>
      </div>
      <div ref={chartRef} className="w-full"></div>
    </div>
  );
}

export default IndeksTerasLineChart;
