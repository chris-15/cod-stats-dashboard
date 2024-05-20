import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getMatches } from "@/server/queries";
import ModeBarChart from "@/components/ModeBarChart";
import MapBarChart from "@/components/MapBarChart";


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
      <div className="grid gap-4 grid-cols1 xl:grid-cols-2 ">

        <RecentMatchesTable />
        <div className="grid gap-4">
        <ModeBarChart matches={matches} />
        <MapBarChart matches={matches}/>
        </div>

        
      </div>
    </div>
  );
}
export default Dashboard;
