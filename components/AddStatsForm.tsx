"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IoGameControllerOutline,
  IoMapOutline,
  IoSkullOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { SlTarget } from "react-icons/sl";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { LuBomb, LuCrown, LuSwords } from "react-icons/lu";
//setting types for the map options
type MapOption = {
  value: string;
  label: string;
};
type GameModeMaps = {
  [gameMode: string]: MapOption[];
};

//adujusted so you can only select maps for bo6 since mw3 rannked is no longer available
const mapOptions: GameModeMaps = {
  Hardpoint: [
    { value: "Hacienda", label: "Hacienda" },
    { value: "Protocol", label: "Protocol" },
    { value: "RedCard", label: "RedCard" },
    { value: "Rewind", label: "Rewind" },
    { value: "Skyline", label: "Skyline" },
    { value: "Vault", label: "Vault" },
  ],
  Control: [
    { value: "Hacienda", label: "Hacienda" },
    { value: "Protocol", label: "Protocol" },
    { value: "Vault", label: "Vault" },
  ],
  SearchAndDestroy: [
    { value: "Hacienda", label: "Hacienda" },
    { value: "Protocol", label: "Protocol" },
    { value: "RedCard", label: "RedCard" },
    { value: "Rewind", label: "Rewind" },
    { value: "Dealership", label: "Dealership" },
  ],
};
function AddStatsForm() {
  const [gameMode, setGameMode] = useState<string>("");
  const [matchMap, setMatchMap] = useState<string>("");
  const [win, setWin] = useState<boolean | null>(null);
  const [kills, setKills] = useState<number>(0);
  const [deaths, setDeaths] = useState<number>(0);
  const [damage, setDamage] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [plants, setPlants] = useState<number>(0);
  const [defuses, setDefuses] = useState<number>(0);
  const [teamScore, setTeamScore] = useState<number>(0);
  const [enemyScore, setEnemyScore] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleGameModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameMode = e.target.value;
    setGameMode(selectedGameMode);

    setMatchMap("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameMode) {
      setError("Game Mode is required");
      return;
    }
    if (!matchMap) {
      setError("Map is required");
      return;
    }

    if (win === null) {
      setError("Outcome is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/matches/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameMode,
          matchMap,
          win,
          kills,
          deaths,
          damage,
          time,
          plants,
          defuses,
          teamScore,
          enemyScore,
        }),
      });
      if (res.ok) {
        toast.success("Successfully added match stats!");
        router.push("/dashboard/bo6");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-md bg-sidebar border rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Your Match Statistics
      </h2>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="space-y-2">
          <label htmlFor="gameMode" className="flex items-center gap-2">
            <IoGameControllerOutline size={24} />
            <span className="">GameMode</span>
          </label>
          <select
            id="gameMode"
            name="gameMode"
            required
            className="mt-1 p-2 w-full border rounded-md text-center"
            onChange={handleGameModeChange}
          >
            <option value="">Select a Game Mode</option>
            <option value="Hardpoint">Hardpoint</option>
            <option value="Control">Control</option>
            <option value="SearchAndDestroy">Search and Destroy</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="matchMap" className="flex items-center gap-2">
            <IoMapOutline size={24} />
            <span className="">Map</span>
          </label>
          <select
            id="matchMap"
            name="matchMap"
            required
            className="mt-1 p-2 w-full border rounded-md text-center"
            onChange={(e) => setMatchMap(e.target.value)}
          >
            <option value="">Select a Map</option>
            {/* map filters based on which game mode is selected, different map set for each game mode */}
            {gameMode &&
              mapOptions[gameMode].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="outcome" className=" flex items-center gap-2">
            <IoTrophyOutline size={24} />
            <span className="">Outcome</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`rounded-md py-2 ${
                win === true
                  ? "bg-green-500 text-white underline underline-offset-2"
                  : "bg-white text-black"
              }`}
              onClick={() => {
                setWin(true);
                setError("");
              }}
            >
              Win
            </button>
            <button
              type="button"
              className={`rounded-md py-2 ${
                win === false
                  ? "bg-red-500 text-white underline underline-offset-2"
                  : "bg-white text-black"
              }`}
              onClick={() => {
                setWin(false);
                setError("");
              }}
            >
              Loss
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="kills" className="flex items-center gap-2">
              <LuCrown size={24} />
              <span className="">Team Score</span>
            </label>
            <input
              type="number"
              id="teamScore"
              name="teamScore"
              required
              placeholder="0"
              min="0"
              max={
                gameMode === "Hardpoint" ? 250 : gameMode === "Control" ? 3 : 6
              }
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setTeamScore(Number(e.target.value))}
            ></input>
          </div>

          <div className="space-y-2">
            <label htmlFor="deaths" className="flex items-center gap-2">
              <LuSwords size={24} />
              <span className="">Enemy Score</span>
            </label>
            <input
              type="number"
              id="enemyScore"
              name="enemyScore"
              required
              placeholder="0"
              min="0"
              max={
                gameMode === "Hardpoint" ? 250 : gameMode === "Control" ? 3 : 6
              }
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setEnemyScore(Number(e.target.value))}
            ></input>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="kills" className="flex items-center gap-2">
              <SlTarget size={24} />
              <span className="">Kills</span>
            </label>
            <input
              type="number"
              id="kills"
              name="kills"
              required
              placeholder="0"
              min="0"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setKills(Number(e.target.value))}
            ></input>
          </div>

          <div className="space-y-2">
            <label htmlFor="deaths" className="flex items-center gap-2">
              <IoSkullOutline size={24} />
              <span className="">Deaths</span>
            </label>
            <input
              type="number"
              id="deaths"
              name="deaths"
              required
              placeholder="0"
              min="0"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setDeaths(Number(e.target.value))}
            ></input>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="damage" className="flex items-center gap-2">
            <MdOutlineHealthAndSafety size={24} />
            <span className="">Damage</span>
          </label>
          <input
            type="number"
            id="damage"
            name="damage"
            placeholder="0"
            min="0"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setDamage(Number(e.target.value))}
          ></input>
        </div>

        {gameMode === "Hardpoint" && (
          <div className="space-y-2">
            <label htmlFor="time" className="flex items-center gap-2">
              <IoTimeOutline size={24} />
              <span className="">Hill Time</span>
            </label>
            <input
              type="number"
              id="time"
              name="time"
              placeholder="Time in Seconds"
              min="0"
              className="mt-1 p-2 w-full border rounded-md "
              onChange={(e) => setTime(Number(e.target.value))}
            ></input>
          </div>
        )}
        {gameMode === "SearchAndDestroy" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="plants" className=" flex items-center gap-2">
                <LuBomb size={24} />
                <span className="">Plants</span>
              </label>
              <input
                type="number"
                id="plants"
                name="plants"
                placeholder="Bombs Planted"
                min="0"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setPlants(Number(e.target.value))}
              ></input>
            </div>

            <div className="space-y-2">
              <label htmlFor="defuses" className="flex items-center gap-2">
                <HiOutlineWrenchScrewdriver size={24} />
                <span className="">Defuses</span>
              </label>
              <input
                type="number"
                id="defuses"
                name="defuses"
                placeholder="Bombs Defused"
                min="0"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setDefuses(Number(e.target.value))}
              ></input>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-6 btn-bo6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
export default AddStatsForm;
