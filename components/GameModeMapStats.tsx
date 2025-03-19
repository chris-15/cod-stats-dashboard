import { TMatch, TGameMode, TMatchQuery } from "@/types";

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
  calcAvgTeamScore,
  calcAvgHillContribution,
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
    <section className="bg-sidebar border rounded-lg overflow-x-auto">
      <div className="px-4 sm:px-6 py-4 sticky left-0">
        <h2 className="text-xl font-bold">Map Statistics</h2>
        <p className="text-sm text-gray-400">
          Performance across different maps
        </p>
      </div>
      <Table>
        <TableHeader className="">
          <TableRow className=" hover:bg-zinc-800/50 border-zinc-800 ">
            <TableHead className="sticky left-0 bg-sidebar">Map</TableHead>
            <TableHead>WIN %</TableHead>
            <TableHead>K/D RATIO</TableHead>

            {gameMode === "SearchAndDestroy" && (
              <>
                <TableHead>AVG PLANTS</TableHead>
                <TableHead>AVG DEFUSES</TableHead>
              </>
            )}
            <TableHead>AVG KILLS</TableHead>
            {game === "bo6" && (
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>AVG TEAM SCORE</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <p>
                        Average team's match score,{" "}
                        {gameMode === "Hardpoint" ? (
                          <span>in hill time seconds</span>
                        ) : (
                          <span>rounds won</span>
                        )}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            )}
            {gameMode === "Hardpoint" && (
              <>
                <TableHead>AVG TIME</TableHead>
                {game === "bo6" && (
                  <TableHead>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>AVG TIME %</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[250px]">
                          <p>
                            Average % of the team's total hill time contributed
                            by the player.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                )}
              </>
            )}
            <TableHead>KILL RECORD</TableHead>
          </TableRow>
        </TableHeader>

        <MapsTableBody
          gameMapModeMatches={
            game === "bo6" ? bo6MapModeMatches : mw3MapModeMatches
          }
          gameMapSets={game === "bo6" ? bo6MapSets : mw3MapSets}
          gameBestMap={game === "bo6" ? bestBo6Map : bestMap}
          gameWorstMap={game === "bo6" ? worstBo6Map : worstMap}
          gameMode={gameMode}
          game={game}
        />
      </Table>
      {game === "bo6" && (
        <p className="text-sm px-4 py-4 italic font-light">
          Note: Team Score {gameMode === "Hardpoint" ? `and Time % are` : `is`}{" "}
          only available for matches tracked after 03/18/2025
        </p>
      )}
    </section>
  );
}
export default GameModeMapStats;

function MapsTableBody({
  gameMapModeMatches,
  gameMapSets,
  gameBestMap,
  gameWorstMap,
  gameMode,
  game,
}: {
  gameMapModeMatches: TMatchQuery[][];
  gameMapSets: Record<TGameMode, string[]>;
  gameBestMap: string;
  gameWorstMap: string;
  gameMode: TGameMode;
  game: string;
}) {
  return (
    <TableBody>
      {gameMapModeMatches.map((matches, index) => (
        <TableRow key={index}>
          <TableCell className="sticky left-0 bg-sidebar">
            {gameMapSets[gameMode][index] === gameBestMap ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="best">{gameMapSets[gameMode][index]}</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is your best performing map!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : gameMapSets[gameMode][index] === gameWorstMap ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="worst">
                      {gameMapSets[gameMode][index]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is your worst performing map!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>{gameMapSets[gameMode][index]}</>
            )}
          </TableCell>
          <TableCell>{calcWinPercentage(matches)}</TableCell>
          <TableCell>{calcModeKdRatio(matches)}</TableCell>
          {gameMode === "SearchAndDestroy" && (
            <>
              <TableCell>
                {!calcAvgPlants(matches) ? "--" : calcAvgPlants(matches)}
              </TableCell>
              <TableCell>
                {!calcAvgDefuses(matches) ? "--" : calcAvgDefuses(matches)}
              </TableCell>
            </>
          )}
          <TableCell>{calcAvgKills(matches)}</TableCell>
          {game === "bo6" && <TableCell>{calcAvgTeamScore(matches)}</TableCell>}
          {gameMode === "Hardpoint" && (
            <>
              <TableCell>
                {calcAvgTime(matches) === "NaN:NaN"
                  ? "--"
                  : calcAvgTime(matches)}
              </TableCell>

              {game === "bo6" && (
                <TableCell>
                  {calcAvgHillContribution(matches).toFixed(2)}
                </TableCell>
              )}
            </>
          )}
          <TableCell>{calcHighestKill(matches)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
