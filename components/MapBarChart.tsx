'use client'
import { BarChartProps, TMatchQuery } from "@/app/types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//for each match
function calcMapCount(match: TMatchQuery[]) {
  let mapCounts: { [key: string]: number} = {};

  match.forEach((obj) => {
    mapCounts[obj.matchMap]
      ? mapCounts[obj.matchMap]++
      : (mapCounts[obj.matchMap] = 1);
  });

  let sortedMapCounts: { [key: string]: number } = {};
  Object.keys(mapCounts).sort().forEach((key) => {
    sortedMapCounts[key] = mapCounts[key];
  });

  return sortedMapCounts;
}

function MapBarChart({ matches }: BarChartProps) {
  const mapCounts = calcMapCount(matches);
  /*   console.log(Object.keys(mapCounts)) */

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Map Count",
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const labels = Object.keys(mapCounts).sort()
  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: Object.values(mapCounts),
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
  };

  return (
    <div className="w-full overflow-auto">
      <Bar options={options} data={data} />
    </div>
  );
}

export default MapBarChart;
