import { TMatch, TMatchQuery } from "@/app/types";

//function to convert seconds to min:secs string to display on table
export const convertTime = (seconds: number | null) => {
  if (seconds === null) {
    return "--";
  }
  const mins: number = Math.floor(seconds / 60);
  const secs: number = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// calculate kd ratio / per match result(optional)
export const calcModeKdRatio = (matches: TMatchQuery[], isWin?: boolean) => {
  let killSum = 0;
  let deathSum = 0;

  matches.forEach((obj) => {
    if (isWin === undefined || obj.win === isWin) {
      killSum += obj.kills;
      deathSum += obj.deaths;
    }
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const kdRatio = deathSum !== 0 ? +(killSum / deathSum) : +(killSum / 1);

  return kdRatio.toFixed(2);
};

//calculate avg kills
export const calcAvgKills = (matches: TMatchQuery[]) => {
  let killSum = 0;
  matches.forEach((obj) => {
    killSum += obj.kills;
  });
  const avgKills = matches.length > 0 ? killSum / matches.length : 0;
  return avgKills.toFixed(1);
};

// calculate win percentage based on game mode
export const calcWinPercentage = (matches: TMatchQuery[]) => {
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

// calculate kd ratio accross all modes
export const calcOverallKdRatio = (matches: TMatchQuery[]) => {
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
export const calcOverallWinPercentage = (matches: TMatchQuery[]) => {
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

// calculates total kills
export const calcModeTotalKills = (matches: TMatchQuery[]) => {
  let killSum = 0;

  matches.forEach((obj) => {
    killSum += obj.kills;
  });

  return killSum;
};

// calculates total deaths based on mode
export const calcModeTotalDeaths = (matches: TMatchQuery[]) => {
  let deathSum = 0;

  matches.forEach((obj) => {
    deathSum += obj.deaths;
  });

  return deathSum;
};

//calc avg time / per match result (optional)
export const calcAvgTime = (matches: TMatchQuery[], isWin?: boolean) => {
  let timeSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (obj.time && (isWin === undefined || obj.win === isWin)) {
      timeSum += obj.time;
      totalGames++;
    }
  });

  // if no deaths dont penalize kd ratio just divide by 1
  const avgTime = convertTime(Math.floor(timeSum / totalGames));

  return avgTime;
};

//calculate Highest Kill in single match
export const calcHighestKill = (matches: TMatchQuery[]) => {
  let highestKills = 0;

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].kills > highestKills) {
      highestKills = matches[i].kills;
    }
  }
  return highestKills;
};

//calculate slaying efficiency
export const calcSlayingEfficiency = (matches: TMatchQuery[]) => {
  let killSum = 0;
  let deathSum = 0;
  matches.forEach((obj) => {
    killSum += obj.kills;
    deathSum += obj.deaths;
  });

  const slayingEfficiency = ((killSum / (killSum + deathSum)) * 100).toFixed(2);
  return slayingEfficiency;
};

//calculate total map count
export const calcModeMapCount = (match: TMatchQuery[]) => {
  let mapCount = 0;

  match.forEach((obj) => {
    mapCount++;
  });

  return mapCount;
};

// calculate avg plants per mode
export const calcAvgPlants = (matches: TMatchQuery[]) => {
  let plantsSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (obj.plants !== null) {
      plantsSum += obj.plants;
      totalGames++;
    }
  });

  const avgPlants = parseFloat((plantsSum / totalGames).toFixed(1));

  return avgPlants;
};

// calculate avg defuses per mode
export const calcAvgDefuses = (matches: TMatchQuery[]) => {
  let defusesSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (obj.defuses !== null) {
      defusesSum += obj.defuses;
      totalGames++;
    }
  });

  const avgDefuses = parseFloat((defusesSum / totalGames).toFixed(1));

  return avgDefuses;
};

// calculate avg damage per mode / per match result(optional)
export const calcAvgDamage = (matches: TMatchQuery[], isWin?: boolean) => {
  let damageSum = 0;
  let totalGames = 0;

  matches.forEach((obj) => {
    if (obj.damage != null && (isWin === undefined || obj.win === isWin)) {
      damageSum += obj.damage;
      totalGames++;
    }
  });
  const avgDamage = Math.floor(damageSum / totalGames);
  return avgDamage;
};

//function to calculate map score based on weighted win percentage and weighted kd ratio
export const calcMapScore = (matches: TMatchQuery[], gameMode: string) => {
  let winWeight = 0.6;
  let kdWeight = 0.4;

  return (
    winWeight * calcWinPercentage(matches) +
    kdWeight * parseFloat(calcModeKdRatio(matches))
  );
};


export const getNumberSuffix = (i: number) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}
