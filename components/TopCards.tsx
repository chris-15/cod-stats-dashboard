"use client";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcWinPercentage,
  calcTotalKdRatio,
} from "@/lib/utils";
import Link from "next/link";
import GameModeCard from "./GameModeCard";

function TopCards() {
  const { matches } = useMatches();
  //console.log(matches)
  const overalKdRatio = calcTotalKdRatio(matches);
  const hpKdRatio = calcModeKdRatio(matches, "Hardpoint");
  const controlKdRatio = calcModeKdRatio(matches, "Control");
  const searchKdRatio = calcModeKdRatio(matches, "SearchAndDestroy");

  const hpWinPercentage = calcWinPercentage(matches, "Hardpoint");
  const controlWinPercentage = calcWinPercentage(matches, "Control");
  const searchWinPercentage = calcWinPercentage(matches, "SearchAndDestroy");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 ">
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
