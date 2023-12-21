"use client";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcModeKdByResult,
  calcKdByMap,
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

  const totalKdRatio = calcModeKdRatio(matches, gameMode);
  const recentKdRatio = calcModeRecentKdRatio(matches, gameMode);
  const kdByWin = calcModeKdByResult(matches, gameMode, true);
  const kdByLoss = calcModeKdByResult(matches, gameMode, false);
  //const karachiKD = calcKdByMap(matches, gameMode, 'Karachi');
  //console.log(karachiKD)

  const totalKills = calcModeTotalKills(matches, gameMode);
  const totalDeaths = calcModeTotalDeaths(matches, gameMode);
  const avgTime = calcAvgTime(matches, gameMode);
  const timeByWin = calcAvgTimeByResult(matches, gameMode, true);
  const timeByLoss = calcAvgTimeByResult(matches, gameMode, false);
  const killRecord = calcHighestKill(matches, gameMode);
  const slayingEfficiency = calcSlayingEfficiency(matches, gameMode);
  const mapCount = calcModeMapCount(matches, gameMode);

  return (
    <section className="gamemode-stats-card bg-[#1B1B1B] border border-[#333333] rounded-lg p-4">
      <div className=" text-center grid grid-cols-2 md:grid-cols-3 gap-4 lg:flex lg:justify-evenly lg:flex-wrap">
        <div className="">
          <p className="">Total K/D</p>
          <p className="">{totalKdRatio}</p>
        </div>

        <div>
          <p>Last 10 K/D</p>
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
        <div>
          <p>Map Count</p>
          <p className="">{mapCount}</p>
        </div>
      </div>
    </section>
  );
}
export default GameModeStatsCard;
