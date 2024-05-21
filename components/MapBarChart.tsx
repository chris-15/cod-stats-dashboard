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

function calcMapCount(match: TMatchQuery[]) {
  let mapCounts: { [key: string]: number } = {};

  match.forEach((obj) => {
    mapCounts[obj.matchMap]
      ? mapCounts[obj.matchMap]++
      : (mapCounts[obj.matchMap] = 1);
  });

  let sortedMapCounts = Object.keys(mapCounts)
    .sort()
    .map((key) => ({ name: key, value: mapCounts[key] }));

  return sortedMapCounts;
}

function MapBarChart({ matches }: BarChartProps) {
  console.log(calcMapCount(matches));
  const data = calcMapCount(matches).filter(
    (match) => match.name != "Skidrow" && match.name != "Terminal"
  );

  return (
    <div className="border">
      <h2 className="text-center pt-4">Match Count by Map</h2>
      <ResponsiveContainer minHeight={300} maxHeight={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50}}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MapBarChart;
