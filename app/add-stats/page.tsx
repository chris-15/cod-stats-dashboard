import AddStatsForm from "@/components/AddStatsForm";
import { getServerSession } from "next-auth/next";
import { authOptions} from "../../lib/auth";
import { redirect } from "next/navigation";

async function AddStats() {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect('/sign-in')
  }
  //console.log(session)

  return (
    <div className="">
      <AddStatsForm />
    </div>
  );
}
export default AddStats;
