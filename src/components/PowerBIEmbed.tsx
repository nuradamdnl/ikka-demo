import { useState } from "react";
import SectionCard from "./SectionCard";

type PowerBIEmbedProps = {
  title: string;
};

function PowerBIEmbed({ title }: PowerBIEmbedProps) {
  const [chartType, setChartType] = useState<"Bar Chart" | "Line Chart">("Bar Chart");
  const [periodType, setPeriodType] = useState<"Mengikut Tahun" | "Mengikut Penggal">("Mengikut Tahun");

  const getReportUrl = () => {
    if (periodType === "Mengikut Tahun") {
      return chartType === "Bar Chart"
        ? `https://app.powerbi.com/view?r=eyJrIjoiNjAwODRiMGItNDdmZS00OWUyLWIxOTctMGFjMTZkZTIxOWEzIiwidCI6IjJhMGIyN2E5LTRiY2EtNGRjYi1iNjZlLWY2NzljZTVjMzY2OCIsImMiOjEwfQ%3D%3D`
        : `https://app.powerbi.com/view?r=eyJrIjoiY2VjM2NkYTEtYzg4My00ODgzLWIzYjItMjUyM2E1YTdjYzcyIiwidCI6IjJhMGIyN2E5LTRiY2EtNGRjYi1iNjZlLWY2NzljZTVjMzY2OCIsImMiOjEwfQ%3D%3D`;
    } else {
      return `https://app.powerbi.com/view?r=eyJrIjoiNzVlNzNiMjQtOWI5MC00YmI4LTkyMTYtOWZmZTBlNWE5Mzg4IiwidCI6IjJhMGIyN2E5LTRiY2EtNGRjYi1iNjZlLWY2NzljZTVjMzY2OCIsImMiOjEwfQ%3D%3D`;
    }
  };

  return (
    <SectionCard title={title} fullHeight={true}>
      {/* Period Toggle */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setPeriodType("Mengikut Tahun")}
          className={`px-4 py-2 rounded ${
            periodType === "Mengikut Tahun"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Mengikut Tahun
        </button>
        <button
          onClick={() => setPeriodType("Mengikut Penggal")}
          className={`px-4 py-2 rounded ${
            periodType === "Mengikut Penggal"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Mengikut Penggal
        </button>
      </div>

      {/* Chart Type Tabs */}
      <div className="flex space-x-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setChartType("Bar Chart")}
          className={`px-4 py-2 border-b-2 ${
            chartType === "Bar Chart"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("Line Chart")}
          className={`px-4 py-2 border-b-2 ${
            chartType === "Line Chart"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Line Chart
        </button>
      </div>

      {/* Power BI Embed */}
      <div className="w-full h-screen">
        <iframe
          title={`${title} - ${chartType} - ${periodType}`}
          width="100%"
          height="100%"
          src={getReportUrl()}
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </SectionCard>
  );
}

export default PowerBIEmbed;
