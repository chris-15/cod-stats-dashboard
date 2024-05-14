import { authOptions } from "@/lib/auth";
import { getMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";


export default async function GameModeMatchId({
  params: { id: id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const matchId = id;

  const match = await getMatchById(matchId);

  return (
    <div>
      <div className="bg-slate-800 w-96 text-center text-white">

      <h1>
        {match.createdAt.toLocaleDateString()}{" "}
        {match.createdAt.toLocaleTimeString()}
      </h1>
      <h2>{match.matchMap}</h2>
      <h2>{match.kills}</h2>
      <h2>{match.deaths}</h2>
      </div>
    </div>
  );
}
