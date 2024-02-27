
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
      <div className="px-4">
        <TopCards />
        <div className="py-4">
          <RecentMatchesTable />
        </div>
      </div>
   
  );
}
export default Dashboard;
