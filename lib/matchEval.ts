import { TMatchQuery } from "@/types";
import { add, divide, exp, round } from "mathjs";

//using Dr. Doug Liebe equation for expected Wins and dominance
//  xWin = 1 / [1 + e ^ (-k * MoV)]
// source: https://doug-liebe.medium.com/how-badly-did-we-get-beaten-2adc32e3e617
// MoV = Margin of Victory,
// k coefficient for different game modes, HP = 0.02623967, CTL = 1.155606, SND = 0.7378999

// using mathjs for calculations with exponentials is more accurate than js Math.

const kCoefficients = {
  Hardpoint: 0.02623967,
  Control: 1.155606,
  SearchAndDestroy: 0.7378999,
};

// in our context since we dont play in match series like the cdl, this calculation will demonstrate match dominance in a single match.
export function calcXWin(match: TMatchQuery): number {
  const k: number = kCoefficients[match.gameMode as keyof typeof kCoefficients];

  if (match.teamScore === null || match.enemyScore === null) {
    return 0;
  }

  const MoV = add(match.teamScore, -match.enemyScore);

  const exponential = exp(-k * MoV);
  const denominator = add(1, exponential);
  const xWin = divide(1, denominator);

  return round(xWin, 2) * 100;
}

export function newEvalPerformance(match: TMatchQuery) {
  const { gameMode, kills, deaths, win } = match;
  const xWin = calcXWin(match);
  const result = win ? "win" : "loss";

  //diff xwin tiers for the diff game modes
  const getXWinRating = (xWin: number, gameMode: string) => {
    switch (gameMode) {
      case "Hardpoint":
        return xWin >= 80
          ? "dominantWin"
          : xWin > 60
          ? "averageWin"
          : xWin > 50
          ? "closeWin"
          : xWin > 40
          ? "closeLoss"
          : xWin > 20
          ? "averageLoss"
          : "blowoutLoss";

      case "SearchAndDestroy":
        return xWin >= 80
          ? "dominantWin"
          : xWin > 60
          ? "averageWin"
          : xWin > 50
          ? "closeWin"
          : xWin > 30
          ? "closeLoss"
          : xWin > 15
          ? "averageLoss"
          : "blowoutLoss";

      case "Control":
        return xWin >= 90
          ? "dominantWin"
          : xWin > 80
          ? "averageWin"
          : xWin > 50
          ? "closeWin"
          : xWin > 20
          ? "closeLoss"
          : xWin > 10
          ? "averageLoss"
          : "blowoutLoss";

      default:
        return "averageWin";
    }
  };

  const xWinRating = getXWinRating(xWin, gameMode);

  const kdRatio = round(deaths !== 0 ? divide(kills, deaths) : kills, 2);

  const kdRating =
    kdRatio >= 1.5
      ? "excellentKd"
      : kdRatio > 1.0
      ? "goodKd"
      : kdRatio < 1
      ? "badKd"
      : "evenKd";

  const newMatchTitle =
    titles[result as keyof typeof titles][
      xWinRating as keyof (typeof titles)[keyof typeof titles]
    ][kdRating as keyof typeof kdDescriptions];

  const performanceDescription =
    descriptions[result as "win" | "loss"][
      xWinRating as keyof (typeof descriptions)["win" | "loss"]
    ];
  const kdDescription = kdDescriptions[kdRating as keyof typeof kdDescriptions];

  const newMatchSummary = `${performanceDescription} ${kdDescription}`;

  return { newMatchTitle, newMatchSummary };
}

const descriptions = {
  win: {
    closeWin:
      "In a nail-biting finish, you helped secure a close victory. Every point mattered and your contribution made the difference.",
    averageWin:
      "Solid team victory! Your consistent performance and objective play were key factors in the team's success.",
    dominantWin:
      "Complete domination! Your exceptional gameplay and strategic decisions led to an overwhelming victory.",
  },
  loss: {
    closeLoss:
      "A hard-fought battle that came down to the wire. Your resilience kept us competitive until the very end.",
    averageLoss:
      "Despite the loss, you showed moments of skill. Focus on consistency and maintaining map control.",
    blowoutLoss:
      "A challenging match against strong opposition. Use this as motivation to improve your gameplay and strategic approach.",
  },
};

const kdDescriptions = {
  excellentKd:
    "Your outstanding K/D ratio shows complete control of engagements.",
  goodKd: "Your positive K/D ratio demonstrates solid gunfight skills.",
  evenKd: "You maintained an even K/D, trading effectively with opponents.",
  badKd:
    "Work on improving your K/D by choosing engagements carefully and using cover effectively.",
};

const titles = {
  win: {
    dominantWin: {
      excellentKd: "Absolutely Dominant!",
      goodKd: "Outstanding Victory!",
      evenKd: "Solid Victory!",
      badKd: "Team Triumph!",
    },
    averageWin: {
      excellentKd: "Strong Performance!",
      goodKd: "Well Played!",
      evenKd: "Steady Winner!",
      badKd: "Mission Accomplished!",
    },
    closeWin: {
      excellentKd: "Clutch Performance!",
      goodKd: "Hard-fought Victory!",
      evenKd: "Close Call Winner!",
      badKd: "Scrappy Victory!",
    },
  },
  loss: {
    closeLoss: {
      excellentKd: "Valiant Effort!",
      goodKd: "Nearly There!",
      evenKd: "Close Call!",
      badKd: "Keep Fighting!",
    },
    averageLoss: {
      excellentKd: "Strong Individual Effort!",
      goodKd: "Room for Improvement!",
      evenKd: "Learning Experience!",
      badKd: "Keep Your Head Up!",
    },
    blowoutLoss: {
      excellentKd: "Standing Strong!",
      goodKd: "Better Luck Next Time!",
      evenKd: "Time to Regroup!",
      badKd: "Back to Training!",
    },
  },
};
