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

  const mapCountData = calcMapCount(matches, gameMode);

  return (
    <div className="p-4">
      {matches.length > 0 ? (
        <>
          <Link
            href={"/dashboard"}
            className="flex md:hidden font-bold text-xl hover:underline"
          >
            <p className=""> {`<- Dashboard`}</p>
          </Link>
          <h2 className="text-center font-bold text-4xl mt-4 mb-6">
            {gameMode === "SearchAndDestroy" ? "Search And Destroy" : gameMode}
          </h2>

          <div className=" grid grid-cols-1 space-y-4">
            <GameModeStatsCard gameMode={gameMode} matches={matches} />
            <GameModeMapStats gameMode={gameMode} matches={matches} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 bg-secondary-bg border border-[#444444] rounded-lg divide-x divide-[#444444] ">
                <div>
                  <h3 className="text-center pt-4 text-lg sm:text-xl font-bold">
                    Top 10 Kills
                  </h3>
                  <TopKills matches={matches} gameMode={gameMode} />
                </div>
                <div>
                  <h3 className="text-center pt-4 text-lg sm:text-xl font-bold">
                    Top 10 Damage
                  </h3>
                  <TopDamage matches={matches} gameMode={gameMode} />
                </div>
              </div>

              <div className="hidden xs:flex flex-col justify-between space-y-4 xl:space-y-2">
                <MapBarChart data={mapCountData} />
                <KdBarChart matches={matches} />
              </div>
            </div>

            <GameModeMatchesTable gameMode={gameMode} matches={matches} />
          </div>
        </>
      ) : (
        <>
          <Link
            href={"/dashboard"}
            className="flex md:hidden font-bold text-xl hover:underline"
          >
            <p className=""> {`<- Dashboard`}</p>
          </Link>
          <h2 className="text-center font-bold text-4xl mt-4 mb-6">
            {gameMode === "SearchAndDestroy" ? "Search And Destroy" : gameMode}
          </h2>
          <p className="text-center p-4">No Matches Recorded</p>
        </>
      )}
    </div>
  );
}
export default GameModeStatsPage;

type topTenProps = {
  gameMode: string;
  matches: TMatchQuery[];
};

function TopKills({ matches, gameMode }: topTenProps) {
  const sortedMatches = [...matches].sort((a, b) => b.kills - a.kills);

  const topTenMatches = sortedMatches.slice(0, 10);

  return (
    <div className="">
      {topTenMatches.map((match, index) => (
        <div key={match.id} className="top-ten-item border-b border-[#444444]">
          <Link
            href={`/dashboard/${gameMode.toLowerCase()}/match/${match.id}`}
            className="flex items-center justify-between px-4 py-3 rounded-lg group transition-transform transform hover:scale-105 "
          >
            <div>
              <h4 className="font-medium group-hover:underline group-hover:text-[#b0ff34]">
                Kills: {match.kills}
              </h4>
              <p className=" font-bold text-sm text-gray-400 group-hover:text-[#b0ff34] ">
                {match.matchMap}
              </p>
            </div>

            <div className="w-6 h-6 text-primary">
              {getNumberSuffix(index + 1)}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function TopDamage({ matches, gameMode }: topTenProps) {
  const sortedMatches = [...matches].sort(
    (a, b) => (b.damage || 0) - (a.damage || 0)
  );

  const topTenMatches = sortedMatches.slice(0, 10);

  return (
    <div className=" ">
      {topTenMatches.map((match, index) => (
        <div key={match.id} className="top-ten-item border-b border-[#444444]">
          <Link
            href={`/dashboard/${gameMode.toLowerCase()}/match/${match.id}`}
            className="flex items-center justify-between px-4 py-3 rounded-lg group transition-transform transform hover:scale-105 "
          >
            <div>
              <h4 className="font-medium group-hover:underline group-hover:text-[#b0ff34]">
                Damage: {match.damage}
              </h4>
              <p className="font-bold text-sm text-gray-400  group-hover:text-[#b0ff34] ">
                {match.matchMap}
              </p>
            </div>

            <div className="w-6 h-6 text-primary">
              {getNumberSuffix(index + 1)}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
