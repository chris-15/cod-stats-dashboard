import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getMatches } from "@/server/queries";
import ModeBarChart from "@/components/ModeBarChart";
import MapBarChart from "@/components/MapBarChart";
import { TMatchQuery } from "../../types";
import { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";

const ModeBarChartComponent = dynamic(
  () => import("@/components/ModeBarChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center p-4">
        <span className="small-loader"></span>
      </div>
    ),
  }
);

const MapBarChartComponent = dynamic(() => import("@/components/MapBarChart"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <span className="small-loader"></span>
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

  const matches = await getMatches();

   //new array that hold last 15 matches
   const lastFifteenMatches = matches ? matches.slice(0, 15) : [];

  const mapCountData = calcMapCount(matches).filter(
    (match) => match.name != "Skidrow" && match.name != "Terminal"
  );

  const modeCountData = [
    { name: "Hardpoint", value: gameModeCount(matches, "Hardpoint") },
    { name: "Control", value: gameModeCount(matches, "Control") },
    { name: "S&D", value: gameModeCount(matches, "SearchAndDestroy") },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <TopCards matches={matches} game="mw3" />
        <div className="grid gap-4 grid-cols1 mt-4 ">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {matches.length > 0 && (
              <>
                <div className="border border-[#444444] rounded-lg  bg-secondary-bg">
                  <h2 className="text-center pt-4">Match Count by Game Mode</h2>
                  <ModeBarChartComponent data={modeCountData} fill="#b0ff34" />
                </div>
                <div className="border border-[#444444] rounded-lg bg-secondary-bg hidden xs:block">
                  <h2 className="text-center pt-4">Match Count by Map</h2>
                  <MapBarChartComponent data={mapCountData} fill="#b0ff34" />
                </div>
              </>
            )}
          </div>
          <RecentMatchesTable matches={lastFifteenMatches} game="mw3" />
        </div>
      </div>
    </Suspense>
  );
}
export default Dashboard;
