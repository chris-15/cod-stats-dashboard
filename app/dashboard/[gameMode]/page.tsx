import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import GameModeStatsCard from "@/components/GameModeStatsCard";
import GameModeMatchesTable from "@/components/GameModeMatchesTable";
import GameModeMapStats from "@/components/GameModeMapStats";
import { TGameMode } from "@/app/types";

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
  
  const gameMode = capitalizeGameMode(params.gameMode) as TGameMode
  //console.log(gameMode);

  return (
    <div className="">
      <Link href={"/dashboard"}>
        <p className=""> {`<- Dashboard`}</p>
      </Link>
      <h2 className="">
          {gameMode === "SearchAndDestroy" ? "Search And Destroy" : gameMode}
        </h2>
      <GameModeStatsCard gameMode={gameMode} />
      <GameModeMapStats gameMode={gameMode} />
      <GameModeMatchesTable gameMode={gameMode} />
    </div>
  );
}
export default GameModeStatsPage;
