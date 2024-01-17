
import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";


async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  return (
      <div>
        <TopCards />
        <div className="p-4">
          <RecentMatchesTable />
        </div>
      </div>
   
  );
}
export default Dashboard;
