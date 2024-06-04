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

type TData = {
  name: string;
  value: number;
};

type MapBarChartProps = {
  data: TData[];
};


const CustomTooltip = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#16181c] p-4 rounded-lg text-[#b0ff34] border">
        <p className="">{`${label}`}</p>
        <p className="">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


function ModeBarChart({ data }:MapBarChartProps) {
 
  return (
    <div className="border border-[#444444] rounded-lg  bg-secondary-bg">
       <h2 className="text-center pt-4">Match Count by Game Mode</h2>
      <ResponsiveContainer minHeight={300} maxHeight={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="#b0ff34"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ModeBarChart;
