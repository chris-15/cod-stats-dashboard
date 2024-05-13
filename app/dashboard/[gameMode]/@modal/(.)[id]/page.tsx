import { authOptions } from "@/lib/auth";
import { getMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Modal } from "./modal";


export default async function MatchModal({
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
    <Modal >
      <div className=" bg-slate-800 text-white w-96">
      <h1>
        {match.createdAt.toLocaleDateString()}{" "}
        {match.createdAt.toLocaleTimeString()}
      </h1>
      <h2>{match.matchMap}</h2>
      <h2>{match.kills}</h2>
      <h2>{match.deaths}</h2>
        </div>
    </Modal>)
  }