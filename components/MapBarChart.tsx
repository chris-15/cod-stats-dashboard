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
  fill: string;
};

const CustomTooltip = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#16181c] p-4 rounded-lg  border">
        <p className="">{`${label}`}</p>
        <p className="">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

function MapBarChart({ data, fill }:MapBarChartProps) {


  return (
    
      <ResponsiveContainer minHeight={300} maxHeight={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50}}
        >
          <CartesianGrid strokeDasharray="2" stroke="#D1D5DB" vertical={false} />
          <XAxis dataKey="name" angle={-45} textAnchor="end" stroke="white" />
          <YAxis stroke="white"  />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill={fill}
            activeBar={<Rectangle stroke="black" />}
          />
        </BarChart>
      </ResponsiveContainer>
  );
}

export default MapBarChart;
