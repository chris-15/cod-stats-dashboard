"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMatches } from "./matchesContext";
import toast from "react-hot-toast";

//setting types for the map options
type MapOption = {
  value: string;
  label: string;
};
type GameModeMaps = {
  [gameMode: string]: MapOption[];
};

const mapOptions: GameModeMaps = {
  Hardpoint: [
    { value: "Karachi", label: "Karachi" },
    { value: "Rio", label: "Rio" },
    { value: "SixStar", label: "SixStar" },
    { value: "SubBase", label: "SubBase" },
    { value: "Vista", label: "Vista" },
  ],
  Control: [
    { value: "Highrise", label: "Highrise" },
    { value: "Invasion", label: "Invasion" },
    { value: "Karachi", label: "Karachi" },
  ],
  SearchAndDestroy: [
    { value: "Highrise", label: "Highrise" },
    { value: "Invasion", label: "Invasion" },
    { value: "Karachi", label: "Karachi" },
    { value: "Rio", label: "Rio" },
    { value: "SixStar", label: "SixStar" },
  ],
};
function AddStatsForm() {
  const [gameMode, setGameMode] = useState<string>("");
  const [matchMap, setMatchMap] = useState<string>("");
  const [win, setWin] = useState<boolean>(false);
  const [kills, setKills] = useState<number>(0);
  const [deaths, setDeaths] = useState<number>(0);
  const [damage, setDamage] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [plants, setPlants] = useState<number>(0);
  const [defuses, setDefuses] = useState<number>(0);
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
        }),
      });
      if (res.ok) {
        //console.log(res.json());
        toast.success("Successfully added match stats!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Add Stats</h2>
      <form
        className="max-w-md mx-auto p-8 rounded shadow-md bg-[#161B22] border border-[#21262D]"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="gameMode" className="">
          GameMode:
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

        <label htmlFor="matchMap" className="">
          Map:
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

        <label htmlFor="outcome" className="">
          Outcome:
        </label>
        <select
          id="outcome"
          name="outcome"
          required
          className="mt-1 p-2 w-full border rounded-md text-center"
          onChange={(e) => setWin(e.target.value === "Win")}
        >
          <option value="">Did you Win or Lose?</option>
          <option value="Win">Win</option>
          <option value="Loss">Loss</option>
        </select>

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
          onChange={(e) => setKills(Number(e.target.value))}
        ></input>

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
          onChange={(e) => setDeaths(Number(e.target.value))}
        ></input>

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
          onChange={(e) => setDamage(Number(e.target.value))}
        ></input>

        {gameMode === "Hardpoint" && (
          <>
            <label htmlFor="time" className="">
              Time:
            </label>
            <input
              type="number"
              id="time"
              name="time"
              placeholder="Time in Seconds"
              min="0"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setTime(Number(e.target.value))}
            ></input>
          </>
        )}
        {gameMode === "SearchAndDestroy" && (
          <>
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
              onChange={(e) => setPlants(Number(e.target.value))}
            ></input>
          </>
        )}
        {gameMode === "SearchAndDestroy" && (
          <>
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
              onChange={(e) => setDefuses(Number(e.target.value))}
            ></input>
          </>
        )}
        <div className="flex justify-end">
          <button type="submit" className="mt-6 btn">
            Submit
          </button>
        </div>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
export default AddStatsForm;
