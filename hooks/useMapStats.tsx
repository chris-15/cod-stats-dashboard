import { bo6MapSets, mw3MapSets } from "@/lib/mapSets";
import { calcMapScore } from "@/lib/stat-utils";
import { TGameMode, TMatchQuery } from "@/types";
import { useMemo } from "react";



//Filters matches by game mode and organizes them by map
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

// calculates the best map based on each gamemode using calcmapscore, takes in mapSets or bo6MapSets
function calcBestMap(
  mapsMatchesArr: TMatchQuery[][],
  maps: Record<TGameMode, string[]>,
  gameMode: TGameMode
): string {
  let bestMap = mapsMatchesArr[0];
  let bestScore = calcMapScore(bestMap, gameMode);

  for (let i = 0; i < mapsMatchesArr.length; i++) {
    let score = calcMapScore(mapsMatchesArr[i], gameMode);
    if (score > bestScore) {
      bestScore = score;
      bestMap = mapsMatchesArr[i];
    }
  }

  return maps[gameMode][mapsMatchesArr.indexOf(bestMap)];
}

function calcWorstMap(
  mapsMatchesArr: TMatchQuery[][],
  maps: Record<TGameMode, string[]>,
  gameMode: TGameMode
) {
  let worstMap = mapsMatchesArr[0];
  let worstScore = calcMapScore(worstMap, gameMode);

  for (let i = 0; i < mapsMatchesArr.length; i++) {
    let score = calcMapScore(mapsMatchesArr[i], gameMode);
    if (score < worstScore) {
      worstScore = score;
      worstMap = mapsMatchesArr[i];
    }
  }

  return maps[gameMode][mapsMatchesArr.indexOf(worstMap)];
}


// returns map stats for each game mode
function useMapStats(
  gameMode: TGameMode,
  matches: TMatchQuery[],
  game: string
) {
  const mw3MapModeMatches = useMemo(
    () => getMapModeMatches(gameMode, mw3MapSets[gameMode], matches),
    [gameMode, matches]
  );

  const bo6MapModeMatches = useMemo(
    () => getMapModeMatches(gameMode, bo6MapSets[gameMode], matches),
    [gameMode, matches]
  );

  const bestMw3Map = useMemo(
    () => calcBestMap(mw3MapModeMatches, mw3MapSets, gameMode),
    [mw3MapModeMatches, gameMode]
  );

  const worstMw3Map = useMemo(
    () => calcWorstMap(mw3MapModeMatches, mw3MapSets, gameMode),
    [mw3MapModeMatches, gameMode]
  );

  const bestBo6Map = useMemo(
    () => calcBestMap(bo6MapModeMatches, bo6MapSets, gameMode),
    [bo6MapSets, gameMode]
  );

  const worstBo6Map = useMemo(
    () => calcWorstMap(bo6MapModeMatches, bo6MapSets, gameMode),
    [bo6MapSets, gameMode]
  );

  return {
    mw3MapModeMatches,
    bo6MapModeMatches,
    bestMw3Map,
    worstMw3Map,
    bestBo6Map,
    worstBo6Map,
  };
}

export default useMapStats;
