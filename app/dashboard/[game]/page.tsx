import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getBoSixMatches,
  getFifteenBoSixMatches,
  getFifteenMw3Matches,
  getLastFifteenBoSixMatchesByMode,
  getLastFifteenMw3MatchesByMode,
  getMatches,
} from "@/server/queries";
import { TMatchQuery } from "../../../types";
import { Suspense } from "react";

import dynamic from "next/dynamic";
import MatchDistribution from "@/components/MatchDistribution";
import Loading from "./loading";

// Type for the game route param
// in future for new games, can add here
type TGameType = "bo6" | "mw3";

// Interface for grouping query functions for each game
interface GameQueries {
  matches: () => Promise<any>;
  lastFifteenMatches: () => Promise<any>;
  modeMatches: () => Promise<any>;
}

// Dynamically import ModeBarChart for client-side rendering with loading fallback
const ModeBarChartComponent = dynamic(
  () => import("@/components/ModeBarChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center p-4">
        <span className="small-loader-bo6"></span>
      </div>
    ),
  }
);

// Dynamically import MapBarChart for client-side rendering with loading fallback
const MapBarChartComponent = dynamic(() => import("@/components/MapBarChart"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <span className="small-loader-bo6"></span>
    </div>
  ),
});

// Count the number of matches for each map
function calcMapCount(match: TMatchQuery[]) {
  let mapCounts: { [key: string]: number } = {};

  match.forEach((obj) => {
    mapCounts[obj.matchMap]
      ? mapCounts[obj.matchMap]++
      : (mapCounts[obj.matchMap] = 1);
  });

  let sortedMapCounts = Object.keys(mapCounts)
    .sort()
    .map((key) => ({ name: key, value: mapCounts[key] }));

  return sortedMapCounts;
}

// Count the number of matches for a specific game mode
function gameModeCount(match: TMatchQuery[], gameMode: string) {
  let modeCount = 0;

  match.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      modeCount++;
    }
  });

  return modeCount;
}

// Main dashboard page component
async function Dashboard({ params }: { params: { game: string } }) {
  const game = params.game as TGameType;

  // Map game type to the correct set of query functions
  const gameQueries: Record<TGameType, GameQueries> = {
    bo6: {
      matches: getBoSixMatches,
      lastFifteenMatches: getFifteenBoSixMatches,
      modeMatches: getLastFifteenBoSixMatchesByMode,
    },
    mw3: {
      matches: getMatches,
      lastFifteenMatches: getFifteenMw3Matches,
      modeMatches: getLastFifteenMw3MatchesByMode,
    },
  };

  // Get the correct query functions for the selected game
  const queries = gameQueries[game];

  // Fetch all required data in parallel
  const [matches, lastFifteenMatches, modeMatches] = await Promise.all([
    queries.matches(),
    queries.lastFifteenMatches(),
    queries.modeMatches(),
  ]);

  // Destructure mode-specific matches
  const { hpMatches, controlMatches, searchMatches } = modeMatches;

  // Prepare map count data, filtering out unwanted maps
  const mapCountData = calcMapCount(matches).filter(
    (match) => match.name != "Skidrow" && match.name != "Terminal"
  );

  // Prepare game mode count data for chart
  const modeCountData = [
    { name: "Hardpoint", value: gameModeCount(matches, "Hardpoint") },
    { name: "Control", value: gameModeCount(matches, "Control") },
    { name: "S&D", value: gameModeCount(matches, "SearchAndDestroy") },
  ];

  // Group chart data for mobile
  const mapData = {
    mapCountData,
    modeCountData,
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 gap-4 sm:gap-8">
        {/* Top summary cards */}
        <TopCards matches={matches} game={game} />

        {/* Show charts only if there are matches */}
        {matches.length > 0 && (
          <>
            {/* Desktop charts */}
            <div className=" hidden xl:grid xl:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-sidebar border rounded-lg">
                <h2 className="text-center pt-4">Match Count by Game Mode</h2>
                <ModeBarChartComponent data={modeCountData} fill="#ff9900" />
              </div>
              <div className="bg-sidebar border rounded-lg">
                <h2 className="text-center pt-4">Match Count by Map</h2>
                <MapBarChartComponent data={mapCountData} fill="#ff9900" />
              </div>
            </div>

            {/* Mobile chart distribution */}
            <div className="xl:hidden ">
              <MatchDistribution
                mapChartData={mapData.mapCountData}
                modeChartData={mapData.modeCountData}
                game="bo6"
              />
            </div>
          </>
        )}

        {/* Table of recent matches */}
        <RecentMatchesTable
          matches={lastFifteenMatches}
          hpMatches={hpMatches}
          controlMatches={controlMatches}
          sdMatches={searchMatches}
          game={game}
        />
      </div>
    </Suspense>
  );
}
export default Dashboard;
