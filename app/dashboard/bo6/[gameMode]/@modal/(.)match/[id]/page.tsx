import { authOptions } from "@/lib/auth";
import { deleteBoSixMatch, getBoSixMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Modal } from "./modal";
import Image from "next/image";
import { convertTime } from "@/lib/utils";
import Link from "next/link";

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

  const match = await getBoSixMatchById(matchId);

  const mapImages = {
    Protocol:
      "https://utfs.io/f/g0j2nElFVrus8wZCXNDDZXVfb9JnyAaEwWHYLigBkSvetxMO",
    RedCard:
      "https://utfs.io/f/g0j2nElFVrusl8crIkTv4NcXE3wFjT1gHVZSQz59oOrnG2Pa",
    Rewind:
      "https://utfs.io/f/g0j2nElFVrusZR73l0cqTvVfrciOM8GgNbsy2x7o30DPtemR",
    Skyline:
      "https://utfs.io/f/g0j2nElFVruswHLllWOfO9o1egZTj52BNhktAH0bDSqWRsvQ",
    Vault: "https://utfs.io/f/g0j2nElFVrusyqrQlPL1zm7ZQcS8jf2DOXueAJwVlrbLgCM0",
  };

  const performanceDescriptions = {
    win: {
      goodKd: {
        highDamage:
          "You were the star of the match, delivering both high kills and damage. Your performance was instrumental in securing the victory.",
        lowDamage:
          "You demonstrated a strategic playstyle, securing key kills even with low overall damage. Your precision played a crucial role in the team's victory.",
      },
      badKd: {
        highDamage:
          "Despite a lower kill count, your high damage output disrupted the enemy team and contributed to the win. Your aggressive playstyle created opportunities for your team.",
        lowDamage:
          "You won the match, but there's potential for you to contribute more in terms of kills and damage. Remember, every bit of damage counts towards the team's success.",
      },
      evenKd: {
        highDamage:
          "You had a balanced kill-death ratio and high damage, contributing to the team's victory. Your balanced playstyle was effective.",
        lowDamage:
          "You won the match with a balanced kill-death ratio, but your damage was on the lower side. A bit more aggression could enhance your impact.",
      },
    },
    loss: {
      goodKd: {
        highDamage:
          "Even in defeat, your performance stood out with high kills and damage. You fought hard, and your efforts kept the team in the game.",
        lowDamage:
          "Despite the loss, your kill count was impressive. However, increasing your damage output could turn future games in your favor.",
      },
      badKd: {
        highDamage:
          "You dealt a lot of damage but couldn't secure enough kills. Converting that damage into eliminations could change the outcome of the match.",
        lowDamage:
          "The match didn't go as planned, and there's room for improvement in both kills and damage. Keep practicing, and you'll see better results.",
      },
      evenKd: {
        highDamage:
          "Despite the loss, your balanced kill-death ratio and high damage show potential. Keep up the pressure in future matches.",
        lowDamage:
          "You maintained a balanced kill-death ratio, but the low damage output couldn't turn the tide. Try to focus on dealing more damage in the next match.",
      },
    },
  };

  const titles = {
    win: {
      goodKd: {
        highDamage: "Outstanding Victory!",
        lowDamage: "Tactical Victory!",
      },
      badKd: {
        highDamage: "Strategic Victory!",
        lowDamage: "Hard-fought Victory!",
      },
      evenKd: {
        highDamage: "Balanced Powerhouse!",
        lowDamage: "Steady Winner!",
      },
    },
    loss: {
      goodKd: {
        highDamage: "Valiant Effort!",
        lowDamage: "Unlucky!",
      },
      badKd: {
        highDamage: "So Close!",
        lowDamage: "Better Luck Next Time!",
      },
      evenKd: {
        highDamage: "Close Call!",
        lowDamage: "Steady Struggle!",
      },
    },
  };

  function evaluatePerformance(
    kills: number,
    deaths: number,
    damage: number | null,
    matchResult: boolean
  ) {
    /* 1.1 kd considered good?  possibly?*/
    const kdRating =
      kills / deaths >= 1 ? "goodKd" : kills / deaths < 1 ? "badKd" : "evenKd";

    const damageRating =
      damage !== null && damage >= kills * 100 ? "highDamage" : "lowDamage";

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
    <Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl max-h-screen mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-[#212529] rounded-lg overflow-auto">
        <div className="space-y-6">
          <div className="bg-secondary-bg rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Match Stats</h2>
            <div className="mt-6">
              <div className="text-[#AAAAAA]">
                <p className=" mb-1">
                  Match Result:{" "}
                  <span className="text-white">
                    {match.win ? "Win" : "Loss"}
                  </span>
                </p>
                <p className=" mb-1">
                  Kills: <span className="text-white">{match.kills}</span>
                </p>
                <p className=" mb-1">
                  Deaths: <span className="text-white">{match.deaths}</span>
                </p>
                <p className=" mb-1">
                  Damage: <span className="text-white">{match.damage}</span>
                </p>
                <p className=" mb-1">
                  Avg Damage per Kill:{" "}
                  <span className="text-white">
                    {match.damage && (match.damage / match.kills).toFixed(2)}
                  </span>
                </p>
                {match.gameMode === "Hardpoint" && (
                  <p className=" mb-1">
                    Time:{" "}
                    <span className="text-white">
                      {convertTime(match.time)}
                    </span>
                  </p>
                )}
                <p className=" mb-1">
                  KD Ratio:{" "}
                  <span className="text-white">
                    {(match.kills / match.deaths).toFixed(2)}
                  </span>
                </p>
                {match.gameMode === "SearchAndDestroy" && (
                  <>
                    <p className=" mb-1">
                      Plants: <span className="text-white">{match.plants}</span>
                    </p>
                    <p className=" mb-1">
                      Defuses:{" "}
                      <span className="text-white">{match.defuses}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-secondary-bg rounded-lg shadow-lg p-6">
            <p className="mb-2">Match Summary</p>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-[#AAAAAA]">{performance}</p>
          </div>
        </div>

        <div className="space-y-6 order-first md:order-last">
          <Image
            alt="Match Image"
            className="rounded-lg shadow-lg"
            height={500}
            src={mapImages[match.matchMap as keyof typeof mapImages]}
            style={{
              objectFit: "contain",
            }}
            width={800}
          />
          <div className="bg-secondary-bg rounded-lg shadow-lg p-6 space-y-1 text-[#AAAAAA]">
            <p>
              Map: <span className="text-white">{match.matchMap}</span>
            </p>
            <p>
              Match Played on:{" "}
              <span className="text-white">
                {new Date(match.createdAt).toLocaleDateString("en-us")} at{" "}
                {new Date(match.createdAt).toLocaleTimeString("en-us")}
              </span>
            </p>
            {match.updatedAt.getTime() !== match.createdAt.getTime() && (
              <p>
                Match Updated on: {new Date(match.updatedAt).toLocaleDateString("en-us")}{" "}
                at {new Date(match.updatedAt).toLocaleTimeString("en-us")}
              </p>
            )}

            <div className="flex space-x-4 items-center">
              <Link href={`/edit-stats/${match.id}`}>
                <span className=" text-[#58a6FF] hover:underline">Edit</span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await deleteBoSixMatch(match.id);
                }}
              >
                <button
                  type="submit"
                  className="text-white bg-[#ff4d4d] p-2 rounded-lg hover:underline hover:font-bold"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
