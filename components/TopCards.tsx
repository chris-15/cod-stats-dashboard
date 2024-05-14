import { getMatches } from "@/server/queries";
import { calcOverallKdRatio, calcOverallWinPercentage } from "@/lib/utils";
import TopCardGameMode from "./TopCardGameMode";
import { TMatchQuery } from "@/app/types";

async function TopCards() {
  const matches = await getMatches();

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
    <div className="">
      <div>
        <div className="">
          <div className="">
            <h2 className="">Overall</h2>
          </div>
          <div className="">
            <div>
              <p className="">K/D Ratio</p>
              <p className="">{overallKdRatio}</p>
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
