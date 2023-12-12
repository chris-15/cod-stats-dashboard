import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import MapStatsCard from "@/components/MapStatsCard";

async function hardpointPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Link href={"/dashboard"}>
        <p className=" font-bold text-2xl hover:underline"> {`<- Dashboard`}</p>
      </Link>
      <MapStatsCard></MapStatsCard>
    </>
  );
}
export default hardpointPage;
