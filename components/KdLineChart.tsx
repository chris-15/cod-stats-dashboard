"use client";

import { TMatch, TMatchQuery } from "@/app/types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Brush,
} from "recharts";

type KdLineChartProps = {
  matches: TMatchQuery[];
};

function KdLineChart({ matches }: KdLineChartProps) {
  const [activeSeries, setActiveSeries] = useState<string[]>([]);
  const [isEyeOpen, setIsEyeOpen] = useState({ kdRatio: true, winRate: true });

  const handleLegendClick = (dataKey: string) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey));
      setIsEyeOpen({ ...isEyeOpen, [dataKey]: true });
    } else {
      setActiveSeries((prev) => [...prev, dataKey]);
      setIsEyeOpen({ ...isEyeOpen, [dataKey]: false });
    }
  };

  const data = matches
    .map((match) => ({
      date: match.createdAt,
      kills: match.kills,
      deaths: match.deaths,
      totalGames: 1,
      win: +match.win,
    }))
    .reverse();

  function renderLegendText(value: string) {
    const labels: { [key: string]: JSX.Element } = {
      kdRatio: (
        <p className="flex space-x-1 items-center hover:cursor-pointer">
          {isEyeOpen.kdRatio ? <FaEye /> : <FaEyeSlash />}{" "}
          <span>K/D Ratio</span>
        </p>
      ),
      winRate: (
        <p className="flex space-x-1 items-center hover:cursor-pointer">
          {isEyeOpen.winRate ? <FaEye /> : <FaEyeSlash />} <span>Win Rate</span>
        </p>
      ),
    };

    return labels[value] || value;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#16181c] p-2 rounded-lg border">
          <p>{`${label}`}</p>
          <p className=" text-[#ff9900]">{`K/D: ${payload[0].value}`}</p>
          <p className=" text-[#AC4FC6]">{`Win: ${payload[1].value} %`}</p>
        </div>
      );
    }

    return null;
  };

  //object.values returns the values of the object in an array
  const dailyKillsDeaths = Object.values(
    data.reduce(
      (
        acc: Record<
          string,
          {
            date: Date;
            kills: number;
            deaths: number;
            totalGames: number;
            win: number;
          }
        >,
        cur
      ) => {
        const date = new Date(cur.date);
        const key = date.toDateString(); // Use date string as a grouping key

        if (acc[key]) {
          acc[key].kills += cur.kills;
          acc[key].deaths += cur.deaths;
          acc[key].totalGames += cur.totalGames;
          acc[key].win += cur.win;
        } else {
          acc[key] = {
            date: date,
            kills: cur.kills,
            deaths: cur.deaths,
            totalGames: cur.totalGames,
            win: cur.win,
          };
        }
        return acc;
      },
      {}
    )
  );

  const chartData = dailyKillsDeaths.map((obj) => ({
    date: obj.date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    kdRatio: (obj.kills / obj.deaths).toFixed(2),
    winRate: ((obj.win / obj.totalGames) * 100).toFixed(1),
  }));

  console.log(chartData.length - Math.floor(chartData.length/2));

  return (
    <ResponsiveContainer minHeight={300} maxHeight={350}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="date" stroke="white" interval="preserveStartEnd" />
        <YAxis
          stroke="white"
          yAxisId="left"
          padding={{ top: 25 }}
          label={{ value: "K/D Ratio", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          stroke="white"
          yAxisId="right"
          orientation="right"
          interval="preserveStartEnd"
          domain={[0, 100]}
          padding={{ top: 25 }}
          label={{ value: "Win Rate", angle: 90, position: "insideRight" }}
          hide={activeSeries.includes("winRate") === true}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          onClick={(props) => handleLegendClick(String(props.dataKey))}
          verticalAlign="bottom"
          formatter={renderLegendText}
          iconSize={0}
        />
        <Brush dataKey="date" startIndex={chartData.length - Math.floor(chartData.length/2)} height={30} />
        <Line
          type="monotone"
          dataKey="kdRatio"
          yAxisId="left"
          stroke="#ff9900"
          strokeWidth={2}
          hide={activeSeries.includes("kdRatio")}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="winRate"
          stroke="#AC4FC6"
          strokeWidth={2}
          yAxisId="right"
          hide={activeSeries.includes("winRate")}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default KdLineChart;
