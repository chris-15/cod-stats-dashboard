"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TMatch, TMatchQuery } from "@/app/types";
import toast from "react-hot-toast";

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
    { value: "Rewind", label: "Rewind" },
    { value: "Vault", label: "Vault" },
  ],
  SearchAndDestroy: [
    { value: "Hacienda", label: "Hacienda" },
    { value: "Protocol", label: "Protocol" },
    { value: "RedCard", label: "RedCard" },
    { value: "Rewind", label: "Rewind" },
    { value: "Skyline", label: "Skyline" },
    { value: "Vault", label: "Vault" },
  ],
};

function EditStatsForm({ match }: { match: TMatchQuery }) {
  const [gameMode, setGameMode] = useState<string>(match.gameMode);
  const [matchMap, setMatchMap] = useState<string>(match.matchMap);
  const [win, setWin] = useState<boolean>(match.win);
  const [kills, setKills] = useState<number>(match.kills);
  const [deaths, setDeaths] = useState<number>(match.deaths);
  const [damage, setDamage] = useState<number>(match.damage ?? 0);
  const [time, setTime] = useState<number>(match.time ?? 0 );
  const [plants, setPlants] = useState<number>(match.plants ?? 0);
  const [defuses, setDefuses] = useState<number>(match.defuses ?? 0);
  const [error, setError] = useState<string>("");

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
    try {
      const res = await fetch(`/api/matches/${match.id}`, {
        method: "PUT",
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
        }),
      });
      if (res.ok) {
        //console.log(res.json());
        console.log("Match Updated!");
        toast.success("Successfully updated match stats!");
        router.push(`/dashboard/bo6/${gameMode.toLowerCase()}`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-md bg-secondary-bg border border-[#444444] rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Edit Your Match Statistics
      </h2>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="space-y-2">
          <label htmlFor="gameMode" className="">
            GameMode:
          </label>
          <select
            id="gameMode"
            name="gameMode"
            required
            className="mt-1 p-2 w-full border rounded-md text-center"
            value={gameMode}
            onChange={handleGameModeChange}
          >
            <option value="">Select a Game Mode</option>
            <option value="Hardpoint">Hardpoint</option>
            <option value="Control">Control</option>
            <option value="SearchAndDestroy">Search and Destroy</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="matchMap" className="">
            Map:
          </label>
          <select
            id="matchMap"
            name="matchMap"
            required
            className="mt-1 p-2 w-full border rounded-md text-center"
            value={matchMap}
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
          <label htmlFor="outcome" className="">
            Outcome:
          </label>
          <select
            id="outcome"
            name="outcome"
            required
            className="mt-1 p-2 w-full border rounded-md text-center"
            value={win ? "Win" : "Loss"}
            onChange={(e) => setWin(e.target.value === "Win")}
          >
            <option value="">Did you Win or Lose?</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="kills" className="">
              Kills:
            </label>
            <input
              type="number"
              id="kills"
              name="kills"
              required
              placeholder="0"
              min="0"
              className="mt-1 p-2 w-full border rounded-md"
              value={kills}
              onChange={(e) => setKills(Number(e.target.value))}
            ></input>
          </div>

          <div className="space-y-2">
            <label htmlFor="deaths" className="">
              Deaths:
            </label>
            <input
              type="number"
              id="deaths"
              name="deaths"
              required
              placeholder="0"
              min="0"
              className="mt-1 p-2 w-full border rounded-md"
              value={deaths}
              onChange={(e) => setDeaths(Number(e.target.value))}
            ></input>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="damage" className="">
            Damage:
          </label>
          <input
            type="number"
            id="damage"
            name="damage"
            placeholder="0"
            min="0"
            className="mt-1 p-2 w-full border rounded-md"
            value={damage}
            onChange={(e) => setDamage(Number(e.target.value))}
          ></input>
        </div>

        {gameMode === "Hardpoint" && (
          <div className="space-y-2">
            <label htmlFor="time" className="">
              Time:
            </label>
            <input
              type="number"
              id="time"
              name="time"
              placeholder="Use only for Hardpoint"
              min="0"
              className="mt-1 p-2 w-full border rounded-md"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            ></input>
          </div>
        )}
        {gameMode === "SearchAndDestroy" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="plants" className="">
                Plants:
              </label>
              <input
                type="number"
                id="plants"
                name="plants"
                placeholder="Bombs Planted"
                min="0"
                className="mt-1 p-2 w-full border rounded-md"
                value={plants}
                onChange={(e) => setPlants(Number(e.target.value))}
              ></input>
            </div>

            <div className="space-y-2">
              <label htmlFor="defuses" className="">
                Defuses:
              </label>
              <input
                type="number"
                id="defuses"
                name="defuses"
                placeholder="Bombs Defused"
                min="0"
                className="mt-1 p-2 w-full border rounded-md"
                value={defuses}
                onChange={(e) => setDefuses(Number(e.target.value))}
              ></input>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" className="mt-6 btn">
            Update
          </button>
        </div>
        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
export default EditStatsForm;
