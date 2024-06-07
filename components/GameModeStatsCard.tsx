"use client";
import { useState } from "react";
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
import { TMatch, TMatchQuery } from "@/app/types";

type GameModeStatsProps = {
  gameMode: string;
  matches: TMatchQuery[];
};

function GameModeStatsCard({ gameMode, matches }: GameModeStatsProps) {
  //sets state for tab for the card
  const [tab, setTab] = useState("tab1");

  //filter to get the gamemodes matches
  /* const filteredMatches = matches.filter(
    (match) => match.gameMode === gameMode
  ); */
  //if user doesnt have 10 matches then just use matches data
  const numMatches = matches.length < 10 ? matches.length : 10;
  // get last 10 recent matches
  const recentMatches = matches.slice(0, numMatches);

  //filter to get daily matches
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyMatches = matches.filter((match) => {
    const todaysMatchDate = new Date(match.createdAt);
    todaysMatchDate.setHours(0, 0, 0, 0); // doing this because you only want to compare dates not timestamps
    return todaysMatchDate.getTime() === today.getTime();
  });

  // all the stat calculations below- depending on which tab is selected
  const totalKdRatio = calcModeKdRatio(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );
  const winPercentage = calcWinPercentage(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );

  const kdByWin = calcModeKdRatio(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    true
  );

  const kdByLoss = calcModeKdRatio(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    false
  );

  const totalKills = calcModeTotalKills(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );
  const totalDeaths = calcModeTotalDeaths(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );
  const avgTime = calcAvgTime(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );
  const timeByWin = calcAvgTime(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    true
  );
  const timeByLoss = calcAvgTime(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    false
  );

  const killRecord = calcHighestKill(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );
  const slayingEfficiency = calcSlayingEfficiency(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );
  const mapCount = calcModeMapCount(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );

  const avgPlants = calcAvgPlants(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );

  const avgDefuses = calcAvgDefuses(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );

  const totalAvgDamage = calcAvgDamage(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches
  );

  const avgDamageW = calcAvgDamage(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    true
  );

  const avgDamageL = calcAvgDamage(
    tab === "tab1" ? matches : tab === "tab2" ? recentMatches : dailyMatches,
    false
  );

  return (
    <section className="bg-secondary-bg border border-[#444444] rounded-lg p-4 relative">
      <div className="absolute top-0 left-0 flex space-x-2">
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab1"
              ? "text-white border-b-2 border-white"
              : "text-gray-300"
          }`}
          onClick={() => setTab("tab1")}
        >
          <span className="hover:bg-gray-200 hover:bg-opacity-25 rounded-lg px-2 hover:py-1">Total</span>
        </button>
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab2"
              ? "text-white border-b-2 border-white"
              : "text-gray-300"
          }`}
          onClick={() => setTab("tab2")}
        >
          <span className="hover:text-white hover:bg-gray-200 hover:bg-opacity-25 rounded-lg px-2 hover:py-1">Last 10</span>
        </button>
        <button
          className={`py-2 px-4 m-2 ${
            tab === "tab3"
              ? "text-white border-b-2 border-white"
              : "text-gray-300"
          }`}
          onClick={() => setTab("tab3")}
        >
          <span className="hover:text-white hover:bg-gray-200 hover:bg-opacity-25 rounded-lg px-2 hover:py-1">Daily</span>
        </button>
      </div>

      <div className="text-center grid grid-cols-2 md:grid-cols-3 gap-4 xl:grid-cols-4 2xl:flex 2xl:justify-evenly 2xl:flex-wrap mt-12">
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
              <p>{avgTime === "NaN:NaN" ? "--" : avgTime}</p>
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
              <p>{avgPlants ? avgPlants : "--"}</p>
            </div>
            <div>
              <p>Avg Defuses</p>
              <p>{avgDefuses ? avgDefuses : "--"}</p>
            </div>
          </>
        )}

        {gameMode === "Control" && (
          <>
            <div>
              <p>Avg Damage</p>
              <p>{totalAvgDamage ? totalAvgDamage : "--"}</p>
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
          <p className="">
            {slayingEfficiency === "NaN" ? "--" : slayingEfficiency + " %"}
          </p>
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
