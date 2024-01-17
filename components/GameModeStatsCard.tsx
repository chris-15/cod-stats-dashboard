"use client";
import { useState } from "react";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcWinPercentage,
  calcModeTotalKills,
  calcModeTotalDeaths,
  calcHighestKill,
  calcSlayingEfficiency,
  calcAvgTime,
  calcModeMapCount,
  calcAvgPlants,
  calcAvgDefuses,
  calcAvgDamage,
} from "@/lib/utils";

type GameModeStatsProp = {
  gameMode: string;
};

function GameModeStatsCard({ gameMode }: GameModeStatsProp) {
  const { matches } = useMatches();

  //sets state for tab for the card
  const [tab, setTab] = useState("tab1");

  //filter to get the gamemodes matches
  const filteredMatches = matches.filter((match) => match.gameMode === gameMode);
  //if user doesnt have 10 matches then just use matches data
  const numMatches = filteredMatches.length < 10 ? filteredMatches.length : 10;
  // get last 10 recent matches
  const recentMatches = filteredMatches.slice(0, numMatches);

  //filter to get daily matches
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyMatches = filteredMatches.filter((match) => {
    const todaysMatchDate = new Date(match.createdAt);
    todaysMatchDate.setHours(0, 0, 0, 0); // doing this because you only want to compare dates not timestamps
    return todaysMatchDate.getTime() === today.getTime();
  });

  // all the stat calculations below- depending on which tab is selected
  const totalKdRatio = calcModeKdRatio(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );
  const winPercentage = calcWinPercentage(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );

  const kdByWin = calcModeKdRatio(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode,
    true
  );

  const kdByLoss = calcModeKdRatio(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode,
    false
  );

  const totalKills = calcModeTotalKills(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );
  const totalDeaths = calcModeTotalDeaths(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );
  const avgTime = calcAvgTime(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );
  const timeByWin = calcAvgTime(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode,
    true
  );
  const timeByLoss = calcAvgTime(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode,
    false
  );

  const killRecord = calcHighestKill(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );
  const slayingEfficiency = calcSlayingEfficiency(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );
  const mapCount = calcModeMapCount(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    gameMode
  );

  const avgPlants = calcAvgPlants(
    tab === "tab1" ? matches: tab === "tab2" ? recentMatches: dailyMatches, gameMode
  );

  const avgDefuses = calcAvgDefuses(  tab === "tab1" ? matches: tab === "tab2" ? recentMatches: dailyMatches, gameMode);

  const totalAvgDamage = calcAvgDamage(
    tab === "tab1" ? matches: tab === "tab2" ? recentMatches: dailyMatches, gameMode
  );

  const avgDamageW = calcAvgDamage(
    tab === "tab1" ? matches: tab === "tab2" ? recentMatches: dailyMatches, gameMode, true
  );

  const avgDamageL = calcAvgDamage(
    tab === "tab1" ? matches: tab === "tab2" ? recentMatches: dailyMatches, gameMode, false
  );


  return (
    <section className=" bg-[#161B22] border border-[#21262D] rounded-lg p-4 relative">
      <div className="absolute top-0 left-0 flex space-x-2">
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab1"
              ? "text-white border-b-2 border-white"
              : "text-gray-300"
          }`}
          onClick={() => setTab("tab1")}
        >
          Total
        </button>
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab2"
              ? "text-white border-b-2 border-white"
              : "text-gray-300"
          }`}
          onClick={() => setTab("tab2")}
        >
          Last 10 Matches
        </button>
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab3"
              ? "text-white border-b-2 border-white"
              : "text-gray-300"
          }`}
          onClick={() => setTab("tab3")}
        >
          Daily
        </button>
      </div>

      <div className="gamemode-stats-card  text-center grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 xl:flex xl:justify-evenly xl:flex-wrap mt-12">
        <div className="">
          <p className="">K/D</p>
          <p className="">{totalKdRatio}</p>
        </div>

        <div>
          <p>Win %</p>
          <p className=""> {winPercentage}</p>
        </div>

        <div>
          <p>K/D in W</p>
          <p className=""> {kdByWin}</p>
        </div>

        <div>
          <p>K/D in L</p>
          <p className="">{kdByLoss}</p>
        </div>

        <div>
          <p>Total Kills</p>
          <p className="">{totalKills}</p>
        </div>

        <div>
          <p>Total Deaths</p>
          <p className="">{totalDeaths}</p>
        </div>

        {gameMode === "Hardpoint" && (
          <>
            <div>
              <p>Avg Time</p>
              <p>{avgTime === "NaN:NaN"? "--" : avgTime}</p>
            </div>
            <div>
              <p>Avg Time in W</p>
              <p className="">{timeByWin === "NaN:NaN" ? "--" : timeByWin}</p>
            </div>

            <div>
              <p>Avg Time in L</p>
              <p className="">{timeByLoss === "NaN:NaN" ? "--" : timeByLoss}</p>
            </div>
          </>
        )}
        {gameMode === "SearchAndDestroy" && (
          <>
          <div>
            <p>Avg Plants</p>
            <p>{avgPlants ? avgPlants: "--"}</p>
          </div>
          <div>
            <p>Avg Defuses</p>
            <p>{avgDefuses ? avgDefuses : "--"}</p>
          </div>
          </>
        )}

        { gameMode === "Control" && (
          <>
          <div>
            <p>Avg Damage</p>
            <p>{totalAvgDamage ? totalAvgDamage : "--" }</p>
          </div>
          {/* unsure if i want to include below */}
         {/*  <div>
            <p>Avg Damage in W</p>
            <p>{avgDamageW}</p>
          </div>
          <div>
            <p>Avg Damage in L</p>
            <p>{avgDamageL}</p>
          </div> */}
          </>
        )}

        <div>
          <p>Highest Kills</p>
          <p className="">{killRecord} </p>
        </div>
        <div>
          <p>Slaying Efficiency</p>
          <p className="">{slayingEfficiency === "NaN" ? "--": slayingEfficiency +' %'}</p>
        </div>
        {tab === "tab1" || tab === "tab3" ? (
          <div>
            <p>Map Count</p>
            <p className="">{mapCount}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
export default GameModeStatsCard;
