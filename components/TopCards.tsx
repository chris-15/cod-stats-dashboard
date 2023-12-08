'use client'
import { useMatches } from "./matchesContext";
import { calcKdRatio, calcWinPercentage } from "@/lib/utils";


function TopCards() {
  const { matches} = useMatches();
//console.log(matches)
const hpKdRatio = calcKdRatio(matches, "Hardpoint")
const controlKdRatio = calcKdRatio(matches, "Control");
const searchKdRatio = calcKdRatio(matches, "SearchAndDestroy");

const hpWinPercentage = calcWinPercentage(matches, "Hardpoint");
const controlWinPercentage = calcWinPercentage(matches, "Control");
const searchWinPercentage = calcWinPercentage(matches, "SearchAndDestroy");


  return (
    <div className="grid lg:grid-cols-6 gap-4 p-4 text-black">
      {/* TODO: refactor this so you dont repeat yourself- just for basic view for right now */}
      {/* hardpoint */}
      <div className="lg:col-span-2 col-span-1 bg-gray-200 flex justify-between lg:w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <p className=" font-bold text-2xl">Hardpoint</p>
          <p>{hpKdRatio}</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl font-bold">W/L</p>
          <p> {hpWinPercentage} %</p>
        </div>
      </div>
      {/* control */}
      <div className="lg:col-span-2 col-span-1 bg-gray-200  flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <p className=" font-bold text-2xl">Control</p>
          <p>{controlKdRatio}</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl font-bold">W/L</p>
          <p> {controlWinPercentage} %</p>
        </div>
      </div>
      {/* search */}
      <div className="lg:col-span-2 col-span-1 bg-gray-200 flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <p className=" font-bold text-2xl">Search And Destroy</p>
          <p>{searchKdRatio}</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl font-bold">W/L</p>
          <p>{searchWinPercentage} %</p>
        </div>
      </div>
    </div>
  );
}
export default TopCards;
