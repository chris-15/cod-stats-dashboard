
import RecentMatchesTable from "@/components/RecentMatchesTable";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getMatches } from "@/server/queries";

//export const dynamic = "force-dynamic";


async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const matches = await getMatches();


  return (
  
    <div className="">
       <TopCards /> 
        <div className="">
        <RecentMatchesTable />
        </div>
      </div>
    
      
   
  );
}
export default Dashboard;
