"use client";
import { TMatch } from "@/app/types";
import { useMatches } from "./matchesContext";
import Link from "next/link";
import { convertTime } from "@/lib/utils";
import MatchDeleteButton from "./MatchDeleteButton";

type GameModeStatsProp = {
  gameMode: string;
};

function GameModeMatchesTable({ gameMode }: GameModeStatsProp) {
  //calling custom useMatch hook to get the matches
  const { matches } = useMatches();
  //console.log(matches);

  const gameModeMatches = matches.filter(
    (match) => match.gameMode === gameMode
  );

  return (
    <section className="w-full max-w-[96rem] mx-auto my-4 bg-[#161B22] border border-[#21262D] text-white shadow-lg rounded-lg  overflow-auto max-h-[60vh]">
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-100">
          All Matches
        </h2>
      </div>
      <table className="">
        <thead className="sticky top-0 z-10 bg-[#161B22]">
          <tr>
            <th>Date</th>
            {/* <th className="text-center">Game Mode</th> */}
            <th>Map</th>
            <th>W/L Result</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Damage</th>
            {gameMode === "Hardpoint" && <th>Time</th>}

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
              {/* <td>
                {match.gameMode === "SearchAndDestroy"
                  ? "Search & Destroy"
                  : match.gameMode}
              </td> */}
              <td>{match.matchMap}</td>
              {match.win === true ? (
                <td className="text-green-500">Win</td>
              ) : (
                <td className="text-red-500">Loss</td>
              )}
              <td>{match.kills}</td>
              <td>{match.deaths}</td>
              <td>{match.damage ? match.damage : "N/A"}</td>
              {match.gameMode === "Hardpoint" && (
                <td>{convertTime(match.time)}</td>
              )}
              <td>{(match.kills / match.deaths).toFixed(2)}</td>
              <td>
                <Link href={`/edit-stats/${match.id}`}>
                  <span className=" text-[#58a6FF] hover:underline">Edit</span>
                </Link>
                <MatchDeleteButton id={match.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default GameModeMatchesTable;
