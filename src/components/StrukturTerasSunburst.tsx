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

type StrukturTerasSunburstProps = {
  kodTeras: string;
  tahun?: number;
};

function StrukturTerasSunburst({ kodTeras, tahun = 2025 }: StrukturTerasSunburstProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  // Find the specific Teras
  const teras = terasData.find((t) => t["Kod Teras"] === kodTeras);
  
  if (!teras) {
    return <div className="text-red-500">Teras tidak dijumpai</div>;
  }

  // Get Komponen for this Teras
  const terasKomponen = komponenData.filter(
    (k) => k["Kod Teras"] === kodTeras
  );

  // Define base colors for each Teras
  const terasColorMap: { [key: string]: string } = {
    "T01": "#82b1fcff",
    "T02": "#77eca8ff",
    "T03": "#fde274ff",
    "T04": "#fc79c3ff",
    "T05": "#c28dfcff",
  };

  const baseTerasColor = terasColorMap[kodTeras] || "#82b1fcff";

  // Helper function to brighten color for hierarchy
  const adjustColor = (color: string, level: number) => {
    const factors = [1, 1.2, 1.4]; // Komponen (base), Komponen variations, Indikator (light)
    const factor = factors[level] || 1;
    
    const hex = color.replace("#", "");
    const r = Math.min(255, Math.round(parseInt(hex.substr(0, 2), 16) * factor));
    const g = Math.min(255, Math.round(parseInt(hex.substr(2, 2), 16) * factor));
    const b = Math.min(255, Math.round(parseInt(hex.substr(4, 2), 16) * factor));
    
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Helper function to generate color variations for multiple Komponen
  const generateKomponenColor = (baseColor: string, index: number, total: number) => {
    // Generate variations from dark to light (1.0 to 1.5)
    const minFactor = 1.0;
    const maxFactor = 1.5;
    const step = total > 1 ? (maxFactor - minFactor) / (total - 1) : 0;
    const factor = minFactor + (step * index);
    
    const hex = baseColor.replace("#", "");
    const r = Math.min(255, Math.round(parseInt(hex.substr(0, 2), 16) * factor));
    const g = Math.min(255, Math.round(parseInt(hex.substr(2, 2), 16) * factor));
    const b = Math.min(255, Math.round(parseInt(hex.substr(4, 2), 16) * factor));
    
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Build hierarchical data structure
  const buildSunburstData = () => {
    const data: any[] = [];
    const totalKomponen = terasKomponen.length;

    terasKomponen.forEach((komponen, komponenIndex) => {
      // Generate variations of base color for each Komponen (darker to lighter)
      const komponenColor = generateKomponenColor(baseTerasColor, komponenIndex, totalKomponen);
      
      // Add Komponen node
      data.push({
        id: komponen["Kod Komponen"],
        name: `${komponen["Kod Komponen"]}: ${komponen["Nama Komponen"]}`,
        fullName: `${komponen["Kod Komponen"]}: ${komponen["Nama Komponen"]}`,
        value: 1,
        color: komponenColor,
      });

      // Get Indikator for this Komponen
      const komponenIndikator = indikatorData.filter(
        (i) => i["Kod Komponen"] === komponen["Kod Komponen"]
      );

      komponenIndikator.forEach((indikator) => {
        // Add Indikator node - lighter version of Komponen color (1.3x brighter)
        const indikatorColor = adjustColor(komponenColor, 1.3);
        data.push({
          id: indikator["Kod Indikator"],
          parent: komponen["Kod Komponen"],
          name: `${indikator["Kod Indikator"]}: ${indikator["Nama Indikator"]}`,
          fullName: `${indikator["Kod Indikator"]}: ${indikator["Nama Indikator"]}`,
          value: 1,
          color: indikatorColor,
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
      text: `${teras["Kod Teras"]}: ${teras["Nama Teras"]} (${tahun})`,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "Komponen (Lapisan Dalam) > Indikator (Lapisan Luar)",
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
        <div className="w-80 flex-shrink-0">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Petunjuk Komponen</h3>
          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-2">
            {terasKomponen.map((komponen, index) => {
              const komponenColor = generateKomponenColor(baseTerasColor, index, terasKomponen.length);
              
              return (
                <div key={komponen["Kod Komponen"]} className="flex items-start gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: komponenColor }}
                  />
                  <span className="text-sm text-gray-700">
                    {komponen["Kod Komponen"]}: {komponen["Nama Komponen"]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrukturTerasSunburst;
