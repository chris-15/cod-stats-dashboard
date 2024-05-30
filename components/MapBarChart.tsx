"use client";

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

type TData = {
  name: string;
  value: number;
};

type MapBarChartProps = {
  data: TData[];
};


function MapBarChart({ data }:MapBarChartProps) {


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
