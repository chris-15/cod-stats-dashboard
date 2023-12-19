"use client";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcWinPercentage,
  calcOverallKdRatio,
  calcOverallWinPercentage,
} from "@/lib/utils";
import Link from "next/link";
import GameModeCard from "./GameModeCard";

function TopCards() {
  const { matches } = useMatches();
  //console.log(matches)
  const overallKdRatio = calcOverallKdRatio(matches);
  const hpKdRatio = calcModeKdRatio(matches, "Hardpoint");
  const controlKdRatio = calcModeKdRatio(matches, "Control");
  const searchKdRatio = calcModeKdRatio(matches, "SearchAndDestroy");

  const overallWinPercentage = Math.floor(calcOverallWinPercentage(matches));
  const hpWinPercentage = Math.floor(calcWinPercentage(matches, "Hardpoint"));
  const controlWinPercentage = Math.floor(calcWinPercentage(matches, "Control"));
  const searchWinPercentage = Math.floor(calcWinPercentage(matches, "SearchAndDestroy"));

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 ">
      <GameModeCard
        gameMode="Overall"
        kdRatio={overallKdRatio}
        winPercentage={overallWinPercentage}
      />
      <GameModeCard
        gameMode="hardpoint"
        kdRatio={hpKdRatio}
        winPercentage={hpWinPercentage}
      />
      <GameModeCard
        gameMode="control"
        kdRatio={controlKdRatio}
        winPercentage={controlWinPercentage}
      />
      <GameModeCard
        gameMode="searchanddestroy"
        kdRatio={searchKdRatio}
        winPercentage={searchWinPercentage}
      />
    </div>
  );
}
export default TopCards;
