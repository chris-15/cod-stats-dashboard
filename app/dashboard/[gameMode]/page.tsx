import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import MapStatsCard from "@/components/MapStatsCard";
import GameModeMatches from "@/components/GameModeMatches";

async function GameModeStatsPage({ params }: { params: { gameMode: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  
  //function to make sure params given to props are in the correct format
  function capitalizeGameMode(gameMode: string) {
    if (gameMode === 'searchanddestroy') {
      return 'SearchAndDestroy';
    }
    return gameMode.charAt(0).toUpperCase() + gameMode.slice(1);
  }
  
  const gameMode = capitalizeGameMode(params.gameMode)
  console.log(gameMode);

  return (
    <>
      <Link href={"/dashboard"}>
        <p className=" font-bold text-2xl hover:underline"> {`<- Dashboard`}</p>
      </Link>
      <MapStatsCard gameMode={gameMode} />
      <GameModeMatches gameMode={gameMode} />
    </>
  );
}
export default GameModeStatsPage;
