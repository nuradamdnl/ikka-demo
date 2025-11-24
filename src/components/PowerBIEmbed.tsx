import { useState } from "react";
import { useLocation } from "react-router-dom";
import SectionCard from "./SectionCard";

type PowerBIEmbedProps = {
  title: string;
  reportId?: string;
  customReportIds?: {
    barTahun?: string;
    lineTahun?: string;
    barPenggal?: string;
    linePenggal?: string;
  };
};

function PowerBIEmbed({ title, reportId, customReportIds }: PowerBIEmbedProps) {
  const [chartType, setChartType] = useState<"Bar Chart" | "Line Chart">("Bar Chart");
  const [periodType, setPeriodType] = useState<"Mengikut Tahun" | "Mengikut Penggal">("Mengikut Tahun");
  const location = useLocation();

  const getReportUrl = () => {
    // If a single reportId is provided, use it for all combinations
    if (reportId) {
      return `https://app.powerbi.com/reportEmbed?reportId=${reportId}&autoAuth=true&ctid=cdcbb0e2-9fea-4f54-8670-672707797ada`;
    }

    // If custom report IDs are provided, use them
    if (customReportIds) {
      if (periodType === "Mengikut Tahun") {
        const id = chartType === "Bar Chart" ? customReportIds.barTahun : customReportIds.lineTahun;
        if (id) {
          return `https://app.powerbi.com/reportEmbed?reportId=${id}&autoAuth=true&ctid=cdcbb0e2-9fea-4f54-8670-672707797ada`;
        }
      } else {
        const id = chartType === "Bar Chart" ? customReportIds.barPenggal : customReportIds.linePenggal;
        if (id) {
          return `https://app.powerbi.com/reportEmbed?reportId=${id}&autoAuth=true&ctid=cdcbb0e2-9fea-4f54-8670-672707797ada`;
        }
      }
    }

    // Default fallback report IDs
    if (periodType === "Mengikut Tahun") {
      return chartType === "Bar Chart"
        ? `https://app.powerbi.com/reportEmbed?reportId=60084b0b-47fe-49e2-b197-0ac16de219a3&autoAuth=true&ctid=cdcbb0e2-9fea-4f54-8670-672707797ada`
        : `https://app.powerbi.com/reportEmbed?reportId=cec3cda1-c883-4883-b3b2-2523a5a7cc72&autoAuth=true&ctid=cdcbb0e2-9fea-4f54-8670-672707797ada`;
    } else {
      return `https://app.powerbi.com/reportEmbed?reportId=75e73b24-9b90-4bb8-9216-9ffe0e5a9388&autoAuth=true&ctid=cdcbb0e2-9fea-4f54-8670-672707797ada`;
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
