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
    <section className="w-full border rounded-lg bg-sidebar p-4 overflow-x-auto">
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
        <TabsList className="bg-zinc-800 mb-4 w-full xs:w-auto">
          <TabsTrigger value="all">All Modes</TabsTrigger>
          <TabsTrigger value="hardpoint">Hardpoint</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="search">Search & Destroy</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <div className="">
            {matches.length > 0 ? (
              <>
                <div className="hidden xs:block rounded-md border border-zinc-800 overflow-hidden">
                  <CustomTableBodyComponent matches={matches} />
                </div>
                <div className="xs:hidden">
                  <CustomMobileCardComponent matches={matches} />
                </div>
              </>
            ) : (
              <p className="text-center p-4">No Matches Recorded</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="hardpoint" className="m-0">
          {/* Hardpoint specific content */}
          <div className="">
            {matches.length > 0 ? (
              <>
                <div className="hidden xs:block rounded-md border border-zinc-800 overflow-hidden">
                  <CustomTableBodyComponent matches={hpMatches} />
                </div>
                <div className="xs:hidden">
                  <CustomMobileCardComponent matches={hpMatches} />
                </div>
              </>
            ) : (
              <p className="text-center p-4">No Matches Recorded</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="control" className="m-0">
          {/* Control specific content */}
          <div className="">
            {matches.length > 0 ? (
              <>
                <div className="hidden xs:block rounded-md border border-zinc-800 overflow-hidden">
                  <CustomTableBodyComponent matches={controlMatches} />
                </div>
                <div className="xs:hidden">
                  <CustomMobileCardComponent matches={controlMatches} />
                </div>
              </>
            ) : (
              <p className="text-center p-4">No Matches Recorded</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="search" className="m-0">
          {/* Search & Destroy specific content */}
          <div className="">
            {matches.length > 0 ? (
              <>
                <div className="hidden xs:block rounded-md border border-zinc-800 overflow-hidden">
                  <CustomTableBodyComponent matches={sdMatches} />
                </div>
                <div className="xs:hidden">
                  <CustomMobileCardComponent matches={sdMatches} />
                </div>
              </>
            ) : (
              <p className="text-center p-4">No Matches Recorded</p>
            )}
          </div>
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
          <TableHead className="text-zinc-400 font-medium">K/D RATIO</TableHead>
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
            <TableCell className="text-zinc-400 font-medium">
              {(match.kills / match.deaths).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const CustomMobileCardComponent = ({ matches }: { matches: TMatchQuery[] }) => {
  return (
    <div className=" divide-y-2 divide-[#444444]">
      {matches.map((match) => (
        <div
          className="bg-sidebar p-4"
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
          <div className="mt-2 text-right">
            <span className="text-white font-mono">
              K/D: {(match.kills / match.deaths).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
