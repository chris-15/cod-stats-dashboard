import { TMatch } from "@/app/types";
// calculate kd ratio based on game mode
export const calcModeKdRatio = (matches: TMatch[], gameMode: string) => {
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
// calculate win percentage based on game mode
export const calcWinPercentage = (matches: TMatch[], gameMode: string) => {
  let winSum = 0;
  let totalGames = 0;
  matches.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      // + operator turns obj.win = true => obj.win = 1
      winSum += +obj.win;
      totalGames++;
    }
  });

  const winPercentage = +((winSum / totalGames) * 100).toFixed(2);

  return totalGames > 0 ? winPercentage : 0;
};

// calculate kd ratio accross all modes
export const calcOverallKdRatio = (matches: TMatch[]) => {
  let killSum = 0;
  let deathSum = 0;

  matches.forEach((obj) => {
    killSum += obj.kills;
    deathSum += obj.deaths;
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

  return kdRatio.toFixed(2);
};
//calculate overall win percentage
export const calcOverallWinPercentage = (matches: TMatch[]) => {
  let winSum = 0;
  let totalGames = 0;
  matches.forEach((obj) => {
    // + operator turns obj.win = true => obj.win = 1
    winSum += +obj.win;
    totalGames++;
  });

  const winPercentage = +((winSum / totalGames) * 100).toFixed(2);

  return totalGames > 0 ? winPercentage : 0;
};

// calculate kd in specific game mode based on match result
export const calcModeKdByResult = (
  matches: TMatch[],
  gameMode: string,
  isWin: boolean
) => {
  let killSum = 0;
  let deathSum = 0;

  matches.forEach((obj) => {
    if (obj.gameMode === gameMode && obj.win === isWin) {
      killSum += obj.kills;
      deathSum += obj.deaths;
    }
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

  return kdRatio.toFixed(2);
};

export const calcKdByMap = (
  matches: TMatch[],
  gameMode: string,
  matchMap: string
) => {
  let killSum = 0;
  let deathSum = 0;

  matches.forEach((obj) => {
    if (obj.gameMode === gameMode && obj.matchMap === matchMap) {
      killSum += obj.kills;
      deathSum += obj.deaths;
    }
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

  return kdRatio.toFixed(2);
};
