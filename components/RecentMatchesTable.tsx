import { TMatch, TMatchQuery } from "@/app/types";
//import { useMatches } from "./matchesContext";
import { convertTime } from "../lib/stat-utils";
import { getMatches } from "@/server/queries";
import { unstable_noStore as noStore } from "next/cache";
import DisplayDate from "./DisplayDate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

async function RecentMatchesTable({
  matches,
  hpMatches,
  controlMatches,
  sdMatches,
  game,
}: {
  matches: TMatchQuery[];
  hpMatches: TMatchQuery[];
  controlMatches: TMatchQuery[];
  sdMatches: TMatchQuery[];
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

    const isWinStreak = currentWinStreak > currentLossStreak;
    return {
      text: isWinStreak
        ? `${currentWinStreak} Win Streak`
        : `${currentLossStreak} Loss Streak`,
      isWinStreak,
    };
  };

  const streak = calcWinStreak([...matches].reverse());
  return (
    /*  <section className="w-full border border-[#444444] rounded-lg bg-secondary-bg p-4 overflow-x-auto hidden sm:block">
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
    </section> */
    <section className="w-full border border-[#444444] rounded-lg bg-secondary-bg p-4 overflow-x-auto hidden sm:block">
      <div className="px-4 sm:px-6 py-4 sticky left-0">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg sm:text-xl font-bold">Recent Matches</h2>
          {streak.isWinStreak ? (
            <Badge variant="win">{streak.text}</Badge>
          ) : (
            <Badge variant="loss">{streak.text}</Badge>
          )}
        </div>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-zinc-800 mb-4">
          <TabsTrigger value="all">All Modes</TabsTrigger>
          <TabsTrigger value="hardpoint">Hardpoint</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="search">Search & Destroy</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            {matches.length > 0 ? (
              <CustomTableBodyComponent matches={matches} />
            ) : (
              <p className="text-center p-4">No Matches Recorded</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="hardpoint" className="m-0">
          {/* Hardpoint specific content would go here */}
          <CustomTableBodyComponent matches={hpMatches} />
        </TabsContent>
        <TabsContent value="control" className="m-0">
          {/* Control specific content would go here */}
          <CustomTableBodyComponent matches={controlMatches} />
        </TabsContent>
        <TabsContent value="search" className="m-0">
          {/* Search & Destroy specific content would go here */}
          <CustomTableBodyComponent matches={sdMatches} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
export default RecentMatchesTable;

const CustomTableBodyComponent = ({ matches }: { matches: TMatchQuery[] }) => {
  return (
    <Table>
      <TableHeader className="bg-zinc-800/50">
        <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
          <TableHead className="text-zinc-400 font-medium">DATE</TableHead>
          <TableHead className="text-zinc-400 font-medium">GAME MODE</TableHead>
          <TableHead className="text-zinc-400 font-medium">MAP</TableHead>
          <TableHead className="text-zinc-400 font-medium">
            W/L RESULT
          </TableHead>
          <TableHead className="text-zinc-400 font-medium text-right">
            K/D RATIO
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow
            key={match.id}
            className="hover:bg-zinc-800/50 border-zinc-800"
          >
            <TableCell className="text-zinc-400 font-medium">
              <DisplayDate match={match} createdAt={true} />
            </TableCell>
            <TableCell className="text-zinc-400 font-medium">
              {match.gameMode === "SearchAndDestroy"
                ? "Search & Destroy"
                : match.gameMode}
            </TableCell>
            <TableCell className="text-zinc-400 font-medium">
              {match.matchMap}
            </TableCell>
            <TableCell className="text-zinc-400 font-medium">
              {match.win ? (
                <span className="text-green-500">Win</span>
              ) : (
                <span className="text-red-500">Loss</span>
              )}
            </TableCell>
            <TableCell className="text-zinc-400 font-medium text-right">
              {(match.kills / match.deaths).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
