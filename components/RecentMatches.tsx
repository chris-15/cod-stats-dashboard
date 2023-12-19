"use client"
import { TMatch } from "@/app/types";
import { useMatches } from "./matchesContext";

//function to convert seconds to min:secs string to display on table - may move to a helper function file if more functions arise
const convertTime = (seconds: number) => {
  const mins: number = Math.floor(seconds / 60);
  const secs: number = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

function RecentMatches() {
  //calling custom useMatch hook to get the matches
  const { matches } = useMatches();
  console.log(matches)

  //new array that hold last 10 matches 
  const lastTenMatches = matches ? matches.slice(0, 10) : [];

  return (
    <section className="w-full max-w-[96rem] mx-auto my-4 bg-[#1B1B1B] text-white shadow-lg rounded-lg overflow-x-auto border border-[#333333]">
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-100">
          Recent Matches - Quick Stats
        </h2>
      </div>
      <table className="min-w-full  px-4 sm:px-6 py-4 text-sm ">
        <thead>
          <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Game Mode</th>
            <th className="text-center">Map</th>
            <th className="text-center">W/L Result</th>
            <th className="text-center">Kills</th>
            <th className="text-center">Deaths</th>
            {/* <th>Damage</th> */}
           {/*  <th>Time</th> */}
            <th className="text-center">K/D Ratio</th>
          </tr>
        </thead>
        <tbody>
          {lastTenMatches.map((match) => (
            <tr className="text-center" key={match.id}>
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
                <td className="text-green-500 ">Win</td>
              ) : (
                <td className="text-red-500 ">Loss</td>
              )}
              <td>{match.kills}</td>
              <td>{match.deaths}</td>
              {/* <td>{match.damage ? match.damage: "N/A"}</td> */}
             {/*  <td>
                {match.gameMode === "Hardpoint"
                  ? convertTime(match.time)
                  : "N/A"}
              </td> */}
              <td>{(match.kills / match.deaths).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default RecentMatches;
