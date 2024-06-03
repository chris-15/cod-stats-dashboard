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
import KdBarChart from "@/components/KdBarChart";
import { getNumberSuffix } from "@/lib/utils";

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

  function calcMapCount(match: TMatchQuery[], gameMode: string) {
    let mapCounts: { [key: string]: number } = {};

    match.forEach((obj) => {
      if (obj.gameMode === gameMode)
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
    <div className="p-4">
      <Link href={"/dashboard"}>
        <p className=""> {`<- Dashboard`}</p>
      </Link>
      <h2 className="">
        {gameMode === "SearchAndDestroy" ? "Search And Destroy" : gameMode}
      </h2>
      
      <div className=" grid grid-cols-1">

      <GameModeStatsCard gameMode={gameMode} matches={matches} />
      <GameModeMapStats gameMode={gameMode} matches={matches} />


     
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      

        <div className="grid grid-cols-2 ">
          <div>
            Top 10 Kills
            <TopKills matches={matches} gameMode={gameMode} />
          </div>
          <div>
            Top 10 Damage
            <TopDamage matches={matches} gameMode={gameMode} />
          </div>
        </div>
        <div>
          <MapBarChart data={mapCountData} />
          <KdBarChart matches={matches} />
        </div>

      </div>

        <GameModeMatchesTable gameMode={gameMode} matches={matches} />
      </div>
      
    </div>
  );
}
export default GameModeStatsPage;

type topTenProps = {
  gameMode: string;
  matches: TMatchQuery[];
};

function TopKills({ matches, gameMode }: topTenProps) {
  const sortedMatches = matches.sort((a, b) => b.kills - a.kills);

  const topTenMatches = sortedMatches.slice(0, 10);

  return (
    <div className="">
      {topTenMatches.map((match, index) => (
        <div key={match.id} className="">
          <Link
            href={`/dashboard/${gameMode.toLowerCase()}/match/${match.id}`}
            className="flex items-center justify-between px-4 py-3 rounded-lg"
          >
            <div>
              <h4 className="font-medium">{match.matchMap}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Kills: {match.kills}
              </p>
            </div>

            <div className="w-6 h-6 text-primary">{getNumberSuffix(index + 1)}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function TopDamage({ matches, gameMode }: topTenProps) {
  const sortedMatches = matches.sort(
    (a, b) => (b.damage || 0) - (a.damage || 0)
  );

  const topTenMatches = sortedMatches.slice(0, 10);

  return (
    <div className=" ">
      {topTenMatches.map((match, index) => (
        <div key={match.id} className="">
          <Link
            href={`/dashboard/${gameMode.toLowerCase()}/match/${match.id}`}
            className="flex items-center justify-between px-4 py-3 rounded-lg"
          >
            <div>
              <h4 className="font-medium">{match.matchMap}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Damage: {match.damage}
              </p>
            </div>

            <div className="w-6 h-6 text-primary">{getNumberSuffix(index + 1)}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

