import Link from "next/link";

type TopCardGameModeProps = {
  game: string;
  gameMode: string;
  kdRatio: string;
  winPercentage: number;
};

// gameMode === "Overall" ? `/dashboard` : `/dashboard/${gameMode}`

function TopCardGameMode({
  game,
  gameMode,
  kdRatio,
  winPercentage,
}: TopCardGameModeProps) {
  return (
    <Link
      href={
        game === "mw3"
          ? gameMode === "Overall"
            ? `/dashboard/mw3`
            : `/dashboard/mw3/${gameMode}`
          : gameMode === "Overall"
          ? `/dashboard/bo6`
          : `/dashboard/bo6/${gameMode}`
      }
    >
      <div className="group transition-transform transform hover:scale-105 border border-[#444444] rounded-lg py-2 bg-secondary-bg">
        <div className="">
          <h2 className="group-hover:underline text-center font-bold capitalize text-xl mb-5 ">
            {gameMode === "searchanddestroy" ? "Search & Destroy" : gameMode}
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-x divide-[#444444] text-center">
          <div>
            <p className="text-lg font-semibold text-gray-300 ">K/D Ratio</p>
            <p className="font-bold text-4xl ">{kdRatio}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-300 ">Win %</p>
            <p
              className={
                winPercentage > 50
                  ? game === "mw3"
                    ? "text-[#b0ff34] font-bold text-4xl"
                    : "text-green-500 font-bold text-4xl"
                  : "text-[#ff4d4d] font-bold text-4xl"
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
