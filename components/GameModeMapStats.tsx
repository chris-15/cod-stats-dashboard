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

const mw3MapSets: Record<TGameMode, string[]> = {
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
  // function to get the map mode matches
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

  const mw3MapModeMatches = getMapModeMatches(
    gameMode,
    mw3MapSets[gameMode],
    matches
  );

  const bo6MapModeMatches = getMapModeMatches(
    gameMode,
    bo6MapSets[gameMode],
    matches
  );

  // calculates the best map based on each gamemode using calcmapscore, takes in mapSets or bo6MapSets
  function calcBestMap(
    mapsMatchesArr: TMatchQuery[][],
    maps: Record<TGameMode, string[]>
  ) {
    let bestMap = mapsMatchesArr[0];
    let bestScore = calcMapScore(bestMap, gameMode);

    for (let i = 0; i < mapsMatchesArr.length; i++) {
      let score = calcMapScore(mapsMatchesArr[i], gameMode);
      if (score > bestScore) {
        bestScore = score;
        bestMap = mapsMatchesArr[i];
      }
    }

    if (maps === mw3MapSets) {
      return mw3MapSets[gameMode][mapsMatchesArr.indexOf(bestMap)];
    } else {
      return bo6MapSets[gameMode][mapsMatchesArr.indexOf(bestMap)];
    }
  }

  function calcWorstMap(
    mapsMatchesArr: TMatchQuery[][],
    maps: Record<TGameMode, string[]>
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

    if (maps === mw3MapSets) {
      return mw3MapSets[gameMode][mapsMatchesArr.indexOf(worstMap)];
    } else {
      return bo6MapSets[gameMode][mapsMatchesArr.indexOf(worstMap)];
    }
  }

  let bestMap = calcBestMap(mw3MapModeMatches, mw3MapSets);
  let bestBo6Map = calcBestMap(bo6MapModeMatches, bo6MapSets);
  let worstMap = calcWorstMap(mw3MapModeMatches, mw3MapSets);
  let worstBo6Map = calcWorstMap(bo6MapModeMatches, bo6MapSets);

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
            : mw3MapModeMatches.map((matches, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-zinc-800/50 border-zinc-800"
                >
                  <TableCell className="sticky left-0 bg-secondary-bg">
                    {mw3MapSets[gameMode][index] === bestMap ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="best">
                              {mw3MapSets[gameMode][index]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your best performing map!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : mw3MapSets[gameMode][index] === worstMap ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="worst">
                              {mw3MapSets[gameMode][index]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your worst performing map!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <>{mw3MapSets[gameMode][index]}</>
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
