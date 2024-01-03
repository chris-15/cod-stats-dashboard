"use client";

import { useMatches } from "./matchesContext";
import { TMatch, TGameMode } from "@/app/types";
import {
  calcModeKdRatio,
  calcModeKdByResult,
  calcAvgKills,
  calcWinPercentage,
  calcHighestKill,
  calcAvgTime,
} from "@/lib/utils";




type GameModeStatsProp = {
  gameMode: TGameMode;
};



const mapSets: Record<TGameMode, string[]> = {
  "Hardpoint": ["Invasion", "Karachi", "Skidrow", "SubBase", "Terminal"],
  "Control": ["Highrise", "Invasion", "Karachi"],
  "SearchAndDestroy": ["Highrise", "Invasion", "Karachi", "Skidrow", "Terminal"],
};

function GameModeMapStats({ gameMode }: GameModeStatsProp) {
  const { matches } = useMatches();


  const getMapModeMatches = (
    gameMode: string,
    mapSet: string[],
    matches: TMatch[]
  ) => {
    const gameModeMatches = matches.filter(
      (match) => match.gameMode === gameMode
    );

    return mapSet.map((map) => {
      return gameModeMatches.filter((match) => match.matchMap === map);
    });
  };

 const mapModeMatches = getMapModeMatches(gameMode, mapSets[gameMode], matches);

  return (
    <section className="w-full max-w-[96rem] mx-auto my-4 bg-[#1B1B1B] text-white shadow-lg rounded-lg  overflow-auto max-h-[60vh] border border-[#333333]">
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-100">
          Map Stats
        </h2>
      </div>
      <table className="">
        <thead>
          <tr>
            <th>Map</th>
            {gameMode === "Hardpoint" && <th>Avg Time</th>}
            <th>K/D</th>
            <th>Win %</th>
            <th>K/D in W</th>
            <th>K/D in L</th>
            <th>Avg Kills</th>
            <th>Kill Record</th>
            <th>Map Count</th>
          </tr>
        </thead>
        <tbody>
          { mapModeMatches.map( (matches, index) =>(
            <tr className="text-center" key={index}>
              <td>{mapSets[gameMode][index]}</td>
              {gameMode === "Hardpoint" && <td>{calcAvgTime(matches, gameMode)}</td>}
              <td>{calcModeKdRatio(matches, gameMode)}</td>
              <td>{calcWinPercentage(matches, gameMode)}</td>
              <td>{calcModeKdByResult(matches,gameMode, true)}</td>
              <td>{calcModeKdByResult(matches,gameMode, false)}</td>
              <td>{calcAvgKills(matches, gameMode)}</td>
              <td>{calcHighestKill(matches, gameMode)}</td>
              <td>{matches.length}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </section>
  );
}
export default GameModeMapStats;