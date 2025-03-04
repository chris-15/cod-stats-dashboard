"use client";

import ModeBarChart from "./ModeBarChart";
import MapBarChart from "./MapBarChart";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type chartData = {
  name: string;
  value: number;
};

type chartDataProps = {
  mapChartData: chartData[];
  modeChartData: chartData[];
  game: string;
};

function MatchDistribution({
  mapChartData,
  modeChartData,
  game,
}: chartDataProps) {
  const [chart, setChart] = useState("mode");
  return (
    <div className="border border-[#444444] rounded-lg bg-[hsl(var(--sidebar-background))]">
      <div className="flex items-center justify-between p-8">
        <div>
          <h2 className="text-xl font-bold ">Match Count Distribution</h2>
          {chart === "mode" ? (
            <p className="text-sm text-gray-400">Match count by game mode</p>
          ) : (
            <p className="text-sm text-gray-400">Match count by map</p>
          )}
        </div>

        <Select defaultValue="mode" onValueChange={(value) => setChart(value)}>
          <SelectTrigger className="w-36 h-8 ">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectItem value="mode">Game Mode</SelectItem>
              <SelectItem value="map">Map</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {chart === "mode" ? (
        <ModeBarChart
          data={modeChartData}
          fill={game === "mw3" ? "#b0ff34" : "#ff9900"}
        />
      ) : (
        <MapBarChart
          data={mapChartData}
          fill={game === "mw3" ? "#b0ff34" : "#ff9900"}
        />
      )}
    </div>
  );
}
export default MatchDistribution;

