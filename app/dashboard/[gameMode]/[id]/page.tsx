import { authOptions } from "@/lib/auth";
import { getMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function GameModeMatchId({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }
  const matchId = params.id;

  const match = await getMatchById(matchId);

  return (
    <div>
      <h1>
        {match.createdAt.toLocaleDateString()}{" "}
        {match.createdAt.toLocaleTimeString()}
      </h1>
      <p>{match.kills}</p>
      <span>{match.deaths}</span>
    </div>
  );
}
export default GameModeMatchId;
