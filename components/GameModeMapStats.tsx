import { useMatches } from "./matchesContext";
import { TMatch, TGameMode, TMatchQuery } from "@/app/types";

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
  matches: TMatchQuery[];
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

function GameModeMapStats({ gameMode, matches }: GameModeStatsProp) {
  const getMapModeMatches = (
    gameMode: string,
    mapSet: string[],
    matches: TMatchQuery[]
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
  function calcBestMap(mapsMatchesArr: TMatchQuery[][]) {
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
    <section className="">
      <div className="">
        <h2 className="">Map Stats</h2>
      </div>
      <div className="">
        <table className="">
          <thead>
            <tr>
              <th></th>
              <th className="">Map</th>

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
                    className=""
                  >
                    ⭐️
                  </td>
                ) : (
                  <td className=""></td>
                )}
                <td className="">{mapSets[gameMode][index]}</td>

                <td>{calcWinPercentage(matches)}</td>
                <td>{calcModeKdRatio(matches)}</td>
                <td>{calcModeKdRatio(matches, true)}</td>
                <td>{calcModeKdRatio(matches, false)}</td>
                {gameMode === "Hardpoint" && (
                  <td>
                    {calcAvgTime(matches) === "NaN:NaN"
                      ? "--"
                      : calcAvgTime(matches)}
                  </td>
                )}
                {gameMode === "SearchAndDestroy" && (
                  <>
                    <td>
                      {!calcAvgPlants(matches) ? "--" : calcAvgPlants(matches)}
                    </td>
                    <td>
                      {!calcAvgDefuses(matches)
                        ? "--"
                        : calcAvgDefuses(matches)}
                    </td>
                  </>
                )}
                {gameMode === "Control" && <td>{calcAvgDamage(matches)}</td>}
                <td>{calcAvgKills(matches)}</td>
                <td>{calcHighestKill(matches)}</td>
                <td>{matches.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default GameModeMapStats;
