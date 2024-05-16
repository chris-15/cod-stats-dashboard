import { authOptions } from "@/lib/auth";
import { convertTime } from "@/lib/utils";
import { deleteMatch, getMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function GameModeMatchId({
  params: { id: id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const matchId = id;

  const match = await getMatchById(matchId);
  const mapImages = {
    Highrise:
      "https://utfs.io/f/211e55aa-e30d-4a7c-b3c6-bb292f21eb2e-ewvcet.jpeg",
    Invasion:
      "https://utfs.io/f/edae0bda-acc7-4e7a-8316-f7b43ba3cb3b-n9gwg5.jpeg",
    Karachi:
      "https://utfs.io/f/5f72c810-7f18-4811-ad2b-5077bd0078e8-3lu2zl.jpeg",
    Rio: "https://utfs.io/f/64f2610a-2466-4b6f-ac0f-eb38cb89022f-1qm0.webp",
    Skidrow:
      "https://utfs.io/f/db0224e4-893a-4974-b6ce-19466cf8a297-nnbmah.jpeg",
    Terminal:
      "https://utfs.io/f/5394efdc-5ff5-4eb4-b11d-bf9a7f3fb4d1-6lburo.jpeg",
    SixStar:
      "https://utfs.io/f/44e16bbf-b506-4247-991e-cf710c3c5730-qap3t5.jpeg",
    SubBase:
      "https://utfs.io/f/96dd17f4-faf5-4ff0-ba5c-bd049a14c89a-j0rkzz.jpeg",
    Vista: "https://utfs.io/f/65c7db3a-ffec-4b5f-8ab2-17bc037cbb0d-1cmood.jpeg",
  };

  const performanceDescriptions = {
    win: {
      goodKd: {
        high: "You were the star of the match, delivering both high kills and damage. Your performance was instrumental in securing the victory.",
        low: "You demonstrated a strategic playstyle, securing key kills even with low overall damage. Your precision played a crucial role in the team's victory.",
      },
      badKd: {
        high: "Despite a lower kill count, your high damage output disrupted the enemy team and contributed to the win. Your aggressive playstyle created opportunities for your team.",
        low: "You won the match, but there's potential for you to contribute more in terms of kills and damage. Remember, every bit of damage counts towards the team's success.",
      },
      evenKd: {
        high: "You had a balanced kill-death ratio and high damage, contributing to the team's victory. Your balanced playstyle was effective.",
        low: "You won the match with a balanced kill-death ratio, but your damage was on the lower side. A bit more aggression could enhance your impact.",
      },
    },
    loss: {
      goodKd: {
        high: "Even in defeat, your performance stood out with high kills and damage. You fought hard, and your efforts kept the team in the game.",
        low: "Despite the loss, your kill count was impressive. However, increasing your damage output could turn future games in your favor.",
      },
      badKd: {
        high: "You dealt a lot of damage but couldn't secure enough kills. Converting that damage into eliminations could change the outcome of the match.",
        low: "The match didn't go as planned, and there's room for improvement in both kills and damage. Keep practicing, and you'll see better results.",
      },
      evenKd: {
        high: "Despite the loss, your balanced kill-death ratio and high damage show potential. Keep up the pressure in future matches.",
        low: "You maintained a balanced kill-death ratio, but the low damage output couldn't turn the tide. Try to focus on dealing more damage in the next match.",
      },
    },
  };

  const titles = {
    win: {
      goodKd: {
        high: "Outstanding Victory!",
        low: "Tactical Victory!",
      },
      badKd: {
        high: "Strategic Victory!",
        low: "Hard-fought Victory!",
      },
      evenKd: {
        high: "Balanced Powerhouse!",
        low: "Steady Winner!",
      },
    },
    loss: {
      goodKd: {
        high: "Valiant Effort!",
        low: "Unlucky!",
      },
      badKd: {
        high: "So Close!",
        low: "Better Luck Next Time!",
      },
      evenKd: {
        high: "Close Call!",
        low: "Steady Struggle!",
      },
    },
  };

  function evaluatePerformance(
    kills: number,
    deaths: number,
    damage: number | null,
    matchResult: boolean
  ) {
    const kdRating =
      kills / deaths > 1 ? "goodKd" : kills / deaths < 1 ? "badKd" : "evenKd";

    const damageRating =
      damage !== null && damage >= kills * damage ? "high" : "low";

    const result = matchResult ? "win" : "loss";

    const performance = performanceDescriptions[result][kdRating][damageRating];
    const title = titles[result][kdRating][damageRating];

    return { performance, title };
  }

  const { title, performance } = evaluatePerformance(
    match.kills,
    match.deaths,
    match.damage,
    match.win
  );

  return (
    <>
      <a href={`/dashboard/${match.gameMode.toLowerCase()}`}>
        <p className=""> {`<- ${match.gameMode}`}</p>
      </a>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl max-h-screen mx-auto py-6 px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Match Stats</h2>
            <div className="mt-6">
              {/* <h3 className="text-lg font-medium mb-2">Top Performers</h3> */}
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  Match Result: {match.win ? "Win" : "Loss"}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  Kills: {match.kills}{" "}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  Deaths: {match.deaths}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  Damage: {match.damage}
                </p>
                {match.gameMode === "Hardpoint" && (
                  <p className="text-gray-500 dark:text-gray-400 mb-1">
                    Time: {convertTime(match.time)}
                  </p>
                )}
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  KD Ratio: {(match.kills / match.deaths).toFixed(2)}
                </p>
                {match.gameMode === "SearchAndDestroy" && (
                  <>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">
                      Plants: {match.plants}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">
                      Defuses: {match.defuses}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Match Summary
            </p>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{performance}</p>
          </div>
        </div>

        <div className="space-y-6 order-first lg:order-last">
          <Image
            alt="Match Image"
            className="rounded-lg shadow-lg"
            height={500}
            src={mapImages[match.matchMap]}
            style={{
              objectFit: "contain",
            }}
            width={800}
          />
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <p>Map: {match.matchMap}</p>
            <p>
              Match Played on: {match.createdAt.toLocaleDateString()} at{" "}
              {match.createdAt.toLocaleTimeString()}
            </p>
            <div >
              <form action={async() =>{
                'use server';

                await deleteMatch(match.id)
              }}> 
              <button type="submit" className=" bg-red-500 p-2 rounded-lg">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
