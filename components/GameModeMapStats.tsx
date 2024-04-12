"use client";

import { useMatches } from "./matchesContext";
import { TMatch, TGameMode } from "@/app/types";
import { Tooltip } from "react-tooltip";
import {
  calcModeKdRatio,
  calcAvgKills,
  calcWinPercentage,
  calcHighestKill,
  calcAvgTime,
  calcAvgPlants,
  calcAvgDefuses,
  calcAvgDamage,
  calcMapScore,
} from "@/lib/utils";

type GameModeStatsProp = {
  gameMode: TGameMode;
};

const mapSets: Record<TGameMode, string[]> = {
  Hardpoint: [
    "Invasion",
    "Karachi",
    "Rio",
    "Skidrow",
    "SixStar",
    "SubBase",
    "Terminal",
    "Vista",
  ],
  Control: ["Highrise", "Invasion", "Karachi"],
  SearchAndDestroy: [
    "Highrise",
    "Invasion",
    "Karachi",
    "Rio",
    "SixStar",
    "Skidrow",
    "Terminal",
  ],
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

  const mapModeMatches = getMapModeMatches(
    gameMode,
    mapSets[gameMode],
    matches
  );

  // calculates the best map based on each gamemode using calcmapscore
  function calcBestMap(mapsMatchesArr: TMatch[][]) {
    let bestMap = mapsMatchesArr[0];
    let bestScore = calcMapScore(bestMap, gameMode);

    for (let i = 0; i < mapsMatchesArr.length; i++) {
      let score = calcMapScore(mapsMatchesArr[i], gameMode);
      if (score > bestScore) {
        bestScore = score;
        bestMap = mapsMatchesArr[i];
      }
    }
    return mapSets[gameMode][mapsMatchesArr.indexOf(bestMap)];
  }

  let bestMap = calcBestMap(mapModeMatches);

  return (
    <section className="w-full max-w-[96rem] mx-auto my-4 bg-[#161B22] border border-[#21262D] text-white shadow-lg rounded-lg">
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-100">
          Map Stats
        </h2>
      </div>
      <div className="overflow-auto ">
        <table className="">
          <thead>
            <tr>
              <th></th>
              <th className="sticky left-0 z-10 bg-[#161B22]">Map</th>

              <th>Win %</th>
              <th>K/D Ratio</th>
              <th>K/D in W</th>
              <th>K/D in L</th>
              {gameMode === "Hardpoint" && <th>Avg Time</th>}
              {gameMode === "SearchAndDestroy" && (
                <>
                  <th>Avg Plants</th>
                  <th>Avg Defuses</th>
                </>
              )}
              {gameMode === "Control" && <th>Avg Damage</th>}

              <th>Avg Kills</th>
              <th>Kill Record</th>
              <th>Map Count</th>
            </tr>
          </thead>
          <tbody>
            {mapModeMatches.map((matches, index) => (
              <tr className="text-center" key={index}>
                {mapSets[gameMode][index] === bestMap ? (
                  <td
                    data-tooltip-id="mapstats-tooltip-id"
                    data-tooltip-content="This is your best map for this game mode!"
                    className="pl-1.5 sm:p-0 text-end"
                  >
                    ⭐️
                  </td>
                ) : (
                  <td className=" p-0 text-end "></td>
                )}
                <td className="sticky left-0 z-50 bg-[#161B22]">
                  {mapSets[gameMode][index]}
                </td>

                <td>{calcWinPercentage(matches, gameMode)}</td>
                <td>{calcModeKdRatio(matches, gameMode)}</td>
                <td>{calcModeKdRatio(matches, gameMode, true)}</td>
                <td>{calcModeKdRatio(matches, gameMode, false)}</td>
                {gameMode === "Hardpoint" && (
                  <td>
                    {calcAvgTime(matches, gameMode) === "NaN:NaN"
                      ? "--"
                      : calcAvgTime(matches, gameMode)}
                  </td>
                )}
                {gameMode === "SearchAndDestroy" && (
                  <>
                    <td>
                      {!calcAvgPlants(matches, gameMode)
                        ? "--"
                        : calcAvgPlants(matches, gameMode)}
                    </td>
                    <td>
                      {!calcAvgDefuses(matches, gameMode)
                        ? "--"
                        : calcAvgDefuses(matches, gameMode)}
                    </td>
                  </>
                )}
                {gameMode === "Control" && (
                  <td>{calcAvgDamage(matches, gameMode)}</td>
                )}
                <td>{calcAvgKills(matches, gameMode)}</td>
                <td>{calcHighestKill(matches, gameMode)}</td>
                <td>{matches.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Tooltip
        id="mapstats-tooltip-id"
        place="top-start"
        style={{ zIndex: 100 }}
      />
    </section>
  );
}
export default GameModeMapStats;
