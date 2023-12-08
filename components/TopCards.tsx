"use client";
import { useMatches } from "./matchesContext";
import {
  calcModeKdRatio,
  calcWinPercentage,
  calcTotalKdRatio,
} from "@/lib/utils";
import Link from "next/link";

function TopCards() {
  const { matches } = useMatches();
  //console.log(matches)
  const overalKdRatio = calcTotalKdRatio(matches);
  const hpKdRatio = calcModeKdRatio(matches, "Hardpoint");
  const controlKdRatio = calcModeKdRatio(matches, "Control");
  const searchKdRatio = calcModeKdRatio(matches, "SearchAndDestroy");

  const hpWinPercentage = calcWinPercentage(matches, "Hardpoint");
  const controlWinPercentage = calcWinPercentage(matches, "Control");
  const searchWinPercentage = calcWinPercentage(matches, "SearchAndDestroy");

  return (
    <div className="grid lg:grid-cols-6 gap-4 p-4 text-black">
      {/* TODO: refactor this so you dont repeat yourself- just for basic view for right now */}
      {/* hardpoint */}
      <div className="lg:col-span-2 col-span-1 bg-gray-200 flex justify-between lg:w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <Link href={"/dashboard/hardpoint"}>
            <p className=" font-bold text-2xl">Hardpoint</p>
          </Link>
          <p>{hpKdRatio}</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl font-bold">W/L</p>
          <p className={hpWinPercentage > 50 ? "bg-green-500" : "bg-red-500"}>
            {" "}
            {hpWinPercentage} %
          </p>
        </div>
      </div>
      {/* control */}
      <div className="lg:col-span-2 col-span-1 bg-gray-200  flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
        <Link href={"/dashboard/control"}>
            <p className=" font-bold text-2xl">Control</p>
          </Link>
          <p>{controlKdRatio}</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl font-bold">W/L</p>
          <p
            className={
              controlWinPercentage > 50 ? "bg-green-500" : "bg-red-500"
            }
          >
            {" "}
            {controlWinPercentage} %
          </p>
        </div>
      </div>
      {/* search */}
      <div className="lg:col-span-2 col-span-1 bg-gray-200 flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
        <Link href={"/dashboard/searchanddestroy"}>
            <p className=" font-bold text-2xl">Search And Destroy</p>
          </Link>
          <p>{searchKdRatio}</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl font-bold">W/L</p>
          <p
            className={searchWinPercentage > 50 ? "bg-green-500" : "bg-red-500"}
          >
            {searchWinPercentage} %
          </p>
        </div>
      </div>
    </div>
  );
}
export default TopCards;
