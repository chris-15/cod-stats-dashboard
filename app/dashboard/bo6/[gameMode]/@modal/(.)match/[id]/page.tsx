import { authOptions } from "@/lib/auth";
import { deleteBoSixMatch, getBoSixMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Modal } from "./modal";
import Image from "next/image";
import { convertTime } from "@/lib/stat-utils";
import Link from "next/link";
import DisplayDateTime from "@/components/DisplayDateTime";
import DisplayDate from "@/components/DisplayDate";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";

const mapImages = {
  Hacienda:
    "https://utfs.io/f/g0j2nElFVrusJoKuqlLE4aUcb0vZHKFAnXm3PDhQYuyIlf6T",
  Protocol:
    "https://utfs.io/f/g0j2nElFVrus8wZCXNDDZXVfb9JnyAaEwWHYLigBkSvetxMO",
  RedCard: "https://utfs.io/f/g0j2nElFVrusl8crIkTv4NcXE3wFjT1gHVZSQz59oOrnG2Pa",
  Rewind: "https://utfs.io/f/g0j2nElFVrusZR73l0cqTvVfrciOM8GgNbsy2x7o30DPtemR",
  Skyline: "https://utfs.io/f/g0j2nElFVruswHLllWOfO9o1egZTj52BNhktAH0bDSqWRsvQ",
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

export default async function GameModeMatchId({
  params: { id: id },
}: {
  params: { id: string };
}) {

  const matchId = id;

  const match = await getBoSixMatchById(matchId);

  const { title, performance } = evaluatePerformance(
    match.kills,
    match.deaths,
    match.damage,
    match.win
  );

  return (
    <Modal>
      <div className="bg-sidebar rounded-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Map Image */}
          <div className="relative overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10" />
            <Image
              alt={`${match.matchMap} Map`}
              className="w-full object-cover h-[200px] md:h-[300px]"
              height={500}
              src={mapImages[match.matchMap as keyof typeof mapImages]}
              width={1200}
              priority
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <Badge
                    className={cn(
                      "mb-2 text-sm px-3 py-1",
                      match.win
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                    )}
                  >
                    {match.win ? "Victory" : "Defeat"}
                  </Badge>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
                    {match.matchMap}
                  </h1>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {" "}
                      <DisplayDate match={match} createdAt={true} />
                    </span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      <DisplayDateTime match={match} createdAt={true} />
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/edit-stats/${match.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 border-gray-700 bg-gray-800/80 hover:bg-gray-700/80"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                  </Link>
                  <form
                    action={async () => {
                      "use server";

                      await deleteBoSixMatch(match.id);
                    }}
                  >
                    <Button variant="destructive" size="sm" className="gap-1">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Match Analysis and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Match Analysis */}
            <div className="overflow-hidden ">
              <div className="pb-2">
                <div className="text-gray-400">Match Analysis</div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  {title}
                </div>
              </div>
              <div>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {performance}
                </p>
              </div>
              <div className="bg-[hsl(240,5.9%,13%)] pt-4 pb-4 px-6 mt-2 rounded-lg">
                <div className="grid grid-cols-3 w-full gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm">
                      K/D Ratio
                    </p>
                    <p
                      className={cn(
                        "text-lg md:text-xl font-semibold",
                        match.kills / match.deaths > 1
                          ? "text-green-400"
                          : match.kills / match.deaths < 1
                          ? "text-red-400"
                          : "text-yellow-400"
                      )}
                    >
                      {(match.kills / match.deaths).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm">Kills</p>
                    <p className="text-lg md:text-xl font-semibold text-white">
                      {match.kills}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm">Deaths</p>
                    <p className="text-lg md:text-xl font-semibold text-white">
                      {match.deaths}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Detials */}
            <div className="overflow-hidden">
              <div className="pb-2">
                <div className="text-gray-400">Match Details</div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  Stats Overview
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm">
                      Game Mode
                    </p>
                    <p className="font-medium text-white text-sm md:text-base">
                      {match.gameMode === "SearchAndDestroy"
                        ? "Search And Destroy"
                        : match.gameMode}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm">Damage</p>
                    <p className="font-medium text-white text-sm md:text-base">
                      {match.damage}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm">
                      Avg Damage/Kill
                    </p>
                    <p className="font-medium text-white text-sm md:text-base">
                      {match.damage && (match.damage / match.kills).toFixed(2)}
                    </p>
                  </div>
                  {match.gameMode === "Hardpoint" && (
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">
                        Hill Time
                      </p>
                      <p className="font-medium text-white text-sm md:text-base">
                        {convertTime(match.time)}
                      </p>
                    </div>
                  )}
                  {match.gameMode === "SearchAndDestroy" && (
                    <>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">
                          Plants
                        </p>
                        <p className="font-medium text-white text-sm md:text-base">
                          {match.plants}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">
                          Defuses
                        </p>
                        <p className="font-medium text-white text-sm md:text-base">
                          {match.defuses}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {match.updatedAt.getTime() !== match.createdAt.getTime() && (
                  <div className="pt-2 mt-2 border-t border-[#444444]">
                    <p className="text-xs text-gray-500">
                      Last updated:{" "}
                      {
                        <>
                          <DisplayDate match={match} createdAt={false} />{" "}
                          {"at "}
                          <DisplayDateTime match={match} createdAt={false} />
                        </>
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
