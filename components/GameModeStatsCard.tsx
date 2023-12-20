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
  calcModeRecentKdRatio
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
  const timeByWin = calcAvgTimeByResult(matches, gameMode, true);
  const timeByLoss =  calcAvgTimeByResult(matches, gameMode, false);
  const killRecord = calcHighestKill(matches, gameMode);
  const slayingEfficiency = calcSlayingEfficiency(matches, gameMode);

  return (
    <section>
      <div className="flex space-x-6 flex-wrap px-2">
        <p>
          {gameMode === "SearchAndDestroy" ? "S&D" : gameMode} KD:{" "}
          <span>{totalKdRatio}</span>
        </p>
        <p>Last 10 K/D: <span className={recentKdRatio >= totalKdRatio ? "text-green-500": "text-red-500"}>{recentKdRatio}</span></p>
        <p>
          KD in Wins: <span> {kdByWin}</span>
        </p>
        <p>
          KD in Losses: <span>{kdByLoss}</span>
        </p>
        <p>
          {" "}
          Total Kills: <span>{totalKills}</span>
        </p>
        <p>
          {" "}
          Total Deaths: <span>{totalDeaths}</span>
        </p>
        { gameMode === "Hardpoint" &&
        <>
        <p>Avg Time in Wins: <span>{timeByWin}</span></p>
        <p> Avg Time in Losses: <span>{timeByLoss}</span></p>
        </>
        }
        
        <p>Highest Kills: {killRecord}</p>
        <p>Slaying Efficiency: <span>{slayingEfficiency} %</span></p>
      </div>

      <div></div>
    </section>
  );
}
export default GameModeStatsCard;
