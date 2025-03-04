"use client";
import { useMemo, useState } from "react";
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
} from "@/lib/stat-utils";
import { TMatch, TMatchQuery } from "@/app/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type GameModeStatsProps = {
  gameMode: string;
  matches: TMatchQuery[];
};

function GameModeStatsCard({ gameMode, matches }: GameModeStatsProps) {
  //sets state for tab for the card
  const [tab, setTab] = useState("total");

  // calculating all the stats needed and memoizing
  const stats = useMemo(() => {
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

    const calcAllStats = (data: TMatchQuery[]) => {
      return {
        totalKdRatio: calcModeKdRatio(data),
        winPercentage: calcWinPercentage(data),
        kdByWin: calcModeKdRatio(data, true),
        kdByLoss: calcModeKdRatio(data, false),
        totalKills: calcModeTotalKills(data),
        totalDeaths: calcModeTotalDeaths(data),
        avgTime: calcAvgTime(data),
        timeByWin: calcAvgTime(data, true),
        timeByLoss: calcAvgTime(data, false),
        killRecord: calcHighestKill(data),
        slayingEfficiency: calcSlayingEfficiency(data),
        mapCount: calcModeMapCount(data),
        avgPlants: calcAvgPlants(data),
        avgDefuses: calcAvgDefuses(data),
        totalAvgDamage: calcAvgDamage(data),
        avgDamageW: calcAvgDamage(data, true),
        avgDamageL: calcAvgDamage(data, false),
      };
    };

    return {
      allMatches: calcAllStats(matches),
      recentMatches: calcAllStats(recentMatches),
      dailyMatches: calcAllStats(dailyMatches),
    };
  }, [matches]);

  //tracks which tab needs which data
  const activeTab =
    tab === "total"
      ? stats.allMatches
      : tab === "lastTen"
      ? stats.recentMatches
      : stats.dailyMatches;

  // tab array to map over so i dont repeat code
  const tabArr = ["total", "lastTen", "daily"];

  return (
    <section className="bg-sidebar border border-[#444444] rounded-lg p-4">
      <Tabs defaultValue="total" onValueChange={(newTab) => setTab(newTab)}>
        <TabsList className="bg-zinc-800 inline-flex">
          <TabsTrigger value="total">Total</TabsTrigger>
          <TabsTrigger value="lastTen">Last 10</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
        {tabArr.map((tab) => (
          <TabsContent value={tab} key={tab}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 xl:grid-cols-4 2xl:flex 2xl:justify-evenly 2xl:flex-wrap mt-4 text-center">
              <SingleStat title="K/D" value={activeTab.totalKdRatio} />
              <SingleStat title="Win %" value={activeTab.winPercentage} />
              <SingleStat title="K/D in W" value={activeTab.kdByWin} />
              <SingleStat title="K/D in L" value={activeTab.kdByLoss} />
              <SingleStat title="Total Kills" value={activeTab.totalKills} />
              <SingleStat title="Total Deaths" value={activeTab.totalDeaths} />
              {gameMode === "Hardpoint" && (
                <>
                  <SingleStat title="Avg Time" value={activeTab.avgTime} />
                  <SingleStat
                    title="Avg Time in W"
                    value={activeTab.timeByWin}
                  />
                  <SingleStat
                    title="Avg Time in L"
                    value={activeTab.timeByLoss}
                  />
                </>
              )}
              {gameMode === "SearchAndDestroy" && (
                <>
                  <SingleStat title="Avg Plants" value={activeTab.avgPlants} />
                  <SingleStat
                    title="Avg Defuses"
                    value={activeTab.avgDefuses}
                  />
                </>
              )}
              <SingleStat title="Highest Kills" value={activeTab.killRecord} />
              <SingleStat
                title="Slaying Efficiency"
                value={activeTab.slayingEfficiency}
                /* TODO: figure out tooltip on mobile */
                /*  icon={IoInformationCircleOutline}
                tooltip="Kill rate as % of total engagements. Higher = better slaying." */
              />
              {tab === "total" || tab === "daily" ? (
                <SingleStat title="Map Count" value={activeTab.mapCount} />
              ) : (
                ""
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
export default GameModeStatsCard;

type SingleStatProps = {
  title: string;
  value: number | string;
  icon?: IconType;
  tooltip?: string;
};

//TODO: style this
function SingleStat({ title, value, icon: Icon, tooltip }: SingleStatProps) {
  const displayValue =
    (typeof value === "number" && isNaN(value)) ||
    value === "NaN" ||
    value === "NaN:NaN"
      ? "--"
      : value;
  return (
    <div className="">
      <div className="">
        <p className="text-sm font-light whitespace-nowrap underline">{title}</p>
        <p>
          {Icon && tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Icon />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="">{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </p>
      </div>

      <p className="text-base font-semibold tracking-tight">{displayValue}</p>
    </div>
  );
}
