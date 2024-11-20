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
  game: string;
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

const bo6MapSets: Record<TGameMode, string[]> = {
  Hardpoint: ["Protocol", "RedCard", "Rewind", "Skyline", "Vault"],
  Control: ["Protocol", "Rewind", "Vault"],
  SearchAndDestroy: ["Protocol", "RedCard", "Rewind", "Skyline", "Vault"],
};
function GameModeMapStats({ gameMode, matches, game }: GameModeStatsProp) {
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

  const bo6MapModeMatches = getMapModeMatches(
    gameMode,
    bo6MapSets[gameMode],
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
    <section className="w-full bg-secondary-bg border border-[#444444] rounded-lg overflow-auto">
      <div className=" px-4 sm:px-6 py-4 sticky left-0">
        <h2 className="text-lg sm:text-xl font-bold ">Map Stats</h2>
      </div>
      <div className="">
        <table className="w-full">
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="sticky left-0 bg-secondary-bg">Map</th>

              <th>Win %</th>
              <th>K/D Ratio</th>

              <th className="xs:hidden">K/D in W</th>
              <th className="xs:hidden">K/D in L</th>
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
              <th className="xs:hidden">Map Count</th>
            </tr>
          </thead>
          <tbody>
            {game === "bo6"? 
            bo6MapModeMatches.map((matches, index) => (
              <tr className="text-center" key={index}>
                {/* {mapSets[gameMode][index] === bestMap ? (
              <td
                data-tooltip-id="mapstats-tooltip-id"
                data-tooltip-content="This is your best map for this game mode!"
                className=""
              >
                ⭐️
              </td>
            ) : (
              <td className=""></td>
            )} */}
                <td className="sticky left-0 bg-secondary-bg">
                  {bo6MapSets[gameMode][index]}
                </td>

                <td>{calcWinPercentage(matches)}</td>
                <td>{calcModeKdRatio(matches)}</td>

                <td className="xs:hidden">
                  {calcModeKdRatio(matches, true)}
                </td>
                <td className="xs:hidden">
                  {calcModeKdRatio(matches, false)}
                </td>
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
                      {!calcAvgPlants(matches)
                        ? "--"
                        : calcAvgPlants(matches)}
                    </td>
                    <td>
                      {!calcAvgDefuses(matches)
                        ? "--"
                        : calcAvgDefuses(matches)}
                    </td>
                  </>
                )}
                {gameMode === "Control" && (
                  <td>{calcAvgDamage(matches)}</td>
                )}
                <td>{calcAvgKills(matches)}</td>
                <td>{calcHighestKill(matches)}</td>
                <td className="xs:hidden">{matches.length}</td>
              </tr>
            ))
              : mapModeMatches.map((matches, index) => (
                  <tr className="text-center" key={index}>
                    {/* {mapSets[gameMode][index] === bestMap ? (
                  <td
                    data-tooltip-id="mapstats-tooltip-id"
                    data-tooltip-content="This is your best map for this game mode!"
                    className=""
                  >
                    ⭐️
                  </td>
                ) : (
                  <td className=""></td>
                )} */}
                    <td className="sticky left-0 bg-secondary-bg">
                      {mapSets[gameMode][index]}
                    </td>

                    <td>{calcWinPercentage(matches)}</td>
                    <td>{calcModeKdRatio(matches)}</td>

                    <td className="xs:hidden">
                      {calcModeKdRatio(matches, true)}
                    </td>
                    <td className="xs:hidden">
                      {calcModeKdRatio(matches, false)}
                    </td>
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
                          {!calcAvgPlants(matches)
                            ? "--"
                            : calcAvgPlants(matches)}
                        </td>
                        <td>
                          {!calcAvgDefuses(matches)
                            ? "--"
                            : calcAvgDefuses(matches)}
                        </td>
                      </>
                    )}
                    {gameMode === "Control" && (
                      <td>{calcAvgDamage(matches)}</td>
                    )}
                    <td>{calcAvgKills(matches)}</td>
                    <td>{calcHighestKill(matches)}</td>
                    <td className="xs:hidden">{matches.length}</td>
                  </tr>
                ))
             }
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default GameModeMapStats;
