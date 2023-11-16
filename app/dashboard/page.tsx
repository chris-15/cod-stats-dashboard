
import RecentMatches from "@/components/RecentMatches";
import TopCards from "@/components/TopCards";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions} from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-in')
  }
  return (
    <div>
      <TopCards />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <RecentMatches />
      </div>
    </div>
  );
}
export default Dashboard;
