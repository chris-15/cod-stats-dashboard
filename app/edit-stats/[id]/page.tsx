import { TMatch, TMatchQuery } from "@/app/types";
import EditStatsForm from "@/components/EditStatsForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/auth";
import { getBoSixMatchById } from "@/server/queries";

async function EditStats({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
 
  const id = params.id;
 // console.log(id);

  const match = await getBoSixMatchById(id);
  //console.log(session, match)
  return (
    <div className="p-4">{match ? <EditStatsForm match={match} /> : "No Match Found"} </div>
  );
}
export default EditStats;
