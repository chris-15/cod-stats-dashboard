"use client";

import ModeBarChart from "./ModeBarChart";
import MapBarChart from "./MapBarChart";
import { useState } from "react";

function MatchDistribution({ mapChartData, modeChartData }: any) {
  const [chart, setChart] = useState("mode");
  return (
    <div className="border border-[#444444] rounded-lg  bg-secondary-bg">
      <div className="flex items-center justify-between px-8">
        <div>
          <h2 className="text-lg font-bold ">Match Count Distribution</h2>
          {chart === "mode" ? (
            <p>Match count by game mode</p>
          ) : (
            <p>Match count by map</p>
          )}
        </div>

        <select
          name="chart-select"
          id="chart-select"
          onChange={(e) => setChart(e.target.value)}
        >
          <option value="mode">Game Mode</option>
          <option value="map">Map</option>
        </select>
      </div>

      {chart === "mode" ? (
        <ModeBarChart data={modeChartData} fill="#ff9900" />
      ) : (
        <MapBarChart data={mapChartData} fill="#ff9900" />
      )}
    </div>
  );
}
export default MatchDistribution;
