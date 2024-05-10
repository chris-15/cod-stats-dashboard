"use client";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcWinPercentage,
  calcOverallKdRatio,
  calcOverallWinPercentage,
} from "@/lib/utils";
import TopCardGameMode from "./TopCardGameMode";

function TopCards() {
  const { matches } = useMatches();
  //console.log(matches)
  const overallKdRatio = calcOverallKdRatio(matches);
  const hpKdRatio = calcModeKdRatio(matches, "Hardpoint");
  const controlKdRatio = calcModeKdRatio(matches, "Control");
  const searchKdRatio = calcModeKdRatio(matches, "SearchAndDestroy");

  const overallWinPercentage = calcOverallWinPercentage(matches);
  const hpWinPercentage = calcWinPercentage(matches, "Hardpoint");
  const controlWinPercentage = calcWinPercentage(matches, "Control");

  const searchWinPercentage = calcWinPercentage(matches, "SearchAndDestroy");

  return (
    <div className="">
      <div>
        <div className="">
          <div className="">
            <h2 className="">
              Overall
            </h2>
          </div>
          <div className="">
            <div>
              <p className="">K/D Ratio</p>
              <p className="">
                {overallKdRatio}
              </p>
            </div>
            <div>
              <p className="">Win %</p>
              <p
                className={
                  overallWinPercentage > 50
                    ? "text-green-500 font-bold text-4xl"
                    : "text-red-500 font-bold text-4xl"
                }
              >
                {overallWinPercentage}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TopCardGameMode
        gameMode="hardpoint"
        kdRatio={hpKdRatio}
        winPercentage={hpWinPercentage}
      />
      <TopCardGameMode
        gameMode="control"
        kdRatio={controlKdRatio}
        winPercentage={controlWinPercentage}
      />
      <TopCardGameMode
        gameMode="searchanddestroy"
        kdRatio={searchKdRatio}
        winPercentage={searchWinPercentage}
      />
    </div>
  );
}
export default TopCards;
