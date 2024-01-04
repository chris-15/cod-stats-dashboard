import Link from "next/link";

type TopCardGameModeProps = {
  gameMode: string;
  kdRatio: string;
  winPercentage: number;
};

function TopCardGameMode({ gameMode, kdRatio, winPercentage }: TopCardGameModeProps) {
  return (
    <Link
      href={gameMode === "Overall" ? `/dashboard` : `/dashboard/${gameMode}`}
    >
      <div className="group transition-transform transform hover:scale-105 bg-[#161B22] border border-[#21262D] rounded-lg py-2">
        <div className="">
          <h2 className=" group-hover:underline text-center font-bold capitalize text-xl mb-5 text-gray-200">
            {gameMode === "searchanddestroy" ? "Search & Destroy" : gameMode}
          </h2>
        </div>
        <div className="grid grid-cols-2 divide-x divide-[#333333] text-center">
          <div>
            <p className="text-lg font-semibold text-gray-300">K/D Ratio</p>
            <p className="font-bold text-4xl text-gray-200">
              {kdRatio}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-300">Win %</p>
            <p
              className={
                winPercentage > 50
                  ? "text-green-500 font-bold text-4xl"
                  : "text-red-500 font-bold text-4xl"
              }
            >
              {winPercentage}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default TopCardGameMode;
