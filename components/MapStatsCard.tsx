"use client";
import { useMatches } from "./matchesContext";
import { calcModeKdRatio, calcModeKdByResult, calcKdByMap } from "@/lib/utils";



function MapStatsCard() {
  const { matches } = useMatches();

  const totalKdRatio = calcModeKdRatio(matches, "Hardpoint");
  const kdByWin = calcModeKdByResult(matches, "Hardpoint", true);
  const kdByLoss = calcModeKdByResult(matches, "Hardpoint", false);



  return (
    <div>
      <p>
        HP KD: <span>{totalKdRatio}</span>
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
