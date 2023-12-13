"use client";
import { useMatches } from "./matchesContext";
import { calcModeKdRatio, calcModeKdByResult, calcKdByMap } from "@/lib/utils";

type GameModeStatsProp = {
  gameMode: string
}

function MapStatsCard({gameMode}:GameModeStatsProp) {
  const { matches } = useMatches();

  const totalKdRatio = calcModeKdRatio(matches, gameMode);
  const kdByWin = calcModeKdByResult(matches, gameMode, true);
  const kdByLoss = calcModeKdByResult(matches, gameMode, false);


  return (
    <div>
      <p>
        Mode KD: <span>{totalKdRatio}</span>
      </p>
      <p>
        KD in Wins: <span> {kdByWin}</span>
      </p>
      <p>
        KD in Losses: <span>{kdByLoss}</span>
      </p>
    </div>
  );
}
export default MapStatsCard;
