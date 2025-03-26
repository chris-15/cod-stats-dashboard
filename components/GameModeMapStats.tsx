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
import useMapStats from "@/hooks/useMapStats";
import { bo6MapSets, mw3MapSets } from "@/lib/mapSets";

type GameModeStatsProp = {
  gameMode: TGameMode;
  matches: TMatchQuery[];
  game: string;
};

function GameModeMapStats({ gameMode, matches, game }: GameModeStatsProp) {
  const {
    mw3MapModeMatches,
    bo6MapModeMatches,
    bestMw3Map,
    worstMw3Map,
    bestBo6Map,
    worstBo6Map,
  } = useMapStats(gameMode, matches, game);

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
                        Average team&apos;s match score,{" "}
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
                            Average % of the team&apos;s total hill time contributed
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
          gameBestMap={game === "bo6" ? bestBo6Map : bestMw3Map}
          gameWorstMap={game === "bo6" ? worstBo6Map : worstMw3Map}
          gameMode={gameMode}
          game={game}
        />
      </Table>
      {game === "bo6" && (
        <p className="text-sm px-4 py-4 italic font-light">
          Note: Team Score {gameMode === "Hardpoint" ? `and Time % are` : `is`}{" "}
          only available for matches tracked after 03/24/2025
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
                  {calcAvgHillContribution(matches) !== 0 ?calcAvgHillContribution(matches).toFixed(2) : "--"}
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
