import { TMatch, TMatchQuery } from "@/app/types";
//import { useMatches } from "./matchesContext";
import { convertTime } from "../lib/utils";
import { getMatches } from "@/server/queries";
import { unstable_noStore as noStore} from "next/cache";

async function RecentMatchesTable( ) {


  const matches = await getMatches();

  //new array that hold last 15 matches
  const lastFifteenMatches = matches ? matches.slice(0, 15) : [];

  return (
    <section className="w-full border rounded-lg p-4 overflow-x-auto">
      <div className="">
        <h2 className="">Recent Matches - Quick Stats</h2>
      </div>
      {matches.length > 0 ? (
        <div>
          <table className="w-full">
          <thead>
            <tr> 
              <th className="">Date</th>
              <th className="">Game Mode</th>
              <th className="">Map</th>
              <th className="">W/L Result</th>
              {/* <th>Kills</th>
              <th>Deaths</th> */}
              {/* <th>Damage</th> */}
              {/*  <th>Time</th> */}
              <th className="">K/D Ratio</th>
            </tr>
          </thead>
          <tbody>
            {lastFifteenMatches.map((match) => (
              <tr className="text-center" key={match.id}>
                <td className="">
                  {new Date(match.createdAt).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className="">
                  {match.gameMode === "SearchAndDestroy"
                    ? "Search & Destroy"
                    : match.gameMode}
                </td>
                <td className=""> {match.matchMap}</td>
                {match.win ? (
                  <td className="text-green-500 ">Win</td>
                ) : (
                  <td className="text-red-500 ">Loss</td>
                )}
                {/* <td>{match.kills}</td>
                <td>{match.deaths}</td> */}
                <td className="">{(match.kills / match.deaths).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        
      ) : (
        <p className="text-center p-4">No Matches Recorded</p>
      )}
    </section>
  );
}
export default RecentMatchesTable;
