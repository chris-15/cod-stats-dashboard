"use client";

import { BarChartProps, TMatchQuery } from "@/app/types";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const data = [
    { mode: "Hardpoint", count: gameModeCount(matches, "Hardpoint") },
    { mode: "Control", count: gameModeCount(matches, "Control") },
    { mode: "S&D", count: gameModeCount(matches, "SearchAndDestroy") },
  ];
  return (
    <div className="border">
       <h2 className="text-center pt-4">Match Count by Game Mode</h2>
      <ResponsiveContainer minHeight={300} maxHeight={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="mode" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ModeBarChart;
