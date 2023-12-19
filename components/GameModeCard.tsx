import Link from "next/link";

type GameModeCardProps = {
  gameMode: string;
  kdRatio: string;
  winPercentage: number;
};

function GameModeCard({ gameMode, kdRatio, winPercentage }: GameModeCardProps) {
  return (
    <Link href={`/dashboard/${gameMode}`}>
      <div className="group transition-transform transform hover:scale-105 bg-[#1B1B1B] border border-[#333333] rounded-lg py-2">
        <div className="">
          <h2 className=" group-hover:underline text-center font-bold capitalize">
            {gameMode === "searchanddestroy" ? "Search & Destroy" : gameMode}
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-2xl">
            K/D: <span className="font-bold">{kdRatio}</span>
          </p>
          <p className="text-xl">
            Win %:{" "}
            <span
              className={
                winPercentage > 50
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }
            >
              {" "}
              {winPercentage} %
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
export default GameModeCard;
