"use client";
import { useState } from "react";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcModeKdByResult,
  calcWinPercentage,
  calcModeTotalKills,
  calcModeTotalDeaths,
  calcAvgTimeByResult,
  calcHighestKill,
  calcSlayingEfficiency,
  calcModeRecentKdRatio,
  calcAvgTime,
  calcModeMapCount,
} from "@/lib/utils";

type GameModeStatsProp = {
  gameMode: string;
};

function GameModeStatsCard({ gameMode }: GameModeStatsProp) {
  const { matches } = useMatches();
  //console.log(matches)
  //filter to get the gamemodes matches
  const filteredMatches = matches.filter(
    (match) => match.gameMode === gameMode
  );
  //if user doesnt have 10 matches then just use matches data
  const numMatches = filteredMatches.length < 10 ? filteredMatches.length : 10;
  // get last 10 recent matches
  const recentMatches = filteredMatches.slice(0, numMatches);

  const [tab, setTab] = useState("tab1");

  const totalKdRatio = calcModeKdRatio(matches, gameMode);
  const recentKdRatio = calcModeRecentKdRatio(matches, gameMode);
  const winPercentage = calcWinPercentage( tab === "tab1" ? matches : recentMatches,
  gameMode,)
  const kdByWin = calcModeKdByResult(
    tab === "tab1" ? matches : recentMatches,
    gameMode,
    true
  );

  const kdByLoss = calcModeKdByResult(
    tab === "tab1" ? matches : recentMatches,
    gameMode,
    false
  );

  const totalKills = calcModeTotalKills(
    tab === "tab1" ? matches : recentMatches,
    gameMode
  );
  const totalDeaths = calcModeTotalDeaths(
    tab === "tab1" ? matches : recentMatches,
    gameMode
  );
  const avgTime = calcAvgTime(
    tab === "tab1" ? matches : recentMatches,
    gameMode
  );
  const timeByWin = calcAvgTimeByResult(
    tab === "tab1" ? matches : recentMatches,
    gameMode,
    true
  );
  const timeByLoss = calcAvgTimeByResult(
    tab === "tab1" ? matches : recentMatches,
    gameMode,
    false
  );
  const killRecord = calcHighestKill(
    tab === "tab1" ? matches : recentMatches,
    gameMode
  );
  const slayingEfficiency = calcSlayingEfficiency(
    tab === "tab1" ? matches : recentMatches,
    gameMode
  );
  const mapCount = calcModeMapCount(matches, gameMode);

  return (
    <section className="gamemode-stats-card bg-[#1B1B1B] border border-[#333333] rounded-lg p-4 relative">
      <div className="absolute top-0 left-0 flex space-x-2">
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab1" ? "text-white border-b-2 border-white" : "text-gray-300"
          }`}
          onClick={() => setTab("tab1")}
        >
          Total
        </button>
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab2" ? "text-white border-b-2 border-white" : "text-gray-300"
          }`}
          onClick={() => setTab("tab2")}
        >
          Last 10 Matches
        </button>
      </div>

      <div className=" text-center grid grid-cols-2 md:grid-cols-3 gap-4 lg:flex lg:justify-evenly lg:flex-wrap mt-12">
        <div className="">
          <p className="">K/D</p>
          {tab === "tab1" ? (
            <p className="">{totalKdRatio}</p>
          ) : (
            <p>
              {recentKdRatio}
              <span className="">
                {recentKdRatio > totalKdRatio ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-1 mb-2 inline-block text-green-500 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : recentKdRatio < totalKdRatio ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 inline-block text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </span>
            </p>
          )}
        </div>

        <div>
          <p>Win %</p>
          <p className=""> {winPercentage}</p>
        </div>

        <div>
          <p>K/D in W</p>
          <p className=""> {kdByWin}</p>
        </div>

        <div>
          <p>K/D in L</p>
          <p className="">{kdByLoss}</p>
        </div>

        <div>
          <p>Total Kills</p>
          <p className="">{totalKills}</p>
        </div>

        <div>
          <p>Total Deaths</p>
          <p className="">{totalDeaths}</p>
        </div>

        {gameMode === "Hardpoint" && (
          <>
            <div>
              <p>Avg Time</p>
              <p>{avgTime}</p>
            </div>
            <div>
              <p>Avg Time in W</p>
              <p className="">{timeByWin}</p>
            </div>

            <div>
              <p>Avg Time in L</p>
              <p className="">{timeByLoss}</p>
            </div>
          </>
        )}

        <div>
          <p>Highest Kills</p>
          <p className="">{killRecord} </p>
        </div>
        <div>
          <p>Slaying Efficiency</p>
          <p className="">{slayingEfficiency} %</p>
        </div>
        {tab === "tab1" ? (
          <div>
            <p>Map Count</p>
            <p className="">{mapCount}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
export default GameModeStatsCard;
