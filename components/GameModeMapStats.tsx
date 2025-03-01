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
} from "@/lib/stat-utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
  Hardpoint: ["Hacienda", "Protocol", "RedCard", "Rewind", "Skyline", "Vault"],
  Control: ["Hacienda", "Protocol", "Rewind", "Vault"],
  SearchAndDestroy: [
    "Hacienda",
    "Protocol",
    "RedCard",
    "Rewind",
    "Skyline",
    "Vault",
  ],
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

  function calcBestBo6Map(mapsMatchesArr: TMatchQuery[][]) {
    let bestMap = mapsMatchesArr[0];
    let bestScore = calcMapScore(bestMap, gameMode);

    for (let i = 0; i < mapsMatchesArr.length; i++) {
      let score = calcMapScore(mapsMatchesArr[i], gameMode);
      if (score > bestScore) {
        bestScore = score;
        bestMap = mapsMatchesArr[i];
      }
    }
    return bo6MapSets[gameMode][mapsMatchesArr.indexOf(bestMap)];
  }

  function calcWorstMap(mapsMatchesArr: TMatchQuery[][]) {
    let worstMap = mapsMatchesArr[0];
    let worstScore = calcMapScore(worstMap, gameMode);

    for (let i = 0; i < mapsMatchesArr.length; i++) {
      let score = calcMapScore(mapsMatchesArr[i], gameMode);
      if (score < worstScore) {
        worstScore = score;
        worstMap = mapsMatchesArr[i];
      }
    }
    return mapSets[gameMode][mapsMatchesArr.indexOf(worstMap)];
  }

  function calcWorstBo6Map(mapsMatchesArr: TMatchQuery[][]) {
    let worstMap = mapsMatchesArr[0];
    let worstScore = calcMapScore(worstMap, gameMode);

    for (let i = 0; i < mapsMatchesArr.length; i++) {
      let score = calcMapScore(mapsMatchesArr[i], gameMode);
      if (score < worstScore) {
        worstScore = score;
        worstMap = mapsMatchesArr[i];
      }
    }
    return bo6MapSets[gameMode][mapsMatchesArr.indexOf(worstMap)];
  }
  let bestMap = calcBestMap(mapModeMatches);
  let bestBo6Map = calcBestBo6Map(bo6MapModeMatches);
  let worstMap = calcWorstMap(mapModeMatches);
  let worstBo6Map = calcWorstBo6Map(bo6MapModeMatches);

  return (
    <section className="bg-secondary-bg border border-[#444444] rounded-lg overflow-x-auto">
      <div className="px-4 sm:px-6 py-4 sticky left-0">
        <h2 className="text-xl font-bold">Map Statistics</h2>
        <p className="text-sm text-gray-400">
          Performance across different maps
        </p>
      </div>
      <Table>
        <TableHeader className="">
          <TableRow className=" hover:bg-zinc-800/50 border-zinc-800 ">
            <TableHead className="sticky left-0 bg-secondary-bg">Map</TableHead>
            <TableHead>Win %</TableHead>
            <TableHead>K/D RATIO</TableHead>
            {gameMode === "Hardpoint" && <TableHead>AVG TIME</TableHead>}
            {gameMode === "SearchAndDestroy" && (
              <>
                <TableHead>Avg Plants</TableHead>
                <TableHead>Avg Defuses</TableHead>
              </>
            )}
            <TableHead>AVG KILLS</TableHead>
            <TableHead>KILL RECORD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {game === "bo6"
            ? bo6MapModeMatches.map((matches, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-zinc-800/50 border-zinc-800"
                >
                  <TableCell className="sticky left-0 bg-secondary-bg">
                    {bo6MapSets[gameMode][index] === bestBo6Map ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="best">
                              {bo6MapSets[gameMode][index]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your best performing map!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : bo6MapSets[gameMode][index] === worstBo6Map ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="worst">
                              {bo6MapSets[gameMode][index]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your worst performing map!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <>{bo6MapSets[gameMode][index]}</>
                    )}
                  </TableCell>
                  <TableCell>{calcWinPercentage(matches)}</TableCell>
                  <TableCell>{calcModeKdRatio(matches)}</TableCell>
                  {gameMode === "Hardpoint" && (
                    <TableCell>
                      {calcAvgTime(matches) === "NaN:NaN"
                        ? "--"
                        : calcAvgTime(matches)}
                    </TableCell>
                  )}
                  {gameMode === "SearchAndDestroy" && (
                    <>
                      <TableCell>
                        {!calcAvgPlants(matches)
                          ? "--"
                          : calcAvgPlants(matches)}
                      </TableCell>
                      <TableCell>
                        {!calcAvgDefuses(matches)
                          ? "--"
                          : calcAvgDefuses(matches)}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{calcAvgKills(matches)}</TableCell>
                  <TableCell>{calcHighestKill(matches)}</TableCell>
                </TableRow>
              ))
            : mapModeMatches.map((matches, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-zinc-800/50 border-zinc-800"
                >
                  <TableCell className="sticky left-0 bg-secondary-bg">
                    {mapSets[gameMode][index] === bestMap ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="best">
                              {mapSets[gameMode][index]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your best performing map!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : mapSets[gameMode][index] === worstMap ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="worst">
                              {mapSets[gameMode][index]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your worst performing map!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <>{mapSets[gameMode][index]}</>
                    )}
                  </TableCell>
                  <TableCell>{calcWinPercentage(matches)}</TableCell>
                  <TableCell>{calcModeKdRatio(matches)}</TableCell>
                  {gameMode === "Hardpoint" && (
                    <TableCell>
                      {calcAvgTime(matches) === "NaN:NaN"
                        ? "--"
                        : calcAvgTime(matches)}
                    </TableCell>
                  )}
                  {gameMode === "SearchAndDestroy" && (
                    <>
                      <TableCell>
                        {!calcAvgPlants(matches)
                          ? "--"
                          : calcAvgPlants(matches)}
                      </TableCell>
                      <TableCell>
                        {!calcAvgDefuses(matches)
                          ? "--"
                          : calcAvgDefuses(matches)}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{calcAvgKills(matches)}</TableCell>
                  <TableCell>{calcHighestKill(matches)}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </section>
  );
}
export default GameModeMapStats;
