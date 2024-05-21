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

async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const matches = await getMatches();



  return (
    <div className="p-4">
      <TopCards />
      {/* */}
      <div className="grid gap-4 grid-cols1 ">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ModeBarChart matches={matches} />
          <MapBarChart matches={matches}/>
        </div>
        <RecentMatchesTable />
      </div>
    </div>
  );
}
export default Dashboard;
