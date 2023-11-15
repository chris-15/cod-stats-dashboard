
import RecentMatches from "@/components/RecentMatches";
import TopCards from "@/components/TopCards";
import Link from "next/link";

function Dashboard() {
  return (
    <div>
      <TopCards />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <RecentMatches />
      </div>
      <Link href={"/add-stats"} className="btn">
        Add Stats
      </Link>
    </div>
  );
}
export default Dashboard;
