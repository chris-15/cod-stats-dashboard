"use client"
import { TMatch } from "@/app/types";
import { useMatches } from "./matchesContext";

//function to convert seconds to min:secs string to display on table - may move to a helper function file if more functions arise
const convertTime = (seconds: number) => {
  const mins: number = Math.floor(seconds / 60);
  const secs: number = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

type GameModeMatchesProp ={
  gameMode: string,
}

function GameModeMatches( {gameMode}:GameModeMatchesProp) {
    //calling custom useMatch hook to get the matches
    const { matches } = useMatches();
    console.log(matches)

    const gameModeMatches = matches.filter(match => match.gameMode === gameMode)
    //console.log(gameModeMatches)
  
  
    return (
      <section className="w-full max-w-[96rem] mx-auto my-4 bg-gray-800 text-white shadow-lg rounded-lg  overflow-auto max-h-[60vh]">
        <div className="px-4 sm:px-6 py-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-100">
            All Matches
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 px-4 sm:px-6 py-4 text-sm ">
          <thead className="sticky top-0 z-10 bg-gray-800">
            <tr>
              <th>Date</th>
              <th>Game Mode</th>
              <th>Map</th>
              <th>W/L Result</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Damage</th>
              <th>Time</th>
              <th>K/D Ratio</th>
            </tr>
          </thead>
          <tbody>
            {gameModeMatches.map((match) => (
              <tr className="" key={match.id}>
                <td>
                  {new Date(match.createdAt).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>{match.gameMode === 'SearchAndDestroy' ? 'Search & Destroy' : match.gameMode }</td>
                <td>{match.matchMap}</td>
                {match.win === true ? (
                  <td className="text-green-500">Win</td>
                ) : (
                  <td className="text-red-500">Loss</td>
                )}
                <td>{match.kills}</td>
                <td>{match.deaths}</td>
                <td>{match.damage ? match.damage: "N/A"}</td>
                <td>
                  {match.gameMode === "Hardpoint"
                    ? convertTime(match.time)
                    : "N/A"}
                </td>
                <td>{(match.kills / match.deaths).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
export default GameModeMatches