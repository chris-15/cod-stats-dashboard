"use client";
import { TMatch } from "@/app/types";
import { useMatches } from "./matchesContext";
import { convertTime } from "../lib/utils";

function RecentMatchesTable() {
  //calling custom useMatch hook to get the matches
  const { matches } = useMatches();
  //console.log(matches)

  //new array that hold last 15 matches
  const lastFifteenMatches = matches ? matches.slice(0, 15) : [];

  return (
    <section className="">
      <div className="">
        <h2 className="">
          Recent Matches - Quick Stats
        </h2>
      </div>
      {matches.length > 0 ? (
        <table className="">
          <thead>
            <tr>
              <th>Date</th>
              <th>Game Mode</th>
              <th>Map</th>
              <th>W/L Result</th>
              <th>Kills</th>
              <th>Deaths</th>
              {/* <th>Damage</th> */}
              {/*  <th>Time</th> */}
              <th>K/D Ratio</th>
            </tr>
          </thead>
          <tbody>
            {lastFifteenMatches.map((match) => (
              <tr className="text-center" key={match.id}>
                <td>
                  {new Date(match.createdAt).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>
                  {match.gameMode === "SearchAndDestroy"
                    ? "Search & Destroy"
                    : match.gameMode}
                </td>
                <td>{match.matchMap}</td>
                {match.win ? (
                  <td className="text-green-500 ">Win</td>
                ) : (
                  <td className="text-red-500 ">Loss</td>
                )}
                <td>{match.kills}</td>
                <td>{match.deaths}</td>
                <td>{(match.kills / match.deaths).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center p-4">No Matches Recorded</p>
      )}
    </section>
  );
}
export default RecentMatchesTable;
