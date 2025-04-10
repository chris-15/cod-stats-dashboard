import { convertTime } from "@/lib/stat-utils";
import { deleteBoSixMatch, getBoSixMatchById } from "@/server/queries";
import Image from "next/image";
import Link from "next/link";
import DisplayDateTime from "@/components/DisplayDateTime";
import DisplayDate from "@/components/DisplayDate";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapImages } from "@/lib/mapImages";
import { newEvalPerformance } from "@/lib/matchEval";

const performanceDescriptions = {
  win: {
    goodKd:
      "You had a strong kill-death ratio and played a key role in securing the victory. Great job leading the team to success!",
    badKd:
      "You won the match, but your kill-death ratio was on the lower side. Focus on staying alive longer and securing more kills in future games.",
    evenKd:
      "You had a balanced kill-death ratio and contributed to the team's victory. Consistency like this is always valuable!",
  },
  loss: {
    goodKd:
      "Even in defeat, your kill-death ratio was impressive. You fought hard and kept your team in the game. Keep up the good work!",
    badKd:
      "The match didn’t go as planned, and your kill-death ratio was low. Focus on improving survivability and securing more kills to turn future matches in your favor.",
    evenKd:
      "Despite the loss, your kill-death ratio was balanced. Keep working on improving your gameplay, and the wins will come.",
  },
};

const titles = {
  win: {
    goodKd: "Outstanding Victory!",
    badKd: "Hard-fought Victory!",
    evenKd: "Steady Winner!",
  },
  loss: {
    goodKd: "Valiant Effort!",
    badKd: "Better Luck Next Time!",
    evenKd: "Close Call!",
  },
};

function evaluatePerformance(
  kills: number,
  deaths: number,
  matchResult: boolean
) {
  /* 1.1 kd considered good?  possibly?*/
  const kdRating =
    kills / deaths > 1 ? "goodKd" : kills / deaths < 1 ? "badKd" : "evenKd";

  const result = matchResult ? "win" : "loss";

  const performance = performanceDescriptions[result][kdRating];
  const title = titles[result][kdRating];

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
    match.win
  );

  //for matches that have match scores, using xWin rating
  const { newMatchTitle, newMatchSummary } = newEvalPerformance(match);

  return (
    <div className="mx-auto py-4 px-4 max-w-6xl">
      <Link
        href={`/dashboard/bo6/${match.gameMode.toLowerCase()}`}
        className="flex font-bold text-xl hover:underline mb-4"
      >
        <p className="">
          {" "}
          {`<- ${
            match.gameMode === "SearchAndDestroy"
              ? "Search And Destroy"
              : match.gameMode
          }`}
        </p>
      </Link>

      <div className="grid grid-cols-1 gap-6">
        {/* Map Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10" />
          <Image
            alt={`${match.matchMap} Map`}
            className="w-full object-cover h-[300px] md:h-[400px]"
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
                  {match.win ? "Victory" : "Defeat"}{" "}
                  {match.teamScore !== null && match.teamScore !== undefined
                    ? `${match.teamScore} - ${match.enemyScore}`
                    : ""}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Match Analysis */}
          <div className="overflow-hidden bg-sidebar rounded-xl p-4 ">
            <div className="pb-2">
              <div className="text-gray-400">Match Analysis</div>
              <div className="text-xl md:text-2xl font-bold text-white">
                {match.teamScore ? newMatchTitle : title}
              </div>
            </div>
            <div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {match.teamScore ? newMatchSummary : performance}
              </p>
            </div>
            <div className="bg-[hsl(240,5.9%,13%)] pt-4 pb-4 px-6 mt-2 rounded-lg">
              <div className="grid grid-cols-3 w-full gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">K/D Ratio</p>
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
          <div className="overflow-hidden bg-sidebar rounded-xl p-4">
            <div className="pb-2">
              <div className="text-gray-400">Match Details</div>
              <div className="text-xl md:text-2xl font-bold text-white">
                Stats Overview
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">Game Mode</p>
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
                  <>
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">
                        Hill Time
                      </p>
                      <p className="font-medium text-white text-sm md:text-base">
                        {convertTime(match.time)}
                      </p>
                    </div>
                    {match.teamScore && match.time && (
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">
                          Hill Time Contribution
                        </p>
                        <p className="font-medium text-white text-sm md:text-base">
                          {((match.time / match.teamScore) * 100).toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </>
                )}
                {match.gameMode === "SearchAndDestroy" && (
                  <>
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">Plants</p>
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
                        <DisplayDate match={match} createdAt={false} /> {"at "}
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
  );
}
