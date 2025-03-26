"use client";
import { TMatch, TMatchQuery } from "@/types";

import Link from "next/link";
import { convertTime } from "@/lib/stat-utils";
import MatchDeleteButton from "./MatchDeleteButton";
import { useState } from "react";
import ViewMoreBtn from "./ViewMoreBtn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type GameModeStatsProp = {
  gameMode: string;
  matches: TMatchQuery[];
  game: string;
};

function GameModeMatchesTable({ gameMode, matches, game }: GameModeStatsProp) {
  const [visbileMatches, setVisibleMatches] = useState<number>(15);

  //filter matches on gamemode and slice to show 15 matches at a time
  const gameModeMatches = matches
    .filter((match) => match.gameMode === gameMode)
    .slice(0, visbileMatches);

  //hanlder to load 15 more matches
  const handleLoadMoreMatches = () => {
    setVisibleMatches(visbileMatches + 15);
  };

  return (
    <>
      <section className="hidden sm:table bg-sidebar border rounded-lg overflow-x-auto">
        <div className="px-4 sm:px-6 py-4 sticky left-0">
          <h2 className="text-lg sm:text-xl font-bold ">All Matches</h2>
        </div>
        {gameModeMatches.length > 0 ? (
          <div className="">
            <Table>
              <TableHeader className="">
                <TableRow className="hover:bg-zinc-800/50 border-zinc-800 ">
                  <TableHead className="text-zinc-400 font-medium">
                    DATE
                  </TableHead>
                  <TableHead className="text-zinc-400 font-medium">
                    MAP
                  </TableHead>
                  <TableHead className="text-zinc-400 font-medium">
                    W/L RESULT
                  </TableHead>
                  <TableHead className="text-zinc-400 font-medium">
                    K/D RATIO
                  </TableHead>
                  <TableHead className="text-zinc-400 font-medium">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameModeMatches.map((match) => (
                  <TableRow
                    key={match.id}
                    className="hover:bg-zinc-800/50 border-zinc-800"
                  >
                    <TableCell className=" font-medium">
                      {new Date(match.createdAt).toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className=" font-medium">
                      {match.matchMap}
                    </TableCell>
                    {match.win ? (
                      <TableCell
                        className={
                          game === "mw3" ? "text-[#b0ff34]" : "text-green-500"
                        }
                      >
                        Win
                      </TableCell>
                    ) : (
                      <TableCell className="text-[#ff4d4d]">Loss</TableCell>
                    )}
                    <TableCell>
                      {(match.kills / match.deaths).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/${
                          game === "mw3" ? "mw3" : "bo6"
                        }/${gameMode.toLowerCase()}/match/${match.id}`}
                      >
                        <span
                          className={
                            game === "mw3"
                              ? `text-[#b0ff34] hover:underline`
                              : `text-bo6-theme hover:underline`
                          }
                        >
                          More Details
                        </span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {visbileMatches < matches.length && (
              <ViewMoreBtn game={game} onClick={handleLoadMoreMatches} />
            )}
          </div>
        ) : (
          <p className="text-center p-4">No Matches Recorded</p>
        )}
      </section>

      {/* mobile version of table- which are cards not table */}
      <section className="grid grid-cols-1 gap-4 sm:hidden">
        <div className="px-4 sm:px-6 pt-4">
          <h2 className="text-lg sm:text-xl font-bold">Recent Matches</h2>
        </div>

        {gameModeMatches.length > 0 ? (
          <>
            {gameModeMatches.map((match) => (
              <div
                className="bg-sidebar border p-4 rounded-lg sm:hidden gap-4 group transiton-transform transform ease-out duration-300  hover:scale-105"
                key={match.id}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className=" text-gray-300">
                    {new Date(match.createdAt).toLocaleDateString("en-us", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      match.win
                        ? "bg-green-500 text-black"
                        : "bg-[#ff4d4d] text-black"
                    }`}
                  >
                    {match.win ? "WIN" : "LOSS"}
                  </div>
                </div>
                <div className="text-lg font-semibold text-white">
                  {match.gameMode === "SearchAndDestroy"
                    ? "Search & Destroy"
                    : match.gameMode}
                </div>
                <div className=" text-gray-400">{match.matchMap}</div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="">
                    <Link
                      className="group-hover:underline:text-bo5-theme"
                      href={`/dashboard/${
                        game === "mw3" ? "mw3" : "bo6"
                      }/${gameMode.toLowerCase()}/match/${match.id}`}
                    >
                      <span
                        className={
                          game === "mw3"
                            ? `text-[#b0ff34] hover:underline`
                            : `text-bo6-theme hover:underline`
                        }
                      >
                        More Details
                      </span>
                    </Link>
                  </div>
                  <span className="text-white  font-mono">
                    K/D: {(match.kills / match.deaths).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {visbileMatches < matches.length && (
              <ViewMoreBtn game={game} onClick={handleLoadMoreMatches} />
            )}
          </>
        ) : (
          <p className="text-center p-4">No Matches Recorded</p>
        )}
      </section>
    </>
  );
}
export default GameModeMatchesTable;
