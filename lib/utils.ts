import { Match } from "@/app/types";

export const calcModeKdRatio = (matches: Match[], gameMode: string) => {
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

export const calcWinPercentage = (matches: Match[], gameMode: string) => {
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


export const calcTotalKdRatio = (matches:Match[]) =>{
  let killSum = 0;
  let deathSum = 0;

  matches.forEach((obj) => {
      killSum += obj.kills;
      deathSum += obj.deaths;
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

  return kdRatio.toFixed(2);
}