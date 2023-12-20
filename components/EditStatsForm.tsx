"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TMatch } from "@/app/types";
import { useMatches } from "./matchesContext";

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
    { value: "Invasion", label: "Invasion" },
    { value: "Karachi", label: "Karachi" },
    { value: "Skidrow", label: "Skidrow" },
    { value: "Terminal", label: "Terminal" },
    { value: "SubBase", label: "SubBase" },
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
    { value: "Skidrow", label: "Skidrow" },
    { value: "Terminal", label: "Terminal" },
  ],
};


function EditStatsForm({ match }: { match: TMatch }) {
  const [gameMode, setGameMode] = useState<string>(match.gameMode);
  const [matchMap, setMatchMap] = useState<string>(match.matchMap);
  const [win, setWin] = useState<boolean>(match.win);
  const [kills, setKills] = useState<number>(match.kills);
  const [deaths, setDeaths] = useState<number>(match.deaths);
  const [damage, setDamage] = useState<number>(match.damage);
  const [time, setTime] = useState<number>(match.time);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { fetchMatches } = useMatches();

  const handleGameModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameMode = e.target.value;
    setGameMode(selectedGameMode);

    setMatchMap("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!gameMode){
      setError("Game Mode is required");
      return
    }
    try {
      const res = await fetch(`/api/matches/${match.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameMode, matchMap, win, kills, deaths, damage, time }),
      });
      if (res.ok) {
        //console.log(res.json());
        console.log("Match Updated!")
        await fetchMatches();
        router.push(`/dashboard/${gameMode.toLowerCase()}`);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <h2>Add Stats</h2>
      <form
        className="max-w-md mx-auto p-8 rounded shadow-md bg-[#1B1B1B]"
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
          value={gameMode}
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

        <label htmlFor="damage" className="">
          Damage:
        </label>
        <input
          type="number"
          id="damage"
          name="damage"
          required
          placeholder="0"
          min="0"
          className="mt-1 p-2 w-full border rounded-md"
          value={damage}
          onChange={(e) => setDamage(Number(e.target.value))}
          
        ></input>

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

        <button type="submit" className="mt-6 btn">
          Update
        </button>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
export default EditStatsForm;