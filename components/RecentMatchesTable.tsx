import { TMatch, TMatchQuery } from "@/app/types";
//import { useMatches } from "./matchesContext";
import { convertTime } from "../lib/utils";
import { getMatches } from "@/server/queries";
import { unstable_noStore as noStore } from "next/cache";
import DisplayDate from "./DisplayDate";

async function RecentMatchesTable({
  matches,
  game,
}: {
  matches: TMatchQuery[];
  game: string;
}) {
  const calcWinStreak = (matches: TMatchQuery[]) => {
    let currentWinStreak = 0;
    let currentLossStreak = 0;

    for (const match of matches) {
      if (match.win) {
        currentWinStreak++;
        currentLossStreak = 0;
      } else {
        currentWinStreak = 0;
        currentLossStreak++;
      }
    }

    return currentWinStreak > currentLossStreak
      ? `${currentWinStreak} Win Streak`
      : `${currentLossStreak} Loss Streak`;
  };
  return (
    <section className="w-full border border-[#444444] rounded-lg bg-secondary-bg p-4 overflow-x-auto hidden sm:block">
      <div className="px-4 sm:px-6 py-4 sticky left-0">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">Recent Matches</h2>
          <p> {calcWinStreak([...matches].reverse())}</p>
        </div>
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
              {matches.map((match) => (
                <tr className="text-center" key={match.id}>
                  <td className="">
                    <DisplayDate match={match} createdAt={true} />
                  </td>
                  <td className="">
                    {match.gameMode === "SearchAndDestroy"
                      ? "Search & Destroy"
                      : match.gameMode}
                  </td>
                  <td className=""> {match.matchMap}</td>
                  {match.win ? (
                    <td
                      className={
                        game === "mw3" ? "text-[#b0ff34] " : "text-green-500"
                      }
                    >
                      Win
                    </td>
                  ) : (
                    <td className="text-red-500 ">Loss</td>
                  )}
                  {/* <td>{match.kills}</td>
                <td>{match.deaths}</td> */}
                  <td className="">
                    {(match.kills / match.deaths).toFixed(2)}
                  </td>
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
