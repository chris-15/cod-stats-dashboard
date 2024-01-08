import { TMatch } from "@/app/types";

//function to convert seconds to min:secs string to display on table
export const convertTime = (seconds: number) => {
  const mins: number = Math.floor(seconds / 60);
  const secs: number = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// calculate kd ratio based on game mode / per match result(optional)
export const calcModeKdRatio = (
  matches: TMatch[],
  gameMode: string,
  isWin?: boolean
) => {
  let killSum = 0;
  let deathSum = 0;

  matches.forEach((obj) => {
    if (
      obj.gameMode === gameMode &&
      (isWin === undefined || obj.win === isWin)
    ) {
      killSum += obj.kills;
      deathSum += obj.deaths;
    }
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

  return kdRatio.toFixed(2);
};

//calculate avg kills per gamemode
export const calcAvgKills = (matches: TMatch[], gameMode: string) => {
  let killSum = 0;
  matches.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      killSum += obj.kills;
    }
  });
  const avgKills = matches.length > 0 ? killSum / matches.length : 0;
  return avgKills.toFixed(1);
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

  const winPercentage = +((winSum / totalGames) * 100).toFixed(1);

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

  const winPercentage = +((winSum / totalGames) * 100).toFixed(1);

  return totalGames > 0 ? winPercentage : 0;
};

// calculates toatl kills based on mode
export const calcModeTotalKills = (matches: TMatch[], gameMode: string) => {
  let killSum = 0;

  matches.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      killSum += obj.kills;
    }
  });

  return killSum;
};

// calculates total deaths based on mode
export const calcModeTotalDeaths = (matches: TMatch[], gameMode: string) => {
  let deathSum = 0;

  matches.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      deathSum += obj.deaths;
    }
  });

  return deathSum;
};

//calc avg time / per match result (optional)
export const calcAvgTime = (
  matches: TMatch[],
  gameMode: string,
  isWin?: boolean
) => {
  let timeSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (
      obj.gameMode === gameMode &&
      obj.time &&
      (isWin === undefined || obj.win === isWin)
    ) {
      timeSum += obj.time;
      totalGames++;
    }
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const avgTime = convertTime(Math.floor(timeSum / totalGames));

  return avgTime;
};

//calculate Highest Kill in single match
export const calcHighestKill = (matches: TMatch[], gameMode: string) => {
  let highestKills = 0;

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].gameMode === gameMode && matches[i].kills > highestKills) {
      highestKills = matches[i].kills;
    }
  }
  return highestKills;
};

//calculate slaying efficiency
export const calcSlayingEfficiency = (matches: TMatch[], gameMode: string) => {
  let killSum = 0;
  let deathSum = 0;
  matches.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      killSum += obj.kills;
      deathSum += obj.deaths;
    }
  });

  const slayingEfficiency = ((killSum / (killSum + deathSum)) * 100).toFixed(2);
  return slayingEfficiency;
};

//calculate total map count per mode
export const calcModeMapCount = (match: TMatch[], gameMode: string) => {
  let mapCount = 0;

  match.forEach((obj) => {
    if (obj.gameMode === gameMode) {
      mapCount++;
    }
  });

  return mapCount;
};

// calculate avg plants per mode
export const calcAvgPlants = (matches: TMatch[], gameMode: string) => {
  let plantsSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (obj.gameMode === gameMode && obj.plants !== null) {
      plantsSum += obj.plants;
      totalGames++;
    }
  });

  const avgPlants = parseFloat((plantsSum / totalGames).toFixed(1));

  return avgPlants;
};

// calculate avg defuses per mode
export const calcAvgDefuses = (matches: TMatch[], gameMode: string) => {
  let defusesSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (obj.gameMode === gameMode && obj.defuses !== null) {
      defusesSum += obj.defuses;
      totalGames++;
    }
  });

  const avgDefuses = parseFloat((defusesSum / totalGames).toFixed(1));

  return avgDefuses;
};

// calculate avg damage per mode / per match result(optional)
export const calcAvgDamage = (
  matches: TMatch[],
  gameMode: string,
  isWin?: boolean
) => {
  let damageSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (
      obj.gameMode === gameMode &&
      obj.damage != null &&
      (isWin === undefined || obj.win === isWin)
    ) {
      damageSum += obj.damage;
      totalGames++;
    }
  });
  const avgDamage = Math.floor(damageSum / totalGames);
  return avgDamage;
};

//function to calculate map score based on weighted win percentage and weighted kd ratio
export const calcMapScore = (matches: TMatch[], gameMode: string) => {
  let winWeight = 0.6;
  let kdWeight = 0.4;

  return (
    winWeight * calcWinPercentage(matches, gameMode) +
    kdWeight * parseFloat(calcModeKdRatio(matches, gameMode))
  );
};
