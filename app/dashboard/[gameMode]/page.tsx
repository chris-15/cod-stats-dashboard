import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import GameModeStatsCard from "@/components/GameModeStatsCard";
import GameModeMatchesTable from "@/components/GameModeMatchesTable";
import GameModeMapStats from "@/components/GameModeMapStats";
import { TGameMode, TMatchQuery } from "@/app/types";
import { getMatches, getMatchesByMode } from "@/server/queries";
import MapBarChart from "@/components/MapBarChart";

async function GameModeStatsPage({ params }: { params: { gameMode: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  //function to make sure params given to props are in the correct format
  function capitalizeGameMode(gameMode: string) {
    if (gameMode === "searchanddestroy") {
      return "SearchAndDestroy";
    }
    return gameMode.charAt(0).toUpperCase() + gameMode.slice(1);
  }

  const gameMode = capitalizeGameMode(params.gameMode) as TGameMode;
  //console.log(gameMode);

  const matches = await getMatchesByMode(gameMode);


  function calcMapCount(match: TMatchQuery[], gameMode:string) {
    let mapCounts: { [key: string]: number } = {};
  
    match.forEach((obj) => {

      if(obj.gameMode === gameMode)
      mapCounts[obj.matchMap]
        ? mapCounts[obj.matchMap]++
        : (mapCounts[obj.matchMap] = 1);
    });
  
    let sortedMapCounts = Object.keys(mapCounts)
      .sort()
      .map((key) => ({ name: key, value: mapCounts[key] }));
  
    return sortedMapCounts;
  }

 // console.log(calcMapCount(matches, gameMode))
 const mapCountData = calcMapCount(matches, gameMode);

  return (
    <div className="">
      <Link href={"/dashboard"}>
        <p className=""> {`<- Dashboard`}</p>
      </Link>
      <h2 className="">
        {gameMode === "SearchAndDestroy" ? "Search And Destroy" : gameMode}
      </h2>
      <GameModeStatsCard gameMode={gameMode} matches={matches} />
      <GameModeMapStats gameMode={gameMode} matches={matches} />
      <MapBarChart data={mapCountData} />
      <GameModeMatchesTable gameMode={gameMode} matches={matches} />
    </div>
  );
}
export default GameModeStatsPage;
