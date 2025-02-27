import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getBoSixMatches,
  getFifteenBoSixMatches,
  getLastFifteenBoSixMatchesByMode,
} from "@/server/queries";
import { TMatchQuery } from "../../types";
import { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import MatchDistribution from "@/components/MatchDistribution";

// chart components are loaded dynamically, only loaded when needed in the browser rather than server-side
// provides loading state while component loads
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

const MapBarChartComponent = dynamic(() => import("@/components/MapBarChart"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <span className="small-loader-bo6"></span>
    </div>
  ),
});

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

function gameModeCount(match: TMatchQuery[], gameMode: string) {
  let modeCount = 0;

  match.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      modeCount++;
    }
  });

  return modeCount;
}

async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const [matches, lastFifteenMatches, modeMatches] = await Promise.all([
    getBoSixMatches(),
    getFifteenBoSixMatches(),
    getLastFifteenBoSixMatchesByMode(),
  ]);

  const { hpMatches, controlMatches, searchMatches } = modeMatches;

  const mapCountData = calcMapCount(matches).filter(
    (match) => match.name != "Skidrow" && match.name != "Terminal"
  );

  const modeCountData = [
    { name: "Hardpoint", value: gameModeCount(matches, "Hardpoint") },
    { name: "Control", value: gameModeCount(matches, "Control") },
    { name: "S&D", value: gameModeCount(matches, "SearchAndDestroy") },
  ];

  const mapData = {
    mapCountData,
    modeCountData,
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <TopCards matches={matches} game="bo6" />
        <div className="grid gap-4 grid-cols1 mt-4 ">
          {matches.length > 0 && (
            <>
              <div className=" hidden xl:grid xl:grid-cols-2 gap-4">
                <div className="border border-[#444444] rounded-lg  bg-secondary-bg">
                  <h2 className="text-center pt-4">Match Count by Game Mode</h2>
                  <ModeBarChartComponent data={modeCountData} fill="#ff9900" />
                </div>
                <div className="border border-[#444444] rounded-lg bg-secondary-bg hidden xs:block">
                  <h2 className="text-center pt-4">Match Count by Map</h2>
                  <MapBarChartComponent data={mapCountData} fill="#ff9900" />
                </div>
              </div>

              <div className="xl:hidden">
                <MatchDistribution
                  mapChartData={mapData.mapCountData}
                  modeChartData={mapData.modeCountData}
                />
              </div>
            </>
          )}

          <RecentMatchesTable
            matches={lastFifteenMatches}
            hpMatches={hpMatches}
            controlMatches={controlMatches}
            sdMatches={searchMatches}
            game="bo6"
          />

          {/* mobile version of table- which are cards not table */}
          <div className="grid grid-cols-1 gap-4 sm:hidden ">
            <div className="px-4 sm:px-6 pt-4">
              <h2 className="text-lg sm:text-xl font-bold">Recent Matches</h2>
            </div>

            {matches.map((match) => (
              <div className=" bg-secondary-bg p-4 rounded-lg" key={match.id}>
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
        </div>
      </div>
    </Suspense>
  );
}
export default Dashboard;
