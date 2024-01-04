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
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 ">
      <div>
        <div className="bg-[#161B22] border border-[#21262D] rounded-lg py-2">
          <div className="">
            <h2 className="text-center font-bold capitalize text-xl mb-5 text-gray-200">
              Overall
            </h2>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#333333] text-center">
            <div>
              <p className="text-lg font-semibold text-gray-300">K/D Ratio</p>
              <p className="font-bold text-4xl text-gray-200">
                {overallKdRatio}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">Win %</p>
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
