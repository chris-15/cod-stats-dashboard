import { getMatches } from "@/server/queries";
import { calcOverallKdRatio, calcOverallWinPercentage } from "@/lib/stat-utils";
import TopCardGameMode from "./TopCardGameMode";
import { TMatchQuery } from "@/app/types";

function TopCards({
  matches,
  game,
}: {
  matches: TMatchQuery[];
  game: string;
}) {
  const calcKd = (matches: TMatchQuery[], gameMode: string) => {
    let killSum = 0;
    let deathSum = 0;

    matches.forEach((obj) => {
      if (obj.gameMode === gameMode) {
        killSum += obj.kills;
        deathSum += obj.deaths;
      }
    });

    // if no deaths dont penalize kd ratio just divide by 1
    const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

    return kdRatio.toFixed(2);
  };

  const calcWinByMode = (matches: TMatchQuery[], gameMode: string) => {
    let winSum = 0;
    let totalGames = 0;
    matches.forEach((obj) => {
      if (obj.gameMode === gameMode) {
        // + operator turns obj.win = true => obj.win = 1
        winSum += +obj.win;
        totalGames++;
      }
    });

    const winPercentage = +((winSum / totalGames) * 100).toFixed(1);

    return totalGames > 0 ? winPercentage : 0;
  };

  const overallKdRatio = calcOverallKdRatio(matches);
  const hpKdRatio = calcKd(matches, "Hardpoint");
  const controlKdRatio = calcKd(matches, "Control");
  const searchKdRatio = calcKd(matches, "SearchAndDestroy");

  const overallWinPercentage = calcOverallWinPercentage(matches);
  const hpWinPercentage = calcWinByMode(matches, "Hardpoint");
  const controlWinPercentage = calcWinByMode(matches, "Control");

  const searchWinPercentage = calcWinByMode(matches, "SearchAndDestroy");

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
      <div className="border  rounded-lg py-2 bg-sidebar">
        <div className="">
          <h2 className="text-center font-bold capitalize text-xl mb-5">
            Overall
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-x divide-[#444444] text-center">
          <div>
            <p className="text-lg font-semibold ">K/D Ratio</p>
            <p className="font-bold text-4xl  ">{overallKdRatio}</p>
          </div>
          <div>
            <p className="text-lg font-semibold  ">Win %</p>
            <p
              className={
                overallWinPercentage > 50
                  ? game === "mw3"
                    ? "text-[#b0ff34] font-bold text-4xl"
                    : "text-green-500 font-bold text-4xl"
                  : "text-[#ff4d4d] font-bold text-4xl"
              }
            >
              {overallWinPercentage}
            </p>
          </div>
        </div>
      </div>

      <TopCardGameMode
        game={game}
        gameMode="hardpoint"
        kdRatio={hpKdRatio}
        winPercentage={hpWinPercentage}
      />
      <TopCardGameMode
        game={game}
        gameMode="control"
        kdRatio={controlKdRatio}
        winPercentage={controlWinPercentage}
      />
      <TopCardGameMode
        game={game}
        gameMode="searchanddestroy"
        kdRatio={searchKdRatio}
        winPercentage={searchWinPercentage}
      />
    </div>
  );
}
export default TopCards;
