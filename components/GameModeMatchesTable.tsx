"use client";
import { TMatch, TMatchQuery } from "@/app/types";

import Link from "next/link";
import { convertTime } from "@/lib/utils";
import MatchDeleteButton from "./MatchDeleteButton";
import { useState } from "react";

type GameModeStatsProp = {
  gameMode: string;
  matches: TMatchQuery[];
};

function GameModeMatchesTable({ gameMode, matches }: GameModeStatsProp) {
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
    <section className="bg-secondary-bg border border-[#444444] rounded-lg overflow-x-auto">
      <div className="px-4 sm:px-6 py-4 sticky left-0">
        <h2 className="text-lg sm:text-xl font-bold ">All Matches</h2>
      </div>
      {gameModeMatches.length > 0 ? (
        <div>
          <table className="w-full">
            <thead className="">
              <tr>
                <th>Date</th>
                {/* <th className="text-center">Game Mode</th> */}
                <th>Map</th>
                <th>W/L Result</th>
                {/*  <th>Kills</th>
                <th>Deaths</th>
                <th>Damage</th> */}
                {/* {gameMode === "Hardpoint" && <th>Time</th>} */}
                {/* {gameMode === "SearchAndDestroy" && (
                  <>
                    <th>Plants</th>
                    <th>Defuses</th>
                  </>
                )} */}

                <th className="text-center">K/D Ratio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gameModeMatches.map((match) => (
                <tr className="text-center" key={match.id}>
                  <td>
                    {new Date(match.createdAt).toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>{match.matchMap}</td>
                  {match.win ? (
                    <td className="text-[#b0ff34]">Win</td>
                  ) : (
                    <td className="text-[#ff4d4d]">Loss</td>
                  )}
                  {/* <td>{match.kills}</td>
                  <td>{match.deaths}</td>
                  <td>{match.damage ? match.damage : "N/A"}</td>
                  {match.gameMode === "Hardpoint" && (
                    <td>{convertTime(match.time)}</td>
                  )}
                  {match.gameMode === "SearchAndDestroy" && (
                    <>
                      <td>{match.plants}</td>
                      <td>{match.defuses}</td>
                    </>
                  )} */}
                  <td>{(match.kills / match.deaths).toFixed(2)}</td>
                  <td className="">
                    <Link
                      href={`/dashboard/${gameMode.toLowerCase()}/match/${
                        match.id
                      }`}
                    >
                      <span className=" text-[#b0ff34] hover:underline">
                        More Details
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
          <div className="text-center py-4">
            <button className="bg-[#b0ff34] hover:bg-[#8ccc26] text-[#333333] font-medium py-2 px-4 rounded-md hover:underline hover:underline-offset-2" onClick={handleLoadMoreMatches}>
              View More!
            </button>
          </div>

          
        </div>
      ) : (
        <p className="text-center p-4">No Matches Recorded</p>
      )}
    </section>
  );
}
export default GameModeMatchesTable;
