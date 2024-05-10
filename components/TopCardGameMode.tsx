import Link from "next/link";
import { Tooltip } from "react-tooltip";

type TopCardGameModeProps = {
  gameMode: string;
  kdRatio: string;
  winPercentage: number;
};

function TopCardGameMode({
  gameMode,
  kdRatio,
  winPercentage,
}: TopCardGameModeProps) {
  return (
    <Link
      data-tooltip-id="topcard-tooltip-id"
      data-tooltip-content="Click For More Stats!"
      href={gameMode === "Overall" ? `/dashboard` : `/dashboard/${gameMode}`}
    >
      <div className="">
        <div className="">
          <h2 className=" ">
            {gameMode === "searchanddestroy" ? "Search & Destroy" : gameMode}
          </h2>
        </div>
        <div className="">
          <div>
            <p className="">K/D Ratio</p>
            <p className="">{kdRatio}</p>
          </div>
          <div>
            <p className="">Win %</p>
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
      <Tooltip id="topcard-tooltip-id" />
    </Link>
  );
}
export default TopCardGameMode;
