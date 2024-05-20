"use client";

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

function gameModeCount(match: TMatchQuery[], gameMode: string) {
  let modeCount = 0;

  match.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      modeCount++;
    }
  });

  return modeCount;
}

function ModeBarChart({ matches }: BarChartProps) {
  const hardpointCount = gameModeCount(matches, "Hardpoint");
  const controlCount = gameModeCount(matches, "Control");
  const searchCount = gameModeCount(matches, "SearchAndDestroy");

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
          color: '#333',
        },
      },
      title: {
        display: true,
        text: "Game Mode Count",
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
    }, 
    
  };

  const labels = ["Hardpoint", "Control", "Search and Destroy"];
  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: [hardpointCount, controlCount, searchCount],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(255, 206, 86, 0.5)"],
      },
    ],
  };

  return (
    <div className="w-full overflow-auto">
      <Bar options={options} data={data} />
    </div>
  );
}
export default ModeBarChart;
