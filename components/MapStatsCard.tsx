"use client";
import { useMatches } from "./matchesContext";
import { calcModeKdRatio, calcModeKdByResult, calcKdByMap } from "@/lib/utils";

type GameModeStatsProp = {
  gameMode: string
}

function MapStatsCard({gameMode}:GameModeStatsProp) {
  const { matches } = useMatches();
  //console.log(matches)

  const totalKdRatio = calcModeKdRatio(matches, gameMode);
  const kdByWin = calcModeKdByResult(matches, gameMode, true);
  const kdByLoss = calcModeKdByResult(matches, gameMode, false);
  //const karachiKD = calcKdByMap(matches, gameMode, 'Karachi');
  //console.log(karachiKD)
  


  return (
    <section>

    <div className="flex flex-row justify-between px-2">
      <p>
        {gameMode ==="SearchAndDestroy"? "S&D": gameMode } KD: <span>{totalKdRatio}</span>
      </p>
      <p>
        KD in Wins: <span> {kdByWin}</span>
      </p>
      <p>
        KD in Losses: <span>{kdByLoss}</span>
      </p>
    </div>

    <div>

    </div>
    </section>
  );
}
export default MapStatsCard;
