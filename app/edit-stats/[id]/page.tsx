import { TMatch } from "@/app/types";
import EditStatsForm from "@/components/EditStatsForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/auth";

const getMatch = async (id: string): Promise<TMatch | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/matches/${id}`, {
        cache: 'no-store',
      });
    if (res.ok) {
      const match = await res.json();
      return match;
    }else {
        console.error('Fetch error:', res.status, res.statusText);
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

async function EditStats({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
 
  const id = params.id;
 // console.log(id);

  const match = await getMatch(id);
  //console.log(session, match)
  return (
    <div className="p-4">{match ? <EditStatsForm match={match} /> : "No Match Found"} </div>
  );
}
export default EditStats;
