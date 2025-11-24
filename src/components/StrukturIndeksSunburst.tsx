import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import terasData from "../assets/data/Teras.json";
import komponenData from "../assets/data/Komponen.json";
import indikatorData from "../assets/data/Indikator.json";

// @ts-ignore - Sunburst module initialization
import("highcharts/modules/sunburst").then((module) => {
  module.default(Highcharts);
});

type StrukturIndeksSunburstProps = {
  tahun?: number;
};

function StrukturIndeksSunburst({ tahun = 2025 }: StrukturIndeksSunburstProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  // Define 5 base colors for 5 Teras
  const terasColors = [
    "#82b1fcff",
    "#77eca8ff",
    "#fde274ff",
    "#fc79c3ff",
    "#c28dfcff"
  ];

  // Helper function to brighten/darken color for hierarchy
  const adjustColor = (color: string, level: number) => {
    const factors = [1, 1.2, 1.4]; // Teras (dark), Komponen (medium), Indikator (light)
    const factor = factors[level] || 1;
    
    const hex = color.replace("#", "");
    const r = Math.min(255, Math.round(parseInt(hex.substr(0, 2), 16) * factor));
    const g = Math.min(255, Math.round(parseInt(hex.substr(2, 2), 16) * factor));
    const b = Math.min(255, Math.round(parseInt(hex.substr(4, 2), 16) * factor));
    
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Build hierarchical data structure
  const buildSunburstData = () => {
    const data: any[] = [];

    terasData.forEach((teras, terasIndex) => {
      const terasColor = terasColors[terasIndex];
      
      // Add Teras node
      data.push({
        id: teras["Kod Teras"],
        name: `${teras["Kod Teras"]}: ${teras["Nama Teras"]}`,
        fullName: `${teras["Kod Teras"]}: ${teras["Nama Teras"]}`,
        value: 1,
        color: adjustColor(terasColor, 0),
      });

      // Get Komponen for this Teras
      const terasKomponen = komponenData.filter(
        (k) => k["Kod Teras"] === teras["Kod Teras"]
      );

      terasKomponen.forEach((komponen) => {
        // Add Komponen node
        data.push({
          id: komponen["Kod Komponen"],
          parent: teras["Kod Teras"],
          name: `${komponen["Kod Komponen"]}: ${komponen["Nama Komponen"]}`,
          fullName: `${komponen["Kod Komponen"]}: ${komponen["Nama Komponen"]}`,
          value: 1,
          color: adjustColor(terasColor, 1),
        });

        // Get Indikator for this Komponen
        const komponenIndikator = indikatorData.filter(
          (i) => i["Kod Komponen"] === komponen["Kod Komponen"]
        );

        komponenIndikator.forEach((indikator) => {
          // Add Indikator node
          data.push({
            id: indikator["Kod Indikator"],
            parent: komponen["Kod Komponen"],
            name: `${indikator["Kod Indikator"]}: ${indikator["Nama Indikator"]}`,
            fullName: `${indikator["Kod Indikator"]}: ${indikator["Nama Indikator"]}`,
            value: 1,
            color: adjustColor(terasColor, 2),
          });
        });
      });
    });

    return data;
  };

  const options: Highcharts.Options = {
    chart: {
      height: 600,
    },
    title: {
      text: `Struktur Hierarki IKKA ${tahun}`,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "Teras (Dalam) > Komponen (Tengah) > Indikator (Luar)",
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "sunburst",
        data: buildSunburstData(),
        cursor: "pointer",
        showInLegend: false,
        dataLabels: {
          enabled: false,
        },
        levels: [
          {
            level: 1,
            colorByPoint: true,
          },
          {
            level: 2,
            colorByPoint: false,
          },
          {
            level: 3,
            colorByPoint: false,
          },
        ] as any,
      },
    ],
    tooltip: {
      enabled: true,
      headerFormat: "",
      pointFormat: "<b>{point.fullName}</b>",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex gap-6 items-center">
        <div className="flex-grow">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
          />
        </div>
        <div className="w-64 flex-shrink-0">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Legenda</h3>
          <div className="space-y-2">
            {terasData.map((teras, index) => (
              <div key={teras["Kod Teras"]} className="flex items-start gap-2">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: terasColors[index] }}
                />
                <span className="text-sm text-gray-700">
                  {teras["Kod Teras"]}: {teras["Nama Teras"]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrukturIndeksSunburst;