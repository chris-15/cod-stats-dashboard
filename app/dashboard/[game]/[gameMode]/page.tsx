import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import GameModeStatsCard from "@/components/GameModeStatsCard";
import GameModeMatchesTable from "@/components/GameModeMatchesTable";
import GameModeMapStats from "@/components/GameModeMapStats";
import { TGameMode, TMatchQuery } from "@/types";
import {
  getMatches,
  getBoSixMatchesByMode,
  getMatchesByMode,
} from "@/server/queries";
import MapBarChart from "@/components/MapBarChart";
import KdBarChart from "@/components/KdBarChart";
import { getNumberSuffix } from "@/lib/stat-utils";
import { FaTrophy } from "react-icons/fa";
import DisplayDate from "@/components/DisplayDate";
import KdLineChart from "@/components/KdLineChart";

const KdBarChartComponent = dynamic(() => import("@/components/KdBarChart"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <span className="small-loader-bo6"></span>
    </div>
  ),
});

const MapBarChartComponent = dynamic(() => import("@/components/MapBarChart"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <span className="small-loader-bo6"></span>
    </div>
  ),
});

const KdLineChartComponent = dynamic(() => import("@/components/KdLineChart"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <span className="small-loader-bo6"></span>
    </div>
  ),
});

async function GameModeStatsPage({
  params,
}: {
  params: { game: string; gameMode: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }


  // Validate game parameter first
  const validGames = ["bo6", "mw3"];
  if (!validGames.includes(params.game)) {
    redirect("/dashboard/mw3");
  }

  // Validate gameMode parameter
  const validGameModes = ["hardpoint", "control", "searchanddestroy"];
  if (!validGameModes.includes(params.gameMode.toLowerCase())) {
    redirect(`/dashboard/${params.game}`);
  }

  //function to make sure params given to props are in the correct format
  function capitalizeGameMode(gameMode: string) {
    if (gameMode === "searchanddestroy") {
      return "SearchAndDestroy";
    }
    return gameMode.charAt(0).toUpperCase() + gameMode.slice(1);
  }

  const gameMode = capitalizeGameMode(params.gameMode) as TGameMode;

  const matches =
    params.game === "bo6"
      ? await getBoSixMatchesByMode(gameMode)
      : await getMatchesByMode(gameMode);

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
    <div>
      {matches.length > 0 ? (
        <>
          <Link
            href={"/dashboard/bo6"}
            className="flex md:hidden font-bold text-xl hover:underline"
          >
            <p className=""> {`<- Home`}</p>
          </Link>
          <h2 className="text-center font-bold text-4xl mt-4 mb-6">
            {gameMode === "SearchAndDestroy" ? "Search And Destroy" : gameMode}
          </h2>

          <div className=" grid grid-cols-1 space-y-4">
            <GameModeStatsCard gameMode={gameMode} matches={matches} />
            <GameModeMapStats
              gameMode={gameMode}
              matches={matches}
              game={params.game}
            />
            <div className="border rounded-lg bg-sidebar">
              <h2 className="text-center pt-4">Daily K/D Ratio vs Win Rate</h2>
              <KdLineChartComponent matches={matches} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 bg-sidebar border rounded-lg divide-x divide-[#444444] ">
                <div>
                  <h3 className="text-center pt-4 text-lg sm:text-xl font-bold">
                    Top 10 Kills
                  </h3>
                  <TopKills
                    matches={matches}
                    gameMode={gameMode}
                    game={params.game}
                  />
                </div>
                <div>
                  <h3 className="text-center pt-4 text-lg sm:text-xl font-bold">
                    Top 10 Damage
                  </h3>
                  <TopDamage
                    matches={matches}
                    gameMode={gameMode}
                    game={params.game}
                  />
                </div>
              </div>

              <div className="hidden xs:flex flex-col justify-between space-y-4 xl:space-y-2">
                <div className="border rounded-lg bg-sidebar hidden xs:block">
                  <h2 className="text-center pt-4">Match Count by Map</h2>
                  <MapBarChartComponent data={mapCountData} fill="#ff9900" />
                </div>
                <div className="bg-sidebar border rounded-lg">
                  <h2 className="text-center pt-4">KD by Result by Map</h2>
                  <KdBarChartComponent matches={matches} />
                </div>
              </div>
            </div>

            <GameModeMatchesTable
              gameMode={gameMode}
              matches={matches}
              game={params.game}
            />
          </div>
        </>
      ) : (
        <>
          <Link
            href={"/dashboard/bo6"}
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
  game: string;
};

function TopKills({ matches, gameMode, game }: topTenProps) {
  const sortedMatches = [...matches].sort((a, b) => b.kills - a.kills);

  const topTenMatches = sortedMatches.slice(0, 10);

  return (
    <div className="">
      {topTenMatches.map((match, index) => (
        <div key={match.id} className="top-ten-item border-b border-[#444444]">
          <Link
            href={`/dashboard/${game}/${gameMode.toLowerCase()}/match/${
              match.id
            }`}
            className="flex items-center justify-between px-4 py-3 rounded-lg group transition-transform transform hover:scale-105 h-28 xs:h-auto"
          >
            <div>
              <h4 className="font-medium group-hover:underline group-hover:text-bo6-theme">
                Kills: {match.kills}
              </h4>
              <p className=" text-sm text-gray-400  group-hover:text-bo6-theme ">
                {match.matchMap}: <DisplayDate match={match} createdAt={true} />
              </p>
            </div>

            <div
              className={
                index === 0
                  ? ` w-16 bg-gold rounded-full p-1 text-[#333333] flex items-center justify-center space-x-2 `
                  : index === 1
                  ? ` w-16 bg-silver rounded-full p-1 text-[#333333] flex items-center justify-center space-x-2 `
                  : index === 2
                  ? ` w-16 bg-bronze rounded-full p-1 text-[#333333] flex items-center justify-center space-x-2 `
                  : ``
              }
            >
              <FaTrophy className={index < 3 ? `` : `hidden`} />
              <p>{getNumberSuffix(index + 1)} </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function TopDamage({ matches, gameMode, game }: topTenProps) {
  const sortedMatches = [...matches].sort(
    (a, b) => (b.damage || 0) - (a.damage || 0)
  );

  const topTenMatches = sortedMatches.slice(0, 10);

  return (
    <div className=" ">
      {topTenMatches.map((match, index) => (
        <div key={match.id} className="top-ten-item border-b border-[#444444]">
          <Link
            href={`/dashboard/${game}/${gameMode.toLowerCase()}/match/${
              match.id
            }`}
            className="flex items-center justify-between px-4 py-3 rounded-lg group transition-transform transform hover:scale-105 h-28 xs:h-auto"
          >
            <div>
              <h4 className="font-medium group-hover:underline group-hover:text-bo6-theme">
                Damage: {match.damage}
              </h4>
              <p className=" text-sm text-gray-400  group-hover:text-bo6-theme ">
                {match.matchMap}: <DisplayDate match={match} createdAt={true} />
              </p>
            </div>

            <div
              className={
                index === 0
                  ? ` w-16 bg-gold rounded-full p-1 text-[#333333] flex items-center space-x-2 `
                  : index === 1
                  ? ` w-16 bg-silver rounded-full p-1 text-[#333333] flex items-center justify-center  space-x-2 `
                  : index === 2
                  ? ` w-16 bg-bronze rounded-full p-1 text-[#333333] flex items-center justify-center  space-x-2 `
                  : ``
              }
            >
              <FaTrophy className={index < 3 ? `` : `hidden`} />
              <p>{getNumberSuffix(index + 1)} </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
