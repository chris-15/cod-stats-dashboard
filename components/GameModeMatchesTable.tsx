"use client";
import { TMatch } from "@/app/types";
import { useMatches } from "./matchesContext";
import Link from "next/link";
import { convertTime } from "@/lib/utils";

type GameModeMatchesProp = {
  gameMode: string;
};

function GameModeMatchesTable({ gameMode }: GameModeMatchesProp) {
  //calling custom useMatch hook to get the matches
  const { matches } = useMatches();
  //console.log(matches);

  const gameModeMatches = matches.filter(
    (match) => match.gameMode === gameMode
  );

  return (
    <section className="w-full max-w-[96rem] mx-auto my-4 bg-[#1B1B1B] text-white shadow-lg rounded-lg  overflow-auto max-h-[60vh] border border-[#333333]">
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-100">
          All Matches
        </h2>
      </div>
      <table className="min-w-full px-4 sm:px-6 py-4 text-sm ">
        <thead className="sticky top-0 z-10 bg-[#1B1B1B]">
          <tr>
            <th className="text-center"></th>
            <th className="text-center">Date</th>
            {/* <th className="text-center">Game Mode</th> */}
            <th className="text-center">Map</th>
            <th className="text-center">W/L Result</th>
            <th className="text-center">Kills</th>
            <th className="text-center">Deaths</th>
            <th className="text-center">Damage</th>
            {gameMode === "Hardpoint" && <th className="text-center">Time</th>}

            <th className="text-center">K/D Ratio</th>
          </tr>
        </thead>
        <tbody>
          {gameModeMatches.map((match) => (
            <tr className="text-center" key={match.id}>
              <td>
                <Link href={`/edit-stats/${match.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Link>
              </td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default GameModeMatchesTable;
