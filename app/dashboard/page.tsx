import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getMatches } from "@/server/queries";
import ModeBarChart from "@/components/ModeBarChart";
import MapBarChart from "@/components/MapBarChart";
import { TMatchQuery } from "../types";

//export const dynamic = "force-dynamic";

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

  const mapCountData = calcMapCount(matches).filter(
    (match) => match.name != "Skidrow" && match.name != "Terminal"
  );

  const modeCountData = [
    { name: "Hardpoint", value: gameModeCount(matches, "Hardpoint") },
    { name: "Control", value: gameModeCount(matches, "Control") },
    { name: "S&D", value: gameModeCount(matches, "SearchAndDestroy") },
  ];

  return (
    <div className="p-4">
      <TopCards />
      <div className="grid gap-4 grid-cols1 mt-4 ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ModeBarChart data={modeCountData} />
          <MapBarChart data={mapCountData} />
        </div>
        <RecentMatchesTable />
      </div>
    </div>
  );
}
export default Dashboard;
