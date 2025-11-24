import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type DataMeterChartProps = {
  data?: Array<{ kodJabatan: string; percentage: number }>;
};

function DataMeterChart({ data }: DataMeterChartProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  // Sample data if none provided
  const defaultData = [
    { kodJabatan: "JSPT", percentage: 30 },
    { kodJabatan: "JSJN", percentage: 75 },
    { kodJabatan: "PJSJ", percentage: 100 },
    { kodJabatan: "JPJK", percentage: 50 },
    { kodJabatan: "JIPS", percentage: 15 },
    { kodJabatan: "CWKH", percentage: 90 },
    { kodJabatan: "AMLA", percentage: 60 },
    { kodJabatan: "FRUM", percentage: 45 },
  ];

  const chartData = data || defaultData;

  // Prepare data for stacked bar chart
  const completedData = chartData.map((item) => item.percentage);
  const incompleteData = chartData.map((item) => 100 - item.percentage);
  const categories = chartData.map((item) => item.kodJabatan);

  const options: Highcharts.Options = {
    chart: {
      type: "bar",
      height: Math.max(400, categories.length * 50),
    },
    title: {
      text: "Status Kemasukan Data Mengikut Jabatan",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "Peratusan Penyempurnaan Data",
    },
    xAxis: {
      categories: categories,
      title: {
        text: "Kod Jabatan",
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "Peratusan (%)",
      },
      labels: {
        format: "{value}%",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{point.y:.0f}%",
          style: {
            fontWeight: "bold",
            color: "white",
            textOutline: "0px contrast",
          },
        },
      },
    },
    series: [
      {
        name: "Belum Lengkap",
        type: "bar",
        data: incompleteData,
        color: "#dc2626", // Red
      },
      {
        name: "Lengkap",
        type: "bar",
        data: completedData,
        color: "#16a34a", // Green
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      formatter: function () {
        const completed = this.points?.find((p) => p.series.name === "Lengkap")?.y || 0;
        const incomplete = this.points?.find((p) => p.series.name === "Belum Lengkap")?.y || 0;
        return `<b>${this.x}</b><br/>` +
               `Lengkap: <b>${completed.toFixed(0)}%</b><br/>` +
               `Belum Lengkap: <b>${incomplete.toFixed(0)}%</b>`;
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
}

export default DataMeterChart;
